module Threets {
   class Params {
      public Mesh: any;
      public Line: any;
      public LOD: any;
      public Points: any;
      public Sprite: any;
      public _PointCloud: any;
      constructor(Mesh?: any, Line?: any, LOD?: any, Points?: any, Sprite?: any) {
         this.Mesh = Mesh || {};
         this.Line = Line || {};
         this.LOD = LOD || {};
         this.Points = Points || { threshold: 1 };
         this.Sprite = Sprite || {};
      }
      public get PointCloud() {
         console.warn('Threets.Raycaster: params.PointCloud has been renamed to params.Points.');
         return;
      }
   }

   function ascSort(a, b) {
      return a.distance - b.distance;
   }

   function intersectObject(object, raycaster, intersects, recursive: boolean) {
      if (object.visible === false) return;
      object.raycast(raycaster, intersects);
      if (recursive === true) {
         var children = object.children;
         for (var i = 0, l = children.length; i < l; i++) {
            intersectObject(children[i], raycaster, intersects, true);
         }
      }
   }

   export class Raycaster {
      public linePrecision: number = 1;
      public ray: Ray;
      public near: number;
      public far: number;
      public params: any;

      constructor(origin, direction, near, far) {
         this.ray = new Ray(origin, direction);
         // direction is assumed to be normalized (for accurate distance calculations)
         this.near = near || 0;
         this.far = far || Infinity;
         this.params = new Params();
      }

      public set(origin, direction) {
         // direction is assumed to be normalized (for accurate distance calculations)
         this.ray.set(origin, direction);
      }

      public setFromCamera(coords, camera) {
         if ((camera && camera.isPerspectiveCamera)) {
            this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
            this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
         } else if ((camera && camera.isOrthographicCamera)) {
            this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera); // set origin in plane of camera
            this.ray.direction.set(0, 0, - 1).transformDirection(camera.matrixWorld);
         } else {
            console.error('THREE.Raycaster: Unsupported camera type.');
         }
      }

      public intersectObject(object, recursive, optionalTarget) {
         var intersects = optionalTarget || [];
         intersectObject(object, this, intersects, recursive);
         intersects.sort(ascSort);
         return intersects;
      }

      public intersectObjects(objects, recursive, optionalTarget) {
         var intersects = optionalTarget || [];
         if (Array.isArray(objects) === false) {
            console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');
            return intersects;
         }
         for (var i = 0, l = objects.length; i < l; i++) {
            intersectObject(objects[i], this, intersects, recursive);
         }
         intersects.sort(ascSort);
         return intersects;
      }
   }
}