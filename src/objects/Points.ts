module THREE {
   //TODO:
   declare var PointsMaterial;
   export class Points extends Object3D {
      material: any;
      geometry: any;
      public isPoints: boolean = true;
      constructor(geometry, material) {
         super();
         this.type = 'Points';
         this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
         this.material = material !== undefined ? material : new PointsMaterial({ color: Math.random() * 0xffffff });
      }
      public raycast(raycaster?, intersects?) {
         //TODO:
         var inverseMatrix = new Matrix4();
         var ray = new Ray();
         var sphere = new Sphere();
         var object = this;
         var geometry = this.geometry;
         var matrixWorld = this.matrixWorld;
         var threshold = raycaster.params.Points.threshold;
         // Checking boundingSphere distance to ray
         if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
         sphere.copy(geometry.boundingSphere);
         sphere.applyMatrix4(matrixWorld);
         sphere.radius += threshold;
         if (raycaster.ray.intersectsSphere(sphere) === false) return;
         //
         inverseMatrix.getInverse(matrixWorld);
         ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
         var localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
         var localThresholdSq = localThreshold * localThreshold;
         var position = new Vector3();
         var intersectPoint = new Vector3();
         function testPoint(point, index) {
            var rayPointDistanceSq = ray.distanceSqToPoint(point);
            if (rayPointDistanceSq < localThresholdSq) {
               ray.closestPointToPoint(point, intersectPoint);
               intersectPoint.applyMatrix4(matrixWorld);
               var distance = raycaster.ray.origin.distanceTo(intersectPoint);
               if (distance < raycaster.near || distance > raycaster.far) return;
               intersects.push({
                  distance: distance,
                  distanceToRay: Math.sqrt(rayPointDistanceSq),
                  point: intersectPoint.clone(),
                  index: index,
                  face: null,
                  object: object
               });
            }
         }
         if (geometry.isBufferGeometry) {
            var index = geometry.index;
            var attributes = geometry.attributes;
            var positions = attributes.position.array;
            if (index !== null) {
               var indices = index.array;
               for (var i = 0, il = indices.length; i < il; i++) {
                  var a = indices[i];
                  position.fromArray(positions, a * 3);
                  testPoint(position, a);
               }
            } else {
               for (var i = 0, l = positions.length / 3; i < l; i++) {
                  position.fromArray(positions, i * 3);
                  testPoint(position, i);
               }
            }
         } else {
            var vertices = geometry.vertices;
            for (var i: number = 0, l: number = vertices.length; i < l; i++) {
               testPoint(vertices[i], i);
            }
         }
      }
      public clone() {
         return new Points(this.geometry, this.material).copy(this);
      }
   }
}