module THREE {

      export class renderRecoder {
            public frame: number;
            public calls: number;
            public triangles: number;
            public points: number;
            public lines: number;
            constructor() {
                  this.frame = 0;
                  this.calls = 0;
                  this.triangles = 0;
                  this.points = 0;
                  this.lines = 0;
            }
      }

      /**
       * 渲染过程信息
       */
      export class WebGLInfoNode {
            public memory;
            public gl: WebGLContext;
            public render;
            constructor(gl: WebGLContext) {
                  this.gl = gl;
                  this.memory = {
                        geometries: 0,
                        textures: 0
                  };
                  this.render = new renderRecoder();
            }

            /**
             * 更新渲染过程记录的信息
             */
            public update(count: number, mode: number, instanceCount?: number) {
                  instanceCount = instanceCount || 1;
                  this.render.calls++;
                  switch (mode) {
                        case this.gl.TRIANGLES:
                              this.render.triangles += instanceCount * (count / 3);
                              break;
                        case this.gl.TRIANGLE_STRIP:
                        case this.gl.TRIANGLE_FAN:
                              this.render.triangles += instanceCount * (count - 2);
                              break;
                        case this.gl.LINES:
                              this.render.lines += instanceCount * (count / 2);
                              break;
                        case this.gl.LINE_STRIP:
                              this.render.lines += instanceCount * (count - 1);
                              break;
                        case this.gl.LINE_LOOP:
                              this.render.lines += instanceCount * count;
                              break;
                        case this.gl.POINTS:
                              this.render.points += instanceCount * count;
                              break;
                        default:
                              console.error('THREE.WebGLInfo: Unknown draw mode:', mode);
                              break;
                  }
            }

            /**
             * 重新设置
             */
            public reset() {
                  this.render.frame++;
                  this.render.calls = 0;
                  this.render.triangles = 0;
                  this.render.points = 0;
                  this.render.lines = 0;
            }
      }


}
