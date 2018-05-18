module Threets {
   export class DataTextureLoader {

      public manager;
      public _parser;

      constructor(manager) {

         this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
         // override in sub classes
         this._parser = null;
      }

      public load(url, onLoad, onProgress, onError) {
         var scope = this;
         var texture = new DataTexture();

         var loader = new FileLoader(this.manager);
         loader.setResponseType('arraybuffer');

         loader.load(url, function (buffer) {

            var texData = scope._parser(buffer);

            if (!texData) return;

            if (undefined !== texData.image) {

               texture.image = texData.image;

            } else if (undefined !== texData.data) {

               texture.image.width = texData.width;
               texture.image.height = texData.height;
               texture.image.data = texData.data;

            }

            texture.wrapS = undefined !== texData.wrapS ? texData.wrapS : ClampToEdgeWrapping;
            texture.wrapT = undefined !== texData.wrapT ? texData.wrapT : ClampToEdgeWrapping;

            texture.magFilter = undefined !== texData.magFilter ? texData.magFilter : LinearFilter;
            texture.minFilter = undefined !== texData.minFilter ? texData.minFilter : LinearMipMapLinearFilter;

            texture.anisotropy = undefined !== texData.anisotropy ? texData.anisotropy : 1;

            if (undefined !== texData.format) {

               texture.format = texData.format;

            }
            if (undefined !== texData.type) {

               texture.type = texData.type;

            }

            if (undefined !== texData.mipmaps) {

               texture.mipmaps = texData.mipmaps;

            }

            if (1 === texData.mipmapCount) {

               texture.minFilter = LinearFilter;

            }

            texture.needsUpdate = true;

            if (onLoad) onLoad(texture, texData);

         }, onProgress, onError);

         return texture;
      }

   }
}
