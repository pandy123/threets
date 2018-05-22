module THREE {
   export class WebGLContext {
      public gl: WebGLRenderingContext;
      public canvas: any;
      public drawingBufferHeight;
      public drawingBufferWidth;

      constructor(canvas: any, contextAttributes: WebGLContextAttributes) {
         this.canvas = canvas;
         this.gl = this.canvas.getContext('webgl', contextAttributes) || this.canvas.getContext('experimental-webgl', contextAttributes);
      }

      public activeTexture(texture: number) {
         this.gl.activeTexture(texture);
      }

      public attachShader(program: WebGLProgram, shader: WebGLShader) {
         this.gl.attachShader(program, shader);
      }

      public bindAttribLocation(program: WebGLProgram, index: number, name: string) {
         this.gl.bindAttribLocation(program, index, name);
      }

      public bindBuffer(target: number, buffer: WebGLBuffer) {
         this.gl.bindBuffer(target, buffer);
      }

      public bindFramebuffer(target: number, framebuffer: WebGLFramebuffer) {
         this.gl.bindFramebuffer(target, framebuffer);
      }

      public bindRenderbuffer(target: number, renderbuffer: WebGLRenderbuffer) {
         this.gl.bindRenderbuffer(target, renderbuffer);
      }

      public bindTexture(target: number, texture: WebGLTexture) {
         this.gl.bindTexture(target, texture);
      }

      public blendColor(red: number, green: number, blue: number, alpha: number) {
         this.gl.blendColor(red, green, blue, alpha);
      }

      public blendEquation(mode: number) {
         this.gl.blendEquation(mode);
      }

      public blendEquationSeparate(modeRGB: number, modeAlpha: number) {
         this.gl.blendEquationSeparate(modeRGB, modeAlpha);
      }

      public blendFunc(modeRGB: number, modeAlpha: number) {
         this.gl.blendFunc(modeRGB, modeAlpha);
      }
      public blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
         this.gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
      }
      public bufferData(target: number, size: number | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer, usage: number) {
         this.gl.bufferData(target, size, usage);
      }
      public bufferSubData(target: number, offset: number, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer) {
         this.gl.bufferSubData(target, offset, data);
      }

      public checkFramebufferStatus(target): number {
         var result = this.gl.checkFramebufferStatus(target);
         return result;
      }
      public clear(mask: number) {
         this.gl.clear(mask);
      }
      public clearColor(red: number, green: number, blue: number, alpha: number) {
         this.gl.clearColor(red, green, blue, alpha);
      }
      public clearDepth(depth: number) {
         this.gl.clearDepth(depth);
      }
      public clearStencil(s: number) {
         this.gl.clearStencil(s);
      }
      public colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean) {
         this.gl.colorMask(red, green, blue, alpha);
      }
      public compileShader(shader: WebGLShader) {
         this.gl.compileShader(shader);
      }
      public compressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView) {
         this.gl.compressedTexImage2D(target, level, internalformat, width, height, border, data);
      }
      public compressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView) {
         this.gl.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, data);
      }
      public copyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number) {
         this.gl.copyTexImage2D(target, level, internalformat, x, y, width, height, border);
      }
      public copyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number) {
         this.gl.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
      }
      public createBuffer() {
         return this.gl.createBuffer();
      }
      public createFramebuffer() {
         return this.gl.createFramebuffer();
      }
      public createProgram() {
         return this.gl.createProgram();
      }
      public createRenderbuffer() {
         return this.gl.createRenderbuffer();
      }
      public createShader(type: number) {
         return this.gl.createShader(type);
      }
      public createTexture() {
         return this.gl.createTexture();
      }
      public cullFace(mode: number) {
         this.gl.cullFace(mode);
      }
      public deleteBuffer(buffer: WebGLBuffer) {
         this.gl.deleteBuffer(buffer);
      }
      public deleteFramebuffer(framebuffer: WebGLFramebuffer) {
         this.gl.deleteFramebuffer(framebuffer);
      }
      public deleteProgram(program: WebGLProgram) {
         this.gl.deleteProgram(program);
      }
      public deleteRenderbuffer(program: WebGLProgram) {
         this.gl.deleteRenderbuffer(program);
      }
      public deleteShader(shader: WebGLShader) {
         this.gl.deleteShader(shader);
      }
      public deleteTexture(texture: WebGLTexture) {
         this.gl.deleteTexture(texture);
      }
      public depthFunc(func: number) {
         this.gl.depthFunc(func);
      }
      public depthMask(flag: boolean) {
         this.gl.depthMask(flag);
      }
      public depthRange(zNear: number, zFar: number) {
         this.gl.depthRange(zNear, zFar);
      }
      public detachShader(program: WebGLProgram, shader: WebGLShader) {
         this.gl.detachShader(program, shader);
      }
      public disable(cap: number) {
         this.gl.disable(cap);
      }
      public disableVertexAttribArray(index: number) {
         this.gl.disableVertexAttribArray(index);
      }
      public drawArrays(mode: number, first: number, count: number) {
         this.gl.drawArrays(mode, first, count);
      }
      public drawElements(mode: number, count: number, type: number, offset: number) {
         this.gl.drawElements(mode, count, type, offset);
      }

      public enable(cap: number) {
         this.gl.enable(cap);
      }
      public enableVertexAttribArray(index: number) {
         this.gl.enableVertexAttribArray(index);
      }
      public finish() {
         this.gl.finish();
      }
      public flush() {
         this.gl.flush();
      }
      public framebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: WebGLRenderbuffer) {
         this.gl.framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
      }
      public framebufferTexture2D(target: number, attachment: number, textarget: number, texture: WebGLTexture, level: number) {
         this.gl.framebufferTexture2D(target, attachment, textarget, texture, level);
      }
      public frontFace(mode: number) {
         this.gl.frontFace(mode);
      }
      public generateMipmap(mode: number) {
         return this.gl.generateMipmap(mode);
      }
      public getActiveAttrib(program: WebGLProgram, index: number) {
         return this.gl.getActiveAttrib(program, index);
      }
      public getActiveUniform(program: WebGLProgram, index: number) {
         return this.gl.getActiveUniform(program, index);
      }
      public getAttachedShaders(program: WebGLProgram) {
         return this.gl.getAttachedShaders(program);
      }
      public getAttribLocation(program: WebGLProgram, name: string) {
         return this.gl.getAttribLocation(program, name);
      }
      public getBufferParameter(target: number, pname: number) {
         return this.gl.getBufferParameter(target, pname);
      }
      public getContextAttributes() {
         return this.gl.getContextAttributes();
      }
      public getError() {
         return this.gl.getError();
      }
      // todo
      public getExtension(extensionName: string): any {
         var result = this.gl.getExtension(extensionName);
         return result;
      }

      public getFramebufferAttachmentParameter(target: number, attachment: number, pname: number) {
         return this.gl.getFramebufferAttachmentParameter(target, attachment, pname);
      }
      public getParameter(pname: number): any {
         var result = this.gl.getParameter(pname);
         return result;
      }

      public getProgramInfoLog(program: WebGLProgram) {
         return this.gl.getProgramInfoLog(program);
      }
      public getProgramParameter(program: WebGLProgram, pname: number) {
         return this.gl.getProgramParameter(program, pname);
      }
      public getRenderbufferParameter(target: number, pname: number) {
         return this.gl.getRenderbufferParameter(target, pname);
      }
      public getShaderInfoLog(shader: WebGLShader) {
         return this.gl.getShaderInfoLog(shader);
      }
      public getShaderParameter(shader: WebGLShader, pname: number) {
         return this.gl.getShaderParameter(shader, pname);
      }
      public getShaderPrecisionFormat(shadertype: number, precisiontype: number) {
         this.gl.getShaderPrecisionFormat(shadertype, precisiontype);
      }
      public getShaderSource(shader: WebGLShader) {
         return this.gl.getShaderSource(shader);
      }
      public getSupportedExtensions() {
         return this.gl.getSupportedExtensions();
      }
      public getTexParameter(target: number, pname: number) {
         return this.gl.getTexParameter(target, pname);
      }
      public getUniform(program: WebGLProgram, location: WebGLUniformLocation) {
         return this.gl.getUniform(program, location);
      }
      public getUniformLocation(program: WebGLProgram, name: string) {
         return this.gl.getUniformLocation(program, name);
      }
      public getVertexAttrib(index: number, pname: number) {
         return this.gl.getVertexAttrib(index, pname);
      }
      public getVertexAttribOffset(index: number, pname: number) {
         return this.gl.getVertexAttribOffset(index, pname);
      }
      public hint(target: number, mode: number) {
         this.gl.hint(target, mode);
      }
      public isBuffer(buffer: WebGLBuffer) {
         this.gl.isBuffer(buffer);
      }
      public isContextLost() {
         this.gl.isContextLost();
      }
      public isEnabled(cap: number) {
         this.gl.isEnabled(cap);
      }
      public isFramebuffer(framebuffer: WebGLFramebuffer) {
         this.gl.isFramebuffer(framebuffer);
      }
      public isProgram(program: WebGLProgram) {
         this.gl.isProgram(program);
      }
      public isRenderbuffer(renderbuffer: WebGLRenderbuffer) {
         this.gl.isRenderbuffer(renderbuffer);
      }
      public isShader(shader: WebGLShader) {
         this.gl.isShader(shader);
      }
      public isTexture(shader: WebGLShader) {
         this.gl.isTexture(shader);
      }
      public lineWidth(width: number) {
         this.gl.lineWidth(width);
      }
      public linkProgram(program: WebGLProgram) {
         this.gl.linkProgram(program);
      }
      public pixelStorei(pname: number, param: number | boolean) {
         this.gl.pixelStorei(pname, param);
      }
      public polygonOffset(factor: number, units: number) {
         this.gl.polygonOffset(factor, units);
      }
      public readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView) {
         this.gl.readPixels(x, y, width, height, format, type, pixels);
      }
      public renderbufferStorage(target: number, internalformat: number, width: number, height: number) {
         this.gl.renderbufferStorage(target, internalformat, width, height);
      }
      public sampleCoverage(value: number, invert: boolean) {
         this.gl.sampleCoverage(value, invert);
      }
      public scissor(x: number, y: number, width: number, height: number) {
         this.gl.scissor(x, y, width, height);
      }
      public shaderSource(shader: WebGLShader, source: string) {
         this.gl.shaderSource(shader, source);
      }
      public stencilFunc(func: number, ref: number, mask: number) {
         this.gl.stencilFunc(func, ref, mask);
      }
      public stencilFuncSeparate(face: number, func: number, ref: number, mask: number) {
         this.gl.stencilFuncSeparate(face, func, ref, mask);
      }
      public stencilMask(mask: number) {
         this.gl.stencilMask(mask);
      }
      public stencilMaskSeparate(face: number, mask: number) {
         this.gl.stencilMaskSeparate(face, mask);
      }
      public stencilOp(fail: number, zfail: number, zpass: number) {
         this.gl.stencilOp(fail, zfail, zpass);
      }
      public stencilOpSeparate(face: number, fail: number, zfail: number, zpass: number) {
         this.gl.stencilOpSeparate(face, fail, zfail, zpass);
      }
      public texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView) {
         this.gl.texImage2D(target, level, internalformat, width, height, border, format, type, pixels);
      }
      public texParameterf(target: number, pname: number, param: number) {
         this.gl.texParameterf(target, pname, param);
      }
      public texParameteri(target: number, pname: number, param: number) {
         this.gl.texParameteri(target, pname, param);
      }
      public texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView) {
         this.gl.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
      }
      public uniform1f(location: WebGLUniformLocation, x: number) {
         this.gl.uniform1f(location, x);
      }
      public uniform1fv(location: WebGLUniformLocation, v: Float32Array | number[]) {
         this.gl.uniform1fv(location, v);
      }
      public uniform1i(location: WebGLUniformLocation, x: number) {
         this.gl.uniform1i(location, x);
      }
      public uniform1iv(location: WebGLUniformLocation, v: Int32Array | number[]) {
         this.gl.uniform1iv(location, v);
      }
      public uniform2f(location: WebGLUniformLocation, x: number, y: number) {
         this.gl.uniform2f(location, x, y);
      }
      public uniform2fv(location: WebGLUniformLocation, v: Float32Array | number[]) {
         this.gl.uniform2fv(location, v);
      }
      public uniform2i(location: WebGLUniformLocation, x: number, y: number) {
         this.gl.uniform2i(location, x, y);
      }
      public uniform2iv(location: WebGLUniformLocation, v: Int32Array | number[]) {
         this.gl.uniform2iv(location, v);
      }
      public uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number) {
         this.gl.uniform3f(location, x, y, z);
      }
      public uniform3fv(location: WebGLUniformLocation, v: Float32Array | number[]) {
         this.gl.uniform3fv(location, v);
      }
      public uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number) {
         this.gl.uniform3i(location, x, y, z);
      }
      public uniform3iv(location: WebGLUniformLocation, v: Int32Array | number[]) {
         this.gl.uniform3iv(location, v);
      }
      public uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number) {
         this.gl.uniform4f(location, x, y, z, w);
      }
      public uniform4fv(location: WebGLUniformLocation, v: Float32Array | Array<number>) {
         this.gl.uniform4fv(location, v);
      }
      public uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number) {
         this.gl.uniform4i(location, x, y, z, w);
      }
      public uniform4iv(location: WebGLUniformLocation, v: Int32Array | Array<number>) {
         this.gl.uniform4iv(location, v);
      }
      public uniformMatrix2fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array | Array<number>) {
         this.gl.uniformMatrix2fv(location, transpose, value);
      }
      public uniformMatrix3fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array | Array<number>) {
         this.gl.uniformMatrix3fv(location, transpose, value);
      }
      public uniformMatrix4fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array | Array<number>) {
         this.gl.uniformMatrix4fv(location, transpose, value);
      }
      public useProgram(program: WebGLProgram) {
         this.gl.useProgram(program);
      }
      public validateProgram(program: WebGLProgram) {
         this.gl.validateProgram(program);
      }
      public vertexAttrib1f(indx: number, x: number) {
         this.gl.vertexAttrib1f(indx, x);
      }
      public vertexAttrib1fv(indx: number, values: Float32Array | number[]) {
         this.gl.vertexAttrib1fv(indx, values);
      }
      public vertexAttrib2f(indx: number, x: number, y: number) {
         this.gl.vertexAttrib2f(indx, x, y);
      }
      public vertexAttrib2fv(indx: number, values: Float32Array | number[]) {
         this.gl.vertexAttrib2fv(indx, values);
      }
      public vertexAttrib3f(indx: number, x: number, y: number, z: number) {
         this.gl.vertexAttrib3f(indx, x, y, z);
      }
      public vertexAttrib3fv(indx: number, values: Float32Array | number[]) {
         this.gl.vertexAttrib3fv(indx, values);
      }
      public vertexAttrib4f(indx, x, y, z, w) {
         this.gl.vertexAttrib4f(indx, x, y, z, w);
      }
      public vertexAttrib4fv(indx: number, values: Float32Array | number[]) {
         this.gl.vertexAttrib4fv(indx, values);
      }
      public vertexAttribPointer(indx: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
         this.gl.vertexAttribPointer(indx, size, type, normalized, stride, offset);
      }
      public viewport(x: number, y: number, width: number, height: number) {
         this.gl.viewport(x, y, width, height);
      }

      public ACTIVE_ATTRIBUTES: number = 35721
      public ACTIVE_TEXTURE: number = 34016
      public ACTIVE_UNIFORMS: number = 35718
      public ALIASED_LINE_WIDTH_RANGE: number = 33902
      public ALIASED_POINT_SIZE_RANGE: number = 33901
      public ALPHA: number = 6406
      public ALPHA_BITS: number = 3413
      public ALWAYS: number = 519
      public ARRAY_BUFFER: number = 34962
      public ARRAY_BUFFER_BINDING: number = 34964
      public ATTACHED_SHADERS: number = 35717
      public BACK: number = 1029
      public BLEND: number = 3042
      public BLEND_COLOR: number = 32773
      public BLEND_DST_ALPHA: number = 32970
      public BLEND_DST_RGB: number = 32968
      public BLEND_EQUATION: number = 32777
      public BLEND_EQUATION_ALPHA: number = 34877
      public BLEND_EQUATION_RGB: number = 32777
      public BLEND_SRC_ALPHA: number = 32971
      public BLEND_SRC_RGB: number = 32969
      public BLUE_BITS: number = 3412
      public BOOL: number = 35670
      public BOOL_VEC2: number = 35671
      public BOOL_VEC3: number = 35672
      public BOOL_VEC4: number = 35673
      public BROWSER_DEFAULT_WEBGL: number = 37444
      public BUFFER_SIZE: number = 34660
      public BUFFER_USAGE: number = 34661
      public BYTE: number = 5120
      public CCW: number = 2305
      public CLAMP_TO_EDGE: number = 33071
      public COLOR_ATTACHMENT0: number = 36064
      public COLOR_BUFFER_BIT: number = 16384
      public COLOR_CLEAR_VALUE: number = 3106
      public COLOR_WRITEMASK: number = 3107
      public COMPILE_STATUS: number = 35713
      public COMPRESSED_TEXTURE_FORMATS: number = 34467
      public CONSTANT_ALPHA: number = 32771
      public CONSTANT_COLOR: number = 32769
      public CONTEXT_LOST_WEBGL: number = 37442
      public CULL_FACE: number = 2884
      public CULL_FACE_MODE: number = 2885
      public CURRENT_PROGRAM: number = 35725
      public CURRENT_VERTEX_ATTRIB: number = 34342
      public CW: number = 2304
      public DECR: number = 7683
      public DECR_WRAP: number = 34056
      public DELETE_STATUS: number = 35712
      public DEPTH_ATTACHMENT: number = 36096
      public DEPTH_BITS: number = 3414
      public DEPTH_BUFFER_BIT: number = 256
      public DEPTH_CLEAR_VALUE: number = 2931
      public DEPTH_COMPONENT: number = 6402
      public DEPTH_COMPONENT16: number = 33189
      public DEPTH_FUNC: number = 2932
      public DEPTH_RANGE: number = 2928
      public DEPTH_STENCIL: number = 34041
      public DEPTH_STENCIL_ATTACHMENT: number = 33306
      public DEPTH_TEST: number = 2929
      public DEPTH_WRITEMASK: number = 2930
      public DITHER: number = 3024
      public DONT_CARE: number = 4352
      public DST_ALPHA: number = 772
      public DST_COLOR: number = 774
      public DYNAMIC_DRAW: number = 35048
      public ELEMENT_ARRAY_BUFFER: number = 34963
      public ELEMENT_ARRAY_BUFFER_BINDING: number = 34965
      public EQUAL: number = 514
      public FASTEST: number = 4353
      public FLOAT: number = 5126
      public FLOAT_MAT2: number = 35674
      public FLOAT_MAT3: number = 35675
      public FLOAT_MAT4: number = 35676
      public FLOAT_VEC2: number = 35664
      public FLOAT_VEC3: number = 35665
      public FLOAT_VEC4: number = 35666
      public FRAGMENT_SHADER: number = 35632
      public FRAMEBUFFER: number = 36160
      public FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number = 36049
      public FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number = 36048
      public FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number = 36051
      public FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number = 36050
      public FRAMEBUFFER_BINDING: number = 36006
      public FRAMEBUFFER_COMPLETE: number = 36053
      public FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number = 36054
      public FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number = 36057
      public FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number = 36055
      public FRAMEBUFFER_UNSUPPORTED: number = 36061
      public FRONT: number = 1028
      public FRONT_AND_BACK: number = 1032
      public FRONT_FACE: number = 2886
      public FUNC_ADD: number = 32774
      public FUNC_REVERSE_SUBTRACT: number = 32779
      public FUNC_SUBTRACT: number = 32778
      public GENERATE_MIPMAP_HINT: number = 33170
      public GEQUAL: number = 518
      public GREATER: number = 516
      public GREEN_BITS: number = 3411
      public HIGH_FLOAT: number = 36338
      public HIGH_INT: number = 36341
      public IMPLEMENTATION_COLOR_READ_FORMAT: number = 35739
      public IMPLEMENTATION_COLOR_READ_TYPE: number = 35738
      public INCR: number = 7682
      public INCR_WRAP: number = 34055
      public INT: number = 5124
      public INT_VEC2: number = 35667
      public INT_VEC3: number = 35668
      public INT_VEC4: number = 35669
      public INVALID_ENUM: number = 1280
      public INVALID_FRAMEBUFFER_OPERATION: number = 1286
      public INVALID_OPERATION: number = 1282
      public INVALID_VALUE: number = 1281
      public INVERT: number = 5386
      public KEEP: number = 7680
      public LEQUAL: number = 515
      public LESS: number = 513
      public LINEAR: number = 9729
      public LINEAR_MIPMAP_LINEAR: number = 9987
      public LINEAR_MIPMAP_NEAREST: number = 9985
      public LINES: number = 1
      public LINE_LOOP: number = 2
      public LINE_STRIP: number = 3
      public LINE_WIDTH: number = 2849
      public LINK_STATUS: number = 35714
      public LOW_FLOAT: number = 36336
      public LOW_INT: number = 36339
      public LUMINANCE: number = 6409
      public LUMINANCE_ALPHA: number = 6410
      public MAX_COMBINED_TEXTURE_IMAGE_UNITS: number = 35661
      public MAX_CUBE_MAP_TEXTURE_SIZE: number = 34076
      public MAX_FRAGMENT_UNIFORM_VECTORS: number = 36349
      public MAX_RENDERBUFFER_SIZE: number = 34024
      public MAX_TEXTURE_IMAGE_UNITS: number = 34930
      public MAX_TEXTURE_SIZE: number = 3379
      public MAX_VARYING_VECTORS: number = 36348
      public MAX_VERTEX_ATTRIBS: number = 34921
      public MAX_VERTEX_TEXTURE_IMAGE_UNITS: number = 35660
      public MAX_VERTEX_UNIFORM_VECTORS: number = 36347
      public MAX_VIEWPORT_DIMS: number = 3386
      public MEDIUM_FLOAT: number = 36337
      public MEDIUM_INT: number = 36340
      public MIRRORED_REPEAT: number = 33648
      public NEAREST: number = 9728
      public NEAREST_MIPMAP_LINEAR: number = 9986
      public NEAREST_MIPMAP_NEAREST: number = 9984
      public NEVER: number = 512
      public NICEST: number = 4354
      public NONE: number = 0
      public NOTEQUAL: number = 517
      public NO_ERROR: number = 0
      public ONE: number = 1
      public ONE_MINUS_CONSTANT_ALPHA: number = 32772
      public ONE_MINUS_CONSTANT_COLOR: number = 32770
      public ONE_MINUS_DST_ALPHA: number = 773
      public ONE_MINUS_DST_COLOR: number = 775
      public ONE_MINUS_SRC_ALPHA: number = 771
      public ONE_MINUS_SRC_COLOR: number = 769
      public OUT_OF_MEMORY: number = 1285
      public PACK_ALIGNMENT: number = 3333
      public POINTS: number = 0
      public POLYGON_OFFSET_FACTOR: number = 32824
      public POLYGON_OFFSET_FILL: number = 32823
      public POLYGON_OFFSET_UNITS: number = 10752
      public RED_BITS: number = 3410
      public RENDERBUFFER: number = 36161
      public RENDERBUFFER_ALPHA_SIZE: number = 36179
      public RENDERBUFFER_BINDING: number = 36007
      public RENDERBUFFER_BLUE_SIZE: number = 36178
      public RENDERBUFFER_DEPTH_SIZE: number = 36180
      public RENDERBUFFER_GREEN_SIZE: number = 36177
      public RENDERBUFFER_HEIGHT: number = 36163
      public RENDERBUFFER_INTERNAL_FORMAT: number = 36164
      public RENDERBUFFER_RED_SIZE: number = 36176
      public RENDERBUFFER_STENCIL_SIZE: number = 36181
      public RENDERBUFFER_WIDTH: number = 36162
      public RENDERER: number = 7937
      public REPEAT: number = 10497
      public REPLACE: number = 7681
      public RGB: number = 6407
      public RGB5_A1: number = 32855
      public RGB565: number = 36194
      public RGBA: number = 6408
      public RGBA4: number = 32854
      public SAMPLER_2D: number = 35678
      public SAMPLER_CUBE: number = 35680
      public SAMPLES: number = 32937
      public SAMPLE_ALPHA_TO_COVERAGE: number = 32926
      public SAMPLE_BUFFERS: number = 32936
      public SAMPLE_COVERAGE: number = 32928
      public SAMPLE_COVERAGE_INVERT: number = 32939
      public SAMPLE_COVERAGE_VALUE: number = 32938
      public SCISSOR_BOX: number = 3088
      public SCISSOR_TEST: number = 3089
      public SHADER_TYPE: number = 35663
      public SHADING_LANGUAGE_VERSION: number = 35724
      public SHORT: number = 5122
      public SRC_ALPHA: number = 770
      public SRC_ALPHA_SATURATE: number = 776
      public SRC_COLOR: number = 768
      public STATIC_DRAW: number = 35044
      public STENCIL_ATTACHMENT: number = 36128
      public STENCIL_BACK_FAIL: number = 34817
      public STENCIL_BACK_FUNC: number = 34816
      public STENCIL_BACK_PASS_DEPTH_FAIL: number = 34818
      public STENCIL_BACK_PASS_DEPTH_PASS: number = 34819
      public STENCIL_BACK_REF: number = 36003
      public STENCIL_BACK_VALUE_MASK: number = 36004
      public STENCIL_BACK_WRITEMASK: number = 36005
      public STENCIL_BITS: number = 3415
      public STENCIL_BUFFER_BIT: number = 1024
      public STENCIL_CLEAR_VALUE: number = 2961
      public STENCIL_FAIL: number = 2964
      public STENCIL_FUNC: number = 2962
      public STENCIL_INDEX8: number = 36168
      public STENCIL_PASS_DEPTH_FAIL: number = 2965
      public STENCIL_PASS_DEPTH_PASS: number = 2966
      public STENCIL_REF: number = 2967
      public STENCIL_TEST: number = 2960
      public STENCIL_VALUE_MASK: number = 2963
      public STENCIL_WRITEMASK: number = 2968
      public STREAM_DRAW: number = 35040
      public SUBPIXEL_BITS: number = 3408
      public TEXTURE: number = 5890
      public TEXTURE0: number = 33984
      public TEXTURE1: number = 33985
      public TEXTURE2: number = 33986
      public TEXTURE3: number = 33987
      public TEXTURE4: number = 33988
      public TEXTURE5: number = 33989
      public TEXTURE6: number = 33990
      public TEXTURE7: number = 33991
      public TEXTURE8: number = 33992
      public TEXTURE9: number = 33993
      public TEXTURE10: number = 33994
      public TEXTURE11: number = 33995
      public TEXTURE12: number = 33996
      public TEXTURE13: number = 33997
      public TEXTURE14: number = 33998
      public TEXTURE15: number = 33999
      public TEXTURE16: number = 34000
      public TEXTURE17: number = 34001
      public TEXTURE18: number = 34002
      public TEXTURE19: number = 34003
      public TEXTURE20: number = 34004
      public TEXTURE21: number = 34005
      public TEXTURE22: number = 34006
      public TEXTURE23: number = 34007
      public TEXTURE24: number = 34008
      public TEXTURE25: number = 34009
      public TEXTURE26: number = 34010
      public TEXTURE27: number = 34011
      public TEXTURE28: number = 34012
      public TEXTURE29: number = 34013
      public TEXTURE30: number = 34014
      public TEXTURE31: number = 34015
      public TEXTURE_2D: number = 3553
      public TEXTURE_BINDING_2D: number = 32873
      public TEXTURE_BINDING_CUBE_MAP: number = 34068
      public TEXTURE_CUBE_MAP: number = 34067
      public TEXTURE_CUBE_MAP_NEGATIVE_X: number = 34070
      public TEXTURE_CUBE_MAP_NEGATIVE_Y: number = 34072
      public TEXTURE_CUBE_MAP_NEGATIVE_Z: number = 34074
      public TEXTURE_CUBE_MAP_POSITIVE_X: number = 34069
      public TEXTURE_CUBE_MAP_POSITIVE_Y: number = 34071
      public TEXTURE_CUBE_MAP_POSITIVE_Z: number = 34073
      public TEXTURE_MAG_FILTER: number = 10240
      public TEXTURE_MIN_FILTER: number = 10241
      public TEXTURE_WRAP_S: number = 10242
      public TEXTURE_WRAP_T: number = 10243
      public TRIANGLES: number = 4
      public TRIANGLE_FAN: number = 6
      public TRIANGLE_STRIP: number = 5
      public UNPACK_ALIGNMENT: number = 3317
      public UNPACK_COLORSPACE_CONVERSION_WEBGL: number = 37443
      public UNPACK_FLIP_Y_WEBGL: number = 37440
      public UNPACK_PREMULTIPLY_ALPHA_WEBGL: number = 37441
      public UNSIGNED_BYTE: number = 5121
      public UNSIGNED_INT: number = 5125
      public UNSIGNED_SHORT: number = 5123
      public UNSIGNED_SHORT_4_4_4_4: number = 32819
      public UNSIGNED_SHORT_5_5_5_1: number = 32820
      public UNSIGNED_SHORT_5_6_5: number = 33635
      public VALIDATE_STATUS: number = 35715
      public VENDOR: number = 7936
      public VERSION: number = 7938
      public VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number = 34975
      public VERTEX_ATTRIB_ARRAY_ENABLED: number = 34338
      public VERTEX_ATTRIB_ARRAY_NORMALIZED: number = 34922
      public VERTEX_ATTRIB_ARRAY_POINTER: number = 34373
      public VERTEX_ATTRIB_ARRAY_SIZE: number = 34339
      public VERTEX_ATTRIB_ARRAY_STRIDE: number = 34340
      public VERTEX_ATTRIB_ARRAY_TYPE: number = 34341
      public VERTEX_SHADER: number = 35633
      public VIEWPORT: number = 2978
      public ZERO: number = 0

   }
}
