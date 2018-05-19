/// <reference path="./MeshStandardMaterial.ts" />
module THREE {
    export class MeshPhysicalMaterial extends MeshStandardMaterial {
        public defines: any;// { 'PHYSICAL': string; };
        public type: string;
        public reflectivity: number;
        public clearCoat: number;
        public clearCoatRoughness: number;
        public isMeshPhysicalMaterial = true;
        constructor(parameters) {
            super();
            this.defines = { 'PHYSICAL': '' };
            this.type = 'MeshPhysicalMaterial';
            this.reflectivity = 0.5; // maps to F0 = 0.04
            this.clearCoat = 0.0;
            this.clearCoatRoughness = 0.0;
            this.setValues(parameters);
        }
        public copy(source) {
            super.copy(source);
            this.defines = { 'PHYSICAL': '' };
            this.reflectivity = source.reflectivity;
            this.clearCoat = source.clearCoat;
            this.clearCoatRoughness = source.clearCoatRoughness;
            return this;
        }
    }
}