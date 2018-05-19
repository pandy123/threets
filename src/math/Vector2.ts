module THREE {
   /**
    * @author Yanbei.HUANG
    * @description 2018/5/15
    */
   export class Vector2 {
      /**x坐标 */
      public x: number;
      /**y坐标 */
      public y: number;
      /**构造 */
      constructor(x?: number, y?: number) {
         this.x = x || 0;
         this.y = y || 0;

      }

      /**
       * 宽度
       */
      public get width() {
         var self = this;
         return {
            get: function (): number {
               return self.x;
            },
            set: function (value: number) {
               self.x = value;
            }
         }
      }

      /**
       * 高度
       */
      public get height() {
         var self = this;
         return {
            get: function () {
               return self.y;
            },
            set: function (value: number) {
               self.y = value;
            }

         }

      }

      /**
       * 复制
       * @param v 
       */
      public copy(v: Vector2): Vector2 {
         this.x = v.x;
         this.y = v.y;
         return this;
      }

      /**
       * 最小值
       * @param v 
       */
      public min(v: Vector2) {

         this.x = Math.min(this.x, v.x);
         this.y = Math.min(this.y, v.y);

         return this;

      }

      /**
       * 最大值
       * @param v 
       */
      public max(v: Vector2) {

         this.x = Math.max(this.x, v.x);
         this.y = Math.max(this.y, v.y);

         return this;

      }

      /**
       * 设置
       * @param x 
       * @param y 
       */
      public set(x: number, y: number) {

         this.x = x;
         this.y = y;

         return this;

      }

      /**
       * 设置缩放值
       * @param scalar 
       */
      public setScalar(scalar: number) {

         this.x = scalar;
         this.y = scalar;

         return this;

      }

      public setX(x: number) {

         this.x = x;

         return this;

      }

      public setY(y: number) {

         this.y = y;

         return this;

      }

      public setComponent(index: number, value: number) {

         switch (index) {

            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);

         }

         return this;

      }

      public getComponent(index: number) {

         switch (index) {

            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);

         }

      }

      public clone() {
         var vec = new Vector2(this.x, this.y);
         return vec;

      }



      public add(v: Vector2) {

         this.x += v.x;
         this.y += v.y;

         return this;

      }

      public addScalar(s: number) {

         this.x += s;
         this.y += s;

         return this;

      }

      public addVectors(a: Vector2, b: Vector2) {

         this.x = a.x + b.x;
         this.y = a.y + b.y;

         return this;

      }

      public addScaledVector(v: Vector2, s: number) {

         this.x += v.x * s;
         this.y += v.y * s;

         return this;

      }

      public sub(v: Vector2) {

         this.x -= v.x;
         this.y -= v.y;

         return this;

      }

      public subScalar(s: number) {

         this.x -= s;
         this.y -= s;

         return this;

      }

      public subVectors(a: Vector2, b: Vector2) {

         this.x = a.x - b.x;
         this.y = a.y - b.y;

         return this;

      }

      public multiply(v: Vector2) {

         this.x *= v.x;
         this.y *= v.y;

         return this;

      }

      public multiplyScalar(scalar: number) {

         this.x *= scalar;
         this.y *= scalar;

         return this;

      }

      public divide(v: Vector2) {

         this.x /= v.x;
         this.y /= v.y;

         return this;

      }

      public divideScalar(scalar: number) {

         return this.multiplyScalar(1 / scalar);

      }

      public applyMatrix3(m: any) {

         var x = this.x, y = this.y;
         var e = m.elements;

         this.x = e[0] * x + e[3] * y + e[6];
         this.y = e[1] * x + e[4] * y + e[7];

         return this;

      }

      public clamp(min: Vector2, max: Vector2) {

         // assumes min < max, componentwise

         this.x = Math.max(min.x, Math.min(max.x, this.x));
         this.y = Math.max(min.y, Math.min(max.y, this.y));

         return this;

      }

      public clampScalar(minVal: number, maxVal: number) {
         var min = new Vector2();
         var max = new Vector2();
         min.set(minVal, minVal);
         max.set(maxVal, maxVal);

         return this.clamp(min, max);

      };

      public clampLength(min: number, max: number) {

         var length = this.length();

         return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

      }

      public floor() {

         this.x = Math.floor(this.x);
         this.y = Math.floor(this.y);

         return this;

      }

      public ceil() {

         this.x = Math.ceil(this.x);
         this.y = Math.ceil(this.y);

         return this;

      }

      public round() {

         this.x = Math.round(this.x);
         this.y = Math.round(this.y);

         return this;

      }

      public roundToZero() {

         this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
         this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

         return this;

      }

      public negate() {

         this.x = - this.x;
         this.y = - this.y;

         return this;

      }

      public dot(v: Vector2) {

         return this.x * v.x + this.y * v.y;

      }

      public lengthSq() {

         return this.x * this.x + this.y * this.y;

      }

      public length() {

         return Math.sqrt(this.x * this.x + this.y * this.y);

      }

      public manhattanLength() {

         return Math.abs(this.x) + Math.abs(this.y);

      }

      public normalize() {

         return this.divideScalar(this.length() || 1);

      }

      public angle() {

         // computes the angle in radians with respect to the positive x-axis

         var angle = Math.atan2(this.y, this.x);

         if (angle < 0) angle += 2 * Math.PI;

         return angle;

      }

      public distanceTo(v: Vector2) {

         return Math.sqrt(this.distanceToSquared(v));

      }

      public distanceToSquared(v: Vector2) {

         var dx = this.x - v.x, dy = this.y - v.y;
         return dx * dx + dy * dy;

      }

      public manhattanDistanceTo(v: Vector2) {

         return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);

      }

      public setLength(length: number) {

         return this.normalize().multiplyScalar(length);

      }

      public lerp(v: Vector2, alpha: number) {

         this.x += (v.x - this.x) * alpha;
         this.y += (v.y - this.y) * alpha;

         return this;

      }

      public lerpVectors(v1: Vector2, v2: Vector2, alpha: number) {

         return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

      }

      public equals(v: Vector2) {

         return ((v.x === this.x) && (v.y === this.y));

      }

      public fromArray(array: Array<number>, offset?: number) {

         if (offset === undefined) offset = 0;

         this.x = array[offset];
         this.y = array[offset + 1];

         return this;

      }

      public toArray(array: Array<number>, offset: number) {

         if (array === undefined) array = [];
         if (offset === undefined) offset = 0;

         array[offset] = this.x;
         array[offset + 1] = this.y;

         return array;

      }

      public fromBufferAttribute(attribute: any, index: any) {
         this.x = attribute.getX(index);
         this.y = attribute.getY(index);

         return this;

      }

      /**
       * 
       * @param center 
       * @param angle Radian
       */
      public rotateAround(center: Vector2, angle: number) {
         var c = Math.cos(angle), s = Math.sin(angle);
         var x = this.x - center.x;
         var y = this.y - center.y;
         this.x = x * c - y * s + center.x;
         this.y = x * s + y * c + center.y;
         return this;
      }
   }
}