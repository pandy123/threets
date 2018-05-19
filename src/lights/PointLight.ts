module THREE {

   export class PointLight extends Light {
      public isPointLight;

      constructor(color, intensity, distance, decay) {

         super(color, intensity);
         this.type = 'PointLight';
         this.distance = (distance !== undefined) ? distance : 0;
         this.decay = (decay !== undefined) ? decay : 1;	// for physically correct lights, should be 2.
         this.shadow = new LightShadow(new PerspectiveCamera(90, 1, 0.5, 500));
         this.isPointLight = true;
      }

      public get power() {
         return this.intensity * 4 * Math.PI;
      }

      public set power(value) {
         // this.power = value;
      }
      public copy(source) {

         super.copy(source);
         this.distance = source.distance;
         this.decay = source.decay;
         this.shadow = source.shadow.clone();
         return this;

      }
   }
}
