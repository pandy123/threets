module THREE {
   export class FogExp2 {
      density: any;
      color: Color;
      name: string;
      public isFogExp2: boolean = true;
      constructor(color, density) {
         this.name = '';
         this.color = new Color(color);
         this.density = (density !== undefined) ? density : 0.00025;
      }
      public clone() {
         return new FogExp2(this.color, this.density);
      }
      public toJSON( /* meta */) {
         return {
            type: 'FogExp2',
            color: this.color.getHex(),
            density: this.density
         }
      }
   }
}