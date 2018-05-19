module THREE {

   export class DirectionalLight extends Light {
      public type;
      public position: any;
      public target;
      public shadow;
      public isDirectionalLight;

      constructor(color, intensity) {


         super(color, intensity);

         this.type = 'DirectionalLight';

         this.position.copy(Object3D.DefaultUp);
         this.updateMatrix();

         this.target = new Object3D();

         this.shadow = new DirectionalLightShadow();
         this.isDirectionalLight = true;

      }



      public copy(source) {

         super.copy(source);

         this.target = source.target.clone();

         this.shadow = source.shadow.clone();

         return this;

      }
   }
}

