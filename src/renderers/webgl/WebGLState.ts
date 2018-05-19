module THREE {
   export class ColorBuffer {
      public gl;
      public currentColorMask;
      public currentColorClear;
      public locked;
      public color;
      constructor(gl) {
         this.gl = gl;
         this.locked;
         this.color = new Vector4();
         this.currentColorMask;
         this.currentColorClear = new Vector4(0, 0, 0, 0);

      }

      public setMask(colorMask) {

         if (this.currentColorMask !== colorMask && !this.locked) {

            this.gl.colorMask(colorMask, colorMask, colorMask, colorMask);
            this.currentColorMask = colorMask;

         }

      }

      public setLocked(lock) {

         this.locked = lock;

      }

      public setClear(r, g, b, a, premultipliedAlpha?) {

         if (premultipliedAlpha === true) {

            r *= a; g *= a; b *= a;

         }

         this.color.set(r, g, b, a);

         if (this.currentColorClear.equals(this.color) === false) {

            this.gl.clearColor(r, g, b, a);
            this.currentColorClear.copy(this.color);

         }

      }

      public reset() {

         this.locked = null;
         this.currentColorMask;
         this.currentColorClear.set(- 1, 0, 0, 0); // set to invalid state

      }
   }

   export class DepthBuffer {
      public gl;
      public currentDepthMask;
      public currentDepthFunc;
      public currentDepthClear;
      public locked;
      constructor(gl) {
         this.gl = gl;
         this.locked;

         this.currentDepthMask;
         this.currentDepthFunc;
         this.currentDepthClear;

      }



      public setTest(depthTest) {
         var gl = this.gl;

         if (depthTest) {

            this.gl.enable(gl.DEPTH_TEST);

         } else {

            this.gl.disable(gl.DEPTH_TEST);

         }

      }

      public setMask(depthMask) {

         if (this.currentDepthMask !== depthMask && !this.locked) {

            this.gl.depthMask(depthMask);
            this.currentDepthMask = depthMask;

         }

      }

      public setFunc(depthFunc) {
         var gl = this.gl;

         if (this.currentDepthFunc !== depthFunc) {

            if (depthFunc) {

               switch (depthFunc) {

                  case NeverDepth:

                     gl.depthFunc(gl.NEVER);
                     break;

                  case AlwaysDepth:

                     gl.depthFunc(gl.ALWAYS);
                     break;

                  case LessDepth:

                     gl.depthFunc(gl.LESS);
                     break;

                  case LessEqualDepth:

                     gl.depthFunc(gl.LEQUAL);
                     break;
                  case EqualDepth:

                     gl.depthFunc(gl.EQUAL);
                     break;

                  case GreaterEqualDepth:

                     gl.depthFunc(gl.GEQUAL);
                     break;

                  case GreaterDepth:

                     gl.depthFunc(gl.GREATER);
                     break;

                  case NotEqualDepth:

                     gl.depthFunc(gl.NOTEQUAL);
                     break;

                  default:

                     gl.depthFunc(gl.LEQUAL);

               }

            } else {

               gl.depthFunc(gl.LEQUAL);

            }

            this.currentDepthFunc = depthFunc;

         }

      }

      setLocked(lock) {

         this.locked = lock;

      }

      setClear(depth) {

         if (this.currentDepthClear !== depth) {

            this.gl.clearDepth(depth);
            this.currentDepthClear = depth;

         }

      }

      reset() {
         this.locked;
         this.currentDepthMask;
         this.currentDepthFunc;
         this.currentDepthClear;

      }

   };



   export class StencilBuffer {
      public gl;
      public locked;
      public currentStencilMask;
      public currentStencilFunc;
      public currentStencilRef;
      public currentStencilFuncMask;
      public currentStencilFail;
      public currentStencilZFail;
      public currentStencilZPass;
      public currentStencilClear;
      constructor(gl) {
         this.gl = gl;
         this.locked;
         this.currentStencilMask;
         this.currentStencilFunc;
         this.currentStencilRef;
         this.currentStencilFuncMask;
         this.currentStencilFail;
         this.currentStencilZFail;
         this.currentStencilZPass;
         this.currentStencilClear;
      }


      public setTest(stencilTest) {
         var gl = this.gl;

         if (stencilTest) {

            gl.enable(gl.STENCIL_TEST);

         } else {

            gl.disable(gl.STENCIL_TEST);

         }

      }

      public setMask(stencilMask) {

         if (this.currentStencilMask !== stencilMask && !this.locked) {

            this.gl.stencilMask(stencilMask);
            this.currentStencilMask = stencilMask;

         }

      }

      public setFunc(stencilFunc, stencilRef, stencilMask) {

         if (this.currentStencilFunc !== stencilFunc ||
            this.currentStencilRef !== stencilRef ||
            this.currentStencilFuncMask !== stencilMask) {

            this.gl.stencilFunc(stencilFunc, stencilRef, stencilMask);

            this.currentStencilFunc = stencilFunc;
            this.currentStencilRef = stencilRef;
            this.currentStencilFuncMask = stencilMask;

         }

      }

      setOp(stencilFail, stencilZFail, stencilZPass) {

         if (this.currentStencilFail !== stencilFail ||
            this.currentStencilZFail !== stencilZFail ||
            this.currentStencilZPass !== stencilZPass) {

            this.gl.stencilOp(stencilFail, stencilZFail, stencilZPass);

            this.currentStencilFail = stencilFail;
            this.currentStencilZFail = stencilZFail;
            this.currentStencilZPass = stencilZPass;

         }

      }

      public setLocked(lock) {

         this.locked = lock;

      }

      setClear(stencil) {

         if (this.currentStencilClear !== stencil) {

            this.gl.clearStencil(stencil);
            this.currentStencilClear = stencil;

         }

      }

      public reset() {

         this.locked;

         this.currentStencilMask;
         this.currentStencilFunc;
         this.currentStencilRef;
         this.currentStencilFuncMask;
         this.currentStencilFail;
         this.currentStencilZFail;
         this.currentStencilZPass;
         this.currentStencilClear;

      }
   }

   export class WebGLState {
      public gl;
      public extensions;
      public utils;
      public colorBuffer;
      public depthBuffer;
      public stencilBuffer;

      public capabilities
      public compressedTextureFormats
      public currentProgram
      public currentBlending
      public currentBlendEquation;
      public currentBlendSrc;
      public currentBlendDst;
      public currentBlendEquationAlpha;
      public currentBlendSrcAlpha;
      public currentBlendDstAlpha;
      public currentPremultipledAlpha;
      public currentFlipSided;
      public currentCullFace;
      public currentLineWidth;
      public currentPolygonOffsetFactor;
      public currentPolygonOffsetUnits;
      public maxTextures;
      public lineWidthAvailable;
      public version = 0;
      public glVersion;
      public currentTextureSlot;
      public currentBoundTextures;
      public currentScissor;
      public currentViewport;
      public emptyTextures;
      public maxVertexAttributes;
      public newAttributes;
      public enabledAttributes;
      public attributeDivisors;


      constructor(gl, extensions, utils) {
         this.gl = gl;
         this.extensions = extensions;
         this.utils = utils;

         var colorBuffer = new ColorBuffer(gl);
         var depthBuffer = new DepthBuffer(gl);
         var stencilBuffer = new StencilBuffer(gl);

         this.maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
         this.newAttributes = new Uint8Array(this.maxVertexAttributes);
         this.enabledAttributes = new Uint8Array(this.maxVertexAttributes);
         this.attributeDivisors = new Uint8Array(this.maxVertexAttributes);
         this.capabilities = {};
         this.compressedTextureFormats;
         this.currentProgram;
         this.currentBlending;
         this.currentBlendEquation;
         this.currentBlendSrc;
         this.currentBlendDst;
         this.currentBlendEquationAlpha;
         this.currentBlendSrcAlpha;
         this.currentBlendDstAlpha;
         this.currentPremultipledAlpha;
         this.currentFlipSided;
         this.currentCullFace;
         this.currentLineWidth;
         this.currentPolygonOffsetFactor;
         this.currentPolygonOffsetUnits;
         this.maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
         this.lineWidthAvailable;
         this.version = 0;
         this.glVersion = gl.getParameter(gl.VERSION);
         this.currentTextureSlot;
         this.currentBoundTextures = {};
         this.currentScissor = new Vector4();
         this.currentViewport = new Vector4();
         this.emptyTextures = {};

         this.emptyTextures[gl.TEXTURE_2D] = this.createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
         this.emptyTextures[gl.TEXTURE_CUBE_MAP] = this.createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);

         if (this.glVersion.indexOf('WebGL') !== - 1) {

            this.version = parseFloat(/^WebGL\ ([0-9])/.exec(this.glVersion)[1]);
            this.lineWidthAvailable = (this.version >= 1.0);

         } else if (this.glVersion.indexOf('OpenGL ES') !== - 1) {

            this.version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(this.glVersion)[1]);
            this.lineWidthAvailable = (this.version >= 2.0);

         }

         colorBuffer.setClear(0, 0, 0, 1);
         depthBuffer.setClear(1);
         stencilBuffer.setClear(0);

         gl.enable(gl.DEPTH_TEST);
         depthBuffer.setFunc(LessEqualDepth);

         this.setFlipSided(false);
         this.setCullFace(CullFaceBack);
         gl.enable(gl.CULL_FACE);

         gl.enable(gl.BLEND);
         this.setBlending(NormalBlending, null, null, null, null, null, null, null, );

      }

      public createTexture(type, target, count) {
         var gl = this.gl;
         var data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
         var texture = gl.createTexture();

         gl.bindTexture(type, texture);
         gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
         gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

         for (var i = 0; i < count; i++) {

            gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);

         }

         return texture;

      }

      public get buffers() {
         return {
            color: this.colorBuffer,
            depth: this.depthBuffer,
            stencil: this.stencilBuffer
         }

      }

      public initAttributes() {

         for (var i = 0, l = this.newAttributes.length; i < l; i++) {

            this.newAttributes[i] = 0;

         }

      }

      public enableAttribute(attribute) {

         this.enableAttributeAndDivisor(attribute, 0);

      }

      public enableAttributeAndDivisor(attribute, meshPerAttribute) {

         this.newAttributes[attribute] = 1;

         if (this.enabledAttributes[attribute] === 0) {

            this.gl.enableVertexAttribArray(attribute);
            this.enabledAttributes[attribute] = 1;

         }

         if (this.attributeDivisors[attribute] !== meshPerAttribute) {

            var extension = this.extensions.get('ANGLE_instanced_arrays');

            extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
            this.attributeDivisors[attribute] = meshPerAttribute;

         }

      }

      public disableUnusedAttributes() {

         for (var i = 0, l = this.enabledAttributes.length; i !== l; ++i) {

            if (this.enabledAttributes[i] !== this.newAttributes[i]) {

               this.gl.disableVertexAttribArray(i);
               this.enabledAttributes[i] = 0;

            }

         }

      }

      public enable(id) {

         if (this.capabilities[id] !== true) {

            this.gl.enable(id);
            this.capabilities[id] = true;

         }

      }

      public disable(id) {

         if (this.capabilities[id] !== false) {

            this.gl.disable(id);
            this.capabilities[id];

         }

      }

      public getCompressedTextureFormats() {

         if (this.compressedTextureFormats === null) {

            this.compressedTextureFormats = [];

            if (this.extensions.get('WEBGL_compressed_texture_pvrtc') ||
               this.extensions.get('WEBGL_compressed_texture_s3tc') ||
               this.extensions.get('WEBGL_compressed_texture_etc1') ||
               this.extensions.get('WEBGL_compressed_texture_astc')) {

               var formats = this.gl.getParameter(this.gl.COMPRESSED_TEXTURE_FORMATS);

               for (var i = 0; i < formats.length; i++) {

                  this.compressedTextureFormats.push(formats[i]);

               }

            }

         }

         return this.compressedTextureFormats;

      }

      public useProgram(program) {

         if (this.currentProgram !== program) {

            this.gl.useProgram(program);

            this.currentProgram = program;

            return true;

         }

         return false;

      }


      public setBlending(blending, blendEquation?, blendSrc?, blendDst?, blendEquationAlpha?, blendSrcAlpha?, blendDstAlpha?, premultipliedAlpha?) {
         var gl = this.gl;
         if (blending !== NoBlending) {

            this.enable(gl.BLEND);

         } else {

            this.disable(gl.BLEND);

         }

         if (blending !== CustomBlending) {

            if (blending !== this.currentBlending || premultipliedAlpha !== this.currentPremultipledAlpha) {

               switch (blending) {

                  case AdditiveBlending:

                     if (premultipliedAlpha) {

                        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                        gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);

                     } else {

                        gl.blendEquation(gl.FUNC_ADD);
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

                     }
                     break;

                  case SubtractiveBlending:

                     if (premultipliedAlpha) {

                        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                        gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);

                     } else {

                        gl.blendEquation(gl.FUNC_ADD);
                        gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);

                     }
                     break;

                  case MultiplyBlending:

                     if (premultipliedAlpha) {

                        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                        gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);

                     } else {

                        gl.blendEquation(gl.FUNC_ADD);
                        gl.blendFunc(gl.ZERO, gl.SRC_COLOR);

                     }
                     break;

                  default:

                     if (premultipliedAlpha) {

                        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                        gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                     } else {

                        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                     }

               }

            }

            // currentBlendEquation;
            // currentBlendSrc;
            // currentBlendDst;
            // currentBlendEquationAlpha;
            // currentBlendSrcAlpha;
            // currentBlendDstAlpha;

         } else {

            blendEquationAlpha = blendEquationAlpha || blendEquation;
            blendSrcAlpha = blendSrcAlpha || blendSrc;
            blendDstAlpha = blendDstAlpha || blendDst;

            if (blendEquation !== this.currentBlendEquation || blendEquationAlpha !== this.currentBlendEquationAlpha) {

               gl.blendEquationSeparate(this.utils.convert(blendEquation), this.utils.convert(blendEquationAlpha));

               this.currentBlendEquation = blendEquation;
               this.currentBlendEquationAlpha = blendEquationAlpha;

            }

            if (blendSrc !== this.currentBlendSrc || blendDst !== this.currentBlendDst || blendSrcAlpha !== this.currentBlendSrcAlpha || blendDstAlpha !== this.currentBlendDstAlpha) {

               gl.blendFuncSeparate(this.utils.convert(blendSrc), this.utils.convert(blendDst), this.utils.convert(blendSrcAlpha), this.utils.convert(blendDstAlpha));

               this.currentBlendSrc = blendSrc;
               this.currentBlendDst = blendDst;
               this.currentBlendSrcAlpha = blendSrcAlpha;
               this.currentBlendDstAlpha = blendDstAlpha;

            }

         }

         this.currentBlending = blending;
         this.currentPremultipledAlpha = premultipliedAlpha;

      }

      public setMaterial(material, frontFaceCW) {

         material.side === DoubleSide
            ? this.disable(this.gl.CULL_FACE)
            : this.enable(this.gl.CULL_FACE);

         var flipSided = (material.side === BackSide);
         if (frontFaceCW) flipSided = !flipSided;

         this.setFlipSided(flipSided);

         material.transparent === true
            ? this.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha)
            : this.setBlending(NoBlending);

         this.depthBuffer.setFunc(material.depthFunc);
         this.depthBuffer.setTest(material.depthTest);
         this.depthBuffer.setMask(material.depthWrite);
         this.colorBuffer.setMask(material.colorWrite);

         this.setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);

      }

      //

      public setFlipSided(flipSided) {

         if (this.currentFlipSided !== flipSided) {

            if (flipSided) {

               this.gl.frontFace(this.gl.CW);

            } else {

               this.gl.frontFace(this.gl.CCW);

            }

            this.currentFlipSided = flipSided;

         }

      }
      public setCullFace(cullFace) {
         var gl = this.gl;

         if (cullFace !== CullFaceNone) {

            this.enable(gl.CULL_FACE);

            if (cullFace !== this.currentCullFace) {

               if (cullFace === CullFaceBack) {

                  gl.cullFace(gl.BACK);

               } else if (cullFace === CullFaceFront) {

                  gl.cullFace(gl.FRONT);

               } else {

                  gl.cullFace(gl.FRONT_AND_BACK);

               }

            }

         } else {

            this.disable(gl.CULL_FACE);

         }

         this.currentCullFace = cullFace;

      }

      public setLineWidth(width) {

         if (width !== this.currentLineWidth) {

            if (this.lineWidthAvailable) this.gl.lineWidth(width);

            this.currentLineWidth = width;

         }

      }

      public setPolygonOffset(polygonOffset, factor, units) {

         if (polygonOffset) {

            this.enable(this.gl.POLYGON_OFFSET_FILL);

            if (this.currentPolygonOffsetFactor !== factor || this.currentPolygonOffsetUnits !== units) {

               this.gl.polygonOffset(factor, units);

               this.currentPolygonOffsetFactor = factor;
               this.currentPolygonOffsetUnits = units;

            }

         } else {

            this.disable(this.gl.POLYGON_OFFSET_FILL);

         }

      }

      public setScissorTest(scissorTest) {

         if (scissorTest) {

            this.enable(this.gl.SCISSOR_TEST);

         } else {

            this.disable(this.gl.SCISSOR_TEST);

         }

      }

      // texture

      public activeTexture(webglSlot) {

         if (webglSlot === undefined) webglSlot = this.gl.TEXTURE0 + this.maxTextures - 1;

         if (this.currentTextureSlot !== webglSlot) {

            this.gl.activeTexture(webglSlot);
            this.currentTextureSlot = webglSlot;

         }

      }
      public bindTexture(webglType, webglTexture) {

         if (this.currentTextureSlot === null) {

            this.activeTexture(null);

         }

         var boundTexture = this.currentBoundTextures[this.currentTextureSlot];

         if (boundTexture === undefined) {

            boundTexture = { type: undefined, texture: undefined };
            this.currentBoundTextures[this.currentTextureSlot] = boundTexture;

         }

         if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {

            this.gl.bindTexture(webglType, webglTexture || this.emptyTextures[webglType]);

            boundTexture.type = webglType;
            boundTexture.texture = webglTexture;

         }

      }

      public compressedTexImage2D() {

         try {

            this.gl.compressedTexImage2D.apply(this.gl, arguments);

         } catch (error) {

            console.error('THREE.WebGLState:', error);

         }

      }
      public texImage2D() {

         try {

            this.gl.texImage2D.apply(this.gl, arguments);

         } catch (error) {

            console.error('THREE.WebGLState:', error);

         }

      }

      //
      public scissor(scissor) {

         if (this.currentScissor.equals(scissor) === false) {

            this.gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
            this.currentScissor.copy(scissor);

         }

      }

      public viewport(viewport) {

         if (this.currentViewport.equals(viewport) === false) {

            this.gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
            this.currentViewport.copy(viewport);

         }

      }

      //

      public reset() {

         for (var i = 0; i < this.enabledAttributes.length; i++) {

            if (this.enabledAttributes[i] === 1) {

               this.gl.disableVertexAttribArray(i);
               this.enabledAttributes[i] = 0;

            }

         }

         this.capabilities = {};

         this.compressedTextureFormats;

         this.currentTextureSlot;
         this.currentBoundTextures = {};

         this.currentProgram;

         this.currentBlending;

         this.currentFlipSided;
         this.currentCullFace;

         this.colorBuffer.reset();
         this.depthBuffer.reset();
         this.stencilBuffer.reset();

      }
   }
}

