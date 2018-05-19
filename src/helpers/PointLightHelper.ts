/// <reference path="../objects/Mesh.ts" />
module THREE {
    export class PointLightHelper extends Mesh {

        public color;
        public light;


        constructor(light, sphereSize, color) {
            super(null, null);
            this.light = light;
            this.light.updateMatrixWorld();
            this.color = color;
            var geometry = new SphereBufferGeometry(sphereSize, 4, 2, null, null, null, null);
            var material = new MeshBasicMaterial({ wireframe: true, fog: false });

            Mesh.call(this, geometry, material);

            this.matrix = this.light.matrixWorld;
            this.matrixAutoUpdate = false;

            this.update();
        }


        public dispose() {

            this.geometry.dispose();
            this.material.dispose();

        };

        public update() {

            if (this.color !== undefined) {

                this.material.color.set(this.color);

            } else {

                this.material.color.copy(this.light.color);

            }
        };

    }
}
