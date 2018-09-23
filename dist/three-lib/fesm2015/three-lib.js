import { Injectable, ContentChildren, Input, Component, ViewChild, ElementRef, HostListener, NgModule, Directive, forwardRef, Pipe, defineInjectable } from '@angular/core';
import { Object3D, PerspectiveCamera, Scene, ColladaLoader, OBJLoader, MTLLoader, ObjectLoader, WebGLRenderer, PCFSoftShadowMap, AxesHelper, GridHelper, PointLight } from 'three-full';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { __awaiter } from 'tslib';
import { Scene as Scene$1, PerspectiveCamera as PerspectiveCamera$1, Color, WebGLRenderer as WebGLRenderer$1, PointLight as PointLight$1, BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ThreeLibService {
    constructor() { }
}
ThreeLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ThreeLibService.ctorParameters = () => [];
/** @nocollapse */ ThreeLibService.ngInjectableDef = defineInjectable({ factory: function ThreeLibService_Factory() { return new ThreeLibService(); }, token: ThreeLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class AbstractObject3D {
    /**
     * @return {?}
     */
    rerender() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.object) {
            return;
        }
        /** @type {?} */
        let mustRerender = false;
        if (['rotateX', 'rotateY', 'rotateZ'].some(propName => propName in changes)) {
            this.applyRotation();
            mustRerender = true;
        }
        if (['translateX', 'translateY', 'translateZ'].some(propName => propName in changes)) {
            this.applyTranslation();
            mustRerender = true;
        }
        if (mustRerender) {
            this.rerender();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('AbstractObject3D.ngAfterViewInit');
        this.object = this.newObject3DInstance();
        this.applyTranslation();
        this.applyRotation();
        if (this.childNodes !== undefined && this.childNodes.length > 1) {
            this.childNodes.filter(i => i !== this && i.getObject() !== undefined).forEach(i => {
                // console.log("Add child for " + this.constructor.name);
                // console.log(i);
                this.addChild(i.getObject());
            });
        }
        this.afterInit();
    }
    /**
     * @return {?}
     */
    applyRotation() {
        /** @type {?} */
        const angles = [
            this.rotateX,
            this.rotateY,
            this.rotateZ
        ].map(angle => angle || 0);
        this.object.rotation.set(this.rotateX || 0, this.rotateY || 0, this.rotateZ || 0, 'XYZ');
    }
    /**
     * @return {?}
     */
    applyTranslation() {
        this.object.position.set(this.translateX || 0, this.translateY || 0, this.translateZ || 0);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    addChild(object) {
        this.object.add(object);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    removeChild(object) {
        this.object.remove(object);
    }
    /**
     * @return {?}
     */
    getObject() {
        return this.object;
    }
}
AbstractObject3D.propDecorators = {
    childNodes: [{ type: ContentChildren, args: [AbstractObject3D, { descendants: false },] }],
    rotateX: [{ type: Input }],
    rotateY: [{ type: Input }],
    rotateZ: [{ type: Input }],
    translateX: [{ type: Input }],
    translateY: [{ type: Input }],
    translateZ: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SceneDirective extends AbstractObject3D {
    constructor() {
        console.log('SceneDirective.constructor');
        super();
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('SceneDirective.afterInit');
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        console.log('SceneDirective.newObject3DInstance');
        return new Scene();
    }
}
SceneDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-scene',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => SceneDirective) }]
            },] }
];
SceneDirective.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class AbstractCamera {
    constructor() {
        console.log('AbstractCamera.constructor');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('AbstractCamera.ngAfterViewInit');
        this.afterInit();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WebGLRendererComponent {
    // TODO: Multiple cameras
    constructor() {
        this.viewInitialized = false;
        console.log('RendererComponent.constructor');
        this.render = this.render.bind(this);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('RendererComponent.ngAfterViewInit');
        this.viewInitialized = true;
        this.startRendering();
    }
    /**
     * The render pane on which the scene is rendered.
     * Currently, only the WebGL renderer with a canvas is used in this
     * implementation, so this property will always be an ElementRef to the
     * underlying <canvas> element.
     *
     * \@example This property can be used to restrict the orbit controls (i.e. the
     * area which is listened for mouse move and zoom events) to the rendering pane:
     * ```
     * <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
     *   <three-renderer #mainRenderer>
     *     ...
     *   </three-renderer>
     * </three-orbit-controls>
     * ```
     * @return {?}
     */
    get renderPane() {
        return this.canvasRef;
    }
    /**
     * @return {?}
     */
    get canvas() {
        return this.canvasRef.nativeElement;
    }
    /**
     * @return {?}
     */
    startRendering() {
        console.log('RendererComponent.startRendering');
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.autoClear = true;
        this.updateChildCamerasAspectRatio();
        this.render();
    }
    /**
     * @return {?}
     */
    render() {
        // if (this.sceneComponents != undefined && this.sceneComponents.length == 1 &&
        //     this.cameraComponents != undefined && this.cameraComponents.length == 1) {
        if (this.viewInitialized) {
            /** @type {?} */
            const sceneComponent = this.sceneComponents.first;
            /** @type {?} */
            const cameraComponent = this.cameraComponents.first;
            // console.log("render");
            // console.log(scene.getObject());
            // console.log(camera.camera);
            this.renderer.render(sceneComponent.getObject(), cameraComponent.camera);
        }
        // }
    }
    /**
     * @return {?}
     */
    calculateAspectRatio() {
        /** @type {?} */
        const height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        console.log('RendererComponent.onResize: ' + this.canvas.clientWidth + ', ' + this.canvas.clientHeight);
        this.updateChildCamerasAspectRatio();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.render();
    }
    /**
     * @return {?}
     */
    updateChildCamerasAspectRatio() {
        /** @type {?} */
        const aspect = this.calculateAspectRatio();
        this.cameraComponents.forEach(camera => camera.updateAspectRatio(aspect));
    }
}
WebGLRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'three-webgl-renderer',
                template: "<canvas #canvas>\n</canvas>",
                styles: ["canvas{width:100%;height:100%}"]
            }] }
];
WebGLRendererComponent.ctorParameters = () => [];
WebGLRendererComponent.propDecorators = {
    canvasRef: [{ type: ViewChild, args: ['canvas',] }],
    sceneComponents: [{ type: ContentChildren, args: [SceneDirective,] }],
    cameraComponents: [{ type: ContentChildren, args: [AbstractCamera,] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class OrbitControlsDirective {
    constructor() {
        /**
         * The element on whose native element the orbit controls will listen for mouse events.
         *
         * Note that keyboard events are still listened for on the global window object, this is
         * a known issue from Three.js: https://github.com/mrdoob/three.js/pull/10315
         *
         * @example This property can be used to restrict the orbit controls (i.e. the
         * area which is listened for mouse move and zoom events) to the rendering pane:
         * ```
         * <three-orbit-controls [listeningControlElement]=mainRenderer.renderPane>
         *   <three-renderer #mainRenderer>
         *     ...
         *   </three-renderer>
         * </three-orbit-controls>
         * ```
         */
        this.listeningControlElement = undefined;
        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.2;
        console.log('OrbitControlsDirective.constructor');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // If the THREE.js OrbitControls are not set up yet, we do not need to update
        // anything as they will pick the new values from the @Input properties automatically
        // upon creation.
        if (!this.controls) {
            return;
        }
        if (changes['rotateSpeed']) {
            this.controls.rotateSpeed = this.rotateSpeed;
        }
        if (changes['zoomSpeed']) {
            this.controls.zoomSpeed = this.zoomSpeed;
        }
        if (changes['listeningControlElement']) {
            // The DOM element the OrbitControls listen on cannot be changed once an
            // OrbitControls object is created. We thus need to recreate it.
            this.controls.dispose();
            this.setUpOrbitControls();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.controls.dispose();
    }
    /**
     * @return {?}
     */
    setUpOrbitControls() {
        // this.controls = new THREE.OrbitControls(
        this.controls = new OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
        this.controls.rotateSpeed = this.rotateSpeed;
        this.controls.zoomSpeed = this.zoomSpeed;
        this.controls.addEventListener('change', this.childRenderers.first.render);
        this.childRenderers.first.render();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('OrbitControlsDirective.ngAfterViewInit');
        if (this.childCameras === undefined || this.childCameras.first === undefined) {
            throw new Error('Camera is not found');
        }
        if (this.childRenderers === undefined || this.childRenderers.first === undefined) {
            throw new Error('Renderer is not found');
        }
        this.setUpOrbitControls();
    }
}
OrbitControlsDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-orbit-controls'
            },] }
];
OrbitControlsDirective.ctorParameters = () => [];
OrbitControlsDirective.propDecorators = {
    childCameras: [{ type: ContentChildren, args: [AbstractCamera, { descendants: true },] }],
    childRenderers: [{ type: ContentChildren, args: [WebGLRendererComponent, { descendants: true },] }],
    listeningControlElement: [{ type: Input }],
    rotateSpeed: [{ type: Input }],
    zoomSpeed: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Helper parent class for model loader directives.
 *
 * @see ObjectLoaderDirective
 * @see ObjLoaderDirective
 * @see ColladaLoaderDirective
 * @abstract
 */
class AbstractModelLoader extends AbstractObject3D {
    /**
     * Helper parent class for model loader directives.
     *
     * @see ObjectLoaderDirective
     * @see ObjLoaderDirective
     * @see ColladaLoaderDirective
     */
    constructor() {
        super(...arguments);
        /**
         * Flag to signal whether the parent class instance AbstractObject3D called the
         * overwritten method {@link ModelLoaderDirective#afterInit} yet.
         *
         * Unless that method was called, no methods and properties of {@link AbstractObject3D}
         * may be safely accessed, especially {@link AbstractObject3D#addChild} and
         * {@link AbstractObject3D.renderer}.
         */
        this.parentInitialized = false;
    }
    /**
     * The model data source (usually a URI).
     * Settings this property only hides the previous model upon successful
     * loading of the new one. This especially means that if the new data source
     * is invalid, the old model will *not* be removed from the scene.
     * @param {?} newModelUrl
     * @return {?}
     */
    set model(newModelUrl) {
        this._model = newModelUrl;
        // Delay model loading until the parent has been initialized,
        // so that we can call addChild().
        if (!this.parentInitialized) {
            return;
        }
        this.loadModelObject().then(newModel => {
            if (this.currentLoadedModelObject) {
                this.removeChild(this.currentLoadedModelObject);
            }
            this.currentLoadedModelObject = newModel;
            this.addChild(newModel);
            if (this.renderer) {
                this.renderer.render();
            }
        }).catch(err => {
            console.error(err);
        });
    }
    /**
     * The current model data source (usually a URI).
     * @return {?}
     */
    get model() {
        return this._model;
    }
    /**
     * @param {?} newRenderer
     * @return {?}
     */
    set renderer(newRenderer) {
        this._renderer = newRenderer;
        this._renderer.render();
    }
    /**
     * @return {?}
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * @return {?}
     */
    afterInit() {
        this.parentInitialized = true;
        // Trigger model acquisition now that the parent has been initialized.
        this.model = this.model;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.currentLoadedModelObject) {
            this.removeChild(this.currentLoadedModelObject);
        }
    }
    /**
     * @return {?}
     */
    rerender() {
        super.rerender();
        if (this.renderer) {
            this.renderer.render();
        }
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        return new Object3D();
    }
}
AbstractModelLoader.propDecorators = {
    model: [{ type: Input }],
    renderer: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ColladaLoaderDirective extends AbstractModelLoader {
    constructor() {
        super(...arguments);
        this.loader = new ColladaLoader();
    }
    /**
     * @return {?}
     */
    loadModelObject() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.loader.load(this.model, model => {
                    resolve(model.scene);
                }, undefined, reject);
            });
        });
    }
}
ColladaLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-collada-loader',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => ColladaLoaderDirective) }]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive for employing THREE.OBJLoader to load [Wavefront *.obj files][1].
 *
 * [1]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
 */
