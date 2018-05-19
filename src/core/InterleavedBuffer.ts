module THREE {
   export class InterleavedBuffer {
      public array: any;
      public stride: any;
      public count: number;
      public dynamic: boolean;
      public updateRange: any;
      public version = 0;
      public isInterleavedBuffer: true;
      constructor(array?, stride?) {
         this.array = array;
         this.stride = stride;
         this.count = array !== undefined ? array.length / stride : 0;
         this.dynamic = false;
         this.updateRange = { offset: 0, count: - 1 };
         this.version = 0;
      }
      public set needsUpdate(value) {
         if (value === true) this.version++;
      }

      public onUploadCallback() { }
      public setArray(array) {
         if (Array.isArray(array)) {
            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
         }
         this.count = array !== undefined ? array.length / this.stride : 0;
         this.array = array;
         return this;
      }
      public setDynamic(value) {
         this.dynamic = value;
         return this;
      }
      public copy(source) {
         this.array = new source.array.constructor(source.array);
         this.count = source.count;
         this.stride = source.stride;
         this.dynamic = source.dynamic;
         return this;
      }
      public copyAt(index1, attribute, index2) {
         index1 *= this.stride;
         index2 *= attribute.stride;
         for (var i = 0, l = this.stride; i < l; i++) {
            this.array[index1 + i] = attribute.array[index2 + i];
         }
         return this;
      }
      public set(value, offset) {
         if (offset === undefined) offset = 0;
         this.array.set(value, offset);
         return this;
      }
      public clone() {
         return new InterleavedBuffer().copy(this);
      }
      public onUpload(callback) {
         this.onUploadCallback = callback;
         return this;
      }
   }
}
