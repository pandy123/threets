module Threets {
    export class DepthTexture extends Texture {
        public isDepthTexture: boolean = true;
        constructor(width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format) {
            super(null, mapping, wrapS, wrapT, magFilter, minFilter, format !== undefined ? format : DepthFormat,
                (type === undefined && format === DepthFormat) ? UnsignedShortType : ((type === undefined && format === DepthStencilFormat) ? UnsignedInt248Type : type),
                anisotropy);
            format = format !== undefined ? format : DepthFormat;
            if (format !== DepthFormat && format !== DepthStencilFormat) {
                throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat');
            }
            if (type === undefined && format === DepthFormat) type = UnsignedShortType;
            if (type === undefined && format === DepthStencilFormat) type = UnsignedInt248Type;
            this.image = { width: width, height: height };
            this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
            this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
            this.flipY = false;
            this.generateMipmaps = false;
        }
    }
}