module Threets {



   export class WebGLSpriteRenderer {
      public renderer;
      public gl;
      public state;
      public textures;
      public capabilities;
      public vertexBuffer;
      public elementBuffer;
      public program;
      public attributes;
      public uniforms;
      public texture;
      public spritePosition;
      public spriteRotation;
      public spriteScale;

      constructor(renderer, gl, state, textures, capabilities) {
         this.renderer = renderer;
         this.gl = gl;
         this.state = state;
         this.textures = textures;
         this.capabilities = capabilities;
         this.spritePosition = new Vector3();
         this.spriteRotation = new Quaternion();
         this.spriteScale = new Vector3();
      }

      public init() {

         var vertices = new Float32Array([
            - 0.5, - 0.5, 0, 0,
            0.5, - 0.5, 1, 0,
            0.5, 0.5, 1, 1,
            - 0.5, 0.5, 0, 1
         ]);

         var faces = new Uint16Array([
            0, 1, 2,
            0, 2, 3
         ]);

         this.vertexBuffer = this.gl.createBuffer();
         this.elementBuffer = this.gl.createBuffer();

         this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
         this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

         this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
         this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, faces, this.gl.STATIC_DRAW);

         this.program = this.createProgram();

         this.attributes = {
            position: this.gl.getAttribLocation(this.program, 'position'),
            uv: this.gl.getAttribLocation(this.program, 'uv')
         };
         var gl = this.gl;
         var program = this.program;
         this.uniforms = {
            uvOffset: this.gl.getUniformLocation(this.program, 'uvOffset'),
            uvScale: this.gl.getUniformLocation(this.program, 'uvScale'),

            rotation: this.gl.getUniformLocation(program, 'rotation'),
            center: gl.getUniformLocation(program, 'center'),
            scale: gl.getUniformLocation(program, 'scale'),

            color: gl.getUniformLocation(program, 'color'),
            map: gl.getUniformLocation(program, 'map'),
            opacity: gl.getUniformLocation(program, 'opacity'),

            modelViewMatrix: gl.getUniformLocation(program, 'modelViewMatrix'),
            projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),

            fogType: gl.getUniformLocation(program, 'fogType'),
            fogDensity: gl.getUniformLocation(program, 'fogDensity'),
            fogNear: gl.getUniformLocation(program, 'fogNear'),
            fogFar: gl.getUniformLocation(program, 'fogFar'),
            fogColor: gl.getUniformLocation(program, 'fogColor'),
            fogDepth: gl.getUniformLocation(program, 'fogDepth'),

            alphaTest: gl.getUniformLocation(program, 'alphaTest')
         };

         var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
         (canvas as any).width = 8;
         (canvas as any).height = 8;

         var context = (canvas as any).getContext('2d');
         context.fillStyle = 'white';
         context.fillRect(0, 0, 8, 8);

