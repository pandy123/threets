
module THREE {

   export class MaterialShaderEnum {
      public static MeshDepthMaterial: string = 'depth';
      public static MeshDistanceMaterial: string = 'distanceRGBA';
      public static MeshNormalMaterial: string = 'normal';
      public static MeshBasicMaterial: string = 'basic';
      public static MeshLambertMaterial: string = 'lambert';
      public static MeshPhongMaterial: string = 'phong';
      public static MeshToonMaterial: string = 'phong';
      public static MeshStandardMaterial: string = 'physical';
      public static MeshPhysicalMaterial: string = 'physical';
      public static LineBasicMaterial: string = 'basic';
      public static LineDashedMaterial: string = 'dashed';
      public static PointsMaterial: string = 'points';
      public static ShadowMaterial: string = 'shadow';
   }


   export class WebGLProgramsNode {
      public renderer;
      public extensions;
      public capabilities;
      public programs: Array<WebGLProgramNode>;
      public shaderIDs: any;;
      public parameterNames;

      constructor(renderer, extensions, capabilities) {

         this.programs = new Array<WebGLProgramNode>();
         this.renderer = renderer;
         this.extensions = extensions;
         this.capabilities = capabilities;
         this.shaderIDs = MaterialShaderEnum;
         // this.shaderIDs = {
         //    MeshDepthMaterial: 'depth',
         //    MeshDistanceMaterial: 'distanceRGBA',
         //    MeshNormalMaterial: 'normal',
         //    MeshBasicMaterial: 'basic',
         //    MeshLambertMaterial: 'lambert',
         //    MeshPhongMaterial: 'phong',
         //    MeshToonMaterial: 'phong',
         //    MeshStandardMaterial: 'physical',
         //    MeshPhysicalMaterial: 'physical',
         //    LineBasicMaterial: 'basic',
         //    LineDashedMaterial: 'dashed',
         //    PointsMaterial: 'points',
         //    ShadowMaterial: 'shadow'
         // };

         this.parameterNames = [
            "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding",
            "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap",
            "roughnessMap", "metalnessMap", "gradientMap",
            "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp",
            "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
            "maxBones", "useVertexTexture", "morphTargets", "morphNormals",
            "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
            "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
            "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
            "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"
         ];
      }


      public allocateBones(object) {

         var skeleton = object.skeleton;
         var bones = skeleton.bones;

         if (this.capabilities.floatVertexTextures) {

            return 1024;

         } else {

            var nVertexUniforms = this.capabilities.maxVertexUniforms;
            var nVertexMatrices = Math.floor((nVertexUniforms - 20) / 4);

            var maxBones = Math.min(nVertexMatrices, bones.length);

            if (maxBones < bones.length) {

               console.warn('THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.');
               return 0;

            }
            return maxBones;
         }
      }

      public getTextureEncodingFromMap(map, gammaOverrideLinear) {

         var encoding;

         if (!map) {

            encoding = LinearEncoding;

         } else if (map.isTexture) {

            encoding = map.encoding;

         } else if (map.isWebGLRenderTarget) {

            console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead.");
            encoding = map.texture.encoding;

         }

         // add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
         if (encoding === LinearEncoding && gammaOverrideLinear) {

            encoding = GammaEncoding;

         }

         return encoding;

      }


