module Threets {
   export class CubeTexture extends Texture {
      public isCubeTexture: boolean = true;
      constructor(images?, mapping?, wrapS?, wrapT?, magFilter?, minFilter?, format?, type?, anisotropy?, encoding?) {
         super(images !== undefined ? images : [], mapping !== undefined ? mapping : CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
         this.flipY = false;
      }
      public set image(value) {
         this.image = value;
      }
      public get image() {
         return this.image;
      }
   }
}
