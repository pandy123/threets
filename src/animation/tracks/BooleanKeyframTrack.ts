module THREE {

   export class BooleanKeyframeTrack extends KeyframeTrack {
      public ValueTypeName: string;
      public ValueBufferType: any;
      public DefaultInterpolation: any;

      constructor(name, times, values) {
         super(name, times, values, null);
         this.ValueTypeName = 'bool';
         this.ValueBufferType = Array;
         this.DefaultInterpolation = InterpolateDiscrete;
         this.InterpolantFactoryMethodLinear = undefined;
         this.InterpolantFactoryMethodSmooth = undefined;
      }

   }
}