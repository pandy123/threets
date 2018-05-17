module Threets {

   export class BooleanKeyframeTrack extends KeyframeTrack {
      public ValueTypeName: string;
      public ValueBufferType: any;
      public DefaultInterpolation: any;
      public InterpolantFactoryMethodLinear: any;
      public InterpolantFactoryMethodSmooth: any;

      constructor(name, times, values) {
         super(name, times, values);
         this.ValueTypeName = 'bool';
         this.ValueBufferType = Array;
         this.DefaultInterpolation = InterpolateDiscrete;
         this.InterpolantFactoryMethodLinear = undefined;
         this.InterpolantFactoryMethodSmooth = undefined;
      }

   }
}