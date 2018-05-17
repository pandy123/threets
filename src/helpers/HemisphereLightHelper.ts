module Threets {
   export class HemisphereLightHelper extends Object3D {
      public light;
      public color;
      public material;
      public children: any;

      constructor(light, size, color) {

         super();

         this.light = light;
         this.light.updateMatrixWorld();

         this.matrix = light.matrixWorld;
         this.matrixAutoUpdate = false;

         this.color = color;

         var geometry = new OctahedronBufferGeometry(size);
         geometry.rotateY(Math.PI * 0.5);

         this.material = new MeshBasicMaterial({ wireframe: true, fog: false });
         if (this.color === undefined) this.material.vertexColors = VertexColors;

         var position = geometry.getAttribute('position');
         var colors = new Float32Array(position.count * 3);

         geometry.addAttribute('color', new BufferAttribute(colors, 3));

         this.add(new Mesh(geometry, this.material));

         this.update();

      }

      public dispose() {

         this.children[0].geometry.dispose();
         this.children[0].material.dispose();

      };

      public update() {
         var vector = new Vector3();
         var color1 = new Color(null);
         var color2 = new Color(null);

         var mesh = this.children[0];

         if (this.color !== undefined) {

            this.material.color.set(this.color);

         } else {

            var colors = mesh.geometry.getAttribute('color');

            color1.copy(this.light.color);
            color2.copy(this.light.groundColor);

            for (var i = 0, l = colors.count; i < l; i++) {

               var color = (i < (l / 2)) ? color1 : color2;

               colors.setXYZ(i, color.r, color.g, color.b);

            }

            colors.needsUpdate = true;

         }

         mesh.lookAt(vector.setFromMatrixPosition(this.light.matrixWorld).negate());

      };
   }
}
