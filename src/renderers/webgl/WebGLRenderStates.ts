module THREE {



   export class WebGLRenderState {
      public lights;
      public lightsArray;
      public shadowsArray;
      public spritesArray;
      public state;
      constructor() {
         this.lights = new WebGLLights();
         this.lightsArray = [];
         this.shadowsArray = [];
         this.spritesArray = [];
         this.state = {
            lightsArray: this.lightsArray,
            shadowsArray: this.shadowsArray,
            spritesArray: this.spritesArray,

            lights: this.lights
         };
      }

      public init() {

         this.lightsArray.length = 0;
         this.shadowsArray.length = 0;
         this.spritesArray.length = 0;

      }

      public pushLight(light) {

         this.lightsArray.push(light);

      }

      public pushShadow(shadowLight) {

         this.shadowsArray.push(shadowLight);

      }

      public pushSprite(shadowLight) {

         this.spritesArray.push(shadowLight);

      }

      public setupLights(camera) {

         this.lights.setup(this.lightsArray, this.shadowsArray, camera);

      }
   }

   export class WebGLRenderStates {
      public renderStates;
      constructor() {
         this.renderStates = {};
      }

      public get(scene, camera) {

         var hash = scene.id + ',' + camera.id;

         var renderState = this.renderStates[hash];

         if (renderState === undefined) {

            renderState = new WebGLRenderState();
            this.renderStates[hash] = renderState;

         }

         return renderState;

      }

      public dispose() {

         this.renderStates = {};

      }
   }
}


