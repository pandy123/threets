/// <reference path="./LightShadow.ts" />
module Threets {

    export class DirectionalLightShadow extends LightShadow {

        constructor() {
            super(new OrthographicCamera(- 5, 5, 5, - 5, 0.5, 500));
        }
    }
}

