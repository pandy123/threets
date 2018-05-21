module THREE {

    export class WebGLBackgroundNode {
        public renderer;
        public clearColor;
        public clearAlpha;
        public planeCamera;
        public planeMesh;
        public boxMesh;
        public state;
        public objects;
        public premultipliedAlpha;
        constructor(renderer, state, objects, premultipliedAlpha) {


            this.clearColor = new Color(0x000000);
            this.clearAlpha = 0;
            this.planeCamera = null;
            this.planeMesh = null;
            this.boxMesh = null;
            this.renderer = renderer;
            this.state = state;
            this.objects = objects;
            this.premultipliedAlpha = premultipliedAlpha;

        }

        public getClearColor() {

            return this.clearColor;

        }
        setClearColor(color, alpha) {

            this.clearColor.set(color);
            this.clearAlpha = alpha !== undefined ? alpha : 1;
            this.setClear(this.clearColor, this.clearAlpha);

        }
        public getClearAlpha() {

            return this.clearAlpha;

        }
        public setClearAlpha(alpha) {

            this.clearAlpha = alpha;
            this.setClear(this.clearColor, this.clearAlpha);

        }

        public render(renderList, scene, camera, forceClear) {
            var background = scene.background;
            if (background === null) {
                this.setClear(this.clearColor, this.clearAlpha);
            } else if (background && background.isColor) {
                this.setClear(background, 1);
                forceClear = true;
            }

            if (this.renderer.autoClear || forceClear) {
                this.renderer.clear(this.renderer.autoClearColor, this.renderer.autoClearDepth, this.renderer.autoClearStencil);
            }

            if (background && background.isCubeTexture) {

                if (this.boxMesh === undefined) {
                    this.boxMesh = new Mesh(
                        new BoxBufferGeometry(1, 1, 1, null, null, null),
                        new ShaderMaterial({
                            uniforms: ShaderLib.cube.uniforms,
                            vertexShader: ShaderLib.cube.vertexShader,
                            fragmentShader: ShaderLib.cube.fragmentShader,
                            side: BackSide,
                            depthTest: true,
                            depthWrite: false,
                            fog: false
                        })
                    );

                    this.boxMesh.geometry.removeAttribute('normal');
                    this.boxMesh.geometry.removeAttribute('uv');

                    this.boxMesh.onBeforeRender = function (renderer, scene, camera) {

                        this.matrixWorld.copyPosition(camera.matrixWorld);

                    };

                    this.objects.update(this.boxMesh);

                }

                this.boxMesh.material.uniforms.tCube.value = background;

                renderList.push(this.boxMesh, this.boxMesh.geometry, this.boxMesh.material, 0, null);

            } else if (background && background.isTexture) {

                if (this.planeCamera === undefined) {

                    this.planeCamera = new OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

                    this.planeMesh = new Mesh(
                        new PlaneBufferGeometry(2, 2, null, null),
                        new MeshBasicMaterial({ depthTest: false, depthWrite: false, fog: false })
                    );
                    this.objects.update(this.planeMesh);
                }

                this.planeMesh.material.map = background;

                // TODO Push this to renderList

                this.renderer.renderBufferDirect(this.planeCamera, null, this.planeMesh.geometry, this.planeMesh.material, this.planeMesh, null);

            }

        }

        public setClear(color, alpha) {

            this.state.buffers.color.setClear(color.r, color.g, color.b, alpha, this.premultipliedAlpha);

        }

    }

}
