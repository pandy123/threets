module THREE {
    export class CubeTexture extends Texture {

        constructor(images?, mapping?, wrapS?, wrapT?, magFilter?, minFilter?, format?, type?, anisotropy?, encoding?) {
            super(images !== undefined ? images : [], mapping !== undefined ? mapping : CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
            this.flipY = false;
        }
        //   public set image(value) {
        //      this.image = value;
        //   }
        //   public get image() {
        //      return this.image;
        //   }
    }
}
