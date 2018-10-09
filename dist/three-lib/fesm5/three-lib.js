import { Injectable, ContentChildren, Input, Component, ViewChild, ElementRef, HostListener, NgModule, Directive, Pipe, defineInjectable, forwardRef } from '@angular/core';
import { __extends, __awaiter, __generator } from 'tslib';
import { Object3D, Scene, ColladaLoader, PerspectiveCamera, OBJLoader, MTLLoader, ObjectLoader, WebGLRenderer, PCFSoftShadowMap, AxesHelper, GridHelper, PointLight } from 'three-full';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL2Fic3RyYWN0LW1vZGVsLWxvYWRlci50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9yYWQyZGVnLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcGlwZXMvZGVnMnJhZC5waXBlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE9iamVjdDNEPFQgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RPYmplY3QzRCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgY2hpbGROb2RlczogUXVlcnlMaXN0PEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+PjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVYOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVo6IG51bWJlcjtcblxuICBASW5wdXQoKSB0cmFuc2xhdGVYOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVk6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWjogbnVtYmVyO1xuXG4gIHByaXZhdGUgb2JqZWN0OiBUO1xuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLm9iamVjdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtdXN0UmVyZW5kZXIgPSBmYWxzZTtcblxuICAgIGlmIChbJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoWyd0cmFuc2xhdGVYJywgJ3RyYW5zbGF0ZVknLCAndHJhbnNsYXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobXVzdFJlcmVuZGVyKSB7XG4gICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RPYmplY3QzRC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLm9iamVjdCA9IHRoaXMubmV3T2JqZWN0M0RJbnN0YW5jZSgpO1xuXG4gICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5jaGlsZE5vZGVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5maWx0ZXIoaSA9PiBpICE9PSB0aGlzICYmIGkuZ2V0T2JqZWN0KCkgIT09IHVuZGVmaW5lZCkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJBZGQgY2hpbGQgZm9yIFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaS5nZXRPYmplY3QoKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJObyBjaGlsZCBPYmplY3QzRCBmb3I6IFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmFmdGVySW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVJvdGF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuZ2xlcyA9IFtcbiAgICAgIHRoaXMucm90YXRlWCxcbiAgICAgIHRoaXMucm90YXRlWSxcbiAgICAgIHRoaXMucm90YXRlWlxuICAgIF0ubWFwKGFuZ2xlID0+IGFuZ2xlIHx8IDApO1xuXG4gICAgdGhpcy5vYmplY3Qucm90YXRpb24uc2V0KFxuICAgICAgdGhpcy5yb3RhdGVYIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWiB8fCAwLFxuICAgICAgJ1hZWidcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRyYW5zbGF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLnNldChcbiAgICAgIHRoaXMudHJhbnNsYXRlWCB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVZIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVogfHwgMFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LmFkZChvYmplY3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZUNoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5yZW1vdmUob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMub2JqZWN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IG5ld09iamVjdDNESW5zdGFuY2UoKTogVDtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtc2NlbmUnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNjZW5lRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBTY2VuZURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuU2NlbmU+IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5TY2VuZSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlNjZW5lKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q2FtZXJhPFQgZXh0ZW5kcyBUSFJFRS5DYW1lcmE+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY2FtZXJhOiBUO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdENhbWVyYS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpO1xuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEhvc3RMaXN0ZW5lcixcbiAgUXVlcnlMaXN0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS13ZWJnbC1yZW5kZXJlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2ViR0xSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG4gIHByaXZhdGUgdmlld0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJylcbiAgcHJpdmF0ZSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7IC8vIE5PVEU6IHNheSBieWUtYnllIHRvIHNlcnZlci1zaWRlIHJlbmRlcmluZyA7KVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2NlbmVEaXJlY3RpdmUpIHNjZW5lQ29tcG9uZW50czogUXVlcnlMaXN0PFNjZW5lRGlyZWN0aXZlPjsgLy8gVE9ETzogTXVsdGlwbGUgc2NlbmVzXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEpIGNhbWVyYUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjsgLy8gVE9ETzogTXVsdGlwbGUgY2FtZXJhc1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5jb25zdHJ1Y3RvcicpO1xuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRSZW5kZXJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVuZGVyIHBhbmUgb24gd2hpY2ggdGhlIHNjZW5lIGlzIHJlbmRlcmVkLlxuICAgKiBDdXJyZW50bHksIG9ubHkgdGhlIFdlYkdMIHJlbmRlcmVyIHdpdGggYSBjYW52YXMgaXMgdXNlZCBpbiB0aGlzXG4gICAqIGltcGxlbWVudGF0aW9uLCBzbyB0aGlzIHByb3BlcnR5IHdpbGwgYWx3YXlzIGJlIGFuIEVsZW1lbnRSZWYgdG8gdGhlXG4gICAqIHVuZGVybHlpbmcgPGNhbnZhcz4gZWxlbWVudC5cbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW3JvdGF0ZVNwZWVkXT0xIFt6b29tU3BlZWRdPTEuMiBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlclBhbmUoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRSZW5kZXJpbmcoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LnN0YXJ0UmVuZGVyaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweGZmZmZmZiwgMSk7XG4gICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIC8vIGlmICh0aGlzLnNjZW5lQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5zY2VuZUNvbXBvbmVudHMubGVuZ3RoID09IDEgJiZcbiAgICAvLyAgICAgdGhpcy5jYW1lcmFDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNhbWVyYUNvbXBvbmVudHMubGVuZ3RoID09IDEpIHtcbiAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgIGNvbnN0IHNjZW5lQ29tcG9uZW50ID0gdGhpcy5zY2VuZUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICBjb25zdCBjYW1lcmFDb21wb25lbnQgPSB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJlbmRlclwiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNjZW5lLmdldE9iamVjdCgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNhbWVyYS5jYW1lcmEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmVDb21wb25lbnQuZ2V0T2JqZWN0KCksIGNhbWVyYUNvbXBvbmVudC5jYW1lcmEpO1xuICAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQub25SZXNpemU6ICcgKyB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCArICcsICcgKyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKSB7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5mb3JFYWNoKGNhbWVyYSA9PiBjYW1lcmEudXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0KSk7XG4gIH1cblxuICAvKlxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlwcmVzcycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJvbktleVByZXNzOiBcIiArIGV2ZW50LmtleSk7XG4gIH1cbiovXG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLFxuICAgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ0BhdmF0c2Fldi90aHJlZS1vcmJpdGNvbnRyb2xzLXRzJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9yYml0LWNvbnRyb2xzJ1xufSlcbmV4cG9ydCBjbGFzcyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRDYW1lcmFzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47XG4gIEBDb250ZW50Q2hpbGRyZW4oV2ViR0xSZW5kZXJlckNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZFJlbmRlcmVyczogUXVlcnlMaXN0PFdlYkdMUmVuZGVyZXJDb21wb25lbnQ+O1xuICAvKipcbiAgICogVGhlIGVsZW1lbnQgb24gd2hvc2UgbmF0aXZlIGVsZW1lbnQgdGhlIG9yYml0IGNvbnRyb2xzIHdpbGwgbGlzdGVuIGZvciBtb3VzZSBldmVudHMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBrZXlib2FyZCBldmVudHMgYXJlIHN0aWxsIGxpc3RlbmVkIGZvciBvbiB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QsIHRoaXMgaXNcbiAgICogYSBrbm93biBpc3N1ZSBmcm9tIFRocmVlLmpzOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTAzMTVcbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgQElucHV0KCkgbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgcm90YXRlU3BlZWQgPSAxLjA7XG4gIEBJbnB1dCgpIHpvb21TcGVlZCA9IDEuMjtcblxuICAvLyBwcml2YXRlIGNvbnRyb2xzOiBUSFJFRS5PcmJpdENvbnRyb2xzO1xuICBwcml2YXRlIGNvbnRyb2xzOiBPcmJpdENvbnRyb2xzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gSWYgdGhlIFRIUkVFLmpzIE9yYml0Q29udHJvbHMgYXJlIG5vdCBzZXQgdXAgeWV0LCB3ZSBkbyBub3QgbmVlZCB0byB1cGRhdGVcbiAgICAvLyBhbnl0aGluZyBhcyB0aGV5IHdpbGwgcGljayB0aGUgbmV3IHZhbHVlcyBmcm9tIHRoZSBASW5wdXQgcHJvcGVydGllcyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gdXBvbiBjcmVhdGlvbi5cbiAgICBpZiAoIXRoaXMuY29udHJvbHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sncm90YXRlU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd6b29tU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50J10pIHtcbiAgICAgIC8vIFRoZSBET00gZWxlbWVudCB0aGUgT3JiaXRDb250cm9scyBsaXN0ZW4gb24gY2Fubm90IGJlIGNoYW5nZWQgb25jZSBhblxuICAgICAgLy8gT3JiaXRDb250cm9scyBvYmplY3QgaXMgY3JlYXRlZC4gV2UgdGh1cyBuZWVkIHRvIHJlY3JlYXRlIGl0LlxuICAgICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRVcE9yYml0Q29udHJvbHMoKSB7XG4gICAgLy8gdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKFxuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhcbiAgICAgICAgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QuY2FtZXJhLFxuICAgICAgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudCAmJiB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApO1xuICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcik7XG4gICAgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICBpZiAodGhpcy5jaGlsZENhbWVyYXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbWVyYSBpcyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hpbGRSZW5kZXJlcnMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVuZGVyZXIgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbi8qKlxuICogSGVscGVyIHBhcmVudCBjbGFzcyBmb3IgbW9kZWwgbG9hZGVyIGRpcmVjdGl2ZXMuXG4gKlxuICogQHNlZSBPYmplY3RMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgT2JqTG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIENvbGxhZGFMb2FkZXJEaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TW9kZWxMb2FkZXIgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfbW9kZWw6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gc2lnbmFsIHdoZXRoZXIgdGhlIHBhcmVudCBjbGFzcyBpbnN0YW5jZSBBYnN0cmFjdE9iamVjdDNEIGNhbGxlZCB0aGVcbiAgICogb3ZlcndyaXR0ZW4gbWV0aG9kIHtAbGluayBNb2RlbExvYWRlckRpcmVjdGl2ZSNhZnRlckluaXR9IHlldC5cbiAgICpcbiAgICogVW5sZXNzIHRoYXQgbWV0aG9kIHdhcyBjYWxsZWQsIG5vIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2Yge0BsaW5rIEFic3RyYWN0T2JqZWN0M0R9XG4gICAqIG1heSBiZSBzYWZlbHkgYWNjZXNzZWQsIGVzcGVjaWFsbHkge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QjYWRkQ2hpbGR9IGFuZFxuICAgKiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRC5yZW5kZXJlcn0uXG4gICAqL1xuICBwcml2YXRlIHBhcmVudEluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdDogVEhSRUUuT2JqZWN0M0QgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIExvYWQgdGhlIG1vZGVsIG9iamVjdC5cbiAgICpcbiAgICogU29tZSBsb2FkZXJzIChlLmcuIENvbGxhZGFMb2FkZXIpIGFsc28gcHJvdmlkZSBvdGhlciBtb2RlbCBpbmZvcm1hdGlvblxuICAgKiB1cG9uIGxvYWRpbmcgYmVzaWRlcyB0aGUgXCJyYXdcIiBtb2RlbCBvYmplY3Qvc2NlbmUuIEluIHRoZXNlIGNhc2VzXG4gICAqIGltcGxlbWVudGluZyBjaGlsZCBjbGFzc2VzIGFyZSBpbmRlZWQgc3VwcG9zZWQgdG8gcmV0dXJuIHRoZSBcInJhd1wiIG1vZGVsXG4gICAqIG9iamVjdC5cbiAgICogVGhlIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJLCBhbHRob3VnaCBjaGlsZCBjbGFzc2VzIGFyZSBmcmVlIHRvIGltcGxlbWVudFxuICAgKiBvdGhlciBtZWFucyBhcyB3ZWxsKSBmcm9tIHdoaWNoIHRoZSBtb2RlbCBzaGFsbCBiZSBsb2FkZWQgY2FuIGJlIG9idGFpbmVkIGJ5XG4gICAqIHtAbGluayBNb2RlbExvYWRlckRpcmVjdGl2ZS5tb2RlbH0uXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCk6IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+O1xuXG4gIC8qKlxuICAgKiBUaGUgbW9kZWwgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkkpLlxuICAgKiBTZXR0aW5ncyB0aGlzIHByb3BlcnR5IG9ubHkgaGlkZXMgdGhlIHByZXZpb3VzIG1vZGVsIHVwb24gc3VjY2Vzc2Z1bFxuICAgKiBsb2FkaW5nIG9mIHRoZSBuZXcgb25lLiBUaGlzIGVzcGVjaWFsbHkgbWVhbnMgdGhhdCBpZiB0aGUgbmV3IGRhdGEgc291cmNlXG4gICAqIGlzIGludmFsaWQsIHRoZSBvbGQgbW9kZWwgd2lsbCAqbm90KiBiZSByZW1vdmVkIGZyb20gdGhlIHNjZW5lLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtb2RlbChuZXdNb2RlbFVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXdNb2RlbFVybDtcblxuICAgIC8vIERlbGF5IG1vZGVsIGxvYWRpbmcgdW50aWwgdGhlIHBhcmVudCBoYXMgYmVlbiBpbml0aWFsaXplZCxcbiAgICAvLyBzbyB0aGF0IHdlIGNhbiBjYWxsIGFkZENoaWxkKCkuXG4gICAgaWYgKCF0aGlzLnBhcmVudEluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkTW9kZWxPYmplY3QoKS50aGVuKG5ld01vZGVsID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QgPSBuZXdNb2RlbDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQobmV3TW9kZWwpO1xuXG4gICAgICBpZiAodGhpcy5yZW5kZXJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbW9kZWwgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkkpLlxuICAgKi9cbiAgcHVibGljIGdldCBtb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHJlbmRlcmVyKG5ld1JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSBuZXdSZW5kZXJlcjtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpIHtcbiAgICB0aGlzLnBhcmVudEluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIC8vIFRyaWdnZXIgbW9kZWwgYWNxdWlzaXRpb24gbm93IHRoYXQgdGhlIHBhcmVudCBoYXMgYmVlbiBpbml0aWFsaXplZC5cbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcmVuZGVyKCkge1xuICAgIHN1cGVyLnJlcmVuZGVyKCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJlcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5PYmplY3QzRCB7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1jb2xsYWRhLWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5Db2xsYWRhTG9hZGVyKCk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwuc2NlbmUpO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5cbi8qKlxuICogRGlyZWN0aXZlIGZvciBlbXBsb3lpbmcgVEhSRUUuT0JKTG9hZGVyIHRvIGxvYWQgW1dhdmVmcm9udCAqLm9iaiBmaWxlc11bMV0uXG4gKlxuICogWzFdOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XYXZlZnJvbnRfLm9ial9maWxlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iai1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iakxvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqTG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9CSkxvYWRlcigpO1xuICBwcml2YXRlIG10bExvYWRlciA9IG5ldyBUSFJFRS5NVExMb2FkZXIoKTtcblxuICBASW5wdXQoKVxuICBtYXRlcmlhbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRleHR1cmVQYXRoOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGl0IG5pY2VyXG4gICAgaWYgKHRoaXMubWF0ZXJpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICByZWplY3RcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZVBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubXRsTG9hZGVyLnNldFRleHR1cmVQYXRoKHRoaXMudGV4dHVyZVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubXRsTG9hZGVyLmxvYWQodGhpcy5tYXRlcmlhbCwgbWF0ZXJpYWwgPT4ge1xuICAgICAgICAgIG1hdGVyaWFsLnByZWxvYWQoKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWwpO1xuICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3JhZDJkZWcnXG59KVxuZXhwb3J0IGNsYXNzIFJhZDJEZWdQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHJhZGlhbnMgdG8gZGVncmVlc1xuICAgKiBAcGFyYW0gcmFkaWFucyBSYWRpYW5zXG4gICAqL1xuICB0cmFuc2Zvcm0ocmFkaWFuczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcmFkaWFucyAqICgxODAgLyBNYXRoLlBJKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RlZzJyYWQnXG59KVxuZXhwb3J0IGNsYXNzIERlZzJSYWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgKiBAcGFyYW0gZGVncmVlIERlZ3JlZXNcbiAgICovXG4gIHRyYW5zZm9ybShkZWdyZWVzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoZGVncmVlcyAvIDE4MCkgKiBNYXRoLlBJO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuL2Fic3RyYWN0LWNhbWVyYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdENhbWVyYSwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RDYW1lcmE8VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE+IHtcblxuICAvLyBASW5wdXQoKSBjYW1lcmFUYXJnZXQ6IFRIUkVFLk9iamVjdDNEO1xuXG4gIEBJbnB1dCgpIGZvdjogbnVtYmVyO1xuICBASW5wdXQoKSBuZWFyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZhcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHBvc2l0aW9uWDogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblk6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25aOiBudW1iZXI7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbGV0IGFzcGVjdFJhdGlvID0gdW5kZWZpbmVkOyAvLyBVcGRhdGVkIGxhdGVyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICB0aGlzLmZvdixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMubmVhcixcbiAgICAgIHRoaXMuZmFyXG4gICAgKTtcblxuICAgIC8vIFNldCBwb3NpdGlvbiBhbmQgbG9vayBhdFxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uWDtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvblk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IHRoaXMucG9zaXRpb25aO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3Q6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS51cGRhdGVBc3BlY3RSYXRpbzogJyArIGFzcGVjdCk7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gYXNwZWN0O1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWF4ZXMtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBeGVzSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBBeGVzSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLkF4ZXNIZWxwZXIge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkF4ZXNIZWxwZXIodGhpcy5zaXplKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWdyaWQtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBHcmlkSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXZpc2lvbnM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5HcmlkSGVscGVyKHRoaXMuc2l6ZSwgdGhpcy5kaXZpc2lvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb2JqZWN0LWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT2JqZWN0TG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuT2JqZWN0TG9hZGVyKCk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcG9pbnQtbGlnaHQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBvaW50TGlnaHREaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50TGlnaHREaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlBvaW50TGlnaHQ+IHtcblxuICBASW5wdXQoKSBjb2xvcjogVEhSRUUuQ29sb3I7XG4gIEBJbnB1dCgpIGludGVuc2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXN0YW5jZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlBvaW50TGlnaHQge1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50TGlnaHQodGhpcy5jb2xvciwgdGhpcy5pbnRlbnNpdHksIHRoaXMuZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG4vLyBpbXBvcnQgeyBDYW1lcmFDb250cm9scyB9IGZyb20gJ2NhbWVyYS1jb250cm9scyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXRlc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGhyZWUtdGVzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RocmVlLXRlc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlVGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdjYW52YXMnKSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7XG5cbiAgc2NlbmUgPSBudWxsO1xuICBjYW1lcmEgPSBudWxsO1xuICByZW5kZXJlciA9IG51bGw7XG4gIGNvbnRyb2xzID0gbnVsbDtcbiAgbWVzaCA9IG51bGw7XG4gIGxpZ2h0ID0gbnVsbDtcbiAgY291bnQgPSAxO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudCl7XG4gICB0aGlzLnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUodHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCAxLCAxLCAxMDAwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZ1NjZW5lKCk7XG4gICAgdGhpcy5jb25maWdDYW1lcmEoKTtcbiAgICB0aGlzLmNvbmZpZ1JlbmRlcmVyKCk7XG4gICAgdGhpcy5jb25maWdDb250cm9scygpO1xuXG4gICAgdGhpcy5jcmVhdGVMaWdodCgpO1xuICAgIHRoaXMuY3JlYXRlTWVzaCgpO1xuXG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBjb25maWdTY2VuZSgpIHtcbiAgICB0aGlzLnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoIDB4ZGRkZGRkICk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgLy8gY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRXaWR0aDogJywgdGhpcy5jYW52YXMuY2xpZW50V2lkdGgpO1xuLy8gICAgY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRIZWlnaHQ6ICcsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDYW1lcmEoKTogdm9pZCB7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIGNvbmZpZ0NhbWVyYSgpIHtcbiAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCggLTE1LCAxMCwgMTUgKTtcbiAgICB0aGlzLmNhbWVyYS5sb29rQXQoIHRoaXMuc2NlbmUucG9zaXRpb24gKTtcbiAgfVxuXG4gIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoZm9yY2UpOiB2b2lkIHtcbiAgICAvLyBTZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODg0NDg1L3RocmVlanMtY2FudmFzLXNpemUtYmFzZWQtb24tY29udGFpbmVyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGZvcmNlIHx8IHRoaXMuY2FudmFzLndpZHRoICE9PSB3aWR0aCB8fCB0aGlzLmNhbnZhcy5oZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgLy8geW91IG11c3QgcGFzcyBmYWxzZSBoZXJlIG9yIHRocmVlLmpzIHNhZGx5IGZpZ2h0cyB0aGUgYnJvd3NlclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ1JlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICAgICAgYWxwaGE6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oMSk7XG4gICAgIC8vIFVzaW5nIHNldFBpeGVsUmF0aW8oZGV2aWNlUGl4ZWxSYXRpbykgZm9yIEhELURQSSBjYW4gY2F1c2UgZXhjZXNzaXZlIHJlbmRlcmluZy5cbiAgICAgLy8gU2VlOiBodHRwczovL3dlYmdsZnVuZGFtZW50YWxzLm9yZy93ZWJnbC9sZXNzb25zL3dlYmdsLXJlc2l6aW5nLXRoZS1jYW52YXMuaHRtbFxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAsIDAgKTtcbi8qICAgIGNvbnN0IHdpZGdldFBhZGRpbmcgPSA0O1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMud2lkdGgnLCB0aGlzLmNhbnZhcy53aWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5jbGllbnRXaWR0aCcsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLm9mZnNldFdpZHRoJywgdGhpcy5jYW52YXMub2Zmc2V0V2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMuc2Nyb2xsV2lkdGgnLCB0aGlzLmNhbnZhcy5zY3JvbGxXaWR0aCk7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zb2xlLmxvZygnZWxlbSBjb21wdXRlZCcsIHN0eWxlLndpZHRoKTtcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlY3QnLCByZWN0KTtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc29sZS5sb2coJ2VsZW0gcmVjdCcsIHJlY3Qud2lkdGgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAtICh3aWRnZXRQYWRkaW5nICogMik7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0OyAvLyByZXNpemFibGUgbGF5b3V0IFwiY29sXCIgZmxleCBhZGp1c3RzIGhlaWdodCB0byBmaXRcbiAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4qL1xuICAgIHRoaXMucmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSh0cnVlKTtcbiAgICAvLyB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gIH1cblxuICBjb25maWdDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHRoaXMuY2FudmFzKTtcbiAgICB0aGlzLmNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVpvb20gPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlUGFuICA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgfVxuXG4gIGNyZWF0ZUxpZ2h0KCkge1xuICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCggMHhmZmZmZmYgKTtcbiAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldCggLTEwLCAxMCwgMTAgKTtcbiAgICB0aGlzLnNjZW5lLmFkZCggdGhpcy5saWdodCApO1xuICB9XG5cbiAgY3JlYXRlTWVzaCgpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1LCA1LCA1KTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwIH0pO1xuICAgIHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZXNoKTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGUoKSk7XG4gICAgLy8gdGhpcy5tZXNoLnJvdGF0aW9uLnggKz0gMC4wMTtcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueSArPSAwLjAxO1xuICAgIC8vIGlmICh0aGlzLmNvdW50IDwgNikge1xuICAgIC8vIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdCcsIHJlY3Qud2lkdGgpO1xuICAgIC8vIHRoaXMuY291bnQrKztcbiAgICAvLyB9XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL2NvbGxhZGEtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmpMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSYWQyRGVnUGlwZSB9IGZyb20gJy4vcGlwZXMvcmFkMmRlZy5waXBlJztcbmltcG9ydCB7IERlZzJSYWRQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWcycmFkLnBpcGUnO1xuaW1wb3J0IHsgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgfSBmcm9tICcuL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEF4ZXNIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZEhlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmplY3QtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb2ludExpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xpZ2h0L3BvaW50LWxpZ2h0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaHJlZVRlc3RDb21wb25lbnQgfSBmcm9tICcuL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQnO1xuXG4vLyBUT0RPOiBJZGVhbGx5IG1vdmUgYWxsIHRvIHRocmVlLXdyYXBwZXIgbGlicmFyeS4gQnV0IGNhbid0IG1vdmUganMvRW5hYmxlVGhyZWVFeGFtcGxlcy5qcyB0byBsaWJyYXJ5IDooXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZUxpYk1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlRIUkVFLlNjZW5lIiwiVEhSRUUuV2ViR0xSZW5kZXJlciIsIlRIUkVFLlBDRlNvZnRTaGFkb3dNYXAiLCJUSFJFRS5PYmplY3QzRCIsIlRIUkVFLkNvbGxhZGFMb2FkZXIiLCJUSFJFRS5PQkpMb2FkZXIiLCJUSFJFRS5NVExMb2FkZXIiLCJUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSIsIlRIUkVFLkF4ZXNIZWxwZXIiLCJUSFJFRS5HcmlkSGVscGVyIiwiVEhSRUUuT2JqZWN0TG9hZGVyIiwiVEhSRUUuUG9pbnRMaWdodCIsIlRIUkVFLkNvbG9yIiwiVEhSRUUuQm94R2VvbWV0cnkiLCJUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsIiwiVEhSRUUuTWVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OzswQkFKRDtDQUVBOzs7Ozs7QUNGQTs7OztBQVVBO0lBQUE7S0E0R0M7Ozs7SUFuRlcsbUNBQVE7OztJQUFsQjtLQUNDOzs7OztJQUVNLHNDQUFXOzs7O0lBQWxCLFVBQW1CLE9BQXNCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjs7WUFFRyxZQUFZLEdBQUcsS0FBSztRQUV4QixJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLElBQUksT0FBTyxHQUFBLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsSUFBSSxPQUFPLEdBQUEsQ0FBQyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDckI7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7OztJQUVNLDBDQUFlOzs7SUFBdEI7UUFBQSxpQkFrQkM7UUFqQkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLEtBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssU0FBUyxHQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDOzs7Z0JBRzlFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1NBQ0osQUFFQTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNsQjs7OztJQUVPLHdDQUFhOzs7SUFBckI7O1lBQ1EsTUFBTSxHQUFHO1lBQ2IsSUFBSSxDQUFDLE9BQU87WUFDWixJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPO1NBQ2IsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLElBQUksQ0FBQyxHQUFBLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDakIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ2pCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUNqQixLQUFLLENBQ04sQ0FBQztLQUNIOzs7O0lBRU8sMkNBQWdCOzs7SUFBeEI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3RCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUNwQixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQ3JCLENBQUM7S0FDSDs7Ozs7SUFFUyxtQ0FBUTs7OztJQUFsQixVQUFtQixNQUFzQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFUyxzQ0FBVzs7OztJQUFyQixVQUFzQixNQUFzQjtRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVNLG9DQUFTOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7OzZCQXBHQSxlQUFlLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFOzBCQUt4RCxLQUFLOzBCQUtMLEtBQUs7MEJBS0wsS0FBSzs2QkFFTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzs7SUF1RlIsdUJBQUM7Q0E1R0Q7Ozs7Ozs7SUNGb0NBLGtDQUE2QjtJQUUvRDtRQUFBLGlCQUdDO1FBRkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzFDLFFBQUEsaUJBQU8sU0FBQzs7S0FDVDs7OztJQUVTLGtDQUFTOzs7SUFBbkI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDekM7Ozs7SUFFUyw0Q0FBbUI7OztJQUE3QjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUlDLEtBQVcsRUFBRSxDQUFDO0tBQzFCOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEdBQUEsQ0FBQyxFQUFFLENBQUM7aUJBQzFGOzs7SUFpQkQscUJBQUM7Q0FBQSxDQWhCbUMsZ0JBQWdCOzs7Ozs7Ozs7O0FDTHBEOzs7OztJQUlFO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQzNDOzs7O0lBRU0sd0NBQWU7OztJQUF0QjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDbEI7SUFNSCxxQkFBQztDQUFBOzs7Ozs7QUNwQkQ7SUFpQ0U7UUFSUSxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQVM5QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7OztJQUVELGdEQUFlOzs7SUFBZjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7SUFrQkQsc0JBQVcsOENBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBckI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7OztPQUFBO0lBRUQsc0JBQVksMENBQU07Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1NBQ3JDOzs7T0FBQTs7OztJQUVPLCtDQUFjOzs7SUFBdEI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJQyxhQUFtQixDQUFDO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHQyxnQkFBc0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7O0lBRU0sdUNBQU07OztJQUFiOzs7UUFHRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7O2dCQUNsQixjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLOztnQkFDM0MsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLOzs7O1lBSW5ELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUU7O0tBRUY7Ozs7SUFFTyxxREFBb0I7OztJQUE1Qjs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1FBQ3ZDLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQixPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztLQUMzRDs7Ozs7SUFHTSx5Q0FBUTs7OztJQURmLFVBQ2dCLEtBQVk7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEcsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFFckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7OztJQUVNLDhEQUE2Qjs7O0lBQXBDOztZQUNRLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBQSxDQUFDLENBQUM7S0FDM0U7O2dCQTFHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsdUNBQThDOztpQkFFL0M7Ozs7NEJBTUUsU0FBUyxTQUFDLFFBQVE7a0NBR2xCLGVBQWUsU0FBQyxjQUFjO21DQUM5QixlQUFlLFNBQUMsY0FBYzsyQkE2RTlCLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBd0IzQyw2QkFBQztDQW5IRDs7Ozs7O0FDakJBO0lBc0NFOzs7Ozs7Ozs7Ozs7Ozs7OztRQVJTLDRCQUF1QixHQUEyQixTQUFTLENBQUM7UUFFNUQsZ0JBQVcsR0FBRyxHQUFHLENBQUM7UUFDbEIsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQU12QixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUQsNENBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOzs7O1FBSWhDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTs7O1lBR3RDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7S0FDRjs7OztJQUVELDRDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDekI7Ozs7SUFFTyxtREFBa0I7OztJQUExQjs7UUFFRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxDQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ2hDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUMzRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3BDOzs7O0lBRUQsZ0RBQWU7OztJQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzVFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2hGLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUMxQztRQUVELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzNCOztnQkFuRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzs7OytCQUdFLGVBQWUsU0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2lDQUNyRCxlQUFlLFNBQUMsc0JBQXNCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOzBDQWlCN0QsS0FBSzs4QkFFTCxLQUFLOzRCQUNMLEtBQUs7O0lBMkRSLDZCQUFDO0NBckZEOzs7Ozs7Ozs7Ozs7OztBQ0tBO0lBQWtESCx1Q0FBZ0M7Ozs7Ozs7O0lBQWxGO1FBQUEscUVBdUdDOzs7Ozs7Ozs7UUExRlMsdUJBQWlCLEdBQUcsS0FBSyxDQUFDOztLQTBGbkM7SUFuRUMsc0JBQ1csc0NBQUs7Ozs7Ozs7O1FBNEJoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjs7Ozs7Ozs7Ozs7Ozs7O1FBL0JELFVBQ2lCLFdBQW1CO1lBRHBDLGlCQXdCQztZQXRCQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQzs7O1lBSTFCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzNCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNsQyxJQUFJLEtBQUksQ0FBQyx3QkFBd0IsRUFBRTtvQkFDakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsS0FBSSxDQUFDLHdCQUF3QixHQUFHLFFBQVEsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFeEIsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUN4QjthQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEIsQ0FBQyxDQUFDO1NBQ0o7OztPQUFBO0lBU0Qsc0JBQ1cseUNBQVE7Ozs7UUFLbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O1FBUkQsVUFDb0IsV0FBbUM7WUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN6Qjs7O09BQUE7Ozs7SUFNUyx1Q0FBUzs7O0lBQW5CO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzs7UUFHOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3pCOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUNqRDtLQUNGOzs7O0lBRVMsc0NBQVE7OztJQUFsQjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFUyxpREFBbUI7OztJQUE3QjtRQUNFLE9BQU8sSUFBSUksUUFBYyxFQUFFLENBQUM7S0FDN0I7O3dCQWxFQSxLQUFLOzJCQWlDTCxLQUFLOztJQWtDUiwwQkFBQztDQUFBLENBdkdpRCxnQkFBZ0I7Ozs7Ozs7SUNIdEJKLDBDQUFtQjtJQUovRDtRQUFBLHFFQWlCQztRQVpTLFlBQU0sR0FBRyxJQUFJSyxhQUFtQixFQUFFLENBQUM7O0tBWTVDOzs7O0lBVmlCLGdEQUFlOzs7SUFBL0I7Ozs7Z0JBQ0Usc0JBQU8sSUFBSSxPQUFPLENBQWlCLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ2pELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQSxLQUFLOzRCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUN0QixFQUNELFNBQVMsRUFDVCxNQUFNLENBQ1AsQ0FBQztxQkFDSCxDQUFDLEVBQUM7OztLQUNKOztnQkFoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHNCQUFzQixHQUFBLENBQUMsRUFBRSxDQUFDO2lCQUNsRzs7SUFjRCw2QkFBQztDQUFBLENBYjJDLG1CQUFtQjs7Ozs7Ozs7Ozs7QUNDL0Q7SUFJd0NMLHNDQUFtQjs7Ozs7O0lBSjNEO1FBQUEscUVBMkNDO1FBdENTLFlBQU0sR0FBRyxJQUFJTSxTQUFlLEVBQUUsQ0FBQztRQUMvQixlQUFTLEdBQUcsSUFBSUMsU0FBZSxFQUFFLENBQUM7O0tBcUMzQzs7OztJQTdCaUIsNENBQWU7OztJQUEvQjs7Ozs7Z0JBRUUsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtvQkFDL0Isc0JBQU8sSUFBSSxPQUFPLENBQWlCLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQ2pELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQSxLQUFLO2dDQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ2hCLEVBQ0MsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDO3lCQUNILENBQUMsRUFBQztpQkFDSjtxQkFBTTtvQkFDTCxzQkFBTyxJQUFJLE9BQU8sQ0FBaUIsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDakQsSUFBSSxLQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtnQ0FDbEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUNqRDs0QkFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLFVBQUEsUUFBUTtnQ0FDekMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxVQUFBLEtBQUs7b0NBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQ0FDaEIsRUFDQyxTQUFTLEVBQ1QsTUFBTSxDQUNQLENBQUM7NkJBQ0gsQ0FBQyxDQUFDO3lCQUNKLENBQUMsRUFBQztpQkFDSjs7OztLQUNGOztnQkExQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixHQUFBLENBQUMsRUFBRSxDQUFDO2lCQUM5Rjs7OzJCQUtFLEtBQUs7OEJBR0wsS0FBSzs7SUFnQ1IseUJBQUM7Q0FBQSxDQXZDdUMsbUJBQW1COzs7Ozs7QUNkM0Q7SUFFQTtLQWFDOzs7Ozs7Ozs7O0lBSkMsK0JBQVM7Ozs7O0lBQVQsVUFBVSxPQUFlO1FBQ3ZCLE9BQU8sT0FBTyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDbEM7O2dCQVhGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEI7O0lBV0Qsa0JBQUM7Q0FiRDs7Ozs7O0FDRkE7SUFFQTtLQWFDOzs7Ozs7Ozs7O0lBSkMsK0JBQVM7Ozs7O0lBQVQsVUFBVSxPQUFlO1FBQ3ZCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbEM7O2dCQVhGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEI7O0lBV0Qsa0JBQUM7Q0FiRDs7Ozs7OztJQ01nRFAsOENBQXVDO0lBYXJGO1FBQUEsaUJBR0M7UUFGQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsUUFBQSxpQkFBTyxTQUFDOztLQUNUOzs7O0lBRVMsOENBQVM7OztJQUFuQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQzs7UUFFcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJUSxpQkFBdUIsQ0FDdkMsSUFBSSxDQUFDLEdBQUcsRUFDUixTQUFTLEVBQ1QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7O1FBR0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0tBQ3RDOzs7OztJQUVNLHNEQUFpQjs7OztJQUF4QixVQUF5QixNQUFjO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztLQUN0Qzs7Z0JBM0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsMEJBQTBCLEdBQUEsQ0FBQyxFQUFFLENBQUM7aUJBQ3BHOzs7O3NCQUtFLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUVMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQWdDUixpQ0FBQztDQUFBLENBMUMrQyxjQUFjOzs7Ozs7O0lDQXJCUix1Q0FBa0M7SUFJekU7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFEQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7O0tBQ2hEOzs7O0lBRVMsaURBQW1COzs7SUFBN0I7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJUyxVQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Qzs7OztJQUVTLHVDQUFTOzs7SUFBbkI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7O0tBRTlDOztnQkFyQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixHQUFBLENBQUMsRUFBRSxDQUFDO2lCQUMvRjs7Ozt1QkFHRSxLQUFLOztJQWlCUiwwQkFBQztDQUFBLENBbkJ3QyxnQkFBZ0I7Ozs7Ozs7SUNBaEJULHVDQUFrQztJQUt6RTtRQUFBLFlBQ0UsaUJBQU8sU0FFUjtRQURDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7S0FDaEQ7Ozs7SUFFUyxpREFBbUI7OztJQUE3QjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUlVLFVBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEQ7Ozs7SUFFUyx1Q0FBUzs7O0lBQW5CO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOztLQUU5Qzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsR0FBQSxDQUFDLEVBQUUsQ0FBQztpQkFDL0Y7Ozs7dUJBR0UsS0FBSzs0QkFDTCxLQUFLOztJQWlCUiwwQkFBQztDQUFBLENBcEJ3QyxnQkFBZ0I7Ozs7Ozs7SUNDZFYseUNBQW1CO0lBSjlEO1FBQUEscUVBaUJDO1FBWlMsWUFBTSxHQUFHLElBQUlXLFlBQWtCLEVBQUUsQ0FBQzs7S0FZM0M7Ozs7SUFWaUIsK0NBQWU7OztJQUEvQjs7OztnQkFDRSxzQkFBTyxJQUFJLE9BQU8sQ0FBaUIsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDakQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxVQUFBLEtBQUs7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDaEIsRUFDRCxTQUFTLEVBQ1QsTUFBTSxDQUNQLENBQUM7cUJBQ0gsQ0FBQyxFQUFDOzs7S0FDSjs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsR0FBQSxDQUFDLEVBQUUsQ0FBQztpQkFDakc7O0lBY0QsNEJBQUM7Q0FBQSxDQWIwQyxtQkFBbUI7Ozs7Ozs7SUNEckJYLHVDQUFrQztJQU16RTtRQUFBLFlBQ0UsaUJBQU8sU0FFUjtRQURDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7S0FDaEQ7Ozs7SUFFUyxpREFBbUI7OztJQUE3QjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUlZLFVBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4RTs7OztJQUVTLHVDQUFTOzs7SUFBbkI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7O0tBRTlDOztnQkF2QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixHQUFBLENBQUMsRUFBRSxDQUFDO2lCQUMvRjs7Ozt3QkFHRSxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzs7SUFpQlIsMEJBQUM7Q0FBQSxDQXJCd0MsZ0JBQWdCOzs7Ozs7QUNSekQ7QUFLQTtJQXlCRSw0QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQWpCcEMsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBWVIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJWCxPQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUlPLG1CQUF1QixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzNEOzs7OztJQVhELHFDQUFROzs7O0lBRFIsVUFDUyxLQUFLO1FBQ2IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsc0JBQVksc0NBQU07Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1NBQ3JDOzs7T0FBQTs7OztJQU9ELDRDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUlLLEtBQVcsQ0FBRSxRQUFRLENBQUUsQ0FBQztLQUNyRDs7OztJQUVPLGlEQUFvQjs7O0lBQTVCOzs7O1lBR1EsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTtRQUN2QyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDM0Q7Ozs7SUFFRCx5Q0FBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7S0FDdEM7Ozs7SUFFRCx5Q0FBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDO0tBQzNDOzs7OztJQUVELHNEQUF5Qjs7OztJQUF6QixVQUEwQixLQUFLOzs7WUFFdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVzs7WUFDL0IsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTtRQUN2QyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFOztZQUV6RSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ3RDO0tBQ0Y7Ozs7SUFFRCwyQ0FBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUlYLGVBQW1CLENBQUM7WUFDdEMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1FBRy9CLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFFLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQjNDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7S0FFdEM7Ozs7SUFFRCwyQ0FBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUlVLFlBQWdCLENBQUUsUUFBUSxDQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDOUI7Ozs7SUFFRCx1Q0FBVTs7O0lBQVY7O1lBQ1EsUUFBUSxHQUFHLElBQUlFLFdBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7O1lBQ3pDLFFBQVEsR0FBRyxJQUFJQyxtQkFBeUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUlDLElBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOzs7O0lBRUQsb0NBQU87OztJQUFQO1FBQUEsaUJBWUM7UUFYQyxNQUFNLENBQUMscUJBQXFCLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLEVBQUUsR0FBQSxDQUFDLENBQUM7Ozs7Ozs7O1FBUW5ELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOztnQkE5SUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixnSEFBMEM7O2lCQUUzQzs7O2dCQVRvRCxVQUFVOzs7NEJBVzVELFNBQVMsU0FBQyxRQUFROzJCQVVsQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQStIM0MseUJBQUM7Q0EvSUQ7Ozs7OztBQ0xBO0FBaUJBOztJQUFBO0tBcUMrQjs7Z0JBckM5QixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1osc0JBQXNCO3dCQUN0QixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLDBCQUEwQjt3QkFDMUIsc0JBQXNCO3dCQUN0QixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asc0JBQXNCO3dCQUN0QixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsV0FBVzt3QkFDWCxXQUFXO3dCQUNYLDBCQUEwQjt3QkFDMUIsc0JBQXNCO3dCQUN0QixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3FCQUNuQjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtvQkFDYixlQUFlLEVBQUU7d0JBQ2Ysc0JBQXNCO3FCQUN2QjtpQkFDRjs7SUFDNkIscUJBQUM7Q0FyQy9COzs7Ozs7Ozs7Ozs7OzsifQ==