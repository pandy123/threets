module Threets {
   export class Triangle {
      public a: Vector3;
      public b: Vector3;
      public c: Vector3;
      constructor(a?: Vector3, b?: Vector3, c?: Vector3) {
         this.a = (a !== undefined) ? a : new Vector3();
         this.b = (b !== undefined) ? b : new Vector3();
         this.c = (c !== undefined) ? c : new Vector3();
      }
      public static v0 = new Vector3();
      // public getNormal() {
      public static getNormal(a: Vector3, b: Vector3, c: Vector3, target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('THREE.Triangle: .getNormal() target is now required');
            target = new Vector3();
         }
         target.subVectors(c, b);
         Triangle.v0.subVectors(a, b);
         target.cross(Triangle.v0);
         var targetLengthSq = target.lengthSq();
         if (targetLengthSq > 0) {
            return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
         }
         return target.set(0, 0, 0);
      }


      // public static v0 = new Vector3();
      public static v1 = new Vector3();
      public static v2 = new Vector3();
      // static/instance method to calculate barycentric coordinates
      // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
      // public getBarycoord() {
      public static getBarycoord(point: any, a: Vector3, b: Vector3, c: Vector3, target?: Vector3) {
         Triangle.v0.subVectors(c, a);
         Triangle.v1.subVectors(b, a);
         Triangle.v2.subVectors(point, a);
         var dot00 = Triangle.v0.dot(Triangle.v0);
         var dot01 = Triangle.v0.dot(Triangle.v1);
         var dot02 = Triangle.v0.dot(Triangle.v2);
         var dot11 = Triangle.v1.dot(Triangle.v1);
         var dot12 = Triangle.v1.dot(Triangle.v2);
         var denom = (dot00 * dot11 - dot01 * dot01);
         if (target === undefined) {
            console.warn('THREE.Triangle: .getBarycoord() target is now required');
            target = new Vector3();
         }
         // collinear or singular triangle
         if (denom === 0) {
            // arbitrary location outside of triangle?
            // not sure if this is the best idea, maybe should be returning undefined
            return target.set(- 2, - 1, - 1);
         }
         var invDenom = 1 / denom;
         var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
         var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
         // barycentric coordinates must always sum to 1
         return target.set(1 - u - v, v, u);
      }

      //var v1 = new Vector3();
      // public containsPoint() {
      public static containsPoint(point: any, a: Vector3, b: Vector3, c: Vector3): boolean {
         Triangle.getBarycoord(point, a, b, c, Triangle.v1);
         return (Triangle.v1.x >= 0) && (Triangle.v1.y >= 0) && ((Triangle.v1.x + Triangle.v1.y) <= 1);
      }

      public set(a: Vector3, b: Vector3, c: Vector3) {
         this.a.copy(a);
         this.b.copy(b);
         this.c.copy(c);
         return this;
      }

      public setFromPointsAndIndices(points: any, i0: number, i1: number, i2: number) {
         this.a.copy(points[i0]);
         this.b.copy(points[i1]);
         this.c.copy(points[i2]);
         return this;
      }

      public clone() {
         return new Triangle().copy(this);
      }

      public copy(triangle: Triangle) {
         this.a.copy(triangle.a);
         this.b.copy(triangle.b);
         this.c.copy(triangle.c);
         return this;
      }

      // var v0 = new Vector3();
      // var v1 = new Vector3();
      // public getArea() {
      public getArea() {
         Triangle.v0.subVectors(this.c, this.b);
         Triangle.v1.subVectors(this.a, this.b);
         return Triangle.v0.cross(Triangle.v1).length() * 0.5;
      }

      public getMidpoint(target?: Vector3) {
         if (target === undefined) {
            console.warn('THREE.Triangle: .getMidpoint() target is now required');
            target = new Vector3();
         }
         return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
      }

      public getNormal(target?: Vector3): Vector3 {
         return Triangle.getNormal(this.a, this.b, this.c, target);
      }

      //@TODO setFromCoplanarPoints on defined in Vector3
      public getPlane(target?: any): Vector3 {
         if (target === undefined) {
            console.warn('THREE.Triangle: .getPlane() target is now required');
            target = new Vector3();
         }
         return target.setFromCoplanarPoints(this.a, this.b, this.c);
      }

      public getBarycoord(point: any, target?: Vector3): Vector3 {
         return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
      }

      public containsPoint(point: any) {
         return Triangle.containsPoint(point, this.a, this.b, this.c);
      }

      public intersectsBox(box: Box3) {
         return box.intersectsTriangle(this);
      }

      public static plane: any = {};//= new Plane();
      public static edgeList = [{} as any, {} as any, {} as any];//= [new Line3(), new Line3(), new Line3()];
      public static projectedPoint = new Vector3();
      public static closestPoint = new Vector3();
      // public closestPointToPoint() {
      public closestPointToPoint(point: any, target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('THREE.Triangle: .closestPointToPoint() target is now required');
            target = new Vector3();
         }
         var minDistance = Infinity;
         // project the point onto the plane of the triangle
         Triangle.plane.setFromCoplanarPoints(this.a, this.b, this.c);
         Triangle.plane.projectPoint(point, Triangle.projectedPoint);
         // check if the projection lies within the triangle
         if (this.containsPoint(Triangle.projectedPoint) === true) {
            // if so, this is the closest point
            target.copy(Triangle.projectedPoint);
         } else {
            // if not, the point falls outside the triangle. the target is the closest point to the triangle's edges or vertices
            Triangle.edgeList[0].set(this.a, this.b);
            Triangle.edgeList[1].set(this.b, this.c);
            Triangle.edgeList[2].set(this.c, this.a);
            for (var i = 0; i < Triangle.edgeList.length; i++) {
               Triangle.edgeList[i].closestPointToPoint(Triangle.projectedPoint, true, Triangle.closestPoint);
               var distance = Triangle.projectedPoint.distanceToSquared(Triangle.closestPoint);
               if (distance < minDistance) {
                  minDistance = distance;
                  target.copy(Triangle.closestPoint);
               }
            }
         }
         return target;
      }

      public equals(triangle: Triangle): boolean {
         return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
      }

   }
}