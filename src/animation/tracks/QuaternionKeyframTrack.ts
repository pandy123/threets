module Threets {

   export class QuaternionKeyframeTrack extends KeyframeTrack {
      public ValueTypeName: string;
      public DefaultInterpolation: any;
      public InterpolantFactoryMethodSmooth: any;
      constructor(name, times, values, interpolation) {
         super(name, times, values, interpolation);
         this.ValueTypeName = 'quaternion';
         this.DefaultInterpolation = InterpolateLinear;
         this.InterpolantFactoryMethodSmooth = undefined;
      }

      InterpolantFactoryMethodLinear(result) {

         return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);

      }


   }
}