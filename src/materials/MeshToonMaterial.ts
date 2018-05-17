module Threets {
   export class MeshToonMaterial extends MeshPhongMaterial {
      public defines:any;// { 'TOON': string; };
      public gradientMap: any;
      public isMeshToonMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.defines = { 'TOON': '' };
         this.type = 'MeshToonMaterial';
         this.gradientMap = null;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.gradientMap = source.gradientMap;
         return this;
      }
   }
}