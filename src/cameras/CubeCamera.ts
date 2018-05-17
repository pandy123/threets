module Threets {

   export class CubeCamera extends Object3D {
      public static cameraPX;
      public static cameraNX;
      public static cameraPY;
      public static cameraNY;
      public static cameraPZ;
      public static cameraNZ;

      public renderTarget: any;



      constructor(near, far, cubeResolution) {
         super();

         this.type = 'CubeCamera';

         var fov = 90, aspect = 1;

         var cameraPX = CubeCamera.cameraPX = new PerspectiveCamera(fov, aspect, near, far);
         cameraPX.up.set(0, - 1, 0);
         cameraPX.lookAt(new Vector3(1, 0, 0), null, null);
         this.add(cameraPX);

         var cameraNX = CubeCamera.cameraNX = new PerspectiveCamera(fov, aspect, near, far);
         cameraNX.up.set(0, - 1, 0);
         cameraNX.lookAt(new Vector3(- 1, 0, 0), null, null);
         this.add(cameraNX);

         var cameraPY = CubeCamera.cameraPY = new PerspectiveCamera(fov, aspect, near, far);
         cameraPY.up.set(0, 0, 1);
         cameraPY.lookAt(new Vector3(0, 1, 0), null, null);
         this.add(cameraPY);

         var cameraNY = CubeCamera.cameraNY = new PerspectiveCamera(fov, aspect, near, far);
         cameraNY.up.set(0, 0, - 1);
         cameraNY.lookAt(new Vector3(0, - 1, 0), null, null);
         this.add(cameraNY);

         var cameraPZ = CubeCamera.cameraPZ = new PerspectiveCamera(fov, aspect, near, far);
         cameraPZ.up.set(0, - 1, 0);
         cameraPZ.lookAt(new Vector3(0, 0, 1), null, null);
         this.add(cameraPZ);

         var cameraNZ = CubeCamera.cameraNZ = new PerspectiveCamera(fov, aspect, near, far);
         cameraNZ.up.set(0, - 1, 0);
         cameraNZ.lookAt(new Vector3(0, 0, - 1), null, null);
         this.add(cameraNZ);

         var options = { format: RGBFormat, magFilter: LinearFilter, minFilter: LinearFilter };

         this.renderTarget = new WebGLRenderTargetCube(cubeResolution, cubeResolution, options);
         this.renderTarget.texture.name = "CubeCamera";
      }

      public update(renderer, scene) {
         var cameraPX = CubeCamera.cameraPX;
         var cameraPY = CubeCamera.cameraPY;
         var cameraPZ = CubeCamera.cameraPZ;
         var cameraNX = CubeCamera.cameraNX;
         var cameraNY = CubeCamera.cameraNY;
         var cameraNZ = CubeCamera.cameraNZ;

         if (this.parent === null) this.updateMatrixWorld(null);

         var renderTarget = this.renderTarget;
         var generateMipmaps = renderTarget.texture.generateMipmaps;

         renderTarget.texture.generateMipmaps = false;

         renderTarget.activeCubeFace = 0;
         renderer.render(scene, cameraPX, renderTarget);

         renderTarget.activeCubeFace = 1;
         renderer.render(scene, cameraNX, renderTarget);

         renderTarget.activeCubeFace = 2;
         renderer.render(scene, cameraPY, renderTarget);

         renderTarget.activeCubeFace = 3;
         renderer.render(scene, cameraNY, renderTarget);

         renderTarget.activeCubeFace = 4;
         renderer.render(scene, cameraPZ, renderTarget);

         renderTarget.texture.generateMipmaps = generateMipmaps;

         renderTarget.activeCubeFace = 5;
         renderer.render(scene, cameraNZ, renderTarget);

         renderer.setRenderTarget(null);

      };

      public clear(renderer, color, depth, stencil) {

         var renderTarget = this.renderTarget;

         for (var i = 0; i < 6; i++) {

            renderTarget.activeCubeFace = i;
            renderer.setRenderTarget(renderTarget);

            renderer.clear(color, depth, stencil);

         }

         renderer.setRenderTarget(null);

      };

   }
}