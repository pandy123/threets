module THREE {

   export class QuadraticBezierCurve extends Curve {
      public type;
      public v0;
      public v1;
      public v2;
      public v3;
      public isQuadraticBezierCurve;
      constructor(v0, v1, v2) {
         super();
         this.type = 'QuadraticBezierCurve';
         this.v0 = v0 || new Vector2();
         this.v1 = v1 || new Vector2();
         this.v2 = v2 || new Vector2();
         this.isQuadraticBezierCurve = true;
      }

      public getPoint(t, optionalTarget) {

         var point = optionalTarget || new Vector2();

         var v0 = this.v0, v1 = this.v1, v2 = this.v2;

         point.set(
            QuadraticBezier(t, v0.x, v1.x, v2.x),
            QuadraticBezier(t, v0.y, v1.y, v2.y)
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