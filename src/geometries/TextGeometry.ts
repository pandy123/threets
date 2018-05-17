module Threets {
   export class TextGeometry extends Geometry {
      constructor(text, parameters) {
         super();
         this.type = 'TextGeometry';
         this.parameters = {
            text: text,
            parameters: parameters
         };
         this.fromBufferGeometry(new TextBufferGeometry(text, parameters));
         this.mergeVertices();
      }
   }
   export class TextBufferGeometry {
      public type: string;
      constructor(text, parameters) {
         parameters = parameters || {};
         var font = parameters.font;
         if (!(font && font.isFont)) {
            console.error('THREE.TextGeometry: font parameter is not an instance of THREE.Font.');
            return new Geometry();
         }
         var shapes = font.generateShapes(text, parameters.size, parameters.curveSegments);
         // translate parameters to ExtrudeGeometry API
         parameters.depth = parameters.height !== undefined ? parameters.height : 50;
         // defaults
         if (parameters.bevelThickness === undefined) parameters.bevelThickness = 10;
         if (parameters.bevelSize === undefined) parameters.bevelSize = 8;
         if (parameters.bevelEnabled === undefined) parameters.bevelEnabled = false;
         ExtrudeBufferGeometry.call(this, shapes, parameters);
         this.type = 'TextBufferGeometry';
      }
   }
}