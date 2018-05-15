module Threets {
   export class Plane {
      public normal: Vector3;
      public constant: number;
      constructor(normal?: Vector3, constant?: number) {
         // normal is assumed to be normalized
         this.normal = (normal !== undefined) ? normal : new Vector3(1, 0, 0);
         this.constant = (constant !== undefined) ? constant : 0;
      }

      public set(normal: Vector3, constant: number): Plane {
         this.normal.copy(normal);
         this.constant = constant;
         return this;
      }

      public setComponents(x: number, y: number, z: number, w: number): Plane {
         this.normal.set(x, y, z);
         this.constant = w;
         return this;
      }

      public setFromNormalAndCoplanarPoint(normal, point): Plane {
         this.normal.copy(normal);
         this.constant = - point.dot(this.normal);
         return this;
      }

      public static v1 = new Vector3();
      public static v2 = new Vector3();
      // public setFromCoplanarPoints() {
      public setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane {
         var normal = Plane.v1.subVectors(c, b).cross(Plane.v2.subVectors(a, b)).normalize();
         // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
         this.setFromNormalAndCoplanarPoint(normal, a);
         return this;
      }

      public clone(): Plane {
         return new Plane().copy(this);
      }

      public copy(plane: Plane): Plane {
         this.normal.copy(plane.normal);
         this.constant = plane.constant;
         return this;
      }

      public normalize(): Plane {
         // Note: will lead to a divide by zero if the plane is invalid.
         var inverseNormalLength = 1.0 / this.normal.length();
         this.normal.multiplyScalar(inverseNormalLength);
         this.constant *= inverseNormalLength;
         return this;
      }

      public negate(): Plane {
         this.constant *= - 1;
         this.normal.negate();
         return this;
      }

      public distanceToPoint(point: Vector3): number {
         return this.normal.dot(point) + this.constant;
      }

      public distanceToSphere(sphere: Sphere): number {
         return this.distanceToPoint(sphere.center) - sphere.radius;
      }

      public projectPoint(point: Vector3, target?: Vector3) {
         if (target === undefined) {
            console.warn('THREE.Plane: .projectPoint() target is now required');
            target = new Vector3();
         }
         return target.copy(this.normal).multiplyScalar(- this.distanceToPoint(point)).add(point);
      }

      //var v1 = new Vector3();
      // public intersectLine() {
      public intersectLine(line: any, target?: Vector3) {
         if (target === undefined) {
            console.warn('THREE.Plane: .intersectLine() target is now required');
            target = new Vector3();
         }
         var direction = line.delta(Plane.v1);
         var denominator = this.normal.dot(direction);
         if (denominator === 0) {
            // line is coplanar, return origin
            if (this.distanceToPoint(line.start) === 0) {
               return target.copy(line.start);
            }
            // Unsure if this is the correct method to handle this case.
            return undefined;
         }
         var t = - (line.start.dot(this.normal) + this.constant) / denominator;
         if (t < 0 || t > 1) {
            return undefined;
         }
         return target.copy(direction).multiplyScalar(t).add(line.start);
      }

      public intersectsLine(line: any): boolean {
         // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
         var startSign = this.distanceToPoint(line.start);
         var endSign = this.distanceToPoint(line.end);
         return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
      }

      public intersectsBox(box: Box3): boolean {
         return box.intersectsPlane(this);
      }

      public intersectsSphere(sphere: any): boolean {
         return sphere.intersectsPlane(this);
      }

      public coplanarPoint(target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('THREE.Plane: .coplanarPoint() target is now required');
            target = new Vector3();
         }
         return target.copy(this.normal).multiplyScalar(- this.constant);
      }

      // public static v1 = new Vector3();
      public static m1 = new Matrix3();
      // public applyMatrix4() {
      public applyMatrix4(matrix, optionalNormalMatrix) {
         var normalMatrix = optionalNormalMatrix || Plane.m1.getNormalMatrix(matrix);
         var referencePoint = this.coplanarPoint(Plane.v1).applyMatrix4(matrix);
         var normal = this.normal.applyMatrix3(normalMatrix).normalize();
         this.constant = - referencePoint.dot(normal);
         return this;
      }

      public translate(offset: Vector3): Plane {
         this.constant -= offset.dot(this.normal);
         return this;
      }

      public equals(plane: Plane): boolean {
         return plane.normal.equals(this.normal) && (plane.constant === this.constant);
      }

   }
}
