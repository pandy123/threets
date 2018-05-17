module Threets {

   export class LightShadow {


      public camera;
      public bias;
      public radius;
      public mapSize;
      public map;
      public matrix;
      constructor(camera) {
         this.camera = camera;
         this.bias = 0;
         this.radius = 1;
         this.mapSize = new Vector2(512, 512);
         this.map = null;
         this.matrix = new Matrix4();

      }


      public copy(source) {
         this.camera = source.camera.clone();
         this.bias = source.bias;
         this.radius = source.radius;
         this.mapSize.copy(source.mapSize);
         return this;

      }

      public clone() {
         var lightShaow = new LightShadow(null);
         lightShaow.copy(this);
         return lightShaow;
      }

      public toJSON() {
         var object = {} as any;
         if (this.bias !== 0) object.bias = this.bias;
         if (this.radius !== 1) object.radius = this.radius;
         if (this.mapSize.x !== 512 || this.mapSize.y !== 512) object.mapSize = this.mapSize.toArray();
         object.camera = this.camera.toJSON(false).object;
         delete object.camera.matrix;
         return object;
      }

   }
}
