module THREE {
   export class ShadowMaterial extends Material {
      color: Color;
      public isShadowMaterial: boolean = true;
      constructor(parameters) {
         super();
         this.type = 'ShadowMaterial';
         this.color = new Color(0x000000);
         this.transparent = true;
         this.setValues(parameters);
      }
      public copy(source) {
         super.copy(source);
         this.color.copy(source.color);
         return this;
      }
   }
}