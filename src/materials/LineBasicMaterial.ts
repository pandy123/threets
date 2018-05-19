/// <reference path="./Material.ts" />
module Threets {
    export class LineBasicMaterial extends Material {
        linejoin: string;
        linecap: string;
        linewidth: number;
        color: Color;
        public isLineBasicMaterial: boolean = true;
        constructor(parameters?) {
            super();
            this.type = 'LineBasicMaterial';
            this.color = new Color(0xffffff);
            this.linewidth = 1;
            this.linecap = 'round';
            this.linejoin = 'round';
            this.lights = false;
            this.setValues(parameters);
        }

        public copy(source) {
            super.copy(source);
            this.color.copy(source.color);
            this.linewidth = source.linewidth;
            this.linecap = source.linecap;
            this.linejoin = source.linejoin;
            return this;
        }
    }
}