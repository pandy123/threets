module Threets {

   export class QuadraticBezierCurve3 extends Curve {
      public type;
      public v0;
      public v1;
      public v2;
      public isQuadraticBezierCurve3;
      constructor(v0, v1, v2) {
         super();
         this.type = 'QuadraticBezierCurve3';
         this.v0 = v0 || new Vector3();
         this.v1 = v1 || new Vector3();
         this.v2 = v2 || new Vector3();
      }
      public getPoint(t, optionalTarget) {

         var point = optionalTarget || new Vector3();

         var v0 = this.v0, v1 = this.v1, v2 = this.v2;

         point.set(
            QuadraticBezier(t, v0.x, v1.x, v2.x),
            QuadraticBezier(t, v0.y, v1.y, v2.y),
            QuadraticBezier(t, v0.z, v1.z, v2.z)
         );

         return point;

      };

      public copy(source) {

         super.copy(source);

         this.v0.copy(source.v0);
         this.v1.copy(source.v1);
         this.v2.copy(source.v2);

         return this;

      };

      public toJSON() {

         var data = super.toJSON();

         data.v0 = this.v0.toArray();
         data.v1 = this.v1.toArray();
         data.v2 = this.v2.toArray();

         return data;

      };

      public fromJSON(json) {

         super.fromJSON(json);

         this.v0.fromArray(json.v0);
         this.v1.fromArray(json.v1);
         this.v2.fromArray(json.v2);

         return this;

      };


   }
}