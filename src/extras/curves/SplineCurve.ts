module THREE {

   export class SplineCurve extends Curve {
      public type;
      public points;
      public isSplineCurve;
      constructor(points) {
         super();
         this.type = 'SplineCurve';
         this.points = points || [];
         this.isSplineCurve = true;
      }

      public getPoint(t, optionalTarget) {

         var point = optionalTarget || new Vector2();

         var points = this.points;
         var p = (points.length - 1) * t;

         var intPoint = Math.floor(p);
         var weight = p - intPoint;

         var p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
         var p1 = points[intPoint];
         var p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
         var p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];

         point.set(
            CatmullRom(weight, p0.x, p1.x, p2.x, p3.x),
            CatmullRom(weight, p0.y, p1.y, p2.y, p3.y)
         );

         return point;

      };

      public copy(source) {

         Curve.prototype.copy.call(this, source);

         this.points = [];

         for (var i = 0, l = source.points.length; i < l; i++) {

            var point = source.points[i];

            this.points.push(point.clone());

         }

         return this;

      };

      public toJSON() {

         var data = Curve.prototype.toJSON.call(this);

         data.points = [];

         for (var i = 0, l = this.points.length; i < l; i++) {

            var point = this.points[i];
            data.points.push(point.toArray());

         }

         return data;

      };

      public fromJSON(json) {

         Curve.prototype.fromJSON.call(this, json);

         this.points = [];

         for (var i = 0, l = json.points.length; i < l; i++) {

            var point = json.points[i];
            this.points.push(new Vector2(null, null).fromArray(point, null));

         }

         return this;

      };


   }
}