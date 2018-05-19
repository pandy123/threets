

module THREE {

   export class Camera extends Object3D {

      public type: string;
      public matrixWorldInverse: Matrix4;
      public projectionMatrix: Matrix4;

      public isCamera: boolean;

      constructor() {
         super();
         this.type = 'Camera';
         this.matrixWorldInverse = new Matrix4();
         this.projectionMatrix = new Matrix4();
         this.isCamera = true;
      }

      public copy(source, recursive) {

         super.copy(source, recursive);

         this.matrixWorldInverse.copy(source.matrixWorldInverse);
         this.projectionMatrix.copy(source.projectionMatrix);

         return this;

      }

      public getWorldDirection(target) {
         var quaternion = new Quaternion();

         if (target === undefined) {

            console.warn('THREE.Camera: .getWorldDirection() target is now required');
            target = new Vector3();

         }

         this.getWorldQuaternion(quaternion);

         return target.set(0, 0, - 1).applyQuaternion(quaternion);

      };


      public updateMatrixWorld(force) {

         super.updateMatrixWorld(force);

         this.matrixWorldInverse.getInverse(this.matrixWorld);

      }

      public clone() {
         var camera = new Camera();
         camera.copy(this, null);
         return camera;
      }
   }
}