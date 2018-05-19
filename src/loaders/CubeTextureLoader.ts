module THREE {
   export class CubeTextureLoader {

      public manager;
      public crossOrigin;
      public path;

      constructor(manager) {
         this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
         this.crossOrigin = 'Anonymous';
      }

      public load(urls, onLoad, onProgress, onError) {

         var texture = new CubeTexture();

         var loader = new ImageLoader(this.manager);
         loader.setCrossOrigin(this.crossOrigin);
         loader.setPath(this.path);

         var loaded = 0;

         function loadTexture(i) {

            loader.load(urls[i], function (image) {

               (texture as any).images[i] = image;

               loaded++;

               if (loaded === 6) {

                  texture.needsUpdate = true;

                  if (onLoad) onLoad(texture);

               }

            }, undefined, onError);

         }

         for (var i = 0; i < urls.length; ++i) {

            loadTexture(i);

         }

         return texture;

      }

      setCrossOrigin(value) {

         this.crossOrigin = value;
         return this;

      }

      setPath(value) {
         this.path = value;
         return this;

      }
   }
}
