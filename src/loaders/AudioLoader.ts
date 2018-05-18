module Threets {

   export class AudioLoader {
      public manager;
      constructor(manager) {
         this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
      }
      public load(url, onLoad, onProgress, onError) {

         var loader = new FileLoader(this.manager);
         loader.setResponseType('arraybuffer');
         loader.load(url, function (buffer) {

            var context = AudioContext.getContext();

            context.decodeAudioData(buffer, function (audioBuffer) {

               onLoad(audioBuffer);

            });

         }, onProgress, onError);

      }
   }
}

