
module THREE {
   export class Face3 {
      // Geometry sortFacesByMaterialIndex 排序使用
      public _id :number;
      
      //point index;
      public a:number;
      public b:number;
      public c:number;

      public normal:Vector3;
      public vertexNormals:Array<Vector3>;

      public color:Color;
      public vertexColors:Array<Color>;

      public materialIndex:number;

      constructor(a?:number, b?:number, c?:number, normal?:Vector3 | Array<Vector3>, color?:Color|Array<Color>, materialIndex?:number) {
         this.a = a;
         this.b = b;
         this.c = c;

         this.normal = (normal && (normal as any).isVector3) ? normal as Vector3 : new Vector3(null, null, null);
         this.vertexNormals = Array.isArray(normal) ? normal : [];

         this.color = (color && (color as any).isColor) ? color as Color : new Color(null, null, null);
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