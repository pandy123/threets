/// <reference path="./EllipseCurve" />
module THREE {
    export class ArcCurve extends EllipseCurve {
        public type;
        public isArcCurve: boolean;
        constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
            super(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise, null, null);
            this.type = 'ArcCurve';
            this.isArcCurve = true;
        }
    }
}