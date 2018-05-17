module Threets {
   export class Material extends EventDispatcher {
      public id: number;
      public uuid: string;
      public name: string;
      public type: string;
      public fog: boolean;
      public lights: boolean;
      public blending: number;
      public side: number;
      public flatShading: boolean;
      public vertexColors: number;
      public opacity: number;
      public transparent: boolean;
      public blendSrc: number;
      public blendDst: number;
      public blendEquation: number;
      public blendSrcAlpha: any;
      public blendDstAlpha: any;
      public blendEquationAlpha: any;
      public depthFunc: number;
      public depthTest: boolean;
      public depthWrite: boolean;
      public clippingPlanes: any;
      public clipIntersection: boolean;
      public clipShadows: boolean;
      public shadowSide: any;
      public colorWrite: boolean;
      public precision: any;
      public polygonOffset: boolean;
      public polygonOffsetFactor: number;
      public polygonOffsetUnits: number;
      public dithering: boolean;
      public alphaTest: number;
      public premultipliedAlpha: boolean;
      public overdraw: number;
      public visible: boolean;
      public userData: {};
      public needsUpdate: boolean;
      public isMaterial: boolean = true;
      public static materialId = 0;

      constructor() {
         super();
         this.id = Material.materialId++;
         this.uuid = _Math.generateUUID();
         this.name = '';
         this.type = 'Material';
         this.fog = true;
         this.lights = true;
         this.blending = NormalBlending;
         this.side = FrontSide;
         this.flatShading = false;
         this.vertexColors = NoColors; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors
         this.opacity = 1;
         this.transparent = false;
         this.blendSrc = SrcAlphaFactor;
         this.blendDst = OneMinusSrcAlphaFactor;
         this.blendEquation = AddEquation;
         this.blendSrcAlpha = null;
         this.blendDstAlpha = null;
         this.blendEquationAlpha = null;
         this.depthFunc = LessEqualDepth;
         this.depthTest = true;
         this.depthWrite = true;
         this.clippingPlanes = null;
         this.clipIntersection = false;
         this.clipShadows = false;
         this.shadowSide = null;
         this.colorWrite = true;
         this.precision = null; // override the renderer's default precision for this material
         this.polygonOffset = false;
         this.polygonOffsetFactor = 0;
         this.polygonOffsetUnits = 0;
         this.dithering = false;
         this.alphaTest = 0;
         this.premultipliedAlpha = false;
         this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
         this.visible = true;
         this.userData = {};
         this.needsUpdate = true;
      }

      public onBeforeCompile() { }
      public setValues(values) {
         if (values === undefined) return;
         for (var key in values) {
            var newValue = values[key];
            if (newValue === undefined) {
               console.warn("THREE.Material: '" + key + "' parameter is undefined.");
               continue;
            }
            // for backward compatability if shading is set in the constructor
            if (key === 'shading') {
               console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
               this.flatShading = (newValue === FlatShading) ? true : false;
               continue;
            }
            var currentValue = this[key];
            if (currentValue === undefined) {
               console.warn("THREE." + this.type + ": '" + key + "' is not a property of this material.");
               continue;
            }
            if (currentValue && currentValue.isColor) {
               currentValue.set(newValue);
            } else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {
               currentValue.copy(newValue);
            } else if (key === 'overdraw') {
               // ensure overdraw is backwards-compatible with legacy boolean type
               this[key] = Number(newValue);
            } else {
               this[key] = newValue;
            }
         }
      }
      public toJSON(meta) {
         var isRoot = (meta === undefined || typeof meta === 'string');
         if (isRoot) {
            meta = {
               textures: {},
               images: {}
            };
         }
         var data: any = {
            metadata: {
               version: 4.5,
               type: 'Material',
               generator: 'Material.toJSON'
            }
         };
         // standard Material serialization
         data.uuid = this.uuid;
         data.type = this.type;
         var this_self = this as any;
         if (this_self.name !== '') data.name = this_self.name;
         if (this_self.color && this_self.color.isColor) data.color = this_self.color.getHex();
         if (this_self.roughness !== undefined) data.roughness = this_self.roughness;
         if (this_self.metalness !== undefined) data.metalness = this_self.metalness;
         if (this_self.emissive && this_self.emissive.isColor) data.emissive = this_self.emissive.getHex();
         if (this_self.emissiveIntensity !== 1) data.emissiveIntensity = this_self.emissiveIntensity;
         if (this_self.specular && this_self.specular.isColor) data.specular = this_self.specular.getHex();
         if (this_self.shininess !== undefined) data.shininess = this_self.shininess;
         if (this_self.clearCoat !== undefined) data.clearCoat = this_self.clearCoat;
         if (this_self.clearCoatRoughness !== undefined) data.clearCoatRoughness = this_self.clearCoatRoughness;
         if (this_self.map && this_self.map.isTexture) data.map = this_self.map.toJSON(meta).uuid;
         if (this_self.alphaMap && this_self.alphaMap.isTexture) data.alphaMap = this_self.alphaMap.toJSON(meta).uuid;
         if (this_self.lightMap && this_self.lightMap.isTexture) data.lightMap = this_self.lightMap.toJSON(meta).uuid;
         if (this_self.aoMap && this_self.aoMap.isTexture) {
            data.aoMap = this_self.aoMap.toJSON(meta).uuid;
            data.aoMapIntensity = this_self.aoMapIntensity;
         }
         if (this_self.bumpMap && this_self.bumpMap.isTexture) {
            data.bumpMap = this_self.bumpMap.toJSON(meta).uuid;
            data.bumpScale = this_self.bumpScale;
         }
         if (this_self.normalMap && this_self.normalMap.isTexture) {
            data.normalMap = this_self.normalMap.toJSON(meta).uuid;
            data.normalScale = this_self.normalScale.toArray();
         }
         if (this_self.displacementMap && this_self.displacementMap.isTexture) {
            data.displacementMap = this_self.displacementMap.toJSON(meta).uuid;
            data.displacementScale = this_self.displacementScale;
            data.displacementBias = this_self.displacementBias;
         }
         if (this_self.roughnessMap && this_self.roughnessMap.isTexture) data.roughnessMap = this_self.roughnessMap.toJSON(meta).uuid;
         if (this_self.metalnessMap && this_self.metalnessMap.isTexture) data.metalnessMap = this_self.metalnessMap.toJSON(meta).uuid;
         if (this_self.emissiveMap && this_self.emissiveMap.isTexture) data.emissiveMap = this_self.emissiveMap.toJSON(meta).uuid;
         if (this_self.specularMap && this_self.specularMap.isTexture) data.specularMap = this_self.specularMap.toJSON(meta).uuid;
         if (this_self.envMap && this_self.envMap.isTexture) {
            data.envMap = this_self.envMap.toJSON(meta).uuid;
            data.reflectivity = this_self.reflectivity; // Scale behind envMap
         }
         if (this_self.gradientMap && this_self.gradientMap.isTexture) {
            data.gradientMap = this_self.gradientMap.toJSON(meta).uuid;
         }
         if (this_self.size !== undefined) data.size = this_self.size;
         if (this_self.sizeAttenuation !== undefined) data.sizeAttenuation = this_self.sizeAttenuation;
         if (this_self.blending !== NormalBlending) data.blending = this_self.blending;
         if (this_self.flatShading === true) data.flatShading = this_self.flatShading;
         if (this_self.side !== FrontSide) data.side = this_self.side;
         if (this_self.vertexColors !== NoColors) data.vertexColors = this_self.vertexColors;
         if (this_self.opacity < 1) data.opacity = this_self.opacity;
         if (this_self.transparent === true) data.transparent = this_self.transparent;
         data.depthFunc = this_self.depthFunc;
         data.depthTest = this_self.depthTest;
         data.depthWrite = this_self.depthWrite;
         // rotation (SpriteMaterial)
         if (this_self.rotation !== 0) data.rotation = this_self.rotation;
         if (this_self.linewidth !== 1) data.linewidth = this_self.linewidth;
         if (this_self.dashSize !== undefined) data.dashSize = this_self.dashSize;
         if (this_self.gapSize !== undefined) data.gapSize = this_self.gapSize;
         if (this_self.scale !== undefined) data.scale = this_self.scale;
         if (this_self.dithering === true) data.dithering = true;
         if (this_self.alphaTest > 0) data.alphaTest = this_self.alphaTest;
         if (this_self.premultipliedAlpha === true) data.premultipliedAlpha = this_self.premultipliedAlpha;
         if (this_self.wireframe === true) data.wireframe = this_self.wireframe;
         if (this_self.wireframeLinewidth > 1) data.wireframeLinewidth = this_self.wireframeLinewidth;
         if (this_self.wireframeLinecap !== 'round') data.wireframeLinecap = this_self.wireframeLinecap;
         if (this_self.wireframeLinejoin !== 'round') data.wireframeLinejoin = this_self.wireframeLinejoin;
         if (this_self.morphTargets === true) data.morphTargets = true;
         if (this_self.skinning === true) data.skinning = true;
         if (this_self.visible === false) data.visible = false;
         if (JSON.stringify(this_self.userData) !== '{}') data.userData = this_self.userData;
         // TODO: Copied from Object3D.toJSON
         function extractFromCache(cache) {
            var values = [];
            for (var key in cache) {
               var data = cache[key];
               delete data.metadata;
               values.push(data);
            }
            return values;
         }
         if (isRoot) {
            var textures = extractFromCache(meta.textures);
            var images = extractFromCache(meta.images);
            if (textures.length > 0) data.textures = textures;
            if (images.length > 0) data.images = images;
         }
         return data;
      }
      public clone() {
         return new Material().copy(this);
      }
      public copy(source) {
         this.name = source.name;
         this.fog = source.fog;
         this.lights = source.lights;
         this.blending = source.blending;
         this.side = source.side;
         this.flatShading = source.flatShading;
         this.vertexColors = source.vertexColors;
         this.opacity = source.opacity;
         this.transparent = source.transparent;
         this.blendSrc = source.blendSrc;
         this.blendDst = source.blendDst;
         this.blendEquation = source.blendEquation;
         this.blendSrcAlpha = source.blendSrcAlpha;
         this.blendDstAlpha = source.blendDstAlpha;
         this.blendEquationAlpha = source.blendEquationAlpha;
         this.depthFunc = source.depthFunc;
         this.depthTest = source.depthTest;
         this.depthWrite = source.depthWrite;
         this.colorWrite = source.colorWrite;
         this.precision = source.precision;
         this.polygonOffset = source.polygonOffset;
         this.polygonOffsetFactor = source.polygonOffsetFactor;
         this.polygonOffsetUnits = source.polygonOffsetUnits;
         this.dithering = source.dithering;
         this.alphaTest = source.alphaTest;
         this.premultipliedAlpha = source.premultipliedAlpha;
         this.overdraw = source.overdraw;
         this.visible = source.visible;
         this.userData = JSON.parse(JSON.stringify(source.userData));
         this.clipShadows = source.clipShadows;
         this.clipIntersection = source.clipIntersection;
         var srcPlanes = source.clippingPlanes,
            dstPlanes = null;
         if (srcPlanes !== null) {
            var n = srcPlanes.length;
            dstPlanes = new Array(n);
            for (var i = 0; i !== n; ++i)
               dstPlanes[i] = srcPlanes[i].clone();
         }
         this.clippingPlanes = dstPlanes;
         this.shadowSide = source.shadowSide;
         return this;
      }

      public dispose() {
         this.dispatchEvent({ type: 'dispose' });
      }
   }
}