
module THREE {

   export class WebGLRenderTarget extends EventDispatcher {
      public width;
      public height;
      public scissor;
      public scissorTest;
      public viewport;
      public texture;
      public depthBuffer;
      public depthTexture;
      public stencilBuffer;
      public isWebGLRenderTarget;
      constructor(width, height, options) {
         super();
         this.width = width;
         this.height = height;

         this.scissor = new Vector4(0, 0, width, height);
         this.scissorTest = false;

         this.viewport = new Vector4(0, 0, width, height);

         options = options || {};

         if (options.minFilter === undefined) options.minFilter = LinearFilter;

         this.texture = new Texture(undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);

         this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : true;

         this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
         this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
         this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
         this.isWebGLRenderTarget = true;

      }

      public setSize(width, height) {

         if (this.width !== width || this.height !== height) {

            this.width = width;
            this.height = height;

            this.dispose();

         }

         this.viewport.set(0, 0, width, height);
         this.scissor.set(0, 0, width, height);

      }

      public clone() {
         var target = new WebGLRenderTarget(null, null, null);
         target.copy(this);
         return target;
      }

      public copy(source) {

         this.width = source.width;
         this.height = source.height;

         this.viewport.copy(source.viewport);

         this.texture = source.texture.clone();

         this.depthBuffer = source.depthBuffer;
         this.stencilBuffer = source.stencilBuffer;
         this.depthTexture = source.depthTexture;

         return this;

      }

      public dispose() {

         this.dispatchEvent({ type: 'dispose' });

      }

   }

}
