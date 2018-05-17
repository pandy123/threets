
module Threets {
   var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id
   export class BufferGeometry extends EventDispatcher {
      public id: number;
      public name: string;
      public type: string;
      public index: any;
      public attributes: any;
      public morphAttributes: any;
      public groups: Array<any>;
      public boundingBox: any;
      public boundingSphere: any;
      public drawRange: any;
      public uuid: any;
      public isBufferGeometry;
      public parameters: any;

      constructor() {
         super();
         this.id = bufferGeometryId++;
         this.uuid = _Math.generateUUID();
         this.name = '';
         this.type = 'BufferGeometry';
         this.index = null;
         this.attributes = {};
         this.morphAttributes = {};
         this.groups = [];
         this.boundingBox = null;
         this.boundingSphere = null;
         this.drawRange = { start: 0, count: Infinity };
         this.isBufferGeometry = true;

      }

      public getIndex() {

         return this.index;

      }

      public setIndex(index: number|Array<number>) {

         if (Array.isArray(index)) {

            this.index = new (arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1, null);

         } else {

            this.index = index;

         }

      }

      public addAttribute(name: string, attribute: any) {

         if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {

            console.warn('THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).');

            this.addAttribute(name, new BufferAttribute(arguments[1], arguments[2], null));

            return;

         }

         if (name === 'index') {

            console.warn('THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
            this.setIndex(attribute);

            return;

         }

         this.attributes[name] = attribute;

         return this;

      }

      public getAttribute(name: string) {

         return this.attributes[name];

      }

      public removeAttribute(name: string) {

         delete this.attributes[name];

         return this;

      }

      public addGroup(start: number, count: number, materialIndex: number) {

         this.groups.push({

            start: start,
            count: count,
            materialIndex: materialIndex !== undefined ? materialIndex : 0

         });

      }

      public clearGroups() {

         this.groups = [];

      }

      public setDrawRange(start: number, count: number) {

         this.drawRange.start = start;
         this.drawRange.count = count;

      }

      public applyMatrix(matrix: any) {

         var position = this.attributes.position;

         if (position !== undefined) {

            matrix.applyToBufferAttribute(position);
            position.needsUpdate = true;

         }

         var normal = this.attributes.normal;

         if (normal !== undefined) {

            var normalMatrix = new Matrix3().getNormalMatrix(matrix);

            normalMatrix.applyToBufferAttribute(normal);
            normal.needsUpdate = true;

         }

         if (this.boundingBox !== null) {

            this.computeBoundingBox();

         }

         if (this.boundingSphere !== null) {

            this.computeBoundingSphere();

         }

         return this;

      }

      public rotateX(angle) {
         var m1 = new Matrix4();
         m1.makeRotationX(angle);

         this.applyMatrix(m1);

         return this;

      };


      public rotateY(angle) {
         var m1 = new Matrix4();

         m1.makeRotationY(angle);

         this.applyMatrix(m1);

         return this;

      };

      public rotateZ(angle) {
         var m1 = new Matrix4();

         m1.makeRotationZ(angle);

         this.applyMatrix(m1);

         return this;

      };



      public translate(x, y, z) {
         var m1 = new Matrix4();
         m1.makeTranslation(x, y, z);

         this.applyMatrix(m1);

         return this;

      };



      public scale(x, y, z) {
         var m1 = new Matrix4();

         m1.makeScale(x, y, z);

         this.applyMatrix(m1);

         return this;

      };


      public lookAt(vector) {
         var obj = new Object3D();
         obj.lookAt(vector, null, null);

         obj.updateMatrix();

         this.applyMatrix(obj.matrix);

      };


      public center() {
         var offset = new Vector3();

         this.computeBoundingBox();

         this.boundingBox.getCenter(offset).negate();

         this.translate(offset.x, offset.y, offset.z);

         return this;

      };


      public setFromObject(object: any) {

         // console.log( 'THREE.BufferGeometry.setFromObject(). Converting', object, this );

         var geometry = object.geometry;

         if (object.isPoints || object.isLine) {

            var positions = new Float32BufferAttribute(geometry.vertices.length * 3, 3, null);
            var colors = new Float32BufferAttribute(geometry.colors.length * 3, 3, null);

            this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
            this.addAttribute('color', colors.copyColorsArray(geometry.colors));

            if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {

               var lineDistances = new Float32BufferAttribute(geometry.lineDistances.length, 1, null);

               this.addAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));

            }

            if (geometry.boundingSphere !== null) {

               this.boundingSphere = geometry.boundingSphere.clone();

            }

            if (geometry.boundingBox !== null) {

               this.boundingBox = geometry.boundingBox.clone();

            }

         } else if (object.isMesh) {

            if (geometry && geometry.isGeometry) {

               this.fromGeometry(geometry);

            }

         }

