module THREE {


   export class WebGLIndexedBufferRenderer {
      public mode;
      public type;
      public bytesPerElement;
      public gl;
      public extensions;
      public info;
      constructor(gl, extensions, info) {

         this.gl = gl;
         this.extensions = extensions;
         this.info = info;
      }

      public setMode(value) {
         this.mode = value;
      }



      public setIndex(value) {

         this.type = value.type;
         this.bytesPerElement = value.bytesPerElement;

      }

      public render(start, count) {

         this.gl.drawElements(this.mode, count, this.type, start * this.bytesPerElement);

         this.info.update(count, this.mode);

      }

      public renderInstances(geometry, start, count) {

         var extension = this.extensions.get('ANGLE_instanced_arrays');

         if (extension === null) {

            console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
            return;

         }

         extension.drawElementsInstancedANGLE(this.mode, count, this.type, start * this.bytesPerElement, geometry.maxInstancedCount);

         this.info.update(count, this.mode, geometry.maxInstancedCount);

      }

      //
   }


}
