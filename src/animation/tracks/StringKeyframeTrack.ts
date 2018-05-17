module Threets {

   export class StringKeyframeTrack extends KeyframeTrack {
      public ValueTypeName;
      public ValueBufferType;

      public DefaultInterpolation;

      constructor(name, times, values, interpolation) {
         super(name, times, values, interpolation);
         this.ValueTypeName = 'string'
         this.ValueBufferType = Array;
         this.DefaultInterpolation = InterpolateDiscrete;
         this.InterpolantFactoryMethodLinear = undefined;
         this.InterpolantFactoryMethodSmooth = undefined;
      }

   }
}