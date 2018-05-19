module THREE {

   var context;

   export var AudioContext = {

      getContext: function () {

         if (context === undefined) {

            context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

         }
         return context;
      },

      setContext: function (value) {

         context = value;

      }

   };
}