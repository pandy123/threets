module Threets {
   export class ImageLoader {
      path: any;
      public manager: any;
      public crossOrigin: string = 'Anonymous';
      constructor(manager) {
         this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
      }
      //      Object.assign(ImageLoader.prototype, {
      public load(url, onLoad, onProgress, onError) {
         if (url === undefined) url = '';
         if (this.path !== undefined) url = this.path + url;
         url = this.manager.resolveURL(url);
         var scope = this;
         var cached = Cache.get(url);
         if (cached !== undefined) {
            scope.manager.itemStart(url);
            setTimeout(function () {
               if (onLoad) onLoad(cached);
               scope.manager.itemEnd(url);
            }, 0);
            return cached;
         }
         var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
         image.addEventListener('load', function () {
            Cache.add(url, this);
            if (onLoad) onLoad(this);
            scope.manager.itemEnd(url);
         }, false);
         /*
         image.addEventListener( 'progress', function ( event ) {
   
            if ( onProgress ) onProgress( event );
   
         }, false );
         */
         image.addEventListener('error', function (event) {
            if (onError) onError(event);
            scope.manager.itemEnd(url);
            scope.manager.itemError(url);
         }, false);
         if (url.substr(0, 5) !== 'data:') {
            if (this.crossOrigin !== undefined) (image as any).crossOrigin = this.crossOrigin;
         }
         scope.manager.itemStart(url);
         (image as any).src = url;
         return image;
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