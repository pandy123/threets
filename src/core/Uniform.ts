
module THREE {
   export class Uniform {
      public value: any;
      constructor(value?: any) {
         if (typeof value === 'string') {
            console.warn('THREE.Uniform: Type parameter is no longer needed.');
            value = arguments[1];
         }
         this.value = value;
      }
      public clone = function () {
         return new Uniform(this.value.clone === undefined ? this.value : this.value.clone());
      }
   }
}
