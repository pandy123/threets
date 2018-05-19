module THREE {
   //TODO:
   declare var SpriteMaterial;
   export class Sprite extends Object3D {
      center: Vector2;
      material: any;
      public isSprite: boolean = true;
      constructor(material) {
         super();
         this.type = 'Sprite';
         this.material = (material !== undefined) ? material : new SpriteMaterial();
         this.center = new Vector2(0.5, 0.5);
      }

      public raycast(raycaster?, intersects?) {
         //TODO:
         var intersectPoint = new Vector3();
         var worldPosition = new Vector3();
         var worldScale = new Vector3();
         worldPosition.setFromMatrixPosition(this.matrixWorld);
         raycaster.ray.closestPointToPoint(worldPosition, intersectPoint);
         worldScale.setFromMatrixScale(this.matrixWorld);
         var guessSizeSq = worldScale.x * worldScale.y / 4;
         if (worldPosition.distanceToSquared(intersectPoint) > guessSizeSq) return;
         var distance = raycaster.ray.origin.distanceTo(intersectPoint);
         if (distance < raycaster.near || distance > raycaster.far) return;
         intersects.push({
            distance: distance,
            point: intersectPoint.clone(),
            face: null,
            object: this
         });
      }
      public clone() {
         return new Sprite(this.material).copy(this);
      }
      public copy(source) {
         //Object3D.prototype.copy.call(this, source);
         this.copy(source);
         if (source.center !== undefined) this.center.copy(source.center);
         return this;
      }
   }
}
