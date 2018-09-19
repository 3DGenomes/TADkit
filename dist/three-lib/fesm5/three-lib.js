import { Injectable, ContentChildren, Input, Component, ViewChild, NgModule, HostListener, Directive, Pipe, defineInjectable, forwardRef } from '@angular/core';
import { __extends, __awaiter, __generator } from 'tslib';
import { Object3D, WebGLRenderer, Scene, PerspectiveCamera, OrbitControls, Color, BoxGeometry, MeshBasicMaterial, Mesh, ColladaLoader, OBJLoader, MTLLoader, ObjectLoader, PCFSoftShadowMap, AxesHelper, GridHelper, PointLight } from 'three-full';
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
                },] },
    ];
    /** @nocollapse */
    ThreeLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ ThreeLibService.ngInjectableDef = defineInjectable({ factory: function ThreeLibService_Factory() { return new ThreeLibService(); }, token: ThreeLibService, providedIn: "root" });
    return ThreeLibService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
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
                },] },
    ];
    /** @nocollapse */
    SceneDirective.ctorParameters = function () { return []; };
    return SceneDirective;
}(AbstractObject3D));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var  
// unsupported: template constraints.
/**
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
        this.renderer.setPixelRatio(devicePixelRatio);
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
                },] },
    ];
    /** @nocollapse */
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
         * \@example This property can be used to restrict the orbit controls (i.e. the
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
                },] },
    ];
    /** @nocollapse */
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
    function AbstractModelLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Flag to signal whether the parent class instance AbstractObject3D called the
         * overwritten method {\@link ModelLoaderDirective#afterInit} yet.
         *
         * Unless that method was called, no methods and properties of {\@link AbstractObject3D}
         * may be safely accessed, especially {\@link AbstractObject3D#addChild} and
         * {\@link AbstractObject3D.renderer}.
         */
        _this.parentInitialized = false;
        return _this;
    }
    Object.defineProperty(AbstractModelLoader.prototype, "model", {
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
                },] },
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
                },] },
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
                },] },
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
                },] },
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
                },] },
    ];
    /** @nocollapse */
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
                },] },
    ];
    /** @nocollapse */
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
                },] },
    ];
    /** @nocollapse */
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
                },] },
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
                },] },
    ];
    /** @nocollapse */
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
var ThreeTestComponent = /** @class */ (function () {
    function ThreeTestComponent() {
        this.renderer = new WebGLRenderer;
        this.scene = null;
        this.camera = null;
        this.mesh = null;
        this.controls = null;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new OrbitControls(this.camera);
    }
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
        this.configCamera();
        this.configRenderer();
        this.configControls();
        this.createMesh();
        this.animate();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configCamera = /**
     * @return {?}
     */
    function () {
        this.camera.position.set(300, 300, 300);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configRenderer = /**
     * @return {?}
     */
    function () {
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(new Color('hsl(0, 0%, 10%)'));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.domElement.style.display = 'block';
        this.renderer.domElement.style.margin = 'auto';
        console.log(this.canvas.clientWidth);
        console.log(this.canvas.clientHeight);
        // this.canvas.appendChild(this.renderer.domElement);
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.configControls = /**
     * @return {?}
     */
    function () {
        this.controls.autoRotate = true;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.update();
    };
    /**
     * @return {?}
     */
    ThreeTestComponent.prototype.createMesh = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var geometry = new BoxGeometry(200, 200, 200);
        /** @type {?} */
        var material = new MeshBasicMaterial({ color: 0xff7f50 });
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
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };
    ThreeTestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'three-test',
                    template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                    styles: ["canvas{width:100%;height:100%}"]
                },] },
    ];
    /** @nocollapse */
    ThreeTestComponent.ctorParameters = function () { return []; };
    ThreeTestComponent.propDecorators = {
        canvasRef: [{ type: ViewChild, args: ['canvas',] }]
    };
    return ThreeTestComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ThreeLibModule = /** @class */ (function () {
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
                },] },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL2Fic3RyYWN0LW1vZGVsLWxvYWRlci50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9yYWQyZGVnLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcGlwZXMvZGVnMnJhZC5waXBlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE9iamVjdDNEPFQgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RPYmplY3QzRCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgY2hpbGROb2RlczogUXVlcnlMaXN0PEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+PjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVYOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVo6IG51bWJlcjtcblxuICBASW5wdXQoKSB0cmFuc2xhdGVYOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVk6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWjogbnVtYmVyO1xuXG4gIHByaXZhdGUgb2JqZWN0OiBUO1xuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLm9iamVjdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtdXN0UmVyZW5kZXIgPSBmYWxzZTtcblxuICAgIGlmIChbJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoWyd0cmFuc2xhdGVYJywgJ3RyYW5zbGF0ZVknLCAndHJhbnNsYXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobXVzdFJlcmVuZGVyKSB7XG4gICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RPYmplY3QzRC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLm9iamVjdCA9IHRoaXMubmV3T2JqZWN0M0RJbnN0YW5jZSgpO1xuXG4gICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5jaGlsZE5vZGVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5maWx0ZXIoaSA9PiBpICE9PSB0aGlzICYmIGkuZ2V0T2JqZWN0KCkgIT09IHVuZGVmaW5lZCkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJBZGQgY2hpbGQgZm9yIFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaS5nZXRPYmplY3QoKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJObyBjaGlsZCBPYmplY3QzRCBmb3I6IFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmFmdGVySW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVJvdGF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuZ2xlcyA9IFtcbiAgICAgIHRoaXMucm90YXRlWCxcbiAgICAgIHRoaXMucm90YXRlWSxcbiAgICAgIHRoaXMucm90YXRlWlxuICAgIF0ubWFwKGFuZ2xlID0+IGFuZ2xlIHx8IDApO1xuXG4gICAgdGhpcy5vYmplY3Qucm90YXRpb24uc2V0KFxuICAgICAgdGhpcy5yb3RhdGVYIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWiB8fCAwLFxuICAgICAgJ1hZWidcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRyYW5zbGF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLnNldChcbiAgICAgIHRoaXMudHJhbnNsYXRlWCB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVZIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVogfHwgMFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LmFkZChvYmplY3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZUNoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5yZW1vdmUob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMub2JqZWN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IG5ld09iamVjdDNESW5zdGFuY2UoKTogVDtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtc2NlbmUnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNjZW5lRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBTY2VuZURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuU2NlbmU+IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5TY2VuZSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlNjZW5lKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q2FtZXJhPFQgZXh0ZW5kcyBUSFJFRS5DYW1lcmE+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY2FtZXJhOiBUO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdENhbWVyYS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpO1xuXG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEhvc3RMaXN0ZW5lcixcbiAgUXVlcnlMaXN0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS13ZWJnbC1yZW5kZXJlcicsXG4gIHRlbXBsYXRlOiBgPGNhbnZhcyAjY2FudmFzPlxuPC9jYW52YXM+YCxcbiAgc3R5bGVzOiBbYGNhbnZhc3t3aWR0aDoxMDAlO2hlaWdodDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFdlYkdMUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBwcml2YXRlIHZpZXdJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpXG4gIHByaXZhdGUgY2FudmFzUmVmOiBFbGVtZW50UmVmOyAvLyBOT1RFOiBzYXkgYnllLWJ5ZSB0byBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgOylcblxuICBAQ29udGVudENoaWxkcmVuKFNjZW5lRGlyZWN0aXZlKSBzY2VuZUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTY2VuZURpcmVjdGl2ZT47IC8vIFRPRE86IE11bHRpcGxlIHNjZW5lc1xuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhKSBjYW1lcmFDb21wb25lbnRzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47IC8vIFRPRE86IE11bHRpcGxlIGNhbWVyYXNcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuY29uc3RydWN0b3InKTtcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0UmVuZGVyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlbmRlciBwYW5lIG9uIHdoaWNoIHRoZSBzY2VuZSBpcyByZW5kZXJlZC5cbiAgICogQ3VycmVudGx5LCBvbmx5IHRoZSBXZWJHTCByZW5kZXJlciB3aXRoIGEgY2FudmFzIGlzIHVzZWQgaW4gdGhpc1xuICAgKiBpbXBsZW1lbnRhdGlvbiwgc28gdGhpcyBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSBhbiBFbGVtZW50UmVmIHRvIHRoZVxuICAgKiB1bmRlcmx5aW5nIDxjYW52YXM+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtyb3RhdGVTcGVlZF09MSBbem9vbVNwZWVkXT0xLjIgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJQYW5lKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0UmVuZGVyaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5zdGFydFJlbmRlcmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKGRldmljZVBpeGVsUmF0aW8pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweGZmZmZmZiwgMSk7XG4gICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIC8vIGlmICh0aGlzLnNjZW5lQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5zY2VuZUNvbXBvbmVudHMubGVuZ3RoID09IDEgJiZcbiAgICAvLyAgICAgdGhpcy5jYW1lcmFDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNhbWVyYUNvbXBvbmVudHMubGVuZ3RoID09IDEpIHtcbiAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgIGNvbnN0IHNjZW5lQ29tcG9uZW50ID0gdGhpcy5zY2VuZUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICBjb25zdCBjYW1lcmFDb21wb25lbnQgPSB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZmlyc3Q7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJlbmRlclwiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNjZW5lLmdldE9iamVjdCgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNhbWVyYS5jYW1lcmEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmVDb21wb25lbnQuZ2V0T2JqZWN0KCksIGNhbWVyYUNvbXBvbmVudC5jYW1lcmEpO1xuICAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk6IG51bWJlciB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQub25SZXNpemU6ICcgKyB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCArICcsICcgKyB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKSB7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5jYWxjdWxhdGVBc3BlY3RSYXRpbygpO1xuICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5mb3JFYWNoKGNhbWVyYSA9PiBjYW1lcmEudXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0KSk7XG4gIH1cblxuICAvKlxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlwcmVzcycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJvbktleVByZXNzOiBcIiArIGV2ZW50LmtleSk7XG4gIH1cbiovXG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLFxuICAgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb3JiaXQtY29udHJvbHMnXG59KVxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZENhbWVyYXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjtcbiAgQENvbnRlbnRDaGlsZHJlbihXZWJHTFJlbmRlcmVyQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkUmVuZGVyZXJzOiBRdWVyeUxpc3Q8V2ViR0xSZW5kZXJlckNvbXBvbmVudD47XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCBvbiB3aG9zZSBuYXRpdmUgZWxlbWVudCB0aGUgb3JiaXQgY29udHJvbHMgd2lsbCBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IGtleWJvYXJkIGV2ZW50cyBhcmUgc3RpbGwgbGlzdGVuZWQgZm9yIG9uIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdCwgdGhpcyBpc1xuICAgKiBhIGtub3duIGlzc3VlIGZyb20gVGhyZWUuanM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xMDMxNVxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBASW5wdXQoKSBsaXN0ZW5pbmdDb250cm9sRWxlbWVudDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSByb3RhdGVTcGVlZCA9IDEuMDtcbiAgQElucHV0KCkgem9vbVNwZWVkID0gMS4yO1xuXG4gIHByaXZhdGUgY29udHJvbHM6IFRIUkVFLk9yYml0Q29udHJvbHM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBJZiB0aGUgVEhSRUUuanMgT3JiaXRDb250cm9scyBhcmUgbm90IHNldCB1cCB5ZXQsIHdlIGRvIG5vdCBuZWVkIHRvIHVwZGF0ZVxuICAgIC8vIGFueXRoaW5nIGFzIHRoZXkgd2lsbCBwaWNrIHRoZSBuZXcgdmFsdWVzIGZyb20gdGhlIEBJbnB1dCBwcm9wZXJ0aWVzIGF1dG9tYXRpY2FsbHlcbiAgICAvLyB1cG9uIGNyZWF0aW9uLlxuICAgIGlmICghdGhpcy5jb250cm9scykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydyb3RhdGVTcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3pvb21TcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQnXSkge1xuICAgICAgLy8gVGhlIERPTSBlbGVtZW50IHRoZSBPcmJpdENvbnRyb2xzIGxpc3RlbiBvbiBjYW5ub3QgYmUgY2hhbmdlZCBvbmNlIGFuXG4gICAgICAvLyBPcmJpdENvbnRyb2xzIG9iamVjdCBpcyBjcmVhdGVkLiBXZSB0aHVzIG5lZWQgdG8gcmVjcmVhdGUgaXQuXG4gICAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFVwT3JiaXRDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoXG4gICAgICB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdC5jYW1lcmEsXG4gICAgICB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50ICYmIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICk7XG4gICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKTtcbiAgICB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIGlmICh0aGlzLmNoaWxkQ2FtZXJhcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FtZXJhIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGlsZFJlbmRlcmVycyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlciBpcyBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuLyoqXG4gKiBIZWxwZXIgcGFyZW50IGNsYXNzIGZvciBtb2RlbCBsb2FkZXIgZGlyZWN0aXZlcy5cbiAqXG4gKiBAc2VlIE9iamVjdExvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBPYmpMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNb2RlbExvYWRlciBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9tb2RlbDogc3RyaW5nO1xuICBwcml2YXRlIF9yZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogRmxhZyB0byBzaWduYWwgd2hldGhlciB0aGUgcGFyZW50IGNsYXNzIGluc3RhbmNlIEFic3RyYWN0T2JqZWN0M0QgY2FsbGVkIHRoZVxuICAgKiBvdmVyd3JpdHRlbiBtZXRob2Qge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlI2FmdGVySW5pdH0geWV0LlxuICAgKlxuICAgKiBVbmxlc3MgdGhhdCBtZXRob2Qgd2FzIGNhbGxlZCwgbm8gbWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRH1cbiAgICogbWF5IGJlIHNhZmVseSBhY2Nlc3NlZCwgZXNwZWNpYWxseSB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRCNhZGRDaGlsZH0gYW5kXG4gICAqIHtAbGluayBBYnN0cmFjdE9iamVjdDNELnJlbmRlcmVyfS5cbiAgICovXG4gIHByaXZhdGUgcGFyZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY3VycmVudExvYWRlZE1vZGVsT2JqZWN0OiBUSFJFRS5PYmplY3QzRCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogTG9hZCB0aGUgbW9kZWwgb2JqZWN0LlxuICAgKlxuICAgKiBTb21lIGxvYWRlcnMgKGUuZy4gQ29sbGFkYUxvYWRlcikgYWxzbyBwcm92aWRlIG90aGVyIG1vZGVsIGluZm9ybWF0aW9uXG4gICAqIHVwb24gbG9hZGluZyBiZXNpZGVzIHRoZSBcInJhd1wiIG1vZGVsIG9iamVjdC9zY2VuZS4gSW4gdGhlc2UgY2FzZXNcbiAgICogaW1wbGVtZW50aW5nIGNoaWxkIGNsYXNzZXMgYXJlIGluZGVlZCBzdXBwb3NlZCB0byByZXR1cm4gdGhlIFwicmF3XCIgbW9kZWxcbiAgICogb2JqZWN0LlxuICAgKiBUaGUgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkksIGFsdGhvdWdoIGNoaWxkIGNsYXNzZXMgYXJlIGZyZWUgdG8gaW1wbGVtZW50XG4gICAqIG90aGVyIG1lYW5zIGFzIHdlbGwpIGZyb20gd2hpY2ggdGhlIG1vZGVsIHNoYWxsIGJlIGxvYWRlZCBjYW4gYmUgb2J0YWluZWQgYnlcbiAgICoge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlLm1vZGVsfS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKTogUHJvbWlzZTxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIFRoZSBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqIFNldHRpbmdzIHRoaXMgcHJvcGVydHkgb25seSBoaWRlcyB0aGUgcHJldmlvdXMgbW9kZWwgdXBvbiBzdWNjZXNzZnVsXG4gICAqIGxvYWRpbmcgb2YgdGhlIG5ldyBvbmUuIFRoaXMgZXNwZWNpYWxseSBtZWFucyB0aGF0IGlmIHRoZSBuZXcgZGF0YSBzb3VyY2VcbiAgICogaXMgaW52YWxpZCwgdGhlIG9sZCBtb2RlbCB3aWxsICpub3QqIGJlIHJlbW92ZWQgZnJvbSB0aGUgc2NlbmUuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1vZGVsKG5ld01vZGVsVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG5ld01vZGVsVXJsO1xuXG4gICAgLy8gRGVsYXkgbW9kZWwgbG9hZGluZyB1bnRpbCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLFxuICAgIC8vIHNvIHRoYXQgd2UgY2FuIGNhbGwgYWRkQ2hpbGQoKS5cbiAgICBpZiAoIXRoaXMucGFyZW50SW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRNb2RlbE9iamVjdCgpLnRoZW4obmV3TW9kZWwgPT4ge1xuICAgICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCA9IG5ld01vZGVsO1xuICAgICAgdGhpcy5hZGRDaGlsZChuZXdNb2RlbCk7XG5cbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcmVuZGVyZXIobmV3UmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IG5ld1JlbmRlcmVyO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIGdldCByZW5kZXJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCkge1xuICAgIHRoaXMucGFyZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgLy8gVHJpZ2dlciBtb2RlbCBhY3F1aXNpdGlvbiBub3cgdGhhdCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLlxuICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gICAgc3VwZXIucmVyZW5kZXIoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWNvbGxhZGEtbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLkNvbGxhZGFMb2FkZXIoKTtcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbC5zY2VuZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgZm9yIGVtcGxveWluZyBUSFJFRS5PQkpMb2FkZXIgdG8gbG9hZCBbV2F2ZWZyb250ICoub2JqIGZpbGVzXVsxXS5cbiAqXG4gKiBbMV06IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dhdmVmcm9udF8ub2JqX2ZpbGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb2JqLWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT2JqTG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBPYmpMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuT0JKTG9hZGVyKCk7XG4gIHByaXZhdGUgbXRsTG9hZGVyID0gbmV3IFRIUkVFLk1UTExvYWRlcigpO1xuXG4gIEBJbnB1dCgpXG4gIG1hdGVyaWFsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdGV4dHVyZVBhdGg6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIC8vIFRPRE86IG1ha2UgaXQgbmljZXJcbiAgICBpZiAodGhpcy5tYXRlcmlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgIH0sXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHJlamVjdFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50ZXh0dXJlUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5tdGxMb2FkZXIuc2V0VGV4dHVyZVBhdGgodGhpcy50ZXh0dXJlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tdGxMb2FkZXIubG9hZCh0aGlzLm1hdGVyaWFsLCBtYXRlcmlhbCA9PiB7XG4gICAgICAgICAgbWF0ZXJpYWwucHJlbG9hZCgpO1xuICAgICAgICAgIHRoaXMubG9hZGVyLnNldE1hdGVyaWFscyhtYXRlcmlhbCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAncmFkMmRlZydcbn0pXG5leHBvcnQgY2xhc3MgUmFkMkRlZ1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAvKipcbiAgICogQ29udmVydHMgcmFkaWFucyB0byBkZWdyZWVzXG4gICAqIEBwYXJhbSByYWRpYW5zIFJhZGlhbnNcbiAgICovXG4gIHRyYW5zZm9ybShyYWRpYW5zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiByYWRpYW5zICogKDE4MCAvIE1hdGguUEkpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZGVnMnJhZCdcbn0pXG5leHBvcnQgY2xhc3MgRGVnMlJhZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAvKipcbiAgICogQ29udmVydHMgZGVncmVlcyB0byByYWRpYW5zXG4gICAqIEBwYXJhbSBkZWdyZWUgRGVncmVlc1xuICAgKi9cbiAgdHJhbnNmb3JtKGRlZ3JlZXM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIChkZWdyZWVzIC8gMTgwKSAqIE1hdGguUEk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4vYWJzdHJhY3QtY2FtZXJhJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1wZXJzcGVjdGl2ZS1jYW1lcmEnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0Q2FtZXJhLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdENhbWVyYTxUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYT4ge1xuXG4gIC8vIEBJbnB1dCgpIGNhbWVyYVRhcmdldDogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgQElucHV0KCkgZm92OiBudW1iZXI7XG4gIEBJbnB1dCgpIG5lYXI6IG51bWJlcjtcbiAgQElucHV0KCkgZmFyOiBudW1iZXI7XG5cbiAgQElucHV0KCkgcG9zaXRpb25YOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWTogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblo6IG51bWJlcjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBsZXQgYXNwZWN0UmF0aW8gPSB1bmRlZmluZWQ7IC8vIFVwZGF0ZWQgbGF0ZXJcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgIHRoaXMuZm92LFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5uZWFyLFxuICAgICAgdGhpcy5mYXJcbiAgICApO1xuXG4gICAgLy8gU2V0IHBvc2l0aW9uIGFuZCBsb29rIGF0XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueCA9IHRoaXMucG9zaXRpb25YO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uWTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gdGhpcy5wb3NpdGlvblo7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLnVwZGF0ZUFzcGVjdFJhdGlvOiAnICsgYXNwZWN0KTtcbiAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSBhc3BlY3Q7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtYXhlcy1oZWxwZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF4ZXNIZWxwZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIEF4ZXNIZWxwZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLkF4ZXNIZWxwZXI+IHtcblxuICBASW5wdXQoKSBzaXplOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuQXhlc0hlbHBlcih0aGlzLnNpemUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtZ3JpZC1oZWxwZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEdyaWRIZWxwZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRIZWxwZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLkF4ZXNIZWxwZXI+IHtcblxuICBASW5wdXQoKSBzaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIGRpdmlzaW9uczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLkF4ZXNIZWxwZXIge1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkdyaWRIZWxwZXIodGhpcy5zaXplLCB0aGlzLmRpdmlzaW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmplY3QtbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmplY3RMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iamVjdExvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PYmplY3RMb2FkZXIoKTtcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1wb2ludC1saWdodCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUG9pbnRMaWdodERpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRMaWdodERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuUG9pbnRMaWdodD4ge1xuXG4gIEBJbnB1dCgpIGNvbG9yOiBUSFJFRS5Db2xvcjtcbiAgQElucHV0KCkgaW50ZW5zaXR5OiBudW1iZXI7XG4gIEBJbnB1dCgpIGRpc3RhbmNlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuUG9pbnRMaWdodCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuUG9pbnRMaWdodCh0aGlzLmNvbG9yLCB0aGlzLmludGVuc2l0eSwgdGhpcy5kaXN0YW5jZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS10ZXN0JyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxjYW52YXMgI2NhbnZhcyAod2luZG93OnJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQpXCI+PC9jYW52YXM+IC0tPlxuPGNhbnZhcyAjY2FudmFzPjwvY2FudmFzPlxuYCxcbiAgc3R5bGVzOiBbYGNhbnZhc3t3aWR0aDoxMDAlO2hlaWdodDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlVGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdjYW52YXMnKSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgc2NlbmUgPSBudWxsO1xuICBjYW1lcmEgPSBudWxsO1xuICBtZXNoID0gbnVsbDtcbiAgY29udHJvbHMgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDApO1xuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY29uZmlnQ2FtZXJhKCk7XG4gICAgdGhpcy5jb25maWdSZW5kZXJlcigpO1xuICAgIHRoaXMuY29uZmlnQ29udHJvbHMoKTtcblxuICAgIHRoaXMuY3JlYXRlTWVzaCgpO1xuXG4gICAgdGhpcy5hbmltYXRlKCk7XG4gIH1cblxuICBjb25maWdDYW1lcmEoKSB7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KDMwMCwgMzAwLCAzMDApO1xuICB9XG5cbiAgY29uZmlnUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoJ2hzbCgwLCAwJSwgMTAlKScpKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnYXV0byc7XG4gICAgY29uc29sZS5sb2codGhpcy5jYW52YXMuY2xpZW50V2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgLy8gdGhpcy5jYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgfVxuXG4gIGNvbmZpZ0NvbnRyb2xzKCkge1xuICAgIHRoaXMuY29udHJvbHMuYXV0b1JvdGF0ZSA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVab29tID0gZmFsc2U7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVQYW4gID0gZmFsc2U7XG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgfVxuXG4gIGNyZWF0ZU1lc2goKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMjAwLCAyMDAsIDIwMCk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjdmNTAgfSk7XG4gICAgdGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcblxuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlKCkpO1xuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9iakxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJhZDJEZWdQaXBlIH0gZnJvbSAnLi9waXBlcy9yYWQyZGVnLnBpcGUnO1xuaW1wb3J0IHsgRGVnMlJhZFBpcGUgfSBmcm9tICcuL3BpcGVzL2RlZzJyYWQucGlwZSc7XG5pbXBvcnQgeyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSB9IGZyb20gJy4vY2FtZXJhcy9wZXJzcGVjdGl2ZS1jYW1lcmEuZGlyZWN0aXZlJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY2VuZURpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQXhlc0hlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2F4ZXMtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHcmlkSGVscGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2hlbHBlcnMvZ3JpZC1oZWxwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9iamVjdExvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvaW50TGlnaHREaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRocmVlVGVzdENvbXBvbmVudCB9IGZyb20gJy4vdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudCc7XG5cbi8vIFRPRE86IElkZWFsbHkgbW92ZSBhbGwgdG8gdGhyZWUtd3JhcHBlciBsaWJyYXJ5LiBCdXQgY2FuJ3QgbW92ZSBqcy9FbmFibGVUaHJlZUV4YW1wbGVzLmpzIHRvIGxpYnJhcnkgOihcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBPcmJpdENvbnRyb2xzRGlyZWN0aXZlLFxuICAgIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUsXG4gICAgT2JqTG9hZGVyRGlyZWN0aXZlLFxuICAgIFJhZDJEZWdQaXBlLFxuICAgIERlZzJSYWRQaXBlLFxuICAgIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLFxuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnQsXG4gICAgU2NlbmVEaXJlY3RpdmUsXG4gICAgQXhlc0hlbHBlckRpcmVjdGl2ZSxcbiAgICBHcmlkSGVscGVyRGlyZWN0aXZlLFxuICAgIE9iamVjdExvYWRlckRpcmVjdGl2ZSxcbiAgICBQb2ludExpZ2h0RGlyZWN0aXZlLFxuICAgIFRocmVlVGVzdENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiVEhSRUUuU2NlbmUiLCJUSFJFRS5XZWJHTFJlbmRlcmVyIiwiVEhSRUUuUENGU29mdFNoYWRvd01hcCIsIlRIUkVFLk9yYml0Q29udHJvbHMiLCJUSFJFRS5PYmplY3QzRCIsIlRIUkVFLkNvbGxhZGFMb2FkZXIiLCJUSFJFRS5PQkpMb2FkZXIiLCJUSFJFRS5NVExMb2FkZXIiLCJUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSIsIlRIUkVFLkF4ZXNIZWxwZXIiLCJUSFJFRS5HcmlkSGVscGVyIiwiVEhSRUUuT2JqZWN0TG9hZGVyIiwiVEhSRUUuUG9pbnRMaWdodCIsIlRIUkVFLkNvbG9yIiwiVEhSRUUuQm94R2VvbWV0cnkiLCJUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCIsIlRIUkVFLk1lc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0lBT0U7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzswQkFKRDs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztJQW1DWSxtQ0FBUTs7O0lBQWxCO0tBQ0M7Ozs7O0lBRU0sc0NBQVc7Ozs7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