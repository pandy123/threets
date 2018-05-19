module THREE {

   export class AudioListener extends Object3D {
      public type: string;
      public context: any;
      public gain: any;
      public filter: any;
      constructor() {
         super();
         this.type = 'AudioListener';
         this.context = AudioContext.getContext();
         this.gain = this.context.createGain();
         this.gain.connect(this.context.destination);
         this.filter = null;

      }

      public getInput() {

         return this.gain;

      }

      public removeFilter() {

         if (this.filter !== null) {

            this.gain.disconnect(this.filter);
            this.filter.disconnect(this.context.destination);
            this.gain.connect(this.context.destination);
            this.filter = null;

         }

      }

      public getFilter() {

         return this.filter;

      }

      public setFilter(value) {

         if (this.filter !== null) {

            this.gain.disconnect(this.filter);
            this.filter.disconnect(this.context.destination);

         } else {

            this.gain.disconnect(this.context.destination);

         }

         this.filter = value;
         this.gain.connect(this.filter);
         this.filter.connect(this.context.destination);

      }

      public getMasterVolume() {

         return this.gain.gain.value;

      }

      public setMasterVolume(value) {

         this.gain.gain.setTargetAtTime(value, this.context.currentTime, 0.01);

      }

      public updateMatrixWorld(force) {
         var position = new Vector3();
         var quaternion = new Quaternion();
         var scale = new Vector3();

         var orientation = new Vector3();

         Object3D.prototype.updateMatrixWorld.call(this, force);

         var listener = this.context.listener;
         var up = this.up;

         this.matrixWorld.decompose(position, quaternion, scale);

         orientation.set(0, 0, - 1).applyQuaternion(quaternion);

         if (listener.positionX) {

            listener.positionX.setValueAtTime(position.x, this.context.currentTime);
            listener.positionY.setValueAtTime(position.y, this.context.currentTime);
            listener.positionZ.setValueAtTime(position.z, this.context.currentTime);
            listener.forwardX.setValueAtTime(orientation.x, this.context.currentTime);
            listener.forwardY.setValueAtTime(orientation.y, this.context.currentTime);
            listener.forwardZ.setValueAtTime(orientation.z, this.context.currentTime);
            listener.upX.setValueAtTime(up.x, this.context.currentTime);
            listener.upY.setValueAtTime(up.y, this.context.currentTime);
            listener.upZ.setValueAtTime(up.z, this.context.currentTime);

         } else {

            listener.setPosition(position.x, position.y, position.z);
            listener.setOrientation(orientation.x, orientation.y, orientation.z, up.x, up.y, up.z);

         }

      };
   }
}