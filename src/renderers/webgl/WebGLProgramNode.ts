module THREE {
   var programIdCount = 0;

   function getEncodingComponents(encoding) {
      switch (encoding) {
         case LinearEncoding:
            return ['Linear', '( value )'];
         case sRGBEncoding:
            return ['sRGB', '( value )'];
         case RGBEEncoding:
            return ['RGBE', '( value )'];
         case RGBM7Encoding:
            return ['RGBM', '( value, 7.0 )'];
         case RGBM16Encoding:
            return ['RGBM', '( value, 16.0 )'];
         case RGBDEncoding:
            return ['RGBD', '( value, 256.0 )'];
         case GammaEncoding:
            return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
         default:
            throw new Error('unsupported encoding: ' + encoding);

      }

   }

   function getTexelDecodingFunction(functionName, encoding) {
      var components = getEncodingComponents(encoding);
      return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
   }

   function getTexelEncodingFunction(functionName, encoding) {
      var components = getEncodingComponents(encoding);
      return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[0] + components[1] + '; }';

   }

   function getToneMappingFunction(functionName, toneMapping) {
      var toneMappingName;
      switch (toneMapping) {
         case LinearToneMapping:
            toneMappingName = 'Linear';
            break;
         case ReinhardToneMapping:
            toneMappingName = 'Reinhard';
            break;
         case Uncharted2ToneMapping:
            toneMappingName = 'Uncharted2';
            break;
         case CineonToneMapping:
            toneMappingName = 'OptimizedCineon';
            break;
         default:
            throw new Error('unsupported toneMapping: ' + toneMapping);
      }
      return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';
   }

   function generateExtensions(extensions, parameters, rendererExtensions) {

      extensions = extensions || {};
      var chunks = [
         (extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap || parameters.flatShading) ? '#extension GL_OES_standard_derivatives : enable' : '',
         (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '',
         (extensions.drawBuffers) && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '',
         (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''
      ];
      return chunks.filter(filterEmptyLine).join('\n');
   }

   function generateDefines(defines) {
      var chunks = [];
      for (var name in defines) {
         var value = defines[name];
         if (value === false) continue;
         chunks.push('#define ' + name + ' ' + value);
      }
      return chunks.join('\n');
   }

   /**
    * 从shader中获取当前激活的attribute
    * @param gl 
    * @param program 
    */
   function fetchAttributeLocations(gl, program) {
      var attributes = {};
      var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
      for (var i = 0; i < n; i++) {
         var info = gl.getActiveAttrib(program, i);
         var name = info.name;
         // console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );
         attributes[name] = gl.getAttribLocation(program, name);
         // 名称和激活编号的map表信息
      }
      return attributes;
   }

   function filterEmptyLine(string) {
      return string !== '';
   }

   function replaceLightNums(string, parameters) {
      return string
         .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights)
         .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights)
         .replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights)
         .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights)
         .replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights);
   }

   function replaceClippingPlaneNums(string, parameters) {
      return string
         .replace(/NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes)
         .replace(/UNION_CLIPPING_PLANES/g, (parameters.numClippingPlanes - parameters.numClipIntersection));
   }

   function parseIncludes(string) {
      var pattern = /^[ \t]*#include +<([\w\d.]+)>/gm;

      function replace(match, include) {
         var replace = ShaderChunk[include];
         if (replace === undefined) {
            throw new Error('Can not resolve #include <' + include + '>');
         }
         return parseIncludes(replace);
      }
      return string.replace(pattern, replace);
   }

   function unrollLoops(string) {
      var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
      function replace(match, start, end, snippet) {
         var unroll = '';
         for (var i = parseInt(start); i < parseInt(end); i++) {
            unroll += snippet.replace(/\[ i \]/g, '[ ' + i + ' ]');
         }
         return unroll;
      }
      return string.replace(pattern, replace);

   }

   /**
    * webGLprogram
    */
   export class WebGLProgramNode {

      public name: string;
      public id;
      /**唯一标识 */
      public code: string;
      public usedTimes;
      /**webgl program */
      public program: WebGLProgram;
      /**顶点gl 的shader */
      public vertexShader;
      /**片元gl 的shader */
      public fragmentShader;
      public renderer;
      public extensions;
      public material: Material;
      public shader: WebGLShaderItem;
      /**material 对应的参数 */
      public parameters;
      public gl;
      public diagnostics;
      /**存储uniform地址 */
      public cachedUniforms: WebGLUniformsNode;
      /**存储attribute地址 */
      public cachedAttributes: any | Object;


      constructor(renderer, extensions, code, material, shader, parameters) {

         this.name = shader.name;
         this.id = programIdCount++;
         this.code = code;
         this.usedTimes = 1;
         this.parameters = parameters;
         this.shader = shader;
         this.material = material;
         this.gl = renderer.context;
         this.material = material;
         this.renderer = renderer;
         this.extensions = extensions;
         var gl = this.gl;
         var defines = material.defines;
         var vertexShader = shader.vertexShader;
         var fragmentShader = shader.fragmentShader;
         var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

         if (parameters.shadowMapType === PCFShadowMap) {
            shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';
         } else if (parameters.shadowMapType === PCFSoftShadowMap) {
            shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';
         }

         var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
         var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
         var envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
         this.setMapParameter(parameters, material, envMapTypeDefine, envMapModeDefine, envMapBlendingDefine);

         var gammaFactorDefine = (renderer.gammaFactor > 0) ? renderer.gammaFactor : 1.0;
         var customExtensions = generateExtensions(material.extensions, parameters, extensions);
         var customDefines = generateDefines(defines);
         //创建program
         var program = gl.createProgram();
         this.program = program;

         var prefixVertex;
         var prefixFragment;

         if (material.isRawShaderMaterial) {
            prefixVertex = this.rawMaterialPrefixVertex(customDefines);
            prefixFragment = this.rawMaterialPrefixFragment(customExtensions, customDefines);
         } else {
            prefixVertex = this.prefixVertex(parameters, shader, customDefines, gammaFactorDefine, envMapModeDefine, shadowMapTypeDefine, extensions);
            prefixFragment = this.prefixFragment(customExtensions, material, parameters, shader, customDefines, gammaFactorDefine, extensions, envMapTypeDefine, envMapModeDefine, envMapBlendingDefine, shadowMapTypeDefine);
         }

         vertexShader = parseIncludes(vertexShader);
         vertexShader = replaceLightNums(vertexShader, parameters);
         vertexShader = replaceClippingPlaneNums(vertexShader, parameters);

         fragmentShader = parseIncludes(fragmentShader);
         fragmentShader = replaceLightNums(fragmentShader, parameters);
         fragmentShader = replaceClippingPlaneNums(fragmentShader, parameters);

         vertexShader = unrollLoops(vertexShader);
         fragmentShader = unrollLoops(fragmentShader);

         var vertexGlsl = prefixVertex + vertexShader;
         var fragmentGlsl = prefixFragment + fragmentShader;

         // console.log( '*VERTEX*', vertexGlsl );
         // console.log( '*FRAGMENT*', fragmentGlsl );

         var glVertexShader = webGLCreateShader(gl, gl.VERTEX_SHADER, vertexGlsl);
         var glFragmentShader = webGLCreateShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
         this.vertexShader = glVertexShader;
         this.fragmentShader = glFragmentShader;
         gl.attachShader(program, glVertexShader);
         gl.attachShader(program, glFragmentShader);

         // Force a particular attribute to index 0.

         if (material.index0AttributeName !== undefined) {
            gl.bindAttribLocation(program, 0, material.index0AttributeName);
         } else if (parameters.morphTargets === true) {
            // programs with morphTargets displace position out of attribute 0
            gl.bindAttribLocation(program, 0, 'position');
         }
         gl.linkProgram(program);

         var programLog = gl.getProgramInfoLog(program).trim();
         var vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
         var fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();
         var runnable = true;
         var haveDiagnostics = true;

         // console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
         // console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

         if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
            runnable = false;
            console.error('THREE.WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
         } else if (programLog !== '') {
            console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', programLog);
         } else if (vertexLog === '' || fragmentLog === '') {
            haveDiagnostics = false;
         }

         if (haveDiagnostics) {

            this.diagnostics = {
               runnable: runnable,
               material: material,
               programLog: programLog,
               vertexShader: {
                  log: vertexLog,
                  prefix: prefixVertex
               },
               fragmentShader: {
                  log: fragmentLog,
                  prefix: prefixFragment

               }
            };
         }

         // clean up
         gl.deleteShader(glVertexShader);
         gl.deleteShader(glFragmentShader);
         //
      }

      /**
       * 设置一些初始参数
       * @param parameters 
       * @param material 
       * @param envMapTypeDefine 
       * @param envMapModeDefine 
       * @param envMapBlendingDefine 
       */
      public setMapParameter(parameters, material, envMapTypeDefine, envMapModeDefine, envMapBlendingDefine) {
         if (parameters.envMap) {

            switch (material.envMap.mapping) {

               case CubeReflectionMapping:
               case CubeRefractionMapping:
                  envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
                  break;

               case CubeUVReflectionMapping:
               case CubeUVRefractionMapping:
                  envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
                  break;

               case EquirectangularReflectionMapping:
               case EquirectangularRefractionMapping:
                  envMapTypeDefine = 'ENVMAP_TYPE_EQUIREC';
                  break;

               case SphericalReflectionMapping:
                  envMapTypeDefine = 'ENVMAP_TYPE_SPHERE';
                  break;

            }

            switch (material.envMap.mapping) {

               case CubeRefractionMapping:
               case EquirectangularRefractionMapping:
                  envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
                  break;

            }

            switch (material.combine) {

               case MultiplyOperation:
                  envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
                  break;

               case MixOperation:
                  envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
                  break;

               case AddOperation:
                  envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
                  break;

            }

         }
      }

      /**
       * 原始材料的shader头处理
       * @param customDefines 
       */
      public rawMaterialPrefixVertex(customDefines): string {
         var prefixVertex = [
            customDefines
         ].filter(filterEmptyLine).join('\n');
         if (prefixVertex.length > 0) {
            prefixVertex += '\n';
         }

         return prefixVertex;
      }

      /**
 * 原始材料的shader头处理
 * @param customDefines 
 */
      public rawMaterialPrefixFragment(customExtensions, customDefines): string {
         var prefixFragment = [
            customExtensions,
            customDefines
         ].filter(filterEmptyLine).join('\n');

         if (prefixFragment.length > 0) {
            prefixFragment += '\n';
         }
         return prefixFragment;
      }

      /**
       * 顶点shader头的处理
       * @param parameters 
       * @param shader 
       * @param customDefines 
       * @param gammaFactorDefine 
       * @param envMapModeDefine 
       * @param shadowMapTypeDefine 
       * @param extensions 
       */
      public prefixVertex(parameters, shader, customDefines, gammaFactorDefine, envMapModeDefine, shadowMapTypeDefine, extensions): string {
         var result = [

            'precision ' + parameters.precision + ' float;',
            'precision ' + parameters.precision + ' int;',

            '#define SHADER_NAME ' + shader.name,

            customDefines,

            parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

            '#define GAMMA_FACTOR ' + gammaFactorDefine,

            '#define MAX_BONES ' + parameters.maxBones,
            (parameters.useFog && parameters.fog) ? '#define USE_FOG' : '',
            (parameters.useFog && parameters.fogExp) ? '#define FOG_EXP2' : '',

            parameters.map ? '#define USE_MAP' : '',
            parameters.envMap ? '#define USE_ENVMAP' : '',
            parameters.envMap ? '#define ' + envMapModeDefine : '',
            parameters.lightMap ? '#define USE_LIGHTMAP' : '',
            parameters.aoMap ? '#define USE_AOMAP' : '',
            parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
            parameters.bumpMap ? '#define USE_BUMPMAP' : '',
            parameters.normalMap ? '#define USE_NORMALMAP' : '',
            parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
            parameters.specularMap ? '#define USE_SPECULARMAP' : '',
            parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
            parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
            parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
            parameters.vertexColors ? '#define USE_COLOR' : '',

            parameters.flatShading ? '#define FLAT_SHADED' : '',

            parameters.skinning ? '#define USE_SKINNING' : '',
            parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

            parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
            parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
            parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
            parameters.flipSided ? '#define FLIP_SIDED' : '',

            parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
            parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

            parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

            parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
            parameters.logarithmicDepthBuffer && extensions.get('EXT_frag_depth') ? '#define USE_LOGDEPTHBUF_EXT' : '',

            'uniform mat4 modelMatrix;',
            'uniform mat4 modelViewMatrix;',
            'uniform mat4 projectionMatrix;',
            'uniform mat4 viewMatrix;',
            'uniform mat3 normalMatrix;',
            'uniform vec3 cameraPosition;',

            'attribute vec3 position;',
            'attribute vec3 normal;',
            'attribute vec2 uv;',

            '#ifdef USE_COLOR',

            '	attribute vec3 color;',

            '#endif',

            '#ifdef USE_MORPHTARGETS',

            '	attribute vec3 morphTarget0;',
            '	attribute vec3 morphTarget1;',
            '	attribute vec3 morphTarget2;',
            '	attribute vec3 morphTarget3;',

            '	#ifdef USE_MORPHNORMALS',

            '		attribute vec3 morphNormal0;',
            '		attribute vec3 morphNormal1;',
            '		attribute vec3 morphNormal2;',
            '		attribute vec3 morphNormal3;',

            '	#else',

            '		attribute vec3 morphTarget4;',
            '		attribute vec3 morphTarget5;',
            '		attribute vec3 morphTarget6;',
            '		attribute vec3 morphTarget7;',

            '	#endif',

            '#endif',

            '#ifdef USE_SKINNING',

            '	attribute vec4 skinIndex;',
            '	attribute vec4 skinWeight;',

            '#endif',

            '\n'

         ].filter(filterEmptyLine).join('\n');
         return result;
      }

      /**
       * 片元shader头的处理
       * @param customExtensions 
       * @param material 
       * @param parameters 
       * @param shader 
       * @param customDefines 
       * @param gammaFactorDefine 
       * @param extensions 
       * @param envMapTypeDefine 
       * @param envMapModeDefine 
       * @param envMapBlendingDefine 
       * @param shadowMapTypeDefine 
       */
      public prefixFragment(customExtensions, material, parameters, shader, customDefines, gammaFactorDefine, extensions, envMapTypeDefine, envMapModeDefine, envMapBlendingDefine, shadowMapTypeDefine): string {
         var result = [

            customExtensions,

            'precision ' + parameters.precision + ' float;',
            'precision ' + parameters.precision + ' int;',

            '#define SHADER_NAME ' + shader.name,

            customDefines,

            parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest : '',

            '#define GAMMA_FACTOR ' + gammaFactorDefine,

            (parameters.useFog && parameters.fog) ? '#define USE_FOG' : '',
            (parameters.useFog && parameters.fogExp) ? '#define FOG_EXP2' : '',

            parameters.map ? '#define USE_MAP' : '',
            parameters.envMap ? '#define USE_ENVMAP' : '',
            parameters.envMap ? '#define ' + envMapTypeDefine : '',
            parameters.envMap ? '#define ' + envMapModeDefine : '',
            parameters.envMap ? '#define ' + envMapBlendingDefine : '',
            parameters.lightMap ? '#define USE_LIGHTMAP' : '',
            parameters.aoMap ? '#define USE_AOMAP' : '',
            parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
            parameters.bumpMap ? '#define USE_BUMPMAP' : '',
            parameters.normalMap ? '#define USE_NORMALMAP' : '',
            parameters.specularMap ? '#define USE_SPECULARMAP' : '',
            parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
            parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
            parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
            parameters.vertexColors ? '#define USE_COLOR' : '',

            parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

            parameters.flatShading ? '#define FLAT_SHADED' : '',

            parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
            parameters.flipSided ? '#define FLIP_SIDED' : '',

            parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
            parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

            parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

            parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

            parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
            parameters.logarithmicDepthBuffer && extensions.get('EXT_frag_depth') ? '#define USE_LOGDEPTHBUF_EXT' : '',

            parameters.envMap && extensions.get('EXT_shader_texture_lod') ? '#define TEXTURE_LOD_EXT' : '',

            'uniform mat4 viewMatrix;',
            'uniform vec3 cameraPosition;',

            (parameters.toneMapping !== NoToneMapping) ? '#define TONE_MAPPING' : '',
            (parameters.toneMapping !== NoToneMapping) ? ShaderChunk['tonemapping_pars_fragment'] : '', // this code is required here because it is used by the toneMapping() function defined below
            (parameters.toneMapping !== NoToneMapping) ? getToneMappingFunction('toneMapping', parameters.toneMapping) : '',

            parameters.dithering ? '#define DITHERING' : '',

            (parameters.outputEncoding || parameters.mapEncoding || parameters.envMapEncoding || parameters.emissiveMapEncoding) ? ShaderChunk['encodings_pars_fragment'] : '', // this code is required here because it is used by the various encoding/decoding function defined below
            parameters.mapEncoding ? getTexelDecodingFunction('mapTexelToLinear', parameters.mapEncoding) : '',
            parameters.envMapEncoding ? getTexelDecodingFunction('envMapTexelToLinear', parameters.envMapEncoding) : '',
            parameters.emissiveMapEncoding ? getTexelDecodingFunction('emissiveMapTexelToLinear', parameters.emissiveMapEncoding) : '',
            parameters.outputEncoding ? getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding) : '',

            parameters.depthPacking ? '#define DEPTH_PACKING ' + material.depthPacking : '',

            '\n'

         ].filter(filterEmptyLine).join('\n');
         return result;

      }

      /**
       * 获取当前shader的uniforms参数列表，带addr信息
       */
      public getUniforms() {
         if (this.cachedUniforms === undefined) {
            this.cachedUniforms = new WebGLUniformsNode(this.gl, this.program, this.renderer);
         }
         return this.cachedUniforms;
      };

      // set up caching for attribute locations


      /**
       * 获取当前shader的attribute信息列表，带addr信息
       */
      public getAttributes() {

         if (this.cachedAttributes === undefined) {

            this.cachedAttributes = fetchAttributeLocations(this.gl, this.program);

         }

         return this.cachedAttributes;

      };

      // free resource
      /**
       * 删除当前program
       */
      public destroy() {

         this.gl.deleteProgram(this.program);
         this.program = undefined;

      };

      /**
       * 缓存uniform
       */
      public get uniforms() {
         console.warn('THREE.WebGLProgram: .uniforms is now .getUniforms().');
         return this.getUniforms();

      }

      /**
       * 缓存attribute
      */
      public get attributes() {

         console.warn('THREE.WebGLProgram: .attributes is now .getAttributes().');
         return this.getAttributes();
      }
   }

   /**
    * 一个shader的存储内容
    */
   export class WebGLShaderItem {
      public name: string;
      public uniforms: any;
      public vertexShader: string;
      public fragmentShader: string;
      constructor() {
      }
   }

}