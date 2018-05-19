module THREE {

   export class Light extends Object3D {

      public type;
      public color;
      public intensity;
      public receiveShadow;
      public isLight;
      public groundColor;
      public distance;
      public angle;
      public decay;
      public penumbra;
      public shadow;
      constructor(color, intensity) {
         super();
         this.type = 'Light';
         this.color = new Color(color);
         this.intensity = intensity !== undefined ? intensity : 1;
         this.receiveShadow = undefined;
         this.isLight = true;
      }

      public copy(source) {

         super.copy(source);

         this.color.copy(source.color);
         this.intensity = source.intensity;

         return this;

      }

      public toJSON(meta) {

         var data = super.toJSON(meta);

         data.object.color = this.color.getHex();
         data.object.intensity = this.intensity;

         if (this.groundColor !== undefined) data.object.groundColor = this.groundColor.getHex();

         if (this.distance !== undefined) data.object.distance = this.distance;
         if (this.angle !== undefined) data.object.angle = this.angle;
         if (this.decay !== undefined) data.object.decay = this.decay;
         if (this.penumbra !== undefined) data.object.penumbra = this.penumbra;

         if (this.shadow !== undefined) data.object.shadow = this.shadow.toJSON();
         return data;
      }
   }
}