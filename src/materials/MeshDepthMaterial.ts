module THREE {
   export class MeshDepthMaterial extends Material {
      depthPacking: number;
      skinning: boolean;
      morphTargets: boolean;
      map: any;
      alphaMap: any;
      displacementMap: any;
      displacementScale: number;
      displacementBias: number;
      wireframe: boolean;
      wireframeLinewidth: number;
      public isMeshDepthMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'MeshDepthMaterial';
         this.depthPacking = BasicDepthPacking;
         this.skinning = false;
         this.morphTargets = false;
         this.map = null;
         this.alphaMap = null;
         this.displacementMap = null;
         this.displacementScale = 1;
         this.displacementBias = 0;
         this.wireframe = false;
         this.wireframeLinewidth = 1;
         this.fog = false;
         this.lights = false;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.depthPacking = source.depthPacking;
         this.skinning = source.skinning;
         this.morphTargets = source.morphTargets;
         this.map = source.map;
         this.alphaMap = source.alphaMap;
         this.displacementMap = source.displacementMap;
         this.displacementScale = source.displacementScale;
         this.displacementBias = source.displacementBias;
         this.wireframe = source.wireframe;
         this.wireframeLinewidth = source.wireframeLinewidth;
         return this;
      }
   }
}