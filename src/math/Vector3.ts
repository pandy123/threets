/// <reference path="./Quaternion.ts" />
module Threets {
    declare var _Math: any;
    export class Vector3 {
        public x: number;
        public y: number;
        public z: number;
        public isVector3: boolean = true;
        constructor(x?: number, y?: number, z?: number) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }

        public set(x: number, y: number, z: number): Vector3 {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }

        public setScalar(scalar: number): Vector3 {
            this.x = scalar;
            this.y = scalar;
            this.z = scalar;
            return this;
        }

        public setX(x: number): Vector3 {
            this.x = x;
            return this;
        }

        public setY(y: number): Vector3 {
            this.y = y;
            return this;
        }

        public setZ(z: number): Vector3 {
            this.z = z;
            return this;
        }

        public setComponent(index: number, value: number): Vector3 {
            switch (index) {
                case 0: this.x = value; break;
                case 1: this.y = value; break;
                case 2: this.z = value; break;
                default: throw new Error('index is out of range: ' + index);
            }
            return this;
        }

        public getComponent(index: number) {
            switch (index) {
                case 0: return this.x;
                case 1: return this.y;
                case 2: return this.z;
                default: throw new Error('index is out of range: ' + index);
            }
        }

        public clone(): Vector3 {
            return new Vector3(this.x, this.y, this.z);
        }

        public copy(v: Vector3): Vector3 {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
        }

