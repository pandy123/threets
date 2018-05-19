
/**
 * @author WestLangley / http://github.com/WestLangley
 * @author zz85 / http://github.com/zz85
 * @author bhouston / http://clara.io
 *
 * Creates an arrow for visualizing directions
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  color - color in hex value
 *  headLength - Number
 *  headWidth - Number
 */

module THREE {
   var lineGeometry, coneGeometry;
   export class ArrowHelper extends Object3D {

      public BufferGeometry;
      public position;
      public line;
      public cone;

      constructor(dir, origin, length, color, headLength, headWidth) {
         super();
         // dir is assumed to be normalized
         if (color === undefined) color = 0xffff00;
         if (length === undefined) length = 1;
         if (headLength === undefined) headLength = 0.2 * length;
         if (headWidth === undefined) headWidth = 0.2 * headLength;
         if (lineGeometry === undefined) {
            lineGeometry = new BufferGeometry();
            lineGeometry.addAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3));
            coneGeometry = new CylinderBufferGeometry(0, 0.5, 1, 5, 1, null, null, null);
            coneGeometry.translate(0, - 0.5, 0);
         }
         this.position.copy(origin);
         this.line = new Line(lineGeometry, new LineBasicMaterial({ color: color }));
         this.line.matrixAutoUpdate = false;
         this.add(this.line);
         this.cone = new Mesh(coneGeometry, new MeshBasicMaterial({ color: color }));
         this.cone.matrixAutoUpdate = false;
         this.add(this.cone);
         this.setDirection(dir);
         this.setLength(length, headLength, headWidth);

      }

      public setDirection(dir) {

         var axis = new Vector3();
         var radians;

         // dir is assumed to be normalized

         if (dir.y > 0.99999) {

            this.quaternion.set(0, 0, 0, 1);

         } else if (dir.y < - 0.99999) {

            this.quaternion.set(1, 0, 0, 0);

         } else {

            axis.set(dir.z, 0, - dir.x).normalize();

            radians = Math.acos(dir.y);

            this.quaternion.setFromAxisAngle(axis, radians);

         }

      };


      public setLength(length, headLength, headWidth) {

         if (headLength === undefined) headLength = 0.2 * length;
         if (headWidth === undefined) headWidth = 0.2 * headLength;

         this.line.scale.set(1, Math.max(0, length - headLength), 1);
         this.line.updateMatrix();

         this.cone.scale.set(headWidth, headLength, headWidth);
         this.cone.position.y = length;
         this.cone.updateMatrix();

      };

      public setColor(color) {

         this.line.material.color.copy(color);
         this.cone.material.color.copy(color);

      };
   }
}




