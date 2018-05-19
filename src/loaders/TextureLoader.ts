module THREE {
   export class TextureLoader {
      public path: any;
      public manager: any;
      public crossOrigin: string = 'Anonymous';
      constructor(manager?) {
         this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
      }
      //Object.assign(TextureLoader.prototype, {
      // crossOrigin: 'Anonymous',
      public load(url, onLoad?, onProgress?, onError?) {
         var texture = new Texture();
         var loader = new ImageLoader(this.manager);
         loader.setCrossOrigin(this.crossOrigin);
         loader.setPath(this.path);
         loader.load(url, function (image) {
            texture.image = image;
            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
            var isJPEG = url.search(/\.(jpg|jpeg)$/) > 0 || url.search(/^data\:image\/jpeg/) === 0;
            texture.format = isJPEG ? RGBFormat : RGBAFormat;
            texture.needsUpdate = true;
            if (onLoad !== undefined) {
               onLoad(texture);
            }
         }, onProgress, onError);
         return texture;
      }
      public setCrossOrigin(value) {
         this.crossOrigin = value;
         return this;
      }
      public setPath(value) {
         this.path = value;
         return this;
      }
   }
}