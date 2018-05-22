module THREE {
   export class Scene extends Object3D {
      public autoUpdate: boolean;
      /**整个场景的全局材料 */
      public overrideMaterial: Material;
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
      /**
       * 复制
       * @param source 
       * @param recursive 
       */
      public copy(source, recursive) {
         super.copy(source, recursive);
         if (source.background !== null) this.background = source.background.clone();
         if (source.fog !== null) this.fog = source.fog.clone();
         if (source.overrideMaterial !== null) this.overrideMaterial = source.overrideMaterial.clone();
         this.autoUpdate = source.autoUpdate;
         this.matrixAutoUpdate = source.matrixAutoUpdate;
         return this;
      }
      /**
       * 生成json文件
       * @param meta 
       */
      public toJSON(meta) {
         var data = super.toJSON(meta);
         if (this.background !== null) data.object.background = this.background.toJSON(meta);
         if (this.fog !== null) data.object.fog = this.fog.toJSON();
         return data;
      }
   }
}
