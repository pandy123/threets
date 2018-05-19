module THREE {

   export class CubicBezierCurve extends Curve {
      public type;
      public v0;
      public v1;
      public v2;
      public v3;
      public isCubicBezierCurve;
      constructor(v0, v1, v2, v3) {
         super();

         this.type = 'CubicBezierCurve';
         this.v0 = v0 || new Vector2();
         this.v1 = v1 || new Vector2();
         this.v2 = v2 || new Vector2();
         this.v3 = v3 || new Vector2();
         this.isCubicBezierCurve = true;

      }
      public getPoint(t, optionalTarget) {

         var point = optionalTarget || new Vector2();

         var v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;

         point.set(
            CubicBezier(t, v0.x, v1.x, v2.x, v3.x),
            CubicBezier(t, v0.y, v1.y, v2.y, v3.y)
         );

         return point;

      };

      public copy(source) {

         super.copy(source);

         this.v0.copy(source.v0);
         this.v1.copy(source.v1);
         this.v2.copy(source.v2);
         this.v3.copy(source.v3);

         return this;

      };

      public toJSON() {

         var data = super.toJSON();

         data.v0 = this.v0.toArray();
         data.v1 = this.v1.toArray();
         data.v2 = this.v2.toArray();
         data.v3 = this.v3.toArray();

         return data;

      };

      public fromJSON(json) {

         super.fromJSON(json);

         this.v0.fromArray(json.v0);
         this.v1.fromArray(json.v1);
         this.v2.fromArray(json.v2);
         this.v3.fromArray(json.v3);

         return this;

      };

   }
}

