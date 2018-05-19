module THREE {
   export class LoadingManager {
      public isLoading: boolean = false;
      public itemsLoaded: number = 0;
      public itemsTotal: number = 0;
      public urlModifier: any = undefined;
      public onStart: any;
      public onLoad: any;
      public onProgress: any;
      public onError: any;
      constructor(onLoad?, onProgress?, onError?) {
         //var scope = this;
         this.onStart = undefined;
         this.onLoad = onLoad;
         this.onProgress = onProgress;
         this.onError = onError;
      }
      public itemStart(url) {
         this.itemsTotal++;
         if (this.isLoading === false) {
            if (this.onStart !== undefined) {
               this.onStart(url, this.itemsLoaded, this.itemsTotal);
            }
         }
         this.isLoading = true;
      }
      public itemEnd = function (url) {
         this.itemsLoaded++;
         if (this.onProgress !== undefined) {
            this.onProgress(url, this.itemsLoaded, this.itemsTotal);
         }
         if (this.itemsLoaded === this.itemsTotal) {
            this.isLoading = false;
            if (this.onLoad !== undefined) {
               this.onLoad();
            }
         }
      }
      public itemError(url) {
         if (this.onError !== undefined) {
            this.onError(url);
         }
      }
      public resolveURL(url) {
         if (this.urlModifier) {
            return this.urlModifier(url);
         }
         return url;
      }
      public setURLModifier(transform) {
         this.urlModifier = transform;
         return this;
      }
   }

   export var DefaultLoadingManager: LoadingManager = new LoadingManager()
}
