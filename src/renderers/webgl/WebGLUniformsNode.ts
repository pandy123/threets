///<reference path="../../textures/Texture"/>
///<reference path="../../textures/CubeTexture"/>
module THREE {
    var emptyTexture = new Texture();
    var emptyCubeTexture = new CubeTexture();
    // --- Base for inner nodes (including the root) ---
    export class UniformContainer {
        public seq: Array<any>;
        public map: any;
        constructor() {
            this.seq = [];
            this.map = {};
        }
    }
    // --- Utilities ---
    // Array Caches (provide typed arrays for temporary by size)
    var arrayCacheF32 = [];
    var arrayCacheI32 = [];
    // Float32Array caches used for uploading Matrix uniforms
    var mat4array = new Float32Array(16);
    var mat3array = new Float32Array(9);
    var mat2array = new Float32Array(4);
    // Flattening for arrays of vectors and matrices
    export function flatten(array, nBlocks, blockSize) {
        var firstElem = array[0];
        if (firstElem <= 0 || firstElem > 0) return array;
        // unoptimized: ! isNaN( firstElem )
        // see http://jacksondunstan.com/articles/983
        var n = nBlocks * blockSize,
            r = arrayCacheF32[n];
        if (r === undefined) {
            r = new Float32Array(n);
            arrayCacheF32[n] = r;
        }
        if (nBlocks !== 0) {
            firstElem.toArray(r, 0);
            for (var i = 1, offset = 0; i !== nBlocks; ++i) {
                offset += blockSize;
                array[i].toArray(r, offset);
            }
        }
        return r;
    }
    export function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (var i = 0, l = a.length; i < l; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    export function copyArray(a, b) {
        for (var i = 0, l = b.length; i < l; i++) {
            a[i] = b[i];
        }
    }
    // Texture unit allocation
    export function allocTexUnits(renderer, n) {
        var r = arrayCacheI32[n];
        if (r === undefined) {
            r = new Int32Array(n);
            arrayCacheI32[n] = r;
        }
        for (var i = 0; i !== n; ++i)
            r[i] = renderer.allocTextureUnit();
        return r;
    }
    // --- Setters ---
    // Note: Defining these methods externally, because they come in a bunch
    // and this way their names minify.
    // Single scalar
    export function setValue1f(gl, v) {
        var cache = this.cache;
        if (cache[0] === v) return;
        gl.uniform1f(this.addr, v);
        cache[0] = v;
    }
    export function setValue1i(gl, v) {
        var cache = this.cache;
        if (cache[0] === v) return;
        gl.uniform1i(this.addr, v);
        cache[0] = v;
    }
    // Single float vector (from flat array or THREE.VectorN)
    export function setValue2fv(gl, v) {
        var cache = this.cache;
        if (v.x !== undefined) {
            if (cache[0] !== v.x || cache[1] !== v.y) {
                gl.uniform2f(this.addr, v.x, v.y);
                cache[0] = v.x;
                cache[1] = v.y;
            }
        } else {
            if (arraysEqual(cache, v)) return;
            gl.uniform2fv(this.addr, v);
            copyArray(cache, v);
        }
    }
    export function setValue3fv(gl, v) {
        var cache = this.cache;
        if (v.x !== undefined) {
            if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
                gl.uniform3f(this.addr, v.x, v.y, v.z);
                cache[0] = v.x;
                cache[1] = v.y;
                cache[2] = v.z;
            }
        } else if (v.r !== undefined) {
            if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
                gl.uniform3f(this.addr, v.r, v.g, v.b);
                cache[0] = v.r;
                cache[1] = v.g;
                cache[2] = v.b;
            }
        } else {
            if (arraysEqual(cache, v)) return;
            gl.uniform3fv(this.addr, v);
            copyArray(cache, v);
        }
    }
    export function setValue4fv(gl, v) {
        var cache = this.cache;
        if (v.x !== undefined) {
            if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
                gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
                cache[0] = v.x;
                cache[1] = v.y;
                cache[2] = v.z;
                cache[3] = v.w;
            }
        } else {
            if (arraysEqual(cache, v)) return;
            gl.uniform4fv(this.addr, v);
            copyArray(cache, v);
        }
    }
    // Single matrix (from flat array or MatrixN)
    export function setValue2fm(gl, v) {
        var cache = this.cache;
        var elements = v.elements;
        if (elements === undefined) {
            if (arraysEqual(cache, v)) return;
            gl.uniformMatrix2fv(this.addr, false, v);
            copyArray(cache, v);
        } else {
            if (arraysEqual(cache, elements)) return;
            mat2array.set(elements);
            gl.uniformMatrix2fv(this.addr, false, mat2array);
            copyArray(cache, elements);
        }
    }
    export function setValue3fm(gl, v) {
        var cache = this.cache;
        var elements = v.elements;
        if (elements === undefined) {
            if (arraysEqual(cache, v)) return;
            gl.uniformMatrix3fv(this.addr, false, v);
            copyArray(cache, v);
        } else {
            if (arraysEqual(cache, elements)) return;
            mat3array.set(elements);
            gl.uniformMatrix3fv(this.addr, false, mat3array);
            copyArray(cache, elements);
        }
    }
    export function setValue4fm(gl, v) {
        var cache = this.cache;
        var elements = v.elements;
        if (elements === undefined) {
            if (arraysEqual(cache, v)) return;
            gl.uniformMatrix4fv(this.addr, false, v);
            copyArray(cache, v);
        } else {
            if (arraysEqual(cache, elements)) return;
            mat4array.set(elements);
            gl.uniformMatrix4fv(this.addr, false, mat4array);
            copyArray(cache, elements);
        }
    }
    // Single texture (2D / Cube)
    export function setValueT1(gl, v, renderer) {
        var unit = renderer.allocTextureUnit();
        if (this.cache[0] !== unit) {
            gl.uniform1i(this.addr, unit);
            this.cache[0] = unit;
        }
        renderer.setTexture2D(v || emptyTexture, unit);
    }
    export function setValueT6(gl, v, renderer) {
        var unit = renderer.allocTextureUnit();
        if (this.cache[0] !== unit) {
            gl.uniform1i(this.addr, unit);
            this.cache[0] = unit;
        }
        renderer.setTextureCube(v || emptyCubeTexture, unit);
    }
    // Integer / Boolean vectors or arrays thereof (always flat arrays)
    export function setValue2iv(gl, v) {
        if (arraysEqual(this.cache, v)) return;
        gl.uniform2iv(this.addr, v);
        copyArray(this.cache, v);
    }
    export function setValue3iv(gl, v) {
        if (arraysEqual(this.cache, v)) return;
        gl.uniform3iv(this.addr, v);
        copyArray(this.cache, v);
    }
    export function setValue4iv(gl, v) {
        if (arraysEqual(this.cache, v)) return;
        gl.uniform4iv(this.addr, v);
        copyArray(this.cache, v);
    }
    // Helper to pick the right setter for the singular case
    export function getSingularSetter(type) {
        switch (type) {
            case 0x1406: return setValue1f; // FLOAT
            case 0x8b50: return setValue2fv; // _VEC2
            case 0x8b51: return setValue3fv; // _VEC3
            case 0x8b52: return setValue4fv; // _VEC4
            case 0x8b5a: return setValue2fm; // _MAT2
            case 0x8b5b: return setValue3fm; // _MAT3
            case 0x8b5c: return setValue4fm; // _MAT4
            case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
            case 0x8b60: return setValueT6; // SAMPLER_CUBE
            case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
            case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
            case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
            case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4
        }
    }
    // Array of scalars
    export function setValue1fv(gl, v) {
        gl.uniform1fv(this.addr, v);
    }
    export function setValue1iv(gl, v) {
        gl.uniform1iv(this.addr, v);
    }
    // Array of vectors (flat or from THREE classes)
    export function setValueV2a(gl, v) {
        gl.uniform2fv(this.addr, flatten(v, this.size, 2));
    }
    export function setValueV3a(gl, v) {
        gl.uniform3fv(this.addr, flatten(v, this.size, 3));
    }
    export function setValueV4a(gl, v) {
        gl.uniform4fv(this.addr, flatten(v, this.size, 4));
    }
    // Array of matrices (flat or from THREE clases)
    export function setValueM2a(gl, v) {
        gl.uniformMatrix2fv(this.addr, false, flatten(v, this.size, 4));
    }
    export function setValueM3a(gl, v) {
        gl.uniformMatrix3fv(this.addr, false, flatten(v, this.size, 9));
    }
    export function setValueM4a(gl, v) {
        gl.uniformMatrix4fv(this.addr, false, flatten(v, this.size, 16));
    }
    // Array of textures (2D / Cube)
    export function setValueT1a(gl, v, renderer) {
        var n = v.length,
            units = allocTexUnits(renderer, n);
        gl.uniform1iv(this.addr, units);
        for (var i = 0; i !== n; ++i) {
            renderer.setTexture2D(v[i] || emptyTexture, units[i]);
        }
    }
    export function setValueT6a(gl, v, renderer) {
        var n = v.length,
            units = allocTexUnits(renderer, n);
        gl.uniform1iv(this.addr, units);
        for (var i = 0; i !== n; ++i) {
            renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);
        }
    }
    // Helper to pick the right setter for a pure (bottom-level) array
    export function getPureArraySetter(type) {
        switch (type) {
            case 0x1406: return setValue1fv; // FLOAT
            case 0x8b50: return setValueV2a; // _VEC2
            case 0x8b51: return setValueV3a; // _VEC3
            case 0x8b52: return setValueV4a; // _VEC4
            case 0x8b5a: return setValueM2a; // _MAT2
            case 0x8b5b: return setValueM3a; // _MAT3
            case 0x8b5c: return setValueM4a; // _MAT4
            case 0x8b5e: return setValueT1a; // SAMPLER_2D
            case 0x8b60: return setValueT6a; // SAMPLER_CUBE
            case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
            case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
            case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
            case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4
        }
    }
    // --- Uniform Classes ---
    export function SingleUniform(id, activeInfo, addr) {
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.setValue = getSingularSetter(activeInfo.type);
        // this.path = activeInfo.name; // DEBUG
    }
    export function PureArrayUniform(id, activeInfo, addr) {
        this.id = id;
        this.addr = addr;
        this.size = activeInfo.size;
        this.setValue = getPureArraySetter(activeInfo.type);
        // this.path = activeInfo.name; // DEBUG
    }
    export class StructuredUniform extends UniformContainer {
        public id: any;
        constructor(id) {
            super();
            this.id = id;
        }
        public setValue(gl, value) {
            // Note: Don't need an extra 'renderer' parameter, since samplers
            // are not allowed in structured uniforms.
            var seq = this.seq;
            for (var i = 0, n = seq.length; i !== n; ++i) {
                var u = seq[i];
                u.setValue(gl, value[u.id]);
            }
        }
    }
    // --- Top-level ---
    // Parser - builds up the property tree from the path strings
    var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
    // extracts
    // 	- the identifier (member name or array index)
    //  - followed by an optional right bracket (found when array index)
    //  - followed by an optional left bracket or dot (type of subscript)
    //
    // Note: These portions can be read in a non-overlapping fashion and
    // allow straightforward parsing of the hierarchy that WebGL encodes
    // in the uniform names.
    export function addUniform(container, uniformObject) {
        container.seq.push(uniformObject);
        container.map[uniformObject.id] = uniformObject;
    }
    export function parseUniform(activeInfo, addr, container) {
        var path = activeInfo.name,
            pathLength = path.length;
        // reset RegExp object, because of the early exit of a previous run
        RePathPart.lastIndex = 0;
        while (true) {
            var match = RePathPart.exec(path),
                matchEnd = RePathPart.lastIndex,
                id: any = match[1],
                idIsIndex = match[2] === ']',
                subscript = match[3];
            if (idIsIndex) id = id | 0; // convert to integer
            if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {
                // bare name or "pure" bottom-level array "[0]" suffix
                addUniform(container, subscript === undefined ?
                    new SingleUniform(id, activeInfo, addr) :
                    new PureArrayUniform(id, activeInfo, addr));
                break;
            } else {
                // step into inner node / create it in case it doesn't exist
                var map = container.map, next = map[id];
                if (next === undefined) {
                    next = new StructuredUniform(id);
                    addUniform(container, next);
                }
                container = next;
            }
        }
    }
    // Root Container
    export class WebGLUniformsNode extends UniformContainer {
        public renderer: any;
        constructor(gl, program, renderer) {
            super();
            // UniformContainer.call(this);
            this.renderer = renderer;
            var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < n; ++i) {
                var info = gl.getActiveUniform(program, i),
                    addr = gl.getUniformLocation(program, info.name);
                parseUniform(info, addr, this);
            }
        }
        public setValue = function (gl, name, value) {
            var u = this.map[name];
            if (u !== undefined) u.setValue(gl, value, this.renderer);
        }
        public setOptional = function (gl, object, name) {
            var v = object[name];
            if (v !== undefined) this.setValue(gl, name, v);
        };


        // Static interface
        public static upload = function (gl, seq, values, renderer) {
            for (var i = 0, n = seq.length; i !== n; ++i) {
                var u = seq[i],
                    v = values[u.id];
                if (v.needsUpdate !== false) {
                    // note: always updating when .needsUpdate is undefined
                    u.setValue(gl, v.value, renderer);
                }
            }
        };
        public static seqWithValue = function (seq, values) {
            var r = [];
            for (var i = 0, n = seq.length; i !== n; ++i) {
                var u = seq[i];
                if (u.id in values) r.push(u);
            }
            return r;
        };
    }
}