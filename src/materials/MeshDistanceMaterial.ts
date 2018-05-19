module THREE {
   export class MeshDistanceMaterial extends Material {
      referencePosition: Vector3;
      nearDistance: number;
      farDistance: number;
      skinning: boolean;
      morphTargets: boolean;
      map: any;
      alphaMap: any;
      displacementMap: any;
      displacementScale: number;
      displacementBias: number;
      public isMeshDistanceMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'MeshDistanceMaterial';
         this.referencePosition = new Vector3();
         this.nearDistance = 1;
         this.farDistance = 1000;
         this.skinning = false;
         this.morphTargets = false;
         this.map = null;
         this.alphaMap = null;
         this.displacementMap = null;
         this.displacementScale = 1;
         this.displacementBias = 0;
         this.fog = false;
         this.lights = false;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.referencePosition.copy(source.referencePosition);
         this.nearDistance = source.nearDistance;
         this.farDistance = source.farDistance;
         this.skinning = source.skinning;
         this.morphTargets = source.morphTargets;
         this.map = source.map;
         this.alphaMap = source.alphaMap;
         this.displacementMap = source.displacementMap;
         this.displacementScale = source.displacementScale;
         this.displacementBias = source.displacementBias;
         return this;
      }
   }
}