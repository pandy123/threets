module THREE {
   export class CircleGeometry extends Geometry {
      public parameters: any;// { radius: any; segments: any; thetaStart: any; thetaLength: any; };
      public type: string;
      constructor(radius, segments, thetaStart, thetaLength) {
         super();
         //Geometry.call( this );
         this.type = 'CircleGeometry';
         this.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
         };
         this.fromBufferGeometry(new CircleBufferGeometry(radius, segments, thetaStart, thetaLength));
         this.mergeVertices();
      }
   }

   // CircleBufferGeometry
   export class CircleBufferGeometry extends BufferGeometry {
      constructor(radius, segments, thetaStart, thetaLength) {
         super();
         //BufferGeometry.call(this);
         this.type = 'CircleBufferGeometry';
         this.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
         };
         radius = radius || 1;
         segments = segments !== undefined ? Math.max(3, segments) : 8;
         thetaStart = thetaStart !== undefined ? thetaStart : 0;
         thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;
         // buffers
         var indices = [];
         var vertices = [];
         var normals = [];
         var uvs = [];
         // helper variables
         var i, s;
         var vertex = new Vector3();
         var uv = new Vector2();
         // center point
         vertices.push(0, 0, 0);
         normals.push(0, 0, 1);
         uvs.push(0.5, 0.5);
         for (s = 0, i = 3; s <= segments; s++ , i += 3) {
            var segment = thetaStart + s / segments * thetaLength;
            // vertex
            vertex.x = radius * Math.cos(segment);
            vertex.y = radius * Math.sin(segment);
            vertices.push(vertex.x, vertex.y, vertex.z);
            // normal
            normals.push(0, 0, 1);
            // uvs
            uv.x = (vertices[i] / radius + 1) / 2;
            uv.y = (vertices[i + 1] / radius + 1) / 2;
            uvs.push(uv.x, uv.y);
         }
         // indices
         for (i = 1; i <= segments; i++) {
            indices.push(i, i + 1, 0);
         }
         // build geometry
         this.setIndex(indices);
         this.addAttribute('position', new Float32BufferAttribute(vertices, 3));
         this.addAttribute('normal', new Float32BufferAttribute(normals, 3));
         this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));
      }
   }
}