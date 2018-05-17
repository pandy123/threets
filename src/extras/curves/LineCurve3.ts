module Threets {

   export class LineCurve3 extends Curve {
      public type;
      public v1;
      public v2;
      public isLineCurve3;
      constructor(v1, v2) {
         super();
         this.type = 'LineCurve3';
         this.v1 = v1 || new Vector3();
         this.v2 = v2 || new Vector3();
      }

      public getPoint(t, optionalTarget) {

         var point = optionalTarget || new Vector3();

         if (t === 1) {

            point.copy(this.v2);

         } else {

            point.copy(this.v2).sub(this.v1);
            point.multiplyScalar(t).add(this.v1);

         }

         return point;

      };

      // Line curve is linear, so we can overwrite default getPointAt

      public getPointAt(u, optionalTarget) {

         return this.getPoint(u, optionalTarget);

      };

      public copy(source) {

         super.copy(source);

         this.v1.copy(source.v1);
         this.v2.copy(source.v2);

         return this;

      };

      public toJSON() {

         var data = super.toJSON();

         data.v1 = this.v1.toArray();
         data.v2 = this.v2.toArray();

         return data;

      };

      public fromJSON(json) {

         super.fromJSON(json);

         this.v1.fromArray(json.v1);
         this.v2.fromArray(json.v2);

         return this;

      };

   }
}