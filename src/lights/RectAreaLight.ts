module THREE {

   export class RectAreaLight extends Light {
      public width;
      public height;
      public isRectAreaLight;

      constructor(color, intensity, width, height) {
         super(color, intensity);
         this.type = 'RectAreaLight';
         this.width = (width !== undefined) ? width : 10;
         this.height = (height !== undefined) ? height : 10;
         this.isRectAreaLight = true;
      }


      public copy(source) {
         super.copy(source);
         this.width = source.width;
         this.height = source.height;
         return this;

      }

      public toJSON(meta) {

         var data = super.toJSON(meta);
         data.object.width = this.width;
         data.object.height = this.height;

         return data;

      }
   }
}
