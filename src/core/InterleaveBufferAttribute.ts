module THREE {
   export class InterleavedBufferAttribute {
      public data: any;
      public itemSize: any;
      public offset: any;
      public normalized: boolean;
      public _count: number;
      public isInterleavedBufferAttribute: boolean = true;

      constructor(interleavedBuffer, itemSize, offset, normalized) {
         this.data = interleavedBuffer;
         this.itemSize = itemSize;
         this.offset = offset;
         this.normalized = normalized === true;
      }

      public get count() {
         return this.data.count;
      }

      public get array() {
         return this.data.array;
      }

      public setX(index, x) {
         this.data.array[index * this.data.stride + this.offset] = x;
         return this;
      }

      public setY(index, y) {
         this.data.array[index * this.data.stride + this.offset + 1] = y;
         return this;
      }

      public setZ(index, z) {
         this.data.array[index * this.data.stride + this.offset + 2] = z;
         return this;
      }

      public setW(index, w) {
         this.data.array[index * this.data.stride + this.offset + 3] = w;
         return this;
      }

      public getX(index) {
         return this.data.array[index * this.data.stride + this.offset];
      }

      public getY(index) {
         return this.data.array[index * this.data.stride + this.offset + 1];
      }

      public getZ(index) {
         return this.data.array[index * this.data.stride + this.offset + 2];
      }

      public getW(index) {
         return this.data.array[index * this.data.stride + this.offset + 3];
      }

      public setXY(index, x, y) {
         index = index * this.data.stride + this.offset;
         this.data.array[index + 0] = x;
         this.data.array[index + 1] = y;
         return this;
      }

      public setXYZ(index, x, y, z) {
         index = index * this.data.stride + this.offset;
         this.data.array[index + 0] = x;
         this.data.array[index + 1] = y;
         this.data.array[index + 2] = z;
         return this;
      }

      public setXYZW(index, x, y, z, w) {
         index = index * this.data.stride + this.offset;
         this.data.array[index + 0] = x;
         this.data.array[index + 1] = y;
         this.data.array[index + 2] = z;
         this.data.array[index + 3] = w;
         return this;
      }
   }
}