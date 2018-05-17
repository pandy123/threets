module Threets {

   export class EllipseCurve extends Curve {

      public type;
      public aX;
      public aY;
      public xRadius;
      public yRadius;
      public aStartAngle;
      public aEndAngle;
      public aClockwise;
      public aRotation;
      public isEllipseCurve;

      constructor(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
         super();
         this.type = 'EllipseCurve';
         this.aX = aX || 0;
         this.aY = aY || 0;
         this.xRadius = xRadius || 1;
         this.yRadius = yRadius || 1;
         this.aStartAngle = aStartAngle || 0;
         this.aEndAngle = aEndAngle || 2 * Math.PI;
         this.aClockwise = aClockwise || false;
         this.aRotation = aRotation || 0;
         this.isEllipseCurve = true;

      }

      public toJSON() {

         var data = super.toJSON();

         data.aX = this.aX;
         data.aY = this.aY;

         data.xRadius = this.xRadius;
         data.yRadius = this.yRadius;

         data.aStartAngle = this.aStartAngle;
         data.aEndAngle = this.aEndAngle;

         data.aClockwise = this.aClockwise;

         data.aRotation = this.aRotation;

         return data;

      };

      public fromJSON(json) {

         super.fromJSON(json);

         this.aX = json.aX;
         this.aY = json.aY;

         this.xRadius = json.xRadius;
         this.yRadius = json.yRadius;

         this.aStartAngle = json.aStartAngle;
         this.aEndAngle = json.aEndAngle;

         this.aClockwise = json.aClockwise;

         this.aRotation = json.aRotation;

         return this;

      };

   }
}