        public add(v: Vector3, w?: Vector3): Vector3 {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                return this.addVectors(v, w);
            }
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }

        public addScalar(s: number): Vector3 {
            this.x += s;
            this.y += s;
            this.z += s;
            return this;
        }

        public addVectors(a: Vector3, b: Vector3): Vector3 {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            return this;
        }

        public addScaledVector(v: Vector3, s: number): Vector3 {
            this.x += v.x * s;
            this.y += v.y * s;
            this.z += v.z * s;
            return this;
        }

        public sub(v: Vector3, w?: Vector3): Vector3 {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                return this.subVectors(v, w);
            }
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }

        public subScalar(s: number): Vector3 {
            this.x -= s;
            this.y -= s;
            this.z -= s;
            return this;
        }

        public subVectors(a: Vector3, b: Vector3): Vector3 {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            return this;
        }

        public multiply(v: Vector3, w: Vector3): Vector3 {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
                return this.multiplyVectors(v, w);
            }
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            return this;
        }

        public multiplyScalar(scalar: number): Vector3 {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }

        public multiplyVectors(a: Vector3, b: Vector3): Vector3 {
            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;
            return this;
        }

        //public applyEuler() {

        public static quaternion = new Quaternion();

        public applyEuler(euler: Euler): Vector3 {
            if (!(euler && euler.isEuler)) {
                console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
            }
            return this.applyQuaternion(Vector3.quaternion.setFromEuler(euler));
        }

        //public static quaternion = new Quaternion();
        // public applyAxisAngle() {
        public applyAxisAngle(axis: any, angle: any) {
            return this.applyQuaternion(Vector3.quaternion.setFromAxisAngle(axis, angle));
        }

        public applyMatrix3(m: any): Vector3 {
            var x = this.x, y = this.y, z = this.z;
            var e = m.elements;
            this.x = e[0] * x + e[3] * y + e[6] * z;
            this.y = e[1] * x + e[4] * y + e[7] * z;
            this.z = e[2] * x + e[5] * y + e[8] * z;
            return this;
        }

        public applyMatrix4(m: any): Vector3 {
            var x = this.x, y = this.y, z = this.z;
            var e = m.elements;
            var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
            this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
            return this;
        }

        public applyQuaternion(q: Quaternion): Vector3 {
            var x = this.x, y = this.y, z = this.z;
            var qx = q.x, qy = q.y, qz = q.z, qw = q.w;
            // calculate quat * vector
            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = - qx * x - qy * y - qz * z;
            // calculate result * inverse quat
            this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
            this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
            this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;
            return this;
        }

        public static matrix: any;//= new Matrix4();
        //@TODO
        // public project() {
        public project(camera: any) {
            Vector3.matrix.multiplyMatrices(camera.projectionMatrix, Vector3.matrix.getInverse(camera.matrixWorld));
            return this.applyMatrix4(Vector3.matrix);
        }

        //public static matrix = new Matrix4();
        // public unproject() {
        public unproject(camera: any) {
            //@TODO
            Vector3.matrix.multiplyMatrices(camera.matrixWorld, Vector3.matrix.getInverse(camera.projectionMatrix));
            return this.applyMatrix4(Vector3.matrix);
        }

        public transformDirection(m: any): Vector3 {
            // input: THREE.Matrix4 affine matrix
            // vector interpreted as a direction
            var x = this.x, y = this.y, z = this.z;
            var e = m.elements;
            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;
            return this.normalize();
        }

        public divide(v: Vector3): Vector3 {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            return this;
        }

        public divideScalar(scalar: number): Vector3 {
            return this.multiplyScalar(1 / scalar);
        }

        public min(v: Vector3): Vector3 {
            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
            this.z = Math.min(this.z, v.z);
            return this;
        }

        public max(v: Vector3): Vector3 {
            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
            this.z = Math.max(this.z, v.z);
            return this;
        }

        public clamp(min: Vector3, max: Vector3): Vector3 {
            // assumes min < max, componentwise
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));
            return this;
        }

        public static min = new Vector3();
        public static max = new Vector3();
        // public clampScalar() {
        public clampScalar(minVal: any, maxVal: any) {
            Vector3.min.set(minVal, minVal, minVal);
            Vector3.max.set(maxVal, maxVal, maxVal);
            return this.clamp(Vector3.min, Vector3.max);
        }

        public clampLength(min: any, max: any): Vector3 {
            var length = this.length();
            return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

        }

        public floor(): Vector3 {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            return this;
        }

        public ceil(): Vector3 {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            return this;
        }

        public round(): Vector3 {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            return this;
        }

        public roundToZero(): Vector3 {
            this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
            return this;
        }

        public negate(): Vector3 {
            this.x = - this.x;
            this.y = - this.y;
            this.z = - this.z;
            return this;
        }

        public dot(v: Vector3) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }

        // TODO lengthSquared?

        public lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        public length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        public manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }

        public normalize(): Vector3 {
            return this.divideScalar(this.length() || 1);
        }

        public setLength(length: number): Vector3 {
            return this.normalize().multiplyScalar(length);
        }

        public lerp(v: Vector3, alpha: number): Vector3 {
            this.x += (v.x - this.x) * alpha;
            this.y += (v.y - this.y) * alpha;
            this.z += (v.z - this.z) * alpha;
            return this;
        }

        public lerpVectors(v1: Vector3, v2: Vector3, alpha: number): Vector3 {
            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
        }

        public cross(v: Vector3, w?: Vector3): Vector3 {
            if (w !== undefined) {
                console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
                return this.crossVectors(v, w);
            }
            return this.crossVectors(this, v);
        }

        public crossVectors(a: Vector3, b: Vector3): Vector3 {
            var ax = a.x, ay = a.y, az = a.z;
            var bx = b.x, by = b.y, bz = b.z;
            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;
            return this;
        }

        public projectOnVector(vector: Vector3): Vector3 {
            var scalar = vector.dot(this) / vector.lengthSq();
            return this.copy(vector).multiplyScalar(scalar);
        }

        public static v1 = new Vector3();
        // public projectOnPlane() {
        public projectOnPlane(planeNormal: Vector3): Vector3 {
            Vector3.v1.copy(this).projectOnVector(planeNormal);
            return this.sub(Vector3.v1);
        }

        //public static v1 = new Vector3();
        // public reflect() {
        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length
        public reflect(normal: Vector3): Vector3 {
            return this.sub(Vector3.v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
        }

        public angleTo(v: Vector3): number {
            var theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));
            // clamp, to handle numerical problems
            return Math.acos(_Math.clamp(theta, - 1, 1));
        }

        public distanceTo(v: Vector3): number {

            return Math.sqrt(this.distanceToSquared(v));

        }

        public distanceToSquared(v: Vector3): number {
            var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
            return dx * dx + dy * dy + dz * dz;
        }

        public manhattanDistanceTo(v: Vector3): number {
            return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
        }

        public setFromSpherical(s: any): Vector3 {
            var sinPhiRadius = Math.sin(s.phi) * s.radius;
            this.x = sinPhiRadius * Math.sin(s.theta);
            this.y = Math.cos(s.phi) * s.radius;
            this.z = sinPhiRadius * Math.cos(s.theta);
            return this;
        }

        public setFromCylindrical(c: any): Vector3 {
            this.x = c.radius * Math.sin(c.theta);
            this.y = c.y;
            this.z = c.radius * Math.cos(c.theta);
            return this;
        }

        public setFromMatrixPosition(m: any): Vector3 {
            var e = m.elements;
            this.x = e[12];
            this.y = e[13];
            this.z = e[14];
            return this;
        }

        public setFromMatrixScale(m: any): Vector3 {
            var sx = this.setFromMatrixColumn(m, 0).length();
            var sy = this.setFromMatrixColumn(m, 1).length();
            var sz = this.setFromMatrixColumn(m, 2).length();
            this.x = sx;
            this.y = sy;
            this.z = sz;
            return this;
        }

        public setFromMatrixColumn(m: any, index: number): Vector3 {
            return this.fromArray(m.elements, index * 4);
        }

        public equals(v: Vector3): boolean {
            return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
        }

        public fromArray(array: Array<number>, offset: number): Vector3 {
            if (offset === undefined) offset = 0;
            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];
            return this;
        }

        public toArray(array: Array<number>, offset: number) {
            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;
            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;
            return array;
        }

        public fromBufferAttribute(attribute: any, index: number, offset?: number): Vector3 {
            if (offset !== undefined) {
                console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
            }
            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            this.z = attribute.getZ(index);
            return this;
        }
    }
}