
module THREE {
   export class InstancedBufferAttribute extends BufferAttribute {
      public meshPerAttribute;
      public isInstancedBufferAttribute;
      constructor(array, itemSize, meshPerAttribute) {
         super(array, itemSize, meshPerAttribute);
         this.meshPerAttribute = meshPerAttribute || 1;
         this.isInstancedBufferAttribute = true;
      }

      public copy(source: any) {
         super.copy(source);
         this.meshPerAttribute = source.meshPerAttribute;
         return this;
      }

   }
}