         return this;

      }

      public setFromPoints(points: any) {

         var position = [];

         for (var i = 0, l = points.length; i < l; i++) {

            var point = points[i];
            position.push(point.x, point.y, point.z || 0);

         }

         this.addAttribute('position', new Float32BufferAttribute(position, 3, null));

         return this;

      }

      public updateFromObject(object: any) {

         var geometry = object.geometry;

         if (object.isMesh) {

            var direct = geometry.__directGeometry;

            if (geometry.elementsNeedUpdate === true) {

               direct = undefined;
               geometry.elementsNeedUpdate = false;

            }

            if (direct === undefined) {

               return this.fromGeometry(geometry);

            }

            direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
            direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
            direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
            direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
            direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

            geometry.verticesNeedUpdate = false;
            geometry.normalsNeedUpdate = false;
            geometry.colorsNeedUpdate = false;
            geometry.uvsNeedUpdate = false;
            geometry.groupsNeedUpdate = false;

            geometry = direct;

         }

         var attribute;

         if (geometry.verticesNeedUpdate === true) {

            attribute = this.attributes.position;

            if (attribute !== undefined) {

               attribute.copyVector3sArray(geometry.vertices);
               attribute.needsUpdate = true;

            }

            geometry.verticesNeedUpdate = false;

         }

         if (geometry.normalsNeedUpdate === true) {

            attribute = this.attributes.normal;

            if (attribute !== undefined) {

               attribute.copyVector3sArray(geometry.normals);
               attribute.needsUpdate = true;

            }

            geometry.normalsNeedUpdate = false;

         }

         if (geometry.colorsNeedUpdate === true) {

            attribute = this.attributes.color;

            if (attribute !== undefined) {

               attribute.copyColorsArray(geometry.colors);
               attribute.needsUpdate = true;

            }

            geometry.colorsNeedUpdate = false;

         }

         if (geometry.uvsNeedUpdate) {

            attribute = this.attributes.uv;

            if (attribute !== undefined) {

               attribute.copyVector2sArray(geometry.uvs);
               attribute.needsUpdate = true;

            }

            geometry.uvsNeedUpdate = false;

         }

         if (geometry.lineDistancesNeedUpdate) {

            attribute = this.attributes.lineDistance;

            if (attribute !== undefined) {

               attribute.copyArray(geometry.lineDistances);
               attribute.needsUpdate = true;

            }

            geometry.lineDistancesNeedUpdate = false;

         }

         if (geometry.groupsNeedUpdate) {

            geometry.computeGroups(object.geometry);
            this.groups = geometry.groups;

            geometry.groupsNeedUpdate = false;

         }

         return this;

      }

      public fromGeometry(geometry: any) {

         geometry.__directGeometry = new DirectGeometry().fromGeometry(geometry);

         return this.fromDirectGeometry(geometry.__directGeometry);

      }

