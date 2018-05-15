module Threets {
   export class Line3 {
      public start: Vector3;
      public end: Vector3;
      constructor(start?: Vector3, end?: Vector3) {
         this.start = (start !== undefined) ? start : new Vector3();
         this.end = (end !== undefined) ? end : new Vector3();
      }
      public set(start: Vector3, end: Vector3): Line3 {
         this.start.copy(start);
         this.end.copy(end);
         return this;
      }

      public clone(): Line3 {
         return new Line3().copy(this);
      }

      public copy(line: Line3): Line3 {
         this.start.copy(line.start);
         this.end.copy(line.end);
         return this;
      }

      public getCenter(target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('THREE.Line3: .getCenter() target is now required');
            target = new Vector3();
         }
         return target.addVectors(this.start, this.end).multiplyScalar(0.5);
      }

      public delta(target?: Vector3): Vector3 {
         if (target === undefined) {
            console.warn('THREE.Line3: .delta() target is now required');
            target = new Vector3();
         }
         return target.subVectors(this.end, this.start);
      }

      public distanceSq(): number {
         return this.start.distanceToSquared(this.end);
      }

      public distance(): number {
         return this.start.distanceTo(this.end);
      }

      public at(t: number, target?: Vector3) {
         if (target === undefined) {
            console.warn('THREE.Line3: .at() target is now required');
            target = new Vector3();
         }
         return this.delta(target).multiplyScalar(t).add(this.start);
      }

      public closestPointToPointParameter(point: Vector3, clampToLine?: boolean): number {
         //TODO:
         var startP = new Vector3();
         var startEnd = new Vector3();
         startP.subVectors(point, this.start);
         startEnd.subVectors(this.end, this.start);
         var startEnd2 = startEnd.dot(startEnd);
         var startEnd_startP = startEnd.dot(startP);
         var t = startEnd_startP / startEnd2;
         if (clampToLine) {
            t = _Math.clamp(t, 0, 1);
         }
         return t;
      }

      public closestPointToPoint(point: Vector3, clampToLine?: boolean, target?: Vector3) {
         var t = this.closestPointToPointParameter(point, clampToLine);
         if (target === undefined) {
            console.warn('THREE.Line3: .closestPointToPoint() target is now required');
            target = new Vector3();
         }
         return this.delta(target).multiplyScalar(t).add(this.start);
      }

      public applyMatrix4(matrix: Matrix4): Line3 {
         this.start.applyMatrix4(matrix);
         this.end.applyMatrix4(matrix);
         return this;
      }

      public equals(line: Line3): boolean {
         return line.start.equals(this.start) && line.end.equals(this.end);
      }

   }
}