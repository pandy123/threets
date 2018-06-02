declare module THREE {
    var REVISION: string;
    var MOUSE: {
        LEFT: number;
        MIDDLE: number;
        RIGHT: number;
    };
    var CullFaceNone: number;
    var CullFaceBack: number;
    var CullFaceFront: number;
    var CullFaceFrontBack: number;
    var FrontFaceDirectionCW: number;
    var FrontFaceDirectionCCW: number;
    var BasicShadowMap: number;
    var PCFShadowMap: number;
    var PCFSoftShadowMap: number;
    var FrontSide: number;
    var BackSide: number;
    var DoubleSide: number;
    var FlatShading: number;
    var SmoothShading: number;
    var NoColors: number;
    var FaceColors: number;
    var VertexColors: number;
    var NoBlending: number;
    var NormalBlending: number;
    var AdditiveBlending: number;
    var SubtractiveBlending: number;
    var MultiplyBlending: number;
    var CustomBlending: number;
    var AddEquation: number;
    var SubtractEquation: number;
    var ReverseSubtractEquation: number;
    var MinEquation: number;
    var MaxEquation: number;
    var ZeroFactor: number;
    var OneFactor: number;
    var SrcColorFactor: number;
    var OneMinusSrcColorFactor: number;
    var SrcAlphaFactor: number;
    var OneMinusSrcAlphaFactor: number;
    var DstAlphaFactor: number;
    var OneMinusDstAlphaFactor: number;
    var DstColorFactor: number;
    var OneMinusDstColorFactor: number;
    var SrcAlphaSaturateFactor: number;
    var NeverDepth: number;
    var AlwaysDepth: number;
    var LessDepth: number;
    var LessEqualDepth: number;
    var EqualDepth: number;
    var GreaterEqualDepth: number;
    var GreaterDepth: number;
    var NotEqualDepth: number;
    var MultiplyOperation: number;
    var MixOperation: number;
    var AddOperation: number;
    var NoToneMapping: number;
    var LinearToneMapping: number;
    var ReinhardToneMapping: number;
    var Uncharted2ToneMapping: number;
    var CineonToneMapping: number;
    var UVMapping: number;
    var CubeReflectionMapping: number;
    var CubeRefractionMapping: number;
    var EquirectangularReflectionMapping: number;
    var EquirectangularRefractionMapping: number;
    var SphericalReflectionMapping: number;
    var CubeUVReflectionMapping: number;
    var CubeUVRefractionMapping: number;
    var RepeatWrapping: number;
    var ClampToEdgeWrapping: number;
    var MirroredRepeatWrapping: number;
    var NearestFilter: number;
    var NearestMipMapNearestFilter: number;
    var NearestMipMapLinearFilter: number;
    var LinearFilter: number;
    var LinearMipMapNearestFilter: number;
    var LinearMipMapLinearFilter: number;
    var UnsignedByteType: number;
    var ByteType: number;
    var ShortType: number;
    var UnsignedShortType: number;
    var IntType: number;
    var UnsignedIntType: number;
    var FloatType: number;
    var HalfFloatType: number;
    var UnsignedShort4444Type: number;
    var UnsignedShort5551Type: number;
    var UnsignedShort565Type: number;
    var UnsignedInt248Type: number;
    var AlphaFormat: number;
    var RGBFormat: number;
    var RGBAFormat: number;
    var LuminanceFormat: number;
    var LuminanceAlphaFormat: number;
    var RGBEFormat: number;
    var DepthFormat: number;
    var DepthStencilFormat: number;
    var RGB_S3TC_DXT1_Format: number;
    var RGBA_S3TC_DXT1_Format: number;
    var RGBA_S3TC_DXT3_Format: number;
    var RGBA_S3TC_DXT5_Format: number;
    var RGB_PVRTC_4BPPV1_Format: number;
    var RGB_PVRTC_2BPPV1_Format: number;
    var RGBA_PVRTC_4BPPV1_Format: number;
    var RGBA_PVRTC_2BPPV1_Format: number;
    var RGB_ETC1_Format: number;
    var RGBA_ASTC_4x4_Format: number;
    var RGBA_ASTC_5x4_Format: number;
    var RGBA_ASTC_5x5_Format: number;
    var RGBA_ASTC_6x5_Format: number;
    var RGBA_ASTC_6x6_Format: number;
    var RGBA_ASTC_8x5_Format: number;
    var RGBA_ASTC_8x6_Format: number;
    var RGBA_ASTC_8x8_Format: number;
    var RGBA_ASTC_10x5_Format: number;
    var RGBA_ASTC_10x6_Format: number;
    var RGBA_ASTC_10x8_Format: number;
    var RGBA_ASTC_10x10_Format: number;
    var RGBA_ASTC_12x10_Format: number;
    var RGBA_ASTC_12x12_Format: number;
    var LoopOnce: number;
    var LoopRepeat: number;
    var LoopPingPong: number;
    var InterpolateDiscrete: number;
    var InterpolateLinear: number;
    var InterpolateSmooth: number;
    var ZeroCurvatureEnding: number;
    var ZeroSlopeEnding: number;
    var WrapAroundEnding: number;
    var TrianglesDrawMode: number;
    var TriangleStripDrawMode: number;
    var TriangleFanDrawMode: number;
    var LinearEncoding: number;
    var sRGBEncoding: number;
    var GammaEncoding: number;
    var RGBEEncoding: number;
    var LogLuvEncoding: number;
    var RGBM7Encoding: number;
    var RGBM16Encoding: number;
    var RGBDEncoding: number;
    var BasicDepthPacking: number;
    var RGBADepthPacking: number;
}
declare module THREE {
}
declare module THREE {
    function arrayMin(array: any): any;
    function arrayMax(array: any): any;
}
declare module THREE {
    class AnimationAction {
        _mixer: any;
        _clip: any;
        _localRoot: any;
        _interpolantSettings: any;
        _interpolants: any;
        _propertyBindings: any;
        _cacheIndex: any;
        _byClipCacheIndex: any;
        _timeScaleInterpolant: any;
        _weightInterpolant: any;
        loop: any;
        _loopCount: number;
        _startTime: any;
        time: number;
        timeScale: number;
        _effectiveTimeScale: number;
        weight: number;
        _effectiveWeight: number;
        repetitions: number;
        paused: boolean;
        enabled: boolean;
        clampWhenFinished: boolean;
        zeroSlopeAtStart: boolean;
        zeroSlopeAtEnd: boolean;
        constructor(mixer: any, clip: any, localRoot: any);
        play(): this;
        stop(): this;
        reset(): this;
        isRunning(): any;
        isScheduled(): any;
        startAt(time: any): this;
        setLoop(mode: any, repetitions: any): this;
        setEffectiveWeight(weight: any): this;
        getEffectiveWeight(): number;
        fadeIn(duration: any): this;
        fadeOut(duration: any): this;
        crossFadeFrom(fadeOutAction: any, duration: any, warp: any): this;
        crossFadeTo(fadeInAction: any, duration: any, warp: any): any;
        stopFading(): this;
        setEffectiveTimeScale(timeScale: any): this;
        getEffectiveTimeScale(): number;
        setDuration(duration: any): this;
        syncWith(action: any): this;
        halt(duration: any): this;
        warp(startTimeScale: any, endTimeScale: any, duration: any): this;
        stopWarping(): this;
        getMixer(): any;
        getClip(): any;
        getRoot(): any;
        t(time: any, deltaTime: any, timeDirection: any, accuIndex: any): void;
        _updateWeight(time: any): number;
        _updateTimeScale(time: any): number;
        _updateTime(deltaTime: any): any;
        _setEndings(atStart: any, atEnd: any, pingPong: any): void;
        _scheduleFading(duration: any, weightNow: any, weightThen: any): this;
    }
}
declare module THREE {
    class AnimationClip {
        name: string;
        tracks: any;
        duration: number;
        uuid: string;
        constructor(name: any, duration: any, tracks: any);
        static parse(json: any): AnimationClip;
        static toJSON(clip: any): {
            'name': any;
            'duration': any;
            'tracks': any[];
            'uuid': any;
        };
        static CreateFromMorphTargetSequence(name: any, morphTargetSequence: any, fps: any, noLoop: any): AnimationClip;
        static findByName(objectOrClipArray: any, name: any): any;
        static CreateClipsFromMorphTargetSequences(morphTargets: any, fps: any, noLoop?: any): any[];
        static parseAnimation(animation: any, bones: any): AnimationClip;
        resetDuration(): void;
        trim(): this;
        optimize(): this;
    }
}
declare module THREE {
    class EventDispatcher {
        private _listeners;
        constructor();
        addEventListener(type: any, listener: any): void;
        hasEventListener(type: any, listener: any): boolean;
        removeEventListener(type: any, listener: any): void;
        dispatchEvent(event: any): void;
    }
}
declare module THREE {
    class AnimationMixer extends EventDispatcher {
        stats: any;
        _nActiveControlInterpolants: number;
        _controlInterpolants: any[];
        _nActiveBindings: number;
        _bindings: any[];
        _nActiveActions: number;
        _actions: any[];
        _root: any;
        _accuIndex: number;
        time: number;
        timeScale: number;
        _controlInterpolantsResultBuffer: Float32Array;
        _actionsByClip: any;
        _bindingsByRootAndName: any;
        constructor(root: any);
        _bindAction(action: any, prototypeAction: any): void;
        _activateAction(action: any): void;
        _deactivateAction(action: any): void;
        _initMemoryManager(): void;
        _isActiveAction(action: any): boolean;
        _addInactiveAction(action: any, clipUuid: any, rootUuid: any): void;
        _removeInactiveAction(action: any): void;
        _removeInactiveBindingsForAction(action: any): void;
        _lendAction(action: any): void;
        _takeBackAction(action: any): void;
        _addInactiveBinding(binding: any, rootUuid: any, trackName: any): void;
        _removeInactiveBinding(binding: any): void;
        _lendBinding(binding: any): void;
        _takeBackBinding(binding: any): void;
        _lendControlInterpolant(): any;
        _takeBackControlInterpolant(interpolant: any): void;
        clipAction(clip: any, optionalRoot: any): any;
        existingAction(clip: any, optionalRoot: any): any;
        stopAllAction(): this;
        update(deltaTime: any): this;
        getRoot(): any;
        uncacheClip(clip: any): void;
        uncacheRoot(root: any): void;
        uncacheAction(clip: any, optionalRoot: any): void;
    }
}
declare module THREE {
    class AnimationObjectGroup {
        stats: any;
        _bindingsIndicesByPath: {};
        _bindings: any[];
        _parsedPaths: any[];
        _paths: any[];
        _indicesByUUID: {};
        nCachedObjects_: number;
        _objects: any;
        uuid: string;
        isAnimationObjectGroup: boolean;
        constructor();
        add(): void;
        remove(): void;
        uncache(): void;
        subscribe_(path: any, parsedPath: any): any;
        unsubscribe_(path: any): void;
    }
}
declare module THREE {
    class AnimationUtils {
        static arraySlice(array: any, from: any, to: any): any;
        static convertArray(array: any, type: any, forceClone?: any): any;
        static isTypedArray(object: any): boolean;
        static getKeyframeOrder(times: any): any[];
        static sortedArray(values: any, stride: any, order: any): any;
        static flattenJSON(jsonKeys: any, times: any, values: any, valuePropertyName: any): void;
    }
}
declare module THREE {
    class Composite {
        _targetGroup: any;
        _bindings: any;
        constructor(targetGroup: any, path: any, optionalParsedPath: any);
        getValue(array: any, offset: any): void;
        setValue(array: any, offset: any): void;
        bind(): void;
        unbind(): void;
    }
}
declare module THREE {
    class KeyframeTrack {
        name: string;
        times: any;
        values: any;
        TimeBufferType: Function;
        ValueBufferType: Function;
        DefaultInterpolation: any;
        createInterpolant: any;
        ValueTypeName: any;
        constructor(name: any, times: any, values: any, interpolation?: any);
        static parse(json: any): any;
        static toJSON(track: any): any;
        static _getTrackTypeForValueTypeName(typeName: any): typeof StringKeyframeTrack;
        InterpolantFactoryMethodDiscrete(result: any): DiscreteInterpolant;
        InterpolantFactoryMethodLinear(result: any): LinearInterpolant;
        InterpolantFactoryMethodSmooth(result: any): CubicInterpolant;
        setInterpolation(interpolation: any): void;
        getInterpolation(): number;
        getValueSize(): number;
        shift(timeOffset: any): this;
        scale(timeScale: any): this;
        trim(startTime: any, endTime: any): this;
        validate(): boolean;
        optimize(): this;
    }
}
declare module THREE {
    class PropertyBinding {
        path: any;
        parsedPath: any;
        node: any;
        rootNode: any;
        getValue: any;
        setValue: any;
        _getValue_unbound: any;
        _setValue_unbound: any;
        resolvedProperty: any;
        propertyIndex: any;
        targetObject: any;
        propertyName: any;
        constructor(rootNode: any, path: any, parsedPath: any);
        static Composite: any;
        static create(root: any, path: any, parsedPath: any): any;
        /**
         * Replaces spaces with underscores and removes unsupported characters from
         * node names, to ensure compatibility with parseTrackName().
         *
         * @param  {string} name Node name to be sanitized.
         * @return {string}
         */
        static sanitizeNodeName(name: any): any;
        static parseTrackName(trackName: any): {
            nodeName: string;
            objectName: string;
            objectIndex: string;
            propertyName: string;
            propertyIndex: string;
        };
        static findNode(root: any, nodeName: any): any;
        _getValue_unavailable(): void;
        _setValue_unavailable(): void;
        readonly BindingType: {
            Direct: number;
            EntireArray: number;
            ArrayElement: number;
            HasFromToArray: number;
        };
        readonly Versioning: {
            None: number;
            NeedsUpdate: number;
            MatrixWorldNeedsUpdate: number;
        };
        readonly GetterByBindingType: ((buffer: any, offset: any) => void)[];
        readonly SetterByBindingTypeAndVersioning: ((buffer: any, offset: any) => void)[][];
        getValuegetValue_unbound(targetArray: any, offset: any): void;
        setValuegetValue_unbound(sourceArray: any, offset: any): void;
        bind(): void;
        unbind(): void;
    }
}
declare module THREE {
    class PropertyMixer {
        binding: any;
        valueSize: any;
        buffer: any;
        _mixBufferRegion: any;
        cumulativeWeight: any;
        useCount: any;
        referenceCount: any;
        constructor(binding: any, typeName: any, valueSize: any);
        accumulate(accuIndex: any, weight: any): void;
        apply(accuIndex: any): void;
        saveOriginalState(): void;
        restoreOriginalState(): void;
        _select(buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any): void;
        _slerp(buffer: any, dstOffset: any, srcOffset: any, t: any): void;
        _lerp(buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any): void;
    }
}
declare module THREE {
    class BooleanKeyframeTrack extends KeyframeTrack {
        ValueTypeName: string;
        ValueBufferType: any;
        DefaultInterpolation: any;
        constructor(name: any, times: any, values: any);
    }
}
declare module THREE {
    class ColorKeyframeTrack extends KeyframeTrack {
        ValueTypeName: any;
        constructor(name: any, times: any, values: any, interpolation: any);
    }
}
declare module THREE {
    class NumberKeyframeTrack extends KeyframeTrack {
        ValueTypeName: any;
        constructor(name: any, times: any, values: any, interpolation?: any);
    }
}
declare module THREE {
    class QuaternionKeyframeTrack extends KeyframeTrack {
        ValueTypeName: string;
        DefaultInterpolation: any;
        constructor(name: any, times: any, values: any, interpolation: any);
        InterpolantFactoryMethodLinear(result: any): QuaternionLinearInterpolant;
    }
}
declare module THREE {
    class StringKeyframeTrack extends KeyframeTrack {
        ValueTypeName: any;
        ValueBufferType: any;
        DefaultInterpolation: any;
        constructor(name: any, times: any, values: any, interpolation: any);
    }
}
declare module THREE {
    class VectorKeyframeTrack extends KeyframeTrack {
        ValueTypeName: any;
        constructor(name: any, times: any, values: any, interpolation: any);
    }
}
declare module THREE {
    class Quaternion {
        _x: number;
        _y: number;
        _z: number;
        _w: number;
        _onChangeCallback: any;
        constructor(x?: number, y?: number, z?: number, w?: number);
        x: number;
        y: number;
        z: number;
        w: number;
        static slerp(qa: any, qb: any, qm: any, t: any): any;
        static slerpFlat(dst: any, dstOffset: any, src0: any, srcOffset0: any, src1: any, srcOffset1: any, t: any): void;
        set(x: number, y: number, z: number, w: number): this;
        clone(): Quaternion;
        copy(quaternion: Quaternion): this;
        setFromEuler(euler: Euler, update?: boolean): this;
        setFromAxisAngle(axis: any, angle: any): this;
        setFromRotationMatrix(m: any): this;
        setFromUnitVectors(vFrom: any, vTo: any): this;
        inverse(): this;
        conjugate(): this;
        dot(v: any): number;
        lengthSq(): number;
        length(): number;
        normalize(): this;
        multiply(q: Quaternion, p?: Quaternion): this;
        premultiply(q: any): this;
        multiplyQuaternions(a: any, b: any): this;
        slerp(qb: any, t: any): this;
        equals(quaternion: Quaternion): boolean;
        fromArray(array: Array<number>, offset?: number): this;
        toArray(array?: Array<number>, offset?: number): number[];
        onChange(callback: Function): this;
        onChangeCallback(): void;
    }
}
declare module THREE {
    class Vector3 {
        x: number;
        y: number;
        z: number;
        isVector3: boolean;
        constructor(x?: number, y?: number, z?: number);
        set(x: number, y: number, z: number): Vector3;
        setScalar(scalar: number): Vector3;
        setX(x: number): Vector3;
        setY(y: number): Vector3;
        setZ(z: number): Vector3;
        setComponent(index: number, value: number): Vector3;
        getComponent(index: number): number;
        clone(): Vector3;
        copy(v: Vector3): Vector3;
        add(v: Vector3, w?: Vector3): Vector3;
        addScalar(s: number): Vector3;
        addVectors(a: Vector3, b: Vector3): Vector3;
        addScaledVector(v: Vector3, s: number): Vector3;
        sub(v: Vector3, w?: Vector3): Vector3;
        subScalar(s: number): Vector3;
        subVectors(a: Vector3, b: Vector3): Vector3;
        multiply(v: Vector3, w: Vector3): Vector3;
        multiplyScalar(scalar: number): Vector3;
        multiplyVectors(a: Vector3, b: Vector3): Vector3;
        static quaternion: Quaternion;
        applyEuler(euler: Euler): Vector3;
        applyAxisAngle(axis: any, angle: any): Vector3;
        applyMatrix3(m: any): Vector3;
        applyMatrix4(m: any): Vector3;
        applyQuaternion(q: Quaternion): Vector3;
        static matrix: any;
        project(camera: any): Vector3;
        unproject(camera: any): Vector3;
        transformDirection(m: any): Vector3;
        divide(v: Vector3): Vector3;
        divideScalar(scalar: number): Vector3;
        min(v: Vector3): Vector3;
        max(v: Vector3): Vector3;
        clamp(min: Vector3, max: Vector3): Vector3;
        static min: Vector3;
        static max: Vector3;
        clampScalar(minVal: any, maxVal: any): Vector3;
        clampLength(min: any, max: any): Vector3;
        floor(): Vector3;
        ceil(): Vector3;
        round(): Vector3;
        roundToZero(): Vector3;
        negate(): Vector3;
        dot(v: Vector3): number;
        lengthSq(): number;
        length(): number;
        manhattanLength(): number;
        normalize(): Vector3;
        setLength(length: number): Vector3;
        lerp(v: Vector3, alpha: number): Vector3;
        lerpVectors(v1: Vector3, v2: Vector3, alpha: number): Vector3;
        cross(v: Vector3, w?: Vector3): Vector3;
        crossVectors(a: Vector3, b: Vector3): Vector3;
        projectOnVector(vector: Vector3): Vector3;
        static v1: Vector3;
        projectOnPlane(planeNormal: Vector3): Vector3;
        reflect(normal: Vector3): Vector3;
        angleTo(v: Vector3): number;
        distanceTo(v: Vector3): number;
        distanceToSquared(v: Vector3): number;
        manhattanDistanceTo(v: Vector3): number;
        setFromSpherical(s: any): Vector3;
        setFromCylindrical(c: any): Vector3;
        setFromMatrixPosition(m: any): Vector3;
        setFromMatrixScale(m: any): Vector3;
        setFromMatrixColumn(m: any, index: number): Vector3;
        equals(v: Vector3): boolean;
        fromArray(array: Array<number>, offset: number): Vector3;
        toArray(array: Array<number>, offset: number): number[];
        fromBufferAttribute(attribute: any, index: number, offset?: number): Vector3;
    }
}
declare module THREE {
    class Object3D extends EventDispatcher {
        static object3DId: number;
        static DefaultUp: Vector3;
        static DefaultMatrixAutoUpdate: boolean;
        isObject3D: boolean;
        id: number;
        uuid: string;
        name: string;
        type: string;
        parent: any;
        children: Array<any>;
        up: any;
        position: Vector3;
        rotation: Euler;
        quaternion: Quaternion;
        scale: Vector3;
        modelViewMatrix: Matrix4;
        normalMatrix: Matrix3;
        matrix: Matrix4;
        matrixWorld: Matrix4;
        matrixAutoUpdate: boolean;
        matrixWorldNeedsUpdate: boolean;
        layers: Layers;
        visible: boolean;
        castShadow: boolean;
        receiveShadow: boolean;
        frustumCulled: boolean;
        renderOrder: number;
        userData: any;
        constructor();
        onRotationChange(): () => void;
        onQuaternionChange(): () => void;
        onBeforeRender(render: any, scene: any, camera: any, geometry: any, material: any, group: any): void;
        onAfterRender(render: any, scene: any, camera: any, geometry: any, material: any, group: any): void;
        applyMatrix(matrix: any): void;
        applyQuaternion(q: Quaternion): this;
        setRotationFromAxisAngle(axis: any, angle: any): void;
        setRotationFromEuler(euler: Euler): void;
        setRotationFromMatrix(m: any): void;
        setRotationFromQuaternion(q: Quaternion): void;
        rotateOnAxis(axis: any, angle: any): this;
        rotateOnWorldAxis(axis: any, angle: any): this;
        rotateX(angle: any): this;
        rotateY(angle: any): this;
        rotateZ(angle: any): this;
        translateOnAxis(axis: any, distance: any): this;
        translateX(distance: any): this;
        translateY(distance: any): this;
        translateZ(distance: any): this;
        localToWorld(vector: any): any;
        worldToLocal(vector: any): any;
        lookAt(x: any, y?: any, z?: any): void;
        add(object: any): this;
        remove(object: any): this;
        getObjectById(id: any): any;
        getObjectByName(name: any): any;
        getObjectByProperty(name: any, value: any): any;
        getWorldPosition(target: any): any;
        getWorldQuaternion(target: any): any;
        getWorldScale(target: any): any;
        getWorldDirection(target: any): any;
        raycast(): void;
        traverse(callback: any): void;
        traverseVisible(callback: any): void;
        traverseAncestors(callback: any): void;
        updateMatrix(): void;
        /**
         * 更新matrixwrold参数，两种情况：force = true， matrixWorldNeedsUpdate = true
         * @param force 是否强制更新
         */
        updateMatrixWorld(force: boolean): void;
        toJSON(meta: any): any;
        clone(recursive?: any): any;
        copy(source: any, recursive?: any): any;
    }
}
declare module THREE {
    class Audio extends Object3D {
        type: string;
        context: any;
        gain: any;
        autoplay: boolean;
        buffer: any;
        loop: boolean;
        startTime: number;
        offset: number;
        playbackRate: number;
        isPlaying: boolean;
        hasPlaybackControl: boolean;
        sourceType: string;
        filters: any;
        source: any;
        constructor(listener: any);
        getOutput(): any;
        setNodeSource(audioNode: any): this;
        setMediaElementSource(mediaElement: any): this;
        setBuffer(audioBuffer: any): this;
        play(): this;
        pause(): this;
        stop(): this;
        connect(): this;
        disconnect(): this;
        getFilters(): any;
        setFilters(value: any): this;
        getFilter(): any;
        setFilter(filter: any): this;
        setPlaybackRate(value: any): this;
        getPlaybackRate(): number;
        onEnded(): void;
        getLoop(): boolean;
        setLoop(value: any): this;
        getVolume(): any;
        setVolume(value: any): this;
    }
}
declare module THREE {
    class AudioAnalyser {
        analyser: any;
        data: any;
        constructor(audio: any, fftSize: any);
        getFrequencyData(): any;
        getAverageFrequency(): number;
    }
}
declare module THREE {
    var AudioContext: {
        getContext: () => any;
        setContext: (value: any) => void;
    };
}
declare module THREE {
    class AudioListener extends Object3D {
        type: string;
        context: any;
        gain: any;
        filter: any;
        constructor();
        getInput(): any;
        removeFilter(): void;
        getFilter(): any;
        setFilter(value: any): void;
        getMasterVolume(): any;
        setMasterVolume(value: any): void;
        updateMatrixWorld(force: any): void;
    }
}
declare module THREE {
    class PositionalAudio extends Audio {
        panner: any;
        constructor(listener: any);
        getOutput(): any;
        getRefDistance(): any;
        setRefDistance(value: any): void;
        getRolloffFactor(): any;
        setRolloffFactor(value: any): void;
        getDistanceModel(): any;
        setDistanceModel(value: any): void;
        getMaxDistance(): any;
        setMaxDistance(value: any): void;
        updateMatrixWorld(force: any): void;
    }
}
declare module THREE {
    class Camera extends Object3D {
        type: string;
        matrixWorldInverse: Matrix4;
        projectionMatrix: Matrix4;
        isCamera: boolean;
        constructor();
        copy(source: any, recursive: any): this;
        getWorldDirection(target: any): any;
        updateMatrixWorld(force: any): void;
        clone(): Camera;
    }
}
declare module THREE {
    class PerspectiveCamera extends Camera {
        type: string;
        fov: number;
        zoom: number;
        near: number;
        far: number;
        focus: number;
        aspect: number;
        view: any;
        filmGauge: number;
        filmOffset: number;
        isPerspectiveCamera: boolean;
        constructor(fov: any, aspect: any, near: any, far: any);
        copy(source: any, recursive: any): this;
        /**
         * Sets the FOV by focal length in respect to the current .filmGauge.
         *
         * The default film gauge is 35, so that the focal length can be specified for
         * a 35mm (full frame) camera.
         *
         * Values for focal length and film gauge must have the same unit.
         */
        setFocalLength(focalLength: any): void;
        /**
         * Calculates the focal length from the current .fov and .filmGauge.
         */
        getFocalLength(): number;
        getEffectiveFOV(): number;
        getFilmWidth(): number;
        getFilmHeight(): number;
        /**
         * Sets an offset in a larger frustum. This is useful for multi-window or
         * multi-monitor/multi-machine setups.
         *
         * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
         * the monitors are in grid like this
         *
         *   +---+---+---+
         *   | A | B | C |
         *   +---+---+---+
         *   | D | E | F |
         *   +---+---+---+
         *
         * then for each monitor you would call it like this
         *
         *   var w = 1920;
         *   var h = 1080;
         *   var fullWidth = w * 3;
         *   var fullHeight = h * 2;
         *
         *   --A--
         *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
         *   --B--
         *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
         *   --C--
         *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
         *   --D--
         *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
         *   --E--
         *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
         *   --F--
         *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
         *
         *   Note there is no reason monitors have to be the same size or in a grid.
         */
        setViewOffset(fullWidth: any, fullHeight: any, x: any, y: any, width: any, height: any): void;
        clearViewOffset(): void;
        updateProjectionMatrix(): void;
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class ArrayCamera extends PerspectiveCamera {
        cameras: any;
        isArrayCamera: boolean;
        constructor(array: any);
    }
}
declare module THREE {
    class CubeCamera extends Object3D {
        static cameraPX: any;
        static cameraNX: any;
        static cameraPY: any;
        static cameraNY: any;
        static cameraPZ: any;
        static cameraNZ: any;
        renderTarget: any;
        constructor(near: any, far: any, cubeResolution: any);
        update(renderer: any, scene: any): void;
        clear(renderer: any, color: any, depth: any, stencil: any): void;
    }
}
declare module THREE {
    class OrthographicCamera extends Camera {
        isOrthographicCamera: boolean;
        type: string;
        zoom: number;
        view: any;
        left: any;
        right: any;
        top: any;
        bottom: any;
        near: any;
        far: any;
        constructor(left: any, right: any, top: any, bottom: any, near: any, far: any);
        copy(source: any, recursive: any): this;
        setViewOffset(fullWidth: any, fullHeight: any, x: any, y: any, width: any, height: any): void;
        clearViewOffset(): void;
        updateProjectionMatrix(): void;
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class StereoCamera {
        type: string;
        aspect: number;
        eyeSep: number;
        cameraL: any;
        cameraR: any;
        constructor();
        update(camera: any): void;
    }
}
declare module THREE {
    type BufferAttributeMap = {
        [key: string]: BufferAttribute;
    };
    class BufferAttribute {
        name: string;
        array: any;
        itemSize: number;
        count: number;
        normalized: boolean;
        dynamic: any;
        version: number;
        updateRange: any;
        isBufferAttribute: boolean;
        constructor(array: any, itemSize: any, normalized?: any);
        needsUpdate: any;
        onUploadCallback(): void;
        setArray(array: any): this;
        setDynamic(value: any): this;
        copy(source: any): this;
        copyAt(index1: number, attribute: any, index2: number): this;
        copyArray(array: any): this;
        copyColorsArray(colors: any): this;
        copyVector2sArray(vectors: any): this;
        copyVector3sArray(vectors: any): this;
        copyVector4sArray(vectors: any): this;
        set(value: any, offset: number): this;
        getX(index: number): any;
        setX(index: number, x: any): this;
        getY(index: number): any;
        setY(index: number, y: any): this;
        getZ(index: number): any;
        setZ(index: number, z: any): this;
        getW(index: number): any;
        setW(index: number, w: number): this;
        setXY(index: number, x: number, y: number): this;
        setXYZ(index: number, x: number, y: number, z: number): this;
        setXYZW(index: number, x: number, y: number, z: number, w: number): this;
        onUpload(callback: any): this;
        clone(): BufferAttribute;
    }
    class Int8BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Uint8BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Uint8ClampedBufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Int16BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Uint16BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Int32BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Uint32BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
    class Float32BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized?: any);
    }
    class Float64BufferAttribute extends BufferAttribute {
        constructor(array: any, itemSize: number, normalized: any);
    }
}
declare module THREE {
    type BufferGeometryMap = {
        [key: number]: BufferGeometry;
    };
    class BufferGeometry extends EventDispatcher {
        id: number;
        name: string;
        type: string;
        index: any;
        attributes: BufferAttributeMap;
        morphAttributes: any;
        groups: Array<any>;
        boundingBox: Box3;
        boundingSphere: Sphere;
        drawRange: any;
        uuid: string;
        isBufferGeometry: boolean;
        parameters: any | Object;
        constructor();
        getIndex(): any;
        setIndex(index: any): void;
        addAttribute(name: string, attribute: any): this;
        getAttribute(name: string): BufferAttribute;
        removeAttribute(name: string): this;
        addGroup(start: number, count: number, materialIndex: number): void;
        clearGroups(): void;
        setDrawRange(start: number, count: number): void;
        applyMatrix(matrix: any): this;
        rotateX(angle: any): this;
        rotateY(angle: any): this;
        rotateZ(angle: any): this;
        translate(x: any, y: any, z: any): this;
        scale(x: any, y: any, z: any): this;
        lookAt(vector: any): void;
        center(): this;
        /**
         * 从mesh 、line point 等物品类型中设置buffergeometry
         * @param object
         */
        setFromObject(object: any | Object3D): this;
        /**
         * 从点集设置buffergeometry 的值
         * @param points
         */
        setFromPoints(points: any): this;
        /**
         * 从其他物体更新当前buffergeometry的属性值
         * @param object
         */
        updateFromObject(object: any | Object3D): this;
        /**
         * 从几何中设置buffergeometry
         * @param geometry
         */
        fromGeometry(geometry: Geometry): this;
        /**
         * 从direct geometry 向buffer geometry 提供内存空间大小，和赋值
         * @param geometry  dire
         */
        fromDirectGeometry(geometry: DirectGeometry): this;
        /**
         * 计算包围框
         */
        computeBoundingBox(): void;
        /**
         * 计算包围球体
        */
        computeBoundingSphere(): void;
        computeFaceNormals(): void;
        /**
         * 计算顶点法向
         */
        computeVertexNormals(): void;
        merge(geometry: BufferGeometry, offset: number): this;
        /**
         * 法向归一化
         */
        normalizeNormals(): void;
        /**
         * 无索引
         */
        toNonIndexed(): BufferGeometry;
        toJSON(): any;
        clone(): BufferGeometry;
        copy(source: any): this;
        dispose(): void;
    }
}
declare module THREE {
    class Clock {
        autoStart: boolean;
        startTime: number;
        oldTime: number;
        elapsedTime: number;
        running: boolean;
        constructor(autoStart: boolean);
        start(): void;
        stop(): void;
        getElapsedTime(): number;
        getDelta(): number;
    }
}
declare module THREE {
    class DirectGeometry {
        vertices: any;
        normals: any;
        colors: any;
        uvs: any;
        uvs2: any;
        groups: any;
        morphTargets: any;
        skinWeights: any;
        skinIndices: any;
        boundingBox: any;
        boundingSphere: any;
        verticesNeedUpdate: any;
        normalsNeedUpdate: any;
        colorsNeedUpdate: any;
        uvsNeedUpdate: any;
        groupsNeedUpdate: any;
        constructor();
        computeGroups(geometry: any): void;
        fromGeometry(geometry: any): this;
    }
}
declare module THREE {
    class Face3 {
        a: any;
        b: any;
        c: any;
        normal: any;
        vertexNormals: any;
        color: any;
        vertexColors: any;
        materialIndex: any;
        constructor(a?: any, b?: any, c?: any, normal?: any, color?: any, materialIndex?: any);
        clone(): Face3;
        copy(source: any): this;
    }
}
declare module THREE {
    class Geometry extends EventDispatcher {
        static geometryId: number;
        id: number;
        uuid: string;
        name: string;
        type: string;
        vertices: any;
        colors: any;
        faces: any;
        faceVertexUvs: any;
        morphTargets: any;
        morphNormals: any;
        skinWeights: any;
        skinIndices: any;
        lineDistances: any;
        boundingBox: any;
        boundingSphere: any;
        elementsNeedUpdate: boolean;
        verticesNeedUpdate: boolean;
        uvsNeedUpdate: boolean;
        normalsNeedUpdate: boolean;
        colorsNeedUpdate: boolean;
        lineDistancesNeedUpdate: boolean;
        groupsNeedUpdate: boolean;
        parameters: any;
        __directGeometry: DirectGeometry;
        _bufferGeometry: BufferGeometry;
        constructor();
        isGeometry: boolean;
        applyMatrix(matrix: any): this;
        rotateX(angle: any): this;
        rotateY(angle: any): this;
        rotateZ(angle: any): this;
        translate(x: any, y: any, z: any): this;
        scale(x: any, y: any, z: any): this;
        lookAt(vector: any): void;
        fromBufferGeometry(geometry: any): this;
        center(): Geometry;
        normalize(): this;
        computeFaceNormals(): void;
        computeVertexNormals(areaWeighted?: any): void;
        computeFlatVertexNormals(): void;
        computeMorphNormals(): void;
        computeBoundingBox(): void;
        computeBoundingSphere(): void;
        merge(geometry: any, matrix: any, materialIndexOffset?: any): void;
        mergeMesh(mesh: any): void;
        mergeVertices(): number;
        setFromPoints(points: any): this;
        sortFacesByMaterialIndex(): void;
        toJSON(): any;
        clone(): Geometry;
        copy(source: any): this;
        dispose(): void;
    }
}
declare module THREE {
    class InstancedBufferAttribute extends BufferAttribute {
        meshPerAttribute: any;
        isInstancedBufferAttribute: any;
        constructor(array: any, itemSize: any, meshPerAttribute: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class InstancedBufferGeometry extends BufferGeometry {
        type: any;
        maxInstancedCount: any;
        isInstancedBufferGeometry: any;
        constructor();
        copy(source: any): this;
        clone(): InstancedBufferGeometry;
    }
}
declare module THREE {
    class InterleavedBuffer {
        array: any;
        stride: any;
        count: number;
        dynamic: boolean;
        updateRange: any;
        version: number;
        isInterleavedBuffer: true;
        constructor(array?: any, stride?: any);
        needsUpdate: any;
        onUploadCallback(): void;
        setArray(array: any): this;
        setDynamic(value: any): this;
        copy(source: any): this;
        copyAt(index1: any, attribute: any, index2: any): this;
        set(value: any, offset: any): this;
        clone(): InterleavedBuffer;
        onUpload(callback: any): this;
    }
}
declare module THREE {
    class InstancedInterleavedBuffer extends InterleavedBuffer {
        meshPerAttribute: any;
        isInstancedInterleavedBuffer: any;
        constructor(array: any, stride: any, meshPerAttribute: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class InterleavedBufferAttribute {
        data: any;
        itemSize: any;
        offset: any;
        normalized: boolean;
        _count: number;
        isInterleavedBufferAttribute: boolean;
        constructor(interleavedBuffer: any, itemSize: any, offset: any, normalized: any);
        readonly count: any;
        readonly array: any;
        setX(index: any, x: any): this;
        setY(index: any, y: any): this;
        setZ(index: any, z: any): this;
        setW(index: any, w: any): this;
        getX(index: any): any;
        getY(index: any): any;
        getZ(index: any): any;
        getW(index: any): any;
        setXY(index: any, x: any, y: any): this;
        setXYZ(index: any, x: any, y: any, z: any): this;
        setXYZW(index: any, x: any, y: any, z: any, w: any): this;
    }
}
declare module THREE {
    class Layers {
        mask: number;
        constructor();
        set(channel: any): void;
        enable(channel: any): void;
        toggle(channel: any): void;
        disable(channel: any): void;
        test(layers: any): boolean;
    }
}
declare module THREE {
    class Raycaster {
        linePrecision: number;
        ray: Ray;
        near: number;
        far: number;
        params: any;
        constructor(origin: any, direction: any, near: any, far: any);
        set(origin: any, direction: any): void;
        setFromCamera(coords: any, camera: any): void;
        intersectObject(object: any, recursive: any, optionalTarget: any): any;
        intersectObjects(objects: any, recursive: any, optionalTarget: any): any;
    }
}
declare module THREE {
    class Uniform {
        value: any;
        constructor(value?: any);
        clone: () => Uniform;
    }
}
declare module THREE {
    var Earcut: {
        triangulate: (data: any, holeIndices: any, dim: any) => any[];
    };
}
declare module THREE {
    class ShapeUtils {
        static area(contour: any): number;
        static isClockWise(pts: any): boolean;
        static triangulateShape(contour: any, holes: any): any[];
    }
}
declare module THREE {
    class Curve {
        type: string;
        arcLengthDivisions: number;
        cacheArcLengths: any;
        needsUpdate: any;
        constructor();
        getPoint(t: any, optionalTarget: any): any;
        getPointAt(u: any, optionalTarget: any): any;
        getPoints(divisions: any): any[];
        getSpacedPoints(divisions: any): any[];
        getLength(): any;
        getLengths(divisions: any): any;
        updateArcLengths(): void;
        getUtoTmapping(u: any, distance: any): number;
        getTangent(t: any): any;
        getTangentAt(u: any): any;
        computeFrenetFrames(segments: any, closed: any): {
            tangents: any[];
            normals: any[];
            binormals: any[];
        };
        clone(): Curve;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class CurvePath extends Curve {
        type: any;
        curves: any;
        autoClose: any;
        cacheLengths: any;
        constructor();
        add(curve: any): void;
        closePath(): void;
        getPoint(t: any): any;
        getLength(): any;
        updateArcLengths(): void;
        getCurveLengths(): any;
        getSpacedPoints(divisions: any): any[];
        getPoints(divisions: any): any[];
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class Font {
        type: any;
        data: any;
        isFont: any;
        constructor(data: any);
        generateShapes(text: any, size: any, divisions: any): any[];
    }
    function createPaths(text: any, size: any, divisions: any, data: any): any[];
    function createPath(char: any, divisions: any, scale: any, offsetX: any, offsetY: any, data: any): {
        offsetX: number;
        path: ShapePath;
    };
}
declare module THREE {
    function CatmullRom(t: any, p0: any, p1: any, p2: any, p3: any): any;
    function QuadraticBezierP0(t: any, p: any): number;
    function QuadraticBezierP1(t: any, p: any): number;
    function QuadraticBezierP2(t: any, p: any): number;
    function QuadraticBezier(t: any, p0: any, p1: any, p2: any): number;
    function CubicBezierP0(t: any, p: any): number;
    function CubicBezierP1(t: any, p: any): number;
    function CubicBezierP2(t: any, p: any): number;
    function CubicBezierP3(t: any, p: any): number;
    function CubicBezier(t: any, p0: any, p1: any, p2: any, p3: any): number;
}
declare module THREE {
    class Path extends CurvePath {
        type: any;
        currentPoint: any;
        constructor(points: any);
        setFromPoints(points: any): void;
        moveTo(x: any, y: any): void;
        lineTo(x: any, y: any): void;
        quadraticCurveTo(aCPx: any, aCPy: any, aX: any, aY: any): void;
        bezierCurveTo(aCP1x: any, aCP1y: any, aCP2x: any, aCP2y: any, aX: any, aY: any): void;
        splineThru(pts: any): void;
        arc(aX: any, aY: any, aRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any): void;
        absarc(aX: any, aY: any, aRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any): void;
        ellipse(aX: any, aY: any, xRadius: any, yRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any, aRotation: any): void;
        absellipse(aX: any, aY: any, xRadius: any, yRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any, aRotation: any): void;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class Shape extends Path {
        uuid: any;
        type: any;
        holes: any;
        constructor(points?: any);
        getPointsHoles(divisions: any): any[];
        extractPoints(divisions: any): {
            shape: any[];
            holes: any[];
        };
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class ShapePath {
        type: any;
        color: any;
        subPaths: any;
        currentPath: any;
        constructor();
        moveTo(x: any, y: any): void;
        lineTo(x: any, y: any): void;
        quadraticCurveTo(aCPx: any, aCPy: any, aX: any, aY: any): void;
        bezierCurveTo(aCP1x: any, aCP1y: any, aCP2x: any, aCP2y: any, aX: any, aY: any): void;
        splineThru(pts: any): void;
        toShapes(isCCW: any, noHoles: any): any[];
    }
}
declare module THREE {
    class EllipseCurve extends Curve {
        type: any;
        aX: any;
        aY: any;
        xRadius: any;
        yRadius: any;
        aStartAngle: any;
        aEndAngle: any;
        aClockwise: any;
        aRotation: any;
        isEllipseCurve: any;
        constructor(aX: any, aY: any, xRadius: any, yRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any, aRotation: any);
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class ArcCurve extends EllipseCurve {
        type: any;
        isArcCurve: boolean;
        constructor(aX: any, aY: any, aRadius: any, aStartAngle: any, aEndAngle: any, aClockwise: any);
    }
}
declare module THREE {
    function CubicPoly(): {
        initCatmullRom: (x0: any, x1: any, x2: any, x3: any, tension: any) => void;
        initNonuniformCatmullRom: (x0: any, x1: any, x2: any, x3: any, dt0: any, dt1: any, dt2: any) => void;
        calc: (t: any) => number;
    };
    class CatmullRomCurve3 {
        type: string;
        points: any;
        closed: any;
        curveType: any;
        tension: any;
        isCatmullRomCurve3: any;
        constructor(points: any, closed: any, curveType: any, tension: any);
        getPoint(t: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class CubicBezierCurve extends Curve {
        type: any;
        v0: any;
        v1: any;
        v2: any;
        v3: any;
        isCubicBezierCurve: any;
        constructor(v0: any, v1: any, v2: any, v3: any);
        getPoint(t: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class CubicBezierCurve3 extends Curve {
        type: any;
        v0: any;
        v1: any;
        v2: any;
        v3: any;
        isCubicBezierCurve3: any;
        constructor(v0: any, v1: any, v2: any, v3: any);
        getPoint(t: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class LineCurve extends Curve {
        type: any;
        v1: any;
        v2: any;
        isLineCurve: any;
        constructor(v1: any, v2: any);
        getPoint(t: any, optionalTarget: any): any;
        getPointAt(u: any, optionalTarget: any): any;
        getTangent(): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class LineCurve3 extends Curve {
        type: any;
        v1: any;
        v2: any;
        isLineCurve3: any;
        constructor(v1: any, v2: any);
        getPoint(t: any, optionalTarget: any): any;
        getPointAt(u: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class QuadraticBezierCurve extends Curve {
        type: any;
        v0: any;
        v1: any;
        v2: any;
        v3: any;
        isQuadraticBezierCurve: any;
        constructor(v0: any, v1: any, v2: any);
        getPoint(t: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class QuadraticBezierCurve3 extends Curve {
        type: any;
        v0: any;
        v1: any;
        v2: any;
        isQuadraticBezierCurve3: any;
        constructor(v0: any, v1: any, v2: any);
        getPoint(t: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    class SplineCurve extends Curve {
        type: any;
        points: any;
        isSplineCurve: any;
        constructor(points: any);
        getPoint(t: any, optionalTarget: any): any;
        copy(source: any): this;
        toJSON(): any;
        fromJSON(json: any): this;
    }
}
declare module THREE {
    var Curves: {
        "ArcCurve": typeof ArcCurve;
        "CatmullRomCurve3": typeof CatmullRomCurve3;
        "CubicBezierCurve": typeof CubicBezierCurve;
        "CubicBezierCurve3": typeof CubicBezierCurve3;
        "EllipseCurve": typeof EllipseCurve;
        "LineCurve": typeof LineCurve;
        "LineCurve3": typeof LineCurve3;
        "QuadraticBezierCurve": typeof QuadraticBezierCurve;
        "QuadraticBezierCurve3": typeof QuadraticBezierCurve3;
        "SplineCurve": typeof SplineCurve;
    };
}
declare module THREE {
    class ImmediateRenderObject extends Object3D {
        material: any;
        isImmediateRenderObject: any;
        constructor();
        render(): void;
    }
}
declare module THREE {
    class BoxGeometry extends Geometry {
        parameters: any;
        type: string;
        constructor(width: any, height: any, depth: any, widthSegments?: any, heightSegments?: any, depthSegments?: any);
    }
    class BoxBufferGeometry extends BufferGeometry {
        constructor(width: any, height: any, depth: any, widthSegments: any, heightSegments: any, depthSegments: any);
    }
}
declare module THREE {
    class CircleGeometry extends Geometry {
        parameters: any;
        type: string;
        constructor(radius: any, segments: any, thetaStart: any, thetaLength: any);
    }
    class CircleBufferGeometry extends BufferGeometry {
        constructor(radius: any, segments: any, thetaStart: any, thetaLength: any);
    }
}
declare module THREE {
    class CylinderGeometry extends Geometry {
        type: string;
        parameters: any;
        constructor(radiusTop: any, radiusBottom: any, height: any, radialSegments: any, heightSegments: any, openEnded: any, thetaStart: any, thetaLength: any);
    }
    class CylinderBufferGeometry extends BufferGeometry {
        constructor(radiusTop: any, radiusBottom: any, height: any, radialSegments: any, heightSegments: any, openEnded: any, thetaStart: any, thetaLength: any);
    }
}
declare module THREE {
    class ConeGeometry extends CylinderGeometry {
        constructor(radius: any, height: any, radialSegments: any, heightSegments: any, openEnded: any, thetaStart: any, thetaLength: any);
    }
    class ConeBufferGeometry extends CylinderBufferGeometry {
        constructor(radius: any, height: any, radialSegments: any, heightSegments: any, openEnded: any, thetaStart: any, thetaLength: any);
    }
}
declare module THREE {
    class PolyhedronGeometry extends Geometry {
        constructor(vertices: any, indices: any, radius: any, detail: any);
    }
    class PolyhedronBufferGeometry extends BufferGeometry {
        constructor(vertices: any, indices: any, radius: any, detail: any);
    }
}
declare module THREE {
    class DodecahedronGeometry extends Geometry {
        constructor(radius: any, detail: any);
    }
    class DodecahedronBufferGeometry extends PolyhedronBufferGeometry {
        constructor(radius: any, detail: any);
    }
}
declare module THREE {
    class EdgesGeometry extends BufferGeometry {
        constructor(geometry: any, thresholdAngle: any);
    }
}
declare module THREE {
    class ExtrudeGeometry extends Geometry {
        constructor(shapes: any, options: any);
    }
    class ExtrudeBufferGeometry extends BufferGeometry {
        constructor(shapes: any, options: any);
        static WorldUVGenerator: any;
    }
}
declare module THREE {
    class WireframeGeometry extends BufferGeometry {
        constructor(geometry: any);
    }
}
declare module THREE {
    class ParametricGeometry extends Geometry {
        constructor(func: any, slices: any, stacks: any);
    }
    class ParametricBufferGeometry extends BufferGeometry {
        constructor(func: any, slices: any, stacks: any);
    }
}
declare module THREE {
    class TetrahedronGeometry extends Geometry {
        constructor(radius: any, detail: any);
    }
    class TetrahedronBufferGeometry extends PolyhedronBufferGeometry {
        constructor(radius: any, detail: any);
    }
}
declare module THREE {
    class OctahedronGeometry extends Geometry {
        constructor(radius: any, detail: any);
    }
    class OctahedronBufferGeometry extends PolyhedronBufferGeometry {
        constructor(radius: any, detail: any);
    }
}
declare module THREE {
    class IcosahedronGeometry extends Geometry {
        constructor(radius: any, detail: any);
    }
    class IcosahedronBufferGeometry extends PolyhedronBufferGeometry {
        constructor(radius: any, detail: any);
    }
}
declare module THREE {
    class TubeGeometry extends Geometry {
        binormals: any;
        normals: any;
        tangents: any;
        constructor(path: any, tubularSegments: any, radius: any, radialSegments: any, closed: any, taper: any);
    }
    class TubeBufferGeometry extends BufferGeometry {
        binormals: any;
        normals: any;
        tangents: any;
        constructor(path: any, tubularSegments: any, radius: any, radialSegments: any, closed: any);
    }
}
declare module THREE {
    class TorusKnotGeometry extends Geometry {
        constructor(radius: any, tube: any, tubularSegments: any, radialSegments: any, p: any, q: any, heightScale: any);
    }
    class TorusKnotBufferGeometry extends BufferGeometry {
        constructor(radius: any, tube: any, tubularSegments: any, radialSegments: any, p: any, q: any);
    }
}
declare module THREE {
    class TorusGeometry extends Geometry {
        constructor(radius: any, tube: any, radialSegments: any, tubularSegments: any, arc: any);
    }
    class TorusBufferGeometry extends BufferGeometry {
        constructor(radius: any, tube: any, radialSegments: any, tubularSegments: any, arc: any);
    }
}
declare module THREE {
    class TextGeometry extends Geometry {
        constructor(text: any, parameters: any);
    }
    class TextBufferGeometry {
        type: string;
        constructor(text: any, parameters: any);
    }
}
declare module THREE {
    class SphereGeometry extends Geometry {
        constructor(radius: any, widthSegments: any, heightSegments: any, phiStart: any, phiLength: any, thetaStart: any, thetaLength: any);
    }
    class SphereBufferGeometry extends BufferGeometry {
        constructor(radius: any, widthSegments: any, heightSegments: any, phiStart: any, phiLength: any, thetaStart: any, thetaLength: any);
    }
}
declare module THREE {
    class RingGeometry extends Geometry {
        constructor(innerRadius: any, outerRadius: any, thetaSegments: any, phiSegments: any, thetaStart: any, thetaLength: any);
    }
    class RingBufferGeometry extends BufferGeometry {
        constructor(innerRadius: any, outerRadius: any, thetaSegments: any, phiSegments: any, thetaStart: any, thetaLength: any);
    }
}
declare module THREE {
    class PlaneGeometry extends Geometry {
        constructor(width: any, height: any, widthSegments: any, heightSegments: any);
    }
    class PlaneBufferGeometry extends BufferGeometry {
        constructor(width: any, height: any, widthSegments: any, heightSegments: any);
    }
}
declare module THREE {
    class LatheGeometry extends Geometry {
        constructor(points: any, segments: any, phiStart: any, phiLength: any);
    }
    class LatheBufferGeometry extends BufferGeometry {
        constructor(points: any, segments: any, phiStart: any, phiLength: any);
    }
}
declare module THREE {
    class ShapeGeometry extends Geometry {
        constructor(shapes: any, curveSegments: any);
        toJSON(): any;
    }
    class ShapeBufferGeometry extends BufferGeometry {
        constructor(shapes: any, curveSegments: any);
        toJSON(): any;
    }
}
declare module THREE {
    var Geometries: any;
}
/**
 * @author WestLangley / http://github.com/WestLangley
 * @author zz85 / http://github.com/zz85
 * @author bhouston / http://clara.io
 *
 * Creates an arrow for visualizing directions
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  color - color in hex value
 *  headLength - Number
 *  headWidth - Number
 */
declare module THREE {
    class ArrowHelper extends Object3D {
        BufferGeometry: any;
        position: any;
        line: any;
        cone: any;
        constructor(dir: any, origin: any, length: any, color: any, headLength: any, headWidth: any);
        setDirection(dir: any): void;
        setLength(length: any, headLength: any, headWidth: any): void;
        setColor(color: any): void;
    }
}
declare module THREE {
    class Line extends Object3D {
        material: any;
        geometry: any;
        isLine: boolean;
        constructor(geometry?: any, material?: any, mode?: any);
        computeLineDistances(): this;
        raycast(raycaster?: any, intersects?: any): void;
        clone(): any;
    }
}
declare module THREE {
    class LineSegments extends Line {
        isLineSegments: boolean;
        constructor(geometry: any, material: any);
        computeLineDistances(): this;
    }
}
declare module THREE {
    class AxesHelper extends LineSegments {
        constructor(size: any);
    }
}
declare module THREE {
    class Box3Helper extends LineSegments {
        type: any;
        box: any;
        color: any;
        indices: any;
        positions: any;
        geometry: any;
        constructor(box: any, hex: any);
        updateMatrixWorld(force: any): void;
    }
}
declare module THREE {
    class BoxHelper extends LineSegments {
        object: any;
        matrixAutoUpdate: any;
        constructor(object: any, color: any);
        update(object: any): void;
        setFromObject(object: any): this;
    }
}
declare module THREE {
    class CameraHelper extends LineSegments {
        pointMap: any;
        camera: any;
        constructor(camera: any);
        update(): void;
    }
}
declare module THREE {
    class DirectionalLightHelper extends Object3D {
        light: any;
        color: any;
        lightPlane: any;
        targetLine: any;
        constructor(light: any, size: any, color: any);
        dispose(): void;
        update(): void;
    }
}
declare module THREE {
    class FaceNormalsHelper extends LineSegments {
        object: any;
        size: any;
        constructor(object: any, size: any, hex: any, linewidth: any);
        update(): void;
    }
}
declare module THREE {
    class GridHelper extends LineSegments {
        constructor(size: any, divisions: any, color1: any, color2: any);
    }
}
declare module THREE {
    class HemisphereLightHelper extends Object3D {
        light: any;
        color: any;
        material: any;
        children: any;
        constructor(light: any, size: any, color: any);
        dispose(): void;
        update(): void;
    }
}
declare module THREE {
    class PlaneHelper extends Line {
        plane: any;
        size: any;
        constructor(plane: any, size: any, hex: any);
        updateMatrixWorld(force: any): void;
    }
}
declare module THREE {
    class Mesh extends Object3D {
        morphTargetDictionary: any;
        morphTargetInfluences: any;
        drawMode: number;
        material: any;
        geometry: any;
        isMesh: boolean;
        constructor(geometry: any, material: any);
        setDrawMode(value: any): void;
        copy(source: any): this;
        updateMorphTargets(): void;
        raycast(raycaster?: any, intersects?: any): void;
        clone(): Mesh;
    }
}
declare module THREE {
    class PointLightHelper extends Mesh {
        color: any;
        light: any;
        constructor(light: any, sphereSize: any, color: any);
        dispose(): void;
        update(): void;
    }
}
declare module THREE {
    class PolarGridHelper extends LineSegments {
        constructor(radius: any, radials: any, circles: any, divisions: any, color1: any, color2: any);
    }
}
declare module THREE {
    class RectAreaLightHelper extends Object3D {
        light: any;
        color: any;
        line: any;
        constructor(light: any, color: any);
        dispose(): void;
        update(): void;
    }
}
declare module THREE {
    class SkeletonHelper extends LineSegments {
        root: any;
        bones: any;
        constructor(object: any);
        updateMatrixWorld(force: any): void;
    }
}
declare module THREE {
    class SpotLightHelper extends Object3D {
        light: any;
        color: any;
        cone: any;
        constructor(light: any, color: any);
        dispose(): void;
        update(): void;
    }
}
declare module THREE {
    class VertexNormalsHelper extends LineSegments {
        object: any;
        size: any;
        constructor(object: any, size: any, hex: any, linewidth: any);
        update(): void;
    }
}
declare module THREE {
    class Light extends Object3D {
        type: any;
        color: any;
        intensity: any;
        receiveShadow: any;
        isLight: any;
        groundColor: any;
        distance: any;
        angle: any;
        decay: any;
        penumbra: any;
        shadow: any;
        constructor(color: any, intensity: any);
        copy(source: any): this;
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class AmbientLight extends Light {
        type: any;
        castShadow: any;
        isAmbientLight: any;
        constructor(color: any, intensity: any);
    }
}
declare module THREE {
    class DirectionalLight extends Light {
        type: any;
        position: any;
        target: any;
        shadow: any;
        isDirectionalLight: any;
        constructor(color: any, intensity: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class LightShadow {
        camera: any;
        bias: any;
        radius: any;
        mapSize: any;
        map: any;
        matrix: any;
        constructor(camera: any);
        copy(source: any): this;
        clone(): LightShadow;
        toJSON(): any;
    }
}
declare module THREE {
    class DirectionalLightShadow extends LightShadow {
        constructor();
    }
}
declare module THREE {
    class HemisphereLight extends Light {
        type: any;
        castShadow: any;
        postion: any;
        position: any;
        groundColor: any;
        isHemisphereLight: any;
        constructor(skyColor: any, groundColor: any, intensity: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class PointLight extends Light {
        isPointLight: any;
        constructor(color: any, intensity: any, distance: any, decay: any);
        power: number;
        copy(source: any): this;
    }
}
declare module THREE {
    class RectAreaLight extends Light {
        width: any;
        height: any;
        isRectAreaLight: any;
        constructor(color: any, intensity: any, width: any, height: any);
        copy(source: any): this;
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class SpotLight extends Light {
        target: any;
        isSpotLight: any;
        constructor(color: any, intensity: any, distance: any, angle: any, penumbra: any, decay: any);
        power: number;
        copy(source: any): this;
    }
}
declare module THREE {
    class SpotLightShadow extends LightShadow {
        isSpotLightShadow: any;
        constructor();
        update(light: any): void;
    }
}
declare module THREE {
    class AnimationLoader {
        manager: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
        parse(json: any, onLoad: any): void;
    }
}
declare module THREE {
    class AudioLoader {
        manager: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
    }
}
declare module THREE {
    class BufferGeometryLoader {
        manager: any;
        constructor(manager?: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
        parse(json: any): BufferGeometry;
    }
    var TYPED_ARRAYS: {
        Int8Array: Int8ArrayConstructor;
        Uint8Array: Uint8ArrayConstructor;
        Uint8ClampedArray: Uint8ArrayConstructor | Uint8ClampedArrayConstructor;
        Int16Array: Int16ArrayConstructor;
        Uint16Array: Uint16ArrayConstructor;
        Int32Array: Int32ArrayConstructor;
        Uint32Array: Uint32ArrayConstructor;
        Float32Array: Float32ArrayConstructor;
        Float64Array: Float64ArrayConstructor;
    };
}
declare module THREE {
    var Cache: {
        enabled: boolean;
        files: {};
        add: (key: any, file: any) => void;
        get: (key: any) => any;
        remove: (key: any) => void;
        clear: () => void;
    };
}
declare module THREE {
    class CompressedTextureLoader {
        manager: any;
        _parser: any;
        path: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): CompressedTexture;
        setPath(value: any): this;
    }
}
declare module THREE {
    class CubeTextureLoader {
        manager: any;
        crossOrigin: any;
        path: any;
        constructor(manager: any);
        load(urls: any, onLoad: any, onProgress: any, onError: any): CubeTexture;
        setCrossOrigin(value: any): this;
        setPath(value: any): this;
    }
}
declare module THREE {
    class DataTextureLoader {
        manager: any;
        _parser: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): DataTexture;
    }
}
declare module THREE {
    class FileLoader {
        manager: any;
        path: any;
        responseType: any;
        withCredentials: any;
        requestHeader: any;
        mimeType: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): any;
        setPath(value: any): this;
        setResponseType(value: any): this;
        setWithCredentials(value: any): this;
        setMimeType(value: any): this;
        setRequestHeader(value: any): this;
    }
}
declare module THREE {
    class FontLoader {
        manager: any;
        path: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
        parse(json: any): Font;
        setPath(value: any): this;
    }
}
declare module THREE {
    class ImageBitmapLoader {
        path: any;
        options: any;
        manager: any;
        constructor(manager: any);
        setOptions(options: any): this;
        load(url: any, onLoad: any, onProgress: any, onError: any): any;
        setCrossOrigin(): this;
        setPath(value: any): this;
    }
}
declare module THREE {
    class ImageLoader {
        path: any;
        manager: any;
        crossOrigin: string;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): any;
        setCrossOrigin(value: any): this;
        setPath(value: any): this;
    }
}
declare module THREE {
    class JSONLoader {
        crossOrigin(arg0: any, arg1: any, arg2: any): any;
        withCredentials: boolean;
        manager: any;
        texturePath: any;
        constructor(manager?: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
        setTexturePath(value: any): void;
        parse(json: any, texturePath: any): {
            geometry: Geometry;
            materials?: undefined;
        } | {
            geometry: Geometry;
            materials: any[];
        };
    }
}
declare module THREE {
    class Loader {
        static Handlers: any;
        crossOrigin: any;
        constructor();
        onLoadStart(): void;
        onLoadProgress(): void;
        onLoadComplete(): void;
        initMaterials(materials: any, texturePath: any, crossOrigin: any): any[];
        createMaterial(m: any, texturePath: any, crossOrigin: any): any;
    }
}
declare module THREE {
    class LoaderUtils {
        static decodeText(array: any): any;
        static extractUrlBase(url: any): any;
    }
}
declare module THREE {
    class LoadingManager {
        isLoading: boolean;
        itemsLoaded: number;
        itemsTotal: number;
        urlModifier: any;
        onStart: any;
        onLoad: any;
        onProgress: any;
        onError: any;
        constructor(onLoad?: any, onProgress?: any, onError?: any);
        itemStart(url: any): void;
        itemEnd: (url: any) => void;
        itemError(url: any): void;
        resolveURL(url: any): any;
        setURLModifier(transform: any): this;
    }
    var DefaultLoadingManager: LoadingManager;
}
declare module THREE {
    class MaterialLoader {
        manager: any;
        textures: any;
        constructor(manager?: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
        setTextures(value: any): void;
        parse(json: any): any;
    }
}
declare module THREE {
    class ObjectLoader {
        crossOrigin: any;
        manager: any;
        texturePath: any;
        constructor(manager: any);
        load(url: any, onLoad: any, onProgress: any, onError: any): void;
        setTexturePath(value: any): this;
        setCrossOrigin(value: any): this;
        parse(json: any, onLoad: any): any;
        parseShape(json: any): {};
        parseGeometries(json: any, shapes: any): {};
        parseMaterials(json: any, textures: any): {};
        parseAnimations(json: any): any[];
        parseImages(json: any, onLoad: any): {};
        parseTextures(json: any, images: any): {};
        parseObject(data: any, geometries?: any, materials?: any): any;
    }
}
declare module THREE {
    class TextureLoader {
        path: any;
        manager: any;
        crossOrigin: string;
        constructor(manager?: any);
        load(url: any, onLoad?: any, onProgress?: any, onError?: any): Texture;
        setCrossOrigin(value: any): this;
        setPath(value: any): this;
    }
}
declare module THREE {
    class Material extends EventDispatcher {
        id: number;
        uuid: string;
        name: string;
        type: string;
        fog: boolean;
        lights: boolean;
        blending: number;
        side: number;
        flatShading: boolean;
        vertexColors: number;
        opacity: number;
        transparent: boolean;
        blendSrc: number;
        blendDst: number;
        blendEquation: number;
        blendSrcAlpha: any;
        blendDstAlpha: any;
        blendEquationAlpha: any;
        depthFunc: number;
        depthTest: boolean;
        depthWrite: boolean;
        clippingPlanes: any;
        clipIntersection: boolean;
        clipShadows: boolean;
        shadowSide: any;
        colorWrite: boolean;
        precision: any;
        polygonOffset: boolean;
        polygonOffsetFactor: number;
        polygonOffsetUnits: number;
        dithering: boolean;
        alphaTest: number;
        premultipliedAlpha: boolean;
        overdraw: number;
        visible: boolean;
        userData: {};
        needsUpdate: boolean;
        isMaterial: boolean;
        static materialId: number;
        constructor();
        onBeforeCompile(): void;
        setValues(values: any): void;
        toJSON(meta: any): any;
        clone(): Material;
        copy(source: any): this;
        dispose(): void;
    }
}
declare module THREE {
    class LineBasicMaterial extends Material {
        linejoin: string;
        linecap: string;
        linewidth: number;
        color: Color;
        isLineBasicMaterial: boolean;
        constructor(parameters?: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class LineDashedMaterial extends LineBasicMaterial {
        scale: number;
        dashSize: number;
        gapSize: number;
        isLineDashedMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class ShadowMaterial extends Material {
        color: Color;
        isShadowMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class SpriteMaterial extends Material {
        color: Color;
        map: any;
        rotation: number;
        isSpriteMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class ShaderMaterial extends Material {
        defines: {};
        uniforms: {};
        vertexShader: string;
        fragmentShader: string;
        linewidth: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        clipping: boolean;
        skinning: boolean;
        morphTargets: boolean;
        morphNormals: boolean;
        extensions: {
            derivatives: boolean;
            fragDepth: boolean;
            drawBuffers: boolean;
            shaderTextureLOD: boolean;
        };
        defaultAttributeValues: {
            'color': number[];
            'uv': number[];
            'uv2': number[];
        };
        index0AttributeName: any;
        uniformsNeedUpdate: boolean;
        isShaderMaterial: boolean;
        constructor(parameters?: any);
        copy(source: any): this;
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class MeshStandardMaterial extends Material {
        defines: any;
        color: Color;
        roughness: number;
        metalness: number;
        map: any;
        lightMap: any;
        lightMapIntensity: number;
        aoMap: any;
        aoMapIntensity: number;
        emissive: Color;
        emissiveIntensity: number;
        emissiveMap: any;
        bumpMap: any;
        bumpScale: number;
        normalMap: any;
        normalScale: Vector2;
        displacementMap: any;
        displacementScale: number;
        displacementBias: number;
        roughnessMap: any;
        metalnessMap: any;
        alphaMap: any;
        envMap: any;
        envMapIntensity: number;
        refractionRatio: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        wireframeLinecap: string;
        wireframeLinejoin: string;
        skinning: boolean;
        morphTargets: boolean;
        morphNormals: boolean;
        isMeshStandardMaterial: boolean;
        constructor(parameters?: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshPhysicalMaterial extends MeshStandardMaterial {
        defines: any;
        type: string;
        reflectivity: number;
        clearCoat: number;
        clearCoatRoughness: number;
        isMeshPhysicalMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class PointsMaterial extends Material {
        color: Color;
        map: any;
        size: number;
        sizeAttenuation: boolean;
        isPointsMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class RawShaderMaterial extends ShaderMaterial {
        type: string;
        isRawShaderMaterial: boolean;
        constructor(parameters: any);
    }
}
declare module THREE {
    class MeshPhongMaterial extends Material {
        color: Color;
        specular: Color;
        shininess: number;
        map: any;
        lightMap: any;
        lightMapIntensity: number;
        aoMap: any;
        aoMapIntensity: number;
        emissive: Color;
        emissiveIntensity: number;
        emissiveMap: any;
        bumpMap: any;
        bumpScale: number;
        normalMap: any;
        normalScale: Vector2;
        displacementMap: any;
        displacementScale: number;
        displacementBias: number;
        specularMap: any;
        alphaMap: any;
        envMap: any;
        combine: number;
        reflectivity: number;
        refractionRatio: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        wireframeLinecap: string;
        wireframeLinejoin: string;
        skinning: boolean;
        morphTargets: boolean;
        morphNormals: boolean;
        isMeshPhongMaterial: boolean;
        constructor(parameters?: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshToonMaterial extends MeshPhongMaterial {
        defines: any;
        gradientMap: any;
        isMeshToonMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshNormalMaterial extends Material {
        bumpMap: any;
        bumpScale: number;
        normalMap: any;
        normalScale: Vector2;
        displacementMap: any;
        displacementScale: number;
        displacementBias: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        skinning: boolean;
        morphTargets: boolean;
        morphNormals: boolean;
        isMeshNormalMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshLambertMaterial extends Material {
        color: Color;
        map: any;
        lightMap: any;
        lightMapIntensity: number;
        aoMap: any;
        aoMapIntensity: number;
        emissive: Color;
        emissiveIntensity: number;
        emissiveMap: any;
        specularMap: any;
        alphaMap: any;
        envMap: any;
        combine: number;
        reflectivity: number;
        refractionRatio: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        wireframeLinecap: string;
        wireframeLinejoin: string;
        skinning: boolean;
        morphTargets: boolean;
        morphNormals: boolean;
        isMeshLambertMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshDepthMaterial extends Material {
        depthPacking: number;
        skinning: boolean;
        morphTargets: boolean;
        map: any;
        alphaMap: any;
        displacementMap: any;
        displacementScale: number;
        displacementBias: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        isMeshDepthMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshDistanceMaterial extends Material {
        referencePosition: Vector3;
        nearDistance: number;
        farDistance: number;
        skinning: boolean;
        morphTargets: boolean;
        map: any;
        alphaMap: any;
        displacementMap: any;
        displacementScale: number;
        displacementBias: number;
        isMeshDistanceMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    class MeshBasicMaterial extends Material {
        color: Color;
        map: any;
        lightMap: any;
        lightMapIntensity: number;
        aoMap: any;
        aoMapIntensity: number;
        specularMap: any;
        alphaMap: any;
        envMap: any;
        combine: number;
        reflectivity: number;
        refractionRatio: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        wireframeLinecap: string;
        wireframeLinejoin: string;
        skinning: boolean;
        morphTargets: boolean;
        isMeshBasicMaterial: boolean;
        constructor(parameters: any);
        copy(source: any): this;
    }
}
declare module THREE {
    var Materials: {
        "ShadowMaterial": typeof ShadowMaterial;
        "SpriteMaterial": typeof SpriteMaterial;
        "RawShaderMaterial": typeof RawShaderMaterial;
        "ShaderMaterial": typeof ShaderMaterial;
        "PointsMaterial": typeof PointsMaterial;
        "MeshPhysicalMaterial": typeof MeshPhysicalMaterial;
        "MeshStandardMaterial": typeof MeshStandardMaterial;
        "MeshPhongMaterial": typeof MeshPhongMaterial;
        "MeshToonMaterial": typeof MeshToonMaterial;
        "MeshNormalMaterial": typeof MeshNormalMaterial;
        "MeshLambertMaterial": typeof MeshLambertMaterial;
        "MeshDepthMaterial": typeof MeshDepthMaterial;
        "MeshDistanceMaterial": typeof MeshDistanceMaterial;
        "MeshBasicMaterial": typeof MeshBasicMaterial;
        "LineDashedMaterial": typeof LineDashedMaterial;
        "LineBasicMaterial": typeof LineBasicMaterial;
        "Material": typeof Material;
    };
}
declare module THREE {
    /**
     * @author Yanbei.HUANG
     * @description 2018/5/15
     */
    class Box2 {
        /**最小值 */
        min: Vector2;
        /**最大值 */
        max: Vector2;
        /**构造函数 */
        constructor(min?: Vector2, max?: Vector2);
        /**
         * 设置最大值和最小值
         * @param min
         * @param max
         */
        set(min: Vector2, max: Vector2): Box2;
        /**
         * 由点序列生成box
         * @param points
         */
        setFromPoints(points: Array<Vector2>): Box2;
        /**
         * 把box置空
         */
        makeEmpty(): this;
        /**
         * 由点扩充
         * @param point
         */
        expandByPoint(point: Vector2): this;
        /**
         * 根据中心点和尺寸
         * @param center
         * @param size
         */
        setFromCenterAndSize(center: Vector2, size: number): this;
        /**
         * 克隆
         */
        clone(): Box2;
        /**
         * box2
         * @param box
         */
        copy(box: Box2): this;
        /**
         * 判断是否为空
         */
        isEmpty(): boolean;
        /**
         * 得到中心点
         * @param target
         */
        getCenter(target: any): any;
        /**
         * 得到对角线长度
         * @param target
         */
        getSize(target: any): any;
        /**
         * 由一个向量扩展
         * @param vector
         */
        expandByVector(vector: Vector2): this;
        /**
         * 由缩放倍数扩展
         * @param scalar
         */
        expandByScalar(scalar: number): this;
        /**
         * 判断点是否在盒子内
         * @param point
         */
        containsPoint(point: Vector2): boolean;
        /**
         * 判断盒子是否在大盒子内
         * @param box
         */
        containsBox(box: Box2): boolean;
        /**
         * 获取点在空间内的位置，归一化的位置，
         * @param point
         * @param target
         */
        getParameter(point: Vector2, target: any): any;
        /**
         * 盒子交叉
         * @param box
         */
        intersectsBox(box: Box2): boolean;
        /**
         * 获取点在对角线上的比例
         * @param point
         * @param target
         */
        clampPoint(point: Vector2, target: any): any;
        /**
         *
         * @param point
         */
        distanceToPoint(point: Vector2): number;
        /**
         * 交叉
         * @param box
         */
        intersect(box: Box2): this;
        /**
         * 合并
         * @param box
         */
        union(box: Box2): this;
        /**
         * 平移
         * @param offset
         */
        translate(offset: Vector2): this;
        /**
         * 判断两个盒子是否相等
         * @param box
         */
        equals(box: Box2): boolean;
    }
}
declare module THREE {
    class Box3 {
        min: Vector3;
        max: Vector3;
        isBox3: boolean;
        constructor(min?: Vector3, max?: Vector3);
        set(min: Vector3, max: Vector3): Box3;
        setFromArray(array: Array<number>): Box3;
        /**
         *
         * @param attribute bufferAttribute带有getX方法的点集
         */
        setFromBufferAttribute(attribute: any): Box3;
        setFromPoints(points: any): Box3;
        static v1: Vector3;
        setFromCenterAndSize(center: Vector3, size: Vector3): Box3;
        setFromObject(object: any): Box3;
        clone(): Box3;
        copy(box: Box3): Box3;
        makeEmpty(): Box3;
        isEmpty(): boolean;
        getCenter(target?: Vector3): Vector3;
        getSize(target?: Vector3): Vector3;
        expandByPoint(point: Vector3): Box3;
        expandByVector(vector: Vector3): Box3;
        expandByScalar(scalar: number): Box3;
        traverse(node: any): void;
        expandByObject(object: any): this;
        containsPoint(point: Vector3): boolean;
        containsBox(box: Box3): boolean;
        getParameter(point: Vector3, target?: Vector3): Vector3;
        intersectsBox(box: Box3): boolean;
        static closestPoint: Vector3;
        intersectsSphere(sphere: any): boolean;
        intersectsPlane(plane: Plane): boolean;
        static v0: Vector3;
        static v2: Vector3;
        static f0: Vector3;
        static f1: Vector3;
        static f2: Vector3;
        static testAxis: Vector3;
        static center: Vector3;
        static extents: Vector3;
        static triangleNormal: Vector3;
        private satForAxes(axes);
        intersectsTriangle(triangle: Triangle): boolean;
        clampPoint(point: Vector3, target?: Vector3): Vector3;
        distanceToPoint(point: any): number;
        getBoundingSphere(target?: Sphere): Sphere;
        intersect(box: Box3): this;
        union(box: Box3): this;
        /**
         * @param matrix
         */
        applyMatrix4(matrix: any): Box3;
        translate(offset: Vector3): Box3;
        equals(box: Box3): boolean;
    }
}
declare var _Math: any;
declare var ColorKeywords: {
    'aliceblue': number;
    'antiquewhite': number;
    'aqua': number;
    'aquamarine': number;
    'azure': number;
    'beige': number;
    'bisque': number;
    'black': number;
    'blanchedalmond': number;
    'blue': number;
    'blueviolet': number;
    'brown': number;
    'burlywood': number;
    'cadetblue': number;
    'chartreuse': number;
    'chocolate': number;
    'coral': number;
    'cornflowerblue': number;
    'cornsilk': number;
    'crimson': number;
    'cyan': number;
    'darkblue': number;
    'darkcyan': number;
    'darkgoldenrod': number;
    'darkgray': number;
    'darkgreen': number;
    'darkgrey': number;
    'darkkhaki': number;
    'darkmagenta': number;
    'darkolivegreen': number;
    'darkorange': number;
    'darkorchid': number;
    'darkred': number;
    'darksalmon': number;
    'darkseagreen': number;
    'darkslateblue': number;
    'darkslategray': number;
    'darkslategrey': number;
    'darkturquoise': number;
    'darkviolet': number;
    'deeppink': number;
    'deepskyblue': number;
    'dimgray': number;
    'dimgrey': number;
    'dodgerblue': number;
    'firebrick': number;
    'floralwhite': number;
    'forestgreen': number;
    'fuchsia': number;
    'gainsboro': number;
    'ghostwhite': number;
    'gold': number;
    'goldenrod': number;
    'gray': number;
    'green': number;
    'greenyellow': number;
    'grey': number;
    'honeydew': number;
    'hotpink': number;
    'indianred': number;
    'indigo': number;
    'ivory': number;
    'khaki': number;
    'lavender': number;
    'lavenderblush': number;
    'lawngreen': number;
    'lemonchiffon': number;
    'lightblue': number;
    'lightcoral': number;
    'lightcyan': number;
    'lightgoldenrodyellow': number;
    'lightgray': number;
    'lightgreen': number;
    'lightgrey': number;
    'lightpink': number;
    'lightsalmon': number;
    'lightseagreen': number;
    'lightskyblue': number;
    'lightslategray': number;
    'lightslategrey': number;
    'lightsteelblue': number;
    'lightyellow': number;
    'lime': number;
    'limegreen': number;
    'linen': number;
    'magenta': number;
    'maroon': number;
    'mediumaquamarine': number;
    'mediumblue': number;
    'mediumorchid': number;
    'mediumpurple': number;
    'mediumseagreen': number;
    'mediumslateblue': number;
    'mediumspringgreen': number;
    'mediumturquoise': number;
    'mediumvioletred': number;
    'midnightblue': number;
    'mintcream': number;
    'mistyrose': number;
    'moccasin': number;
    'navajowhite': number;
    'navy': number;
    'oldlace': number;
    'olive': number;
    'olivedrab': number;
    'orange': number;
    'orangered': number;
    'orchid': number;
    'palegoldenrod': number;
    'palegreen': number;
    'paleturquoise': number;
    'palevioletred': number;
    'papayawhip': number;
    'peachpuff': number;
    'peru': number;
    'pink': number;
    'plum': number;
    'powderblue': number;
    'purple': number;
    'rebeccapurple': number;
    'red': number;
    'rosybrown': number;
    'royalblue': number;
    'saddlebrown': number;
    'salmon': number;
    'sandybrown': number;
    'seagreen': number;
    'seashell': number;
    'sienna': number;
    'silver': number;
    'skyblue': number;
    'slateblue': number;
    'slategray': number;
    'slategrey': number;
    'snow': number;
    'springgreen': number;
    'steelblue': number;
    'tan': number;
    'teal': number;
    'thistle': number;
    'tomato': number;
    'turquoise': number;
    'violet': number;
    'wheat': number;
    'white': number;
    'whitesmoke': number;
    'yellow': number;
    'yellowgreen': number;
};
declare var isColor: true;
declare var r: 1, g: 1, b: 1;
declare module THREE {
    class Color {
        /**取值范围0-1 */
        r: number;
        g: number;
        b: number;
        isColor: boolean;
        constructor(r?: any, g?: number, b?: number);
        set(value: Color): this;
        setScalar(scalar: number): this;
        /**
         *
         * @param hex
         */
        setHex(hex: number): this;
        setRGB(r: number, g: number, b: number): this;
        private hue2rgb(p, q, t);
        setHSL(h: number, s: number, l: number): this;
        setStyle(style: any): this;
        clone(): Color;
        copy(color: Color): this;
        copyGammaToLinear(color: Color, gammaFactor: number): this;
        copyLinearToGamma(color: Color, gammaFactor: number): this;
        convertGammaToLinear(gammaFactor: number): this;
        convertLinearToGamma(gammaFactor: number): this;
        getHex(): number;
        getHexString(): string;
        getHSL(target: any): any;
        getStyle(): string;
        offsetHSL(h: number, s: number, l: number): this;
        add(color: Color): this;
        addColors(color1: Color, color2: Color): this;
        addScalar(s: number): this;
        sub(color: Color): this;
        multiply(color: Color): this;
        multiplyScalar(s: number): this;
        lerp(color: Color, alpha: number): this;
        equals(c: Color): boolean;
        fromArray(array: Array<number>, offset?: number): this;
        toArray(array: Array<number>, offset: number): number[];
        toJSON(): number;
    }
}
declare module THREE {
    class Cylindrical {
        radius: number;
        theta: number;
        y: number;
        constructor(radius?: number, theta?: number, y?: number);
        set(radius: number, theta: number, y: number): this;
        clone(): Cylindrical;
        copy(other: Cylindrical): this;
        setFromVector3(vec3: Vector3): this;
    }
}
declare module THREE {
    class Euler {
        _x: number;
        _y: number;
        _z: number;
        _order: string;
        isEuler: boolean;
        _onChangeCallback: any;
        static RotationOrders: string[];
        static DefaultOrder: string;
        constructor(x?: number, y?: number, z?: number, order?: string);
        x: number;
        y: number;
        z: number;
        order: string;
        set(x: number, y: number, z: number, order?: string): Euler;
        clone(): Euler;
        copy(euler: Euler): Euler;
        setFromRotationMatrix(m: any, order?: string, update?: boolean): Euler;
        setFromQuaternion(q: any, order: string, update?: boolean): Euler;
        setFromVector3(v: Vector3, order?: string): Euler;
        static q: Quaternion;
        reorder(newOrder: any): Euler;
        equals(euler: Euler): boolean;
        fromArray(array: any): Euler;
        toArray(array: any, offset: any): Euler;
        toVector3(optionalResult: Vector3): Vector3;
        onChange(callback: any): Euler;
        onChangeCallback(): void;
    }
}
declare module THREE {
    class Sphere {
        center: Vector3;
        radius: number;
        constructor(center?: Vector3, radius?: number);
        set(center: Vector3, radius: number): this;
        static box: Box3;
        setFromPoints(points: any, optionalCenter: any): this;
        clone(): Sphere;
        copy(sphere: any): this;
        empty(): boolean;
        containsPoint(point: any): boolean;
        distanceToPoint(point: any): number;
        intersectsSphere(sphere: any): boolean;
        intersectsBox(box: any): any;
        intersectsPlane(plane: any): boolean;
        clampPoint(point: any, target: any): any;
        getBoundingBox(target: any): any;
        applyMatrix4(matrix: any): this;
        translate(offset: any): this;
        equals(sphere: any): boolean;
    }
}
declare module THREE {
    class Frustum {
        /***视椎体平面集 */
        planes: Array<Plane>;
        /**
         *
         * @param p0
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @param p5
         */
        constructor(p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane);
        set(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): this;
        clone(): Frustum;
        copy(frustum: any): this;
        setFromMatrix(m: any): this;
        intersectsObject(object: any): boolean;
        static sphere: Sphere;
        intersectsSprite(sprite: any): boolean;
        intersectsSphere(sphere: Sphere): boolean;
        static p1: Vector3;
        static p2: Vector3;
        intersectsBox(box: any): boolean;
        containsPoint(point: any): boolean;
    }
}
declare module THREE {
    class Interpolant {
        parameterPositions: any;
        _cachedIndex: number;
        resultBuffer: any;
        sampleValues: any;
        valueSize: any;
        constructor(parameterPositions: any, sampleValues: any, sampleSize: number, resultBuffer?: any);
        evaluate(t: any): any;
        settings: any;
        DefaultSettings_: any;
        getSettings_(): any;
        copySampleValue_(index: any): any;
        interpolate_(...args: any[]): void;
        intervalChanged_(...args: any[]): void;
        beforeStart_: any;
        afterEnd_: any;
    }
}
declare module THREE {
    class Line3 {
        start: Vector3;
        end: Vector3;
        constructor(start?: Vector3, end?: Vector3);
        set(start: Vector3, end: Vector3): Line3;
        clone(): Line3;
        copy(line: Line3): Line3;
        getCenter(target?: Vector3): Vector3;
        delta(target?: Vector3): Vector3;
        distanceSq(): number;
        distance(): number;
        at(t: number, target?: Vector3): Vector3;
        closestPointToPointParameter(point: Vector3, clampToLine?: boolean): number;
        closestPointToPoint(point: Vector3, clampToLine?: boolean, target?: Vector3): Vector3;
        applyMatrix4(matrix: Matrix4): Line3;
        equals(line: Line3): boolean;
    }
}
declare module THREE {
    class _Math {
        static DEG2RAD: number;
        static RAD2DEG: number;
        static generateUUID(): string;
        static clamp(value: number, min: number, max: number): number;
        static euclideanModulo(n: number, m: number): number;
        static mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number;
        static lerp(x: number, y: number, t: number): number;
        static smoothstep(x: number, min: number, max: number): number;
        static smootherstep(x: number, min: number, max: number): number;
        static randInt(low: number, high: number): number;
        static randFloat(low: number, high: number): number;
        static randFloatSpread(range: number): number;
        static degToRad(degrees: number): number;
        static radToDeg(radians: number): number;
        static isPowerOfTwo(value: number): boolean;
        static ceilPowerOfTwo(value: number): number;
        static floorPowerOfTwo(value: number): number;
    }
}
declare module THREE {
    class Matrix3 {
        elements: Array<number>;
        isMatrix3: boolean;
        constructor();
        set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): Matrix3;
        identity(): Matrix3;
        clone(): Matrix3;
        copy(m: Matrix3): Matrix3;
        setFromMatrix4(m: Matrix4): Matrix3;
        applyToBufferAttribute(attribute: any): any;
        multiply(m: any): Matrix3;
        premultiply(m: any): Matrix3;
        multiplyMatrices(a: any, b: any): Matrix3;
        multiplyScalar(s: number): Matrix3;
        determinant(): number;
        getInverse(matrix: any, throwOnDegenerate?: boolean): Matrix3;
        transpose(): Matrix3;
        getNormalMatrix(matrix4: Matrix4): Matrix3;
        transposeIntoArray(r: any): Matrix3;
        setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): void;
        scale(sx: number, sy: number): Matrix3;
        rotate(theta: number): Matrix3;
        translate(tx: number, ty: number): Matrix3;
        equals(matrix: Matrix3): boolean;
        fromArray(array: Array<number>, offset?: number): Matrix3;
        toArray(array: Array<number>, offset: number): any;
    }
}
declare module THREE {
    class Matrix4 {
        /**矩阵数据 */
        elements: Array<number>;
        isMatrix4: boolean;
        constructor();
        set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): Matrix4;
        identity(): Matrix4;
        clone(): Matrix4;
        copy(m: any): Matrix4;
        copyPosition(m: any): Matrix4;
        extractBasis(xAxis: any, yAxis: any, zAxis: any): Matrix4;
        makeBasis(xAxis: any, yAxis: any, zAxis: any): Matrix4;
        extractRotation(m: any): Matrix4;
        makeRotationFromEuler(euler: Euler): Matrix4;
        makeRotationFromQuaternion(q: Quaternion): Matrix4;
        lookAt(eye: Vector3, target: Vector3, up: Vector3): Matrix4;
        multiply(m: Matrix4, n?: Matrix4): Matrix4;
        premultiply(m: Matrix4): Matrix4;
        /**
         * 将矩阵a*b的结果赋值给this.elements
         * @param a 矩阵a
         * @param b 矩阵b
         * @returns 返回实例本身
         */
        multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4;
        multiplyScalar(s: number): Matrix4;
        applyToBufferAttribute(attribute: any): any;
        determinant(): number;
        transpose(): Matrix4;
        setPosition(v: any): Matrix4;
        getInverse(m: Matrix4, throwOnDegenerate?: boolean): Matrix4;
        scale(v: Vector3): Matrix4;
        getMaxScaleOnAxis(): number;
        makeTranslation(x: number, y: number, z: number): Matrix4;
        makeRotationX(theta: number): Matrix4;
        makeRotationY(theta: number): Matrix4;
        makeRotationZ(theta: number): Matrix4;
        makeRotationAxis(axis: any, angle: any): Matrix4;
        makeScale(x: number, y: number, z: number): Matrix4;
        makeShear(x: number, y: number, z: number): Matrix4;
        compose(position: Vector3, quaternion: Quaternion, scale: Vector3): Matrix4;
        decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): Matrix4;
        makePerspective(left: number, right: number, top: number, bottom: number, near: number, far?: number): Matrix4;
        makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;
        equals(matrix: Matrix4): boolean;
        fromArray(array: any, offset?: number): Matrix4;
        toArray(array?: any, offset?: number): any;
    }
}
declare module THREE {
    class Plane {
        normal: Vector3;
        constant: number;
        constructor(normal?: Vector3, constant?: number);
        set(normal: Vector3, constant: number): Plane;
        setComponents(x: number, y: number, z: number, w: number): Plane;
        setFromNormalAndCoplanarPoint(normal: any, point: any): Plane;
        static v1: Vector3;
        static v2: Vector3;
        setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane;
        clone(): Plane;
        copy(plane: Plane): Plane;
        normalize(): Plane;
        negate(): Plane;
        distanceToPoint(point: Vector3): number;
        distanceToSphere(sphere: Sphere): number;
        projectPoint(point: Vector3, target?: Vector3): Vector3;
        intersectLine(line: any, target?: Vector3): Vector3;
        intersectsLine(line: any): boolean;
        intersectsBox(box: Box3): boolean;
        intersectsSphere(sphere: any): boolean;
        coplanarPoint(target?: Vector3): Vector3;
        static m1: Matrix3;
        applyMatrix4(matrix: any, optionalNormalMatrix: any): this;
        translate(offset: Vector3): Plane;
        equals(plane: Plane): boolean;
    }
}
declare module THREE {
    class Ray {
        origin: Vector3;
        direction: Vector3;
        constructor(origin?: Vector3, direction?: Vector3);
        set(origin: Vector3, direction: Vector3): this;
        clone(): Ray;
        copy(ray: Ray): this;
        at(t: number, target?: Vector3): Vector3;
        lookAt(v: Vector3): this;
        static v1: Vector3;
        recast(t: number): this;
        closestPointToPoint(point: any, target?: Vector3): Vector3;
        distanceToPoint(point: any): number;
        distanceSqToPoint(point: any): number;
        static segCenter: Vector3;
        static segDir: Vector3;
        static diff: Vector3;
        distanceSqToSegment(v0: Vector3, v1: Vector3, optionalPointOnRay: Vector3, optionalPointOnSegment: Vector3): number;
        intersectSphere(sphere: Sphere, target: Vector3): Vector3;
        intersectsSphere(sphere: Sphere): boolean;
        distanceToPlane(plane: any): number;
        intersectPlane(plane: any, target: Vector3): Vector3;
        intersectsPlane(plane: any): boolean;
        intersectBox(box: Box3, target: Vector3): Vector3;
        static v: Vector3;
        intersectsBox(box: Box3): boolean;
        static edge1: Vector3;
        static edge2: Vector3;
        static normal: Vector3;
        intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3): Vector3;
        applyMatrix4(matrix4: any): this;
        equals(ray: any): boolean;
    }
}
declare module THREE {
    class Spherical {
        radius: number;
        phi: number;
        theta: number;
        constructor(radius?: number, phi?: number, theta?: number);
        set(radius: number, phi: number, theta: number): Spherical;
        clone(): Spherical;
        copy(other: Spherical): Spherical;
        makeSafe(): this;
        setFromVector3(vec3: Vector3): this;
    }
}
declare module THREE {
    class Triangle {
        a: Vector3;
        b: Vector3;
        c: Vector3;
        constructor(a?: Vector3, b?: Vector3, c?: Vector3);
        static v0: Vector3;
        static getNormal(a: Vector3, b: Vector3, c: Vector3, target?: Vector3): Vector3;
        static v1: Vector3;
        static v2: Vector3;
        static getBarycoord(point: any, a: Vector3, b: Vector3, c: Vector3, target?: Vector3): Vector3;
        static containsPoint(point: any, a: Vector3, b: Vector3, c: Vector3): boolean;
        set(a: Vector3, b: Vector3, c: Vector3): this;
        setFromPointsAndIndices(points: any, i0: number, i1: number, i2: number): this;
        clone(): Triangle;
        copy(triangle: Triangle): this;
        getArea(): number;
        getMidpoint(target?: Vector3): Vector3;
        getNormal(target?: Vector3): Vector3;
        getPlane(target?: any): Vector3;
        getBarycoord(point: any, target?: Vector3): Vector3;
        containsPoint(point: any): boolean;
        intersectsBox(box: Box3): boolean;
        static plane: any;
        static edgeList: any[];
        static projectedPoint: Vector3;
        static closestPoint: Vector3;
        closestPointToPoint(point: any, target?: Vector3): Vector3;
        equals(triangle: Triangle): boolean;
    }
}
declare module THREE {
    /**
     * @author Yanbei.HUANG
     * @description 2018/5/15
     */
    class Vector2 {
        /**x坐标 */
        x: number;
        /**y坐标 */
        y: number;
        /**构造 */
        constructor(x?: number, y?: number);
        /**
         * 宽度
         */
        readonly width: {
            get: () => number;
            set: (value: number) => void;
        };
        /**
         * 高度
         */
        readonly height: {
            get: () => number;
            set: (value: number) => void;
        };
        /**
         * 复制
         * @param v
         */
        copy(v: Vector2): Vector2;
        /**
         * 最小值
         * @param v
         */
        min(v: Vector2): this;
        /**
         * 最大值
         * @param v
         */
        max(v: Vector2): this;
        /**
         * 设置
         * @param x
         * @param y
         */
        set(x: number, y: number): this;
        /**
         * 设置缩放值
         * @param scalar
         */
        setScalar(scalar: number): this;
        setX(x: number): this;
        setY(y: number): this;
        setComponent(index: number, value: number): this;
        getComponent(index: number): number;
        clone(): Vector2;
        add(v: Vector2): this;
        addScalar(s: number): this;
        addVectors(a: Vector2, b: Vector2): this;
        addScaledVector(v: Vector2, s: number): this;
        sub(v: Vector2): this;
        subScalar(s: number): this;
        subVectors(a: Vector2, b: Vector2): this;
        multiply(v: Vector2): this;
        multiplyScalar(scalar: number): this;
        divide(v: Vector2): this;
        divideScalar(scalar: number): this;
        applyMatrix3(m: any): this;
        clamp(min: Vector2, max: Vector2): this;
        clampScalar(minVal: number, maxVal: number): this;
        clampLength(min: number, max: number): this;
        floor(): this;
        ceil(): this;
        round(): this;
        roundToZero(): this;
        negate(): this;
        dot(v: Vector2): number;
        lengthSq(): number;
        length(): number;
        manhattanLength(): number;
        normalize(): this;
        angle(): number;
        distanceTo(v: Vector2): number;
        distanceToSquared(v: Vector2): number;
        manhattanDistanceTo(v: Vector2): number;
        setLength(length: number): this;
        lerp(v: Vector2, alpha: number): this;
        lerpVectors(v1: Vector2, v2: Vector2, alpha: number): this;
        equals(v: Vector2): boolean;
        fromArray(array: Array<number>, offset?: number): this;
        toArray(array: Array<number>, offset: number): number[];
        fromBufferAttribute(attribute: any, index: any): this;
        /**
         *
         * @param center
         * @param angle Radian
         */
        rotateAround(center: Vector2, angle: number): this;
    }
}
declare module THREE {
    class Vector4 {
        x: number;
        y: number;
        z: number;
        w: number;
        isVector4: boolean;
        constructor(x?: number, y?: number, z?: number, w?: number);
        set(x: number, y: number, z: number, w: number): Vector4;
        setScalar(scalar: number): Vector4;
        setX(x: number): Vector4;
        setY(y: number): Vector4;
        setZ(z: number): Vector4;
        setW(w: number): Vector4;
        setComponent(index: number, value: number): Vector4;
        getComponent(index: number): number;
        clone(): Vector4;
        copy(v: Vector4): Vector4;
        add(v: Vector4, w?: Vector4): Vector4;
        addScalar(s: number): Vector4;
        addVectors(a: Vector4, b: Vector4): Vector4;
        addScaledVector(v: Vector4, s: number): Vector4;
        sub(v: Vector4, w?: Vector4): Vector4;
        subScalar(s: number): Vector4;
        subVectors(a: Vector4, b: Vector4): Vector4;
        multiplyScalar(scalar: number): Vector4;
        applyMatrix4(m: any): Vector4;
        divideScalar(scalar: number): Vector4;
        setAxisAngleFromQuaternion(q: Quaternion): Vector4;
        setAxisAngleFromRotationMatrix(m: any): Vector4;
        min(v: Vector4): Vector4;
        max(v: Vector4): Vector4;
        clamp(min: Vector4, max: Vector4): Vector4;
        static min: Vector4;
        static max: Vector4;
        clampScalar(minVal: any, maxVal: any): Vector4;
        clampLength(min: number, max: number): Vector4;
        floor(): Vector4;
        ceil(): Vector4;
        round(): this;
        roundToZero(): Vector4;
        negate(): Vector4;
        dot(v: Vector4): number;
        lengthSq(): number;
        length(): number;
        manhattanLength(): number;
        normalize(): Vector4;
        setLength(length: number): Vector4;
        lerp(v: Vector4, alpha: number): Vector4;
        lerpVectors(v1: Vector4, v2: Vector4, alpha: number): Vector4;
        equals(v: Vector4): boolean;
        fromArray(array: Array<number>, offset: number): this;
        toArray(array?: any, offset?: number): any;
        fromBufferAttribute(attribute: any, index: number, offset: number): Vector4;
    }
}
declare module THREE {
    class CubicInterpolant extends Interpolant {
        _weightPrev: number;
        _offsetPrev: number;
        _weightNext: number;
        _offsetNext: number;
        constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer?: any);
        DefaultSettings_: any;
        intervalChanged_(i1: any, t0: any, t1: any): void;
        interpolate_(i1: any, t0: any, t: any, t1: any): any;
    }
}
declare module THREE {
    class DiscreteInterpolant extends Interpolant {
        constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer?: any);
        interpolate_(i1: any): any;
    }
}
declare module THREE {
    class LinearInterpolant extends Interpolant {
        constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer: any);
        interpolate_(i1: any, t0: any, t: any, t1: any): any;
    }
}
declare module THREE {
    class QuaternionLinearInterpolant extends Interpolant {
        constructor(parameterPositions: any, sampleValues: any, sampleSize: any, resultBuffer: any);
        interpolate_(i1: any, t0: any, t: any, t1: any): any;
    }
}
declare module THREE {
    class Bone extends Object3D {
        isBone: boolean;
        constructor();
    }
}
declare module THREE {
    class Group extends Object3D {
        isGroup: boolean;
        constructor();
    }
}
declare module THREE {
    class LOD extends Object3D {
        levels: any[];
        constructor();
        copy(source: any): this;
        addLevel(object: any, distance: any): void;
        getObjectForDistance(distance: any): any;
        raycast(raycaster?: any, intersects?: any): void;
        update(camera: any): void;
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class LineLoop extends Line {
        isLineLoop: boolean;
        constructor(geometry: any, material: any);
    }
}
declare module THREE {
    class Points extends Object3D {
        material: any;
        geometry: any;
        isPoints: boolean;
        constructor(geometry: any, material: any);
        raycast(raycaster?: any, intersects?: any): void;
        clone(): any;
    }
}
declare module THREE {
    class Skeleton {
        boneTexture: any;
        boneInverses: any;
        boneMatrices: Float32Array;
        bones: any;
        constructor(bones: any, boneInverses?: any);
        calculateInverses(): void;
        pose(): void;
        update(): void;
        clone(): Skeleton;
        getBoneByName(name: any): any;
    }
}
declare module THREE {
    class SkinnedMesh extends Mesh {
        skeleton: any;
        bindMatrixInverse: Matrix4;
        bindMatrix: Matrix4;
        bindMode: string;
        isSkinnedMesh: boolean;
        constructor(geometry: any, material: any);
        initBones(): any[];
        bind(skeleton: any, bindMatrix: any): void;
        pose(): void;
        normalizeSkinWeights(): void;
        updateMatrixWorld(force: any): void;
        clone(): SkinnedMesh;
    }
}
declare module THREE {
    class Sprite extends Object3D {
        center: Vector2;
        material: any;
        isSprite: boolean;
        constructor(material: any);
        raycast(raycaster?: any, intersects?: any): void;
        clone(): Sprite;
        copy(source: any): this;
    }
}
declare module THREE {
    class WebGL2Renderer {
        private _context;
        private _alpha;
        private _depth;
        private _stencil;
        private _antialias;
        private _premultipliedAlpha;
        private _preserveDrawingBuffer;
        private _powerPreference;
        gl: any;
        attributes: any;
        private _autoClear;
        private _autoClearColor;
        private _autoClearDepth;
        private _autoClearStencil;
        private _clearColor;
        private _clearAlpha;
        private _width;
        private _height;
        private _pixelRatio;
        private _viewport;
        extensions: any;
        state: any;
        private _canvas;
        constructor(parameters: any);
        clear(color: any, depth: any, stencil: any): void;
        setPixelRatio(value: any): void;
        setSize(width: any, height: any, updateStyle: any): void;
        setViewport(x: any, y: any, width: any, height: any): void;
        render(scene: any, camera: any): void;
        private onContextLost(event);
        readonly domElement: any;
    }
}
declare module THREE {
    class WebGLRenderTarget extends EventDispatcher {
        width: any;
        height: any;
        scissor: any;
        scissorTest: any;
        viewport: any;
        texture: any;
        depthBuffer: any;
        depthTexture: any;
        stencilBuffer: any;
        isWebGLRenderTarget: any;
        constructor(width: any, height: any, options: any);
        setSize(width: any, height: any): void;
        clone(): WebGLRenderTarget;
        copy(source: any): this;
        dispose(): void;
    }
}
declare module THREE {
    class WebGLRenderTargetCube extends WebGLRenderTarget {
        activeCubeFace: any;
        activeMipMapLevel: any;
        isWebGLRenderTargetCube: any;
        constructor(width: any, height: any, options: any);
    }
}
declare module THREE {
    class WebGLRenderer {
        private parameters;
        private _canvas;
        private _context;
        private _alpha;
        private _depth;
        private _stencil;
        private _antialias;
        private _premultipliedAlpha;
        private _preserveDrawingBuffer;
        private _powerPreference;
        domElement: any;
        context: any;
        autoClear: boolean;
        autoClearColor: boolean;
        autoClearDepth: boolean;
        autoClearStencil: boolean;
        sortObjects: boolean;
        clippingPlanes: Array<any>;
        localClippingEnabled: boolean;
        gammaFactor: number;
        gammaInput: boolean;
        gammaOutput: boolean;
        physicallyCorrectLights: boolean;
        toneMapping: number;
        toneMappingExposure: number;
        toneMappingWhitePoint: number;
        maxMorphTargets: number;
        maxMorphNormals: number;
        _this: any;
        private _isContextLost;
        private: any;
        private _currentRenderTarget;
        private _currentFramebuffer;
        private _currentMaterialId;
        private _currentGeometryProgram;
        private _currentCamera;
        private _currentArrayCamera;
        private _currentViewport;
        private _currentScissor;
        private _currentScissorTest;
        private _usedTextureUnits;
        private _width;
        private _height;
        private _pixelRatio;
        private _viewport;
        private _scissor;
        private _scissorTest;
        private _frustum;
        private _clippingEnabled;
        private _localClippingEnabled;
        private _projScreenMatrix;
        private _vector3;
        private _gl;
        contextAttributes: any;
        extensions: any;
        capabilities: any;
        state: any;
        info: any;
        textures: any;
        background: any;
        morphtargets: any;
        bufferRenderer: WebGLBufferRendererNode;
        indexedBufferRenderer: any;
        spriteRenderer: any;
        utils: any;
        vr: any;
        isAnimating: boolean;
        onAnimationFrame: any;
        private currentRenderList;
        private currentRenderState;
        private _clipping;
        shadowMap: WebGLShadowMapNode;
        programCache: WebGLProgramsNode;
        properties: WebGLPropertiesNode;
        attributes: WebGLAttributesNode;
        geometries: WebGLGeometriesNode;
        objects: WebGLObjectsNode;
        renderLists: WebGLRenderListsNode;
        renderStates: WebGLRenderStates;
        constructor(parameters?: any);
        private getTargetPixelRatio();
        initGLContext(): void;
        getContext(): WebGLContext;
        getContextAttributes(): WebGLContextAttributes;
        forceContextLoss(): void;
        forceContextRestore(): void;
        getPixelRatio(): number;
        setPixelRatio(value: any): void;
        getSize(): {
            width: number;
            height: number;
        };
        setSize(width: any, height: any, updateStyle: any): void;
        getDrawingBufferSize(): {
            width: number;
            height: number;
        };
        setDrawingBufferSize(width: any, height: any, pixelRatio: any): void;
        getCurrentViewport(): Vector4;
        setViewport(x: any, y: any, width: any, height: any): void;
        setScissor(x: any, y: any, width: any, height: any): void;
        setScissorTest(boolean: any): void;
        getClearColor(): any;
        setClearColor(color: any, alpha: any): void;
        getClearAlpha(): any;
        setClearAlpha(): void;
        clear(color?: any, depth?: any, stencil?: any): void;
        clearColor(): void;
        clearDepth(): void;
        clearStencil(): void;
        clearTarget(renderTarget: any, color: any, depth: any, stencil: any): void;
        dispose(): void;
        private onContextLost(event);
        private onContextRestore();
        private onMaterialDispose(event);
        private deallocateMaterial(material);
        private releaseMaterialProgramReference(material);
        private renderObjectImmediate(object, program, material);
        /**
         * 立即渲染buffer
         */
        renderBufferImmediate: (object: any, program: any, material: any) => void;
        /**
         * 直接渲染buffer
        */
        renderBufferDirect: (camera: any, fog: any, geometry: any, material: any, object: any, group: any) => void;
        /**
         * 设置顶点属性值
         * @param material
         * @param program
         * @param geometry
         */
        setupVertexAttributes(material: Material | any, program: WebGLProgramNode, geometry: BufferGeometry | any): void;
        /**
         * 编译
         */
        compile: (scene: any, camera: any) => void;
        /**
         * 开始动画
         */
        private startAnimation();
        /**
         * 结束动画
         */
        private stopAnimation();
        /**
         * 针渲染
         */
        private requestAnimationLoopFrame();
        /**
         * 动画循环
         * @param time
         */
        private animationLoop(time);
        /**
         * 动画
         * @param callback
         */
        animate(callback: any): void;
        render(scene: any, camera: any, renderTarget: any, forceClear: any): void;
        /**
         * 向renderlist中存入设置好的program和buffergeometry信息。
         * @param object
         * @param camera
         * @param sortObjects
         */
        private projectObject(object, camera, sortObjects);
        /**
         * 渲染objects
         * @param renderList
         * @param scene
         * @param camera
         * @param overrideMaterial
         */
        private renderObjects(renderList, scene, camera, overrideMaterial?);
        /**
         * 渲染单个物品
         * @param object
         * @param scene
         * @param camera
         * @param geometry
         * @param material
         * @param group
         */
        private renderObject(object, scene, camera, geometry, material, group);
        /**
         * 初始化材料
         * @param material
         * @param fog
         * @param object
         */
        private initMaterial(material, fog, object);
        /**
         * 设置program
         * @param camera
         * @param fog
         * @param material
         * @param object
         */
        private setProgram(camera, fog, material, object);
        /**
         * 更新uniforms参数
         * @param uniforms
         * @param material
         */
        private refreshUniformsCommon(uniforms, material);
        /**
         * 更新线的uniform参数
         * @param uniforms
         * @param material
         */
        private refreshUniformsLine(uniforms, material);
        /**
         * 更新虚线的uniform参数
         * @param uniforms
         * @param material
         */
        private refreshUniformsDash(uniforms, material);
        /**
         * 更新虚线的点云uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsPoints(uniforms, material);
        /**
         * 更新雾uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsFog(uniforms, fog);
        /**
         * 更新Lambert材料uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsLambert(uniforms, material);
        /**
         * 更新Phong材料uniform参数
           * @param uniforms
           * @param material
           */
        private refreshUniformsPhong(uniforms, material);
        /**
         * 更新Toon材料uniform参数
         * @param uniforms
         * @param material
         */
        private refreshUniformsToon(uniforms, material);
        /**
         * 更新Standard材料uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsStandard(uniforms, material);
        /**
         * 更新Physical材料uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsPhysical(uniforms, material);
        /**
         * 更新Depth材料uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsDepth(uniforms, material);
        /**
         * 更新Distance材料uniform参数
           * @param uniforms
           * @param material
           */
        private refreshUniformsDistance(uniforms, material);
        /**
         * 更新Normal材料uniform参数
        * @param uniforms
        * @param material
        */
        private refreshUniformsNormal(uniforms, material);
        /**
         * 灯光更新
         * @param uniforms
         * @param value
         */
        private markUniformsLightsNeedsUpdate(uniforms, value);
        /**
         * 分配材质单元
         */
        allocTextureUnit(): number;
        private warned_setTexture2D;
        /**
         * 设置材质
         * @param texture
         * @param slot
         */
        setTexture2D(texture: any, slot: any): void;
        private warned_setTexture;
        /**
      * 设置材质
      * @param texture
      * @param slot
      */
        setTexture(texture: any, slot: any): void;
        private warned_setTextureCube;
        /**
         * 设置cube材质
        * @param texture
        * @param slot
        */
        setTextureCube(texture: any, slot: any): void;
        getRenderTarget(): any;
        /**
         *
         * @param renderTarget
         */
        setRenderTarget(renderTarget: any): void;
        readRenderTargetPixels(renderTarget: any, x: any, y: any, width: any, height: any, buffer: any): void;
        copyFramebufferToTexture(position: any, texture: any, level: any): void;
        copyTextureToTexture: (position: any, srcTexture: any, dstTexture: any, level: any) => void;
    }
}
declare module THREE {
    var ShaderChunk: {
        alphamap_fragment: string;
        alphamap_pars_fragment: string;
        alphatest_fragment: string;
        aomap_fragment: string;
        aomap_pars_fragment: string;
        begin_vertex: string;
        beginnormal_vertex: string;
        bsdfs: string;
        bumpmap_pars_fragment: string;
        clipping_planes_fragment: string;
        clipping_planes_pars_fragment: string;
        clipping_planes_pars_vertex: string;
        clipping_planes_vertex: string;
        color_fragment: string;
        color_pars_fragment: string;
        color_pars_vertex: string;
        color_vertex: string;
        common: string;
        cube_uv_reflection_fragment: string;
        defaultnormal_vertex: string;
        displacementmap_pars_vertex: string;
        displacementmap_vertex: string;
        emissivemap_fragment: string;
        emissivemap_pars_fragment: string;
        encodings_fragment: string;
        encodings_pars_fragment: string;
        envmap_fragment: string;
        envmap_pars_fragment: string;
        envmap_pars_vertex: string;
        envmap_vertex: string;
        fog_vertex: string;
        fog_pars_vertex: string;
        fog_fragment: string;
        fog_pars_fragment: string;
        gradientmap_pars_fragment: string;
        lightmap_fragment: string;
        lightmap_pars_fragment: string;
        lights_lambert_vertex: string;
        lights_pars_begin: string;
        lights_pars_maps: string;
        lights_phong_fragment: string;
        lights_phong_pars_fragment: string;
        lights_physical_fragment: string;
        lights_physical_pars_fragment: string;
        lights_fragment_begin: string;
        lights_fragment_maps: string;
        lights_fragment_end: string;
        logdepthbuf_fragment: string;
        logdepthbuf_pars_fragment: string;
        logdepthbuf_pars_vertex: string;
        logdepthbuf_vertex: string;
        map_fragment: string;
        map_pars_fragment: string;
        map_particle_fragment: string;
        map_particle_pars_fragment: string;
        metalnessmap_fragment: string;
        metalnessmap_pars_fragment: string;
        morphnormal_vertex: string;
        morphtarget_pars_vertex: string;
        morphtarget_vertex: string;
        normal_fragment_begin: string;
        normal_fragment_maps: string;
        normalmap_pars_fragment: string;
        packing: string;
        premultiplied_alpha_fragment: string;
        project_vertex: string;
        dithering_fragment: string;
        dithering_pars_fragment: string;
        roughnessmap_fragment: string;
        roughnessmap_pars_fragment: string;
        shadowmap_pars_fragment: string;
        shadowmap_pars_vertex: string;
        shadowmap_vertex: string;
        shadowmask_pars_fragment: string;
        skinbase_vertex: string;
        skinning_pars_vertex: string;
        skinning_vertex: string;
        skinnormal_vertex: string;
        specularmap_fragment: string;
        specularmap_pars_fragment: string;
        tonemapping_fragment: string;
        tonemapping_pars_fragment: string;
        uv_pars_fragment: string;
        uv_pars_vertex: string;
        uv_vertex: string;
        uv2_pars_fragment: string;
        uv2_pars_vertex: string;
        uv2_vertex: string;
        worldpos_vertex: string;
        cube_frag: string;
        cube_vert: string;
        depth_frag: string;
        depth_vert: string;
        distanceRGBA_frag: string;
        distanceRGBA_vert: string;
        equirect_frag: string;
        equirect_vert: string;
        linedashed_frag: string;
        linedashed_vert: string;
        meshbasic_frag: string;
        meshbasic_vert: string;
        meshlambert_frag: string;
        meshlambert_vert: string;
        meshphong_frag: string;
        meshphong_vert: string;
        meshphysical_frag: string;
        meshphysical_vert: string;
        normal_frag: string;
        normal_vert: string;
        points_frag: string;
        points_vert: string;
        shadow_frag: string;
        shadow_vert: string;
    };
}
declare module THREE {
    var UniformsUtils: {
        merge: (uniforms: any) => {};
        clone: (uniforms_src: any) => {};
    };
}
declare module THREE {
    var UniformsLib: {
        common: {
            diffuse: {
                value: Color;
            };
            opacity: {
                value: number;
            };
            map: {
                value: any;
            };
            uvTransform: {
                value: Matrix3;
            };
            alphaMap: {
                value: any;
            };
        };
        specularmap: {
            specularMap: {
                value: any;
            };
        };
        envmap: {
            envMap: {
                value: any;
            };
            flipEnvMap: {
                value: number;
            };
            reflectivity: {
                value: number;
            };
            refractionRatio: {
                value: number;
            };
            maxMipLevel: {
                value: number;
            };
        };
        aomap: {
            aoMap: {
                value: any;
            };
            aoMapIntensity: {
                value: number;
            };
        };
        lightmap: {
            lightMap: {
                value: any;
            };
            lightMapIntensity: {
                value: number;
            };
        };
        emissivemap: {
            emissiveMap: {
                value: any;
            };
        };
        bumpmap: {
            bumpMap: {
                value: any;
            };
            bumpScale: {
                value: number;
            };
        };
        normalmap: {
            normalMap: {
                value: any;
            };
            normalScale: {
                value: Vector2;
            };
        };
        displacementmap: {
            displacementMap: {
                value: any;
            };
            displacementScale: {
                value: number;
            };
            displacementBias: {
                value: number;
            };
        };
        roughnessmap: {
            roughnessMap: {
                value: any;
            };
        };
        metalnessmap: {
            metalnessMap: {
                value: any;
            };
        };
        gradientmap: {
            gradientMap: {
                value: any;
            };
        };
        fog: {
            fogDensity: {
                value: number;
            };
            fogNear: {
                value: number;
            };
            fogFar: {
                value: number;
            };
            fogColor: {
                value: Color;
            };
        };
        lights: {
            ambientLightColor: {
                value: any[];
            };
            directionalLights: {
                value: any[];
                properties: {
                    direction: {};
                    color: {};
                    shadow: {};
                    shadowBias: {};
                    shadowRadius: {};
                    shadowMapSize: {};
                };
            };
            directionalShadowMap: {
                value: any[];
            };
            directionalShadowMatrix: {
                value: any[];
            };
            spotLights: {
                value: any[];
                properties: {
                    color: {};
                    position: {};
                    direction: {};
                    distance: {};
                    coneCos: {};
                    penumbraCos: {};
                    decay: {};
                    shadow: {};
                    shadowBias: {};
                    shadowRadius: {};
                    shadowMapSize: {};
                };
            };
            spotShadowMap: {
                value: any[];
            };
            spotShadowMatrix: {
                value: any[];
            };
            pointLights: {
                value: any[];
                properties: {
                    color: {};
                    position: {};
                    decay: {};
                    distance: {};
                    shadow: {};
                    shadowBias: {};
                    shadowRadius: {};
                    shadowMapSize: {};
                    shadowCameraNear: {};
                    shadowCameraFar: {};
                };
            };
            pointShadowMap: {
                value: any[];
            };
            pointShadowMatrix: {
                value: any[];
            };
            hemisphereLights: {
                value: any[];
                properties: {
                    direction: {};
                    skyColor: {};
                    groundColor: {};
                };
            };
            rectAreaLights: {
                value: any[];
                properties: {
                    color: {};
                    position: {};
                    width: {};
                    height: {};
                };
            };
        };
        points: {
            diffuse: {
                value: Color;
            };
            opacity: {
                value: number;
            };
            size: {
                value: number;
            };
            scale: {
                value: number;
            };
            map: {
                value: any;
            };
            uvTransform: {
                value: Matrix3;
            };
        };
    };
}
declare module THREE {
    var ShaderLib: {
        basic: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        lambert: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        phong: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        standard: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        points: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        dashed: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        depth: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        normal: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        cube: {
            uniforms: {
                tCube: {
                    value: any;
                };
                tFlip: {
                    value: number;
                };
                opacity: {
                    value: number;
                };
            };
            vertexShader: string;
            fragmentShader: string;
        };
        equirect: {
            uniforms: {
                tEquirect: {
                    value: any;
                };
            };
            vertexShader: string;
            fragmentShader: string;
        };
        distanceRGBA: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
        shadow: {
            uniforms: {};
            vertexShader: string;
            fragmentShader: string;
        };
    };
}
declare module THREE {
    class GLBufferNode {
        buffer: WebGLBuffer;
        type: number;
        bytesPerElement: any;
        version: number;
        constructor();
    }
    class WebGLAttributesNode {
        gl: WebGLContext;
        buffers: WeakMap<BufferAttribute, GLBufferNode>;
        constructor(gl: WebGLContext);
        /**
         *
         * @param attribute
         * @param bufferType  gl.ARRAY_BUFFER
         */
        createBuffer(attribute: BufferAttribute, bufferType: number): GLBufferNode;
        /**
         * 更新buffer
         * @param buffer
         * @param attribute
         * @param bufferType
         */
        updateBuffer(buffer: WebGLBuffer, attribute: BufferAttribute | any, bufferType: number): void;
        /**
         * 获取glbufferNode
         * @param attribute
         */
        get(attribute: BufferAttribute | any): GLBufferNode;
        /**
         * 删除bufferNode
         * @param attribute
         */
        remove(attribute: BufferAttribute | any): void;
        /**
         * 更新glbuffer 的 内存 ，根据版本更新buffer
         * @param attribute
         * @param bufferType
         */
        update(attribute: BufferAttribute | any, bufferType: number): void;
    }
}
declare module THREE {
    class WebGLBackgroundNode {
        renderer: any;
        clearColor: any;
        clearAlpha: any;
        planeCamera: any;
        planeMesh: any;
        boxMesh: any;
        state: any;
        objects: any;
        premultipliedAlpha: any;
        constructor(renderer: any, state: any, objects: any, premultipliedAlpha: any);
        getClearColor(): any;
        setClearColor(color: any, alpha: any): void;
        getClearAlpha(): any;
        setClearAlpha(alpha: any): void;
        render(renderList: any, scene: any, camera: any, forceClear: any): void;
        setClear(color: any, alpha: any): void;
    }
}
declare module THREE {
    class WebGLBufferRendererNode {
        mode: number;
        gl: WebGLContext;
        extensions: any;
        info: WebGLInfoNode;
        constructor(gl: any, extensions: any, info: any);
        /**
         * 设置渲染模式
         * @param value
         */
        setMode(value: any): void;
        /**
         * 渲染，并记录渲染过程信息
         */
        render(start: any, count: any): void;
        /**
         * 即使渲染
         */
        renderInstances(geometry: any, start: any, count: any): void;
    }
}
declare module THREE {
    class WebGLCapabilitiesNode {
        gl: WebGLContext;
        extensions: any;
        parameters: any;
        maxAnisotropy: any;
        logarithmicDepthBuffer: any;
        maxTextures: number;
        maxVertexTextures: number;
        maxTextureSize: number;
        maxCubemapSize: number;
        maxAttributes: number;
        maxVertexUniforms: any;
        maxVaryings: number;
        maxFragmentUniforms: number;
        vertexTextures: boolean;
        floatFragmentTextures: boolean;
        floatVertexTextures: boolean;
        precision: string;
        constructor(gl: WebGLContext, extensions: any, parameters: any);
        getMaxAnisotropy(): any;
        getMaxPrecision(precision: any): "highp" | "mediump" | "lowp";
    }
}
declare module THREE {
    class WebGLClippingNode {
        globalState: any;
        numGlobalPlanes: any;
        localClippingEnabled: any;
        renderingShadows: any;
        plane: any;
        viewNormalMatrix: any;
        uniform: any;
        numPlanes: any;
        numIntersection: any;
        constructor();
        init(planes: any, enableLocalClipping: any, camera: any): any;
        beginShadows(): void;
        endShadows(): void;
        setState(planes: any, clipIntersection: any, clipShadows: any, camera: any, cache: any, fromCache: any): void;
        resetGlobalState(): void;
        projectPlanes(planes?: any, camera?: any, dstOffset?: any, skipTransform?: any): any;
    }
}
declare module THREE {
    class WebGLContext {
        gl: WebGLRenderingContext;
        canvas: any;
        drawingBufferHeight: any;
        drawingBufferWidth: any;
        constructor(canvas: any, contextAttributes: WebGLContextAttributes);
        activeTexture(texture: number): void;
        attachShader(program: WebGLProgram, shader: WebGLShader): void;
        bindAttribLocation(program: WebGLProgram, index: number, name: string): void;
        bindBuffer(target: number, buffer: WebGLBuffer): void;
        bindFramebuffer(target: number, framebuffer: WebGLFramebuffer): void;
        bindRenderbuffer(target: number, renderbuffer: WebGLRenderbuffer): void;
        bindTexture(target: number, texture: WebGLTexture): void;
        blendColor(red: number, green: number, blue: number, alpha: number): void;
        blendEquation(mode: number): void;
        blendEquationSeparate(modeRGB: number, modeAlpha: number): void;
        blendFunc(modeRGB: number, modeAlpha: number): void;
        blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
        bufferData(target: number, size: number | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer, usage: number): void;
        bufferSubData(target: number, offset: number, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer): void;
        checkFramebufferStatus(target: any): number;
        clear(mask: number): void;
        clearColor(red: number, green: number, blue: number, alpha: number): void;
        clearDepth(depth: number): void;
        clearStencil(s: number): void;
        colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
        compileShader(shader: WebGLShader): void;
        compressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView): void;
        compressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView): void;
        copyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;
        copyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;
        createBuffer(): WebGLBuffer;
        createFramebuffer(): WebGLFramebuffer;
        createProgram(): WebGLProgram;
        createRenderbuffer(): WebGLRenderbuffer;
        createShader(type: number): WebGLShader;
        createTexture(): WebGLTexture;
        cullFace(mode: number): void;
        deleteBuffer(buffer: WebGLBuffer): void;
        deleteFramebuffer(framebuffer: WebGLFramebuffer): void;
        deleteProgram(program: WebGLProgram): void;
        deleteRenderbuffer(program: WebGLProgram): void;
        deleteShader(shader: WebGLShader): void;
        deleteTexture(texture: WebGLTexture): void;
        depthFunc(func: number): void;
        depthMask(flag: boolean): void;
        depthRange(zNear: number, zFar: number): void;
        detachShader(program: WebGLProgram, shader: WebGLShader): void;
        disable(cap: number): void;
        disableVertexAttribArray(index: number): void;
        drawArrays(mode: number, first: number, count: number): void;
        drawElements(mode: number, count: number, type: number, offset: number): void;
        enable(cap: number): void;
        enableVertexAttribArray(index: number): void;
        finish(): void;
        flush(): void;
        framebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: WebGLRenderbuffer): void;
        framebufferTexture2D(target: number, attachment: number, textarget: number, texture: WebGLTexture, level: number): void;
        frontFace(mode: number): void;
        generateMipmap(mode: number): void;
        getActiveAttrib(program: WebGLProgram, index: number): WebGLActiveInfo;
        getActiveUniform(program: WebGLProgram, index: number): WebGLActiveInfo;
        getAttachedShaders(program: WebGLProgram): WebGLShader[];
        getAttribLocation(program: WebGLProgram, name: string): number;
        getBufferParameter(target: number, pname: number): any;
        getContextAttributes(): WebGLContextAttributes;
        getError(): number;
        getExtension(extensionName: string): any;
        getFramebufferAttachmentParameter(target: number, attachment: number, pname: number): any;
        getParameter(pname: number): any;
        getProgramInfoLog(program: WebGLProgram): string;
        getProgramParameter(program: WebGLProgram, pname: number): any;
        getRenderbufferParameter(target: number, pname: number): any;
        getShaderInfoLog(shader: WebGLShader): string;
        getShaderParameter(shader: WebGLShader, pname: number): any;
        getShaderPrecisionFormat(shadertype: number, precisiontype: number): WebGLShaderPrecisionFormat;
        getShaderSource(shader: WebGLShader): string;
        getSupportedExtensions(): string[];
        getTexParameter(target: number, pname: number): any;
        getUniform(program: WebGLProgram, location: WebGLUniformLocation): any;
        getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation;
        getVertexAttrib(index: number, pname: number): any;
        getVertexAttribOffset(index: number, pname: number): number;
        hint(target: number, mode: number): void;
        isBuffer(buffer: WebGLBuffer): void;
        isContextLost(): void;
        isEnabled(cap: number): void;
        isFramebuffer(framebuffer: WebGLFramebuffer): void;
        isProgram(program: WebGLProgram): void;
        isRenderbuffer(renderbuffer: WebGLRenderbuffer): void;
        isShader(shader: WebGLShader): void;
        isTexture(shader: WebGLShader): void;
        lineWidth(width: number): void;
        linkProgram(program: WebGLProgram): void;
        pixelStorei(pname: number, param: number | boolean): void;
        polygonOffset(factor: number, units: number): void;
        readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView): void;
        renderbufferStorage(target: number, internalformat: number, width: number, height: number): void;
        sampleCoverage(value: number, invert: boolean): void;
        scissor(x: number, y: number, width: number, height: number): void;
        shaderSource(shader: WebGLShader, source: string): void;
        stencilFunc(func: number, ref: number, mask: number): void;
        stencilFuncSeparate(face: number, func: number, ref: number, mask: number): void;
        stencilMask(mask: number): void;
        stencilMaskSeparate(face: number, mask: number): void;
        stencilOp(fail: number, zfail: number, zpass: number): void;
        stencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void;
        texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView): void;
        texImage2D1(target: number, level: number, internalformat: number, format: number, type: number, pixels: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): void;
        texParameterf(target: number, pname: number, param: number): void;
        texParameteri(target: number, pname: number, param: number): void;
        texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView): void;
        uniform1f(location: WebGLUniformLocation, x: number): void;
        uniform1fv(location: WebGLUniformLocation, v: Float32Array | number[]): void;
        uniform1i(location: WebGLUniformLocation, x: number): void;
        uniform1iv(location: WebGLUniformLocation, v: Int32Array | number[]): void;
        uniform2f(location: WebGLUniformLocation, x: number, y: number): void;
        uniform2fv(location: WebGLUniformLocation, v: Float32Array | number[]): void;
        uniform2i(location: WebGLUniformLocation, x: number, y: number): void;
        uniform2iv(location: WebGLUniformLocation, v: Int32Array | number[]): void;
        uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void;
        uniform3fv(location: WebGLUniformLocation, v: Float32Array | number[]): void;
        uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number): void;
        uniform3iv(location: WebGLUniformLocation, v: Int32Array | number[]): void;
        uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
        uniform4fv(location: WebGLUniformLocation, v: Float32Array | Array<number>): void;
        uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
        uniform4iv(location: WebGLUniformLocation, v: Int32Array | Array<number>): void;
        uniformMatrix2fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array | Array<number>): void;
        uniformMatrix3fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array | Array<number>): void;
        uniformMatrix4fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array | Array<number>): void;
        useProgram(program: WebGLProgram): void;
        validateProgram(program: WebGLProgram): void;
        vertexAttrib1f(indx: number, x: number): void;
        vertexAttrib1fv(indx: number, values: Float32Array | number[]): void;
        vertexAttrib2f(indx: number, x: number, y: number): void;
        vertexAttrib2fv(indx: number, values: Float32Array | number[]): void;
        vertexAttrib3f(indx: number, x: number, y: number, z: number): void;
        vertexAttrib3fv(indx: number, values: Float32Array | number[]): void;
        vertexAttrib4f(indx: any, x: any, y: any, z: any, w: any): void;
        vertexAttrib4fv(indx: number, values: Float32Array | number[]): void;
        vertexAttribPointer(indx: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
        viewport(x: number, y: number, width: number, height: number): void;
        ACTIVE_ATTRIBUTES: number;
        ACTIVE_TEXTURE: number;
        ACTIVE_UNIFORMS: number;
        ALIASED_LINE_WIDTH_RANGE: number;
        ALIASED_POINT_SIZE_RANGE: number;
        ALPHA: number;
        ALPHA_BITS: number;
        ALWAYS: number;
        ARRAY_BUFFER: number;
        ARRAY_BUFFER_BINDING: number;
        ATTACHED_SHADERS: number;
        BACK: number;
        BLEND: number;
        BLEND_COLOR: number;
        BLEND_DST_ALPHA: number;
        BLEND_DST_RGB: number;
        BLEND_EQUATION: number;
        BLEND_EQUATION_ALPHA: number;
        BLEND_EQUATION_RGB: number;
        BLEND_SRC_ALPHA: number;
        BLEND_SRC_RGB: number;
        BLUE_BITS: number;
        BOOL: number;
        BOOL_VEC2: number;
        BOOL_VEC3: number;
        BOOL_VEC4: number;
        BROWSER_DEFAULT_WEBGL: number;
        BUFFER_SIZE: number;
        BUFFER_USAGE: number;
        BYTE: number;
        CCW: number;
        CLAMP_TO_EDGE: number;
        COLOR_ATTACHMENT0: number;
        COLOR_BUFFER_BIT: number;
        COLOR_CLEAR_VALUE: number;
        COLOR_WRITEMASK: number;
        COMPILE_STATUS: number;
        COMPRESSED_TEXTURE_FORMATS: number;
        CONSTANT_ALPHA: number;
        CONSTANT_COLOR: number;
        CONTEXT_LOST_WEBGL: number;
        CULL_FACE: number;
        CULL_FACE_MODE: number;
        CURRENT_PROGRAM: number;
        CURRENT_VERTEX_ATTRIB: number;
        CW: number;
        DECR: number;
        DECR_WRAP: number;
        DELETE_STATUS: number;
        DEPTH_ATTACHMENT: number;
        DEPTH_BITS: number;
        DEPTH_BUFFER_BIT: number;
        DEPTH_CLEAR_VALUE: number;
        DEPTH_COMPONENT: number;
        DEPTH_COMPONENT16: number;
        DEPTH_FUNC: number;
        DEPTH_RANGE: number;
        DEPTH_STENCIL: number;
        DEPTH_STENCIL_ATTACHMENT: number;
        DEPTH_TEST: number;
        DEPTH_WRITEMASK: number;
        DITHER: number;
        DONT_CARE: number;
        DST_ALPHA: number;
        DST_COLOR: number;
        DYNAMIC_DRAW: number;
        ELEMENT_ARRAY_BUFFER: number;
        ELEMENT_ARRAY_BUFFER_BINDING: number;
        EQUAL: number;
        FASTEST: number;
        FLOAT: number;
        FLOAT_MAT2: number;
        FLOAT_MAT3: number;
        FLOAT_MAT4: number;
        FLOAT_VEC2: number;
        FLOAT_VEC3: number;
        FLOAT_VEC4: number;
        FRAGMENT_SHADER: number;
        FRAMEBUFFER: number;
        FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
        FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
        FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
        FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
        FRAMEBUFFER_BINDING: number;
        FRAMEBUFFER_COMPLETE: number;
        FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
        FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
        FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
        FRAMEBUFFER_UNSUPPORTED: number;
        FRONT: number;
        FRONT_AND_BACK: number;
        FRONT_FACE: number;
        FUNC_ADD: number;
        FUNC_REVERSE_SUBTRACT: number;
        FUNC_SUBTRACT: number;
        GENERATE_MIPMAP_HINT: number;
        GEQUAL: number;
        GREATER: number;
        GREEN_BITS: number;
        HIGH_FLOAT: number;
        HIGH_INT: number;
        IMPLEMENTATION_COLOR_READ_FORMAT: number;
        IMPLEMENTATION_COLOR_READ_TYPE: number;
        INCR: number;
        INCR_WRAP: number;
        INT: number;
        INT_VEC2: number;
        INT_VEC3: number;
        INT_VEC4: number;
        INVALID_ENUM: number;
        INVALID_FRAMEBUFFER_OPERATION: number;
        INVALID_OPERATION: number;
        INVALID_VALUE: number;
        INVERT: number;
        KEEP: number;
        LEQUAL: number;
        LESS: number;
        LINEAR: number;
        LINEAR_MIPMAP_LINEAR: number;
        LINEAR_MIPMAP_NEAREST: number;
        LINES: number;
        LINE_LOOP: number;
        LINE_STRIP: number;
        LINE_WIDTH: number;
        LINK_STATUS: number;
        LOW_FLOAT: number;
        LOW_INT: number;
        LUMINANCE: number;
        LUMINANCE_ALPHA: number;
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
        MAX_CUBE_MAP_TEXTURE_SIZE: number;
        MAX_FRAGMENT_UNIFORM_VECTORS: number;
        MAX_RENDERBUFFER_SIZE: number;
        MAX_TEXTURE_IMAGE_UNITS: number;
        MAX_TEXTURE_SIZE: number;
        MAX_VARYING_VECTORS: number;
        MAX_VERTEX_ATTRIBS: number;
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
        MAX_VERTEX_UNIFORM_VECTORS: number;
        MAX_VIEWPORT_DIMS: number;
        MEDIUM_FLOAT: number;
        MEDIUM_INT: number;
        MIRRORED_REPEAT: number;
        NEAREST: number;
        NEAREST_MIPMAP_LINEAR: number;
        NEAREST_MIPMAP_NEAREST: number;
        NEVER: number;
        NICEST: number;
        NONE: number;
        NOTEQUAL: number;
        NO_ERROR: number;
        ONE: number;
        ONE_MINUS_CONSTANT_ALPHA: number;
        ONE_MINUS_CONSTANT_COLOR: number;
        ONE_MINUS_DST_ALPHA: number;
        ONE_MINUS_DST_COLOR: number;
        ONE_MINUS_SRC_ALPHA: number;
        ONE_MINUS_SRC_COLOR: number;
        OUT_OF_MEMORY: number;
        PACK_ALIGNMENT: number;
        POINTS: number;
        POLYGON_OFFSET_FACTOR: number;
        POLYGON_OFFSET_FILL: number;
        POLYGON_OFFSET_UNITS: number;
        RED_BITS: number;
        RENDERBUFFER: number;
        RENDERBUFFER_ALPHA_SIZE: number;
        RENDERBUFFER_BINDING: number;
        RENDERBUFFER_BLUE_SIZE: number;
        RENDERBUFFER_DEPTH_SIZE: number;
        RENDERBUFFER_GREEN_SIZE: number;
        RENDERBUFFER_HEIGHT: number;
        RENDERBUFFER_INTERNAL_FORMAT: number;
        RENDERBUFFER_RED_SIZE: number;
        RENDERBUFFER_STENCIL_SIZE: number;
        RENDERBUFFER_WIDTH: number;
        RENDERER: number;
        REPEAT: number;
        REPLACE: number;
        RGB: number;
        RGB5_A1: number;
        RGB565: number;
        RGBA: number;
        RGBA4: number;
        SAMPLER_2D: number;
        SAMPLER_CUBE: number;
        SAMPLES: number;
        SAMPLE_ALPHA_TO_COVERAGE: number;
        SAMPLE_BUFFERS: number;
        SAMPLE_COVERAGE: number;
        SAMPLE_COVERAGE_INVERT: number;
        SAMPLE_COVERAGE_VALUE: number;
        SCISSOR_BOX: number;
        SCISSOR_TEST: number;
        SHADER_TYPE: number;
        SHADING_LANGUAGE_VERSION: number;
        SHORT: number;
        SRC_ALPHA: number;
        SRC_ALPHA_SATURATE: number;
        SRC_COLOR: number;
        STATIC_DRAW: number;
        STENCIL_ATTACHMENT: number;
        STENCIL_BACK_FAIL: number;
        STENCIL_BACK_FUNC: number;
        STENCIL_BACK_PASS_DEPTH_FAIL: number;
        STENCIL_BACK_PASS_DEPTH_PASS: number;
        STENCIL_BACK_REF: number;
        STENCIL_BACK_VALUE_MASK: number;
        STENCIL_BACK_WRITEMASK: number;
        STENCIL_BITS: number;
        STENCIL_BUFFER_BIT: number;
        STENCIL_CLEAR_VALUE: number;
        STENCIL_FAIL: number;
        STENCIL_FUNC: number;
        STENCIL_INDEX8: number;
        STENCIL_PASS_DEPTH_FAIL: number;
        STENCIL_PASS_DEPTH_PASS: number;
        STENCIL_REF: number;
        STENCIL_TEST: number;
        STENCIL_VALUE_MASK: number;
        STENCIL_WRITEMASK: number;
        STREAM_DRAW: number;
        SUBPIXEL_BITS: number;
        TEXTURE: number;
        TEXTURE0: number;
        TEXTURE1: number;
        TEXTURE2: number;
        TEXTURE3: number;
        TEXTURE4: number;
        TEXTURE5: number;
        TEXTURE6: number;
        TEXTURE7: number;
        TEXTURE8: number;
        TEXTURE9: number;
        TEXTURE10: number;
        TEXTURE11: number;
        TEXTURE12: number;
        TEXTURE13: number;
        TEXTURE14: number;
        TEXTURE15: number;
        TEXTURE16: number;
        TEXTURE17: number;
        TEXTURE18: number;
        TEXTURE19: number;
        TEXTURE20: number;
        TEXTURE21: number;
        TEXTURE22: number;
        TEXTURE23: number;
        TEXTURE24: number;
        TEXTURE25: number;
        TEXTURE26: number;
        TEXTURE27: number;
        TEXTURE28: number;
        TEXTURE29: number;
        TEXTURE30: number;
        TEXTURE31: number;
        TEXTURE_2D: number;
        TEXTURE_BINDING_2D: number;
        TEXTURE_BINDING_CUBE_MAP: number;
        TEXTURE_CUBE_MAP: number;
        TEXTURE_CUBE_MAP_NEGATIVE_X: number;
        TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
        TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
        TEXTURE_CUBE_MAP_POSITIVE_X: number;
        TEXTURE_CUBE_MAP_POSITIVE_Y: number;
        TEXTURE_CUBE_MAP_POSITIVE_Z: number;
        TEXTURE_MAG_FILTER: number;
        TEXTURE_MIN_FILTER: number;
        TEXTURE_WRAP_S: number;
        TEXTURE_WRAP_T: number;
        TRIANGLES: number;
        TRIANGLE_FAN: number;
        TRIANGLE_STRIP: number;
        UNPACK_ALIGNMENT: number;
        UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
        UNPACK_FLIP_Y_WEBGL: number;
        UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
        UNSIGNED_BYTE: number;
        UNSIGNED_INT: number;
        UNSIGNED_SHORT: number;
        UNSIGNED_SHORT_4_4_4_4: number;
        UNSIGNED_SHORT_5_5_5_1: number;
        UNSIGNED_SHORT_5_6_5: number;
        VALIDATE_STATUS: number;
        VENDOR: number;
        VERSION: number;
        VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
        VERTEX_ATTRIB_ARRAY_ENABLED: number;
        VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
        VERTEX_ATTRIB_ARRAY_POINTER: number;
        VERTEX_ATTRIB_ARRAY_SIZE: number;
        VERTEX_ATTRIB_ARRAY_STRIDE: number;
        VERTEX_ATTRIB_ARRAY_TYPE: number;
        VERTEX_SHADER: number;
        VIEWPORT: number;
        ZERO: number;
    }
}
declare module THREE {
    class WebGLExtensionsNode {
        gl: any;
        extensions: any;
        constructor(gl: any);
        get(name: any): any;
    }
}
declare module THREE {
    class WebGLGeometriesNode {
        geometries: BufferGeometryMap;
        gl: any;
        attributes: any;
        info: any;
        wireframeAttributes: any;
        constructor(gl: any, attributes: any, info: any);
        onGeometryDispose(event: any): void;
        get(object: any, geometry: any): BufferGeometry;
        update(geometry: any): void;
        getWireframeAttribute(geometry: any): any;
    }
}
declare module THREE {
    class WebGLIndexedBufferRendererNode {
        mode: any;
        type: any;
        bytesPerElement: any;
        gl: any;
        extensions: any;
        info: any;
        constructor(gl: any, extensions: any, info: any);
        setMode(value: any): void;
        setIndex(value: any): void;
        render(start: any, count: any): void;
        renderInstances(geometry: any, start: any, count: any): void;
    }
}
declare module THREE {
    class renderRecoder {
        frame: number;
        calls: number;
        triangles: number;
        points: number;
        lines: number;
        constructor();
    }
    /**
     * 渲染过程信息
     */
    class WebGLInfoNode {
        memory: any;
        gl: WebGLContext;
        render: any;
        constructor(gl: WebGLContext);
        /**
         * 更新渲染过程记录的信息
         */
        update(count: number, mode: number, instanceCount?: number): void;
        /**
         * 重新设置
         */
        reset(): void;
    }
}
declare module THREE {
    class LightUniformsCache {
        lights: {};
        constructor();
        get(light: any): any;
    }
    class LightsStateManger {
        id: any;
        hash: any;
        ambient: any;
        directional: any;
        directionalShadowMap: any;
        directionalShadowMatrix: any;
        spot: any;
        spotShadowMap: any;
        spotShadowMatrix: any;
        rectArea: any;
        point: any;
        pointShadowMap: any;
        pointShadowMatrix: any;
        hemi: any;
        constructor();
    }
    class WebGLLightsNode {
        static count: number;
        vector3: Vector3;
        matrix4: Matrix4;
        matrix42: Matrix4;
        state: any;
        cache: LightUniformsCache;
        constructor();
        setup(lights: any, shadows: any, camera: any): void;
    }
}
declare module THREE {
    function absNumericalSort(a: any, b: any): number;
    class WebGLMorphtargetsNode {
        gl: any;
        influencesList: any;
        morphInfluences: any;
        constructor(gl: any);
        update(object: any, geometry: any, material: any, program: any): void;
    }
}
declare module THREE {
    class WebGLObjectsNode {
        geometries: any;
        info: any;
        updateList: any;
        constructor(geometries: any, info: any);
        update(object: any): any;
        dispose(): void;
    }
}
declare module THREE {
    /**
     * webGLprogram
     */
    class WebGLProgramNode {
        name: string;
        id: any;
        /**唯一标识 */
        code: string;
        usedTimes: any;
        /**webgl program */
        program: WebGLProgram;
        /**顶点gl 的shader */
        vertexShader: any;
        /**片元gl 的shader */
        fragmentShader: any;
        renderer: any;
        extensions: any;
        material: Material;
        shader: WebGLShaderItem;
        /**material 对应的参数 */
        parameters: any;
        gl: any;
        diagnostics: any;
        /**存储uniform地址 */
        cachedUniforms: WebGLUniformsNode;
        /**存储attribute地址 */
        cachedAttributes: any | Object;
        constructor(renderer: any, extensions: any, code: any, material: any, shader: any, parameters: any);
        /**
         * 设置一些初始参数
         * @param parameters
         * @param material
         * @param envMapTypeDefine
         * @param envMapModeDefine
         * @param envMapBlendingDefine
         */
        setMapParameter(parameters: any, material: any, envMapTypeDefine: any, envMapModeDefine: any, envMapBlendingDefine: any): void;
        /**
         * 原始材料的shader头处理
         * @param customDefines
         */
        rawMaterialPrefixVertex(customDefines: any): string;
        /**
   * 原始材料的shader头处理
   * @param customDefines
   */
        rawMaterialPrefixFragment(customExtensions: any, customDefines: any): string;
        /**
         * 顶点shader头的处理
         * @param parameters
         * @param shader
         * @param customDefines
         * @param gammaFactorDefine
         * @param envMapModeDefine
         * @param shadowMapTypeDefine
         * @param extensions
         */
        prefixVertex(parameters: any, shader: any, customDefines: any, gammaFactorDefine: any, envMapModeDefine: any, shadowMapTypeDefine: any, extensions: any): string;
        /**
         * 片元shader头的处理
         * @param customExtensions
         * @param material
         * @param parameters
         * @param shader
         * @param customDefines
         * @param gammaFactorDefine
         * @param extensions
         * @param envMapTypeDefine
         * @param envMapModeDefine
         * @param envMapBlendingDefine
         * @param shadowMapTypeDefine
         */
        prefixFragment(customExtensions: any, material: any, parameters: any, shader: any, customDefines: any, gammaFactorDefine: any, extensions: any, envMapTypeDefine: any, envMapModeDefine: any, envMapBlendingDefine: any, shadowMapTypeDefine: any): string;
        /**
         * 获取当前shader的uniforms参数列表，带addr信息
         */
        getUniforms(): WebGLUniformsNode;
        /**
         * 获取当前shader的attribute信息列表，带addr信息
         */
        getAttributes(): any;
        /**
         * 删除当前program
         */
        destroy(): void;
        /**
         * 缓存uniform
         */
        readonly uniforms: WebGLUniformsNode;
        /**
         * 缓存attribute
        */
        readonly attributes: any;
    }
    /**
     * 一个shader的存储内容
     */
    class WebGLShaderItem {
        name: string;
        uniforms: any;
        vertexShader: string;
        fragmentShader: string;
        constructor();
    }
}
declare module THREE {
    class MaterialShaderEnum {
        static MeshDepthMaterial: string;
        static MeshDistanceMaterial: string;
        static MeshNormalMaterial: string;
        static MeshBasicMaterial: string;
        static MeshLambertMaterial: string;
        static MeshPhongMaterial: string;
        static MeshToonMaterial: string;
        static MeshStandardMaterial: string;
        static MeshPhysicalMaterial: string;
        static LineBasicMaterial: string;
        static LineDashedMaterial: string;
        static PointsMaterial: string;
        static ShadowMaterial: string;
    }
    class WebGLProgramsNode {
        renderer: any;
        extensions: any;
        capabilities: any;
        programs: Array<WebGLProgramNode>;
        shaderIDs: any;
        parameterNames: any;
        constructor(renderer: any, extensions: any, capabilities: any);
        allocateBones(object: any): number;
        getTextureEncodingFromMap(map: any, gammaOverrideLinear: any): any;
        /**
         * // material 的配置参数，用来配置program的vertex 和fragment 元的shander内容
         * @param material
         * @param lights
         * @param shadows
         * @param fog
         * @param nClipPlanes
         * @param nClipIntersection
         * @param object
         */
        getParameters(material: any, lights: any, shadows: any, fog: any, nClipPlanes: any, nClipIntersection: any, object: any): {
            shaderID: any;
            precision: any;
            supportsVertexTextures: any;
            outputEncoding: any;
            map: boolean;
            mapEncoding: any;
            envMap: boolean;
            envMapMode: any;
            envMapEncoding: any;
            envMapCubeUV: boolean;
            lightMap: boolean;
            aoMap: boolean;
            emissiveMap: boolean;
            emissiveMapEncoding: any;
            bumpMap: boolean;
            normalMap: boolean;
            displacementMap: boolean;
            roughnessMap: boolean;
            metalnessMap: boolean;
            specularMap: boolean;
            alphaMap: boolean;
            gradientMap: boolean;
            combine: any;
            vertexColors: any;
            fog: boolean;
            useFog: any;
            fogExp: any;
            flatShading: any;
            sizeAttenuation: any;
            logarithmicDepthBuffer: any;
            skinning: boolean;
            maxBones: number;
            useVertexTexture: any;
            morphTargets: any;
            morphNormals: any;
            maxMorphTargets: any;
            maxMorphNormals: any;
            numDirLights: any;
            numPointLights: any;
            numSpotLights: any;
            numRectAreaLights: any;
            numHemiLights: any;
            numClippingPlanes: any;
            numClipIntersection: any;
            dithering: any;
            shadowMapEnabled: boolean;
            shadowMapType: any;
            toneMapping: any;
            physicallyCorrectLights: any;
            premultipliedAlpha: any;
            alphaTest: any;
            doubleSided: boolean;
            flipSided: boolean;
            depthPacking: any;
        };
        /**
         * 根据配置参数 顺序连接形成program的标识字符串
         * @param material
         * @param parameters
         */
        getProgramCode(material: any, parameters: any): string;
        /**
         * 根据唯一标识符code 得到program
         * @param material
         * @param shader
         * @param parameters
         * @param code program 唯一标识符
         */
        acquireProgram(material: Material, shader: WebGLShaderItem, parameters: any, code: string): any;
        releaseProgram(program: any): void;
    }
}
declare module THREE {
    class WebGLPropertyNode {
        shader: any;
        program: WebGLProgramNode;
        lightsHash: any;
        numClippingPlanes: any;
        numIntersection: any;
        fog: any;
        /**存放材料和灯光中涉及的uniformlist */
        uniformsList: any;
        __maxMipLevel: any;
        __webglFramebuffer: any;
        __webglTexture: any;
        constructor();
    }
    class WebGLPropertiesNode {
        properties: WeakMap<Material | any, WebGLPropertyNode>;
        constructor();
        get(material: Material | any): WebGLPropertyNode;
        remove(material: any): void;
        update(material: any, key: any, value: any): void;
        dispose(): void;
    }
}
declare module THREE {
    /**
     * 渲染数据单元
     */
    class RenderItem {
        id: number;
        object: any | Object3D;
        geometry: BufferGeometry;
        material: Material;
        program: WebGLProgram;
        renderOrder: number;
        z: number;
        group: any;
        constructor();
    }
    /**
     * 渲染对象列表
     */
    class WebGLRenderListNode {
        /**全部渲染单元列表 */
        renderItems: Array<RenderItem>;
        renderItemsIndex: number;
        /**不透明渲染单元列表 */
        opaque: Array<RenderItem>;
        /**透明渲染单元列表 */
        transparent: Array<RenderItem>;
        constructor();
        init(): void;
        /**
         * 存入值
         * @param object
         * @param geometry
         * @param material
         * @param z
         * @param group
         */
        push(object: any, geometry: any, material: any, z: any, group: any): void;
        /**
         * 排序
         */
        sort(): void;
    }
    type WebGLRenderListNodeMap = {
        [key: string]: WebGLRenderListNode;
    };
    /**
     * renderlist 的列表
     */
    class WebGLRenderListsNode {
        lists: WebGLRenderListNodeMap;
        constructor();
        get(scene: any, camera: any): WebGLRenderListNode;
        dispose(): void;
    }
}
declare module THREE {
    class WebGLRenderStateNode {
        lights: any;
        lightsArray: any;
        shadowsArray: any;
        spritesArray: any;
        state: any;
        constructor();
        init(): void;
        pushLight(light: any): void;
        pushShadow(shadowLight: any): void;
        pushSprite(shadowLight: any): void;
        setupLights(camera: any): void;
    }
    class WebGLRenderStates {
        renderStates: any;
        constructor();
        get(scene: any, camera: any): any;
        dispose(): void;
    }
}
declare module THREE {
    class WebGLShadowMapNode {
        _renderer: any;
        _objects: any;
        maxTextureSize: any;
        _frustum: any;
        _projScreenMatrix: any;
        _shadowMapSize: any;
        _maxShadowMapSize: any;
        _lookTarget: any;
        _lightPositionWorld: any;
        _MorphingFlag: any;
        _SkinningFlag: any;
        _NumberOfMaterialVariants: any;
        _depthMaterials: any;
        _distanceMaterials: any;
        _materialCache: any;
        enabled: any;
        autoUpdate: any;
        needsUpdate: any;
        type: any;
        shadowSide: any;
        cubeDirections: any;
        cubeUps: any;
        cube2DViewPorts: any;
        constructor(_renderer: any, _objects: any, maxTextureSize: any);
        render(lights: any, scene: any, camera: any): void;
        getDepthMaterial(object: any, material: any, isPointLight: any, lightPositionWorld: any, shadowCameraNear: any, shadowCameraFar: any): any;
        renderObject(object: any, camera: any, shadowCamera: any, isPointLight: any): void;
    }
}
declare module THREE {
    class WebGLSpriteRendererNode {
        renderer: any;
        gl: any;
        state: any;
        textures: any;
        capabilities: any;
        vertexBuffer: any;
        elementBuffer: any;
        program: any;
        attributes: any;
        uniforms: any;
        texture: any;
        spritePosition: any;
        spriteRotation: any;
        spriteScale: any;
        constructor(renderer: any, gl: any, state: any, textures: any, capabilities: any);
        init(): void;
        render(sprites: any, scene: any, camera: any): void;
        createProgram(): any;
        painterSortStable(a: any, b: any): number;
    }
}
declare module THREE {
    /**
     * 颜色测试
     */
    class ColorBuffer {
        gl: any;
        currentColorMask: any;
        currentColorClear: any;
        locked: any;
        color: any;
        constructor(gl: any);
        setMask(colorMask: any): void;
        setLocked(lock: any): void;
        /**
         * 清除颜色缓存
         * @param r
         * @param g
         * @param b
         * @param a
         * @param premultipliedAlpha
         */
        setClear(r: any, g: any, b: any, a: any, premultipliedAlpha?: any): void;
        reset(): void;
    }
    /**
     * 深度测试
     */
    class DepthBuffer {
        gl: any;
        currentDepthMask: any;
        currentDepthFunc: any;
        currentDepthClear: any;
        locked: any;
        constructor(gl: any);
        setTest(depthTest: any): void;
        setMask(depthMask: any): void;
        setFunc(depthFunc: any): void;
        setLocked(lock: any): void;
        setClear(depth: any): void;
        reset(): void;
    }
    /**
     * 模板测试
     */
    class StencilBuffer {
        gl: any;
        locked: any;
        currentStencilMask: any;
        currentStencilFunc: any;
        currentStencilRef: any;
        currentStencilFuncMask: any;
        currentStencilFail: any;
        currentStencilZFail: any;
        currentStencilZPass: any;
        currentStencilClear: any;
        constructor(gl: any);
        setTest(stencilTest: any): void;
        setMask(stencilMask: any): void;
        setFunc(stencilFunc: any, stencilRef: any, stencilMask: any): void;
        setOp(stencilFail: any, stencilZFail: any, stencilZPass: any): void;
        setLocked(lock: any): void;
        setClear(stencil: any): void;
        reset(): void;
    }
    /**
     * webgl 状态机管理器
     */
    class WebGLStateNode {
        gl: any;
        extensions: any;
        utils: any;
        colorBuffer: any;
        depthBuffer: any;
        stencilBuffer: any;
        capabilities: any;
        compressedTextureFormats: any;
        currentProgram: WebGLProgram;
        currentBlending: any;
        currentBlendEquation: any;
        currentBlendSrc: any;
        currentBlendDst: any;
        currentBlendEquationAlpha: any;
        currentBlendSrcAlpha: any;
        currentBlendDstAlpha: any;
        currentPremultipledAlpha: any;
        currentFlipSided: any;
        currentCullFace: any;
        currentLineWidth: any;
        currentPolygonOffsetFactor: any;
        currentPolygonOffsetUnits: any;
        maxTextures: any;
        lineWidthAvailable: any;
        version: number;
        glVersion: any;
        currentTextureSlot: any;
        currentBoundTextures: any;
        currentScissor: any;
        currentViewport: any;
        emptyTextures: any;
        maxVertexAttributes: number;
        newAttributes: Uint8Array;
        enabledAttributes: Uint8Array;
        attributeDivisors: Uint8Array;
        constructor(gl: any, extensions: any, utils: any);
        createTexture(type: any, target: any, count: any): any;
        readonly buffers: {
            color: any;
            depth: any;
            stencil: any;
        };
        initAttributes(): void;
        /**
         *  开启该attribute
         * @param attribute :shader 中attribute 的编号
         */
        enableAttribute(attribute: number): void;
        /**
         * 开启attribute
         * @param attribute
         * @param meshPerAttribute
         */
        enableAttributeAndDivisor(attribute: any, meshPerAttribute: any): void;
        /**
         * 关闭attribute
         */
        disableUnusedAttributes(): void;
        enable(id: any): void;
        disable(id: any): void;
        getCompressedTextureFormats(): any;
        /**
         * 应用program
         * @param program
         */
        useProgram(program: WebGLProgram): boolean;
        setBlending(blending: any, blendEquation?: any, blendSrc?: any, blendDst?: any, blendEquationAlpha?: any, blendSrcAlpha?: any, blendDstAlpha?: any, premultipliedAlpha?: any): void;
        setMaterial(material: any, frontFaceCW: any): void;
        setFlipSided(flipSided: any): void;
        setCullFace(cullFace: any): void;
        setLineWidth(width: any): void;
        setPolygonOffset(polygonOffset: any, factor: any, units: any): void;
        setScissorTest(scissorTest: any): void;
        activeTexture(webglSlot: any): void;
        bindTexture(webglType: any, webglTexture: any): void;
        compressedTexImage2D(): void;
        texImage2D(): void;
        scissor(scissor: any): void;
        viewport(viewport: any): void;
        reset(): void;
    }
}
declare module THREE {
    class WebGLTexturesNode {
        private _isWebGL2;
        private _videoTextures;
        private _canvas;
        private _gl;
        private extensions;
        private state;
        private properties;
        private capabilities;
        private utils;
        private info;
        constructor(_gl: any, extensions: any, state: any, properties: any, capabilities: any, utils: any, info: any);
        private clampToMaxSize(image, maxSize);
        private isPowerOfTwo(image);
        private makePowerOfTwo(image);
        private textureNeedsPowerOfTwo(texture);
        private textureNeedsGenerateMipmaps(texture, isPowerOfTwo);
        private generateMipmap(target, texture, width, height);
        private filterFallback(f);
        private onTextureDispose(event);
        private onRenderTargetDispose(event);
        private deallocateTexture(texture);
        private deallocateRenderTarget(renderTarget);
        setTexture2D(texture: any, slot: any): void;
        setTextureCube(texture: any, slot: any): void;
        setTextureCubeDynamic(texture: any, slot: any): void;
        private setTextureParameters(textureType, texture, isPowerOfTwoImage);
        private uploadTexture(textureProperties, texture, slot);
        private setupFrameBufferTexture(framebuffer, renderTarget, attachment, textureTarget);
        private setupRenderBufferStorage(renderbuffer, renderTarget);
        private setupDepthTexture(framebuffer, renderTarget);
        private setupDepthRenderbuffer(renderTarget);
        setupRenderTarget(renderTarget: any): void;
        updateRenderTargetMipmap(renderTarget: any): void;
        private updateVideoTexture(texture);
    }
}
declare module THREE {
    class Texture extends EventDispatcher {
        id: number;
        uuid: string;
        name: string;
        image: any;
        mipmaps: any[];
        mapping: any;
        wrapS: any;
        wrapT: any;
        magFilter: any;
        minFilter: any;
        anisotropy: any;
        format: any;
        type: any;
        offset: Vector2;
        repeat: Vector2;
        center: Vector2;
        rotation: number;
        matrixAutoUpdate: boolean;
        matrix: Matrix3;
        generateMipmaps: boolean;
        premultiplyAlpha: boolean;
        flipY: boolean;
        unpackAlignment: number;
        encoding: any;
        version: number;
        onUpdate: any;
        isTexture: boolean;
        static textureId: number;
        static DEFAULT_IMAGE: any;
        static DEFAULT_MAPPING: number;
        constructor(image?: any, mapping?: any, wrapS?: any, wrapT?: any, magFilter?: any, minFilter?: any, format?: any, type?: any, anisotropy?: any, encoding?: any);
        updateMatrix(): void;
        clone(): Texture;
        copy(source: any): this;
        toJSON(meta: any): any;
        dispose(): void;
        transformUv(uv: any): void;
        needsUpdate: boolean;
    }
}
declare module THREE {
    class CubeTexture extends Texture {
        constructor(images?: any, mapping?: any, wrapS?: any, wrapT?: any, magFilter?: any, minFilter?: any, format?: any, type?: any, anisotropy?: any, encoding?: any);
    }
}
declare module THREE {
    function flatten(array: any, nBlocks: any, blockSize: any): any;
    function arraysEqual(a: any, b: any): boolean;
    function copyArray(a: any, b: any): void;
    function allocTexUnits(renderer: any, n: any): any;
    function setValue1f(gl: any, v: any): void;
    function setValue1i(gl: any, v: any): void;
    function setValue2fv(gl: any, v: any): void;
    function setValue3fv(gl: any, v: any): void;
    function setValue4fv(gl: any, v: any): void;
    function setValue2fm(gl: any, v: any): void;
    function setValue3fm(gl: any, v: any): void;
    function setValue4fm(gl: any, v: any): void;
    function setValueT1(gl: any, v: any, renderer: any): void;
    function setValueT6(gl: any, v: any, renderer: any): void;
    function setValue2iv(gl: any, v: any): void;
    function setValue3iv(gl: any, v: any): void;
    function setValue4iv(gl: any, v: any): void;
    function getSingularSetter(type: any): typeof setValueT1;
    function setValue1fv(gl: any, v: any): void;
    function setValue1iv(gl: any, v: any): void;
    function setValueV2a(gl: any, v: any): void;
    function setValueV3a(gl: any, v: any): void;
    function setValueV4a(gl: any, v: any): void;
    function setValueM2a(gl: any, v: any): void;
    function setValueM3a(gl: any, v: any): void;
    function setValueM4a(gl: any, v: any): void;
    function setValueT1a(gl: any, v: any, renderer: any): void;
    function setValueT6a(gl: any, v: any, renderer: any): void;
    function getPureArraySetter(type: any): typeof setValueT1a;
    function addUniform(container: WebGLUniformsNode, uniformObject: SingleUniform | PureArrayUniform): void;
    /**
     * 存入当前激活的uniform列表
     * @param activeInfo
     * @param addr
     * @param container
     */
    function parseUniform(activeInfo: WebGLActiveInfo, addr: WebGLUniformLocation, container: WebGLUniformsNode): void;
    class SingleUniform {
        id: any;
        addr: any;
        cache: any;
        setValue: any;
        constructor(id: any, activeInfo: any, addr: any);
    }
    class PureArrayUniform {
        id: any;
        addr: any;
        size: any;
        setValue: any;
        constructor(id: any, activeInfo: any, addr: any);
    }
    class UniformContainer {
        seq: Array<any>;
        map: any;
        constructor();
    }
    class StructuredUniform extends UniformContainer {
        id: any;
        constructor(id: any);
        setValue(gl: any, value: any): void;
    }
    class WebGLUniformsNode extends UniformContainer {
        renderer: any;
        constructor(gl: any, program: any, renderer: any);
        setValue: (gl: any, name: any, value: any) => void;
        setOptional: (gl: any, object: any, name: any) => void;
        /**
         * 把 material的uniform向uniform中传递
         */
        static upload: (gl: WebGLContext, uniformsList: any, material_uniforms: any, renderer: any) => void;
        /**
         * 找出激活uniforms中与material_uniforms重合的部分
         */
        static seqWithValue: (active_uniforms: any, values: any) => any[];
    }
}
declare module THREE {
    class WebGLUtils {
        constructor(gl: any, extensions: any);
    }
}
declare module THREE {
    class WebglContextAttibutes {
        alpha: any;
        depth: any;
        stencil: any;
        antialias: any;
        premultipliedAlpha: any;
        preserveDrawingBuffer: any;
        powerPreference: any;
        constructor();
    }
}
declare module THREE {
    function webGLCreateShader(gl: any, type: any, string: any): any;
}
declare module THREE {
    class WebVRManager {
        enabled: any;
        userHeight: any;
        device: any;
        currentPixelRatio: any;
        currentSize: any;
        renderer: any;
        poseTarget: any;
        frameData: any;
        standingMatrix: any;
        standingMatrixInverse: any;
        matrixWorldInverse: any;
        tempQuaternion: any;
        tempPosition: any;
        cameraL: any;
        cameraR: any;
        cameraVR: any;
        constructor(renderer: any);
        isPresenting(): boolean;
        onVRDisplayPresentChange(): void;
        getDevice(): any;
        setDevice(value: any): void;
        setPoseTarget(object: any): void;
        getCamera(camera: any): any;
        getStandingMatrix(): any;
        requestAnimationFrame(callback: any): void;
        submitFrame(): void;
        dispose(): void;
    }
}
declare module THREE {
    class WebXRManager {
        frameOfRef: any;
        session: any;
        device: any;
        isExclusive: any;
        pose: any;
        enabled: any;
        gl: any;
        cameraL: any;
        cameraR: any;
        cameraVR: any;
        framCallback: any;
        constructor(gl: any);
        isPresenting(): boolean;
        getDevice(): any;
        setDevice(value: any): void;
        setSession(value: any): void;
        getCamera(camera: any): any;
        onFrame(time: any, frame: any): void;
        requestAnimationFrame(callback: any): void;
        getStandingMatrix(): Matrix4;
        submitFrame(): void;
    }
}
declare module THREE {
    class Fog {
        far: any;
        near: any;
        color: Color;
        name: string;
        isFog: boolean;
        constructor(color: any, near: any, far: any);
        clone(): Fog;
        toJSON(): {
            type: string;
            color: number;
            near: any;
            far: any;
        };
    }
}
declare module THREE {
    class FogExp2 {
        density: any;
        color: Color;
        name: string;
        isFogExp2: boolean;
        constructor(color: any, density: any);
        clone(): FogExp2;
        toJSON(): {
            type: string;
            color: number;
            density: any;
        };
    }
}
declare module THREE {
    class Scene extends Object3D {
        autoUpdate: boolean;
        /**整个场景的全局材料 */
        overrideMaterial: Material;
        fog: any;
        background: any;
        constructor();
        /**
         * 复制
         * @param source
         * @param recursive
         */
        copy(source: any, recursive: any): this;
        /**
         * 生成json文件
         * @param meta
         */
        toJSON(meta: any): any;
    }
}
declare module THREE {
    class CanvasTexture extends Texture {
        isCanvasTexture: boolean;
        constructor(canvas?: any, mapping?: any, wrapS?: any, wrapT?: any, magFilter?: any, minFilter?: any, format?: any, type?: any, anisotropy?: any);
    }
}
declare module THREE {
    class CompressedTexture extends Texture {
        isCompressedTexture: boolean;
        constructor(mipmaps?: any, width?: any, height?: any, format?: any, type?: any, mapping?: any, wrapS?: any, wrapT?: any, magFilter?: any, minFilter?: any, anisotropy?: any, encoding?: any);
    }
}
declare module THREE {
    class DataTexture extends Texture {
        isDataTexture: boolean;
        constructor(data?: any, width?: any, height?: any, format?: any, type?: any, mapping?: any, wrapS?: any, wrapT?: any, magFilter?: any, minFilter?: any, anisotropy?: any, encoding?: any);
    }
}
declare module THREE {
    class DepthTexture extends Texture {
        isDepthTexture: boolean;
        constructor(width: any, height: any, type: any, mapping: any, wrapS: any, wrapT: any, magFilter: any, minFilter: any, anisotropy: any, format: any);
    }
}
declare module THREE {
    class VideoTexture extends Texture {
        isVideoTexture: boolean;
        constructor(video: any, mapping: any, wrapS: any, wrapT: any, magFilter: any, minFilter: any, format: any, type: any, anisotropy: any);
        update(): void;
    }
}
