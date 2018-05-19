module THREE {
   export class SkinnedMesh extends Mesh {
      skeleton: any;
      bindMatrixInverse: Matrix4;
      bindMatrix: Matrix4;
      bindMode: string;
      public isSkinnedMesh: boolean = true;
      constructor(geometry, material) {
         super(geometry, material);
         this.type = 'SkinnedMesh';
         this.bindMode = 'attached';
         this.bindMatrix = new Matrix4();
         this.bindMatrixInverse = new Matrix4();
         var bones = this.initBones();
         var skeleton = new Skeleton(bones);
         this.bind(skeleton, this.matrixWorld);
         this.normalizeSkinWeights();
      }

      public initBones() {
         var bones = [], bone, gbone;
         var i, il;
         if (this.geometry && this.geometry.bones !== undefined) {
            // first, create array of 'Bone' objects from geometry data
            for (i = 0, il = this.geometry.bones.length; i < il; i++) {
               gbone = this.geometry.bones[i];
               // create new 'Bone' object
               bone = new Bone();
               bones.push(bone);
               // apply values
               bone.name = gbone.name;
               bone.position.fromArray(gbone.pos);
               bone.quaternion.fromArray(gbone.rotq);
               if (gbone.scl !== undefined) bone.scale.fromArray(gbone.scl);
            }
            // second, create bone hierarchy
            for (i = 0, il = this.geometry.bones.length; i < il; i++) {
               gbone = this.geometry.bones[i];
               if ((gbone.parent !== - 1) && (gbone.parent !== null) && (bones[gbone.parent] !== undefined)) {
                  // subsequent bones in the hierarchy
                  bones[gbone.parent].add(bones[i]);
               } else {
                  // topmost bone, immediate child of the skinned mesh
                  this.add(bones[i]);
               }
            }
         }
         // now the bones are part of the scene graph and children of the skinned mesh.
         // let's update the corresponding matrices
         this.updateMatrixWorld(true);
         return bones;
      }
      public bind(skeleton, bindMatrix) {
         this.skeleton = skeleton;
         if (bindMatrix === undefined) {
            this.updateMatrixWorld(true);
            this.skeleton.calculateInverses();
            bindMatrix = this.matrixWorld;
         }
         this.bindMatrix.copy(bindMatrix);
         this.bindMatrixInverse.getInverse(bindMatrix);
      }
      public pose() {
         this.skeleton.pose();
      }
      public normalizeSkinWeights() {
         var scale, i;
         if (this.geometry && this.geometry.isGeometry) {
            for (i = 0; i < this.geometry.skinWeights.length; i++) {
               var sw = this.geometry.skinWeights[i];
               scale = 1.0 / sw.manhattanLength();
               if (scale !== Infinity) {
                  sw.multiplyScalar(scale);
               } else {
                  sw.set(1, 0, 0, 0); // do something reasonable
               }
            }
         } else if (this.geometry && this.geometry.isBufferGeometry) {
            var vec = new Vector4();
            var skinWeight = this.geometry.attributes.skinWeight;
            for (i = 0; i < skinWeight.count; i++) {
               vec.x = skinWeight.getX(i);
               vec.y = skinWeight.getY(i);
               vec.z = skinWeight.getZ(i);
               vec.w = skinWeight.getW(i);
               scale = 1.0 / vec.manhattanLength();
               if (scale !== Infinity) {
                  vec.multiplyScalar(scale);
               } else {
                  vec.set(1, 0, 0, 0); // do something reasonable
               }
               skinWeight.setXYZW(i, vec.x, vec.y, vec.z, vec.w);
            }
         }
      }
      public updateMatrixWorld(force) {
         //Mesh.prototype.updateMatrixWorld.call(this, force);
         this.updateMatrixWorld = force;
         if (this.bindMode === 'attached') {
            this.bindMatrixInverse.getInverse(this.matrixWorld);
         } else if (this.bindMode === 'detached') {
            this.bindMatrixInverse.getInverse(this.bindMatrix);
         } else {
            console.warn('THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode);
         }
      }
      public clone() {
         return new SkinnedMesh(this.geometry, this.material).copy(this);
      }
   }
}