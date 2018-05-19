module THREE {
   export class PointsMaterial extends Material {
      public color: Color;
      public map: any;
      public size: number;
      public sizeAttenuation: boolean;
      public isPointsMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'PointsMaterial';
         this.color = new Color(0xffffff);
         this.map = null;
         this.size = 1;
         this.sizeAttenuation = true;
         this.lights = false;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.color.copy(source.color);
         this.map = source.map;
         this.size = source.size;
         this.sizeAttenuation = source.sizeAttenuation;
         return this;
      }
   }
}