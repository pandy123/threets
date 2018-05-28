module THREE {


    export class WebGLBufferRendererNode {
        public mode: number;
        public gl: WebGLContext;
        public extensions;
        public info: WebGLInfoNode;

        constructor(gl, extensions, info) {
            this.gl = gl;
            this.extensions = extensions;
            this.info = info;
            this.mode = null;


        }

        /**
         * 设置渲染模式
         * @param value 
         */
        public setMode(value) {
            this.mode = value;
        }

        /**
         * 渲染，并记录渲染过程信息
         */
        public render(start, count) {
            this.gl.drawArrays(this.mode, start, count);
            this.info.update(count, this.mode, null);
        }

        /**
         * 即使渲染
         */
        public renderInstances(geometry, start, count) {
            var extension = this.extensions.get('ANGLE_instanced_arrays');
            if (extension === null) {
                console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                return;
            }
            extension.drawArraysInstancedANGLE(this.mode, start, count, geometry.maxInstancedCount);
            this.info.update(count, this.mode, geometry.maxInstancedCount);
        }
    }

}
