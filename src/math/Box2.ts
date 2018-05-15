module Threets {
   /**
    * @author Yanbei.HUANG
    * @description 2018/5/15
    */
   export class Box2 {
      /**最小值 */
      public min: Vector2;
      /**最大值 */
      public max: Vector2;

      /**构造函数 */
      constructor(min?: Vector2, max?: Vector2) {
         this.min = (min !== undefined) ? min : new Vector2(+ Infinity, +Infinity);
         this.min = (max !== undefined) ? max : new Vector2(- Infinity, - Infinity);
      }

      public set(min: Vector2, max: Vector2): Box2 {
         this.min.copy(min);
         this.max.copy(max);
         return this;
      }


      public setFromPoints(points: Array<Vector2>): Box2 {
         this.makeEmpty();
         for (var i = 0, il = points.length; i < il; i++) {
            this.expandByPoint(points[i]);
         }
         return this;
      }

      public makeEmpty() {
         this.min.x = this.min.y = + Infinity;
         this.max.x = this.max.y = - Infinity;
         return this;
      }

      public expandByPoint(point: Vector2) {
         this.min.min(point);
         this.max.max(point);
         return this;
      }

      public setFromCenterAndSize(center: Vector2, size: number) {
         var v1 = new Vector2();
         var halfSize = v1.copy(size).multiplyScalar(0.5);
         this.min.copy(center).sub(halfSize);
         this.max.copy(center).add(halfSize);
         return this;
      };

      public clone(): Box2 {
         var box = new Box2().copy(this);
         return box;
      }

      public copy(box: Box2) {
         this.min.copy(box.min);
         this.max.copy(box.max);
         return this;
      }

      public isEmpty() {
         return (this.max.x < this.min.x) || (this.max.y < this.min.y);
      }

      public getCenter(target: any) {
         if (target === undefined) {
            console.warn('THREE.Box2: .getCenter() target is now required');
            target = new Vector2();

         }
         return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
      }

      public getSize(target: any) {
         if (target === undefined) {
            console.warn('THREE.Box2: .getSize() target is now required');
            target = new Vector2();

         }
         return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);

      }

      public expandByVector(vector: Vector2) {
         this.min.sub(vector);
         this.max.add(vector);
         return this;
      }

      public expandByScalar(scalar: number) {
         this.min.addScalar(- scalar);
         this.max.addScalar(scalar);
         return this;
      }

      public containsPoint(point: Vector2) {
         return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ? false : true;
      }

      public containsBox(box: Box2) {
         return this.min.x <= box.min.x && box.max.x <= this.max.x &&
            this.min.y <= box.min.y && box.max.y <= this.max.y;
      }

      public getParameter(point: Vector2, target: any) {

         if (target === undefined) {

            console.warn('THREE.Box2: .getParameter() target is now required');
            target = new Vector2();

         }

         return target.set(
            (point.x - this.min.x) / (this.max.x - this.min.x),
            (point.y - this.min.y) / (this.max.y - this.min.y)
         );

      }

      public intersectsBox(box: Box2) {
         // using 4 splitting planes to rule out intersections
         return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
      }

      public clampPoint(point: Vector2, target: any) {
         if (target === undefined) {

            console.warn('THREE.Box2: .clampPoint() target is now required');
            target = new Vector2();

         }

         return target.copy(point).clamp(this.min, this.max);
      }

      public distanceToPoint() {
         var v1 = new Vector2();
         var clampedPoint = v1.copy(point).clamp(this.min, this.max);
         return clampedPoint.sub(point).length();
      }

      public intersect(box: Box2) {
         this.min.max(box.min);
         this.max.min(box.max);
         return this;
      }

      public union(box: Box2) {
         this.min.min(box.min);
         this.max.max(box.max);
         return this;
      }

      public translate(offset: Vector2) {
         this.min.add(offset);
         this.max.add(offset);
         return this;
      }
      public equals(box: Box2) {
         return box.min.equals(this.min) && box.max.equals(this.max);
      }

   }
}