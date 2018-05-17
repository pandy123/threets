module Threets {

   export class BufferAttribute {

      public name: string;
      public array: any;
      public itemSize: number;
      public count: number;
      public normalized: boolean;
      public dynamic: any;
      public version: number;
      public updateRange: any;
      public isBufferAttribute: boolean;

      constructor(array: any, itemSize: any, normalized?: any) {
         if (Array.isArray(array)) {
            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
         }

         this.name = '';
         this.array = array;
         this.itemSize = itemSize;
         this.count = array !== undefined ? array.length / itemSize : 0;
         this.normalized = normalized === true;
         this.dynamic = false;
         this.updateRange = { offset: 0, count: - 1 };
         this.version = 0;
         this.isBufferAttribute = true;
      }

      public needsUpdate() {
         var self = this;
         return {
            set: function (value) {
               if (value === true) self.version++;
            }
         }
      }


      public onUploadCallback() {

      }

      public setArray(array: any) {

         if (Array.isArray(array)) {

            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

         }

         this.count = array !== undefined ? array.length / this.itemSize : 0;
         this.array = array;

         return this;

      }

      public setDynamic(value: any) {

         this.dynamic = value;

         return this;

      }

      public copy(source: any) {

         this.name = source.name;
         this.array = new source.array.constructor(source.array);
         this.itemSize = source.itemSize;
         this.count = source.count;
         this.normalized = source.normalized;

         this.dynamic = source.dynamic;

         return this;

      }

      public copyAt(index1: number, attribute: any, index2: number) {

         index1 *= this.itemSize;
         index2 *= attribute.itemSize;

         for (var i = 0, l = this.itemSize; i < l; i++) {

            this.array[index1 + i] = attribute.array[index2 + i];

         }
         return this;

      }

      public copyArray(array: any) {

         this.array.set(array);

         return this;

      }

      public copyColorsArray(colors: any) {

         var array = this.array, offset = 0;

         for (var i = 0, l = colors.length; i < l; i++) {

            var color = colors[i];

            if (color === undefined) {

               console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
               color = new Color(null, null, null);
            }

            array[offset++] = color.r;
            array[offset++] = color.g;
            array[offset++] = color.b;

         }

         return this;

      }

      public copyVector2sArray(vectors: any) {

         var array = this.array, offset = 0;

         for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

               console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
               vector = new Vector2();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;

         }

         return this;

      }

      public copyVector3sArray(vectors: any) {

         var array = this.array, offset = 0;

         for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

               console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
               vector = new Vector3();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;

         }

         return this;

      }

      public copyVector4sArray(vectors: any) {

         var array = this.array, offset = 0;

         for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

               console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
               vector = new Vector4();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
            array[offset++] = vector.w;

         }

         return this;

      }

      public set(value: any, offset: number) {

         if (offset === undefined) offset = 0;

         this.array.set(value, offset);

         return this;

      }

      public getX(index: number) {

         return this.array[index * this.itemSize];

      }

      public setX(index: number, x: any) {

         this.array[index * this.itemSize] = x;

         return this;

      }

      public getY(index: number) {

         return this.array[index * this.itemSize + 1];

      }

      public setY(index: number, y: any) {

         this.array[index * this.itemSize + 1] = y;

         return this;

      }

      public getZ(index: number) {

         return this.array[index * this.itemSize + 2];

      }

      public setZ(index: number, z: any) {

         this.array[index * this.itemSize + 2] = z;

         return this;

      }

      public getW(index: number) {

         return this.array[index * this.itemSize + 3];

      }

      public setW(index: number, w: number) {

         this.array[index * this.itemSize + 3] = w;

         return this;

      }

      public setXY(index: number, x: number, y: number) {

         index *= this.itemSize;

         this.array[index + 0] = x;
         this.array[index + 1] = y;

         return this;

      }

      public setXYZ(index: number, x: number, y: number, z: number) {

         index *= this.itemSize;

         this.array[index + 0] = x;
         this.array[index + 1] = y;
         this.array[index + 2] = z;

         return this;

      }

      public setXYZW(index: number, x: number, y: number, z: number, w: number) {

         index *= this.itemSize;

         this.array[index + 0] = x;
         this.array[index + 1] = y;
         this.array[index + 2] = z;
         this.array[index + 3] = w;

         return this;

      }

      public onUpload(callback: any) {

         this.onUploadCallback = callback;

         return this;

      }

      public clone() {
         var bufferattribute = new BufferAttribute(this.array, this.itemSize, null);
         bufferattribute.copy(this);

         return bufferattribute;

      }
   }


   export class Int8BufferAttribute extends BufferAttribute {
      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }



   }

   export class Uint8BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }

   export class Uint8ClampedBufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }


   export class Int16BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }


   export class Uint16BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }

   export class Int32BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }

   export class Uint32BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }

   export class Float32BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized?: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }

   export class Float64BufferAttribute extends BufferAttribute {

      constructor(array: any, itemSize: number, normalized: any) {
         super(new Int8Array(array), itemSize, normalized);
      }

   }
};

