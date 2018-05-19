module THREE {


   export class WebGLObjects {
      public geometries;
      public info;
      public updateList;
      constructor(geometries, info) {
         this.geometries = geometries;
         this.info = info;

         this.updateList = {};
      }

      public update(object) {

         var frame = this.info.render.frame;

         var geometry = object.geometry;
         var buffergeometry = this.geometries.get(object, geometry);

         // Update once per frame

         if (this.updateList[buffergeometry.id] !== frame) {

            if (geometry.isGeometry) {

               buffergeometry.updateFromObject(object);

            }

            this.geometries.update(buffergeometry);

            this.updateList[buffergeometry.id] = frame;

         }

         return buffergeometry;

      }

      public dispose() {
         this.updateList = {};
      }
   }

}
