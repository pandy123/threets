module Threets {
   export class LOD extends Object3D {
      public levels: any[];
      constructor() {
         super();
         this.type = 'LOD';
      }

      public copy(source) {
         //Object3D.prototype.copy.call(this, source, false);
         super.copy(source, false);
         var levels = source.levels;
         for (var i = 0, l = levels.length; i < l; i++) {
            var level = levels[i];
            this.addLevel(level.object.clone(), level.distance);
         }
         return this;
      }
      public addLevel(object, distance) {
         if (distance === undefined) distance = 0;
         distance = Math.abs(distance);
         var levels = this.levels;
         for (var l = 0; l < levels.length; l++) {
            if (distance < levels[l].distance) {
               break;
            }
         }
         levels.splice(l, 0, { distance: distance, object: object });
         this.add(object);
      }
      public getObjectForDistance(distance) {
         var levels = this.levels;
         for (var i = 1, l = levels.length; i < l; i++) {
            if (distance < levels[i].distance) {
               break;
            }
         }
         return levels[i - 1].object;
      }
      public raycast(raycaster?, intersects?) {
         //TODO:
         var matrixPosition = new Vector3();
         matrixPosition.setFromMatrixPosition(this.matrixWorld);
         var distance = raycaster.ray.origin.distanceTo(matrixPosition);
         this.getObjectForDistance(distance).raycast(raycaster, intersects);
      }
      public update(camera) {
         var v1 = new Vector3();
         var v2 = new Vector3();
         var levels = this.levels;
         if (levels.length > 1) {
            v1.setFromMatrixPosition(camera.matrixWorld);
            v2.setFromMatrixPosition(this.matrixWorld);
            var distance = v1.distanceTo(v2);
            levels[0].object.visible = true;
            for (var i = 1, l = levels.length; i < l; i++) {
               if (distance >= levels[i].distance) {
                  levels[i - 1].object.visible = false;
                  levels[i].object.visible = true;
               } else {
                  break;
               }
            }
            for (; i < l; i++) {
               levels[i].object.visible = false;
            }
         }
      }
      public toJSON(meta) {
         var data = Object3D.prototype.toJSON.call(this, meta);
         data.object.levels = [];
         var levels = this.levels;
         for (var i = 0, l = levels.length; i < l; i++) {
            var level = levels[i];
            data.object.levels.push({
               object: level.object.uuid,
               distance: level.distance
            });
         }
         return data;
      }
   }
}
