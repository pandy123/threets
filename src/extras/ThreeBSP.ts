module THREE {
   const EPSILON = 1e-5;
   export enum RelationEnum {
      COPLANAR = 0,
      FRONT = 1,
      BACK = 2,
      SPANNING = 3
   }
   export class ThreeBSP {
      public matrix: THREE.Matrix4;
      public tree: BSP.Node;

      constructor(geometryOrNodeOrMesh: Geometry | BSP.Node | Mesh) {
         // Convert THREE.Geometry to ThreeBSP
         var i: number;
         var _length_i: number;
         var face: Face3;
         var vertex: BSP.Vertex | Vector3;
         var faceVertexUvs: THREE.Vector2[];
         var uvs: THREE.Vector2;
         var polygon: BSP.Polygon;
         var polygons: BSP.Polygon[] = [];
         var tree: BSP.Node;
         var geometry: Geometry;

         //   this.Polygon = Polygon;
         //   this.Vertex = Vertex;
         //   this.Node = Node;
         if (geometryOrNodeOrMesh instanceof Geometry) {
            this.matrix = new THREE.Matrix4();
            geometry = geometryOrNodeOrMesh;
         } else if (geometryOrNodeOrMesh instanceof Mesh) {
            // #todo: add hierarchy support
            geometryOrNodeOrMesh.updateMatrix();
            this.matrix = geometryOrNodeOrMesh.matrix.clone();
            geometry = geometryOrNodeOrMesh.geometry;
         } else if (geometryOrNodeOrMesh instanceof BSP.Node) {
            this.tree = geometryOrNodeOrMesh;
            this.matrix = new THREE.Matrix4();
            return this;
         } else {
            throw 'ThreeBSP: Given geometry is unsupported';
         }
         for (var i: number = 0, _length_i: number = geometry.faces.length as number; i < _length_i; i++) {
            face = geometry.faces[i];
            faceVertexUvs = geometry.faceVertexUvs[0][i];
            polygon = new BSP.Polygon();

            if (face instanceof THREE.Face3) {
               vertex = geometry.vertices[face.a];
               uvs = faceVertexUvs ? new Vector2(faceVertexUvs[0].x, faceVertexUvs[0].y) : null;
               vertex = new BSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[0], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);

               vertex = geometry.vertices[face.b];
               uvs = faceVertexUvs ? new Vector2(faceVertexUvs[1].x, faceVertexUvs[1].y) : null;
               vertex = new BSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[1], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);

               vertex = geometry.vertices[face.c];
               uvs = faceVertexUvs ? new Vector2(faceVertexUvs[2].x, faceVertexUvs[2].y) : null;
               vertex = new BSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[2], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);
            }
            /* 
            THREE.Face4 is unavalible now .
            else if (typeof THREE.Face4) {
               vertex = geometry.vertices[face.a];
               uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[0].x, faceVertexUvs[0].y) : null;
               vertex = new BSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[0], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);

               vertex = geometry.vertices[face.b];
               uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[1].x, faceVertexUvs[1].y) : null;
               vertex = new Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[1], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);

               vertex = geometry.vertices[face.c];
               uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[2].x, faceVertexUvs[2].y) : null;
               vertex = new Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[2], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);

               vertex = geometry.vertices[face.d];
               uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[3].x, faceVertexUvs[3].y) : null;
               vertex = new Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[3], uvs);
               vertex.applyMatrix4(this.matrix);
               polygon.vertices.push(vertex);
            } 
            */
            else {
               throw 'Invalid face type at index ' + i;
            }

            polygon.calculateProperties();
            polygons.push(polygon);
         }

         this.tree = new BSP.Node(polygons);
      }

      public subtract(other_tree: ThreeBSP): ThreeBSP {
         var a: BSP.Node = this.tree.clone();
         var b: BSP.Node = other_tree.tree.clone();

         a.invert();
         a.clipTo(b);
         b.clipTo(a);
         b.invert();
         b.clipTo(a);
         b.invert();
         a.build(b.allPolygons());
         a.invert();
         var ret = new ThreeBSP(a);
         ret.matrix = this.matrix;
         return ret;
      }

      public union(other_tree): ThreeBSP {
         var a: BSP.Node = this.tree.clone();
         var b: BSP.Node = other_tree.tree.clone();

         a.clipTo(b);
         b.clipTo(a);
         b.invert();
         b.clipTo(a);
         b.invert();
         a.build(b.allPolygons());
         var ret = new ThreeBSP(a);
         ret.matrix = this.matrix;
         return ret;
      }

      public intersect(other_tree): ThreeBSP {
         var a: BSP.Node = this.tree.clone();
         var b: BSP.Node = other_tree.tree.clone();

         a.invert();
         b.clipTo(a);
         b.invert();
         a.clipTo(b);
         b.clipTo(a);
         a.build(b.allPolygons());
         a.invert();
         var ret = new ThreeBSP(a);
         var matrix = this.matrix;
         return ret;
      }

      public toGeometry(): Geometry {
         var i: number;
         var j: number;
         var matrix: Matrix4 = new Matrix4().getInverse(this.matrix);
         var geometry = new Geometry();
         var polygons = this.tree.allPolygons();
         var polygon_count: number = polygons.length;
         var polygon;
         var polygon_vertice_count: number;
         var vertice_dict = {};
         var vertex_idx_a: number;
         var vertex_idx_b: number;
         var vertex_idx_c: number;
         var vertex: any;
         var face: Face3;
         var verticeUvs: Array<Vector2>;

         for (i = 0; i < polygon_count; i++) {
            polygon = polygons[i];
            polygon_vertice_count = polygon.vertices.length;

            for (j = 2; j < polygon_vertice_count; j++) {
               verticeUvs = new Array<Vector2>();

               vertex = polygon.vertices[0];
               verticeUvs.push(new Vector2(vertex.uv.x, vertex.uv.y));
               vertex = new Vector3(vertex.x, vertex.y, vertex.z);
               vertex.applyMatrix4(matrix);

               if (typeof vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] !== 'undefined') {
                  vertex_idx_a = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z];
               } else {
                  geometry.vertices.push(vertex);
                  vertex_idx_a = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] = geometry.vertices.length - 1;
               }

               vertex = polygon.vertices[j - 1];
               verticeUvs.push(new Vector2(vertex.uv.x, vertex.uv.y));
               vertex = new Vector3(vertex.x, vertex.y, vertex.z);
               vertex.applyMatrix4(matrix);
               if (typeof vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] !== 'undefined') {
                  vertex_idx_b = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z];
               } else {
                  geometry.vertices.push(vertex);
                  vertex_idx_b = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] = geometry.vertices.length - 1;
               }

               vertex = polygon.vertices[j];
               verticeUvs.push(new Vector2(vertex.uv.x, vertex.uv.y));
               vertex = new Vector3(vertex.x, vertex.y, vertex.z);
               vertex.applyMatrix4(matrix);
               if (typeof vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] !== 'undefined') {
                  vertex_idx_c = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z];
               } else {
                  geometry.vertices.push(vertex);
                  vertex_idx_c = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] = geometry.vertices.length - 1;
               }

               face = new Face3(
                  vertex_idx_a,
                  vertex_idx_b,
                  vertex_idx_c,
                  new Vector3(polygon.normal.x, polygon.normal.y, polygon.normal.z)
               );

               geometry.faces.push(face);
               geometry.faceVertexUvs[0].push(verticeUvs);
            }

         }
         return geometry;
      }

      public toMesh(material): Mesh {
         var geometry: THREE.Geometry = this.toGeometry();
         var mesh: THREE.Mesh = new THREE.Mesh(geometry, material);

         mesh.position.setFromMatrixPosition(this.matrix);
         mesh.rotation.setFromRotationMatrix(this.matrix);

         return mesh;
      }
   }
   export namespace BSP {
      export class Polygon {
         public vertices: Array<Vertex>;
         public normal: Vertex;
         public w: number;
         constructor(vertices?: Array<Vertex>, normal?, w?) {
            if (!(vertices instanceof Array)) {
               vertices = new Array<Vertex>();
            }

            this.vertices = vertices;
            if (vertices.length > 0) {
               this.calculateProperties();
            } else {
               this.normal = this.w = undefined;
            }
         }

         public calculateProperties(): Polygon {
            var a: Vertex = this.vertices[0];
            var b: Vertex = this.vertices[1];
            var c: Vertex = this.vertices[2];

            this.normal = b.clone().subtract(a).cross(
               c.clone().subtract(a)
            ).normalize();

            this.w = this.normal.clone().dot(a);

            return this;
         }

         public clone(): Polygon {
            var i: number;
            var vertice_count: number;
            var polygon: BSP.Polygon = new Polygon();

            for (i = 0, vertice_count = this.vertices.length; i < vertice_count; i++) {
               polygon.vertices.push(this.vertices[i].clone());
            }
            polygon.calculateProperties();

            return polygon;
         }

         public flip(): Polygon {
            var i: number;
            var vertices: Array<Vertex> = new Array<Vertex>();
            this.normal.multiplyScalar(-1);
            this.w *= -1;

            for (i = this.vertices.length - 1; i >= 0; i--) {
               vertices.push(this.vertices[i]);
            }
            this.vertices = vertices;

            return this;
         }

         public classifyVertex(vertex: Vertex): RelationEnum {
            var side_value: number = this.normal.dot(vertex) - this.w;

            if (side_value < -EPSILON) {
               return RelationEnum.BACK;
            } else if (side_value > EPSILON) {
               return RelationEnum.FRONT;
            } else {
               return RelationEnum.COPLANAR;
            }
         }

         public classifySide(polygon: Polygon): RelationEnum {
            var i: number;
            var vertex: Vertex;
            var classification: RelationEnum;
            var num_positive: number = 0;
            var num_negative: number = 0;
            var vertice_count: number = polygon.vertices.length;

            for (i = 0; i < vertice_count; i++) {
               vertex = polygon.vertices[i];
               classification = this.classifyVertex(vertex);
               if (classification === RelationEnum.FRONT) {
                  num_positive++;
               } else if (classification === RelationEnum.BACK) {
                  num_negative++;
               }
            }

            if (num_positive > 0 && num_negative === 0) {
               return RelationEnum.FRONT;
            } else if (num_positive === 0 && num_negative > 0) {
               return RelationEnum.BACK;
            } else if (num_positive === 0 && num_negative === 0) {
               return RelationEnum.COPLANAR;
            } else {
               return RelationEnum.SPANNING;
            }
         }

         public splitPolygon(polygon: Polygon, coplanar_front: Array<Polygon>, coplanar_back: Array<Polygon>, front: Array<Polygon>, back: Array<Polygon>) {
            var classification: RelationEnum = this.classifySide(polygon);

            if (classification === RelationEnum.COPLANAR) {

               (this.normal.dot(polygon.normal) > 0 ? coplanar_front : coplanar_back).push(polygon);

            } else if (classification === RelationEnum.FRONT) {

               front.push(polygon);

            } else if (classification === RelationEnum.BACK) {

               back.push(polygon);

            } else {

               var vertice_count: number;
               var i: number;
               var j: number;
               var ti: RelationEnum;
               var tj: RelationEnum;
               var vi: Vertex;
               var vj: Vertex;

               var t: number;
               var v: Vertex;

               var f: Array<Vertex> = new Array<Vertex>();
               var b: Array<Vertex> = new Array<Vertex>();

               for (i = 0, vertice_count = polygon.vertices.length; i < vertice_count; i++) {

                  j = (i + 1) % vertice_count;
                  vi = polygon.vertices[i];
                  vj = polygon.vertices[j];
                  ti = this.classifyVertex(vi);
                  tj = this.classifyVertex(vj);

                  if (ti != RelationEnum.BACK) f.push(vi);
                  if (ti != RelationEnum.FRONT) b.push(vi);
                  if ((ti | tj) === RelationEnum.SPANNING) {
                     t = (this.w - this.normal.dot(vi)) / this.normal.dot(vj.clone().subtract(vi));
                     v = vi.interpolate(vj, t);
                     f.push(v);
                     b.push(v);
                  }
               }


               if (f.length >= 3) front.push(new Polygon(f).calculateProperties());
               if (b.length >= 3) back.push(new Polygon(b).calculateProperties());
            }
         }
      }
      export class Vertex {
         public x: number;
         public y: number;
         public z: number;
         public normal: Vector3;
         public uv: Vector2;
         constructor(x: number, y: number, z: number, normal?: Vector3, uv?: Vector2) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.normal = normal || new Vector3();
            this.uv = uv || new Vector2();
         }

         public clone(): Vertex {
            return new Vertex(this.x, this.y, this.z, this.normal.clone(), this.uv.clone());
         }

         public add(vertex: Vertex): Vertex {
            this.x += vertex.x;
            this.y += vertex.y;
            this.z += vertex.z;
            return this;
         }

         public subtract(vertex: Vertex): Vertex {
            this.x -= vertex.x;
            this.y -= vertex.y;
            this.z -= vertex.z;
            return this;
         }

         public multiplyScalar(scalar: number): Vertex {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
         }

         public cross(vertex: Vertex): Vertex {
            var x: number = this.x;
            var y: number = this.y;
            var z: number = this.z;

            this.x = y * vertex.z - z * vertex.y;
            this.y = z * vertex.x - x * vertex.z;
            this.z = x * vertex.y - y * vertex.x;

            return this;
         }

         public normalize(): Vertex {
            var length: number = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

            this.x /= length;
            this.y /= length;
            this.z /= length;

            return this;
         }

         public dot(vertex: Vertex): number {
            return this.x * vertex.x + this.y * vertex.y + this.z * vertex.z;
         }

         public lerp(a: Vertex, t: number): Vertex {
            this.add(
               a.clone().subtract(this).multiplyScalar(t)
            );

            this.normal.add(
               a.normal.clone().sub(this.normal).multiplyScalar(t)
            );

            this.uv.add(
               a.uv.clone().sub(this.uv).multiplyScalar(t)
            );

            return this;
         }

         public interpolate(other: Vertex, t: number): Vertex {
            return this.clone().lerp(other, t);
         }

         public applyMatrix4(m: Matrix4): Vertex {

            // input: THREE.Matrix4 affine matrix

            var x: number = this.x;
            var y: number = this.y;
            var z: number = this.z;

            var e = m.elements;

            this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
            this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
            this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

            return this;

         }
      }
      export class Node {
         public faces: any;
         public polygons: Array<Polygon>;
         public front: Node;
         public back: Node;
         public divider: Polygon;
         constructor(polygons?: Array<Polygon>) {
            var i: number;
            var polygon_count: number;
            var front = new Array<Polygon>();
            var back = new Array<Polygon>();

            this.polygons = new Array<Polygon>();
            this.front = this.back = undefined;

            if (!(polygons instanceof Array) || polygons.length === 0) return;

            this.divider = polygons[0].clone();

            for (i = 0, polygon_count = polygons.length; i < polygon_count; i++) {
               this.divider.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
            }

            if (front.length > 0) {
               this.front = new Node(front);
            }

            if (back.length > 0) {
               this.back = new Node(back);
            }
         }

         public isConvex(polygons: Array<Polygon>): boolean {
            var i: number;
            var j: number;
            for (i = 0; i < polygons.length; i++) {
               for (j = 0; j < polygons.length; j++) {
                  if (i !== j && polygons[i].classifySide(polygons[j]) !== RelationEnum.BACK) {
                     return false;
                  }
               }
            }
            return true;
         }

         public build(polygons: Array<Polygon>) {
            var i: number;
            var polygon_count: number;
            var front = new Array<Polygon>();
            var back = new Array<Polygon>();

            if (!this.divider) {
               this.divider = polygons[0].clone();
            }

            for (i = 0, polygon_count = polygons.length; i < polygon_count; i++) {
               this.divider.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
            }

            if (front.length > 0) {
               if (!this.front) this.front = new Node();
               this.front.build(front);
            }

            if (back.length > 0) {
               if (!this.back) this.back = new Node();
               this.back.build(back);
            }
         }

         public allPolygons(): Array<Polygon> {
            var polygons = this.polygons.slice();
            if (this.front) polygons = polygons.concat(this.front.allPolygons());
            if (this.back) polygons = polygons.concat(this.back.allPolygons());
            return polygons;
         }

         public clone(): Node {
            var node = new Node();

            node.divider = this.divider.clone();
            node.polygons = this.polygons.map(function (polygon) {
               return polygon.clone();
            });
            node.front = this.front && this.front.clone();
            node.back = this.back && this.back.clone();

            return node;
         }

         public invert(): Node {
            var i: number;
            var polygon_count: number;
            var temp: Node;

            for (i = 0, polygon_count = this.polygons.length; i < polygon_count; i++) {
               this.polygons[i].flip();
            }

            this.divider.flip();
            if (this.front) this.front.invert();
            if (this.back) this.back.invert();

            temp = this.front;
            this.front = this.back;
            this.back = temp;

            return this;
         }

         public clipPolygons(polygons: Array<Polygon>): Array<Polygon> {
            var i: number;
            var polygon_count: number;
            var front: Array<Polygon>;
            var back: Array<Polygon>;

            if (!this.divider) return polygons.slice();

            front = new Array<Polygon>();
            back = new Array<Polygon>();

            for (i = 0, polygon_count = polygons.length; i < polygon_count; i++) {
               this.divider.splitPolygon(polygons[i], front, back, front, back);
            }

            if (this.front) front = this.front.clipPolygons(front);
            if (this.back) back = this.back.clipPolygons(back);
            else back = new Array<Polygon>();

            return front.concat(back);
         }

         public clipTo(node) {
            this.polygons = node.clipPolygons(this.polygons);
            if (this.front) this.front.clipTo(node);
            if (this.back) this.back.clipTo(node);
         }
      }
   }
}