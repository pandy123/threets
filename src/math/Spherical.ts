module THREE {
   declare var _Math: any;
   export class Spherical {
      public radius: number;
      public phi: number;
      public theta: number;
      constructor(radius?: number, phi?: number, theta?: number) {
         this.radius = (radius !== undefined) ? radius : 1.0;
         this.phi = (phi !== undefined) ? phi : 0; // up / down towards top and bottom pole
         this.theta = (theta !== undefined) ? theta : 0; // around the equator of the sphere
         return this;
      }

      public set(radius: number, phi: number, theta: number): Spherical {
         this.radius = radius;
         this.phi = phi;
         this.theta = theta;
         return this;
      }

      public clone() {
         return new Spherical().copy(this);
      }

      public copy(other: Spherical): Spherical {
         this.radius = other.radius;
         this.phi = other.phi;
         this.theta = other.theta;
         return this;
      }

      // restrict phi to be betwee EPS and PI-EPS
      public makeSafe() {
         var EPS = 0.000001;
         this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
         return this;
      }

      public setFromVector3(vec3: Vector3) {
         this.radius = vec3.length();
         if (this.radius === 0) {
            this.theta = 0;
            this.phi = 0;
         } else {
            this.theta = Math.atan2(vec3.x, vec3.z); // equator angle around y-up axis
            this.phi = Math.acos(_Math.clamp(vec3.y / this.radius, - 1, 1)); // polar angle
         }
         return this;
      }
   }
}
