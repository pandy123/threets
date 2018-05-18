
module Threets {
   export class Face3 {

      public a;
      public b;
      public c;

      public normal;
      public vertexNormals;

      public color;
      public vertexColors;

      public materialIndex;

      constructor(a?, b?, c?, normal?, color?, materialIndex?) {
         this.a = a;
         this.b = b;
         this.c = c;

         this.normal = (normal && normal.isVector3) ? normal : new Vector3(null, null, null);
         this.vertexNormals = Array.isArray(normal) ? normal : [];

         this.color = (color && color.isColor) ? color : new Color(null, null, null);
         this.vertexColors = Array.isArray(color) ? color : [];

         this.materialIndex = materialIndex !== undefined ? materialIndex : 0;
      }

      public clone() {
         var face3 = new Face3(null, null, null, null, null, null);
         face3.copy(this);

         return face3;

      }

      public copy(source) {

         this.a = source.a;
         this.b = source.b;
         this.c = source.c;

         this.normal.copy(source.normal);
         this.color.copy(source.color);

         this.materialIndex = source.materialIndex;

         for (var i = 0, il = source.vertexNormals.length; i < il; i++) {

            this.vertexNormals[i] = source.vertexNormals[i].clone();

         }

         for (var i = 0, il = source.vertexColors.length; i < il; i++) {

            this.vertexColors[i] = source.vertexColors[i].clone();

         }
         return this;
      }

   }
}