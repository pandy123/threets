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
         this.max = (max !== undefined) ? max : new Vector2(- Infinity, - Infinity);
      }

      /**
       * 设置最大值和最小值
       * @param min 
       * @param max 
       */
      public set(min: Vector2, max: Vector2): Box2 {
         this.min.copy(min);
         this.max.copy(max);
         return this;
      }

      /**
       * 由点序列生成box
       * @param points 
       */
      public setFromPoints(points: Array<Vector2>): Box2 {
         this.makeEmpty();
         for (var i = 0, il = points.length; i < il; i++) {
            this.expandByPoint(points[i]);
         }
         return this;
      }

      /**
       * 把box置空
       */
      public makeEmpty() {
         this.min.x = this.min.y = + Infinity;
         this.max.x = this.max.y = - Infinity;
         return this;
      }

      /**
       * 由点扩充
       * @param point 
       */
      public expandByPoint(point: Vector2) {
         this.min.min(point);
         this.max.max(point);
         return this;
      }

      /**
       * 根据中心点和尺寸
       * @param center 
       * @param size 
       */
      public setFromCenterAndSize(center: Vector2, size: number) {
         var v1 = new Vector2();
         var halfSize = v1.setScalar(size).multiplyScalar(0.5);
         this.min.copy(center).sub(halfSize);
         this.max.copy(center).add(halfSize);
         return this;
      };

      /**
       * 克隆
       */
      public clone(): Box2 {
         var box = new Box2().copy(this);
         return box;
      }

      /**
       * box2
       * @param box 
       */
      public copy(box: Box2) {
         this.min.copy(box.min);
         this.max.copy(box.max);
         return this;
      }

      /**
       * 判断是否为空
       */
      public isEmpty() {
         return (this.max.x < this.min.x) || (this.max.y < this.min.y);
      }

      /**
       * 得到中心点
       * @param target 
       */
      public getCenter(target: any) {
         if (target === undefined) {
            console.warn('THREE.Box2: .getCenter() target is now required');
            target = new Vector2();

         }
         return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
      }

      /**
       * 得到对角线长度
       * @param target 
       */
      public getSize(target: any) {
         if (target === undefined) {
            console.warn('THREE.Box2: .getSize() target is now required');
            target = new Vector2();

         }
         return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);

      }

      /**
       * 由一个向量扩展
       * @param vector 
       */
      public expandByVector(vector: Vector2) {
         this.min.sub(vector);
         this.max.add(vector);
         return this;
      }

      /**
       * 由缩放倍数扩展
       * @param scalar 
       */
      public expandByScalar(scalar: number) {
         this.min.addScalar(- scalar);
         this.max.addScalar(scalar);
         return this;
      }

      /**
       * 判断点是否在盒子内
       * @param point 
       */
      public containsPoint(point: Vector2) {
         return point.x < this.min.x || point.x > this.max.x ||
            point.y < this.min.y || point.y > this.max.y ? false : true;
      }

      /**
       * 判断盒子是否在大盒子内
       * @param box 
       */
      public containsBox(box: Box2) {
         return this.min.x <= box.min.x && box.max.x <= this.max.x &&
            this.min.y <= box.min.y && box.max.y <= this.max.y;
      }

      /**
       * 获取点在空间内的位置，归一化的位置，
       * @param point 
       * @param target 
       */
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

      /**
       * 盒子交叉
       * @param box 
       */
      public intersectsBox(box: Box2) {
         // using 4 splitting planes to rule out intersections
         return box.max.x < this.min.x || box.min.x > this.max.x ||
            box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
      }

      /**
       * 获取点在对角线上的比例
       * @param point 
       * @param target 
       */
      public clampPoint(point: Vector2, target: any) {
         if (target === undefined) {

            console.warn('THREE.Box2: .clampPoint() target is now required');
            target = new Vector2();

         }

         return target.copy(point).clamp(this.min, this.max);
      }

      /**
       * 
       * @param point 
       */
      public distanceToPoint(point: Vector2) {
         var v1 = new Vector2();
         var clampedPoint = v1.copy(point).clamp(this.min, this.max);
         return clampedPoint.sub(point).length();
      }

      /**
       * 交叉
       * @param box 
       */
      public intersect(box: Box2) {
         this.min.max(box.min);
         this.max.min(box.max);
         return this;
      }

      /**
       * 合并
       * @param box 
       */
      public union(box: Box2) {
         this.min.min(box.min);
         this.max.max(box.max);
         return this;
      }

      /**
       * 平移
       * @param offset 
       */
      public translate(offset: Vector2) {
         this.min.add(offset);
         this.max.add(offset);
         return this;
      }

      /**
       * 判断两个盒子是否相等
       * @param box 
       */
      public equals(box: Box2) {
         return box.min.equals(this.min) && box.max.equals(this.max);
      }

   }
}