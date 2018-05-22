module THREE {



   function painterSortStable(a, b) {

      if (a.renderOrder !== b.renderOrder) {

         return a.renderOrder - b.renderOrder;

      } else if (a.program && b.program && a.program !== b.program) {

         return a.program.id - b.program.id;

      } else if (a.material.id !== b.material.id) {

         return a.material.id - b.material.id;

      } else if (a.z !== b.z) {

         return a.z - b.z;

      } else {

         return a.id - b.id;

      }

   }

   function reversePainterSortStable(a, b) {

      if (a.renderOrder !== b.renderOrder) {

         return a.renderOrder - b.renderOrder;

      } if (a.z !== b.z) {

         return b.z - a.z;

      } else {

         return a.id - b.id;

      }

   }

   /**
    * 渲染数据单元
    */
   export class RenderItem {
      public id: number;
      public object: any | Object3D;
      public geometry: BufferGeometry;
      public material: Material;
      public program: WebGLProgram;
      public renderOrder: number;
      public z: number;
      public group: any;
      constructor() {

      }
   }

   /**
    * 渲染对象列表
    */
   export class WebGLRenderListNode {
      /**全部渲染单元列表 */
      public renderItems: Array<RenderItem>;
      public renderItemsIndex: number;
      /**不透明渲染单元列表 */
      public opaque: Array<RenderItem>;
      /**透明渲染单元列表 */
      public transparent: Array<RenderItem>;
      constructor() {
         this.renderItems = [];
         this.renderItemsIndex = 0;
         this.opaque = [];
         this.transparent = [];
      }

      public init() {

         this.renderItemsIndex = 0;
         this.opaque.length = 0;
         this.transparent.length = 0;

      }

      /**
       * 存入值
       * @param object 
       * @param geometry 
       * @param material 
       * @param z 
       * @param group 
       */
      public push(object, geometry, material, z, group) {

         var renderItem = this.renderItems[this.renderItemsIndex];

         if (renderItem === undefined) {
            renderItem = new RenderItem();
            renderItem = {
               id: object.id,
               object: object,
               geometry: geometry,
               material: material,
               program: material.program,
               renderOrder: object.renderOrder,
               z: z,
               group: group
            };

            this.renderItems[this.renderItemsIndex] = renderItem;

         } else {

            renderItem.id = object.id;
            renderItem.object = object;
            renderItem.geometry = geometry;
            renderItem.material = material;
            renderItem.program = material.program;
            renderItem.renderOrder = object.renderOrder;
            renderItem.z = z;
            renderItem.group = group;

         }

         (material.transparent === true ? this.transparent : this.opaque).push(renderItem);

         this.renderItemsIndex++;

      }

      /**
       * 排序
       */
      public sort() {

         if (this.opaque.length > 1) this.opaque.sort(painterSortStable);
         if (this.transparent.length > 1) this.transparent.sort(reversePainterSortStable);

      }
   }

   export type WebGLRenderListNodeMap = {
      [key: string]: WebGLRenderListNode;
   }

   /**
    * renderlist 的列表
    */
   export class WebGLRenderListsNode {

      public lists: WebGLRenderListNodeMap;

      constructor() {
         this.lists = {};
      }

      public get(scene, camera) {

         var hash = scene.id + ',' + camera.id;
         var list = this.lists[hash];

         if (list === undefined) {
            // console.log( 'THREE.WebGLRenderLists:', hash );
            list = new WebGLRenderListNode();
            this.lists[hash] = list;

         }

         return list;

      }

      public dispose() {

         this.lists = {};

      }

   }

}


