module Threets {

   export class HemisphereLight extends Light {
      public type;
      public castShadow;
      public postion;
      public position;
      public groundColor;
      public isHemisphereLight;

      constructor(skyColor, groundColor, intensity) {

         super(skyColor, intensity);

         this.type = 'HemisphereLight';

         this.castShadow = undefined;

         this.position.copy(Object3D.DefaultUp);
         this.updateMatrix();

         this.groundColor = new Color(groundColor);
         this.isHemisphereLight = true;
      }


      public copy(source) {

         super.copy(source);

         this.groundColor.copy(source.groundColor);

         return this;

      }



   }
}
