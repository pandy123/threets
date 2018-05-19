module THREE {
   export class ImmediateRenderObject extends Object3D {
      public material;
      public isImmediateRenderObject;
      constructor() {
         super();
         this.isImmediateRenderObject = true;
      }
      public render() {

      }

   }
}