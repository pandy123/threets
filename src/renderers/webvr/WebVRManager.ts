module Threets {
   declare var window;
   export class WebVRManager {

      public enabled;
      public userHeight;
      public device;
      public currentPixelRatio;
      public currentSize;
      public renderer;
      public poseTarget;
      public frameData;
      public standingMatrix;
      public standingMatrixInverse;
      public matrixWorldInverse;
      public tempQuaternion;
      public tempPosition;
      public cameraL;
      public cameraR;
      public cameraVR;

      constructor(renderer) {
         this.renderer = renderer;

         var scope = this;

         this.device = null;
         this.frameData = null;

         this.poseTarget = null;

         this.standingMatrix = new Matrix4();
         this.standingMatrixInverse = new Matrix4();

         if (typeof window !== 'undefined' && 'VRFrameData' in window) {

            this.frameData = new (window as any).VRFrameData();
            window.addEventListener('vrdisplaypresentchange', this.onVRDisplayPresentChange, false);

         }

         this.matrixWorldInverse = new Matrix4();
         this.tempQuaternion = new Quaternion();
         this.tempPosition = new Vector3();

         this.cameraL = new PerspectiveCamera(null, null, null, null);
         this.cameraL.bounds = new Vector4(0.0, 0.0, 0.5, 1.0);
         this.cameraL.layers.enable(1);

         this.cameraR = new PerspectiveCamera(null, null, null, null);
         this.cameraR.bounds = new Vector4(0.5, 0.0, 0.5, 1.0);
         this.cameraR.layers.enable(2);

         this.cameraVR = new ArrayCamera([this.cameraL, this.cameraR]);
         this.cameraVR.layers.enable(1);
         this.cameraVR.layers.enable(2);

         //

         this.enabled = false;
         this.userHeight = 1.6;

      }

      public isPresenting() {

         return this.device !== null && this.device.isPresenting === true;

      }



      public onVRDisplayPresentChange() {

         if (this.isPresenting()) {

            var eyeParameters = this.device.getEyeParameters('left');
            var renderWidth = eyeParameters.renderWidth;
            var renderHeight = eyeParameters.renderHeight;

            this.currentPixelRatio = this.renderer.getPixelRatio();
            this.currentSize = this.renderer.getSize();

            this.renderer.setDrawingBufferSize(renderWidth * 2, renderHeight, 1);

         } else if (this.enabled) {

            this.renderer.setDrawingBufferSize(this.currentSize.width, this.currentSize.height, this.currentPixelRatio);

         }

      }

      public getDevice() {

         return this.device;

      };

      public setDevice(value) {

         if (value !== undefined) this.device = value;

      };

      public setPoseTarget(object) {

         if (object !== undefined) this.poseTarget = object;

      };

      public getCamera(camera) {

         if (this.device === null) return camera;

         this.device.depthNear = camera.near;
         this.device.depthFar = camera.far;

         this.device.getFrameData(this.frameData);

         //

         var stageParameters = this.device.stageParameters;

         if (stageParameters) {

            this.standingMatrix.fromArray(stageParameters.sittingToStandingTransform);

         } else {

            this.standingMatrix.makeTranslation(0, this.userHeight, 0);

         }


         var pose = this.frameData.pose;
         var poseObject = this.poseTarget !== null ? this.poseTarget : camera;

         // We want to manipulate poseObject by its position and quaternion components since users may rely on them.
         poseObject.matrix.copy(this.standingMatrix);
         poseObject.matrix.decompose(poseObject.position, poseObject.quaternion, poseObject.scale);

         if (pose.orientation !== null) {

            this.tempQuaternion.fromArray(pose.orientation);
            poseObject.quaternion.multiply(this.tempQuaternion);

         }

         if (pose.position !== null) {

            this.tempQuaternion.setFromRotationMatrix(this.standingMatrix);
            this.tempPosition.fromArray(pose.position);
            this.tempPosition.applyQuaternion(this.tempQuaternion);
            poseObject.position.add(this.tempPosition);

         }

         poseObject.updateMatrixWorld();

         if (this.device.isPresenting === false) return camera;

         //

         this.cameraL.near = camera.near;
         this.cameraR.near = camera.near;

         this.cameraL.far = camera.far;
         this.cameraR.far = camera.far;

         this.cameraVR.matrixWorld.copy(camera.matrixWorld);
         this.cameraVR.matrixWorldInverse.copy(camera.matrixWorldInverse);

         this.cameraL.matrixWorldInverse.fromArray(this.frameData.leftViewMatrix);
         this.cameraR.matrixWorldInverse.fromArray(this.frameData.rightViewMatrix);

         // TODO (mrdoob) Double check this code

         this.standingMatrixInverse.getInverse(this.standingMatrix);

         this.cameraL.matrixWorldInverse.multiply(this.standingMatrixInverse);
         this.cameraR.matrixWorldInverse.multiply(this.standingMatrixInverse);

         var parent = poseObject.parent;

         if (parent !== null) {

            this.matrixWorldInverse.getInverse(parent.matrixWorld);

            this.cameraL.matrixWorldInverse.multiply(this.matrixWorldInverse);
            this.cameraR.matrixWorldInverse.multiply(this.matrixWorldInverse);

         }

         // envMap and Mirror needs camera.matrixWorld

         this.cameraL.matrixWorld.getInverse(this.cameraL.matrixWorldInverse);
         this.cameraR.matrixWorld.getInverse(this.cameraR.matrixWorldInverse);

         this.cameraL.projectionMatrix.fromArray(this.frameData.leftProjectionMatrix);
         this.cameraR.projectionMatrix.fromArray(this.frameData.rightProjectionMatrix);

         // HACK (mrdoob)
         // https://github.com/w3c/webvr/issues/203

         this.cameraVR.projectionMatrix.copy(this.cameraL.projectionMatrix);

         //

         var layers = this.device.getLayers();

         if (layers.length) {

            var layer = layers[0];

            if (layer.leftBounds !== null && layer.leftBounds.length === 4) {

               this.cameraL.bounds.fromArray(layer.leftBounds);

            }

            if (layer.rightBounds !== null && layer.rightBounds.length === 4) {

               this.cameraR.bounds.fromArray(layer.rightBounds);

            }

         }

         return this.cameraVR;

      };

      public getStandingMatrix() {

         return this.standingMatrix;

      };



      public requestAnimationFrame(callback) {

         this.device.requestAnimationFrame(callback);

      };

      public submitFrame() {

         if (this.isPresenting()) this.device.submitFrame();

      };

      public dispose() {

         if (typeof window !== 'undefined') {

            window.removeEventListener('vrdisplaypresentchange', this.onVRDisplayPresentChange);

         }
      };

   }

}