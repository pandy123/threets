module Threets {
   export class Group extends Object3D {
      public isGroup: boolean = true;
      constructor() {
         super();
         this.type = 'Group';
      }
   }
}