      public fromDirectGeometry(geometry: any) {

         var positions = new Float32Array(geometry.vertices.length * 3);
         this.addAttribute('position', new BufferAttribute(positions, 3, null).copyVector3sArray(geometry.vertices));

         if (geometry.normals.length > 0) {

            var normals = new Float32Array(geometry.normals.length * 3);
            this.addAttribute('normal', new BufferAttribute(normals, 3, null).copyVector3sArray(geometry.normals));

         }

         if (geometry.colors.length > 0) {

            var colors = new Float32Array(geometry.colors.length * 3);
            this.addAttribute('color', new BufferAttribute(colors, 3, null).copyColorsArray(geometry.colors));

         }

         if (geometry.uvs.length > 0) {

            var uvs = new Float32Array(geometry.uvs.length * 2);
            this.addAttribute('uv', new BufferAttribute(uvs, 2, null).copyVector2sArray(geometry.uvs));

         }

         if (geometry.uvs2.length > 0) {

            var uvs2 = new Float32Array(geometry.uvs2.length * 2);
            this.addAttribute('uv2', new BufferAttribute(uvs2, 2, null).copyVector2sArray(geometry.uvs2));

         }

         // groups

         this.groups = geometry.groups;

         // morphs

         for (var name in geometry.morphTargets) {

            var array = [];
            var morphTargets = geometry.morphTargets[name];

            for (var i = 0, l = morphTargets.length; i < l; i++) {

               var morphTarget = morphTargets[i];

               var attribute = new Float32BufferAttribute(morphTarget.length * 3, 3, null);

               array.push(attribute.copyVector3sArray(morphTarget));

            }

            this.morphAttributes[name] = array;

         }

         // skinning

         if (geometry.skinIndices.length > 0) {

            var skinIndices = new Float32BufferAttribute(geometry.skinIndices.length * 4, 4, null);
            this.addAttribute('skinIndex', skinIndices.copyVector4sArray(geometry.skinIndices));

         }

         if (geometry.skinWeights.length > 0) {

            var skinWeights = new Float32BufferAttribute(geometry.skinWeights.length * 4, 4, null);
            this.addAttribute('skinWeight', skinWeights.copyVector4sArray(geometry.skinWeights));

         }

         //

         if (geometry.boundingSphere !== null) {

            this.boundingSphere = geometry.boundingSphere.clone();

         }

         if (geometry.boundingBox !== null) {

            this.boundingBox = geometry.boundingBox.clone();

         }

         return this;

      }

