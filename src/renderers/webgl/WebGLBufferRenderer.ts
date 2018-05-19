module THREE {


   export class WebGLBufferRenderer {
      public mode;
      public gl;
      public extensions;
      public info

      constructor(gl, extensions, info) {
         this.gl = gl;
         this.extensions = extensions;
         this.info = info;
         this.mode = null;


      }

      public setMode(value) {

         this.mode = value;

      }

      public render(start, count) {

         this.gl.drawArrays(this.mode, start, count);

         this.info.update(count, this.mode);

      }

      public renderInstances(geometry, start, count) {

         var extension = this.extensions.get('ANGLE_instanced_arrays');

         if (extension === null) {

            console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
            return;

         }

         extension.drawArraysInstancedANGLE(this.mode, start, count, geometry.maxInstancedCount);

         this.info.update(count, this.mode, geometry.maxInstancedCount);

      }
   }

}
