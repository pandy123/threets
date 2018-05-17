module Threets {
   export class Object3D extends EventDispatcher {
      public static object3DId = 0;
      public static DefaultUp: Vector3 = new Vector3(0, 1, 0);
      public static DefaultMatrixAutoUpdate: boolean = true;

      public isObject3D: boolean = true;
      public id: number;
      public uuid: string;
      public name: string;
      public type: string;
      public parent: any;
      public children: Array<any>;
      public up: any;

      public position: Vector3;
      public rotation: Euler;
      public quaternion: Quaternion;
      public scale: Vector3;

      public modelViewMatrix: Matrix4;
      public normalMatrix: Matrix4;

      public matrix: Matrix4;
      public matrixWorld: Matrix4;
      public matrixAutoUpdate: boolean;
      public matrixWorldNeedsUpdate: boolean;

      public layers: Layers;
      public visible: boolean;
      public castShadow: boolean;
      public receiveShadow: boolean;
      public frustumCulled: boolean;
      public renderOrder: number;
      public userData: any;

      constructor() {
         super();
         Object3D.object3DId++;
         this.id = Object3D.object3DId;

         this.uuid = _Math.generateUUID();

         this.name = '';
         this.type = 'Object3D';

         this.parent = null;
         this.children = [];

         this.up = Object3D.DefaultUp.clone();

         this.position = new Vector3();
         this.rotation = new Euler();
         this.quaternion = new Quaternion();
         this.scale = new Vector3(1, 1, 1);
         this.rotation.onChange(this.onRotationChange);
         this.quaternion.onChange(this.onQuaternionChange);

         this.matrix = new Matrix4();
         this.matrixWorld = new Matrix4();
         this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
         this.matrixWorldNeedsUpdate = false;
         this.layers = new Layers();
         this.visible = true;
         this.castShadow = false;
         this.receiveShadow = false;
         this.frustumCulled = true;
         this.renderOrder = 0;
         this.userData = {};
      }

      public onRotationChange() {
         this.quaternion.setFromEuler(this.rotation, false);
      }

      public onQuaternionChange() {

         this.rotation.setFromQuaternion(this.quaternion, undefined, false);

      }



      // Object3D.prototype = Object.assign(Object.create(EventDispatcher.prototype), {

      public onBeforeRender() { }
      public onAfterRender() { }

      public applyMatrix(matrix) {
         this.matrix.multiplyMatrices(matrix, this.matrix);
         this.matrix.decompose(this.position, this.quaternion, this.scale);
      }

      public applyQuaternion(q: Quaternion) {
         this.quaternion.premultiply(q);
         return this;
      }

      public setRotationFromAxisAngle(axis, angle) {
         // assumes axis is normalized
         this.quaternion.setFromAxisAngle(axis, angle);
      }

      public setRotationFromEuler(euler: Euler) {
         this.quaternion.setFromEuler(euler, true);
      }

      public setRotationFromMatrix(m) {
         // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
         this.quaternion.setFromRotationMatrix(m);
      }

      public setRotationFromQuaternion(q: Quaternion) {
         // assumes q is normalized
         this.quaternion.copy(q);
      }


      public rotateOnAxis(axis, angle) {
         // rotate object on axis in object space
         // axis is assumed to be normalized
         //TODO:
         var q1 = new Quaternion();
         q1.setFromAxisAngle(axis, angle);
         this.quaternion.multiply(q1);
         return this;
      }

      public rotateOnWorldAxis(axis, angle) {
         // rotate object on axis in world space
         // axis is assumed to be normalized
         // method assumes no rotated parent
         //TODO:
         var q1 = new Quaternion();


         q1.setFromAxisAngle(axis, angle);

         this.quaternion.premultiply(q1);

         return this;

      }

      public rotateX(angle) {
         //TODO:
         var v1 = new Vector3(1, 0, 0);
         return this.rotateOnAxis(v1, angle);
      }

      public rotateY(angle) {
         //TODO:
         var v1 = new Vector3(0, 1, 0);
         return this.rotateOnAxis(v1, angle);
      }

      public rotateZ(angle) {
         //TODO:
         var v1 = new Vector3(0, 0, 1);
         return this.rotateOnAxis(v1, angle);
      }

      public translateOnAxis(axis, distance) {
         // translate object by distance along axis in object space
         // axis is assumed to be normalized
         //TODO:
         var v1 = new Vector3();
         v1.copy(axis).applyQuaternion(this.quaternion);
         this.position.add(v1.multiplyScalar(distance));
         return this;
      }

      public translateX(distance) {
         //TODO:
         var v1 = new Vector3(1, 0, 0);
         return this.translateOnAxis(v1, distance);
      }


      public translateY(distance) {
         //TODO:
         var v1 = new Vector3(0, 1, 0);
         return this.translateOnAxis(v1, distance);
      }

      public translateZ(distance) {
         //TODO:
         var v1 = new Vector3(0, 0, 1);
         return this.translateOnAxis(v1, distance);
      }

      public localToWorld(vector) {
         return vector.applyMatrix4(this.matrixWorld);
      }

      public worldToLocal(vector) {
         //TODO:
         var m1 = new Matrix4();
         return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
      }

      public lookAt(x, y?, z?) {
         // This method does not support objects with rotated and/or translated parent(s)
         //TODO:
         var m1 = new Matrix4();
         var vector = new Vector3();
         if (x.isVector3) {
            vector.copy(x);
         } else {
            vector.set(x, y, z);
         }
         if ((this as any).isCamera) {
            m1.lookAt(this.position, vector, this.up);
         } else {
            m1.lookAt(vector, this.position, this.up);
         }
         this.quaternion.setFromRotationMatrix(m1);
      }

      public add(object) {
         if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
               this.add(arguments[i]);
            }
            return this;
         }
         if (object === this) {
            console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
            return this;
         }
         if ((object && object.isObject3D)) {
            if (object.parent !== null) {
               object.parent.remove(object);
            }
            object.parent = this;
            object.dispatchEvent({ type: 'added' });
            this.children.push(object);
         } else {
            console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
         }
         return this;
      }
      public remove(object) {
         if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
               this.remove(arguments[i]);
            }
            return this;
         }
         var index = this.children.indexOf(object);
         if (index !== - 1) {
            object.parent = null;
            object.dispatchEvent({ type: 'removed' });
            this.children.splice(index, 1);
         }
         return this;
      }
      public getObjectById(id) {
         return this.getObjectByProperty('id', id);
      }
      public getObjectByName(name) {
         return this.getObjectByProperty('name', name);
      }
      public getObjectByProperty(name, value) {
         if (this[name] === value) return this;
         for (var i = 0, l = this.children.length; i < l; i++) {
            var child = this.children[i];
            var object = child.getObjectByProperty(name, value);
            if (object !== undefined) {
               return object;
            }
         }
         return undefined;
      }
      public getWorldPosition(target) {
         if (target === undefined) {
            console.warn('THREE.Object3D: .getWorldPosition() target is now required');
            target = new Vector3();
         }
         this.updateMatrixWorld(true);
         return target.setFromMatrixPosition(this.matrixWorld);
      }
      public getWorldQuaternion(target) {
         //TODO:
         var position = new Vector3();
         var scale = new Vector3();
         if (target === undefined) {
            console.warn('THREE.Object3D: .getWorldQuaternion() target is now required');
            target = new Quaternion();
         }
         this.updateMatrixWorld(true);
         this.matrixWorld.decompose(position, target, scale);
         return target;
      }

      public getWorldScale(target) {
         //TODO:
         var position = new Vector3();
         var quaternion = new Quaternion();
         if (target === undefined) {
            console.warn('THREE.Object3D: .getWorldScale() target is now required');
            target = new Vector3();
         }
         this.updateMatrixWorld(true);
         this.matrixWorld.decompose(position, quaternion, target);
         return target;
      }


      public getWorldDirection(target) {
         //TODO:
         var quaternion = new Quaternion();
         if (target === undefined) {
            console.warn('THREE.Object3D: .getWorldDirection() target is now required');
            target = new Vector3();
         }
         this.getWorldQuaternion(quaternion);
         return target.set(0, 0, 1).applyQuaternion(quaternion);
      }

      public raycast() { }

      public traverse(callback: any) {
         callback(this);
         var children = this.children;
         for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverse(callback);
         }
      }

      public traverseVisible(callback) {
         if (this.visible === false) return;
         callback(this);
         var children = this.children;
         for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverseVisible(callback);
         }
      }

      public traverseAncestors(callback) {
         var parent = this.parent;
         if (parent !== null) {
            callback(parent);
            parent.traverseAncestors(callback);
         }
      }

      public updateMatrix() {
         this.matrix.compose(this.position, this.quaternion, this.scale);
         this.matrixWorldNeedsUpdate = true;
      }

      public updateMatrixWorld(force) {
         if (this.matrixAutoUpdate) this.updateMatrix();
         if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent === null) {
               this.matrixWorld.copy(this.matrix);
            } else {
               this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
            }
            this.matrixWorldNeedsUpdate = false;
            force = true;
         }
         // update children
         var children = this.children;
         for (var i = 0, l = children.length; i < l; i++) {
            children[i].updateMatrixWorld(force);
         }
      }

      public toJSON(meta) {
         // meta is a string when called from JSON.stringify
         var isRootObject = (meta === undefined || typeof meta === 'string');
         var output: any = {};
         // meta is a hash used to collect geometries, materials.
         // not providing it implies that this is the root object
         // being serialized.
         if (isRootObject) {
            // initialize meta obj
            meta = {
               geometries: {},
               materials: {},
               textures: {},
               images: {},
               shapes: {}
            };
            output.metadata = {
               version: 4.5,
               type: 'Object',
               generator: 'Object3D.toJSON'
            };
         }
         // standard Object3D serialization
         var object: any = {};
         object.uuid = this.uuid;
         object.type = this.type;
         if (this.name !== '') object.name = this.name;
         if (this.castShadow === true) object.castShadow = true;
         if (this.receiveShadow === true) object.receiveShadow = true;
         if (this.visible === false) object.visible = false;
         if (this.frustumCulled === false) object.frustumCulled = false;
         if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
         if (JSON.stringify(this.userData) !== '{}') object.userData = this.userData;
         object.matrix = this.matrix.toArray();
         if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false;
         //
         function serialize(library, element) {
            if (library[element.uuid] === undefined) {
               library[element.uuid] = element.toJSON(meta);
            }
            return element.uuid;
         }
         if ((this as any).geometry !== undefined) {
            object.geometry = serialize(meta.geometries, (this as any).geometry);
            var parameters = (this as any).geometry.parameters;
            if (parameters !== undefined && parameters.shapes !== undefined) {
               var shapes: any[] = parameters.shapes;
               if (Array.isArray(shapes)) {
                  for (var i = 0, l = shapes.length; i < l; i++) {
                     var shape = shapes[i];
                     serialize(meta.shapes, shape);
                  }
               } else {
                  serialize(meta.shapes, shapes);
               }
            }
         }
         if ((this as any).material !== undefined) {
            if (Array.isArray((this as any).material)) {
               var uuids = [];
               for (var i: number = 0, l: number = (this as any).material.length; i < l; i++) {
                  uuids.push(serialize(meta.materials, (this as any).material[i]));
               }
               object.material = uuids;
            } else {
               object.material = serialize(meta.materials, (this as any).material);
            }
         }
         //
         if (this.children.length > 0) {
            object.children = [];
            for (var i = 0; i < this.children.length; i++) {
               object.children.push(this.children[i].toJSON(meta).object);
            }
         }
         if (isRootObject) {
            var geometries = extractFromCache(meta.geometries);
            var materials = extractFromCache(meta.materials);
            var textures = extractFromCache(meta.textures);
            var images = extractFromCache(meta.images);
            var shapes: any[] = extractFromCache(meta.shapes);
            if (geometries.length > 0) output.geometries = geometries;
            if (materials.length > 0) output.materials = materials;
            if (textures.length > 0) output.textures = textures;
            if (images.length > 0) output.images = images;
            if (shapes.length > 0) output.shapes = shapes;
         }
         output.object = object;
         return output;
         // extract data from the cache hash
         // remove metadata on each item
         // and return as array
         function extractFromCache(cache) {
            var values = [];
            for (var key in cache) {
               var data = cache[key];
               delete data.metadata;
               values.push(data);
            }
            return values;
         }
      }

      public clone(recursive?) {
         return new Object3D().copy(this, recursive);
      }

      public copy(source, recursive?): any {
         if (recursive === undefined) recursive = true;
         this.name = source.name;
         this.up.copy(source.up);
         this.position.copy(source.position);
         this.quaternion.copy(source.quaternion);
         this.scale.copy(source.scale);
         this.matrix.copy(source.matrix);
         this.matrixWorld.copy(source.matrixWorld);
         this.matrixAutoUpdate = source.matrixAutoUpdate;
         this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
         this.layers.mask = source.layers.mask;
         this.visible = source.visible;
         this.castShadow = source.castShadow;
         this.receiveShadow = source.receiveShadow;
         this.frustumCulled = source.frustumCulled;
         this.renderOrder = source.renderOrder;
         this.userData = JSON.parse(JSON.stringify(source.userData));
         if (recursive === true) {
            for (var i = 0; i < source.children.length; i++) {
               var child = source.children[i];
               this.add(child.clone());
            }
         }
         return this;
      }
   }
}