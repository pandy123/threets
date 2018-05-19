module THREE {
   export class VideoTexture extends Texture {
      public isVideoTexture: boolean = true;

      constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
         super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
         this.generateMipmaps = false;
      }

      public update() {
         var video = this.image;
         if (video.readyState >= video.HAVE_CURRENT_DATA) {
            this.needsUpdate = true;
         }
      }
   }
}