module Threets {
   export class DataTexture extends Texture {
      public isDataTexture: boolean = true;
      constructor(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
         super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
         this.image = { data: data, width: width, height: height };
         this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
         this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
         this.generateMipmaps = false;
         this.flipY = false;
         this.unpackAlignment = 1;
      }
   }
}