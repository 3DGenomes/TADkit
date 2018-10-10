import { Injectable, ContentChildren, Input, Component, ViewChild, ElementRef, HostListener, NgModule, Directive, Pipe, defineInjectable, forwardRef } from '@angular/core';
import { __extends, __awaiter, __generator } from 'tslib';
import { Object3D, PerspectiveCamera, ColladaLoader, Scene, OBJLoader, MTLLoader, ObjectLoader, WebGLRenderer, PCFSoftShadowMap, AxesHelper, GridHelper, PointLight } from 'three-full';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { Scene as Scene$1, PerspectiveCamera as PerspectiveCamera$1, Color, WebGLRenderer as WebGLRenderer$1, PointLight as PointLight$1, BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ThreeLibService = /** @class */ (function () {
    function ThreeLibService() {
    }
    ThreeLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    ThreeLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ ThreeLibService.ngInjectableDef = defineInjectable({ factory: function ThreeLibService_Factory() { return new ThreeLibService(); }, token: ThreeLibService, providedIn: "root" });
    return ThreeLibService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var AbstractObject3D = /** @class */ (function () {
    function AbstractObject3D() {
    }
    /**
     * @return {?}
     */
    AbstractObject3D.prototype.rerender = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractObject3D.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.object) {
            return;
        }
        /** @type {?} */
        var mustRerender = false;
        if (['rotateX', 'rotateY', 'rotateZ'].some(function (propName) { return propName in changes; })) {
            this.applyRotation();
            mustRerender = true;
        }
        if (['translateX', 'translateY', 'translateZ'].some(function (propName) { return propName in changes; })) {
            this.applyTranslation();
            mustRerender = true;
        }
        if (mustRerender) {
            this.rerender();
        }
    };
    /**
     * @return {?}
     */
    AbstractObject3D.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        console.log('AbstractObject3D.ngAfterViewInit');
        this.object = this.newObject3DInstance();
        this.applyTranslation();
        this.applyRotation();
        if (this.childNodes !== undefined && this.childNodes.length > 1) {
            this.childNodes.filter(function (i) { return i !== _this && i.getObject() !== undefined; }).forEach(function (i) {
                // console.log("Add child for " + this.constructor.name);
                // console.log(i);
                _this.addChild(i.getObject());
            });
        }
        this.afterInit();
    };
    /**
     * @return {?}
     */
    AbstractObject3D.prototype.applyRotation = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var angles = [
            this.rotateX,
            this.rotateY,
            this.rotateZ
        ].map(function (angle) { return angle || 0; });
        this.object.rotation.set(this.rotateX || 0, this.rotateY || 0, this.rotateZ || 0, 'XYZ');
    };
    /**
     * @return {?}
     */
    AbstractObject3D.prototype.applyTranslation = /**
     * @return {?}
     */
    function () {
        this.object.position.set(this.translateX || 0, this.translateY || 0, this.translateZ || 0);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractObject3D.prototype.addChild = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.object.add(object);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractObject3D.prototype.removeChild = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.object.remove(object);
    };
    /**
     * @return {?}
     */
    AbstractObject3D.prototype.getObject = /**
     * @return {?}
     */
    function () {
        return this.object;
    };
    AbstractObject3D.propDecorators = {
        childNodes: [{ type: ContentChildren, args: [AbstractObject3D, { descendants: false },] }],
        rotateX: [{ type: Input }],
        rotateY: [{ type: Input }],
        rotateZ: [{ type: Input }],
        translateX: [{ type: Input }],
        translateY: [{ type: Input }],
        translateZ: [{ type: Input }]
    };
    return AbstractObject3D;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SceneDirective = /** @class */ (function (_super) {
    __extends(SceneDirective, _super);
    function SceneDirective() {
        var _this = this;
        console.log('SceneDirective.constructor');
        _this = _super.call(this) || this;
        return _this;
    }
    /**
     * @return {?}
     */
    SceneDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('SceneDirective.afterInit');
    };
    /**
     * @return {?}
     */
    SceneDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('SceneDirective.newObject3DInstance');
        return new Scene();
    };
    SceneDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-scene',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return SceneDirective; }) }]
                },] }
    ];
    SceneDirective.ctorParameters = function () { return []; };
    return SceneDirective;
}(AbstractObject3D));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
AbstractCamera = /** @class */ (function () {
    function AbstractCamera() {
        console.log('AbstractCamera.constructor');
    }
    /**
     * @return {?}
     */
    AbstractCamera.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        console.log('AbstractCamera.ngAfterViewInit');
        this.afterInit();
    };
    return AbstractCamera;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WebGLRendererComponent = /** @class */ (function () {
    function WebGLRendererComponent() {
        this.viewInitialized = false;
        console.log('RendererComponent.constructor');
        this.render = this.render.bind(this);
    }
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        console.log('RendererComponent.ngAfterViewInit');
        this.viewInitialized = true;
        this.startRendering();
    };
    Object.defineProperty(WebGLRendererComponent.prototype, "renderPane", {
        /**
         * The render pane on which the scene is rendered.
         * Currently, only the WebGL renderer with a canvas is used in this
         * implementation, so this property will always be an ElementRef to the
         * underlying <canvas> element.
         *
         * @example This property can be used to restrict the orbit controls (i.e. the
         * area which is listened for mouse move and zoom events) to the rendering pane:
         * ```
         * <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
         *   <three-renderer #mainRenderer>
         *     ...
         *   </three-renderer>
         * </three-orbit-controls>
         * ```
         */
        get: /**
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
        function () {
            return this.canvasRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRendererComponent.prototype, "canvas", {
        get: /**
         * @return {?}
         */
        function () {
            return this.canvasRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.startRendering = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        // if (this.sceneComponents != undefined && this.sceneComponents.length == 1 &&
        //     this.cameraComponents != undefined && this.cameraComponents.length == 1) {
        if (this.viewInitialized) {
            /** @type {?} */
            var sceneComponent = this.sceneComponents.first;
            /** @type {?} */
            var cameraComponent = this.cameraComponents.first;
            // console.log("render");
            // console.log(scene.getObject());
            // console.log(camera.camera);
            this.renderer.render(sceneComponent.getObject(), cameraComponent.camera);
        }
        // }
    };
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.calculateAspectRatio = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WebGLRendererComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        console.log('RendererComponent.onResize: ' + this.canvas.clientWidth + ', ' + this.canvas.clientHeight);
        this.updateChildCamerasAspectRatio();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.render();
    };
    /**
     * @return {?}
     */
    WebGLRendererComponent.prototype.updateChildCamerasAspectRatio = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var aspect = this.calculateAspectRatio();
        this.cameraComponents.forEach(function (camera) { return camera.updateAspectRatio(aspect); });
    };
    WebGLRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'three-webgl-renderer',
                    template: "<canvas #canvas>\n</canvas>",
                    styles: ["canvas{width:100%;height:100%}"]
                }] }
    ];
    WebGLRendererComponent.ctorParameters = function () { return []; };
    WebGLRendererComponent.propDecorators = {
        canvasRef: [{ type: ViewChild, args: ['canvas',] }],
        sceneComponents: [{ type: ContentChildren, args: [SceneDirective,] }],
        cameraComponents: [{ type: ContentChildren, args: [AbstractCamera,] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return WebGLRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var OrbitControlsDirective = /** @class */ (function () {
    function OrbitControlsDirective() {
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
    OrbitControlsDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    OrbitControlsDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.controls.dispose();
    };
    /**
     * @return {?}
     */
    OrbitControlsDirective.prototype.setUpOrbitControls = /**
     * @return {?}
     */
    function () {
        // this.controls = new THREE.OrbitControls(
        this.controls = new OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
        this.controls.rotateSpeed = this.rotateSpeed;
        this.controls.zoomSpeed = this.zoomSpeed;
        this.controls.addEventListener('change', this.childRenderers.first.render);
        this.childRenderers.first.render();
    };
    /**
     * @return {?}
     */
    OrbitControlsDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        console.log('OrbitControlsDirective.ngAfterViewInit');
        if (this.childCameras === undefined || this.childCameras.first === undefined) {
            throw new Error('Camera is not found');
        }
        if (this.childRenderers === undefined || this.childRenderers.first === undefined) {
            throw new Error('Renderer is not found');
        }
        this.setUpOrbitControls();
    };
    OrbitControlsDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-orbit-controls'
                },] }
    ];
    OrbitControlsDirective.ctorParameters = function () { return []; };
    OrbitControlsDirective.propDecorators = {
        childCameras: [{ type: ContentChildren, args: [AbstractCamera, { descendants: true },] }],
        childRenderers: [{ type: ContentChildren, args: [WebGLRendererComponent, { descendants: true },] }],
        listeningControlElement: [{ type: Input }],
        rotateSpeed: [{ type: Input }],
        zoomSpeed: [{ type: Input }]
    };
    return OrbitControlsDirective;
}());

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
var AbstractModelLoader = /** @class */ (function (_super) {
    __extends(AbstractModelLoader, _super);
    /**
     * Helper parent class for model loader directives.
     *
     * @see ObjectLoaderDirective
     * @see ObjLoaderDirective
     * @see ColladaLoaderDirective
     */
    function AbstractModelLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Flag to signal whether the parent class instance AbstractObject3D called the
         * overwritten method {@link ModelLoaderDirective#afterInit} yet.
         *
         * Unless that method was called, no methods and properties of {@link AbstractObject3D}
         * may be safely accessed, especially {@link AbstractObject3D#addChild} and
         * {@link AbstractObject3D.renderer}.
         */
        _this.parentInitialized = false;
        return _this;
    }
    Object.defineProperty(AbstractModelLoader.prototype, "model", {
        /**
         * The current model data source (usually a URI).
         */
        get: /**
         * The current model data source (usually a URI).
         * @return {?}
         */
        function () {
            return this._model;
        },
        /**
         * The model data source (usually a URI).
         * Settings this property only hides the previous model upon successful
         * loading of the new one. This especially means that if the new data source
         * is invalid, the old model will *not* be removed from the scene.
         */
        set: /**
         * The model data source (usually a URI).
         * Settings this property only hides the previous model upon successful
         * loading of the new one. This especially means that if the new data source
         * is invalid, the old model will *not* be removed from the scene.
         * @param {?} newModelUrl
         * @return {?}
         */
        function (newModelUrl) {
            var _this = this;
            this._model = newModelUrl;
            // Delay model loading until the parent has been initialized,
            // so that we can call addChild().
            if (!this.parentInitialized) {
                return;
            }
            this.loadModelObject().then(function (newModel) {
                if (_this.currentLoadedModelObject) {
                    _this.removeChild(_this.currentLoadedModelObject);
                }
                _this.currentLoadedModelObject = newModel;
                _this.addChild(newModel);
                if (_this.renderer) {
                    _this.renderer.render();
                }
            }).catch(function (err) {
                console.error(err);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractModelLoader.prototype, "renderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderer;
        },
        set: /**
         * @param {?} newRenderer
         * @return {?}
         */
        function (newRenderer) {
            this._renderer = newRenderer;
            this._renderer.render();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        this.parentInitialized = true;
        // Trigger model acquisition now that the parent has been initialized.
        this.model = this.model;
    };
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.currentLoadedModelObject) {
            this.removeChild(this.currentLoadedModelObject);
        }
    };
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.rerender = /**
     * @return {?}
     */
    function () {
        _super.prototype.rerender.call(this);
        if (this.renderer) {
            this.renderer.render();
        }
    };
    /**
     * @return {?}
     */
    AbstractModelLoader.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        return new Object3D();
    };
    AbstractModelLoader.propDecorators = {
        model: [{ type: Input }],
        renderer: [{ type: Input }]
    };
    return AbstractModelLoader;
}(AbstractObject3D));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ColladaLoaderDirective = /** @class */ (function (_super) {
    __extends(ColladaLoaderDirective, _super);
    function ColladaLoaderDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loader = new ColladaLoader();
        return _this;
    }
    /**
     * @return {?}
     */
    ColladaLoaderDirective.prototype.loadModelObject = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.loader.load(_this.model, function (model) {
                            resolve(model.scene);
                        }, undefined, reject);
                    })];
            });
        });
    };
    ColladaLoaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-collada-loader',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return ColladaLoaderDirective; }) }]
                },] }
    ];
    return ColladaLoaderDirective;
}(AbstractModelLoader));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive for employing THREE.OBJLoader to load [Wavefront *.obj files][1].
 *
 * [1]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
 */
