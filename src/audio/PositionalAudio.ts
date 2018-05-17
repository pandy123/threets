module Threets {

   export class PositionalAudio extends Audio {
      public panner: any;
      constructor(listener) {
         super(listener);
         this.panner = this.context.createPanner();
         this.panner.connect(this.gain);
      }

      public getOutput() {

         return this.panner;

      }

      public getRefDistance() {

         return this.panner.refDistance;

      }

      public setRefDistance(value) {

         this.panner.refDistance = value;

      }

      public getRolloffFactor() {

         return this.panner.rolloffFactor;

      }

      public setRolloffFactor(value) {

         this.panner.rolloffFactor = value;

      }

      public getDistanceModel() {

         return this.panner.distanceModel;

      }

      public setDistanceModel(value) {

         this.panner.distanceModel = value;

      }

      public getMaxDistance() {

         return this.panner.maxDistance;

      }

      public setMaxDistance(value) {

         this.panner.maxDistance = value;

      }

      public updateMatrixWorld(force) {
         var position = new Vector3();

         Object3D.prototype.updateMatrixWorld.call(this, force);

         position.setFromMatrixPosition(this.matrixWorld);

         this.panner.setPosition(position.x, position.y, position.z);

      };
   }
}