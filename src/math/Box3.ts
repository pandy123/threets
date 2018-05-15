module Threets {
   export class Box3 {
      public min: Vector3;
      public max: Vector3;
      public isBox3: boolean = true;
      constructor(min?: Vector3, max?: Vector3) {
         this.min = (min !== undefined) ? min : new Vector3(+ Infinity, + Infinity, + Infinity);
         this.max = (max !== undefined) ? max : new Vector3(- Infinity, - Infinity, - Infinity);
      }
      public set(min: Vector3, max: Vector3): Box3 {
         this.min.copy(min);
         this.max.copy(max);
         return this;
      }

      public setFromArray(array: Array<number>): Box3 {
         var minX = + Infinity;
         var minY = + Infinity;
         var minZ = + Infinity;

         var maxX = - Infinity;
         var maxY = - Infinity;
         var maxZ = - Infinity;

         for (var i = 0, l = array.length; i < l; i += 3) {
            var x = array[i];
            var y = array[i + 1];
            var z = array[i + 2];

            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (z < minZ) minZ = z;

            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            if (z > maxZ) maxZ = z;
         }
         this.min.set(minX, minY, minZ);
         this.max.set(maxX, maxY, maxZ);
         return this;

      }

      /**
       * 
       * @param attribute bufferAttribute带有getX方法的点集
       */
      public setFromBufferAttribute(attribute: any): Box3 {

         var minX = + Infinity;
         var minY = + Infinity;
         var minZ = + Infinity;

         var maxX = - Infinity;
         var maxY = - Infinity;
         var maxZ = - Infinity;

         for (var i = 0, l = attribute.count; i < l; i++) {
            var x = attribute.getX(i);
            var y = attribute.getY(i);
            var z = attribute.getZ(i);

            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (z < minZ) minZ = z;

            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            if (z > maxZ) maxZ = z;
         }
         this.min.set(minX, minY, minZ);
         this.max.set(maxX, maxY, maxZ);
         return this;
      }

      public setFromPoints(points: any): Box3 {
         this.makeEmpty();
         for (var i = 0, il = points.length; i < il; i++) {
            this.expandByPoint(points[i]);
         }
         return this;
      }

      public static v1 = new Vector3();
      public setFromCenterAndSize(center: Vector3, size: Vector3): Box3 {
         var halfSize = Box3.v1.copy(size).multiplyScalar(0.5);
         this.min.copy(center).sub(halfSize);
         this.max.copy(center).add(halfSize);
         return this;
      }

      public setFromObject(object: any): Box3 {
         this.makeEmpty();
         return this.expandByObject(object);
      }

      public clone(): Box3 {
         return new Box3().copy(this);
      }

      public copy(box: Box3): Box3 {
         this.min.copy(box.min);
         this.max.copy(box.max);
         return this;
      }

      public makeEmpty(): Box3 {
         this.min.x = this.min.y = this.min.z = + Infinity;
         this.max.x = this.max.y = this.max.z = - Infinity;
         return this;
      }

      public isEmpty(): boolean {
         // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
         return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
      }

      public getCenter(target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('Threets.Box3: .getCenter() target is now required');
            target = new Vector3();
         }
         return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
      }

      public getSize(target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('Threets.Box3: .getSize() target is now required');
            target = new Vector3();
         }
         return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
      }

      public expandByPoint(point: Vector3): Box3 {
         this.min.min(point);
         this.max.max(point);
         return this;
      }

      public expandByVector(vector: Vector3): Box3 {
         this.min.sub(vector);
         this.max.add(vector);
         return this;
      }

      public expandByScalar(scalar: number): Box3 {
         this.min.addScalar(-scalar);
         this.max.addScalar(scalar);
         return this;
      }

      //public static v1: Vector3 = new Vector3();
      public traverse(node: any) {
         var geometry = node.geometry;
         if (geometry !== undefined) {
            if (geometry.isGeometry) {
               var vertices = geometry.vertices;
               for (var i = 0, l = vertices.length; i < l; i++) {
                  Box3.v1.copy(vertices[i]);
                  Box3.v1.applyMatrix4(node.matrixWorld);
                  this.expandByPoint(Box3.v1);
               }
            } else if (geometry.isBufferGeometry) {
               var attribute = geometry.attributes.position;
               if (attribute !== undefined) {
                  for (var i = 0, l = attribute.count; i < l; i++) {
                     Box3.v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
                     this.expandByPoint(Box3.v1);
                  }
               }
            }
         }
      }
      public expandByObject(object: any) {
         // Computes the world-axis-aligned bounding box of an object (including its children),
         // accounting for both the object's, and children's, world transforms
         object.updateMatrixWorld(true);
         object.traverse((node: any) => { this.traverse(node) });
         return this;
      }




      public containsPoint(point: Vector3): boolean {
         return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ||
            point.z < this.min.z || point.z > this.max.z ? false : true;
      }

      public containsBox(box: Box3): boolean {
         return this.min.x <= box.min.x && box.max.x <= this.max.x &&
            this.min.y <= box.min.y && box.max.y <= this.max.y &&
            this.min.z <= box.min.z && box.max.z <= this.max.z;
      }

      public getParameter(point: Vector3, target?: Vector3): Vector3 {
         // This can potentially have a divide by zero if the box
         // has a size dimension of 0.
         if (target === undefined) {
            console.warn('Threets.Box3: .getParameter() target is now required');
            target = new Vector3();
         }
         return target.set(
            (point.x - this.min.x) / (this.max.x - this.min.x),
            (point.y - this.min.y) / (this.max.y - this.min.y),
            (point.z - this.min.z) / (this.max.z - this.min.z)
         );

      }

      public intersectsBox(box: Box3) {
         // using 6 splitting planes to rule out intersections.
         return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ||
            box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

      }

      // intersectsSphere: (function () {
      //    var closestPoint = new Vector3();
      //    return function intersectsSphere(sphere) {
      //       // Find the point on the AABB closest to the sphere center.
      //       this.clampPoint(sphere.center, closestPoint);
      //       // If that point is inside the sphere, the AABB and sphere intersect.
      //       return closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
      //    };
      // }) (),

      public static closestPoint = new Vector3();
      public intersectsSphere(sphere: any): boolean {
         // Find the point on the AABB closest to the sphere center.
         this.clampPoint(sphere.center, Box3.closestPoint);
         // If that point is inside the sphere, the AABB and sphere intersect.
         return Box3.closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
      }

      public intersectsPlane(plane: any): boolean {
         // We compute the minimum and maximum dot product values. If those values
         // are on the same side (back or front) of the plane, then there is no intersection.
         var min, max;
         if (plane.normal.x > 0) {
            min = plane.normal.x * this.min.x;
            max = plane.normal.x * this.max.x;
         } else {
            min = plane.normal.x * this.max.x;
            max = plane.normal.x * this.min.x;
         }
         if (plane.normal.y > 0) {
            min += plane.normal.y * this.min.y;
            max += plane.normal.y * this.max.y;
         } else {
            min += plane.normal.y * this.max.y;
            max += plane.normal.y * this.min.y;
         }
         if (plane.normal.z > 0) {
            min += plane.normal.z * this.min.z;
            max += plane.normal.z * this.max.z;
         } else {
            min += plane.normal.z * this.max.z;
            max += plane.normal.z * this.min.z;
         }
         return (min <= plane.constant && max >= plane.constant);
      }

      // triangle centered vertices
      public static v0: Vector3 = new Vector3();
      //public static v1: Vector3 = new Vector3();
      public static v2: Vector3 = new Vector3();

      // triangle edge vectors
      public static f0: Vector3 = new Vector3();
      public static f1: Vector3 = new Vector3();
      public static f2: Vector3 = new Vector3();

      public static testAxis: Vector3 = new Vector3();

      public static center: Vector3 = new Vector3();
      public static extents: Vector3 = new Vector3();

      public static triangleNormal: Vector3 = new Vector3();

      //   public intersectsTriangle: (function () {

      private satForAxes(axes: any): boolean {
         var i, j;
         for (i = 0, j = axes.length - 3; i <= j; i += 3) {
            Box3.testAxis.fromArray(axes, i);
            // project the aabb onto the seperating axis
            var r = Box3.extents.x * Math.abs(Box3.testAxis.x) + Box3.extents.y * Math.abs(Box3.testAxis.y) + Box3.extents.z * Math.abs(Box3.testAxis.z);
            // project all 3 vertices of the triangle onto the seperating axis
            var p0 = Box3.v0.dot(Box3.testAxis);
            var p1 = Box3.v1.dot(Box3.testAxis);
            var p2 = Box3.v2.dot(Box3.testAxis);
            // actual test, basically see if either of the most extreme of the triangle points intersects r
            if (Math.max(- Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
               // points of the projected triangle are outside the projected half-length of the aabb
               // the axis is seperating and we can exit
               return false;
            }
         }
         return true;
      }

      public intersectsTriangle(triangle: Triangle): boolean {
         if (this.isEmpty()) {
            return false;
         }
         // compute box center and extents
         this.getCenter(Box3.center);
         Box3.extents.subVectors(this.max, Box3.center);
         // translate triangle to aabb origin
         Box3.v0.subVectors(triangle.a, Box3.center);
         Box3.v1.subVectors(triangle.b, Box3.center);
         Box3.v2.subVectors(triangle.c, Box3.center);
         // compute edge vectors for triangle
         Box3.f0.subVectors(Box3.v1, Box3.v0);
         Box3.f1.subVectors(Box3.v2, Box3.v1);
         Box3.f2.subVectors(Box3.v0, Box3.v2);
         // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
         // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
         // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
         var axes = [
            0, - Box3.f0.z, Box3.f0.y, 0, - Box3.f1.z, Box3.f1.y, 0, - Box3.f2.z, Box3.f2.y,
            Box3.f0.z, 0, - Box3.f0.x, Box3.f1.z, 0, - Box3.f1.x, Box3.f2.z, 0, - Box3.f2.x,
            - Box3.f0.y, Box3.f0.x, 0, - Box3.f1.y, Box3.f1.x, 0, - Box3.f2.y, Box3.f2.x, 0
         ];
         if (!this.satForAxes(axes)) {
            return false;
         }
         // test 3 face normals from the aabb
         axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
         if (!this.satForAxes(axes)) {
            return false;
         }
         // finally testing the face normal of the triangle
         // use already existing triangle edge vectors here
         Box3.triangleNormal.crossVectors(Box3.f0, Box3.f1);
         axes = [Box3.triangleNormal.x, Box3.triangleNormal.y, Box3.triangleNormal.z];
         return this.satForAxes(axes);
      }

      public clampPoint(point: Vector3, target?: Vector3) {
         if (target === undefined) {
            console.warn('Threets.Box3: .clampPoint() target is now required');
            target = new Vector3();
         }
         return target.copy(point).clamp(this.min, this.max);
      }

      //public static v1 = new Vector3();
      public distanceToPoint(point: any): number {
         var clampedPoint = Box3.v1.copy(point).clamp(this.min, this.max);
         return clampedPoint.sub(point).length();
      }

      //public static v1 = new Vector3();
      public getBoundingSphere(target?: Sphere) {
         if (target === undefined) {
            console.warn('Threets.Box3: .getBoundingSphere() target is now required');
            target = new Sphere();
         }
         this.getCenter(target.center);
         target.radius = this.getSize(Box3.v1).length() * 0.5;
         return target;
      }

      public intersect(box: Box3) {
         this.min.max(box.min);
         this.max.min(box.max);
         // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
         if (this.isEmpty()) this.makeEmpty();
         return this;
      }

      public union(box: Box3) {
         this.min.min(box.min);
         this.max.max(box.max);
         return this;
      }

      /**
       * @param matrix 
       */
      public applyMatrix4(matrix: any): Box3 {
         // @TODO
         // transform of empty box is an empty box.
         if (this.isEmpty()) return this;
         var m = matrix.elements;
         var xax = m[0] * this.min.x, xay = m[1] * this.min.x, xaz = m[2] * this.min.x;
         var xbx = m[0] * this.max.x, xby = m[1] * this.max.x, xbz = m[2] * this.max.x;
         var yax = m[4] * this.min.y, yay = m[5] * this.min.y, yaz = m[6] * this.min.y;
         var ybx = m[4] * this.max.y, yby = m[5] * this.max.y, ybz = m[6] * this.max.y;
         var zax = m[8] * this.min.z, zay = m[9] * this.min.z, zaz = m[10] * this.min.z;
         var zbx = m[8] * this.max.z, zby = m[9] * this.max.z, zbz = m[10] * this.max.z;

         this.min.x = Math.min(xax, xbx) + Math.min(yax, ybx) + Math.min(zax, zbx) + m[12];
         this.min.y = Math.min(xay, xby) + Math.min(yay, yby) + Math.min(zay, zby) + m[13];
         this.min.z = Math.min(xaz, xbz) + Math.min(yaz, ybz) + Math.min(zaz, zbz) + m[14];
         this.max.x = Math.max(xax, xbx) + Math.max(yax, ybx) + Math.max(zax, zbx) + m[12];
         this.max.y = Math.max(xay, xby) + Math.max(yay, yby) + Math.max(zay, zby) + m[13];
         this.max.z = Math.max(xaz, xbz) + Math.max(yaz, ybz) + Math.max(zaz, zbz) + m[14];
         return this;

      }

      public translate(offset: Vector3): Box3 {
         this.min.add(offset);
         this.max.add(offset);
         return this;
      }

      public equals(box: Box3): boolean {
         return box.min.equals(this.min) && box.max.equals(this.max);
      }
   }
}
