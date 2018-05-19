module THREE {


    export class WebGLGeometries {

        public geometries;
        public gl;
        public attributes;
        public info;
        public wireframeAttributes;

        constructor(gl, attributes, info) {
            this.geometries = {};
            this.wireframeAttributes = {};
            this.gl = gl;
            this.attributes = attributes;
            this.info = info;
        }

        public onGeometryDispose(event) {
            var geometries = this.geometries;
            var geometry = event.target;
            var buffergeometry = geometries[geometry.id];

            if (buffergeometry.index !== null) {

                this.attributes.remove(buffergeometry.index);

            }

            for (var name in buffergeometry.attributes) {

                this.attributes.remove(buffergeometry.attributes[name]);

            }

            geometry.removeEventListener('dispose', this.onGeometryDispose);

            delete geometries[geometry.id];

            // TODO Remove duplicate code

            var attribute = this.wireframeAttributes[geometry.id];

            if (attribute) {

                this.attributes.remove(attribute);
                delete this.wireframeAttributes[geometry.id];

            }

            attribute = this.wireframeAttributes[buffergeometry.id];

            if (attribute) {

                this.attributes.remove(attribute);
                delete this.wireframeAttributes[buffergeometry.id];

            }

            //

            this.info.memory.geometries--;

        }

        public get(object, geometry) {

            var buffergeometry = this.geometries[geometry.id];

            if (buffergeometry) return buffergeometry;

            geometry.addEventListener('dispose', this.onGeometryDispose);

            if (geometry.isBufferGeometry) {

                buffergeometry = geometry;

            } else if (geometry.isGeometry) {

                if (geometry._bufferGeometry === undefined) {

                    geometry._bufferGeometry = new BufferGeometry().setFromObject(object);

                }
                buffergeometry = geometry._bufferGeometry;
            }

            this.geometries[geometry.id] = buffergeometry;
            this.info.memory.geometries++;
            return buffergeometry;

        }

        public update(geometry) {

            var index = geometry.index;
            var geometryAttributes = geometry.attributes;

            if (index !== null) {

                this.attributes.update(index, this.gl.ELEMENT_ARRAY_BUFFER);

            }

            for (var name in geometryAttributes) {

                this.attributes.update(geometryAttributes[name], this.gl.ARRAY_BUFFER);

            }

            // morph targets

            var morphAttributes = geometry.morphAttributes;

            for (var name in morphAttributes) {

                var array = morphAttributes[name];

                for (var i = 0, l = array.length; i < l; i++) {

                    this.attributes.update(array[i], this.gl.ARRAY_BUFFER);

                }

            }

        }

        public getWireframeAttribute(geometry) {

            var attribute = this.wireframeAttributes[geometry.id];

            if (attribute) return attribute;

            var indices = [];

            var geometryIndex = geometry.index;
            var geometryAttributes = geometry.attributes;

            // console.time( 'wireframe' );

            if (geometryIndex !== null) {

                var array = geometryIndex.array;

                for (var i = 0, l = array.length; i < l; i += 3) {

                    var a = array[i + 0];
                    var b = array[i + 1];
                    var c = array[i + 2];

                    indices.push(a, b, b, c, c, a);

                }

            } else {

                var array = geometryAttributes.position.array;

                for (var i = 0, count = (array.length / 3) - 1; i < count; i += 3) {

                    var a = i + 0 as any;
                    var b = i + 1 as any;
                    var c = i + 2 as any;

                    indices.push(a, b, b, c, c, a);

                }

            }

            // console.timeEnd( 'wireframe' );

            attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1, null);

            this.attributes.update(attribute, this.gl.ELEMENT_ARRAY_BUFFER);

            this.wireframeAttributes[geometry.id] = attribute;

            return attribute;

        }

    }
}
