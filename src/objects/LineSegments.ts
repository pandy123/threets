module Threets {
   export class LineSegments extends Line {
      public isLineSegments: boolean = true;
      constructor(geometry, material) {
         super(geometry, material);
         this.type = 'LineSegments';
      }

      public computeLineDistances() {
         //TODO:   
         var start = new Vector3();
         var end = new Vector3();
         var geometry = this.geometry;
         if (geometry.isBufferGeometry) {
            // we assume non-indexed geometry
            if (geometry.index === null) {
               var positionAttribute = geometry.attributes.position;
               var lineDistances = [];
               for (var i = 0, l = positionAttribute.count; i < l; i += 2) {
                  start.fromBufferAttribute(positionAttribute, i);
                  end.fromBufferAttribute(positionAttribute, i + 1);
                  lineDistances[i] = (i === 0) ? 0 : lineDistances[i - 1];
                  lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
               }
               geometry.addAttribute('lineDistance', new Float32BufferAttribute(lineDistances, 1));
            } else {
               console.warn('THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');
            }
         } else if (geometry.isGeometry) {
            var vertices = geometry.vertices;
            var lineDistances_1 = geometry.lineDistances;
            for (var i = 0, l = vertices.length; i < l; i += 2) {
               start.copy(vertices[i]);
               end.copy(vertices[i + 1]);
               lineDistances_1[i] = (i === 0) ? 0 : lineDistances_1[i - 1];
               lineDistances_1[i + 1] = lineDistances_1[i] + start.distanceTo(end);
            }
         }
         return this;
      };
   }
}