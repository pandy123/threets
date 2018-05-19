module THREE {
   export class Layers {
      public mask: number;
      constructor() {
         this.mask = 1 | 0;
      }
      public set(channel) {
         this.mask = 1 << channel | 0;
      }
      public enable(channel) {
         this.mask |= 1 << channel | 0;
      }
      public toggle(channel) {
         this.mask ^= 1 << channel | 0;
      }
      public disable(channel) {
         this.mask &= ~(1 << channel | 0);
      }
      public test(layers) {
         return (this.mask & layers.mask) !== 0;
      }
   }
}