module THREE {
   export class LineDashedMaterial extends LineBasicMaterial {
      public scale: number;
      public dashSize: number;
      public gapSize: number;
      public isLineDashedMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'LineDashedMaterial';
         this.scale = 1;
         this.dashSize = 3;
         this.gapSize = 1;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.scale = source.scale;
         this.dashSize = source.dashSize;
         this.gapSize = source.gapSize;
         return this;
      }
   }
}