         this.texture = new CanvasTexture(canvas);

      }

      public render(sprites, scene, camera) {
         var state = this.state;
         if (sprites.length === 0) return;

         // setup gl

         if (this.program === undefined) {

            this.init();

         }
         var program = this.program;
         var attributes = this.attributes;
         var gl = this.gl;
         var uniforms = this.uniforms;


         state.useProgram(program);

         state.initAttributes();
         state.enableAttribute(attributes.position);
         state.enableAttribute(attributes.uv);
         state.disableUnusedAttributes();

         state.disable(gl.CULL_FACE);
         state.enable(gl.BLEND);

         gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
         gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 2 * 8, 0);
         gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, 2 * 8, 8);

         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

         gl.uniformMatrix4fv(uniforms.projectionMatrix, false, camera.projectionMatrix.elements);

         state.activeTexture(gl.TEXTURE0);
         gl.uniform1i(uniforms.map, 0);

         var oldFogType = 0;
         var sceneFogType = 0;
         var fog = scene.fog;

         if (fog) {

            gl.uniform3f(uniforms.fogColor, fog.color.r, fog.color.g, fog.color.b);

            if (fog.isFog) {

               gl.uniform1f(uniforms.fogNear, fog.near);
               gl.uniform1f(uniforms.fogFar, fog.far);

               gl.uniform1i(uniforms.fogType, 1);
               oldFogType = 1;
               sceneFogType = 1;

            } else if (fog.isFogExp2) {

               gl.uniform1f(uniforms.fogDensity, fog.density);

               gl.uniform1i(uniforms.fogType, 2);
               oldFogType = 2;
               sceneFogType = 2;

            }

         } else {

            gl.uniform1i(uniforms.fogType, 0);
            oldFogType = 0;
            sceneFogType = 0;

         }


         // update positions and sort

         for (var i = 0, l = sprites.length; i < l; i++) {

            var sprite = sprites[i];

            sprite.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, sprite.matrixWorld);
            sprite.z = - sprite.modelViewMatrix.elements[14];

         }

         sprites.sort(this.painterSortStable);

         // render all sprites

         var scale = [];
         var center = [];

         for (var i = 0, l = sprites.length; i < l; i++) {

            var sprite = sprites[i];
            var material = sprite.material;

            if (material.visible === false) continue;

            sprite.onBeforeRender(this.renderer, scene, camera, undefined, material, undefined);

            gl.uniform1f(uniforms.alphaTest, material.alphaTest);
            gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, sprite.modelViewMatrix.elements);

            sprite.matrixWorld.decompose(this.spritePosition, this.spriteRotation, this.spriteScale);

            scale[0] = this.spriteScale.x;
            scale[1] = this.spriteScale.y;

            center[0] = sprite.center.x - 0.5;
            center[1] = sprite.center.y - 0.5;

            var fogType = 0;

            if (scene.fog && material.fog) {

               fogType = sceneFogType;

            }

            if (oldFogType !== fogType) {

               gl.uniform1i(uniforms.fogType, fogType);
               oldFogType = fogType;

            }

            if (material.map !== null) {

               gl.uniform2f(uniforms.uvOffset, material.map.offset.x, material.map.offset.y);
               gl.uniform2f(uniforms.uvScale, material.map.repeat.x, material.map.repeat.y);

            } else {

               gl.uniform2f(uniforms.uvOffset, 0, 0);
               gl.uniform2f(uniforms.uvScale, 1, 1);

            }

            gl.uniform1f(uniforms.opacity, material.opacity);
            gl.uniform3f(uniforms.color, material.color.r, material.color.g, material.color.b);

            gl.uniform1f(uniforms.rotation, material.rotation);
            gl.uniform2fv(uniforms.center, center);
            gl.uniform2fv(uniforms.scale, scale);

            state.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);
            state.buffers.depth.setTest(material.depthTest);
            state.buffers.depth.setMask(material.depthWrite);
            state.buffers.color.setMask(material.colorWrite);

            this.textures.setTexture2D(material.map || this.texture, 0);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

            sprite.onAfterRender(this.renderer, scene, camera, undefined, material, undefined);

         }

         // restore gl

         state.enable(gl.CULL_FACE);

         state.reset();

      };

      public createProgram() {
         var gl = this.gl;

         var program = gl.createProgram();

         var vertexShader = gl.createShader(gl.VERTEX_SHADER);
         var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

         gl.shaderSource(vertexShader, [

            'precision ' + this.capabilities.precision + ' float;',

            '#define SHADER_NAME ' + 'SpriteMaterial',

            'uniform mat4 modelViewMatrix;',
            'uniform mat4 projectionMatrix;',
            'uniform float rotation;',
            'uniform vec2 center;',
            'uniform vec2 scale;',
            'uniform vec2 uvOffset;',
            'uniform vec2 uvScale;',

            'attribute vec2 position;',
            'attribute vec2 uv;',

            'varying vec2 vUV;',
            'varying float fogDepth;',

            'void main() {',

            '	vUV = uvOffset + uv * uvScale;',

            '	vec2 alignedPosition = ( position - center ) * scale;',

            '	vec2 rotatedPosition;',
            '	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;',
            '	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;',

            '	vec4 mvPosition;',

            '	mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );',
            '	mvPosition.xy += rotatedPosition;',

            '	gl_Position = projectionMatrix * mvPosition;',

            '	fogDepth = - mvPosition.z;',

            '}'

         ].join('\n'));

         gl.shaderSource(fragmentShader, [

            'precision ' + this.capabilities.precision + ' float;',

            '#define SHADER_NAME ' + 'SpriteMaterial',

            'uniform vec3 color;',
            'uniform sampler2D map;',
            'uniform float opacity;',

            'uniform int fogType;',
            'uniform vec3 fogColor;',
            'uniform float fogDensity;',
            'uniform float fogNear;',
            'uniform float fogFar;',
            'uniform float alphaTest;',

            'varying vec2 vUV;',
            'varying float fogDepth;',

            'void main() {',

            '	vec4 texture = texture2D( map, vUV );',

            '	gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );',

            '	if ( gl_FragColor.a < alphaTest ) discard;',

            '	if ( fogType > 0 ) {',

            '		float fogFactor = 0.0;',

            '		if ( fogType == 1 ) {',

            '			fogFactor = smoothstep( fogNear, fogFar, fogDepth );',

            '		} else {',

            '			const float LOG2 = 1.442695;',
            '			fogFactor = exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 );',
            '			fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );',

            '		}',

            '		gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );',

            '	}',

            '}'

         ].join('\n'));

         gl.compileShader(vertexShader);
         gl.compileShader(fragmentShader);

         gl.attachShader(program, vertexShader);
         gl.attachShader(program, fragmentShader);

         gl.linkProgram(program);

         return program;

      }

      public painterSortStable(a, b) {

         if (a.renderOrder !== b.renderOrder) {

            return a.renderOrder - b.renderOrder;

         } else if (a.z !== b.z) {

            return b.z - a.z;

         } else {

            return b.id - a.id;

         }

      }

   }
}


