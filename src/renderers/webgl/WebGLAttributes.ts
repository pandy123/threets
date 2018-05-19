module THREE {


   export class WebGLAttributes {
      public gl;
      public buffers;
      constructor(gl) {

         var buffers = new WeakMap();
         this.gl = gl;
         this.buffers = buffers;

      }

      public createBuffer(attribute, bufferType) {
         var gl = this.gl;
         var array = attribute.array;
         var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

         var buffer = gl.createBuffer();

         gl.bindBuffer(bufferType, buffer);
         gl.bufferData(bufferType, array, usage);

         attribute.onUploadCallback();

         var type = gl.FLOAT;

         if (array instanceof Float32Array) {

            type = gl.FLOAT;

         } else if (array instanceof Float64Array) {

            console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');

         } else if (array instanceof Uint16Array) {

            type = gl.UNSIGNED_SHORT;

         } else if (array instanceof Int16Array) {

            type = gl.SHORT;

         } else if (array instanceof Uint32Array) {

            type = gl.UNSIGNED_INT;

         } else if (array instanceof Int32Array) {

            type = gl.INT;

         } else if (array instanceof Int8Array) {

            type = gl.BYTE;

         } else if (array instanceof Uint8Array) {

            type = gl.UNSIGNED_BYTE;

         }

         return {
            buffer: buffer,
            type: type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version
         };

      }

      public updateBuffer(buffer, attribute, bufferType) {
         var gl = this.gl;

         var array = attribute.array;
         var updateRange = attribute.updateRange;

         gl.bindBuffer(bufferType, buffer);

         if (attribute.dynamic === false) {

            gl.bufferData(bufferType, array, gl.STATIC_DRAW);

         } else if (updateRange.count === - 1) {

            // Not using update ranges

            gl.bufferSubData(bufferType, 0, array);

         } else if (updateRange.count === 0) {

            console.error('THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');

         } else {

            gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
               array.subarray(updateRange.offset, updateRange.offset + updateRange.count));

            updateRange.count = - 1; // reset range

         }

      }

      //

      public get(attribute) {
         var buffers = this.buffers;

         if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

         return buffers.get(attribute);

      }

      public remove(attribute) {
         var buffers = this.buffers;
         var gl = this.gl;
         if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

         var data = buffers.get(attribute);

         if (data) {

            gl.deleteBuffer(data.buffer);

            buffers.delete(attribute);

         }

      }

      public update(attribute, bufferType) {
         var buffers = this.buffers;
         var gl = this.gl;
         if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

         var data = buffers.get(attribute);

         if (data === undefined) {

            buffers.set(attribute, this.createBuffer(attribute, bufferType));

         } else if (data.version < attribute.version) {

            this.updateBuffer(data.buffer, attribute, bufferType);

            data.version = attribute.version;

         }

      }
   }

}

