module Threets {
   export class Bone extends Object3D {
      public isBone: boolean = true;
      constructor() {
         super();
         this.type = 'Bone';
      }
   }
}