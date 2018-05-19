module THREE {
   export class Skeleton {
      public boneTexture: any;
      public boneInverses: any;
      public boneMatrices: Float32Array;
      public bones: any;
      constructor(bones, boneInverses?) {
         // copy the bone array
         bones = bones || [];
         this.bones = bones.slice(0);
         this.boneMatrices = new Float32Array(this.bones.length * 16);
         // use the supplied bone inverses or calculate the inverses
         if (boneInverses === undefined) {
            this.calculateInverses();
         } else {
            if (this.bones.length === boneInverses.length) {
               this.boneInverses = boneInverses.slice(0);
            } else {
               console.warn('THREE.Skeleton boneInverses is the wrong length.');
               this.boneInverses = [];
               for (var i = 0, il = this.bones.length; i < il; i++) {
                  this.boneInverses.push(new Matrix4());
               }
            }
         }
      }
      public calculateInverses() {
         this.boneInverses = [];
         for (var i = 0, il = this.bones.length; i < il; i++) {
            var inverse = new Matrix4();
            if (this.bones[i]) {
               inverse.getInverse(this.bones[i].matrixWorld);
            }
            this.boneInverses.push(inverse);
         }
      }
      public pose() {
         var bone, i, il;
         // recover the bind-time world matrices
         for (i = 0, il = this.bones.length; i < il; i++) {
            bone = this.bones[i];
            if (bone) {
               bone.matrixWorld.getInverse(this.boneInverses[i]);
            }
         }
         // compute the local matrices, positions, rotations and scales
         for (i = 0, il = this.bones.length; i < il; i++) {
            bone = this.bones[i];
            if (bone) {
               if (bone.parent && bone.parent.isBone) {
                  bone.matrix.getInverse(bone.parent.matrixWorld);
                  bone.matrix.multiply(bone.matrixWorld);
               } else {
                  bone.matrix.copy(bone.matrixWorld);
               }
               bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
            }
         }
      }
      public update() {
         //TODO:
         var offsetMatrix = new Matrix4();
         var identityMatrix = new Matrix4();
         var bones = this.bones;
         var boneInverses = this.boneInverses;
         var boneMatrices = this.boneMatrices;
         var boneTexture = this.boneTexture;
         // flatten bone matrices to array
         for (var i = 0, il = bones.length; i < il; i++) {
            // compute the offset between the current and the original transform
            var matrix = bones[i] ? bones[i].matrixWorld : identityMatrix;
            offsetMatrix.multiplyMatrices(matrix, boneInverses[i]);
            offsetMatrix.toArray(boneMatrices, i * 16);
         }
         if (boneTexture !== undefined) {
            boneTexture.needsUpdate = true;
         }
      }

      public clone() {
         return new Skeleton(this.bones, this.boneInverses);
      }
      public getBoneByName(name) {
         for (var i = 0, il = this.bones.length; i < il; i++) {
            var bone = this.bones[i];
            if (bone.name === name) {
               return bone;
            }
         }
         return undefined;
      }
   }
}