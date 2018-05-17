module Threets {
   export class Path extends CurvePath {
      public type;
      public currentPoint;
      constructor(points) {
         super();
         this.type = 'Path';
         this.currentPoint = new Vector2();
         if (points) {
            this.setFromPoints(points);
         }
      }

      public setFromPoints(points) {

         this.moveTo(points[0].x, points[0].y);

         for (var i = 1, l = points.length; i < l; i++) {

            this.lineTo(points[i].x, points[i].y);

         }

      }

      public moveTo(x, y) {

         this.currentPoint.set(x, y); // TODO consider referencing vectors instead of copying?

      }

      public lineTo(x, y) {

         var curve = new LineCurve(this.currentPoint.clone(), new Vector2(x, y));
         this.curves.push(curve);

         this.currentPoint.set(x, y);

      }

      public quadraticCurveTo(aCPx, aCPy, aX, aY) {

         var curve = new QuadraticBezierCurve(
            this.currentPoint.clone(),
            new Vector2(aCPx, aCPy),
            new Vector2(aX, aY)
         );

         this.curves.push(curve);

         this.currentPoint.set(aX, aY);

      }

      public bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {

         var curve = new CubicBezierCurve(
            this.currentPoint.clone(),
            new Vector2(aCP1x, aCP1y),
            new Vector2(aCP2x, aCP2y),
            new Vector2(aX, aY)
         );

         this.curves.push(curve);

         this.currentPoint.set(aX, aY);

      }

      public splineThru(pts /*Array of Vector*/) {

         var npts = [this.currentPoint.clone()].concat(pts);

         var curve = new SplineCurve(npts);
         this.curves.push(curve);

         this.currentPoint.copy(pts[pts.length - 1]);

      }

      public arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {

         var x0 = this.currentPoint.x;
         var y0 = this.currentPoint.y;

         this.absarc(aX + x0, aY + y0, aRadius,
            aStartAngle, aEndAngle, aClockwise);

      }

      public absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {

         this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise, null);

      }

      public ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {

         var x0 = this.currentPoint.x;
         var y0 = this.currentPoint.y;

         this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);

      }

      public absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {

         var curve = new EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);

         if (this.curves.length > 0) {

            // if a previous curve is present, attempt to join
            var firstPoint = curve.getPoint(0);

            if (!firstPoint.equals(this.currentPoint)) {

               this.lineTo(firstPoint.x, firstPoint.y);

            }

         }

         this.curves.push(curve);

         var lastPoint = curve.getPoint(1);
         this.currentPoint.copy(lastPoint);

      }

      public copy(source) {
         super.copy(source);
         this.currentPoint.copy(source.currentPoint);

         return this;

      }

      public toJSON() {
         var data = super.toJSON();
         //var data = CurvePath.prototype.toJSON.call(this);
         data.currentPoint = this.currentPoint.toArray();

         return data;

      }

      public fromJSON(json) {
         super.fromJSON(json);
         this.currentPoint.fromArray(json.currentPoint);

         return this;

      }



   }
}