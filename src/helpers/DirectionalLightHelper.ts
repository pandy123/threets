module THREE {
   export class DirectionalLightHelper extends Object3D {

      public light;
      public color;
      public lightPlane;
      public targetLine;

      constructor(light, size, color) {
         super();

         this.light = light;
         this.light.updateMatrixWorld();

         this.matrix = light.matrixWorld;
         this.matrixAutoUpdate = false;

         this.color = color;

         if (size === undefined) size = 1;

         var geometry = new BufferGeometry();
         geometry.addAttribute('position', new Float32BufferAttribute([
            - size, size, 0,
            size, size, 0,
            size, - size, 0,
            - size, - size, 0,
            - size, size, 0
         ], 3));

         var material = new LineBasicMaterial({ fog: false });

         this.lightPlane = new Line(geometry, material);
         this.add(this.lightPlane);

         geometry = new BufferGeometry();
         geometry.addAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 1], 3));

         this.targetLine = new Line(geometry, material);
         this.add(this.targetLine);

         this.update();

      }


      public dispose() {

         this.lightPlane.geometry.dispose();
         this.lightPlane.material.dispose();
         this.targetLine.geometry.dispose();
         this.targetLine.material.dispose();

      };

      public update() {
         var v1 = new Vector3();
         var v2 = new Vector3();
         var v3 = new Vector3();

         v1.setFromMatrixPosition(this.light.matrixWorld);
         v2.setFromMatrixPosition(this.light.target.matrixWorld);
         v3.subVectors(v2, v1);

         this.lightPlane.lookAt(v3);

         if (this.color !== undefined) {

            this.lightPlane.material.color.set(this.color);
            this.targetLine.material.color.set(this.color);

         } else {

            this.lightPlane.material.color.copy(this.light.color);
            this.targetLine.material.color.copy(this.light.color);

         }

         this.targetLine.lookAt(v3);
         this.targetLine.scale.z = v3.length();

      };

   }
}
