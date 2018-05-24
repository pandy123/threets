module THREE {
   export class GLBufferNode {
      public buffer: WebGLBuffer;
      public type: number;
      public bytesPerElement: any;
      public version: number;
      constructor() {

      }
   }
   export class WebGLAttributesNode {
      public gl: WebGLContext;
      public buffers: WeakMap<BufferAttribute, GLBufferNode>;
      constructor(gl: WebGLContext) {
         var buffers = new WeakMap();
         this.gl = gl;
         this.buffers = buffers;
      }

      /**
       * 
       * @param attribute 
       * @param bufferType  gl.ARRAY_BUFFER 
       */
      public createBuffer(attribute: BufferAttribute, bufferType: number) {
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
         var buffernode = new GLBufferNode();
         buffernode = {
            buffer: buffer,
            type: type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version
         };

         return buffernode;

      }

      /**
       * 更新buffer
       * @param buffer 
       * @param attribute 
       * @param bufferType 
       */
      public updateBuffer(buffer: WebGLBuffer, attribute: BufferAttribute | any, bufferType: number) {
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
      /**
       * 获取glbufferNode
       * @param attribute 
       */
      public get(attribute: BufferAttribute | any) {
         var buffers = this.buffers;
         if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
         return buffers.get(attribute);
      }

      /**
       * 删除bufferNode
       * @param attribute 
       */
      public remove(attribute: BufferAttribute | any) {
         var buffers = this.buffers;
         var gl = this.gl;
         if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
         var data = buffers.get(attribute);
         if (data) {
            gl.deleteBuffer(data.buffer);
            buffers.delete(attribute);
         }
      }

      /**
       * 更新glbuffer 的 内存 ，根据版本更新buffer
       * @param attribute 
       * @param bufferType 
       */
      public update(attribute: BufferAttribute | any, bufferType: number) {
         var buffers = this.buffers;
         var gl = this.gl;
         if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
         var data = buffers.get(attribute);
         if (data === undefined) {
            var newbuffer = this.createBuffer(attribute, bufferType);
            buffers.set(attribute, newbuffer);
         } else if (data.version < attribute.version) {
            this.updateBuffer(data.buffer, attribute, bufferType);
            data.version = attribute.version;
         }
      }
   }

}

