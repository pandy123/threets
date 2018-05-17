module Threets {

   export class VectorKeyframeTrack extends KeyframeTrack {
      public ValueTypeName;

      constructor(name, times, values, interpolation) {
         super(name, times, values, interpolation);
         this.ValueTypeName = 'vector';
      }

   }
}