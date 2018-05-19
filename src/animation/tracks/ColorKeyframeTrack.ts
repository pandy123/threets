module THREE {

   export class ColorKeyframeTrack extends KeyframeTrack {
      public ValueTypeName: any;
      constructor(name, times, values, interpolation) {
         super(name, times, values, interpolation);
         this.ValueTypeName = "color";
      }
   }
}