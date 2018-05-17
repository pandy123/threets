module Threets {

   export class NumberKeyframeTrack extends KeyframeTrack {
      public ValueTypeName: any;
      constructor(name, times, values, interpolation?) {
         super(name, times, values, interpolation);
         this.ValueTypeName = 'number';
      }
   }
}