      /**
       * // material 的配置参数，用来配置program的vertex 和fragment 元的shander内容
       * @param material 
       * @param lights 
       * @param shadows 
       * @param fog 
       * @param nClipPlanes 
       * @param nClipIntersection 
       * @param object 
       */
      public getParameters(material, lights, shadows, fog, nClipPlanes, nClipIntersection, object) {

         var shaderID = this.shaderIDs[material.type];

         // heuristics to create shader parameters according to lights in the scene
         // (not to blow over maxLights budget)

         var maxBones = object.isSkinnedMesh ? this.allocateBones(object) : 0;
         var precision = this.capabilities.precision;

         if (material.precision !== null) {

            precision = this.capabilities.getMaxPrecision(material.precision);

            if (precision !== material.precision) {

               console.warn('THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');

            }

         }

         var currentRenderTarget = this.renderer.getRenderTarget();

         // material 的配置参数，用来配置program的vertex 和fragment 元的shander内容
         var parameters = {
            shaderID: shaderID,

            precision: precision,
            supportsVertexTextures: this.capabilities.vertexTextures,
            outputEncoding: this.getTextureEncodingFromMap((!currentRenderTarget) ? null : currentRenderTarget.texture, this.renderer.gammaOutput),
            map: !!material.map,
            mapEncoding: this.getTextureEncodingFromMap(material.map, this.renderer.gammaInput),
            envMap: !!material.envMap,
            envMapMode: material.envMap && material.envMap.mapping,
            envMapEncoding: this.getTextureEncodingFromMap(material.envMap, this.renderer.gammaInput),
            envMapCubeUV: (!!material.envMap) && ((material.envMap.mapping === CubeUVReflectionMapping) || (material.envMap.mapping === CubeUVRefractionMapping)),
            lightMap: !!material.lightMap,
            aoMap: !!material.aoMap,
            emissiveMap: !!material.emissiveMap,
            emissiveMapEncoding: this.getTextureEncodingFromMap(material.emissiveMap, this.renderer.gammaInput),
            bumpMap: !!material.bumpMap,
            normalMap: !!material.normalMap,
            displacementMap: !!material.displacementMap,
            roughnessMap: !!material.roughnessMap,
            metalnessMap: !!material.metalnessMap,
            specularMap: !!material.specularMap,
            alphaMap: !!material.alphaMap,

            gradientMap: !!material.gradientMap,

            combine: material.combine,

            vertexColors: material.vertexColors,

            fog: !!fog,
            useFog: material.fog,
            fogExp: (fog && fog.isFogExp2),

            flatShading: material.flatShading,

            sizeAttenuation: material.sizeAttenuation,
            logarithmicDepthBuffer: this.capabilities.logarithmicDepthBuffer,

            skinning: material.skinning && maxBones > 0,
            maxBones: maxBones,
            useVertexTexture: this.capabilities.floatVertexTextures,

            morphTargets: material.morphTargets,
            morphNormals: material.morphNormals,
            maxMorphTargets: this.renderer.maxMorphTargets,
            maxMorphNormals: this.renderer.maxMorphNormals,

            numDirLights: lights.directional.length,
            numPointLights: lights.point.length,
            numSpotLights: lights.spot.length,
            numRectAreaLights: lights.rectArea.length,
            numHemiLights: lights.hemi.length,

            numClippingPlanes: nClipPlanes,
            numClipIntersection: nClipIntersection,

            dithering: material.dithering,

            shadowMapEnabled: this.renderer.shadowMap.enabled && object.receiveShadow && shadows.length > 0,
            shadowMapType: this.renderer.shadowMap.type,

            toneMapping: this.renderer.toneMapping,
            physicallyCorrectLights: this.renderer.physicallyCorrectLights,

            premultipliedAlpha: material.premultipliedAlpha,

            alphaTest: material.alphaTest,
            doubleSided: material.side === DoubleSide,
            flipSided: material.side === BackSide,

            depthPacking: (material.depthPacking !== undefined) ? material.depthPacking : false

         };

         return parameters;

      };

      /**
       * 根据配置参数 顺序连接形成program的标识字符串
       * @param material 
       * @param parameters 
       */
      public getProgramCode(material, parameters) {
         var array = [];
         if (parameters.shaderID) {
            array.push(parameters.shaderID);
         } else {
            array.push(material.fragmentShader);
            array.push(material.vertexShader);
         }

         if (material.defines !== undefined) {
            for (var name in material.defines) {
               array.push(name);
               array.push(material.defines[name]);
            }
         }

         for (var i = 0; i < this.parameterNames.length; i++) {
            array.push(parameters[this.parameterNames[i]]);
         }

         array.push(material.onBeforeCompile.toString());
         array.push(this.renderer.gammaOutput);
         return array.join();

      };

      /**
       * 根据唯一标识符code 得到program
       * @param material 
       * @param shader 
       * @param parameters 
       * @param code program 唯一标识符
       */
      public acquireProgram(material: Material, shader: WebGLShaderItem, parameters, code: string) {

         var program;

         // Check if code has been already compiled
         for (var p = 0, pl = this.programs.length; p < pl; p++) {

            var programInfo = this.programs[p];

            if (programInfo.code === code) {

               program = programInfo;
               ++program.usedTimes;

               break;

            }

         }

         if (program === undefined) {

            program = new WebGLProgramNode(this.renderer, this.extensions, code, material, shader, parameters);
            this.programs.push(program);

         }

         return program;

      };

      public releaseProgram(program) {

         if (--program.usedTimes === 0) {

            // Remove from unordered set
            var i = this.programs.indexOf(program);
            this.programs[i] = this.programs[this.programs.length - 1];
            this.programs.pop();

            // Free WebGL resources
            program.destroy();

         }

      };

      // Exposed for resource monitoring & error feedback via renderer.info:
   }

}
