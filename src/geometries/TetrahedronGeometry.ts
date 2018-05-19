module THREE {
   export class TetrahedronGeometry extends Geometry {
      constructor(radius, detail) {
         super(); this.type = 'TetrahedronGeometry';
         this.parameters = {
            radius: radius,
            detail: detail
         };
         this.fromBufferGeometry(new TetrahedronBufferGeometry(radius, detail));
         this.mergeVertices();
      }
   }
   // TetrahedronBufferGeometry
   export class TetrahedronBufferGeometry extends PolyhedronBufferGeometry {
      constructor(radius, detail) {
         var vertices = [
            1, 1, 1, - 1, - 1, 1, - 1, 1, - 1, 1, - 1, - 1
         ];
         var indices = [
            2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
         ];
         super(vertices, indices, radius, detail);
         this.type = 'TetrahedronBufferGeometry';
         this.parameters = {
            radius: radius,
            detail: detail
         };
      }
   }
}