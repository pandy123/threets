module Threets {
   export class SpriteMaterial extends Material {
      color: Color;
      map: any;
      rotation: number;
      public isSpriteMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'SpriteMaterial';
         this.color = new Color(0xffffff);
         this.map = null;
         this.rotation = 0;
         this.fog = false;
         this.lights = false;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.color.copy(source.color);
         this.map = source.map;
         this.rotation = source.rotation;
         return this;
      }
   }
}