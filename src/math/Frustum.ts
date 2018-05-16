
module Threets {

   export class Frustum {
      /***视椎体平面集 */
      public planes: Array<Plane>;
      /**
       * 
       * @param p0 
       * @param p1 
       * @param p2 
       * @param p3 
       * @param p4 
       * @param p5 
       */
      constructor(p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane) {
         this.planes = new Array<Plane>();
         this.planes.push((p0 !== undefined) ? p0 : new Plane());
         this.planes.push((p1 !== undefined) ? p1 : new Plane());
         this.planes.push((p2 !== undefined) ? p2 : new Plane());
         this.planes.push((p3 !== undefined) ? p3 : new Plane());
         this.planes.push((p4 !== undefined) ? p4 : new Plane());
         this.planes.push((p5 !== undefined) ? p5 : new Plane());
      }

   }
}