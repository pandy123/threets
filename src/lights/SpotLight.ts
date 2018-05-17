module Threets {

   export class SpotLight extends Light {

      public target;
      public isSpotLight;

      constructor(color, intensity, distance, angle, penumbra, decay) {

         super(color, intensity);

         this.type = 'SpotLight';

         this.position.copy(Object3D.DefaultUp);
         this.updateMatrix();

         this.target = new Object3D();
         this.isSpotLight = true,

            this.distance = (distance !== undefined) ? distance : 0;
         this.angle = (angle !== undefined) ? angle : Math.PI / 3;
         this.penumbra = (penumbra !== undefined) ? penumbra : 0;
         this.decay = (decay !== undefined) ? decay : 1;	// for physically correct lights, should be 2.

         this.shadow = new SpotLightShadow();

      }

      public set power(power) {
         this.intensity = power / Math.PI;
      }
      public get power() {
         return this.intensity * Math.PI;
      }

      public copy(source) {

         super.copy(source);

         this.distance = source.distance;
         this.angle = source.angle;
         this.penumbra = source.penumbra;
         this.decay = source.decay;

         this.target = source.target.clone();

         this.shadow = source.shadow.clone();

         return this;

      }

   }
}
