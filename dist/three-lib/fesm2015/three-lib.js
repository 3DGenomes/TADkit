import { Injectable, ContentChildren, Input, Component, ViewChild, ElementRef, HostListener, NgModule, Directive, forwardRef, Pipe, defineInjectable } from '@angular/core';
import { Object3D, PerspectiveCamera, Scene, OBJLoader, MTLLoader, ColladaLoader, ObjectLoader, WebGLRenderer, PCFSoftShadowMap, AxesHelper, GridHelper, PointLight } from 'three-full';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL2Fic3RyYWN0LW1vZGVsLWxvYWRlci50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9yYWQyZGVnLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcGlwZXMvZGVnMnJhZC5waXBlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIE9uQ2hhbmdlcywgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0T2JqZWN0M0Q8VCBleHRlbmRzIFRIUkVFLk9iamVjdDNEPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdE9iamVjdDNELCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KSBjaGlsZE5vZGVzOiBRdWVyeUxpc3Q8QWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4+O1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVg6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVZOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVg6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWTogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVaOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvYmplY3Q6IFQ7XG5cbiAgcHJvdGVjdGVkIHJlcmVuZGVyKCkge1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMub2JqZWN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG11c3RSZXJlbmRlciA9IGZhbHNlO1xuXG4gICAgaWYgKFsncm90YXRlWCcsICdyb3RhdGVZJywgJ3JvdGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5Um90YXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbJ3RyYW5zbGF0ZVgnLCAndHJhbnNsYXRlWScsICd0cmFuc2xhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtdXN0UmVyZW5kZXIpIHtcbiAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdE9iamVjdDNELm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMub2JqZWN0ID0gdGhpcy5uZXdPYmplY3QzREluc3RhbmNlKCk7XG5cbiAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICB0aGlzLmFwcGx5Um90YXRpb24oKTtcblxuICAgIGlmICh0aGlzLmNoaWxkTm9kZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLmZpbHRlcihpID0+IGkgIT09IHRoaXMgJiYgaS5nZXRPYmplY3QoKSAhPT0gdW5kZWZpbmVkKS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFkZCBjaGlsZCBmb3IgXCIgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChpLmdldE9iamVjdCgpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIk5vIGNoaWxkIE9iamVjdDNEIGZvcjogXCIgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgIH1cblxuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Um90YXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgYW5nbGVzID0gW1xuICAgICAgdGhpcy5yb3RhdGVYLFxuICAgICAgdGhpcy5yb3RhdGVZLFxuICAgICAgdGhpcy5yb3RhdGVaXG4gICAgXS5tYXAoYW5nbGUgPT4gYW5nbGUgfHwgMCk7XG5cbiAgICB0aGlzLm9iamVjdC5yb3RhdGlvbi5zZXQoXG4gICAgICB0aGlzLnJvdGF0ZVggfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWSB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVaIHx8IDAsXG4gICAgICAnWFlaJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VHJhbnNsYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucG9zaXRpb24uc2V0KFxuICAgICAgdGhpcy50cmFuc2xhdGVYIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWiB8fCAwXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QuYWRkKG9iamVjdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnJlbW92ZShvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGdldE9iamVjdCgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5vYmplY3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1zY2VuZScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2NlbmVEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFNjZW5lRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5TY2VuZT4ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlNjZW5lIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBJbnB1dCwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q2FtZXJhPFQgZXh0ZW5kcyBUSFJFRS5DYW1lcmE+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY2FtZXJhOiBUO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdENhbWVyYS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBDb250ZW50Q2hpbGRyZW4sIEhvc3RMaXN0ZW5lcixcbiAgUXVlcnlMaXN0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtd2ViZ2wtcmVuZGVyZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdlYkdMUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBwcml2YXRlIHZpZXdJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpXG4gIHByaXZhdGUgY2FudmFzUmVmOiBFbGVtZW50UmVmOyAvLyBOT1RFOiBzYXkgYnllLWJ5ZSB0byBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgOylcblxuICBAQ29udGVudENoaWxkcmVuKFNjZW5lRGlyZWN0aXZlKSBzY2VuZUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTY2VuZURpcmVjdGl2ZT47IC8vIFRPRE86IE11bHRpcGxlIHNjZW5lc1xuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhKSBjYW1lcmFDb21wb25lbnRzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47IC8vIFRPRE86IE11bHRpcGxlIGNhbWVyYXNcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuY29uc3RydWN0b3InKTtcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0UmVuZGVyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlbmRlciBwYW5lIG9uIHdoaWNoIHRoZSBzY2VuZSBpcyByZW5kZXJlZC5cbiAgICogQ3VycmVudGx5LCBvbmx5IHRoZSBXZWJHTCByZW5kZXJlciB3aXRoIGEgY2FudmFzIGlzIHVzZWQgaW4gdGhpc1xuICAgKiBpbXBsZW1lbnRhdGlvbiwgc28gdGhpcyBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSBhbiBFbGVtZW50UmVmIHRvIHRoZVxuICAgKiB1bmRlcmx5aW5nIDxjYW52YXM+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtyb3RhdGVTcGVlZF09MSBbem9vbVNwZWVkXT0xLjIgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJQYW5lKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0UmVuZGVyaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5zdGFydFJlbmRlcmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDEpO1xuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyBpZiAodGhpcy5zY2VuZUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2NlbmVDb21wb25lbnRzLmxlbmd0aCA9PSAxICYmXG4gICAgLy8gICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYW1lcmFDb21wb25lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCBzY2VuZUNvbXBvbmVudCA9IHRoaXMuc2NlbmVDb21wb25lbnRzLmZpcnN0O1xuICAgICAgY29uc3QgY2FtZXJhQ29tcG9uZW50ID0gdGhpcy5jYW1lcmFDb21wb25lbnRzLmZpcnN0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzY2VuZS5nZXRPYmplY3QoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjYW1lcmEuY2FtZXJhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lQ29tcG9uZW50LmdldE9iamVjdCgpLCBjYW1lcmFDb21wb25lbnQuY2FtZXJhKTtcbiAgICB9XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm9uUmVzaXplOiAnICsgdGhpcy5jYW52YXMuY2xpZW50V2lkdGggKyAnLCAnICsgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCkge1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZm9yRWFjaChjYW1lcmEgPT4gY2FtZXJhLnVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdCkpO1xuICB9XG5cbiAgLypcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25LZXlQcmVzczogXCIgKyBldmVudC5rZXkpO1xuICB9XG4qL1xuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vcmJpdC1jb250cm9scydcbn0pXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkQ2FtZXJhczogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+O1xuICBAQ29udGVudENoaWxkcmVuKFdlYkdMUmVuZGVyZXJDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRSZW5kZXJlcnM6IFF1ZXJ5TGlzdDxXZWJHTFJlbmRlcmVyQ29tcG9uZW50PjtcbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IG9uIHdob3NlIG5hdGl2ZSBlbGVtZW50IHRoZSBvcmJpdCBjb250cm9scyB3aWxsIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQga2V5Ym9hcmQgZXZlbnRzIGFyZSBzdGlsbCBsaXN0ZW5lZCBmb3Igb24gdGhlIGdsb2JhbCB3aW5kb3cgb2JqZWN0LCB0aGlzIGlzXG4gICAqIGEga25vd24gaXNzdWUgZnJvbSBUaHJlZS5qczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzEwMzE1XG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RlbmluZ0NvbnRyb2xFbGVtZW50OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIHJvdGF0ZVNwZWVkID0gMS4wO1xuICBASW5wdXQoKSB6b29tU3BlZWQgPSAxLjI7XG5cbiAgLy8gcHJpdmF0ZSBjb250cm9sczogVEhSRUUuT3JiaXRDb250cm9scztcbiAgcHJpdmF0ZSBjb250cm9sczogT3JiaXRDb250cm9scztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIElmIHRoZSBUSFJFRS5qcyBPcmJpdENvbnRyb2xzIGFyZSBub3Qgc2V0IHVwIHlldCwgd2UgZG8gbm90IG5lZWQgdG8gdXBkYXRlXG4gICAgLy8gYW55dGhpbmcgYXMgdGhleSB3aWxsIHBpY2sgdGhlIG5ldyB2YWx1ZXMgZnJvbSB0aGUgQElucHV0IHByb3BlcnRpZXMgYXV0b21hdGljYWxseVxuICAgIC8vIHVwb24gY3JlYXRpb24uXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3JvdGF0ZVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snem9vbVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydsaXN0ZW5pbmdDb250cm9sRWxlbWVudCddKSB7XG4gICAgICAvLyBUaGUgRE9NIGVsZW1lbnQgdGhlIE9yYml0Q29udHJvbHMgbGlzdGVuIG9uIGNhbm5vdCBiZSBjaGFuZ2VkIG9uY2UgYW5cbiAgICAgIC8vIE9yYml0Q29udHJvbHMgb2JqZWN0IGlzIGNyZWF0ZWQuIFdlIHRodXMgbmVlZCB0byByZWNyZWF0ZSBpdC5cbiAgICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBPcmJpdENvbnRyb2xzKCkge1xuICAgIC8vIHRoaXMuY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoXG4gICAgICAgIHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0LmNhbWVyYSxcbiAgICAgIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQgJiYgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgKTtcbiAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIpO1xuICAgIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgaWYgKHRoaXMuY2hpbGRDYW1lcmFzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW1lcmEgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNoaWxkUmVuZGVyZXJzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG4vKipcbiAqIEhlbHBlciBwYXJlbnQgY2xhc3MgZm9yIG1vZGVsIGxvYWRlciBkaXJlY3RpdmVzLlxuICpcbiAqIEBzZWUgT2JqZWN0TG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIE9iakxvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1vZGVsTG9hZGVyIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX21vZGVsOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIHNpZ25hbCB3aGV0aGVyIHRoZSBwYXJlbnQgY2xhc3MgaW5zdGFuY2UgQWJzdHJhY3RPYmplY3QzRCBjYWxsZWQgdGhlXG4gICAqIG92ZXJ3cml0dGVuIG1ldGhvZCB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUjYWZ0ZXJJbml0fSB5ZXQuXG4gICAqXG4gICAqIFVubGVzcyB0aGF0IG1ldGhvZCB3YXMgY2FsbGVkLCBubyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHtAbGluayBBYnN0cmFjdE9iamVjdDNEfVxuICAgKiBtYXkgYmUgc2FmZWx5IGFjY2Vzc2VkLCBlc3BlY2lhbGx5IHtAbGluayBBYnN0cmFjdE9iamVjdDNEI2FkZENoaWxkfSBhbmRcbiAgICoge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QucmVuZGVyZXJ9LlxuICAgKi9cbiAgcHJpdmF0ZSBwYXJlbnRJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50TG9hZGVkTW9kZWxPYmplY3Q6IFRIUkVFLk9iamVjdDNEIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBtb2RlbCBvYmplY3QuXG4gICAqXG4gICAqIFNvbWUgbG9hZGVycyAoZS5nLiBDb2xsYWRhTG9hZGVyKSBhbHNvIHByb3ZpZGUgb3RoZXIgbW9kZWwgaW5mb3JtYXRpb25cbiAgICogdXBvbiBsb2FkaW5nIGJlc2lkZXMgdGhlIFwicmF3XCIgbW9kZWwgb2JqZWN0L3NjZW5lLiBJbiB0aGVzZSBjYXNlc1xuICAgKiBpbXBsZW1lbnRpbmcgY2hpbGQgY2xhc3NlcyBhcmUgaW5kZWVkIHN1cHBvc2VkIHRvIHJldHVybiB0aGUgXCJyYXdcIiBtb2RlbFxuICAgKiBvYmplY3QuXG4gICAqIFRoZSBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSwgYWx0aG91Z2ggY2hpbGQgY2xhc3NlcyBhcmUgZnJlZSB0byBpbXBsZW1lbnRcbiAgICogb3RoZXIgbWVhbnMgYXMgd2VsbCkgZnJvbSB3aGljaCB0aGUgbW9kZWwgc2hhbGwgYmUgbG9hZGVkIGNhbiBiZSBvYnRhaW5lZCBieVxuICAgKiB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUubW9kZWx9LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpOiBQcm9taXNlPFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogVGhlIG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICogU2V0dGluZ3MgdGhpcyBwcm9wZXJ0eSBvbmx5IGhpZGVzIHRoZSBwcmV2aW91cyBtb2RlbCB1cG9uIHN1Y2Nlc3NmdWxcbiAgICogbG9hZGluZyBvZiB0aGUgbmV3IG9uZS4gVGhpcyBlc3BlY2lhbGx5IG1lYW5zIHRoYXQgaWYgdGhlIG5ldyBkYXRhIHNvdXJjZVxuICAgKiBpcyBpbnZhbGlkLCB0aGUgb2xkIG1vZGVsIHdpbGwgKm5vdCogYmUgcmVtb3ZlZCBmcm9tIHRoZSBzY2VuZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbW9kZWwobmV3TW9kZWxVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3TW9kZWxVcmw7XG5cbiAgICAvLyBEZWxheSBtb2RlbCBsb2FkaW5nIHVudGlsIHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gc28gdGhhdCB3ZSBjYW4gY2FsbCBhZGRDaGlsZCgpLlxuICAgIGlmICghdGhpcy5wYXJlbnRJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZE1vZGVsT2JqZWN0KCkudGhlbihuZXdNb2RlbCA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0ID0gbmV3TW9kZWw7XG4gICAgICB0aGlzLmFkZENoaWxkKG5ld01vZGVsKTtcblxuICAgICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCByZW5kZXJlcihuZXdSZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3UmVuZGVyZXI7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyBUcmlnZ2VyIG1vZGVsIGFjcXVpc2l0aW9uIG5vdyB0aGF0IHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgICBzdXBlci5yZXJlbmRlcigpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtY29sbGFkYS1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuQ29sbGFkYUxvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsLnNjZW5lKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBmb3IgZW1wbG95aW5nIFRIUkVFLk9CSkxvYWRlciB0byBsb2FkIFtXYXZlZnJvbnQgKi5vYmogZmlsZXNdWzFdLlxuICpcbiAqIFsxXTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2F2ZWZyb250Xy5vYmpfZmlsZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmotbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmpMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iakxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKTtcbiAgcHJpdmF0ZSBtdGxMb2FkZXIgPSBuZXcgVEhSRUUuTVRMTG9hZGVyKCk7XG5cbiAgQElucHV0KClcbiAgbWF0ZXJpYWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0ZXh0dXJlUGF0aDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgLy8gVE9ETzogbWFrZSBpdCBuaWNlclxuICAgIGlmICh0aGlzLm1hdGVyaWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgcmVqZWN0XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm10bExvYWRlci5zZXRUZXh0dXJlUGF0aCh0aGlzLnRleHR1cmVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm10bExvYWRlci5sb2FkKHRoaXMubWF0ZXJpYWwsIG1hdGVyaWFsID0+IHtcbiAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdyYWQyZGVnJ1xufSlcbmV4cG9ydCBjbGFzcyBSYWQyRGVnUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXNcbiAgICogQHBhcmFtIHJhZGlhbnMgUmFkaWFuc1xuICAgKi9cbiAgdHJhbnNmb3JtKHJhZGlhbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdkZWcycmFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWcyUmFkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICogQHBhcmFtIGRlZ3JlZSBEZWdyZWVzXG4gICAqL1xuICB0cmFuc2Zvcm0oZGVncmVlczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKGRlZ3JlZXMgLyAxODApICogTWF0aC5QSTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi9hYnN0cmFjdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBlcnNwZWN0aXZlLWNhbWVyYScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RDYW1lcmEsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0Q2FtZXJhPFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhPiB7XG5cbiAgLy8gQElucHV0KCkgY2FtZXJhVGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblxuICBASW5wdXQoKSBmb3Y6IG51bWJlcjtcbiAgQElucHV0KCkgbmVhcjogbnVtYmVyO1xuICBASW5wdXQoKSBmYXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBwb3NpdGlvblg6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25ZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWjogbnVtYmVyO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIGxldCBhc3BlY3RSYXRpbyA9IHVuZGVmaW5lZDsgLy8gVXBkYXRlZCBsYXRlclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxuICAgICAgdGhpcy5mb3YsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLm5lYXIsXG4gICAgICB0aGlzLmZhclxuICAgICk7XG5cbiAgICAvLyBTZXQgcG9zaXRpb24gYW5kIGxvb2sgYXRcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvblg7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb25ZO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBvc2l0aW9uWjtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUudXBkYXRlQXNwZWN0UmF0aW86ICcgKyBhc3BlY3QpO1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IGFzcGVjdDtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1heGVzLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXhlc0hlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQXhlc0hlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5BeGVzSGVscGVyKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1ncmlkLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gR3JpZEhlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZEhlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgZGl2aXNpb25zOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuR3JpZEhlbHBlcih0aGlzLnNpemUsIHRoaXMuZGl2aXNpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iamVjdC1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iamVjdExvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBvaW50LWxpZ2h0JyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQb2ludExpZ2h0RGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5Qb2ludExpZ2h0PiB7XG5cbiAgQElucHV0KCkgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBASW5wdXQoKSBpbnRlbnNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgZGlzdGFuY2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5Qb2ludExpZ2h0IHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5Qb2ludExpZ2h0KHRoaXMuY29sb3IsIHRoaXMuaW50ZW5zaXR5LCB0aGlzLmRpc3RhbmNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnQGF2YXRzYWV2L3RocmVlLW9yYml0Y29udHJvbHMtdHMnO1xuLy8gaW1wb3J0IHsgQ2FtZXJhQ29udHJvbHMgfSBmcm9tICdjYW1lcmEtY29udHJvbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS10ZXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RocmVlLXRlc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aHJlZS10ZXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZVRlc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzUmVmOiBFbGVtZW50UmVmO1xuXG4gIHNjZW5lID0gbnVsbDtcbiAgY2FtZXJhID0gbnVsbDtcbiAgcmVuZGVyZXIgPSBudWxsO1xuICBjb250cm9scyA9IG51bGw7XG4gIG1lc2ggPSBudWxsO1xuICBsaWdodCA9IG51bGw7XG4gIGNvdW50ID0gMTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQpe1xuICAgdGhpcy5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgMSwgMSwgMTAwMCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jb25maWdTY2VuZSgpO1xuICAgIHRoaXMuY29uZmlnQ2FtZXJhKCk7XG4gICAgdGhpcy5jb25maWdSZW5kZXJlcigpO1xuICAgIHRoaXMuY29uZmlnQ29udHJvbHMoKTtcblxuICAgIHRoaXMuY3JlYXRlTGlnaHQoKTtcbiAgICB0aGlzLmNyZWF0ZU1lc2goKTtcblxuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgY29uZmlnU2NlbmUoKSB7XG4gICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKCAweGRkZGRkZCApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIC8vIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50V2lkdGg6ICcsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbi8vICAgIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50SGVpZ2h0OiAnLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgdXBkYXRlQ2FtZXJhKCk6IHZvaWQge1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBjb25maWdDYW1lcmEoKSB7XG4gICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5zZXQoIC0xNSwgMTAsIDE1ICk7XG4gICAgdGhpcy5jYW1lcmEubG9va0F0KCB0aGlzLnNjZW5lLnBvc2l0aW9uICk7XG4gIH1cblxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGZvcmNlKTogdm9pZCB7XG4gICAgLy8gU2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTg4NDQ4NS90aHJlZWpzLWNhbnZhcy1zaXplLWJhc2VkLW9uLWNvbnRhaW5lclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChmb3JjZSB8fCB0aGlzLmNhbnZhcy53aWR0aCAhPT0gd2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgIC8vIHlvdSBtdXN0IHBhc3MgZmFsc2UgaGVyZSBvciB0aHJlZS5qcyBzYWRseSBmaWdodHMgdGhlIGJyb3dzZXJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0LCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG4gIH1cblxuICBjb25maWdSZW5kZXJlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIGFscGhhOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKDEpO1xuICAgICAvLyBVc2luZyBzZXRQaXhlbFJhdGlvKGRldmljZVBpeGVsUmF0aW8pIGZvciBIRC1EUEkgY2FuIGNhdXNlIGV4Y2Vzc2l2ZSByZW5kZXJpbmcuXG4gICAgIC8vIFNlZTogaHR0cHM6Ly93ZWJnbGZ1bmRhbWVudGFscy5vcmcvd2ViZ2wvbGVzc29ucy93ZWJnbC1yZXNpemluZy10aGUtY2FudmFzLmh0bWxcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwLCAwICk7XG4vKiAgICBjb25zdCB3aWRnZXRQYWRkaW5nID0gNDtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLndpZHRoJywgdGhpcy5jYW52YXMud2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50V2lkdGgnLCB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5vZmZzZXRXaWR0aCcsIHRoaXMuY2FudmFzLm9mZnNldFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLnNjcm9sbFdpZHRoJywgdGhpcy5jYW52YXMuc2Nyb2xsV2lkdGgpO1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgY29uc29sZS5sb2coJ2VsZW0gY29tcHV0ZWQnLCBzdHlsZS53aWR0aCk7XG4gICAgLy8gY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdCk7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnNvbGUubG9nKCdlbGVtIHJlY3QnLCByZWN0LndpZHRoKTtcblxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLSAod2lkZ2V0UGFkZGluZyAqIDIpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDsgLy8gcmVzaXphYmxlIGxheW91dCBcImNvbFwiIGZsZXggYWRqdXN0cyBoZWlnaHQgdG8gZml0XG4gICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuKi9cbiAgICB0aGlzLnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUodHJ1ZSk7XG4gICAgLy8gdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICB9XG5cbiAgY29uZmlnQ29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLmNhbnZhcyk7XG4gICAgdGhpcy5jb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVab29tID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVBhbiAgPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gIH1cblxuICBjcmVhdGVMaWdodCgpIHtcbiAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoIDB4ZmZmZmZmICk7XG4gICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoIC0xMCwgMTAsIDEwICk7XG4gICAgdGhpcy5zY2VuZS5hZGQoIHRoaXMubGlnaHQgKTtcbiAgfVxuXG4gIGNyZWF0ZU1lc2goKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNSwgNSwgNSk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KTtcbiAgICB0aGlzLm1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlKCkpO1xuICAgIC8vIHRoaXMubWVzaC5yb3RhdGlvbi54ICs9IDAuMDE7XG4gICAgLy8gdGhpcy5tZXNoLnJvdGF0aW9uLnkgKz0gMC4wMTtcbiAgICAvLyBpZiAodGhpcy5jb3VudCA8IDYpIHtcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlY3QnLCByZWN0LndpZHRoKTtcbiAgICAvLyB0aGlzLmNvdW50Kys7XG4gICAgLy8gfVxuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbHMvb3JiaXQtY29udHJvbHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT2JqTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvb2JqLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmFkMkRlZ1BpcGUgfSBmcm9tICcuL3BpcGVzL3JhZDJkZWcucGlwZSc7XG5pbXBvcnQgeyBEZWcyUmFkUGlwZSB9IGZyb20gJy4vcGlwZXMvZGVnMnJhZC5waXBlJztcbmltcG9ydCB7IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIH0gZnJvbSAnLi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBeGVzSGVscGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdyaWRIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvb2JqZWN0LWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9pbnRMaWdodERpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9saWdodC9wb2ludC1saWdodC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGhyZWVUZXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aHJlZS10ZXN0L3RocmVlLXRlc3QuY29tcG9uZW50JztcblxuLy8gVE9ETzogSWRlYWxseSBtb3ZlIGFsbCB0byB0aHJlZS13cmFwcGVyIGxpYnJhcnkuIEJ1dCBjYW4ndCBtb3ZlIGpzL0VuYWJsZVRocmVlRXhhbXBsZXMuanMgdG8gbGlicmFyeSA6KFxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBPcmJpdENvbnRyb2xzRGlyZWN0aXZlLFxuICAgIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUsXG4gICAgT2JqTG9hZGVyRGlyZWN0aXZlLFxuICAgIFJhZDJEZWdQaXBlLFxuICAgIERlZzJSYWRQaXBlLFxuICAgIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLFxuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnQsXG4gICAgU2NlbmVEaXJlY3RpdmUsXG4gICAgQXhlc0hlbHBlckRpcmVjdGl2ZSxcbiAgICBHcmlkSGVscGVyRGlyZWN0aXZlLFxuICAgIE9iamVjdExvYWRlckRpcmVjdGl2ZSxcbiAgICBQb2ludExpZ2h0RGlyZWN0aXZlLFxuICAgIFRocmVlVGVzdENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiVEhSRUUuU2NlbmUiLCJUSFJFRS5XZWJHTFJlbmRlcmVyIiwiVEhSRUUuUENGU29mdFNoYWRvd01hcCIsIlRIUkVFLk9iamVjdDNEIiwiVEhSRUUuQ29sbGFkYUxvYWRlciIsIlRIUkVFLk9CSkxvYWRlciIsIlRIUkVFLk1UTExvYWRlciIsIlRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhIiwiVEhSRUUuQXhlc0hlbHBlciIsIlRIUkVFLkdyaWRIZWxwZXIiLCJUSFJFRS5PYmplY3RMb2FkZXIiLCJUSFJFRS5Qb2ludExpZ2h0IiwiVEhSRUUuQ29sb3IiLCJUSFJFRS5Cb3hHZW9tZXRyeSIsIlRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwiLCJUSFJFRS5NZXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0lBT0UsaUJBQWlCOzs7WUFMbEIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7QUNKRDs7OztBQUdBOzs7O0lBeUJZLFFBQVE7S0FDakI7Ozs7O0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjs7WUFFRyxZQUFZLEdBQUcsS0FBSztRQUV4QixJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsSUFBSSxPQUFPLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDckI7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7OztJQUVNLGVBQWU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O2dCQUc5RSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQzlCLENBQUMsQ0FBQztTQUNKLEFBRUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDbEI7Ozs7SUFFTyxhQUFhOztjQUNiLE1BQU0sR0FBRztZQUNiLElBQUksQ0FBQyxPQUFPO1lBQ1osSUFBSSxDQUFDLE9BQU87WUFDWixJQUFJLENBQUMsT0FBTztTQUNiLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDdEIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ2pCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUNqQixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDakIsS0FBSyxDQUNOLENBQUM7S0FDSDs7OztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3RCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUNwQixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQ3JCLENBQUM7S0FDSDs7Ozs7SUFFUyxRQUFRLENBQUMsTUFBc0I7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDekI7Ozs7O0lBRVMsV0FBVyxDQUFDLE1BQXNCO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCOzs7O0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNwQjs7O3lCQXBHQSxlQUFlLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO3NCQUt4RCxLQUFLO3NCQUtMLEtBQUs7c0JBS0wsS0FBSzt5QkFFTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs7Ozs7OztBQ3hCUixvQkFRNEIsU0FBUSxnQkFBNkI7SUFFL0Q7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUMsS0FBSyxFQUFFLENBQUM7S0FDVDs7OztJQUVTLFNBQVM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRVMsbUJBQW1CO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUlBLEtBQVcsRUFBRSxDQUFDO0tBQzFCOzs7WUFsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sY0FBYyxDQUFDLEVBQUUsQ0FBQzthQUMxRjs7Ozs7Ozs7Ozs7O0FDSkQ7SUFJRTtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUMzQzs7OztJQUVNLGVBQWU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNsQjtDQU1GOzs7Ozs7QUNwQkQ7O0lBdUJFO1FBUlEsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFTOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCxlQUFlO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7SUFFRCxJQUFZLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztLQUNyQzs7OztJQUVPLGNBQWM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSUMsYUFBbUIsQ0FBQztZQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBR0MsZ0JBQXNCLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7OztJQUVNLE1BQU07OztRQUdYLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTs7a0JBQ2xCLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7O2tCQUMzQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7Ozs7WUFJbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxRTs7S0FFRjs7OztJQUVPLG9CQUFvQjs7Y0FDcEIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTtRQUN2QyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDM0Q7Ozs7O0lBR00sUUFBUSxDQUFDLEtBQVk7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEcsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFFckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7OztJQUVNLDZCQUE2Qjs7Y0FDNUIsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUMzRTs7O1lBMUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyx1Q0FBOEM7O2FBRS9DOzs7O3dCQU1FLFNBQVMsU0FBQyxRQUFROzhCQUdsQixlQUFlLFNBQUMsY0FBYzsrQkFDOUIsZUFBZSxTQUFDLGNBQWM7dUJBNkU5QixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0FDbEczQztJQXNDRTs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFSUyw0QkFBdUIsR0FBMkIsU0FBUyxDQUFDO1FBRTVELGdCQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxHQUFHLENBQUM7UUFNdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjs7OztRQUloQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUMxQztRQUNELElBQUksT0FBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUU7OztZQUd0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN6Qjs7OztJQUVPLGtCQUFrQjs7UUFFeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUNoQyxJQUFJLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FDM0UsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELGVBQWU7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDaEYsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDM0I7OztZQW5GRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjthQUNqQzs7OzsyQkFHRSxlQUFlLFNBQUMsY0FBYyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTs2QkFDckQsZUFBZSxTQUFDLHNCQUFzQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtzQ0FpQjdELEtBQUs7MEJBRUwsS0FBSzt3QkFDTCxLQUFLOzs7Ozs7O0FDakNSOzs7Ozs7OztBQVlBLHlCQUEwQyxTQUFRLGdCQUFnQzs7Ozs7Ozs7SUFBbEY7Ozs7Ozs7Ozs7UUFhVSxzQkFBaUIsR0FBRyxLQUFLLENBQUM7S0EwRm5DOzs7Ozs7Ozs7SUFuRUMsSUFDVyxLQUFLLENBQUMsV0FBbUI7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7OztRQUkxQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNsQyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNqRDtZQUVELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEI7U0FDRixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCLENBQUMsQ0FBQztLQUNKOzs7OztJQUtELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNwQjs7Ozs7SUFFRCxJQUNXLFFBQVEsQ0FBQyxXQUFtQztRQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7OztJQUVTLFNBQVM7UUFDakIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzs7UUFHOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3pCOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDakQ7S0FDRjs7OztJQUVTLFFBQVE7UUFDaEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTyxJQUFJQyxRQUFjLEVBQUUsQ0FBQztLQUM3Qjs7O29CQWxFQSxLQUFLO3VCQWlDTCxLQUFLOzs7Ozs7OzRCQ3hFNEIsU0FBUSxtQkFBbUI7SUFKL0Q7O1FBS1UsV0FBTSxHQUFHLElBQUlDLGFBQW1CLEVBQUUsQ0FBQztLQVk1Qzs7OztJQVZpQixlQUFlOztZQUM3QixPQUFPLElBQUksT0FBTyxDQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUs7b0JBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCLEVBQ0QsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDO2FBQ0gsQ0FBQyxDQUFDO1NBQ0o7S0FBQTs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sc0JBQXNCLENBQUMsRUFBRSxDQUFDO2FBQ2xHOzs7Ozs7Ozs7Ozs7QUNNRCx3QkFBZ0MsU0FBUSxtQkFBbUI7Ozs7OztJQUozRDs7UUFLVSxXQUFNLEdBQUcsSUFBSUMsU0FBZSxFQUFFLENBQUM7UUFDL0IsY0FBUyxHQUFHLElBQUlDLFNBQWUsRUFBRSxDQUFDO0tBcUMzQzs7OztJQTdCaUIsZUFBZTs7O1lBRTdCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQy9CLE9BQU8sSUFBSSxPQUFPLENBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU07b0JBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSzt3QkFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNoQixFQUNDLFNBQVMsRUFDVCxNQUFNLENBQ1AsQ0FBQztpQkFDSCxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLElBQUksT0FBTyxDQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNO29CQUNqRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO3dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ2pEO29CQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUTt3QkFDekMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLOzRCQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2hCLEVBQ0MsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDO3FCQUNILENBQUMsQ0FBQztpQkFDSixDQUFDLENBQUM7YUFDSjtTQUNGO0tBQUE7OztZQTFDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsQ0FBQzthQUM5Rjs7O3VCQUtFLEtBQUs7MEJBR0wsS0FBSzs7Ozs7OztBQ3JCUjs7Ozs7O0lBV0UsU0FBUyxDQUFDLE9BQWU7UUFDdkIsT0FBTyxPQUFPLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNsQzs7O1lBWEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxTQUFTO2FBQ2hCOzs7Ozs7O0FDSkQ7Ozs7OztJQVdFLFNBQVMsQ0FBQyxPQUFlO1FBQ3ZCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbEM7OztZQVhGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsU0FBUzthQUNoQjs7Ozs7OztBQ0pELGdDQVF3QyxTQUFRLGNBQXVDO0lBYXJGO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3RELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Ozs7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQzs7UUFFcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJQyxpQkFBdUIsQ0FDdkMsSUFBSSxDQUFDLEdBQUcsRUFDUixTQUFTLEVBQ1QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7O1FBR0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQ3RDOzs7OztJQUVNLGlCQUFpQixDQUFDLE1BQWM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQ3RDOzs7WUEzQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sMEJBQTBCLENBQUMsRUFBRSxDQUFDO2FBQ3BHOzs7O2tCQUtFLEtBQUs7bUJBQ0wsS0FBSztrQkFDTCxLQUFLO3dCQUVMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzs7Ozs7O0FDbEJSLHlCQVFpQyxTQUFRLGdCQUFrQztJQUl6RTtRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRVMsbUJBQW1CO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUlDLFVBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRVMsU0FBUztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7O0tBRTlDOzs7WUFyQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7YUFDL0Y7Ozs7bUJBR0UsS0FBSzs7Ozs7OztBQ1ZSLHlCQVFpQyxTQUFRLGdCQUFrQztJQUt6RTtRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRVMsbUJBQW1CO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUlDLFVBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEQ7Ozs7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7S0FFOUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLG1CQUFtQixDQUFDLEVBQUUsQ0FBQzthQUMvRjs7OzttQkFHRSxLQUFLO3dCQUNMLEtBQUs7Ozs7Ozs7MkJDRjJCLFNBQVEsbUJBQW1CO0lBSjlEOztRQUtVLFdBQU0sR0FBRyxJQUFJQyxZQUFrQixFQUFFLENBQUM7S0FZM0M7Ozs7SUFWaUIsZUFBZTs7WUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTTtnQkFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLO29CQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hCLEVBQ0QsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDO2FBQ0gsQ0FBQyxDQUFDO1NBQ0o7S0FBQTs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0scUJBQXFCLENBQUMsRUFBRSxDQUFDO2FBQ2pHOzs7Ozs7O0FDUkQseUJBUWlDLFNBQVEsZ0JBQWtDO0lBTXpFO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDaEQ7Ozs7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSUMsVUFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3hFOzs7O0lBRVMsU0FBUztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7O0tBRTlDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7YUFDL0Y7Ozs7b0JBR0UsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7Ozs7Ozs7QUNaUjtBQVVBOzs7O0lBb0JFLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFqQnBDLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBSyxHQUFHLENBQUMsQ0FBQztRQVlSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSVgsT0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJTyxtQkFBdUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMzRDs7Ozs7SUFYRCxRQUFRLENBQUMsS0FBSztRQUNiLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQzs7OztJQUVELElBQVksTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0tBQ3JDOzs7O0lBT0QsZUFBZTtRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJSyxLQUFXLENBQUUsUUFBUSxDQUFFLENBQUM7S0FDckQ7Ozs7SUFFTyxvQkFBb0I7Ozs7Y0FHcEIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTtRQUN2QyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDM0Q7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQ3RDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUM7S0FDM0M7Ozs7O0lBRUQseUJBQXlCLENBQUMsS0FBSzs7O2NBRXZCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7O2NBQy9CLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVk7UUFDdkMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTs7WUFFekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUN0QztLQUNGOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSVgsZUFBbUIsQ0FBQztZQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7UUFHL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUUsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztRQWlCM0MsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDOztLQUV0Qzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJVSxZQUFnQixDQUFFLFFBQVEsQ0FBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO0tBQzlCOzs7O0lBRUQsVUFBVTs7Y0FDRixRQUFRLEdBQUcsSUFBSUUsV0FBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Y0FDekMsUUFBUSxHQUFHLElBQUlDLG1CQUF5QixDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSUMsSUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7Ozs7SUFFRCxPQUFPO1FBQ0wsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Ozs7Ozs7O1FBUW5ELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7WUE5SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixnSEFBMEM7O2FBRTNDOzs7WUFUb0QsVUFBVTs7O3dCQVc1RCxTQUFTLFNBQUMsUUFBUTt1QkFVbEIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztBQ3JCM0M7QUFzREE7OztZQXJDQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxXQUFXO29CQUNYLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxXQUFXO29CQUNYLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUU7b0JBQ2Ysc0JBQXNCO2lCQUN2QjthQUNGOzs7Ozs7Ozs7Ozs7Ozs7In0=