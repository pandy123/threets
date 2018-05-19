/// <reference path="./CylinderGeometry" />
module Threets {
    export class ConeGeometry extends CylinderGeometry {

        constructor(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
            super(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
            this.type = 'ConeGeometry';
            this.parameters = {
                radius: radius,
                height: height,
                radialSegments: radialSegments,
                heightSegments: heightSegments,
                openEnded: openEnded,
                thetaStart: thetaStart,
                thetaLength: thetaLength
            };
        }
    }
    // ConeBufferGeometry
    export class ConeBufferGeometry extends CylinderBufferGeometry {
        constructor(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
            super(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
            this.type = 'ConeBufferGeometry';
            this.parameters = {
                radius: radius,
                height: height,
                radialSegments: radialSegments,
                heightSegments: heightSegments,
                openEnded: openEnded,
                thetaStart: thetaStart,
                thetaLength: thetaLength
            };
        }
    }
}
