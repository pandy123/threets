module Threets {

   export class StereoCamera {
      public type: string;
      public aspect: number;
      public eyeSep: number;
      public cameraL: any;
      public cameraR: any;

      constructor() {
         this.type = 'StereoCamera';
         this.aspect = 1;
         this.eyeSep = 0.064;
         this.cameraL = new PerspectiveCamera(null, null, null, null);
         this.cameraL.layers.enable(1);
         this.cameraL.matrixAutoUpdate = false;
         this.cameraR = new PerspectiveCamera(null, null, null, null);
         this.cameraR.layers.enable(2);
         this.cameraR.matrixAutoUpdate = false;
      }


      public update(camera) {
         var instance, focus, fov, aspect, near, far, zoom, eyeSep;
         var eyeRight = new Matrix4();
         var eyeLeft = new Matrix4();
         var needsUpdate = instance !== this || focus !== camera.focus || fov !== camera.fov ||
            aspect !== camera.aspect * this.aspect || near !== camera.near ||
            far !== camera.far || zoom !== camera.zoom || eyeSep !== this.eyeSep;

         if (needsUpdate) {

            instance = this;
            focus = camera.focus;
            fov = camera.fov;
            aspect = camera.aspect * this.aspect;
            near = camera.near;
            far = camera.far;
            zoom = camera.zoom;

            // Off-axis stereoscopic effect based on
            // http://paulbourke.net/stereographics/stereorender/

            var projectionMatrix = camera.projectionMatrix.clone();
            eyeSep = this.eyeSep / 2;
            var eyeSepOnProjection = eyeSep * near / focus;
            var ymax = (near * Math.tan(_Math.DEG2RAD * fov * 0.5)) / zoom;
            var xmin, xmax;

            // translate xOffset

            eyeLeft.elements[12] = - eyeSep;
            eyeRight.elements[12] = eyeSep;

            // for left eye

            xmin = - ymax * aspect + eyeSepOnProjection;
            xmax = ymax * aspect + eyeSepOnProjection;

            projectionMatrix.elements[0] = 2 * near / (xmax - xmin);
            projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

            this.cameraL.projectionMatrix.copy(projectionMatrix);

            // for right eye

            xmin = - ymax * aspect - eyeSepOnProjection;
            xmax = ymax * aspect - eyeSepOnProjection;

            projectionMatrix.elements[0] = 2 * near / (xmax - xmin);
            projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);
            this.cameraR.projectionMatrix.copy(projectionMatrix);
         }

         this.cameraL.matrixWorld.copy(camera.matrixWorld).multiply(eyeLeft);
         this.cameraR.matrixWorld.copy(camera.matrixWorld).multiply(eyeRight);

      };
   }
}