      public computeBoundingBox() {

         if (this.boundingBox === null) {

            this.boundingBox = new Box3();

         }

         var position = this.attributes.position;

         if (position !== undefined) {

            this.boundingBox.setFromBufferAttribute(position);

         } else {

            this.boundingBox.makeEmpty();

         }

         if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {

            console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);

         }

      }

      public computeBoundingSphere() {
         var box = new Box3();
         var vector = new Vector3();

         if (this.boundingSphere === null) {

            this.boundingSphere = new Sphere();

         }

         var position = this.attributes.position;

         if (position) {

            var center = this.boundingSphere.center;

            box.setFromBufferAttribute(position);
            box.getCenter(center);

            // hoping to find a boundingSphere with a radius smaller than the
            // boundingSphere of the boundingBox: sqrt(3) smaller in the best case

            var maxRadiusSq = 0;

            for (var i = 0, il = position.count; i < il; i++) {

               vector.x = position.getX(i);
               vector.y = position.getY(i);
               vector.z = position.getZ(i);
               maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

            }

            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

            if (isNaN(this.boundingSphere.radius)) {

               console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);

            }

         }

      };

      public computeFaceNormals() {

         // backwards compatibility

      }

      public computeVertexNormals() {

         var index = this.index;
         var attributes = this.attributes;
         var groups = this.groups;

         if (attributes.position) {

            var positions = attributes.position.array;

            if (attributes.normal === undefined) {

               this.addAttribute('normal', new BufferAttribute(new Float32Array(positions.length), 3, null));

            } else {

               // reset existing normals to zero

               var array = attributes.normal.array;

               for (var i = 0, il = array.length; i < il; i++) {

                  array[i] = 0;

               }

            }

            var normals = attributes.normal.array;

            var vA, vB, vC;
            var pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
            var cb = new Vector3(), ab = new Vector3();

            // indexed elements

            if (index) {

               var indices = index.array;

               if (groups.length === 0) {

                  this.addGroup(0, indices.length, null);

               }

               for (var j = 0, jl = groups.length; j < jl; ++j) {

                  var group = groups[j];

                  var start = group.start;
                  var count = group.count;

                  for (i = start, il = start + count; i < il; i += 3) {

                     vA = indices[i + 0] * 3;
                     vB = indices[i + 1] * 3;
                     vC = indices[i + 2] * 3;

                     pA.fromArray(positions, vA);
                     pB.fromArray(positions, vB);
                     pC.fromArray(positions, vC);

                     cb.subVectors(pC, pB);
                     ab.subVectors(pA, pB);
                     cb.cross(ab);

                     normals[vA] += cb.x;
                     normals[vA + 1] += cb.y;
                     normals[vA + 2] += cb.z;

                     normals[vB] += cb.x;
                     normals[vB + 1] += cb.y;
                     normals[vB + 2] += cb.z;

                     normals[vC] += cb.x;
                     normals[vC + 1] += cb.y;
                     normals[vC + 2] += cb.z;

                  }

               }

            } else {

               // non-indexed elements (unconnected triangle soup)

               for (var i = 0, il = positions.length; i < il; i += 9) {

                  pA.fromArray(positions, i);
                  pB.fromArray(positions, i + 3);
                  pC.fromArray(positions, i + 6);

                  cb.subVectors(pC, pB);
                  ab.subVectors(pA, pB);
                  cb.cross(ab);

                  normals[i] = cb.x;
                  normals[i + 1] = cb.y;
                  normals[i + 2] = cb.z;

                  normals[i + 3] = cb.x;
                  normals[i + 4] = cb.y;
                  normals[i + 5] = cb.z;

                  normals[i + 6] = cb.x;
                  normals[i + 7] = cb.y;
                  normals[i + 8] = cb.z;

               }

            }

            this.normalizeNormals();

            attributes.normal.needsUpdate = true;

         }

      }

      public merge(geometry: BufferGeometry, offset: number) {

         if (!(geometry && geometry.isBufferGeometry)) {

            console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry);
            return;

         }

         if (offset === undefined) {

            offset = 0;

            console.warn(
               'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
               + 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
            );

         }

         var attributes = this.attributes;

         for (var key in attributes) {

            if (geometry.attributes[key] === undefined) continue;

            var attribute1 = attributes[key];
            var attributeArray1 = attribute1.array;

            var attribute2 = geometry.attributes[key];
            var attributeArray2 = attribute2.array;

            var attributeSize = attribute2.itemSize;

            for (var i = 0, j = attributeSize * offset; i < attributeArray2.length; i++ , j++) {

               attributeArray1[j] = attributeArray2[i];

            }

         }

         return this;

      }

      public normalizeNormals() {
         var vector = new Vector3();

         var normals = this.attributes.normal;

         for (var i = 0, il = normals.count; i < il; i++) {

            vector.x = normals.getX(i);
            vector.y = normals.getY(i);
            vector.z = normals.getZ(i);

            vector.normalize();

            normals.setXYZ(i, vector.x, vector.y, vector.z);

         }
      }



      public toNonIndexed() {

         if (this.index === null) {

            console.warn('THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.');
            return this;

         }

         var geometry2 = new BufferGeometry();

         var indices = this.index.array;
         var attributes = this.attributes;

         for (var name in attributes) {

            var attribute = attributes[name];

            var array = attribute.array;
            var itemSize = attribute.itemSize;

            var array2 = new array.constructor(indices.length * itemSize);

            var index = 0, index2 = 0;

            for (var i = 0, l = indices.length; i < l; i++) {

               index = indices[i] * itemSize;

               for (var j = 0; j < itemSize; j++) {

                  array2[index2++] = array[index++];

               }

            }

            geometry2.addAttribute(name, new BufferAttribute(array2, itemSize, null));

         }

         var groups = this.groups;

         for (var i = 0, c = groups.length; i < c; i++) {

            var group = groups[i];
            geometry2.addGroup(group.start, group.count, group.materialIndex);

         }

         return geometry2;

      }

      public toJSON() {

         var data = {
            metadata: {
               version: 4.5,
               type: 'BufferGeometry',
               generator: 'BufferGeometry.toJSON'
            }
         } as any;

         // standard BufferGeometry serialization

         data.uuid = this.uuid;
         data.type = this.type;
         if (this.name !== '') data.name = this.name;

         if (this.parameters !== undefined) {

            var parameters = this.parameters;

            for (var key in parameters) {

               if (parameters[key] !== undefined) data[key] = parameters[key];

            }

            return data;

         }

         data.data = { attributes: {} };

         var index = this.index;

         if (index !== null) {

            var array = Array.prototype.slice.call(index.array);

            data.data.index = {
               type: index.array.constructor.name,
               array: array
            };

         }

         var attributes = this.attributes;

         for (var key in attributes) {

            var attribute = attributes[key];

            var array = Array.prototype.slice.call(attribute.array);

            data.data.attributes[key] = {
               itemSize: attribute.itemSize,
               type: attribute.array.constructor.name,
               array: array,
               normalized: attribute.normalized
            };

         }

         var groups = this.groups;

         if (groups.length > 0) {

            data.data.groups = JSON.parse(JSON.stringify(groups));

         }

         var boundingSphere = this.boundingSphere;

         if (boundingSphere !== null) {

            data.data.boundingSphere = {
               center: boundingSphere.center.toArray(),
               radius: boundingSphere.radius
            };

         }

         return data;

      }

      clone() {

         /*
          // Handle primitives
       
          var parameters = this.parameters;
       
          if ( parameters !== undefined ) {
       
          var values = [];
       
          for ( var key in parameters ) {
       
          values.push( parameters[ key ] );
       
          }
       
          var geometry = Object.create( this.constructor.prototype );
          this.constructor.apply( geometry, values );
          return geometry;
       
          }
       
          return new this.constructor().copy( this );
          */

         return new BufferGeometry().copy(this);

      }

      public copy(source: any) {

         var name, i, l;

         // reset

         this.index = null;
         this.attributes = {};
         this.morphAttributes = {};
         this.groups = [];
         this.boundingBox = null;
         this.boundingSphere = null;

         // name

         this.name = source.name;

         // index

         var index = source.index;

         if (index !== null) {

            this.setIndex(index.clone());

         }

         // attributes

         var attributes = source.attributes;

         for (name in attributes) {

            var attribute = attributes[name];
            this.addAttribute(name, attribute.clone());

         }

         // morph attributes

         var morphAttributes = source.morphAttributes;

         for (name in morphAttributes) {

            var array = [];
            var morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes

            for (i = 0, l = morphAttribute.length; i < l; i++) {

               array.push(morphAttribute[i].clone());

            }

            this.morphAttributes[name] = array;

         }

         // groups

         var groups = source.groups;

         for (i = 0, l = groups.length; i < l; i++) {

            var group = groups[i];
            this.addGroup(group.start, group.count, group.materialIndex);

         }

         // bounding box

         var boundingBox = source.boundingBox;

         if (boundingBox !== null) {

            this.boundingBox = boundingBox.clone();

         }

         // bounding sphere

         var boundingSphere = source.boundingSphere;

         if (boundingSphere !== null) {

            this.boundingSphere = boundingSphere.clone();

         }

         // draw range

         this.drawRange.start = source.drawRange.start;
         this.drawRange.count = source.drawRange.count;

         return this;

      }

      dispose() {
         this.dispatchEvent({ type: 'dispose' });
      }


   }
}