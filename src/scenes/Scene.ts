module Threets {
   export class Scene extends Object3D {
      public autoUpdate: boolean;
      public overrideMaterial: any;
      public fog: any;
      public background: any;
      constructor() {
         super();
         this.type = 'Scene';
         this.background = null;
         this.fog = null;
         this.overrideMaterial = null;
         this.autoUpdate = true; // checked by the renderer
      }
      public copy(source, recursive) {
         Object3D.prototype.copy.call(this, source, recursive);
         if (source.background !== null) this.background = source.background.clone();
         if (source.fog !== null) this.fog = source.fog.clone();
         if (source.overrideMaterial !== null) this.overrideMaterial = source.overrideMaterial.clone();
         this.autoUpdate = source.autoUpdate;
         this.matrixAutoUpdate = source.matrixAutoUpdate;
         return this;
      }
      public toJSON(meta) {
         var data = Object3D.prototype.toJSON.call(this, meta);
         if (this.background !== null) data.object.background = this.background.toJSON(meta);
         if (this.fog !== null) data.object.fog = this.fog.toJSON();
         return data;
      }
   }
}
