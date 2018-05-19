module THREE {


      export class WebGLInfo {
            public memory;
            public gl;
            public render;
            constructor(gl) {
                  this.gl = gl;
                  this.memory = {
                        geometries: 0,
                        textures: 0
                  };

                  this.render = {
                        frame: 0,
                        calls: 0,
                        triangles: 0,
                        points: 0,
                        lines: 0
                  };
            }

            public update(count, mode, instanceCount) {

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

            public reset() {

                  this.render.frame++;
                  this.render.calls = 0;
                  this.render.triangles = 0;
                  this.render.points = 0;
                  this.render.lines = 0;

            }

            public getinstance() {
                  return {
                        memory: this.memory,
                        render: this.render,
                        programs: null,
                        autoReset: true,
                        reset: this.reset,
                        update: this.update
                  };
            }
      }


}
