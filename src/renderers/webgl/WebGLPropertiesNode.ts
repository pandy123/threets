module THREE {
   export class WebGLPropertyNode {
      public shader: any;
      public program: WebGLProgramNode;
      public lightsHash;
      public numClippingPlanes;
      public numIntersection;
      public fog;
      /**存放材料和灯光中涉及的uniformlist */
      public uniformsList;
      public __maxMipLevel;
      public __webglFramebuffer;
      public __webglTexture;
      constructor() {

      }
   }
   export class WebGLPropertiesNode {
      public properties: WeakMap<Material | any, WebGLPropertyNode>;
      constructor() {
         this.properties = new WeakMap();
      }
      public get(material: Material | any): WebGLPropertyNode {
         var map = this.properties.get(material);
         if (map === undefined) {
            map = new WebGLPropertyNode();
            this.properties.set(material, map);
         }
         return map;
      }

      public remove(material) {
         this.properties.delete(material);
      }

      public update(material, key, value) {
         this.properties.get(material)[key] = value;
      }

      public dispose() {
         this.properties = new WeakMap();
      }
   }
}
