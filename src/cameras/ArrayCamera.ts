/// <reference path="./PerspectiveCamera.ts" />
module THREE {

    export class ArrayCamera extends PerspectiveCamera {
        public cameras: any;
        public isArrayCamera: boolean;

        constructor(array) {
            super(null, null, null, null);
            this.cameras = array || [];
            this.isArrayCamera = true;
        }

    }
}