var ObjLoaderDirective = /** @class */ (function (_super) {
    __extends(ObjLoaderDirective, _super);
    /**
     * Directive for employing THREE.OBJLoader to load [Wavefront *.obj files][1].
     *
     * [1]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
     */
    function ObjLoaderDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loader = new OBJLoader();
        _this.mtlLoader = new MTLLoader();
        return _this;
    }
    /**
     * @return {?}
     */
    ObjLoaderDirective.prototype.loadModelObject = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // TODO: make it nicer
                if (this.material === undefined) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.loader.load(_this.model, function (model) {
                                resolve(model);
                            }, undefined, reject);
                        })];
                }
                else {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (_this.texturePath !== undefined) {
                                _this.mtlLoader.setTexturePath(_this.texturePath);
                            }
                            _this.mtlLoader.load(_this.material, function (material) {
                                material.preload();
                                _this.loader.setMaterials(material);
                                _this.loader.load(_this.model, function (model) {
                                    resolve(model);
                                }, undefined, reject);
                            });
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    ObjLoaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-obj-loader',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return ObjLoaderDirective; }) }]
                },] }
    ];
    ObjLoaderDirective.propDecorators = {
        material: [{ type: Input }],
        texturePath: [{ type: Input }]
    };
    return ObjLoaderDirective;
}(AbstractModelLoader));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Rad2DegPipe = /** @class */ (function () {
    function Rad2DegPipe() {
    }
    /**
     * Converts radians to degrees
     * @param radians Radians
     */
    /**
     * Converts radians to degrees
     * @param {?} radians Radians
     * @return {?}
     */
    Rad2DegPipe.prototype.transform = /**
     * Converts radians to degrees
     * @param {?} radians Radians
     * @return {?}
     */
    function (radians) {
        return radians * (180 / Math.PI);
    };
    Rad2DegPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'rad2deg'
                },] }
    ];
    return Rad2DegPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Deg2RadPipe = /** @class */ (function () {
    function Deg2RadPipe() {
    }
    /**
     * Converts degrees to radians
     * @param degree Degrees
     */
    /**
     * Converts degrees to radians
     * @param {?} degrees
     * @return {?}
     */
    Deg2RadPipe.prototype.transform = /**
     * Converts degrees to radians
     * @param {?} degrees
     * @return {?}
     */
    function (degrees) {
        return (degrees / 180) * Math.PI;
    };
    Deg2RadPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'deg2rad'
                },] }
    ];
    return Deg2RadPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PerspectiveCameraDirective = /** @class */ (function (_super) {
    __extends(PerspectiveCameraDirective, _super);
    function PerspectiveCameraDirective() {
        var _this = this;
        console.log('PerspectiveCameraDirective.constructor');
        _this = _super.call(this) || this;
        return _this;
    }
    /**
     * @return {?}
     */
    PerspectiveCameraDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('PerspectiveCameraDirective.afterInit');
        // let aspectRatio = undefined; // Updated later
        this.camera = new PerspectiveCamera(this.fov, undefined, this.near, this.far);
        // Set position and look at
        this.camera.position.x = this.positionX;
        this.camera.position.y = this.positionY;
        this.camera.position.z = this.positionZ;
        this.camera.updateProjectionMatrix();
    };
    /**
     * @param {?} aspect
     * @return {?}
     */
    PerspectiveCameraDirective.prototype.updateAspectRatio = /**
     * @param {?} aspect
     * @return {?}
     */
    function (aspect) {
        console.log('PerspectiveCameraDirective.updateAspectRatio: ' + aspect);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    };
    PerspectiveCameraDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-perspective-camera',
                    providers: [{ provide: AbstractCamera, useExisting: forwardRef(function () { return PerspectiveCameraDirective; }) }]
                },] }
    ];
    PerspectiveCameraDirective.ctorParameters = function () { return []; };
    PerspectiveCameraDirective.propDecorators = {
        fov: [{ type: Input }],
        near: [{ type: Input }],
        far: [{ type: Input }],
        positionX: [{ type: Input }],
        positionY: [{ type: Input }],
        positionZ: [{ type: Input }]
    };
    return PerspectiveCameraDirective;
}(AbstractCamera));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AxesHelperDirective = /** @class */ (function (_super) {
    __extends(AxesHelperDirective, _super);
    function AxesHelperDirective() {
        var _this = _super.call(this) || this;
        console.log('AxesHelperDirective.constructor');
        return _this;
    }
    /**
     * @return {?}
     */
    AxesHelperDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('AxesHelperDirective.newObject3DInstance');
        return new AxesHelper(this.size);
    };
    /**
     * @return {?}
     */
    AxesHelperDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('AxesHelperDirective.afterInit');
        // none
    };
    AxesHelperDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-axes-helper',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return AxesHelperDirective; }) }]
                },] }
    ];
    AxesHelperDirective.ctorParameters = function () { return []; };
    AxesHelperDirective.propDecorators = {
        size: [{ type: Input }]
    };
    return AxesHelperDirective;
}(AbstractObject3D));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GridHelperDirective = /** @class */ (function (_super) {
    __extends(GridHelperDirective, _super);
    function GridHelperDirective() {
        var _this = _super.call(this) || this;
        console.log('GridHelperDirective.constructor');
        return _this;
    }
    /**
     * @return {?}
     */
    GridHelperDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('GridHelperDirective.newObject3DInstance');
        return new GridHelper(this.size, this.divisions);
    };
    /**
     * @return {?}
     */
    GridHelperDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('GridHelperDirective.afterInit');
        // none
    };
    GridHelperDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-grid-helper',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return GridHelperDirective; }) }]
                },] }
    ];
    GridHelperDirective.ctorParameters = function () { return []; };
    GridHelperDirective.propDecorators = {
        size: [{ type: Input }],
        divisions: [{ type: Input }]
    };
    return GridHelperDirective;
}(AbstractObject3D));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ObjectLoaderDirective = /** @class */ (function (_super) {
    __extends(ObjectLoaderDirective, _super);
    function ObjectLoaderDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loader = new ObjectLoader();
        return _this;
    }
    /**
     * @return {?}
     */
    ObjectLoaderDirective.prototype.loadModelObject = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.loader.load(_this.model, function (model) {
                            resolve(model);
                        }, undefined, reject);
                    })];
            });
        });
    };
    ObjectLoaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-object-loader',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return ObjectLoaderDirective; }) }]
                },] }
    ];
    return ObjectLoaderDirective;
}(AbstractModelLoader));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PointLightDirective = /** @class */ (function (_super) {
    __extends(PointLightDirective, _super);
    function PointLightDirective() {
        var _this = _super.call(this) || this;
        console.log('PointLightDirective.constructor');
        return _this;
    }
    /**
     * @return {?}
     */
    PointLightDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('PointLightDirective.newObject3DInstance');
        return new PointLight(this.color, this.intensity, this.distance);
    };
    /**
     * @return {?}
     */
    PointLightDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('PointLightDirective.afterInit');
        // none
    };
    PointLightDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-point-light',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return PointLightDirective; }) }]
                },] }
    ];
    PointLightDirective.ctorParameters = function () { return []; };
    PointLightDirective.propDecorators = {
        color: [{ type: Input }],
        intensity: [{ type: Input }],
        distance: [{ type: Input }]
    };
    return PointLightDirective;
}(AbstractObject3D));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// import { CameraControls } from 'camera-controls';
var ThreeTestComponent = /** @class */ (function () {
    function ThreeTestComponent(elem) {
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
    ThreeTestComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.resizeCanvasToDisplaySize(true);
    };
    Object.defineProperty(ThreeTestComponent.prototype, "canvas", {
        get: /**
         * @return {?}
         */
        function () {
            return this.canvasRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.configScene();
        this.configCamera();
        this.configRenderer();
        this.configControls();
        this.createLight();
        this.createMesh();
        this.animate();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configScene = /**
     * @return {?}
     */
    function () {
        this.scene.background = new Color(0xdddddd);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.calculateAspectRatio = /**
     * @return {?}
     */
    function () {
        // console.log('canvas.clientWidth: ', this.canvas.clientWidth);
        //    console.log('canvas.clientHeight: ', this.canvas.clientHeight);
        /** @type {?} */
        var height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.updateCamera = /**
     * @return {?}
     */
    function () {
        this.camera.aspect = this.calculateAspectRatio();
        this.camera.updateProjectionMatrix();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configCamera = /**
     * @return {?}
     */
    function () {
        this.updateCamera();
        this.camera.position.set(-15, 10, 15);
        this.camera.lookAt(this.scene.position);
    };
    /**
     * @param {?} force
     * @return {?}
     */
    ThreeTestComponent.prototype.resizeCanvasToDisplaySize = /**
     * @param {?} force
     * @return {?}
     */
    function (force) {
        // See: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
        /** @type {?} */
        var width = this.canvas.clientWidth;
        /** @type {?} */
        var height = this.canvas.clientHeight;
        if (force || this.canvas.width !== width || this.canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configRenderer = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configControls = /**
     * @return {?}
     */
    function () {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.update();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.createLight = /**
     * @return {?}
     */
    function () {
        this.light = new PointLight$1(0xffffff);
        this.light.position.set(-10, 10, 10);
        this.scene.add(this.light);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.createMesh = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var geometry = new BoxGeometry(5, 5, 5);
        /** @type {?} */
        var material = new MeshLambertMaterial({ color: 0xff0000 });
        this.mesh = new Mesh(geometry, material);
        this.scene.add(this.mesh);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.animate = /**
     * @return {?}
     */
    function () {
        var _this = this;
        window.requestAnimationFrame(function () { return _this.animate(); });
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
    };
    ThreeTestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'three-test',
                    template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                    styles: ["canvas{width:100%;height:100%}"]
                }] }
    ];
    ThreeTestComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ThreeTestComponent.propDecorators = {
        canvasRef: [{ type: ViewChild, args: ['canvas',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ThreeTestComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
var ThreeLibModule = /** @class */ (function () {
    // TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
    function ThreeLibModule() {
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
    return ThreeLibModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ThreeLibService, WebGLRendererComponent, OrbitControlsDirective, ColladaLoaderDirective, ObjLoaderDirective, Rad2DegPipe, Deg2RadPipe, PerspectiveCameraDirective, SceneDirective, AxesHelperDirective, GridHelperDirective, ObjectLoaderDirective, PointLightDirective, ThreeLibModule, AbstractCamera as ɵb, AbstractObject3D as ɵa, AbstractModelLoader as ɵc, ThreeTestComponent as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL2Fic3RyYWN0LW1vZGVsLWxvYWRlci50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9yYWQyZGVnLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcGlwZXMvZGVnMnJhZC5waXBlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIE9uQ2hhbmdlcywgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0T2JqZWN0M0Q8VCBleHRlbmRzIFRIUkVFLk9iamVjdDNEPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdE9iamVjdDNELCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KSBjaGlsZE5vZGVzOiBRdWVyeUxpc3Q8QWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4+O1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVg6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVZOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVg6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWTogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVaOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvYmplY3Q6IFQ7XG5cbiAgcHJvdGVjdGVkIHJlcmVuZGVyKCkge1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMub2JqZWN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG11c3RSZXJlbmRlciA9IGZhbHNlO1xuXG4gICAgaWYgKFsncm90YXRlWCcsICdyb3RhdGVZJywgJ3JvdGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5Um90YXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbJ3RyYW5zbGF0ZVgnLCAndHJhbnNsYXRlWScsICd0cmFuc2xhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtdXN0UmVyZW5kZXIpIHtcbiAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdE9iamVjdDNELm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMub2JqZWN0ID0gdGhpcy5uZXdPYmplY3QzREluc3RhbmNlKCk7XG5cbiAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICB0aGlzLmFwcGx5Um90YXRpb24oKTtcblxuICAgIGlmICh0aGlzLmNoaWxkTm9kZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLmZpbHRlcihpID0+IGkgIT09IHRoaXMgJiYgaS5nZXRPYmplY3QoKSAhPT0gdW5kZWZpbmVkKS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFkZCBjaGlsZCBmb3IgXCIgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChpLmdldE9iamVjdCgpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIk5vIGNoaWxkIE9iamVjdDNEIGZvcjogXCIgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgIH1cblxuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Um90YXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgYW5nbGVzID0gW1xuICAgICAgdGhpcy5yb3RhdGVYLFxuICAgICAgdGhpcy5yb3RhdGVZLFxuICAgICAgdGhpcy5yb3RhdGVaXG4gICAgXS5tYXAoYW5nbGUgPT4gYW5nbGUgfHwgMCk7XG5cbiAgICB0aGlzLm9iamVjdC5yb3RhdGlvbi5zZXQoXG4gICAgICB0aGlzLnJvdGF0ZVggfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWSB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVaIHx8IDAsXG4gICAgICAnWFlaJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VHJhbnNsYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucG9zaXRpb24uc2V0KFxuICAgICAgdGhpcy50cmFuc2xhdGVYIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWiB8fCAwXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QuYWRkKG9iamVjdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnJlbW92ZShvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGdldE9iamVjdCgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5vYmplY3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1zY2VuZScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2NlbmVEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFNjZW5lRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5TY2VuZT4ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlNjZW5lIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBJbnB1dCwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q2FtZXJhPFQgZXh0ZW5kcyBUSFJFRS5DYW1lcmE+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY2FtZXJhOiBUO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdENhbWVyYS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBDb250ZW50Q2hpbGRyZW4sIEhvc3RMaXN0ZW5lcixcbiAgUXVlcnlMaXN0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtd2ViZ2wtcmVuZGVyZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdlYkdMUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBwcml2YXRlIHZpZXdJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpXG4gIHByaXZhdGUgY2FudmFzUmVmOiBFbGVtZW50UmVmOyAvLyBOT1RFOiBzYXkgYnllLWJ5ZSB0byBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgOylcblxuICBAQ29udGVudENoaWxkcmVuKFNjZW5lRGlyZWN0aXZlKSBzY2VuZUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTY2VuZURpcmVjdGl2ZT47IC8vIFRPRE86IE11bHRpcGxlIHNjZW5lc1xuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhKSBjYW1lcmFDb21wb25lbnRzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47IC8vIFRPRE86IE11bHRpcGxlIGNhbWVyYXNcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuY29uc3RydWN0b3InKTtcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0UmVuZGVyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlbmRlciBwYW5lIG9uIHdoaWNoIHRoZSBzY2VuZSBpcyByZW5kZXJlZC5cbiAgICogQ3VycmVudGx5LCBvbmx5IHRoZSBXZWJHTCByZW5kZXJlciB3aXRoIGEgY2FudmFzIGlzIHVzZWQgaW4gdGhpc1xuICAgKiBpbXBsZW1lbnRhdGlvbiwgc28gdGhpcyBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSBhbiBFbGVtZW50UmVmIHRvIHRoZVxuICAgKiB1bmRlcmx5aW5nIDxjYW52YXM+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtyb3RhdGVTcGVlZF09MSBbem9vbVNwZWVkXT0xLjIgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJQYW5lKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0UmVuZGVyaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5zdGFydFJlbmRlcmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDEpO1xuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyBpZiAodGhpcy5zY2VuZUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2NlbmVDb21wb25lbnRzLmxlbmd0aCA9PSAxICYmXG4gICAgLy8gICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYW1lcmFDb21wb25lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCBzY2VuZUNvbXBvbmVudCA9IHRoaXMuc2NlbmVDb21wb25lbnRzLmZpcnN0O1xuICAgICAgY29uc3QgY2FtZXJhQ29tcG9uZW50ID0gdGhpcy5jYW1lcmFDb21wb25lbnRzLmZpcnN0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzY2VuZS5nZXRPYmplY3QoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjYW1lcmEuY2FtZXJhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lQ29tcG9uZW50LmdldE9iamVjdCgpLCBjYW1lcmFDb21wb25lbnQuY2FtZXJhKTtcbiAgICB9XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm9uUmVzaXplOiAnICsgdGhpcy5jYW52YXMuY2xpZW50V2lkdGggKyAnLCAnICsgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCkge1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZm9yRWFjaChjYW1lcmEgPT4gY2FtZXJhLnVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdCkpO1xuICB9XG5cbiAgLypcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25LZXlQcmVzczogXCIgKyBldmVudC5rZXkpO1xuICB9XG4qL1xuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vcmJpdC1jb250cm9scydcbn0pXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkQ2FtZXJhczogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+O1xuICBAQ29udGVudENoaWxkcmVuKFdlYkdMUmVuZGVyZXJDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRSZW5kZXJlcnM6IFF1ZXJ5TGlzdDxXZWJHTFJlbmRlcmVyQ29tcG9uZW50PjtcbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IG9uIHdob3NlIG5hdGl2ZSBlbGVtZW50IHRoZSBvcmJpdCBjb250cm9scyB3aWxsIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQga2V5Ym9hcmQgZXZlbnRzIGFyZSBzdGlsbCBsaXN0ZW5lZCBmb3Igb24gdGhlIGdsb2JhbCB3aW5kb3cgb2JqZWN0LCB0aGlzIGlzXG4gICAqIGEga25vd24gaXNzdWUgZnJvbSBUaHJlZS5qczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzEwMzE1XG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RlbmluZ0NvbnRyb2xFbGVtZW50OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIHJvdGF0ZVNwZWVkID0gMS4wO1xuICBASW5wdXQoKSB6b29tU3BlZWQgPSAxLjI7XG5cbiAgLy8gcHJpdmF0ZSBjb250cm9sczogVEhSRUUuT3JiaXRDb250cm9scztcbiAgcHJpdmF0ZSBjb250cm9sczogT3JiaXRDb250cm9scztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIElmIHRoZSBUSFJFRS5qcyBPcmJpdENvbnRyb2xzIGFyZSBub3Qgc2V0IHVwIHlldCwgd2UgZG8gbm90IG5lZWQgdG8gdXBkYXRlXG4gICAgLy8gYW55dGhpbmcgYXMgdGhleSB3aWxsIHBpY2sgdGhlIG5ldyB2YWx1ZXMgZnJvbSB0aGUgQElucHV0IHByb3BlcnRpZXMgYXV0b21hdGljYWxseVxuICAgIC8vIHVwb24gY3JlYXRpb24uXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3JvdGF0ZVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snem9vbVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydsaXN0ZW5pbmdDb250cm9sRWxlbWVudCddKSB7XG4gICAgICAvLyBUaGUgRE9NIGVsZW1lbnQgdGhlIE9yYml0Q29udHJvbHMgbGlzdGVuIG9uIGNhbm5vdCBiZSBjaGFuZ2VkIG9uY2UgYW5cbiAgICAgIC8vIE9yYml0Q29udHJvbHMgb2JqZWN0IGlzIGNyZWF0ZWQuIFdlIHRodXMgbmVlZCB0byByZWNyZWF0ZSBpdC5cbiAgICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBPcmJpdENvbnRyb2xzKCkge1xuICAgIC8vIHRoaXMuY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoXG4gICAgICAgIHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0LmNhbWVyYSxcbiAgICAgIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQgJiYgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgKTtcbiAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIpO1xuICAgIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgaWYgKHRoaXMuY2hpbGRDYW1lcmFzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW1lcmEgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNoaWxkUmVuZGVyZXJzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG4vKipcbiAqIEhlbHBlciBwYXJlbnQgY2xhc3MgZm9yIG1vZGVsIGxvYWRlciBkaXJlY3RpdmVzLlxuICpcbiAqIEBzZWUgT2JqZWN0TG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIE9iakxvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1vZGVsTG9hZGVyIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX21vZGVsOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIHNpZ25hbCB3aGV0aGVyIHRoZSBwYXJlbnQgY2xhc3MgaW5zdGFuY2UgQWJzdHJhY3RPYmplY3QzRCBjYWxsZWQgdGhlXG4gICAqIG92ZXJ3cml0dGVuIG1ldGhvZCB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUjYWZ0ZXJJbml0fSB5ZXQuXG4gICAqXG4gICAqIFVubGVzcyB0aGF0IG1ldGhvZCB3YXMgY2FsbGVkLCBubyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHtAbGluayBBYnN0cmFjdE9iamVjdDNEfVxuICAgKiBtYXkgYmUgc2FmZWx5IGFjY2Vzc2VkLCBlc3BlY2lhbGx5IHtAbGluayBBYnN0cmFjdE9iamVjdDNEI2FkZENoaWxkfSBhbmRcbiAgICoge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QucmVuZGVyZXJ9LlxuICAgKi9cbiAgcHJpdmF0ZSBwYXJlbnRJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50TG9hZGVkTW9kZWxPYmplY3Q6IFRIUkVFLk9iamVjdDNEIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBtb2RlbCBvYmplY3QuXG4gICAqXG4gICAqIFNvbWUgbG9hZGVycyAoZS5nLiBDb2xsYWRhTG9hZGVyKSBhbHNvIHByb3ZpZGUgb3RoZXIgbW9kZWwgaW5mb3JtYXRpb25cbiAgICogdXBvbiBsb2FkaW5nIGJlc2lkZXMgdGhlIFwicmF3XCIgbW9kZWwgb2JqZWN0L3NjZW5lLiBJbiB0aGVzZSBjYXNlc1xuICAgKiBpbXBsZW1lbnRpbmcgY2hpbGQgY2xhc3NlcyBhcmUgaW5kZWVkIHN1cHBvc2VkIHRvIHJldHVybiB0aGUgXCJyYXdcIiBtb2RlbFxuICAgKiBvYmplY3QuXG4gICAqIFRoZSBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSwgYWx0aG91Z2ggY2hpbGQgY2xhc3NlcyBhcmUgZnJlZSB0byBpbXBsZW1lbnRcbiAgICogb3RoZXIgbWVhbnMgYXMgd2VsbCkgZnJvbSB3aGljaCB0aGUgbW9kZWwgc2hhbGwgYmUgbG9hZGVkIGNhbiBiZSBvYnRhaW5lZCBieVxuICAgKiB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUubW9kZWx9LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpOiBQcm9taXNlPFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogVGhlIG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICogU2V0dGluZ3MgdGhpcyBwcm9wZXJ0eSBvbmx5IGhpZGVzIHRoZSBwcmV2aW91cyBtb2RlbCB1cG9uIHN1Y2Nlc3NmdWxcbiAgICogbG9hZGluZyBvZiB0aGUgbmV3IG9uZS4gVGhpcyBlc3BlY2lhbGx5IG1lYW5zIHRoYXQgaWYgdGhlIG5ldyBkYXRhIHNvdXJjZVxuICAgKiBpcyBpbnZhbGlkLCB0aGUgb2xkIG1vZGVsIHdpbGwgKm5vdCogYmUgcmVtb3ZlZCBmcm9tIHRoZSBzY2VuZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbW9kZWwobmV3TW9kZWxVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3TW9kZWxVcmw7XG5cbiAgICAvLyBEZWxheSBtb2RlbCBsb2FkaW5nIHVudGlsIHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gc28gdGhhdCB3ZSBjYW4gY2FsbCBhZGRDaGlsZCgpLlxuICAgIGlmICghdGhpcy5wYXJlbnRJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZE1vZGVsT2JqZWN0KCkudGhlbihuZXdNb2RlbCA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0ID0gbmV3TW9kZWw7XG4gICAgICB0aGlzLmFkZENoaWxkKG5ld01vZGVsKTtcblxuICAgICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCByZW5kZXJlcihuZXdSZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3UmVuZGVyZXI7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyBUcmlnZ2VyIG1vZGVsIGFjcXVpc2l0aW9uIG5vdyB0aGF0IHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgICBzdXBlci5yZXJlbmRlcigpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtY29sbGFkYS1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuQ29sbGFkYUxvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsLnNjZW5lKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBmb3IgZW1wbG95aW5nIFRIUkVFLk9CSkxvYWRlciB0byBsb2FkIFtXYXZlZnJvbnQgKi5vYmogZmlsZXNdWzFdLlxuICpcbiAqIFsxXTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2F2ZWZyb250Xy5vYmpfZmlsZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmotbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmpMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iakxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKTtcbiAgcHJpdmF0ZSBtdGxMb2FkZXIgPSBuZXcgVEhSRUUuTVRMTG9hZGVyKCk7XG5cbiAgQElucHV0KClcbiAgbWF0ZXJpYWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0ZXh0dXJlUGF0aDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgLy8gVE9ETzogbWFrZSBpdCBuaWNlclxuICAgIGlmICh0aGlzLm1hdGVyaWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgcmVqZWN0XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm10bExvYWRlci5zZXRUZXh0dXJlUGF0aCh0aGlzLnRleHR1cmVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm10bExvYWRlci5sb2FkKHRoaXMubWF0ZXJpYWwsIG1hdGVyaWFsID0+IHtcbiAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdyYWQyZGVnJ1xufSlcbmV4cG9ydCBjbGFzcyBSYWQyRGVnUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXNcbiAgICogQHBhcmFtIHJhZGlhbnMgUmFkaWFuc1xuICAgKi9cbiAgdHJhbnNmb3JtKHJhZGlhbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdkZWcycmFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWcyUmFkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICogQHBhcmFtIGRlZ3JlZSBEZWdyZWVzXG4gICAqL1xuICB0cmFuc2Zvcm0oZGVncmVlczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKGRlZ3JlZXMgLyAxODApICogTWF0aC5QSTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi9hYnN0cmFjdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBlcnNwZWN0aXZlLWNhbWVyYScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RDYW1lcmEsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0Q2FtZXJhPFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhPiB7XG5cbiAgLy8gQElucHV0KCkgY2FtZXJhVGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblxuICBASW5wdXQoKSBmb3Y6IG51bWJlcjtcbiAgQElucHV0KCkgbmVhcjogbnVtYmVyO1xuICBASW5wdXQoKSBmYXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBwb3NpdGlvblg6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25ZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWjogbnVtYmVyO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIGxldCBhc3BlY3RSYXRpbyA9IHVuZGVmaW5lZDsgLy8gVXBkYXRlZCBsYXRlclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxuICAgICAgdGhpcy5mb3YsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLm5lYXIsXG4gICAgICB0aGlzLmZhclxuICAgICk7XG5cbiAgICAvLyBTZXQgcG9zaXRpb24gYW5kIGxvb2sgYXRcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvblg7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb25ZO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBvc2l0aW9uWjtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUudXBkYXRlQXNwZWN0UmF0aW86ICcgKyBhc3BlY3QpO1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IGFzcGVjdDtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1heGVzLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXhlc0hlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQXhlc0hlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5BeGVzSGVscGVyKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1ncmlkLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gR3JpZEhlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZEhlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgZGl2aXNpb25zOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuR3JpZEhlbHBlcih0aGlzLnNpemUsIHRoaXMuZGl2aXNpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iamVjdC1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iamVjdExvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBvaW50LWxpZ2h0JyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQb2ludExpZ2h0RGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5Qb2ludExpZ2h0PiB7XG5cbiAgQElucHV0KCkgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBASW5wdXQoKSBpbnRlbnNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgZGlzdGFuY2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5Qb2ludExpZ2h0IHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5Qb2ludExpZ2h0KHRoaXMuY29sb3IsIHRoaXMuaW50ZW5zaXR5LCB0aGlzLmRpc3RhbmNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnQGF2YXRzYWV2L3RocmVlLW9yYml0Y29udHJvbHMtdHMnO1xuLy8gaW1wb3J0IHsgQ2FtZXJhQ29udHJvbHMgfSBmcm9tICdjYW1lcmEtY29udHJvbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS10ZXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RocmVlLXRlc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aHJlZS10ZXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZVRlc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzUmVmOiBFbGVtZW50UmVmO1xuXG4gIHNjZW5lID0gbnVsbDtcbiAgY2FtZXJhID0gbnVsbDtcbiAgcmVuZGVyZXIgPSBudWxsO1xuICBjb250cm9scyA9IG51bGw7XG4gIG1lc2ggPSBudWxsO1xuICBsaWdodCA9IG51bGw7XG4gIGNvdW50ID0gMTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQpe1xuICAgdGhpcy5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgMSwgMSwgMTAwMCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jb25maWdTY2VuZSgpO1xuICAgIHRoaXMuY29uZmlnQ2FtZXJhKCk7XG4gICAgdGhpcy5jb25maWdSZW5kZXJlcigpO1xuICAgIHRoaXMuY29uZmlnQ29udHJvbHMoKTtcblxuICAgIHRoaXMuY3JlYXRlTGlnaHQoKTtcbiAgICB0aGlzLmNyZWF0ZU1lc2goKTtcblxuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgY29uZmlnU2NlbmUoKSB7XG4gICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKCAweGRkZGRkZCApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIC8vIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50V2lkdGg6ICcsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbi8vICAgIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50SGVpZ2h0OiAnLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgdXBkYXRlQ2FtZXJhKCk6IHZvaWQge1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBjb25maWdDYW1lcmEoKSB7XG4gICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5zZXQoIC0xNSwgMTAsIDE1ICk7XG4gICAgdGhpcy5jYW1lcmEubG9va0F0KCB0aGlzLnNjZW5lLnBvc2l0aW9uICk7XG4gIH1cblxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGZvcmNlKTogdm9pZCB7XG4gICAgLy8gU2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTg4NDQ4NS90aHJlZWpzLWNhbnZhcy1zaXplLWJhc2VkLW9uLWNvbnRhaW5lclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChmb3JjZSB8fCB0aGlzLmNhbnZhcy53aWR0aCAhPT0gd2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgIC8vIHlvdSBtdXN0IHBhc3MgZmFsc2UgaGVyZSBvciB0aHJlZS5qcyBzYWRseSBmaWdodHMgdGhlIGJyb3dzZXJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0LCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG4gIH1cblxuICBjb25maWdSZW5kZXJlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIGFscGhhOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKDEpO1xuICAgICAvLyBVc2luZyBzZXRQaXhlbFJhdGlvKGRldmljZVBpeGVsUmF0aW8pIGZvciBIRC1EUEkgY2FuIGNhdXNlIGV4Y2Vzc2l2ZSByZW5kZXJpbmcuXG4gICAgIC8vIFNlZTogaHR0cHM6Ly93ZWJnbGZ1bmRhbWVudGFscy5vcmcvd2ViZ2wvbGVzc29ucy93ZWJnbC1yZXNpemluZy10aGUtY2FudmFzLmh0bWxcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwLCAwICk7XG4vKiAgICBjb25zdCB3aWRnZXRQYWRkaW5nID0gNDtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLndpZHRoJywgdGhpcy5jYW52YXMud2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50V2lkdGgnLCB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5vZmZzZXRXaWR0aCcsIHRoaXMuY2FudmFzLm9mZnNldFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLnNjcm9sbFdpZHRoJywgdGhpcy5jYW52YXMuc2Nyb2xsV2lkdGgpO1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgY29uc29sZS5sb2coJ2VsZW0gY29tcHV0ZWQnLCBzdHlsZS53aWR0aCk7XG4gICAgLy8gY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdCk7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnNvbGUubG9nKCdlbGVtIHJlY3QnLCByZWN0LndpZHRoKTtcblxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLSAod2lkZ2V0UGFkZGluZyAqIDIpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDsgLy8gcmVzaXphYmxlIGxheW91dCBcImNvbFwiIGZsZXggYWRqdXN0cyBoZWlnaHQgdG8gZml0XG4gICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuKi9cbiAgICB0aGlzLnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUodHJ1ZSk7XG4gICAgLy8gdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICB9XG5cbiAgY29uZmlnQ29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLmNhbnZhcyk7XG4gICAgdGhpcy5jb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVab29tID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVBhbiAgPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gIH1cblxuICBjcmVhdGVMaWdodCgpIHtcbiAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoIDB4ZmZmZmZmICk7XG4gICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoIC0xMCwgMTAsIDEwICk7XG4gICAgdGhpcy5zY2VuZS5hZGQoIHRoaXMubGlnaHQgKTtcbiAgfVxuXG4gIGNyZWF0ZU1lc2goKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNSwgNSwgNSk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KTtcbiAgICB0aGlzLm1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlKCkpO1xuICAgIC8vIHRoaXMubWVzaC5yb3RhdGlvbi54ICs9IDAuMDE7XG4gICAgLy8gdGhpcy5tZXNoLnJvdGF0aW9uLnkgKz0gMC4wMTtcbiAgICAvLyBpZiAodGhpcy5jb3VudCA8IDYpIHtcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlY3QnLCByZWN0LndpZHRoKTtcbiAgICAvLyB0aGlzLmNvdW50Kys7XG4gICAgLy8gfVxuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbHMvb3JiaXQtY29udHJvbHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT2JqTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvb2JqLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmFkMkRlZ1BpcGUgfSBmcm9tICcuL3BpcGVzL3JhZDJkZWcucGlwZSc7XG5pbXBvcnQgeyBEZWcyUmFkUGlwZSB9IGZyb20gJy4vcGlwZXMvZGVnMnJhZC5waXBlJztcbmltcG9ydCB7IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIH0gZnJvbSAnLi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBeGVzSGVscGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdyaWRIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvb2JqZWN0LWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9pbnRMaWdodERpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9saWdodC9wb2ludC1saWdodC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGhyZWVUZXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aHJlZS10ZXN0L3RocmVlLXRlc3QuY29tcG9uZW50JztcblxuLy8gVE9ETzogSWRlYWxseSBtb3ZlIGFsbCB0byB0aHJlZS13cmFwcGVyIGxpYnJhcnkuIEJ1dCBjYW4ndCBtb3ZlIGpzL0VuYWJsZVRocmVlRXhhbXBsZXMuanMgdG8gbGlicmFyeSA6KFxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBPcmJpdENvbnRyb2xzRGlyZWN0aXZlLFxuICAgIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUsXG4gICAgT2JqTG9hZGVyRGlyZWN0aXZlLFxuICAgIFJhZDJEZWdQaXBlLFxuICAgIERlZzJSYWRQaXBlLFxuICAgIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLFxuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnQsXG4gICAgU2NlbmVEaXJlY3RpdmUsXG4gICAgQXhlc0hlbHBlckRpcmVjdGl2ZSxcbiAgICBHcmlkSGVscGVyRGlyZWN0aXZlLFxuICAgIE9iamVjdExvYWRlckRpcmVjdGl2ZSxcbiAgICBQb2ludExpZ2h0RGlyZWN0aXZlLFxuICAgIFRocmVlVGVzdENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJUSFJFRS5TY2VuZSIsIlRIUkVFLldlYkdMUmVuZGVyZXIiLCJUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwIiwiVEhSRUUuT2JqZWN0M0QiLCJUSFJFRS5Db2xsYWRhTG9hZGVyIiwiVEhSRUUuT0JKTG9hZGVyIiwiVEhSRUUuTVRMTG9hZGVyIiwiVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEiLCJUSFJFRS5BeGVzSGVscGVyIiwiVEhSRUUuR3JpZEhlbHBlciIsIlRIUkVFLk9iamVjdExvYWRlciIsIlRIUkVFLlBvaW50TGlnaHQiLCJUSFJFRS5Db2xvciIsIlRIUkVFLkJveEdlb21ldHJ5IiwiVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCIsIlRIUkVFLk1lc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7SUFPRTtLQUFpQjs7Z0JBTGxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7MEJBSkQ7Q0FFQTs7Ozs7O0FDRkE7Ozs7QUFHQTtJQUFBO0tBNEdDOzs7O0lBbkZXLG1DQUFROzs7SUFBbEI7S0FDQzs7Ozs7SUFFTSxzQ0FBVzs7OztJQUFsQixVQUFtQixPQUFzQjtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1B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