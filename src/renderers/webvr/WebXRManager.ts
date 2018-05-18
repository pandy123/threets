module Threets {



   export class WebXRManager {

      public frameOfRef;
      public session;
      public device;
      public isExclusive;
      public pose;
      public enabled;
      public gl;
      public cameraL;
      public cameraR;
      public cameraVR;

      public framCallback;

      constructor(gl) {

         var scope = this;
         this.gl = gl;

         this.device = null;
         this.session = null;

         this.frameOfRef = null;
         this.isExclusive = false;

         this.pose = null;
         //
         this.cameraL = new PerspectiveCamera();
         this.cameraL.layers.enable(1);
         this.cameraL.viewport = new Vector4();

         this.cameraR = new PerspectiveCamera();
         this.cameraR.layers.enable(2);
         this.cameraR.viewport = new Vector4();

         var cameraVR = new ArrayCamera([this.cameraL, this.cameraR]);
         cameraVR.layers.enable(1);
         cameraVR.layers.enable(2);

         //
         this.enabled = false;
      }

      public isPresenting() {

         return this.session !== null && this.frameOfRef !== null;

      }

      public getDevice() {

         return this.device;

      };

      public setDevice(value) {

         if (value !== undefined) this.device = value;

         this.gl.setCompatibleXRDevice(value);

      };

      public setSession(value) {

         this.session = value;

         if (this.session !== null) {

            this.session.baseLayer = new XRWebGLLayer(this.session, this.gl);
            this.session.requestFrameOfReference('stage').then(function (value) {

               this.frameOfRef = value;
               this.isExclusive = this.session.exclusive;

            });

         }

      };

      public getCamera(camera) {

         return this.isPresenting() ? this.cameraVR : camera;

      };

      public onFrame(time, frame) {

         this.pose = frame.getDevicePose(this.frameOfRef);

         var layer = this.session.baseLayer;
         var views = frame.views;

         for (var i = 0; i < views.length; i++) {

            var view = views[i];
            var viewport = layer.getViewport(view);
            var viewMatrix = this.pose.getViewMatrix(view);

            var camera = this.cameraVR.cameras[i];
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.matrixWorldInverse.fromArray(viewMatrix);
            camera.matrixWorld.getInverse(camera.matrixWorldInverse);
            camera.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);

            if (i === 0) {

               this.cameraVR.matrixWorld.copy(camera.matrixWorld);
               this.cameraVR.matrixWorldInverse.copy(camera.matrixWorldInverse);

               // HACK (mrdoob)
               // https://github.com/w3c/webvr/issues/203

               this.cameraVR.projectionMatrix.copy(camera.projectionMatrix);

            }

         }

         this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.session.baseLayer.framebuffer);

         if (this.framCallback) {
            this.framCallback();

         }
      }

      public requestAnimationFrame(callback) {
         this.framCallback = callback;
         this.session.requestAnimationFrame(this.onFrame);
      };

      // DEPRECATED

      public getStandingMatrix() {

         console.warn('THREE.WebXRManager: getStandingMatrix() is no longer needed.');
         return new Matrix4();

      };

      public submitFrame() { };

   }
}