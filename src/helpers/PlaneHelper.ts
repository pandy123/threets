module Threets {
   export class PlaneHelper extends Line {
      public plane;
      public size;

      constructor(plane, size, hex) {
         super();

         this.type = 'PlaneHelper';

         this.plane = plane;

         this.size = (size === undefined) ? 1 : size;

         var color = (hex !== undefined) ? hex : 0xffff00;

         var positions = [1, - 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, - 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0];

         var geometry = new BufferGeometry();
         geometry.addAttribute('position', new Float32BufferAttribute(positions, 3));
         geometry.computeBoundingSphere();

         Line.call(this, geometry, new LineBasicMaterial({ color: color }));

         //

         var positions2 = [1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, 1, 1, - 1, - 1, 1, 1, - 1, 1];

         var geometry2 = new BufferGeometry();
         geometry2.addAttribute('position', new Float32BufferAttribute(positions2, 3));
         geometry2.computeBoundingSphere();

         this.add(new Mesh(geometry2, new MeshBasicMaterial({ color: color, opacity: 0.2, transparent: true, depthWrite: false })));

      }


      public updateMatrixWorld(force) {

         var scale = - this.plane.constant;

         if (Math.abs(scale) < 1e-8) scale = 1e-8; // sign does not matter

         this.scale.set(0.5 * this.size, 0.5 * this.size, scale);

         this.children[0].material.side = (scale < 0) ? BackSide : FrontSide; // renderer flips side when determinant < 0; flipping not wanted here

         this.lookAt(this.plane.normal);

         super.updateMatrixWorld(force);

      };
   }
}
