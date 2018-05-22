module THREE {
   export class WebGLPropertiesNode {
      public properties;
      constructor() {
         this.properties = new WeakMap();
      }
      public get(object) {
         var map = this.properties.get(object);
         if (map === undefined) {
            map = {};
            this.properties.set(object, map);
         }
         return map;
      }

      public remove(object) {
         this.properties.delete(object);
      }

      public update(object, key, value) {
         this.properties.get(object)[key] = value;
      }

      public dispose() {
         this.properties = new WeakMap();
      }
   }
}
