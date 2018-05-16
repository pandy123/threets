
module Threets {
   export class Clock {

      public autoStart: boolean;
      public startTime: number;
      public oldTime: number;
      public elapsedTime: number;
      public running: boolean;

      constructor(autoStart: boolean) {
         this.startTime = 0;
         this.oldTime = 0;
         this.elapsedTime = 0;
         this.running = false;
      }

      public start() {

         this.startTime = (typeof performance === 'undefined' ? Date : performance).now(); // see #10732

         this.oldTime = this.startTime;
         this.elapsedTime = 0;
         this.running = true;

      }

      public stop() {

         this.getElapsedTime();
         this.running = false;
         this.autoStart = false;
      }


      public getElapsedTime() {

         this.getDelta();
         return this.elapsedTime;
      }


      public getDelta() {

         var diff = 0;

         if (this.autoStart && !this.running) {

            this.start();
            return 0;

         }

         if (this.running) {

            var newTime = (typeof performance === 'undefined' ? Date : performance).now();

            diff = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;

            this.elapsedTime += diff;

         }

         return diff;

      }

   }
}