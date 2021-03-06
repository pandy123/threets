/// <reference path="./Light.ts" />
module THREE {

    export class AmbientLight extends Light {
        public type;
        public castShadow;
        public isAmbientLight;
        constructor(color, intensity) {
            super(color, intensity)
            this.type = 'AmbientLight';
            this.castShadow = undefined;
            this.isAmbientLight = true;
        }
    }

}

