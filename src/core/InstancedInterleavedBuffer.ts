module Threets {
   export class InstancedInterleavedBuffer extends InterleavedBuffer {
      public meshPerAttribute;
      public isInstancedInterleavedBuffer;
      constructor(array, stride, meshPerAttribute) {
         super(array, stride);
         this.meshPerAttribute = meshPerAttribute || 1;
         this.isInstancedInterleavedBuffer = true;
      }

      public copy(source: any) {
         super.copy(source);
         this.meshPerAttribute = source.meshPerAttribute;
         return this;
      }

   }
}


