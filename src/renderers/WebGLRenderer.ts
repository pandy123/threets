module THREE {
      export class WebGLRenderer {
            private parameters: any;
            private _canvas: any;
            private _context
            private _alpha
            private _depth
            private _stencil
            private _antialias
            private _premultipliedAlpha
            private _preserveDrawingBuffer
            private _powerPreference
            public domElement: any;
            public context: any;
            // clearing
            public autoClear: boolean;
            public autoClearColor: boolean;
            public autoClearDepth: boolean;
            public autoClearStencil: boolean;
            // scene graph
            public sortObjects: boolean;
            // user-defined clipping
            public clippingPlanes: Array<any>;
            public localClippingEnabled: boolean;
            // physically based shading
            public gammaFactor: number;	// for backwards compatibility
            public gammaInput: boolean;
            public gammaOutput: boolean;
            // physical lights
            public physicallyCorrectLights: boolean;
            // tone mapping
            public toneMapping = LinearToneMapping;
            public toneMappingExposure: number;
            public toneMappingWhitePoint: number;
            // morphs
            public maxMorphTargets: number;
            public maxMorphNormals: number;
            // internal properties
            public _this: any;
            private _isContextLost: boolean;
            private // internal state cache
            private _currentRenderTarget: any;
            private _currentFramebuffer: any;
            private _currentMaterialId: number;
            private _currentGeometryProgram: string;
            private _currentCamera: any;
            private _currentArrayCamera: any;
            private _currentViewport: Vector4;
            private _currentScissor: Vector4;
            private _currentScissorTest: any;
            //
            private _usedTextureUnits: number;
            //
            private _width: number;
            private _height: number;
            private _pixelRatio: number;
            private _viewport: Vector4;
            private _scissor: Vector4;
            private _scissorTest: boolean;
            // frustum
            private _frustum: Frustum;
            // clipping

            private _clippingEnabled: boolean;
            private _localClippingEnabled: boolean;
            // camera matrices cache
            private _projScreenMatrix: Matrix4;
            private _vector3: Vector3;
            private _gl: WebGLContext;

            public contextAttributes: any;
            public extensions: any;
            public capabilities: any;
            public state: any;
            public info: any;
            public textures: any;
            public background: any;
            public morphtargets: any;
            public bufferRenderer: WebGLBufferRendererNode;
            public indexedBufferRenderer: any;
            public spriteRenderer: any;
            public utils: any;
            public vr: any;
            public isAnimating = false;
            public onAnimationFrame = null;

            // Animation Loop
            private currentRenderList: WebGLRenderListNode;
            private currentRenderState: WebGLRenderStateNode;
            private _clipping: WebGLClippingNode;
            public shadowMap: WebGLShadowMapNode;
            public programCache: WebGLProgramsNode;
            public properties: WebGLPropertiesNode;
            public attributes: WebGLAttributesNode;
            public geometries: WebGLGeometriesNode;
            public objects: WebGLObjectsNode;
            public renderLists: WebGLRenderListsNode;
            public renderStates: WebGLRenderStates;

            constructor(parameters?) {
                  console.log('THREE.WebGLRenderer', REVISION);

                  this.parameters = parameters || {};
                  parameters = this.parameters;
                  this._canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
                  this._context = parameters.context !== undefined ? parameters.context : null;
                  this._alpha = parameters.alpha !== undefined ? parameters.alpha : false;
                  this._depth = parameters.depth !== undefined ? parameters.depth : true;
                  this._stencil = parameters.stencil !== undefined ? parameters.stencil : true;
                  this._antialias = parameters.antialias !== undefined ? parameters.antialias : false;
                  this._premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true;
                  this._preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false;
                  this._powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';
                  this.currentRenderList = null;
                  this.currentRenderState = null;
                  // public properties
                  this.domElement = this._canvas;
                  this.context = null;
                  // clearing
                  this.autoClear = true;
                  this.autoClearColor = true;
                  this.autoClearDepth = true;
                  this.autoClearStencil = true;
                  // scene graph
                  this.sortObjects = true;
                  // user-defined clipping
                  this.clippingPlanes = [];
                  this.localClippingEnabled = false;
                  // physically based shading
                  this.gammaFactor = 2.0;	// for backwards compatibility
                  this.gammaInput = false;
                  this.gammaOutput = false;
                  // physical lights
                  this.physicallyCorrectLights = false;
                  // tone mapping
                  this.toneMapping = LinearToneMapping;
                  this.toneMappingExposure = 1.0;
                  this.toneMappingWhitePoint = 1.0;
                  // morphs
                  this.maxMorphTargets = 8;
                  this.maxMorphNormals = 4;
                  // internal properties
                  this._this = this;
                  this._isContextLost = false;
                  // internal state cache
                  this._currentRenderTarget = null;
                  this._currentFramebuffer = null;
                  this._currentMaterialId = - 1;
                  this._currentGeometryProgram = '';
                  this._currentCamera = null;
                  this._currentArrayCamera = null;
                  this._currentViewport = new Vector4();
                  this._currentScissor = new Vector4();
                  this._currentScissorTest = null;
                  //
                  this._usedTextureUnits = 0;
                  //
                  this._width = this._canvas.width;
                  this._height = this._canvas.height;
                  this._pixelRatio = 1;
                  this._viewport = new Vector4(0, 0, this._width, this._height);
                  this._scissor = new Vector4(0, 0, this._width, this._height);
                  this._scissorTest = false;
                  // frustum
                  this._frustum = new Frustum();
                  // clipping
                  this._clipping = new WebGLClippingNode();
                  this._clippingEnabled = false;
                  this._localClippingEnabled = false;
                  // camera matrices cache
                  this._projScreenMatrix = new Matrix4();
                  this._vector3 = new Vector3();

                  try {
                        this.contextAttributes = {
                              alpha: this._alpha,
                              depth: this._depth,
                              stencil: this._stencil,
                              antialias: this._antialias,
                              premultipliedAlpha: this._premultipliedAlpha,
                              preserveDrawingBuffer: this._preserveDrawingBuffer,
                              powerPreference: this._powerPreference
                        };
                        // event listeners must be registered before WebGL context is created, see #12753
                        this._canvas.addEventListener('webglcontextlost', this.onContextLost, false);
                        this._canvas.addEventListener('webglcontextrestored', this.onContextRestore, false);
                        this._gl = this._context || new WebGLContext(this._canvas, this.contextAttributes);
                        if (this._gl === null) {
                              if (this._canvas.getContext('webgl') !== null) {
                                    throw new Error('Error creating WebGL context with your selected attributes.');
                              } else {
                                    throw new Error('Error creating WebGL context.');
                              }
                        }
                        // Some experimental-webgl implementations do not have getShaderPrecisionFormat
                        if (this._gl.getShaderPrecisionFormat === undefined) {
                              this._gl.getShaderPrecisionFormat = function () {
                                    return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };
                              };
                        }
                  } catch (error) {
                        console.error('THREE.WebGLRenderer: ' + error.message);
                  }
                  // initialize
                  this.initGLContext();
                  // vr
                  this.vr = ('xr' in navigator) ? new WebXRManager(this._gl) : new WebVRManager(this);
                  // shadow map
                  this.shadowMap = new WebGLShadowMapNode(this, this.objects, this.capabilities.maxTextureSize);
                  // Animation Loop
                  this.isAnimating = false;
                  this.onAnimationFrame = null;

            }

            private getTargetPixelRatio() {
                  return this._currentRenderTarget === null ? this._pixelRatio : 1;
            }


            public initGLContext() {
                  this.extensions = new WebGLExtensionsNode(this._gl);
                  this.extensions.get('WEBGL_depth_texture');
                  this.extensions.get('OES_texture_float');
                  this.extensions.get('OES_texture_float_linear');
                  this.extensions.get('OES_texture_half_float');
                  this.extensions.get('OES_texture_half_float_linear');
                  this.extensions.get('OES_standard_derivatives');
                  this.extensions.get('OES_element_index_uint');
                  this.extensions.get('ANGLE_instanced_arrays');
                  this.utils = new WebGLUtils(this._gl, this.extensions);
                  this.capabilities = new WebGLCapabilitiesNode(this._gl, this.extensions, this.parameters);
                  this.state = new WebGLStateNode(this._gl, this.extensions, this.utils);
                  this.state.scissor(this._currentScissor.copy(this._scissor).multiplyScalar(this._pixelRatio));
                  this.state.viewport(this._currentViewport.copy(this._viewport).multiplyScalar(this._pixelRatio));
                  this.info = new WebGLInfoNode(this._gl);
                  this.properties = new WebGLPropertiesNode();
                  this.textures = new WebGLTexturesNode(this._gl, this.extensions, this.state, this.properties, this.capabilities, this.utils, this.info);
                  this.attributes = new WebGLAttributesNode(this._gl);
                  this.geometries = new WebGLGeometriesNode(this._gl, this.attributes, this.info);
                  this.objects = new WebGLObjectsNode(this.geometries, this.info);
                  this.morphtargets = new WebGLMorphtargetsNode(this._gl);
                  this.programCache = new WebGLProgramsNode(this, this.extensions, this.capabilities);
                  this.renderLists = new WebGLRenderListsNode();
                  this.renderStates = new WebGLRenderStates();
                  this.background = new WebGLBackgroundNode(this, this.state, this.objects, this._premultipliedAlpha);
                  this.bufferRenderer = new WebGLBufferRendererNode(this._gl, this.extensions, this.info);
                  this.indexedBufferRenderer = new WebGLIndexedBufferRendererNode(this._gl, this.extensions, this.info);
                  this.spriteRenderer = new WebGLSpriteRendererNode(this, this._gl, this.state, this.textures, this.capabilities);
                  this.info.programs = this.programCache.programs;
                  this.context = this._gl;
                  // _this.capabilities = capabilities;
                  // _this.extensions = this.extensions;
                  // _this.properties = properties;
                  // _this.renderLists = renderLists;
                  // _this.state = state;
                  // _this.info = info;
            }


            // API
            public getContext() {
                  return this._gl;
            }
            public getContextAttributes() {
                  return this._gl.getContextAttributes();
            }
            public forceContextLoss() {
                  var extension = this.extensions.get('WEBGL_lose_context');
                  if (extension) extension.loseContext();
            }
            public forceContextRestore() {
                  var extension = this.extensions.get('WEBGL_lose_context');
                  if (extension) extension.restoreContext();
            }
            public getPixelRatio() {
                  return this._pixelRatio;
            }
            public setPixelRatio(value) {
                  if (value === undefined) return;
                  this._pixelRatio = value;
                  this.setSize(this._width, this._height, false);
            }
            public getSize() {
                  return {
                        width: this._width,
                        height: this._height
                  }
            }

            public setSize(width, height, updateStyle) {
                  if (this.vr.isPresenting()) {
                        console.warn('THREE.WebGLRenderer: Can\'t change size while VR device is presenting.');
                        return;
                  }
                  this._width = width;
                  this._height = height;
                  this._canvas.width = width * this._pixelRatio;
                  this._canvas.height = height * this._pixelRatio;
                  if (updateStyle !== false) {
                        this._canvas.style.width = width + 'px';
                        this._canvas.style.height = height + 'px';
                  }
                  this.setViewport(0, 0, width, height);
            }

            public getDrawingBufferSize() {
                  return {
                        width: this._width * this._pixelRatio,
                        height: this._height * this._pixelRatio
                  }
            }

            public setDrawingBufferSize(width, height, pixelRatio) {
                  this._width = width;
                  this._height = height;
                  this._pixelRatio = pixelRatio;
                  this._canvas.width = width * pixelRatio;
                  this._canvas.height = height * pixelRatio;
                  this.setViewport(0, 0, width, height);
            }

            public getCurrentViewport() {
                  return this._currentViewport;
            }

            public setViewport(x, y, width, height) {
                  this._viewport.set(x, this._height - y - height, width, height);
                  this.state.viewport(this._currentViewport.copy(this._viewport).multiplyScalar(this._pixelRatio));
            }

            public setScissor(x, y, width, height) {
                  this._scissor.set(x, this._height - y - height, width, height);
                  this.state.scissor(this._currentScissor.copy(this._scissor).multiplyScalar(this._pixelRatio));
            }

            public setScissorTest(boolean) {
                  this.state.setScissorTest(this._scissorTest = boolean);
            }

            // Clearing
            public getClearColor() {
                  return this.background.getClearColor();
            }

            public setClearColor(color, alpha) {
                  // this.background.setClearColor.apply(this.background, arguments);
                  this.background.setClearColor(color, alpha);
            }

            public getClearAlpha() {
                  return this.background.getClearAlpha();
            }

            public setClearAlpha() {
                  this.background.setClearAlpha(arguments);
            }

            public clear(color?, depth?, stencil?) {
                  var bits = 0;
                  if (color === undefined || color) bits |= this._gl.COLOR_BUFFER_BIT;
                  if (depth === undefined || depth) bits |= this._gl.DEPTH_BUFFER_BIT;
                  if (stencil === undefined || stencil) bits |= this._gl.STENCIL_BUFFER_BIT;
                  this._gl.clear(bits);
            }

            public clearColor() {
                  this.clear(true, false, false);
            }

            public clearDepth() {
                  this.clear(false, true, false);
            }

            public clearStencil() {
                  this.clear(false, false, true);
            }

            public clearTarget(renderTarget, color, depth, stencil) {
                  this.setRenderTarget(renderTarget);
                  this.clear(color, depth, stencil);
            }

            //
            public dispose() {
                  this._canvas.removeEventListener('webglcontextlost', this.onContextLost, false);
                  this._canvas.removeEventListener('webglcontextrestored', this.onContextRestore, false);
                  this.renderLists.dispose();
                  this.renderStates.dispose();
                  this.properties.dispose();
                  this.objects.dispose();
                  this.vr.dispose();
                  this.stopAnimation();
            };

            // Events
            private onContextLost(event) {
                  event.preventDefault();
                  console.log('THREE.WebGLRenderer: Context Lost.');
                  this._isContextLost = true;
            }

            private onContextRestore( /* event */) {
                  console.log('THREE.WebGLRenderer: Context Restored.');
                  this._isContextLost = false;
                  this.initGLContext();
            }

            private onMaterialDispose(event) {
                  var material = event.target;
                  material.removeEventListener('dispose', this.onMaterialDispose);
                  this.deallocateMaterial(material);
            }

            // Buffer deallocation
            private deallocateMaterial(material) {
                  this.releaseMaterialProgramReference(material);
                  this.properties.remove(material);
            }

            private releaseMaterialProgramReference(material) {
                  var programInfo = this.properties.get(material).program;
                  material.program = undefined;
                  if (programInfo !== undefined) {
                        this.programCache.releaseProgram(programInfo);
                  }
            }


            // Buffer rendering
            private renderObjectImmediate(object, program, material) {
                  object.render(function (object) {
                        this.renderBufferImmediate(object, program, material);
                  });
            }

            /**
             * 立即渲染buffer
             */
            public renderBufferImmediate = function (object, program, material) {
                  this.state.initAttributes();
                  var buffers = this.properties.get(object);
                  if (object.hasPositions && !buffers.position) buffers.position = this._gl.createBuffer();
                  if (object.hasNormals && !buffers.normal) buffers.normal = this._gl.createBuffer();
                  if (object.hasUvs && !buffers.uv) buffers.uv = this._gl.createBuffer();
                  if (object.hasColors && !buffers.color) buffers.color = this._gl.createBuffer();
                  var programAttributes = program.getAttributes();
                  if (object.hasPositions) {
                        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.position);
                        this._gl.bufferData(this._gl.ARRAY_BUFFER, object.positionArray, this._gl.DYNAMIC_DRAW);
                        this.state.enableAttribute(programAttributes.position);
                        this._gl.vertexAttribPointer(programAttributes.position, 3, this._gl.FLOAT, false, 0, 0);
                  }
                  if (object.hasNormals) {
                        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.normal);
                        if (!material.isMeshPhongMaterial &&
                              !material.isMeshStandardMaterial &&
                              !material.isMeshNormalMaterial &&
                              material.flatShading === true) {
                              for (var i = 0, l = object.count * 3; i < l; i += 9) {
                                    var array = object.normalArray;
                                    var nx = (array[i + 0] + array[i + 3] + array[i + 6]) / 3;
                                    var ny = (array[i + 1] + array[i + 4] + array[i + 7]) / 3;
                                    var nz = (array[i + 2] + array[i + 5] + array[i + 8]) / 3;
                                    array[i + 0] = nx;
                                    array[i + 1] = ny;
                                    array[i + 2] = nz;
                                    array[i + 3] = nx;
                                    array[i + 4] = ny;
                                    array[i + 5] = nz;
                                    array[i + 6] = nx;
                                    array[i + 7] = ny;
                                    array[i + 8] = nz;
                              }
                        }
                        this._gl.bufferData(this._gl.ARRAY_BUFFER, object.normalArray, this._gl.DYNAMIC_DRAW);
                        this.state.enableAttribute(programAttributes.normal);
                        this._gl.vertexAttribPointer(programAttributes.normal, 3, this._gl.FLOAT, false, 0, 0);
                  }
                  if (object.hasUvs && material.map) {
                        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.uv);
                        this._gl.bufferData(this._gl.ARRAY_BUFFER, object.uvArray, this._gl.DYNAMIC_DRAW);
                        this.state.enableAttribute(programAttributes.uv);
                        this._gl.vertexAttribPointer(programAttributes.uv, 2, this._gl.FLOAT, false, 0, 0);
                  }
                  if (object.hasColors && material.vertexColors !== NoColors) {
                        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffers.color);
                        this._gl.bufferData(this._gl.ARRAY_BUFFER, object.colorArray, this._gl.DYNAMIC_DRAW);
                        this.state.enableAttribute(programAttributes.color);
                        this._gl.vertexAttribPointer(programAttributes.color, 3, this._gl.FLOAT, false, 0, 0);
                  }
                  this.state.disableUnusedAttributes();
                  this._gl.drawArrays(this._gl.TRIANGLES, 0, object.count);
                  object.count = 0;
            }

            /**
             * 直接渲染buffer
            */
            public renderBufferDirect = function (camera, fog, geometry, material, object, group) {
                  var frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);
                  this.state.setMaterial(material, frontFaceCW);
                  // 创建program，初始化uniform的值
                  var program = this.setProgram(camera, fog, material, object);
                  var geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);
                  var updateBuffers = false;
                  if (geometryProgram !== this._currentGeometryProgram) {
                        this._currentGeometryProgram = geometryProgram;
                        updateBuffers = true;
                  }
                  if (object.morphTargetInfluences) {
                        this.morphtargets.update(object, geometry, material, program);
                        updateBuffers = true;
                  }
                  //
                  var index = geometry.index;
                  var position = geometry.attributes.position;
                  var rangeFactor = 1;
                  if (material.wireframe === true) {
                        index = this.geometries.getWireframeAttribute(geometry);
                        rangeFactor = 2;
                  }
                  var attribute;
                  var renderer = this.bufferRenderer;
                  if (index !== null) {
                        attribute = this.attributes.get(index);
                        renderer = this.indexedBufferRenderer;
                        renderer.setIndex(attribute);
                  }
                  if (updateBuffers) {
                        // 更新顶点属性值
                        this.setupVertexAttributes(material, program, geometry);
                        if (index !== null) {
                              this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);
                        }
                  }
                  //
                  var dataCount = Infinity;
                  if (index !== null) {
                        dataCount = index.count;
                  } else if (position !== undefined) {
                        dataCount = position.count;
                  }
                  // 计算顶点个数
                  var rangeStart = geometry.drawRange.start * rangeFactor;
                  var rangeCount = geometry.drawRange.count * rangeFactor;
                  var groupStart = group !== null ? group.start * rangeFactor : 0;
                  var groupCount = group !== null ? group.count * rangeFactor : Infinity;
                  var drawStart = Math.max(rangeStart, groupStart);
                  var drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
                  var drawCount = Math.max(0, drawEnd - drawStart + 1);
                  if (drawCount === 0) return;
                  // 设置绘制模式
                  if (object.isMesh) {
                        if (material.wireframe === true) {
                              this.state.setLineWidth(material.wireframeLinewidth * this.getTargetPixelRatio());
                              renderer.setMode(this._gl.LINES);
                        } else {
                              switch (object.drawMode) {
                                    case TrianglesDrawMode:
                                          renderer.setMode(this._gl.TRIANGLES);
                                          break;
                                    case TriangleStripDrawMode:
                                          renderer.setMode(this._gl.TRIANGLE_STRIP);
                                          break;
                                    case TriangleFanDrawMode:
                                          renderer.setMode(this._gl.TRIANGLE_FAN);
                                          break;
                              }
                        }

                  } else if (object.isLine) {
                        var lineWidth = material.linewidth;
                        if (lineWidth === undefined) lineWidth = 1; // Not using Line*Material
                        this.state.setLineWidth(lineWidth * this.getTargetPixelRatio());
                        if (object.isLineSegments) {
                              renderer.setMode(this._gl.LINES);
                        } else if (object.isLineLoop) {
                              renderer.setMode(this._gl.LINE_LOOP);
                        } else {
                              renderer.setMode(this._gl.LINE_STRIP);
                        }
                  } else if (object.isPoints) {
                        renderer.setMode(this._gl.POINTS);
                  }
                  if (geometry && geometry.isInstancedBufferGeometry) {
                        if (geometry.maxInstancedCount > 0) {
                              renderer.renderInstances(geometry, drawStart, drawCount);
                        }
                  } else {
                        // 渲染
                        renderer.render(drawStart, drawCount);
                  }
            }

            /**
             * 设置顶点属性值
             * @param material 
             * @param program 
             * @param geometry 
             */
            public setupVertexAttributes(material: Material | any, program: WebGLProgramNode, geometry: BufferGeometry | any) {
                  if (geometry && geometry.isInstancedBufferGeometry) {
                        if (this.extensions.get('ANGLE_instanced_arrays') === null) {
                              console.error('THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                              return;
                        }
                  }
                  this.state.initAttributes();
                  var geometryAttributes = geometry.attributes;
                  var programAttributes = program.getAttributes();
                  var materialDefaultAttributeValues = material.defaultAttributeValues;
                  for (var name in programAttributes) {
                        // program 根据名字得到 attribute 的地址
                        var programAttribute = programAttributes[name];
                        if (programAttribute >= 0) {
                              // buffergeometry的attributes 根据名字得到 geometryAttributes，几何数据信息
                              var geometryAttribute = geometryAttributes[name];

                              if (geometryAttribute !== undefined) {
                                    var normalized = geometryAttribute.normalized;
                                    var size = geometryAttribute.itemSize;

                                    //attribute 存放geometryattribute的 gl buffer信息
                                    var attribute = this.attributes.get(geometryAttribute);

                                    // TODO Attribute may not be available on context restore
                                    if (attribute === undefined) continue;
                                    var buffer = attribute.buffer;    // buffer 信息
                                    var type = attribute.type;        // buffer data 数据类型信息

                                    var bytesPerElement = attribute.bytesPerElement;
                                    if (geometryAttribute.isInterleavedBufferAttribute) {
                                          var data = geometryAttribute.data;
                                          var stride = data.stride;
                                          var offset = geometryAttribute.offset;
                                          if (data && data.isInstancedInterleavedBuffer) {
                                                this.state.enableAttributeAndDivisor(programAttribute, data.meshPerAttribute);
                                                if (geometry.maxInstancedCount === undefined) {
                                                      geometry.maxInstancedCount = data.meshPerAttribute * data.count;
                                                }
                                          } else {
                                                this.state.enableAttribute(programAttribute);
                                          }
                                          this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
                                          this._gl.vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement);
                                    } else {
                                          if (geometryAttribute.isInstancedBufferAttribute) {
                                                this.state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
                                                if (geometry.maxInstancedCount === undefined) {
                                                      geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                                                }
                                          } else {
                                                this.state.enableAttribute(programAttribute);
                                          }
                                          this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
                                          this._gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, 0);
                                    }
                              } else if (materialDefaultAttributeValues !== undefined) {
                                    var value = materialDefaultAttributeValues[name];
                                    if (value !== undefined) {
                                          switch (value.length) {
                                                case 2:
                                                      this._gl.vertexAttrib2fv(programAttribute, value);
                                                      break;
                                                case 3:
                                                      this._gl.vertexAttrib3fv(programAttribute, value);
                                                      break;
                                                case 4:
                                                      this._gl.vertexAttrib4fv(programAttribute, value);
                                                      break;
                                                default:
                                                      this._gl.vertexAttrib1fv(programAttribute, value);
                                          }
                                    }
                              }
                        }
                  }
                  this.state.disableUnusedAttributes();
            }

            // Compile
            /**
             * 编译
             */
            public compile = function (scene, camera) {
                  this.currentRenderState = this.renderStates.get(scene, camera);
                  this.currentRenderState.init();
                  scene.traverse(function (object) {
                        if (object.isLight) {
                              this.currentRenderState.pushLight(object);
                              if (object.castShadow) {
                                    this.currentRenderState.pushShadow(object);
                              }
                        }
                  });
                  this.currentRenderState.setupLights(camera);
                  scene.traverse(function (object) {
                        if (object.material) {
                              if (Array.isArray(object.material)) {
                                    for (var i = 0; i < object.material.length; i++) {
                                          this.initMaterial(object.material[i], scene.fog, object);
                                    }
                              } else {
                                    this.initMaterial(object.material, scene.fog, object);
                              }
                        }
                  });
            }

            /**
             * 开始动画
             */
            private startAnimation() {
                  if (this.isAnimating) return;
                  this.requestAnimationLoopFrame();
                  this.isAnimating = true;
            }

            /**
             * 结束动画
             */
            private stopAnimation() {
                  this.isAnimating = false;
            }

            /**
             * 针渲染
             */
            private requestAnimationLoopFrame() {
                  if (this.vr.isPresenting()) {
                        this.vr.requestAnimationFrame(this.animationLoop);
                  } else {
                        window.requestAnimationFrame(this.animationLoop);
                  }
            }

            /**
             * 动画循环
             * @param time 
             */
            private animationLoop(time) {
                  if (this.isAnimating === false) return;
                  this.onAnimationFrame(time);
                  this.requestAnimationLoopFrame();
            }

            /**
             * 动画
             * @param callback 
             */
            public animate(callback) {
                  this.onAnimationFrame = callback;
                  this.onAnimationFrame !== null ? this.startAnimation() : this.stopAnimation();
            }

            // Rendering
            public render(scene, camera, renderTarget, forceClear) {
                  if (!(camera && camera.isCamera)) {
                        console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');
                        return;
                  }
                  if (this._isContextLost) return;
                  // reset caching for this frame
                  this._currentGeometryProgram = '';
                  this._currentMaterialId = - 1;
                  this._currentCamera = null;
                  // update scene graph
                  if (scene.autoUpdate === true) scene.updateMatrixWorld();
                  // update camera matrices and frustum
                  if (camera.parent === null) camera.updateMatrixWorld();
                  if (this.vr.enabled) {
                        camera = this.vr.getCamera(camera);
                  }
                  //
                  this.currentRenderState = this.renderStates.get(scene, camera);
                  this.currentRenderState.init();
                  scene.onBeforeRender(this, scene, camera, renderTarget);
                  this._projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
                  this._frustum.setFromMatrix(this._projScreenMatrix);
                  this._localClippingEnabled = this.localClippingEnabled;
                  this._clippingEnabled = this._clipping.init(this.clippingPlanes, this._localClippingEnabled, camera);
                  this.currentRenderList = this.renderLists.get(scene, camera);
                  this.currentRenderList.init();
                  // 初始化场景
                  this.projectObject(scene, camera, this.sortObjects);

                  if (this.sortObjects === true) {
                        this.currentRenderList.sort();
                  }
                  //
                  if (this._clippingEnabled) this._clipping.beginShadows();
                  var shadowsArray = this.currentRenderState.state.shadowsArray;
                  this.shadowMap.render(shadowsArray, scene, camera);
                  this.currentRenderState.setupLights(camera);
                  if (this._clippingEnabled) this._clipping.endShadows();
                  //
                  if (this.info.autoReset) this.info.reset();
                  if (renderTarget === undefined) {
                        renderTarget = null;
                  }
                  this.setRenderTarget(renderTarget);
                  //
                  this.background.render(this.currentRenderList, scene, camera, forceClear);
                  // render scene
                  var opaqueObjects = this.currentRenderList.opaque;
                  var transparentObjects = this.currentRenderList.transparent;
                  if (scene.overrideMaterial) {
                        var overrideMaterial = scene.overrideMaterial;
                        // 渲染不透明物品
                        if (opaqueObjects.length) this.renderObjects(opaqueObjects, scene, camera, overrideMaterial);
                        // 渲染透明物品
                        if (transparentObjects.length) this.renderObjects(transparentObjects, scene, camera, overrideMaterial);
                  } else {
                        // opaque pass (front-to-back order)
                        if (opaqueObjects.length) this.renderObjects(opaqueObjects, scene, camera);
                        // transparent pass (back-to-front order)
                        if (transparentObjects.length) this.renderObjects(transparentObjects, scene, camera);
                  }
                  // custom renderers
                  var spritesArray = this.currentRenderState.state.spritesArray;
                  this.spriteRenderer.render(spritesArray, scene, camera);
                  // Generate mipmap if we're using any kind of mipmap filtering
                  if (renderTarget) {
                        this.textures.updateRenderTargetMipmap(renderTarget);
                  }
                  // Ensure depth buffer writing is enabled so it can be cleared on next render
                  this.state.buffers.depth.setTest(true);
                  this.state.buffers.depth.setMask(true);
                  this.state.buffers.color.setMask(true);
                  this.state.setPolygonOffset(false);
                  scene.onAfterRender(this, scene, camera);
                  if (this.vr.enabled) {
                        this.vr.submitFrame();
                  }
                  // _gl.finish();
                  this.currentRenderList = null;
                  this.currentRenderState = null;
            }
            /*
            // TODO Duplicated code (Frustum)
          
            var _sphere = new Sphere();
          
            function isObjectViewable( object ) {
          
               var geometry = object.geometry;
          
               if ( geometry.boundingSphere === null )
                  geometry.computeBoundingSphere();
          
               _sphere.copy( geometry.boundingSphere ).
               applyMatrix4( object.matrixWorld );
          
               return isSphereViewable( _sphere );
          
            }
          
            function isSpriteViewable( sprite ) {
          
               _sphere.center.set( 0, 0, 0 );
               _sphere.radius = 0.7071067811865476;
               _sphere.applyMatrix4( sprite.matrixWorld );
          
               return isSphereViewable( _sphere );
          
            }
          
            function isSphereViewable( sphere ) {
          
               if ( ! _frustum.intersectsSphere( sphere ) ) return false;
          
               var numPlanes = _clipping.numPlanes;
          
               if ( numPlanes === 0 ) return true;
          
               var planes = _this.clippingPlanes,
          
                  center = sphere.center,
                  negRad = - sphere.radius,
                  i = 0;
          
               do {
          
                  // out when deeper than radius in the negative halfspace
                  if ( planes[ i ].distanceToPoint( center ) < negRad ) return false;
          
               } while ( ++ i !== numPlanes );
          
               return true;
          
            }
            */

            /**
             * 向renderlist中存入设置好的program和buffergeometry信息。
             * @param object 
             * @param camera 
             * @param sortObjects 
             */
            private projectObject(object, camera, sortObjects) {
                  if (object.visible === false) return;
                  var visible = object.layers.test(camera.layers);
                  if (visible) {
                        if (object.isLight) {
                              this.currentRenderState.pushLight(object);
                              if (object.castShadow) {
                                    this.currentRenderState.pushShadow(object);
                              }
                        } else if (object.isSprite) {
                              if (!object.frustumCulled || this._frustum.intersectsSprite(object)) {
                                    this.currentRenderState.pushSprite(object);
                              }
                        } else if (object.isImmediateRenderObject) {
                              if (sortObjects) {
                                    this._vector3.setFromMatrixPosition(object.matrixWorld)
                                          .applyMatrix4(this._projScreenMatrix);
                              }
                              this.currentRenderList.push(object, null, object.material, this._vector3.z, null);
                        } else if (object.isMesh || object.isLine || object.isPoints) {
                              if (object.isSkinnedMesh) {
                                    object.skeleton.update();
                              }
                              if (!object.frustumCulled || this._frustum.intersectsObject(object)) {
                                    if (sortObjects) {
                                          this._vector3.setFromMatrixPosition(object.matrixWorld)
                                                .applyMatrix4(this._projScreenMatrix);
                                    }
                                    var geometry = this.objects.update(object);
                                    var material = object.material;
                                    if (Array.isArray(material)) {
                                          var groups = geometry.groups;
                                          for (var i = 0, l = groups.length; i < l; i++) {
                                                var group = groups[i];
                                                var groupMaterial = material[group.materialIndex];
                                                if (groupMaterial && groupMaterial.visible) {
                                                      this.currentRenderList.push(object, geometry, groupMaterial, this._vector3.z, group);
                                                }
                                          }
                                    } else if (material.visible) {
                                          this.currentRenderList.push(object, geometry, material, this._vector3.z, null);
                                    }
                              }
                        }
                  }
                  var children = object.children;
                  for (var i = 0, l = children.length; i < l; i++) {
                        this.projectObject(children[i], camera, sortObjects);
                  }
            }

            /**
             * 渲染objects
             * @param renderList 
             * @param scene 
             * @param camera 
             * @param overrideMaterial 
             */

            private renderObjects(renderList, scene, camera, overrideMaterial?) {
                  for (var i = 0, l = renderList.length; i < l; i++) {
                        var renderItem = renderList[i];
                        var object = renderItem.object;
                        var geometry = renderItem.geometry;
                        var material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
                        var group = renderItem.group;
                        if (camera.isArrayCamera) {
                              this._currentArrayCamera = camera;
                              var cameras = camera.cameras;
                              for (var j = 0, jl = cameras.length; j < jl; j++) {
                                    var camera2 = cameras[j];
                                    if (object.layers.test(camera2.layers)) {
                                          if ('viewport' in camera2) { // XR
                                                this.state.viewport(this._currentViewport.copy(camera2.viewport));
                                          } else {
                                                var bounds = camera2.bounds;
                                                var x = bounds.x * this._width;
                                                var y = bounds.y * this._height;
                                                var width = bounds.z * this._width;
                                                var height = bounds.w * this._height;
                                                this.state.viewport(this._currentViewport.set(x, y, width, height).multiplyScalar(this._pixelRatio));
                                          }
                                          this.renderObject(object, scene, camera2, geometry, material, group);
                                    }
                              }
                        } else {
                              this._currentArrayCamera = null;
                              this.renderObject(object, scene, camera, geometry, material, group);
                        }
                  }
            }

            /**
             * 渲染单个物品
             * @param object 
             * @param scene 
             * @param camera 
             * @param geometry 
             * @param material 
             * @param group 
             */
            private renderObject(object: Object3D, scene, camera, geometry, material, group) {
                  object.onBeforeRender(this, scene, camera, geometry, material, group);
                  this.currentRenderState = this.renderStates.get(scene, this._currentArrayCamera || camera);
                  object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
                  object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
                  if ((object as any).isImmediateRenderObject) {
                        var frontFaceCW = ((object as any).isMesh && object.matrixWorld.determinant() < 0);
                        this.state.setMaterial(material, frontFaceCW);
                        // 创建program
                        var program = this.setProgram(camera, scene.fog, material, object);
                        this._currentGeometryProgram = '';
                        this.renderObjectImmediate(object, program, material);
                  } else {
                        this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
                  }
                  object.onAfterRender(this, scene, camera, geometry, material, group);
                  this.currentRenderState = this.renderStates.get(scene, this._currentArrayCamera || camera);
            }

            /**
             * 初始化材料
             * @param material 
             * @param fog 
             * @param object 
             */
            private initMaterial(material, fog, object) {
                  var glPropertyNode = this.properties.get(material);
                  var lights = this.currentRenderState.state.lights;
                  var shadowsArray = this.currentRenderState.state.shadowsArray;
                  var parameters = this.programCache.getParameters(
                        material, lights.state, shadowsArray, fog, this._clipping.numPlanes, this._clipping.numIntersection, object);
                  var code = this.programCache.getProgramCode(material, parameters);
                  var program = glPropertyNode.program;
                  var programChange = true;
                  if (program === undefined) {
                        // new material
                        material.addEventListener('dispose', this.onMaterialDispose);
                  } else if (program.code !== code) {
                        // changed glsl or parameters
                        this.releaseMaterialProgramReference(material);
                  } else if (glPropertyNode.lightsHash !== lights.state.hash) {
                        this.properties.update(material, 'lightsHash', lights.state.hash);
                        programChange = false;
                  } else if (parameters.shaderID !== undefined) {
                        // same glsl and uniform list
                        return;
                  } else {
                        // only rebuild uniform list
                        programChange = false;
                  }
                  if (programChange) {
                        var shaderItem = new WebGLShaderItem();
                        if (parameters.shaderID) {
                              var shader = ShaderLib[parameters.shaderID];

                              shaderItem.name = material.type;
                              shaderItem.uniforms = UniformsUtils.clone(shader.uniforms);
                              shaderItem.vertexShader = shader.vertexShader;
                              shaderItem.fragmentShader = shader.fragmentShader;
                              glPropertyNode.shader = shaderItem;

                        } else {
                              shaderItem.name = material.type;
                              shaderItem.uniforms = material.uniforms;
                              shaderItem.vertexShader = material.vertexShader;
                              shaderItem.fragmentShader = material.fragmentShader;

                              glPropertyNode.shader = shaderItem;
                        }
                        material.onBeforeCompile(glPropertyNode.shader, this);
                        /////////////////////////创建program-shader编译通过/////////////////////////////////////////////////////////////////
                        program = this.programCache.acquireProgram(material, glPropertyNode.shader, parameters, code);
                        glPropertyNode.program = program;
                        material.program = program;
                  }
                  var programAttributes = program.getAttributes();
                  if (material.morphTargets) {
                        material.numSupportedMorphTargets = 0;
                        for (var i = 0; i < this.maxMorphTargets; i++) {
                              if (programAttributes['morphTarget' + i] >= 0) {
                                    material.numSupportedMorphTargets++;
                              }
                        }
                  }
                  if (material.morphNormals) {
                        material.numSupportedMorphNormals = 0;
                        for (var i = 0; i < this.maxMorphNormals; i++) {
                              if (programAttributes['morphNormal' + i] >= 0) {
                                    material.numSupportedMorphNormals++;
                              }
                        }
                  }
                  var uniforms = glPropertyNode.shader.uniforms;
                  if (!material.isShaderMaterial &&
                        !material.isRawShaderMaterial ||
                        material.clipping === true) {
                        glPropertyNode.numClippingPlanes = this._clipping.numPlanes;
                        glPropertyNode.numIntersection = this._clipping.numIntersection;
                        uniforms.clippingPlanes = this._clipping.uniform;
                  }
                  glPropertyNode.fog = fog;
                  // store the light setup it was created for
                  glPropertyNode.lightsHash = lights.state.hash;
                  if (material.lights) {
                        // wire up the material to this renderer's lighting state
                        uniforms.ambientLightColor.value = lights.state.ambient;
                        uniforms.directionalLights.value = lights.state.directional;
                        uniforms.spotLights.value = lights.state.spot;
                        uniforms.rectAreaLights.value = lights.state.rectArea;
                        uniforms.pointLights.value = lights.state.point;
                        uniforms.hemisphereLights.value = lights.state.hemi;
                        uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
                        uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
                        uniforms.spotShadowMap.value = lights.state.spotShadowMap;
                        uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
                        uniforms.pointShadowMap.value = lights.state.pointShadowMap;
                        uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
                        // TODO (abelnation): add area lights shadow info to uniforms
                  }
                  // 获取当前激活的uniform列表
                  var progUniforms = glPropertyNode.program.getUniforms();
                  // 找出激活uniform和material和light  uniform相同另存一下
                  var uniformsList = WebGLUniformsNode.seqWithValue(progUniforms.seq, uniforms);
                  glPropertyNode.uniformsList = uniformsList;
            }

            /**
             * 设置program
             * @param camera 
             * @param fog 
             * @param material 
             * @param object 
             */
            private setProgram(camera, fog, material, object) {
                  this._usedTextureUnits = 0;
                  var glPropertyNode = this.properties.get(material);
                  var lights = this.currentRenderState.state.lights;
                  if (this._clippingEnabled) {
                        if (this._localClippingEnabled || camera !== this._currentCamera) {
                              var useCache =
                                    camera === this._currentCamera &&
                                    material.id === this._currentMaterialId;
                              // we might want to call this function with some ClippingGroup
                              // object instead of the material, once it becomes feasible
                              // (#8465, #8379)
                              this._clipping.setState(
                                    material.clippingPlanes, material.clipIntersection, material.clipShadows,
                                    camera, glPropertyNode, useCache);
                        }
                  }
                  if (material.needsUpdate === false) {
                        if (glPropertyNode.program === undefined) {
                              material.needsUpdate = true;
                        } else if (material.fog && glPropertyNode.fog !== fog) {
                              material.needsUpdate = true;
                        } else if (material.lights && glPropertyNode.lightsHash !== lights.state.hash) {
                              material.needsUpdate = true;
                        } else if (glPropertyNode.numClippingPlanes !== undefined &&
                              (glPropertyNode.numClippingPlanes !== this._clipping.numPlanes ||
                                    glPropertyNode.numIntersection !== this._clipping.numIntersection)) {
                              material.needsUpdate = true;
                        }
                  }
                  if (material.needsUpdate) {
                        // 材料更新uniform值
                        this.initMaterial(material, fog, object);
                        material.needsUpdate = false;
                  }
                  var refreshProgram = false;
                  var refreshMaterial = false;
                  var refreshLights = false;
                  var program = glPropertyNode.program,
                        p_uniforms = program.getUniforms(),
                        m_uniforms = glPropertyNode.shader.uniforms;
                  if (this.state.useProgram(program.program)) {
                        refreshProgram = true;
                        refreshMaterial = true;
                        refreshLights = true;
                  }
                  if (material.id !== this._currentMaterialId) {
                        this._currentMaterialId = material.id;
                        refreshMaterial = true;
                  }
                  if (refreshProgram || camera !== this._currentCamera) {
                        p_uniforms.setValue(this._gl, 'projectionMatrix', camera.projectionMatrix);
                        if (this.capabilities.logarithmicDepthBuffer) {
                              p_uniforms.setValue(this._gl, 'logDepthBufFC',
                                    2.0 / (Math.log(camera.far + 1.0) / Math.LN2));
                        }
                        // Avoid unneeded uniform updates per ArrayCamera's sub-camera
                        if (this._currentCamera !== (this._currentArrayCamera || camera)) {
                              this._currentCamera = (this._currentArrayCamera || camera);
                              // lighting uniforms depend on the camera so enforce an update
                              // now, in case this material supports lights - or later, when
                              // the next material that does gets activated:
                              refreshMaterial = true;		// set to true on material change
                              refreshLights = true;		// remains set until update done
                        }
                        // load material specific uniforms
                        // (shader material also gets them for the sake of genericity)
                        if (material.isShaderMaterial ||
                              material.isMeshPhongMaterial ||
                              material.isMeshStandardMaterial ||
                              material.envMap) {
                              var uCamPos = p_uniforms.map.cameraPosition;
                              if (uCamPos !== undefined) {
                                    uCamPos.setValue(this._gl,
                                          this._vector3.setFromMatrixPosition(camera.matrixWorld));
                              }
                        }
                        if (material.isMeshPhongMaterial ||
                              material.isMeshLambertMaterial ||
                              material.isMeshBasicMaterial ||
                              material.isMeshStandardMaterial ||
                              material.isShaderMaterial ||
                              material.skinning) {
                              p_uniforms.setValue(this._gl, 'viewMatrix', camera.matrixWorldInverse);
                        }
                  }
                  // skinning uniforms must be set even if material didn't change
                  // auto-setting of texture unit for bone texture must go before other textures
                  // not sure why, but otherwise weird things happen
                  if (material.skinning) {
                        p_uniforms.setOptional(this._gl, object, 'bindMatrix');
                        p_uniforms.setOptional(this._gl, object, 'bindMatrixInverse');
                        var skeleton = object.skeleton;
                        if (skeleton) {
                              var bones = skeleton.bones;
                              if (this.capabilities.floatVertexTextures) {
                                    if (skeleton.boneTexture === undefined) {
                                          // layout (1 matrix = 4 pixels)
                                          //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
                                          //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
                                          //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
                                          //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
                                          //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)

                                          var size = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
                                          size = _Math.ceilPowerOfTwo(size);
                                          size = Math.max(size, 4);
                                          var boneMatrices = new Float32Array(size * size * 4); // 4 floats per RGBA pixel
                                          boneMatrices.set(skeleton.boneMatrices); // copy current values
                                          var boneTexture = new DataTexture(boneMatrices, size, size, RGBAFormat, FloatType);
                                          boneTexture.needsUpdate = true;
                                          skeleton.boneMatrices = boneMatrices;
                                          skeleton.boneTexture = boneTexture;
                                          skeleton.boneTextureSize = size;
                                    }
                                    p_uniforms.setValue(this._gl, 'boneTexture', skeleton.boneTexture);
                                    p_uniforms.setValue(this._gl, 'boneTextureSize', skeleton.boneTextureSize);
                              } else {
                                    p_uniforms.setOptional(this._gl, skeleton, 'boneMatrices');
                              }
                        }
                  }
                  if (refreshMaterial) {
                        p_uniforms.setValue(this._gl, 'toneMappingExposure', this.toneMappingExposure);
                        p_uniforms.setValue(this._gl, 'toneMappingWhitePoint', this.toneMappingWhitePoint);
                        if (material.lights) {
                              // the current material requires lighting info
                              // note: all lighting uniforms are always set correctly
                              // they simply reference the renderer's state for their
                              // values
                              //
                              // use the current material's .needsUpdate flags to set
                              // the GL state when required
                              this.markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
                        }
                        // refresh uniforms common to several materials
                        if (fog && material.fog) {
                              this.refreshUniformsFog(m_uniforms, fog);
                        }
                        if (material.isMeshBasicMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                        } else if (material.isMeshLambertMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                              this.refreshUniformsLambert(m_uniforms, material);
                        } else if (material.isMeshPhongMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                              if (material.isMeshToonMaterial) {
                                    this.refreshUniformsToon(m_uniforms, material);
                              } else {
                                    this.refreshUniformsPhong(m_uniforms, material);
                              }
                        } else if (material.isMeshStandardMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                              if (material.isMeshPhysicalMaterial) {
                                    this.refreshUniformsPhysical(m_uniforms, material);
                              } else {
                                    this.refreshUniformsStandard(m_uniforms, material);
                              }
                        } else if (material.isMeshDepthMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                              this.refreshUniformsDepth(m_uniforms, material);
                        } else if (material.isMeshDistanceMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                              this.refreshUniformsDistance(m_uniforms, material);
                        } else if (material.isMeshNormalMaterial) {
                              this.refreshUniformsCommon(m_uniforms, material);
                              this.refreshUniformsNormal(m_uniforms, material);
                        } else if (material.isLineBasicMaterial) {
                              this.refreshUniformsLine(m_uniforms, material);
                              if (material.isLineDashedMaterial) {
                                    this.refreshUniformsDash(m_uniforms, material);
                              }
                        } else if (material.isPointsMaterial) {
                              this.refreshUniformsPoints(m_uniforms, material);
                        } else if (material.isShadowMaterial) {
                              m_uniforms.color.value = material.color;
                              m_uniforms.opacity.value = material.opacity;
                        }
                        // RectAreaLight Texture
                        // TODO (mrdoob): Find a nicer implementation
                        if (m_uniforms.ltc_1 !== undefined) m_uniforms.ltc_1.value = (UniformsLib as any).LTC_1;
                        if (m_uniforms.ltc_2 !== undefined) m_uniforms.ltc_2.value = (UniformsLib as any).LTC_2;
                        // 将材料和灯光的uniform的值，赋值给激活的uniform；
                        WebGLUniformsNode.upload(this._gl, glPropertyNode.uniformsList, m_uniforms, this);
                  }
                  if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {
                        // 将材料和灯光的uniform的值，赋值给激活的uniform；
                        WebGLUniformsNode.upload(this._gl, glPropertyNode.uniformsList, m_uniforms, this);
                        material.uniformsNeedUpdate = false;
                  }
                  // common matrices
                  p_uniforms.setValue(this._gl, 'modelViewMatrix', object.modelViewMatrix);
                  p_uniforms.setValue(this._gl, 'normalMatrix', object.normalMatrix);
                  p_uniforms.setValue(this._gl, 'modelMatrix', object.matrixWorld);
                  return program;
            }

            // Uniforms (refresh uniforms objects)
            /**
             * 更新uniforms参数
             * @param uniforms 
             * @param material 
             */
            private refreshUniformsCommon(uniforms, material) {
                  uniforms.opacity.value = material.opacity;
                  if (material.color) {
                        uniforms.diffuse.value = material.color;
                  }
                  if (material.emissive) {
                        uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
                  }
                  if (material.map) {
                        uniforms.map.value = material.map;
                  }
                  if (material.alphaMap) {
                        uniforms.alphaMap.value = material.alphaMap;
                  }
                  if (material.specularMap) {
                        uniforms.specularMap.value = material.specularMap;
                  }
                  if (material.envMap) {
                        uniforms.envMap.value = material.envMap;
                        // don't flip CubeTexture envMaps, flip everything else:
                        //  WebGLRenderTargetCube will be flipped for backwards compatibility
                        //  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
                        // this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
                        uniforms.flipEnvMap.value = (!(material.envMap && material.envMap.isCubeTexture)) ? 1 : - 1;
                        uniforms.reflectivity.value = material.reflectivity;
                        uniforms.refractionRatio.value = material.refractionRatio;
                        uniforms.maxMipLevel.value = this.properties.get(material.envMap).__maxMipLevel;
                  }
                  if (material.lightMap) {
                        uniforms.lightMap.value = material.lightMap;
                        uniforms.lightMapIntensity.value = material.lightMapIntensity;
                  }
                  if (material.aoMap) {
                        uniforms.aoMap.value = material.aoMap;
                        uniforms.aoMapIntensity.value = material.aoMapIntensity;
                  }
                  // uv repeat and offset setting priorities
                  // 1. color map
                  // 2. specular map
                  // 3. normal map
                  // 4. bump map
                  // 5. alpha map
                  // 6. emissive map
                  var uvScaleMap;
                  if (material.map) {
                        uvScaleMap = material.map;
                  } else if (material.specularMap) {
                        uvScaleMap = material.specularMap;
                  } else if (material.displacementMap) {
                        uvScaleMap = material.displacementMap;
                  } else if (material.normalMap) {
                        uvScaleMap = material.normalMap;
                  } else if (material.bumpMap) {
                        uvScaleMap = material.bumpMap;
                  } else if (material.roughnessMap) {
                        uvScaleMap = material.roughnessMap;
                  } else if (material.metalnessMap) {
                        uvScaleMap = material.metalnessMap;
                  } else if (material.alphaMap) {
                        uvScaleMap = material.alphaMap;
                  } else if (material.emissiveMap) {
                        uvScaleMap = material.emissiveMap;
                  }
                  if (uvScaleMap !== undefined) {
                        // backwards compatibility
                        if (uvScaleMap.isWebGLRenderTarget) {
                              uvScaleMap = uvScaleMap.texture;
                        }
                        if (uvScaleMap.matrixAutoUpdate === true) {
                              uvScaleMap.updateMatrix();
                        }
                        if (uvScaleMap.matrix) {
                              uniforms.uvTransform.value.copy(uvScaleMap.matrix);
                        }
                  }
            }

            /**
             * 更新线的uniform参数
             * @param uniforms 
             * @param material 
             */
            private refreshUniformsLine(uniforms, material) {
                  uniforms.diffuse.value = material.color;
                  uniforms.opacity.value = material.opacity;
            }

            /**
             * 更新虚线的uniform参数
             * @param uniforms 
             * @param material 
             */
            private refreshUniformsDash(uniforms, material) {
                  uniforms.dashSize.value = material.dashSize;
                  uniforms.totalSize.value = material.dashSize + material.gapSize;
                  uniforms.scale.value = material.scale;
            }

            /**
             * 更新虚线的点云uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsPoints(uniforms, material) {
                  uniforms.diffuse.value = material.color;
                  uniforms.opacity.value = material.opacity;
                  uniforms.size.value = material.size * this._pixelRatio;
                  uniforms.scale.value = this._height * 0.5;
                  uniforms.map.value = material.map;
                  if (material.map !== null) {
                        if (material.map.matrixAutoUpdate === true) {
                              material.map.updateMatrix();
                        }
                        uniforms.uvTransform.value.copy(material.map.matrix);
                  }
            }


            /**
             * 更新雾uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsFog(uniforms, fog) {
                  uniforms.fogColor.value = fog.color;
                  if (fog.isFog) {
                        uniforms.fogNear.value = fog.near;
                        uniforms.fogFar.value = fog.far;
                  } else if (fog.isFogExp2) {
                        uniforms.fogDensity.value = fog.density;
                  }
            }

            /**
             * 更新Lambert材料uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsLambert(uniforms, material) {
                  if (material.emissiveMap) {
                        uniforms.emissiveMap.value = material.emissiveMap;
                  }
            }

            /**
             * 更新Phong材料uniform参数
               * @param uniforms 
               * @param material 
               */
            private refreshUniformsPhong(uniforms, material) {
                  uniforms.specular.value = material.specular;
                  uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )
                  if (material.emissiveMap) {
                        uniforms.emissiveMap.value = material.emissiveMap;
                  }
                  if (material.bumpMap) {
                        uniforms.bumpMap.value = material.bumpMap;
                        uniforms.bumpScale.value = material.bumpScale;
                        if (material.side === BackSide) uniforms.bumpScale.value *= - 1;
                  }
                  if (material.normalMap) {
                        uniforms.normalMap.value = material.normalMap;
                        uniforms.normalScale.value.copy(material.normalScale);
                        if (material.side === BackSide) uniforms.normalScale.value.negate();
                  }
                  if (material.displacementMap) {
                        uniforms.displacementMap.value = material.displacementMap;
                        uniforms.displacementScale.value = material.displacementScale;
                        uniforms.displacementBias.value = material.displacementBias;
                  }
            }

            /**
             * 更新Toon材料uniform参数
             * @param uniforms 
             * @param material 
             */
            private refreshUniformsToon(uniforms, material) {
                  this.refreshUniformsPhong(uniforms, material);
                  if (material.gradientMap) {
                        uniforms.gradientMap.value = material.gradientMap;
                  }
            }

            /**
             * 更新Standard材料uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsStandard(uniforms, material) {
                  uniforms.roughness.value = material.roughness;
                  uniforms.metalness.value = material.metalness;
                  if (material.roughnessMap) {
                        uniforms.roughnessMap.value = material.roughnessMap;
                  }
                  if (material.metalnessMap) {
                        uniforms.metalnessMap.value = material.metalnessMap;
                  }
                  if (material.emissiveMap) {
                        uniforms.emissiveMap.value = material.emissiveMap;
                  }
                  if (material.bumpMap) {
                        uniforms.bumpMap.value = material.bumpMap;
                        uniforms.bumpScale.value = material.bumpScale;
                        if (material.side === BackSide) uniforms.bumpScale.value *= - 1;
                  }
                  if (material.normalMap) {
                        uniforms.normalMap.value = material.normalMap;
                        uniforms.normalScale.value.copy(material.normalScale);
                        if (material.side === BackSide) uniforms.normalScale.value.negate();
                  }
                  if (material.displacementMap) {
                        uniforms.displacementMap.value = material.displacementMap;
                        uniforms.displacementScale.value = material.displacementScale;
                        uniforms.displacementBias.value = material.displacementBias;
                  }
                  if (material.envMap) {
                        //uniforms.envMap.value = material.envMap; // part of uniforms common
                        uniforms.envMapIntensity.value = material.envMapIntensity;
                  }
            }

            /**
             * 更新Physical材料uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsPhysical(uniforms, material) {
                  uniforms.clearCoat.value = material.clearCoat;
                  uniforms.clearCoatRoughness.value = material.clearCoatRoughness;
                  this.refreshUniformsStandard(uniforms, material);
            }

            /**
             * 更新Depth材料uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsDepth(uniforms, material) {
                  if (material.displacementMap) {
                        uniforms.displacementMap.value = material.displacementMap;
                        uniforms.displacementScale.value = material.displacementScale;
                        uniforms.displacementBias.value = material.displacementBias;
                  }
            }

            /**
             * 更新Distance材料uniform参数
               * @param uniforms 
               * @param material 
               */
            private refreshUniformsDistance(uniforms, material) {
                  if (material.displacementMap) {
                        uniforms.displacementMap.value = material.displacementMap;
                        uniforms.displacementScale.value = material.displacementScale;
                        uniforms.displacementBias.value = material.displacementBias;
                  }
                  uniforms.referencePosition.value.copy(material.referencePosition);
                  uniforms.nearDistance.value = material.nearDistance;
                  uniforms.farDistance.value = material.farDistance;
            }

            /**
             * 更新Normal材料uniform参数
            * @param uniforms 
            * @param material 
            */
            private refreshUniformsNormal(uniforms, material) {
                  if (material.bumpMap) {
                        uniforms.bumpMap.value = material.bumpMap;
                        uniforms.bumpScale.value = material.bumpScale;
                        if (material.side === BackSide) uniforms.bumpScale.value *= - 1;
                  }
                  if (material.normalMap) {
                        uniforms.normalMap.value = material.normalMap;
                        uniforms.normalScale.value.copy(material.normalScale);
                        if (material.side === BackSide) uniforms.normalScale.value.negate();
                  }
                  if (material.displacementMap) {
                        uniforms.displacementMap.value = material.displacementMap;
                        uniforms.displacementScale.value = material.displacementScale;
                        uniforms.displacementBias.value = material.displacementBias;
                  }
            }
            // If uniforms are marked as clean, they don't need to be loaded to the GPU.
            /**
             * 灯光更新
             * @param uniforms 
             * @param value 
             */
            private markUniformsLightsNeedsUpdate(uniforms, value) {
                  uniforms.ambientLightColor.needsUpdate = value;
                  uniforms.directionalLights.needsUpdate = value;
                  uniforms.pointLights.needsUpdate = value;
                  uniforms.spotLights.needsUpdate = value;
                  uniforms.rectAreaLights.needsUpdate = value;
                  uniforms.hemisphereLights.needsUpdate = value;
            }
            // Textures
            /**
             * 分配材质单元
             */
            public allocTextureUnit() {
                  var textureUnit = this._usedTextureUnits;
                  if (textureUnit >= this.capabilities.maxTextures) {
                        console.warn('THREE.WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + this.capabilities.maxTextures);
                  }
                  this._usedTextureUnits += 1;
                  return textureUnit;
            }
            // this.setTexture2D = setTexture2D;
            //this.setTexture2D = (function () {
            private warned_setTexture2D: boolean = false;
            // backwards compatibility: peel texture.texture
            /**
             * 设置材质
             * @param texture 
             * @param slot 
             */
            public setTexture2D(texture, slot) {
                  if (texture && texture.isWebGLRenderTarget) {
                        if (!this.warned_setTexture2D) {
                              console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead.");
                              this.warned_setTexture2D = true;
                        }
                        texture = texture.texture;
                  }
                  this.textures.setTexture2D(texture, slot);
            }

            private warned_setTexture: boolean = false;

            /**
          * 设置材质
          * @param texture 
          * @param slot 
          */
            public setTexture(texture, slot) {
                  if (!this.warned_setTexture) {
                        console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead.");
                        this.warned_setTexture = true;
                  }
                  this.textures.setTexture2D(texture, slot);
            }

            private warned_setTextureCube: boolean = false;

            /**
             * 设置cube材质
            * @param texture 
            * @param slot 
            */
            public setTextureCube(texture, slot) {
                  // backwards compatibility: peel texture.texture
                  if (texture && texture.isWebGLRenderTargetCube) {
                        if (!this.warned_setTextureCube) {
                              console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead.");
                              this.warned_setTextureCube = true;
                        }
                        texture = texture.texture;
                  }
                  // currently relying on the fact that WebGLRenderTargetCube.texture is a Texture and NOT a CubeTexture
                  // TODO: unify these code paths
                  if ((texture && texture.isCubeTexture) ||
                        (Array.isArray(texture.image) && texture.image.length === 6)) {
                        // CompressedTexture can have Array in image :/
                        // this function alone should take care of cube textures
                        this.textures.setTextureCube(texture, slot);
                  } else {
                        // assumed: texture property of THREE.WebGLRenderTargetCube
                        this.textures.setTextureCubeDynamic(texture, slot);
                  }
            }

            public getRenderTarget() {
                  return this._currentRenderTarget;
            };

            /**
             * 
             * @param renderTarget 
             */
            public setRenderTarget(renderTarget) {
                  this._currentRenderTarget = renderTarget;
                  if (renderTarget && this.properties.get(renderTarget).__webglFramebuffer === undefined) {
                        this.textures.setupRenderTarget(renderTarget);
                  }
                  var framebuffer = null;
                  var isCube = false;
                  if (renderTarget) {
                        var __webglFramebuffer = this.properties.get(renderTarget).__webglFramebuffer;
                        if (renderTarget.isWebGLRenderTargetCube) {
                              framebuffer = __webglFramebuffer[renderTarget.activeCubeFace];
                              isCube = true;
                        } else {
                              framebuffer = __webglFramebuffer;
                        }
                        this._currentViewport.copy(renderTarget.viewport);
                        this._currentScissor.copy(renderTarget.scissor);
                        this._currentScissorTest = renderTarget.scissorTest;
                  } else {
                        this._currentViewport.copy(this._viewport).multiplyScalar(this._pixelRatio);
                        this._currentScissor.copy(this._scissor).multiplyScalar(this._pixelRatio);
                        this._currentScissorTest = this._scissorTest;
                  }
                  if (this._currentFramebuffer !== framebuffer) {
                        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
                        this._currentFramebuffer = framebuffer;
                  }
                  this.state.viewport(this._currentViewport);
                  this.state.scissor(this._currentScissor);
                  this.state.setScissorTest(this._currentScissorTest);
                  if (isCube) {
                        var textureProperties = this.properties.get(renderTarget.texture);
                        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderTarget.activeCubeFace, textureProperties.__webglTexture, renderTarget.activeMipMapLevel);
                  }
            }

            public readRenderTargetPixels(renderTarget, x, y, width, height, buffer) {
                  if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
                        console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');
                        return;
                  }
                  var framebuffer = this.properties.get(renderTarget).__webglFramebuffer;
                  if (framebuffer) {
                        var restore = false;
                        if (framebuffer !== this._currentFramebuffer) {
                              this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
                              restore = true;
                        }
                        try {
                              var texture = renderTarget.texture;
                              var textureFormat = texture.format;
                              var textureType = texture.type;
                              if (textureFormat !== RGBAFormat && this.utils.convert(textureFormat) !== this._gl.getParameter(this._gl.IMPLEMENTATION_COLOR_READ_FORMAT)) {
                                    console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.');
                                    return;
                              }
                              if (textureType !== UnsignedByteType && this.utils.convert(textureType) !== this._gl.getParameter(this._gl.IMPLEMENTATION_COLOR_READ_TYPE) && // IE11, Edge and Chrome Mac < 52 (#9513)
                                    !(textureType === FloatType && (this.extensions.get('OES_texture_float') || this.extensions.get('WEBGL_color_buffer_float'))) && // Chrome Mac >= 52 and Firefox
                                    !(textureType === HalfFloatType && this.extensions.get('EXT_color_buffer_half_float'))) {
                                    console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.');
                                    return;
                              }
                              if (this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER) === this._gl.FRAMEBUFFER_COMPLETE) {
                                    // the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)
                                    if ((x >= 0 && x <= (renderTarget.width - width)) && (y >= 0 && y <= (renderTarget.height - height))) {
                                          this._gl.readPixels(x, y, width, height, this.utils.convert(textureFormat), this.utils.convert(textureType), buffer);
                                    }
                              } else {
                                    console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.');
                              }
                        } finally {
                              if (restore) {
                                    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._currentFramebuffer);
                              }
                        }
                  }
            }

            public copyFramebufferToTexture(position, texture, level) {
                  var width = texture.image.width;
                  var height = texture.image.height;
                  var glFormat = this.utils.convert(texture.format);
                  this.setTexture2D(texture, 0);
                  this._gl.copyTexImage2D(this._gl.TEXTURE_2D, level || 0, glFormat, position.x, position.y, width, height, 0);
            };

            public copyTextureToTexture = function (position, srcTexture, dstTexture, level) {
                  var width = srcTexture.image.width;
                  var height = srcTexture.image.height;
                  var glFormat = this.utils.convert(dstTexture.format);
                  var glType = this.utils.convert(dstTexture.type);
                  this.setTexture2D(dstTexture, 0);
                  if (srcTexture.isDataTexture) {
                        this._gl.texSubImage2D(this._gl.TEXTURE_2D, level || 0, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data);
                  } else {
                        this._gl.texSubImage2D(this._gl.TEXTURE_2D, level || 0, position.x, position.y, glFormat, glType, srcTexture.image);
                  }
            }
      }
}