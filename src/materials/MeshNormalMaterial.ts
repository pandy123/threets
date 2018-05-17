module Threets {
   export class MeshNormalMaterial extends Material {
      public bumpMap: any;
      public bumpScale: number;
      public normalMap: any;
      public normalScale: Vector2;
      public displacementMap: any;
      public displacementScale: number;
      public displacementBias: number;
      public wireframe: boolean;
      public wireframeLinewidth: number;
      public skinning: boolean;
      public morphTargets: boolean;
      public morphNormals: boolean;
      public isMeshNormalMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'MeshNormalMaterial';
         this.bumpMap = null;
         this.bumpScale = 1;
         this.normalMap = null;
         this.normalScale = new Vector2(1, 1);
         this.displacementMap = null;
         this.displacementScale = 1;
         this.displacementBias = 0;
         this.wireframe = false;
         this.wireframeLinewidth = 1;
         this.fog = false;
         this.lights = false;
         this.skinning = false;
         this.morphTargets = false;
         this.morphNormals = false;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.bumpMap = source.bumpMap;
         this.bumpScale = source.bumpScale;
         this.normalMap = source.normalMap;
         this.normalScale.copy(source.normalScale);
         this.displacementMap = source.displacementMap;
         this.displacementScale = source.displacementScale;
         this.displacementBias = source.displacementBias;
         this.wireframe = source.wireframe;
         this.wireframeLinewidth = source.wireframeLinewidth;
         this.skinning = source.skinning;
         this.morphTargets = source.morphTargets;
         this.morphNormals = source.morphNormals;
         return this;
      }
   }
}