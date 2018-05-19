module THREE {
   export class Sphere {
      public center: Vector3;
      public radius: number;
      constructor(center?: Vector3, radius?: number) {
         this.center = (center !== undefined) ? center : new Vector3();
         this.radius = (radius !== undefined) ? radius : 0;
      }

      public set(center: Vector3, radius: number) {
         this.center.copy(center);
         this.radius = radius;
         return this;
      }

      public static box = new Box3();
      // public setFromPoints() {
      public setFromPoints(points: any, optionalCenter: any) {
         var center = this.center;
         if (optionalCenter !== undefined) {
            center.copy(optionalCenter);
         } else {
            Sphere.box.setFromPoints(points).getCenter(center);
         }
         var maxRadiusSq = 0;
         for (var i = 0, il = points.length; i < il; i++) {
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
         }
         this.radius = Math.sqrt(maxRadiusSq);
         return this;
      }


      public clone() {
         return new Sphere().copy(this);
      }

      public copy(sphere: any) {
         this.center.copy(sphere.center);
         this.radius = sphere.radius;
         return this;
      }

      public empty() {
         return (this.radius <= 0);
      }

      public containsPoint(point: any) {
         return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
      }

      public distanceToPoint(point: any) {
         return (point.distanceTo(this.center) - this.radius);
      }

      public intersectsSphere(sphere: any) {
         var radiusSum = this.radius + sphere.radius;
         return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
      }

      public intersectsBox(box: any) {
         return box.intersectsSphere(this);
      }

      public intersectsPlane(plane: any) {
         return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
      }

      public clampPoint(point: any, target: any) {
         var deltaLengthSq = this.center.distanceToSquared(point);
         if (target === undefined) {
            console.warn('THREE.Sphere: .clampPoint() target is now required');
            target = new Vector3();
         }
         target.copy(point);
         if (deltaLengthSq > (this.radius * this.radius)) {
            target.sub(this.center).normalize();
            target.multiplyScalar(this.radius).add(this.center);
         }
         return target;
      }

      public getBoundingBox(target: any) {
         if (target === undefined) {
            console.warn('THREE.Sphere: .getBoundingBox() target is now required');
            target = new Box3();
         }
         target.set(this.center, this.center);
         target.expandByScalar(this.radius);
         return target;
      }

      public applyMatrix4(matrix: any) {
         this.center.applyMatrix4(matrix);
         this.radius = this.radius * matrix.getMaxScaleOnAxis();
         return this;
      }

      public translate(offset: any) {
         this.center.add(offset);
         return this;
      }

      public equals(sphere: any) {
         return sphere.center.equals(this.center) && (sphere.radius === this.radius);
      }

   }
}
