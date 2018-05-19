module THREE {

   export class AnimationLoader {
      public manager;
      constructor(manager) {
         this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
      }

      public load(url, onLoad, onProgress, onError) {

         var scope = this;
         var loader = new FileLoader(scope.manager);
         loader.load(url, function (text) {
            onLoad(scope.parse(JSON.parse(text), null));
         }, onProgress, onError);

      }

      public parse(json, onLoad) {

         var animations = [];

         for (var i = 0; i < json.length; i++) {

            var clip = AnimationClip.parse(json[i]);

            animations.push(clip);

         }
         onLoad(animations);
      }
   }
}