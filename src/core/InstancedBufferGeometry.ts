module Threets {
   export class InstancedBufferGeometry extends BufferGeometry {
      public type;
      public maxInstancedCount;
      public isInstancedBufferGeometry;
      constructor() {
         super();
         this.type = 'InstancedBufferGeometry';
         this.maxInstancedCount = undefined;
         this.isInstancedBufferGeometry = true;
      }

      public copy(source: any) {
         super.copy(source);
         this.maxInstancedCount = source.maxInstancedCount;
         return this;
      }

      public clone() {
         var instanceGeometry = new InstancedBufferGeometry();
         instanceGeometry.copy(this);
         return instanceGeometry;
      }

   }
}