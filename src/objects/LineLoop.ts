module THREE {
   export class LineLoop extends Line {
      public isLineLoop: boolean = true;
      constructor(geometry, material) {
         super(geometry, material);
         this.type = 'LineLoop';
      }
   }
}