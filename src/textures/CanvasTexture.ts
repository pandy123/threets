module Threets {
   export class CanvasTexture extends Texture {
      public isCanvasTexture: boolean = true;
      constructor(canvas?, mapping?, wrapS?, wrapT?, magFilter?, minFilter?, format?, type?, anisotropy?) {
         super(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
         this.needsUpdate = true;
      }
   }
}