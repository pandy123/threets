module Threets {
   export class RawShaderMaterial extends ShaderMaterial {
      public type: string;
      public isRawShaderMaterial = true;
      constructor(parameters) {
         // ShaderMaterial.call(this, parameters);
         super(parameters);
         this.type = 'RawShaderMaterial';
      }
   }
}