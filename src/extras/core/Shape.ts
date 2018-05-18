module Threets {
   export class Shape extends Path {

      public uuid;
      public type;
      public holes;

      constructor(points?) {
         super(points)
         this.uuid = _Math.generateUUID();
         this.type = 'Shape';
         this.holes = [];
      }

      public getPointsHoles(divisions) {

         var holesPts = [];

         for (var i = 0, l = this.holes.length; i < l; i++) {

            holesPts[i] = this.holes[i].getPoints(divisions);

         }

         return holesPts;

      }

      // get points of shape and holes (keypoints based on segments parameter)

      public extractPoints(divisions) {

         return {

            shape: this.getPoints(divisions),
            holes: this.getPointsHoles(divisions)

         };

      }

      public copy(source) {

         Path.prototype.copy.call(this, source);

         this.holes = [];

         for (var i = 0, l = source.holes.length; i < l; i++) {

            var hole = source.holes[i];

            this.holes.push(hole.clone());

         }

         return this;

      }

      public toJSON() {

         var data = Path.prototype.toJSON.call(this);

         data.uuid = this.uuid;
         data.holes = [];

         for (var i = 0, l = this.holes.length; i < l; i++) {

            var hole = this.holes[i];
            data.holes.push(hole.toJSON());

         }

         return data;

      }

      public fromJSON(json) {
         super.fromJSON(json);

         this.uuid = json.uuid;
         this.holes = [];

         for (var i = 0, l = json.holes.length; i < l; i++) {

            var hole = json.holes[i];
            this.holes.push(new Path(null).fromJSON(hole));

         }

         return this;

      }

   }
}