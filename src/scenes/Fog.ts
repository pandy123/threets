module THREE {
   export class Fog {
      public far: any;
      public near: any;
      public color: Color;
      public name: string;
      public isFog: boolean = true;
      constructor(color, near, far) {
         this.name = '';
         this.color = new Color(color);
         this.near = (near !== undefined) ? near : 1;
         this.far = (far !== undefined) ? far : 1000;
      }
      public clone() {
         return new Fog(this.color, this.near, this.far);
      }
      public toJSON( /* meta */) {
         return {
            type: 'Fog',
            color: this.color.getHex(),
            near: this.near,
            far: this.far
         };
      }
   }
}