class ObjLoaderDirective extends AbstractModelLoader {
    /**
     * Directive for employing THREE.OBJLoader to load [Wavefront *.obj files][1].
     *
     * [1]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
     */
    constructor() {
        super(...arguments);
        this.loader = new OBJLoader();
        this.mtlLoader = new MTLLoader();
    }
    /**
     * @return {?}
     */
    loadModelObject() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: make it nicer
            if (this.material === undefined) {
                return new Promise((resolve, reject) => {
                    this.loader.load(this.model, model => {
                        resolve(model);
                    }, undefined, reject);
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    if (this.texturePath !== undefined) {
                        this.mtlLoader.setTexturePath(this.texturePath);
                    }
                    this.mtlLoader.load(this.material, material => {
                        material.preload();
                        this.loader.setMaterials(material);
                        this.loader.load(this.model, model => {
                            resolve(model);
                        }, undefined, reject);
                    });
                });
            }
        });
    }
}
ObjLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-obj-loader',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => ObjLoaderDirective) }]
            },] }
];
ObjLoaderDirective.propDecorators = {
    material: [{ type: Input }],
    texturePath: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Rad2DegPipe {
    /**
     * Converts radians to degrees
     * @param {?} radians Radians
     * @return {?}
     */
    transform(radians) {
        return radians * (180 / Math.PI);
    }
}
Rad2DegPipe.decorators = [
    { type: Pipe, args: [{
                name: 'rad2deg'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Deg2RadPipe {
    /**
     * Converts degrees to radians
     * @param {?} degrees
     * @return {?}
     */
    transform(degrees) {
        return (degrees / 180) * Math.PI;
    }
}
Deg2RadPipe.decorators = [
    { type: Pipe, args: [{
                name: 'deg2rad'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PerspectiveCameraDirective extends AbstractCamera {
    constructor() {
        console.log('PerspectiveCameraDirective.constructor');
        super();
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('PerspectiveCameraDirective.afterInit');
        // let aspectRatio = undefined; // Updated later
        this.camera = new PerspectiveCamera(this.fov, undefined, this.near, this.far);
        // Set position and look at
        this.camera.position.x = this.positionX;
        this.camera.position.y = this.positionY;
        this.camera.position.z = this.positionZ;
        this.camera.updateProjectionMatrix();
    }
    /**
     * @param {?} aspect
     * @return {?}
     */
    updateAspectRatio(aspect) {
        console.log('PerspectiveCameraDirective.updateAspectRatio: ' + aspect);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
}
PerspectiveCameraDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-perspective-camera',
                providers: [{ provide: AbstractCamera, useExisting: forwardRef(() => PerspectiveCameraDirective) }]
            },] }
];
PerspectiveCameraDirective.ctorParameters = () => [];
PerspectiveCameraDirective.propDecorators = {
    fov: [{ type: Input }],
    near: [{ type: Input }],
    far: [{ type: Input }],
    positionX: [{ type: Input }],
    positionY: [{ type: Input }],
    positionZ: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AxesHelperDirective extends AbstractObject3D {
    constructor() {
        super();
        console.log('AxesHelperDirective.constructor');
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        console.log('AxesHelperDirective.newObject3DInstance');
        return new AxesHelper(this.size);
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('AxesHelperDirective.afterInit');
        // none
    }
}
AxesHelperDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-axes-helper',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => AxesHelperDirective) }]
            },] }
];
AxesHelperDirective.ctorParameters = () => [];
AxesHelperDirective.propDecorators = {
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GridHelperDirective extends AbstractObject3D {
    constructor() {
        super();
        console.log('GridHelperDirective.constructor');
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        console.log('GridHelperDirective.newObject3DInstance');
        return new GridHelper(this.size, this.divisions);
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('GridHelperDirective.afterInit');
        // none
    }
}
GridHelperDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-grid-helper',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => GridHelperDirective) }]
            },] }
];
GridHelperDirective.ctorParameters = () => [];
GridHelperDirective.propDecorators = {
    size: [{ type: Input }],
    divisions: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ObjectLoaderDirective extends AbstractModelLoader {
    constructor() {
        super(...arguments);
        this.loader = new ObjectLoader();
    }
    /**
     * @return {?}
     */
    loadModelObject() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.loader.load(this.model, model => {
                    resolve(model);
                }, undefined, reject);
            });
        });
    }
}
ObjectLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-object-loader',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => ObjectLoaderDirective) }]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PointLightDirective extends AbstractObject3D {
    constructor() {
        super();
        console.log('PointLightDirective.constructor');
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        console.log('PointLightDirective.newObject3DInstance');
        return new PointLight(this.color, this.intensity, this.distance);
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('PointLightDirective.afterInit');
        // none
    }
}
PointLightDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-point-light',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => PointLightDirective) }]
            },] }
];
PointLightDirective.ctorParameters = () => [];
PointLightDirective.propDecorators = {
    color: [{ type: Input }],
    intensity: [{ type: Input }],
    distance: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// import { CameraControls } from 'camera-controls';
class ThreeTestComponent {
    /**
     * @param {?} elem
     */
    constructor(elem) {
        this.elem = elem;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.mesh = null;
        this.light = null;
        this.count = 1;
        this.scene = new Scene$1();
        this.camera = new PerspectiveCamera$1(45, 1, 1, 1000);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.resizeCanvasToDisplaySize(true);
    }
    /**
     * @return {?}
     */
    get canvas() {
        return this.canvasRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.configScene();
        this.configCamera();
        this.configRenderer();
        this.configControls();
        this.createLight();
        this.createMesh();
        this.animate();
    }
    /**
     * @return {?}
     */
    configScene() {
        this.scene.background = new Color(0xdddddd);
    }
    /**
     * @return {?}
     */
    calculateAspectRatio() {
        // console.log('canvas.clientWidth: ', this.canvas.clientWidth);
        //    console.log('canvas.clientHeight: ', this.canvas.clientHeight);
        /** @type {?} */
        const height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }
    /**
     * @return {?}
     */
    updateCamera() {
        this.camera.aspect = this.calculateAspectRatio();
        this.camera.updateProjectionMatrix();
    }
    /**
     * @return {?}
     */
    configCamera() {
        this.updateCamera();
        this.camera.position.set(-15, 10, 15);
        this.camera.lookAt(this.scene.position);
    }
    /**
     * @param {?} force
     * @return {?}
     */
    resizeCanvasToDisplaySize(force) {
        // See: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
        /** @type {?} */
        const width = this.canvas.clientWidth;
        /** @type {?} */
        const height = this.canvas.clientHeight;
        if (force || this.canvas.width !== width || this.canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }
    /**
     * @return {?}
     */
    configRenderer() {
        this.renderer = new WebGLRenderer$1({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(1);
        // Using setPixelRatio(devicePixelRatio) for HD-DPI can cause excessive rendering.
        // See: https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
        this.renderer.setClearColor(0x000000, 0);
        /*    const widgetPadding = 4;
            console.log('canvas.width', this.canvas.width);
            console.log('canvas.clientWidth', this.canvas.clientWidth);
            console.log('canvas.offsetWidth', this.canvas.offsetWidth);
            console.log('canvas.scrollWidth', this.canvas.scrollWidth);
            const style = getComputedStyle(this.elem.nativeElement);
            console.log('elem computed', style.width);
            // const rect = this.canvas.getBoundingClientRect();
            // console.log('rect', rect);
            const rect = this.elem.nativeElement.getBoundingClientRect();
            console.log('elem rect', rect.width);
        
            const width = this.canvas.clientWidth - (widgetPadding * 2);
            const height = this.canvas.clientHeight; // resizable layout "col" flex adjusts height to fit
            // this.renderer.setSize(width, height);
        */
        this.resizeCanvasToDisplaySize(true);
        // this.updateChildCamerasAspectRatio();
    }
    /**
     * @return {?}
     */
    configControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.update();
    }
    /**
     * @return {?}
     */
    createLight() {
        this.light = new PointLight$1(0xffffff);
        this.light.position.set(-10, 10, 10);
        this.scene.add(this.light);
    }
    /**
     * @return {?}
     */
    createMesh() {
        /** @type {?} */
        const geometry = new BoxGeometry(5, 5, 5);
        /** @type {?} */
        const material = new MeshLambertMaterial({ color: 0xff0000 });
        this.mesh = new Mesh(geometry, material);
        this.scene.add(this.mesh);
    }
    /**
     * @return {?}
     */
    animate() {
        window.requestAnimationFrame(() => this.animate());
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.01;
        // if (this.count < 6) {
        // const rect = this.canvas.getBoundingClientRect();
        // console.log('rect', rect.width);
        // this.count++;
        // }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.updateCamera();
    }
}
ThreeTestComponent.decorators = [
    { type: Component, args: [{
                selector: 'three-test',
                template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                styles: ["canvas{width:100%;height:100%}"]
            }] }
];
ThreeTestComponent.ctorParameters = () => [
    { type: ElementRef }
];
ThreeTestComponent.propDecorators = {
    canvasRef: [{ type: ViewChild, args: ['canvas',] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
class ThreeLibModule {
}
ThreeLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    OrbitControlsDirective,
                    ColladaLoaderDirective,
                    ObjLoaderDirective,
                    Rad2DegPipe,
                    Deg2RadPipe,
                    PerspectiveCameraDirective,
                    WebGLRendererComponent,
                    SceneDirective,
                    AxesHelperDirective,
                    GridHelperDirective,
                    ObjectLoaderDirective,
                    PointLightDirective,
                    ThreeTestComponent
                ],
                exports: [
                    OrbitControlsDirective,
                    ColladaLoaderDirective,
                    ObjLoaderDirective,
                    Rad2DegPipe,
                    Deg2RadPipe,
                    PerspectiveCameraDirective,
                    WebGLRendererComponent,
                    SceneDirective,
                    AxesHelperDirective,
                    GridHelperDirective,
                    ObjectLoaderDirective,
                    PointLightDirective,
                    ThreeTestComponent
                ],
                providers: [],
                entryComponents: [
                    WebGLRendererComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ThreeLibService, WebGLRendererComponent, OrbitControlsDirective, ColladaLoaderDirective, ObjLoaderDirective, Rad2DegPipe, Deg2RadPipe, PerspectiveCameraDirective, SceneDirective, AxesHelperDirective, GridHelperDirective, ObjectLoaderDirective, PointLightDirective, ThreeLibModule, AbstractCamera as ɵb, AbstractObject3D as ɵa, AbstractModelLoader as ɵc, ThreeTestComponent as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL2Fic3RyYWN0LW1vZGVsLWxvYWRlci50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9yYWQyZGVnLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcGlwZXMvZGVnMnJhZC5waXBlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE9iamVjdDNEPFQgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RPYmplY3QzRCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgY2hpbGROb2RlczogUXVlcnlMaXN0PEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+PjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVYOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVo6IG51bWJlcjtcblxuICBASW5wdXQoKSB0cmFuc2xhdGVYOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVk6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWjogbnVtYmVyO1xuXG4gIHByaXZhdGUgb2JqZWN0OiBUO1xuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLm9iamVjdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtdXN0UmVyZW5kZXIgPSBmYWxzZTtcblxuICAgIGlmIChbJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoWyd0cmFuc2xhdGVYJywgJ3RyYW5zbGF0ZVknLCAndHJhbnNsYXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobXVzdFJlcmVuZGVyKSB7XG4gICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RPYmplY3QzRC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLm9iamVjdCA9IHRoaXMubmV3T2JqZWN0M0RJbnN0YW5jZSgpO1xuXG4gICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5jaGlsZE5vZGVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5maWx0ZXIoaSA9PiBpICE9PSB0aGlzICYmIGkuZ2V0T2JqZWN0KCkgIT09IHVuZGVmaW5lZCkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJBZGQgY2hpbGQgZm9yIFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaS5nZXRPYmplY3QoKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJObyBjaGlsZCBPYmplY3QzRCBmb3I6IFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmFmdGVySW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVJvdGF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuZ2xlcyA9IFtcbiAgICAgIHRoaXMucm90YXRlWCxcbiAgICAgIHRoaXMucm90YXRlWSxcbiAgICAgIHRoaXMucm90YXRlWlxuICAgIF0ubWFwKGFuZ2xlID0+IGFuZ2xlIHx8IDApO1xuXG4gICAgdGhpcy5vYmplY3Qucm90YXRpb24uc2V0KFxuICAgICAgdGhpcy5yb3RhdGVYIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWiB8fCAwLFxuICAgICAgJ1hZWidcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRyYW5zbGF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLnNldChcbiAgICAgIHRoaXMudHJhbnNsYXRlWCB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVZIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVogfHwgMFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LmFkZChvYmplY3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZUNoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5yZW1vdmUob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMub2JqZWN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IG5ld09iamVjdDNESW5zdGFuY2UoKTogVDtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtc2NlbmUnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNjZW5lRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBTY2VuZURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuU2NlbmU+IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5TY2VuZSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlNjZW5lKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q2FtZXJhPFQgZXh0ZW5kcyBUSFJFRS5DYW1lcmE+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY2FtZXJhOiBUO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdENhbWVyYS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpO1xuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEhvc3RMaXN0ZW5lcixcbiAgUXVlcnlMaXN0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS13ZWJnbC1yZW5kZXJlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2ViR0xSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG4gIHByaXZhdGUgdmlld0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJylcbiAgcHJpdmF0ZSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7IC8vIE5PVEU6IHNheSBieWUtYnllIHRvIHNlcnZlci1zaWRlIHJlbmRlcmluZyA7KVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2NlbmVEaXJlY3RpdmUpIHNjZW5lQ29tcG9uZW50czogUXVlcnlMaXN0PFNjZW5lRGlyZWN0aXZlPjsgLy8gVE9ETzogTXVsdGlwbGUgc2NlbmVzXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEpIGNhbWVyYUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjsgLy8gVE9ETzogTXVsdGlwbGUgY2FtZXJhc1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5jb25zdHJ1Y3RvcicpO1xuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRSZW5kZXJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVuZGVyIHBhbmUgb24gd2hpY2ggdGhlIHNjZW5lIGlzIHJlbmRlcmVkLlxuICAgKiBDdXJyZW50bHksIG9ubHkgdGhlIFdlYkdMIHJlbmRlcmVyIHdpdGggYSBjYW52YXMgaXMgdXNlZCBpbiB0aGlzXG4gICAqIGltcGxlbWVudGF0aW9uLCBzbyB0aGlzIHByb3BlcnR5IHdpbGwgYWx3YXlzIGJlIGFuIEVsZW1lbnRSZWYgdG8gdGhlXG4gICAqIHVuZGVybHlpbmcgPGNhbnZhcz4gZWxlbWVudC5cbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW3JvdGF0ZVNwZWVkXT0xIFt6b29tU3BlZWRdPTEuMiBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlclBhbmUoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRSZW5kZXJpbmcoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LnN0YXJ0UmVuZGVyaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweGZmZmZmZiwgMSk7XG4gICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIC8vIGlmICh0aGlzLnNjZW5lQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5zY2VuZUNvbXBvbmVudHMubGVuZ3RoID09IDEgJiZcbiAgICAvLyAgICAgdGhpcy5jYW1lcmFDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNhbWVyYUNvbXBvbmVudHMubGVuZ3RoID09IDEpIHtcbiAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgIGNvbnN0IHNjZW5lQ29tcG9uZW50ID0gdGhpcy5zY2VuZUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICBjb25zdCBjYW1lcmFDb21wb25lbnQgPSB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJlbmRlclwiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNjZW5lLmdldE9iamVjdCgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNhbWVyYS5jYW1lcmEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmVDb21wb25lbnQuZ2V0T2JqZWN0KCksIGNhbWVyYUNvbXBvbmVudC5jYW1lcmEpO1xuICAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQub25SZXNpemU6ICcgKyB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCArICcsICcgKyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKSB7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5mb3JFYWNoKGNhbWVyYSA9PiBjYW1lcmEudXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0KSk7XG4gIH1cblxuICAvKlxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlwcmVzcycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJvbktleVByZXNzOiBcIiArIGV2ZW50LmtleSk7XG4gIH1cbiovXG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLFxuICAgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ0BhdmF0c2Fldi90aHJlZS1vcmJpdGNvbnRyb2xzLXRzJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9yYml0LWNvbnRyb2xzJ1xufSlcbmV4cG9ydCBjbGFzcyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRDYW1lcmFzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47XG4gIEBDb250ZW50Q2hpbGRyZW4oV2ViR0xSZW5kZXJlckNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZFJlbmRlcmVyczogUXVlcnlMaXN0PFdlYkdMUmVuZGVyZXJDb21wb25lbnQ+O1xuICAvKipcbiAgICogVGhlIGVsZW1lbnQgb24gd2hvc2UgbmF0aXZlIGVsZW1lbnQgdGhlIG9yYml0IGNvbnRyb2xzIHdpbGwgbGlzdGVuIGZvciBtb3VzZSBldmVudHMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBrZXlib2FyZCBldmVudHMgYXJlIHN0aWxsIGxpc3RlbmVkIGZvciBvbiB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QsIHRoaXMgaXNcbiAgICogYSBrbm93biBpc3N1ZSBmcm9tIFRocmVlLmpzOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTAzMTVcbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgQElucHV0KCkgbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgcm90YXRlU3BlZWQgPSAxLjA7XG4gIEBJbnB1dCgpIHpvb21TcGVlZCA9IDEuMjtcblxuICAvLyBwcml2YXRlIGNvbnRyb2xzOiBUSFJFRS5PcmJpdENvbnRyb2xzO1xuICBwcml2YXRlIGNvbnRyb2xzOiBPcmJpdENvbnRyb2xzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gSWYgdGhlIFRIUkVFLmpzIE9yYml0Q29udHJvbHMgYXJlIG5vdCBzZXQgdXAgeWV0LCB3ZSBkbyBub3QgbmVlZCB0byB1cGRhdGVcbiAgICAvLyBhbnl0aGluZyBhcyB0aGV5IHdpbGwgcGljayB0aGUgbmV3IHZhbHVlcyBmcm9tIHRoZSBASW5wdXQgcHJvcGVydGllcyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gdXBvbiBjcmVhdGlvbi5cbiAgICBpZiAoIXRoaXMuY29udHJvbHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sncm90YXRlU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd6b29tU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50J10pIHtcbiAgICAgIC8vIFRoZSBET00gZWxlbWVudCB0aGUgT3JiaXRDb250cm9scyBsaXN0ZW4gb24gY2Fubm90IGJlIGNoYW5nZWQgb25jZSBhblxuICAgICAgLy8gT3JiaXRDb250cm9scyBvYmplY3QgaXMgY3JlYXRlZC4gV2UgdGh1cyBuZWVkIHRvIHJlY3JlYXRlIGl0LlxuICAgICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRVcE9yYml0Q29udHJvbHMoKSB7XG4gICAgLy8gdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKFxuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhcbiAgICAgICAgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QuY2FtZXJhLFxuICAgICAgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudCAmJiB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApO1xuICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcik7XG4gICAgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICBpZiAodGhpcy5jaGlsZENhbWVyYXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbWVyYSBpcyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hpbGRSZW5kZXJlcnMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVuZGVyZXIgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbi8qKlxuICogSGVscGVyIHBhcmVudCBjbGFzcyBmb3IgbW9kZWwgbG9hZGVyIGRpcmVjdGl2ZXMuXG4gKlxuICogQHNlZSBPYmplY3RMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgT2JqTG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIENvbGxhZGFMb2FkZXJEaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TW9kZWxMb2FkZXIgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfbW9kZWw6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gc2lnbmFsIHdoZXRoZXIgdGhlIHBhcmVudCBjbGFzcyBpbnN0YW5jZSBBYnN0cmFjdE9iamVjdDNEIGNhbGxlZCB0aGVcbiAgICogb3ZlcndyaXR0ZW4gbWV0aG9kIHtAbGluayBNb2RlbExvYWRlckRpcmVjdGl2ZSNhZnRlckluaXR9IHlldC5cbiAgICpcbiAgICogVW5sZXNzIHRoYXQgbWV0aG9kIHdhcyBjYWxsZWQsIG5vIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2Yge0BsaW5rIEFic3RyYWN0T2JqZWN0M0R9XG4gICAqIG1heSBiZSBzYWZlbHkgYWNjZXNzZWQsIGVzcGVjaWFsbHkge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QjYWRkQ2hpbGR9IGFuZFxuICAgKiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRC5yZW5kZXJlcn0uXG4gICAqL1xuICBwcml2YXRlIHBhcmVudEluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdDogVEhSRUUuT2JqZWN0M0QgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIExvYWQgdGhlIG1vZGVsIG9iamVjdC5cbiAgICpcbiAgICogU29tZSBsb2FkZXJzIChlLmcuIENvbGxhZGFMb2FkZXIpIGFsc28gcHJvdmlkZSBvdGhlciBtb2RlbCBpbmZvcm1hdGlvblxuICAgKiB1cG9uIGxvYWRpbmcgYmVzaWRlcyB0aGUgXCJyYXdcIiBtb2RlbCBvYmplY3Qvc2NlbmUuIEluIHRoZXNlIGNhc2VzXG4gICAqIGltcGxlbWVudGluZyBjaGlsZCBjbGFzc2VzIGFyZSBpbmRlZWQgc3VwcG9zZWQgdG8gcmV0dXJuIHRoZSBcInJhd1wiIG1vZGVsXG4gICAqIG9iamVjdC5cbiAgICogVGhlIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJLCBhbHRob3VnaCBjaGlsZCBjbGFzc2VzIGFyZSBmcmVlIHRvIGltcGxlbWVudFxuICAgKiBvdGhlciBtZWFucyBhcyB3ZWxsKSBmcm9tIHdoaWNoIHRoZSBtb2RlbCBzaGFsbCBiZSBsb2FkZWQgY2FuIGJlIG9idGFpbmVkIGJ5XG4gICAqIHtAbGluayBNb2RlbExvYWRlckRpcmVjdGl2ZS5tb2RlbH0uXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCk6IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+O1xuXG4gIC8qKlxuICAgKiBUaGUgbW9kZWwgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkkpLlxuICAgKiBTZXR0aW5ncyB0aGlzIHByb3BlcnR5IG9ubHkgaGlkZXMgdGhlIHByZXZpb3VzIG1vZGVsIHVwb24gc3VjY2Vzc2Z1bFxuICAgKiBsb2FkaW5nIG9mIHRoZSBuZXcgb25lLiBUaGlzIGVzcGVjaWFsbHkgbWVhbnMgdGhhdCBpZiB0aGUgbmV3IGRhdGEgc291cmNlXG4gICAqIGlzIGludmFsaWQsIHRoZSBvbGQgbW9kZWwgd2lsbCAqbm90KiBiZSByZW1vdmVkIGZyb20gdGhlIHNjZW5lLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtb2RlbChuZXdNb2RlbFVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXdNb2RlbFVybDtcblxuICAgIC8vIERlbGF5IG1vZGVsIGxvYWRpbmcgdW50aWwgdGhlIHBhcmVudCBoYXMgYmVlbiBpbml0aWFsaXplZCxcbiAgICAvLyBzbyB0aGF0IHdlIGNhbiBjYWxsIGFkZENoaWxkKCkuXG4gICAgaWYgKCF0aGlzLnBhcmVudEluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkTW9kZWxPYmplY3QoKS50aGVuKG5ld01vZGVsID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QgPSBuZXdNb2RlbDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQobmV3TW9kZWwpO1xuXG4gICAgICBpZiAodGhpcy5yZW5kZXJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbW9kZWwgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkkpLlxuICAgKi9cbiAgcHVibGljIGdldCBtb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHJlbmRlcmVyKG5ld1JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSBuZXdSZW5kZXJlcjtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpIHtcbiAgICB0aGlzLnBhcmVudEluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIC8vIFRyaWdnZXIgbW9kZWwgYWNxdWlzaXRpb24gbm93IHRoYXQgdGhlIHBhcmVudCBoYXMgYmVlbiBpbml0aWFsaXplZC5cbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcmVuZGVyKCkge1xuICAgIHN1cGVyLnJlcmVuZGVyKCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJlcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5PYmplY3QzRCB7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1jb2xsYWRhLWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5Db2xsYWRhTG9hZGVyKCk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwuc2NlbmUpO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5cbi8qKlxuICogRGlyZWN0aXZlIGZvciBlbXBsb3lpbmcgVEhSRUUuT0JKTG9hZGVyIHRvIGxvYWQgW1dhdmVmcm9udCAqLm9iaiBmaWxlc11bMV0uXG4gKlxuICogWzFdOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XYXZlZnJvbnRfLm9ial9maWxlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iai1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iakxvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqTG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9CSkxvYWRlcigpO1xuICBwcml2YXRlIG10bExvYWRlciA9IG5ldyBUSFJFRS5NVExMb2FkZXIoKTtcblxuICBASW5wdXQoKVxuICBtYXRlcmlhbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRleHR1cmVQYXRoOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGl0IG5pY2VyXG4gICAgaWYgKHRoaXMubWF0ZXJpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICByZWplY3RcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZVBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubXRsTG9hZGVyLnNldFRleHR1cmVQYXRoKHRoaXMudGV4dHVyZVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubXRsTG9hZGVyLmxvYWQodGhpcy5tYXRlcmlhbCwgbWF0ZXJpYWwgPT4ge1xuICAgICAgICAgIG1hdGVyaWFsLnByZWxvYWQoKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWwpO1xuICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3JhZDJkZWcnXG59KVxuZXhwb3J0IGNsYXNzIFJhZDJEZWdQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHJhZGlhbnMgdG8gZGVncmVlc1xuICAgKiBAcGFyYW0gcmFkaWFucyBSYWRpYW5zXG4gICAqL1xuICB0cmFuc2Zvcm0ocmFkaWFuczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcmFkaWFucyAqICgxODAgLyBNYXRoLlBJKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RlZzJyYWQnXG59KVxuZXhwb3J0IGNsYXNzIERlZzJSYWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgKiBAcGFyYW0gZGVncmVlIERlZ3JlZXNcbiAgICovXG4gIHRyYW5zZm9ybShkZWdyZWVzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoZGVncmVlcyAvIDE4MCkgKiBNYXRoLlBJO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuL2Fic3RyYWN0LWNhbWVyYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdENhbWVyYSwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RDYW1lcmE8VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE+IHtcblxuICAvLyBASW5wdXQoKSBjYW1lcmFUYXJnZXQ6IFRIUkVFLk9iamVjdDNEO1xuXG4gIEBJbnB1dCgpIGZvdjogbnVtYmVyO1xuICBASW5wdXQoKSBuZWFyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZhcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHBvc2l0aW9uWDogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblk6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25aOiBudW1iZXI7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbGV0IGFzcGVjdFJhdGlvID0gdW5kZWZpbmVkOyAvLyBVcGRhdGVkIGxhdGVyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICB0aGlzLmZvdixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMubmVhcixcbiAgICAgIHRoaXMuZmFyXG4gICAgKTtcblxuICAgIC8vIFNldCBwb3NpdGlvbiBhbmQgbG9vayBhdFxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uWDtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvblk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IHRoaXMucG9zaXRpb25aO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3Q6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS51cGRhdGVBc3BlY3RSYXRpbzogJyArIGFzcGVjdCk7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gYXNwZWN0O1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWF4ZXMtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBeGVzSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBBeGVzSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLkF4ZXNIZWxwZXIge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkF4ZXNIZWxwZXIodGhpcy5zaXplKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWdyaWQtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBHcmlkSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXZpc2lvbnM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5HcmlkSGVscGVyKHRoaXMuc2l6ZSwgdGhpcy5kaXZpc2lvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb2JqZWN0LWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT2JqZWN0TG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuT2JqZWN0TG9hZGVyKCk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcG9pbnQtbGlnaHQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBvaW50TGlnaHREaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50TGlnaHREaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlBvaW50TGlnaHQ+IHtcblxuICBASW5wdXQoKSBjb2xvcjogVEhSRUUuQ29sb3I7XG4gIEBJbnB1dCgpIGludGVuc2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXN0YW5jZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlBvaW50TGlnaHQge1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50TGlnaHQodGhpcy5jb2xvciwgdGhpcy5pbnRlbnNpdHksIHRoaXMuZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG4vLyBpbXBvcnQgeyBDYW1lcmFDb250cm9scyB9IGZyb20gJ2NhbWVyYS1jb250cm9scyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXRlc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGhyZWUtdGVzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RocmVlLXRlc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlVGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdjYW52YXMnKSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7XG5cbiAgc2NlbmUgPSBudWxsO1xuICBjYW1lcmEgPSBudWxsO1xuICByZW5kZXJlciA9IG51bGw7XG4gIGNvbnRyb2xzID0gbnVsbDtcbiAgbWVzaCA9IG51bGw7XG4gIGxpZ2h0ID0gbnVsbDtcbiAgY291bnQgPSAxO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudCl7XG4gICB0aGlzLnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUodHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCAxLCAxLCAxMDAwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZ1NjZW5lKCk7XG4gICAgdGhpcy5jb25maWdDYW1lcmEoKTtcbiAgICB0aGlzLmNvbmZpZ1JlbmRlcmVyKCk7XG4gICAgdGhpcy5jb25maWdDb250cm9scygpO1xuXG4gICAgdGhpcy5jcmVhdGVMaWdodCgpO1xuICAgIHRoaXMuY3JlYXRlTWVzaCgpO1xuXG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBjb25maWdTY2VuZSgpIHtcbiAgICB0aGlzLnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoIDB4ZGRkZGRkICk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgLy8gY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRXaWR0aDogJywgdGhpcy5jYW52YXMuY2xpZW50V2lkdGgpO1xuLy8gICAgY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRIZWlnaHQ6ICcsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDYW1lcmEoKTogdm9pZCB7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIGNvbmZpZ0NhbWVyYSgpIHtcbiAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCggLTE1LCAxMCwgMTUgKTtcbiAgICB0aGlzLmNhbWVyYS5sb29rQXQoIHRoaXMuc2NlbmUucG9zaXRpb24gKTtcbiAgfVxuXG4gIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoZm9yY2UpOiB2b2lkIHtcbiAgICAvLyBTZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODg0NDg1L3RocmVlanMtY2FudmFzLXNpemUtYmFzZWQtb24tY29udGFpbmVyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGZvcmNlIHx8IHRoaXMuY2FudmFzLndpZHRoICE9PSB3aWR0aCB8fCB0aGlzLmNhbnZhcy5oZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgLy8geW91IG11c3QgcGFzcyBmYWxzZSBoZXJlIG9yIHRocmVlLmpzIHNhZGx5IGZpZ2h0cyB0aGUgYnJvd3NlclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ1JlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICAgICAgYWxwaGE6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oMSk7XG4gICAgIC8vIFVzaW5nIHNldFBpeGVsUmF0aW8oZGV2aWNlUGl4ZWxSYXRpbykgZm9yIEhELURQSSBjYW4gY2F1c2UgZXhjZXNzaXZlIHJlbmRlcmluZy5cbiAgICAgLy8gU2VlOiBodHRwczovL3dlYmdsZnVuZGFtZW50YWxzLm9yZy93ZWJnbC9sZXNzb25zL3dlYmdsLXJlc2l6aW5nLXRoZS1jYW52YXMuaHRtbFxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAsIDAgKTtcbi8qICAgIGNvbnN0IHdpZGdldFBhZGRpbmcgPSA0O1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMud2lkdGgnLCB0aGlzLmNhbnZhcy53aWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRXaWR0aCcsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLm9mZnNldFdpZHRoJywgdGhpcy5jYW52YXMub2Zmc2V0V2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMuc2Nyb2xsV2lkdGgnLCB0aGlzLmNhbnZhcy5zY3JvbGxXaWR0aCk7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zb2xlLmxvZygnZWxlbSBjb21wdXRlZCcsIHN0eWxlLndpZHRoKTtcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlY3QnLCByZWN0KTtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc29sZS5sb2coJ2VsZW0gcmVjdCcsIHJlY3Qud2lkdGgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAtICh3aWRnZXRQYWRkaW5nICogMik7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0OyAvLyByZXNpemFibGUgbGF5b3V0IFwiY29sXCIgZmxleCBhZGp1c3RzIGhlaWdodCB0byBmaXRcbiAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4qL1xuICAgIHRoaXMucmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSh0cnVlKTtcbiAgICAvLyB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gIH1cblxuICBjb25maWdDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHRoaXMuY2FudmFzKTtcbiAgICB0aGlzLmNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlUGFuICA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgfVxuXG4gIGNyZWF0ZUxpZ2h0KCkge1xuICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCggMHhmZmZmZmYgKTtcbiAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldCggLTEwLCAxMCwgMTAgKTtcbiAgICB0aGlzLnNjZW5lLmFkZCggdGhpcy5saWdodCApO1xuICB9XG5cbiAgY3JlYXRlTWVzaCgpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1LCA1LCA1KTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwIH0pO1xuICAgIHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZXNoKTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGUoKSk7XG4gICAgLy8gdGhpcy5tZXNoLnJvdGF0aW9uLnggKz0gMC4wMTtcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueSArPSAwLjAxO1xuICAgIC8vIGlmICh0aGlzLmNvdW50IDwgNikge1xuICAgIC8vIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdCcsIHJlY3Qud2lkdGgpO1xuICAgIC8vIHRoaXMuY291bnQrKztcbiAgICAvLyB9XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL2NvbGxhZGEtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmpMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSYWQyRGVnUGlwZSB9IGZyb20gJy4vcGlwZXMvcmFkMmRlZy5waXBlJztcbmltcG9ydCB7IERlZzJSYWRQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWcycmFkLnBpcGUnO1xuaW1wb3J0IHsgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgfSBmcm9tICcuL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEF4ZXNIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZEhlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmplY3QtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb2ludExpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xpZ2h0L3BvaW50LWxpZ2h0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaHJlZVRlc3RDb21wb25lbnQgfSBmcm9tICcuL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQnO1xuXG4vLyBUT0RPOiBJZGVhbGx5IG1vdmUgYWxsIHRvIHRocmVlLXdyYXBwZXIgbGlicmFyeS4gQnV0IGNhbid0IG1vdmUganMvRW5hYmxlVGhyZWVFeGFtcGxlcy5qcyB0byBsaWJyYXJ5IDooXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZUxpYk1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJUSFJFRS5TY2VuZSIsIlRIUkVFLldlYkdMUmVuZGVyZXIiLCJUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwIiwiVEhSRUUuT2JqZWN0M0QiLCJUSFJFRS5Db2xsYWRhTG9hZGVyIiwiVEhSRUUuT0JKTG9hZGVyIiwiVEhSRUUuTVRMTG9hZGVyIiwiVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEiLCJUSFJFRS5BeGVzSGVscGVyIiwiVEhSRUUuR3JpZEhlbHBlciIsIlRIUkVFLk9iamVjdExvYWRlciIsIlRIUkVFLlBvaW50TGlnaHQiLCJUSFJFRS5Db2xvciIsIlRIUkVFLkJveEdlb21ldHJ5IiwiVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCIsIlRIUkVFLk1lc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7SUFPRSxpQkFBaUI7OztZQUxsQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7OztBQ0pEOzs7O0FBVUE7Ozs7SUF5QlksUUFBUTtLQUNqQjs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFN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