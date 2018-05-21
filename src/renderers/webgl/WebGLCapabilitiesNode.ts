module THREE {


    export class WebGLCapabilitiesNode {
        public gl;
        public extensions;
        public parameters;
        public maxAnisotropy;
        public logarithmicDepthBuffer;
        public maxTextures;
        public maxVertexTextures;
        public maxTextureSize;
        public maxCubemapSize;
        public maxAttributes;
        public maxVertexUniforms;
        public maxVaryings;
        public maxFragmentUniforms;
        public vertexTextures;
        public floatFragmentTextures;
        public floatVertexTextures;
        public precision;

        constructor(gl, extensions, parameters) {

            this.maxAnisotropy = null;

            this.logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;
            this.maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            this.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
            this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            this.maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

            this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
            this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
            this.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
            this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);

            this.vertexTextures = this.maxVertexTextures > 0;
            this.floatFragmentTextures = !!extensions.get('OES_texture_float');
            this.floatVertexTextures = this.vertexTextures && this.floatFragmentTextures;
            this.precision = 'highp';

        }

        public getMaxAnisotropy() {

            if (this.maxAnisotropy !== undefined) return this.maxAnisotropy;

            var extension = this.extensions.get('EXT_texture_filter_anisotropic');

            if (extension !== null) {

                this.maxAnisotropy = this.gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);

            } else {

                this.maxAnisotropy = 0;

            }

            return this.maxAnisotropy;

        }

        public getMaxPrecision(precision) {
            this.precision = precision;
            if (precision === 'highp') {

                if (this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.HIGH_FLOAT).precision > 0 &&
                    this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.HIGH_FLOAT).precision > 0) {

                    return 'highp';

                }

                precision = 'mediump';
            }

            if (precision === 'mediump') {

                if (this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.MEDIUM_FLOAT).precision > 0 &&
                    this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.MEDIUM_FLOAT).precision > 0) {

                    return 'mediump';

                }

            }

            return 'lowp';

        }
    }
}
