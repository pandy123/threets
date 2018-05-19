module THREE {
   export class DiscreteInterpolant extends Interpolant {
      constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer?: any) {
         super(parameterPositions, sampleValues, sampleSize, resultBuffer);
      }
      public interpolate_(i1:any /*, t0, t, t1 */) {
         return this.copySampleValue_(i1 - 1);
      }
   }
}