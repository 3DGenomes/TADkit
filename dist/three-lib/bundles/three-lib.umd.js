(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('three-full'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('three-lib', ['exports', '@angular/core', 'three-full', '@angular/common'], factory) :
    (factory((global['three-lib'] = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,i0,THREE,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ThreeLibService = /** @class */ (function () {
        function ThreeLibService() {
        }
        ThreeLibService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        ThreeLibService.ctorParameters = function () { return []; };
        /** @nocollapse */ ThreeLibService.ngInjectableDef = i0.defineInjectable({ factory: function ThreeLibService_Factory() { return new ThreeLibService(); }, token: ThreeLibService, providedIn: "root" });
        return ThreeLibService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [0, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

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
            childNodes: [{ type: i0.ContentChildren, args: [AbstractObject3D, { descendants: false },] }],
            rotateX: [{ type: i0.Input }],
            rotateY: [{ type: i0.Input }],
            rotateZ: [{ type: i0.Input }],
            translateX: [{ type: i0.Input }],
            translateY: [{ type: i0.Input }],
            translateZ: [{ type: i0.Input }]
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
                return new THREE.Scene();
            };
        SceneDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: 'three-scene',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return SceneDirective; }) }]
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
             */ function () {
                return this.canvasRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebGLRendererComponent.prototype, "canvas", {
            get: /**
             * @return {?}
             */ function () {
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
                this.renderer = new THREE.WebGLRenderer({
                    canvas: this.canvas,
                    antialias: true
                });
                this.renderer.setPixelRatio(devicePixelRatio);
                this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
            { type: i0.Component, args: [{
                        selector: 'three-webgl-renderer',
                        template: "<canvas #canvas>\n</canvas>",
                        styles: ["canvas{width:100%;height:100%}"]
                    },] },
        ];
        /** @nocollapse */
        WebGLRendererComponent.ctorParameters = function () { return []; };
        WebGLRendererComponent.propDecorators = {
            canvasRef: [{ type: i0.ViewChild, args: ['canvas',] }],
            sceneComponents: [{ type: i0.ContentChildren, args: [SceneDirective,] }],
            cameraComponents: [{ type: i0.ContentChildren, args: [AbstractCamera,] }],
            onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
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
                this.controls = new THREE.OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
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
            { type: i0.Directive, args: [{
                        selector: 'three-orbit-controls'
                    },] },
        ];
        /** @nocollapse */
        OrbitControlsDirective.ctorParameters = function () { return []; };
        OrbitControlsDirective.propDecorators = {
            childCameras: [{ type: i0.ContentChildren, args: [AbstractCamera, { descendants: true },] }],
            childRenderers: [{ type: i0.ContentChildren, args: [WebGLRendererComponent, { descendants: true },] }],
            listeningControlElement: [{ type: i0.Input }],
            rotateSpeed: [{ type: i0.Input }],
            zoomSpeed: [{ type: i0.Input }]
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
             */ function () {
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
             */ function (newModelUrl) {
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
             */ function () {
                return this._renderer;
            },
            set: /**
             * @param {?} newRenderer
             * @return {?}
             */ function (newRenderer) {
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
                return new THREE.Object3D();
            };
        AbstractModelLoader.propDecorators = {
            model: [{ type: i0.Input }],
            renderer: [{ type: i0.Input }]
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
            _this.loader = new THREE.ColladaLoader();
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
            { type: i0.Directive, args: [{
                        selector: 'three-collada-loader',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return ColladaLoaderDirective; }) }]
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
            _this.loader = new THREE.OBJLoader();
            _this.mtlLoader = new THREE.MTLLoader();
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
            { type: i0.Directive, args: [{
                        selector: 'three-obj-loader',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return ObjLoaderDirective; }) }]
                    },] },
        ];
        ObjLoaderDirective.propDecorators = {
            material: [{ type: i0.Input }],
            texturePath: [{ type: i0.Input }]
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
            { type: i0.Pipe, args: [{
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
            { type: i0.Pipe, args: [{
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
                this.camera = new THREE.PerspectiveCamera(this.fov, undefined, this.near, this.far);
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
            { type: i0.Directive, args: [{
                        selector: 'three-perspective-camera',
                        providers: [{ provide: AbstractCamera, useExisting: i0.forwardRef(function () { return PerspectiveCameraDirective; }) }]
                    },] },
        ];
        /** @nocollapse */
        PerspectiveCameraDirective.ctorParameters = function () { return []; };
        PerspectiveCameraDirective.propDecorators = {
            fov: [{ type: i0.Input }],
            near: [{ type: i0.Input }],
            far: [{ type: i0.Input }],
            positionX: [{ type: i0.Input }],
            positionY: [{ type: i0.Input }],
            positionZ: [{ type: i0.Input }]
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
                return new THREE.AxesHelper(this.size);
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
            { type: i0.Directive, args: [{
                        selector: 'three-axes-helper',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return AxesHelperDirective; }) }]
                    },] },
        ];
        /** @nocollapse */
        AxesHelperDirective.ctorParameters = function () { return []; };
        AxesHelperDirective.propDecorators = {
            size: [{ type: i0.Input }]
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
                return new THREE.GridHelper(this.size, this.divisions);
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
            { type: i0.Directive, args: [{
                        selector: 'three-grid-helper',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return GridHelperDirective; }) }]
                    },] },
        ];
        /** @nocollapse */
        GridHelperDirective.ctorParameters = function () { return []; };
        GridHelperDirective.propDecorators = {
            size: [{ type: i0.Input }],
            divisions: [{ type: i0.Input }]
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
            _this.loader = new THREE.ObjectLoader();
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
            { type: i0.Directive, args: [{
                        selector: 'three-object-loader',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return ObjectLoaderDirective; }) }]
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
                return new THREE.PointLight(this.color, this.intensity, this.distance);
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
            { type: i0.Directive, args: [{
                        selector: 'three-point-light',
                        providers: [{ provide: AbstractObject3D, useExisting: i0.forwardRef(function () { return PointLightDirective; }) }]
                    },] },
        ];
        /** @nocollapse */
        PointLightDirective.ctorParameters = function () { return []; };
        PointLightDirective.propDecorators = {
            color: [{ type: i0.Input }],
            intensity: [{ type: i0.Input }],
            distance: [{ type: i0.Input }]
        };
        return PointLightDirective;
    }(AbstractObject3D));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ThreeTestComponent = /** @class */ (function () {
        function ThreeTestComponent() {
            this.renderer = new THREE.WebGLRenderer;
            this.scene = null;
            this.camera = null;
            this.mesh = null;
            this.controls = null;
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            this.controls = new THREE.OrbitControls(this.camera);
        }
        Object.defineProperty(ThreeTestComponent.prototype, "canvas", {
            get: /**
             * @return {?}
             */ function () {
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
                this.renderer = new THREE.WebGLRenderer({
                    canvas: this.canvas,
                    antialias: true
                });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setClearColor(new THREE.Color('hsl(0, 0%, 10%)'));
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
                var geometry = new THREE.BoxGeometry(200, 200, 200);
                /** @type {?} */
                var material = new THREE.MeshBasicMaterial({ color: 0xff7f50 });
                this.mesh = new THREE.Mesh(geometry, material);
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
            { type: i0.Component, args: [{
                        selector: 'three-test',
                        template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                        styles: ["canvas{width:100%;height:100%}"]
                    },] },
        ];
        /** @nocollapse */
        ThreeTestComponent.ctorParameters = function () { return []; };
        ThreeTestComponent.propDecorators = {
            canvasRef: [{ type: i0.ViewChild, args: ['canvas',] }]
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
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.ThreeLibService = ThreeLibService;
    exports.WebGLRendererComponent = WebGLRendererComponent;
    exports.OrbitControlsDirective = OrbitControlsDirective;
    exports.ColladaLoaderDirective = ColladaLoaderDirective;
    exports.ObjLoaderDirective = ObjLoaderDirective;
    exports.Rad2DegPipe = Rad2DegPipe;
    exports.Deg2RadPipe = Deg2RadPipe;
    exports.PerspectiveCameraDirective = PerspectiveCameraDirective;
    exports.SceneDirective = SceneDirective;
    exports.AxesHelperDirective = AxesHelperDirective;
    exports.GridHelperDirective = GridHelperDirective;
    exports.ObjectLoaderDirective = ObjectLoaderDirective;
    exports.PointLightDirective = PointLightDirective;
    exports.ThreeLibModule = ThreeLibModule;
    exports.ɵb = AbstractCamera;
    exports.ɵa = AbstractObject3D;
    exports.ɵc = AbstractModelLoader;
    exports.ɵd = ThreeTestComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIuc2VydmljZS50cyIsbnVsbCwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL2Fic3RyYWN0LW1vZGVsLWxvYWRlci50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9yYWQyZGVnLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcGlwZXMvZGVnMnJhZC5waXBlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RPYmplY3QzRDxUIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0T2JqZWN0M0QsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIGNoaWxkTm9kZXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPj47XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVk6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVaOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdHJhbnNsYXRlWDogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVo6IG51bWJlcjtcblxuICBwcml2YXRlIG9iamVjdDogVDtcblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5vYmplY3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbXVzdFJlcmVuZGVyID0gZmFsc2U7XG5cbiAgICBpZiAoWydyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG11c3RSZXJlbmRlcikge1xuICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0T2JqZWN0M0QubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5vYmplY3QgPSB0aGlzLm5ld09iamVjdDNESW5zdGFuY2UoKTtcblxuICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZmlsdGVyKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmdldE9iamVjdCgpICE9PSB1bmRlZmluZWQpLmZvckVhY2goaSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkIGNoaWxkIGZvciBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKGkuZ2V0T2JqZWN0KCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gY2hpbGQgT2JqZWN0M0QgZm9yOiBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlSb3RhdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBhbmdsZXMgPSBbXG4gICAgICB0aGlzLnJvdGF0ZVgsXG4gICAgICB0aGlzLnJvdGF0ZVksXG4gICAgICB0aGlzLnJvdGF0ZVpcbiAgICBdLm1hcChhbmdsZSA9PiBhbmdsZSB8fCAwKTtcblxuICAgIHRoaXMub2JqZWN0LnJvdGF0aW9uLnNldChcbiAgICAgIHRoaXMucm90YXRlWCB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVZIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVogfHwgMCxcbiAgICAgICdYWVonXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlUcmFuc2xhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5zZXQoXG4gICAgICB0aGlzLnRyYW5zbGF0ZVggfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWSB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVaIHx8IDBcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZENoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5hZGQob2JqZWN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucmVtb3ZlKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFQge1xuICAgIHJldHVybiB0aGlzLm9iamVjdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFmdGVySW5pdCgpOiB2b2lkO1xuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXNjZW5lJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTY2VuZURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgU2NlbmVEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlNjZW5lPiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuU2NlbmUge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5TY2VuZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENhbWVyYTxUIGV4dGVuZHMgVEhSRUUuQ2FtZXJhPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIGNhbWVyYTogVDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0Q2FtZXJhLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKTtcblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBIb3N0TGlzdGVuZXIsXG4gIFF1ZXJ5TGlzdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtd2ViZ2wtcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDxjYW52YXMgI2NhbnZhcz5cbjwvY2FudmFzPmAsXG4gIHN0eWxlczogW2BjYW52YXN7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdjYW52YXMnKVxuICBwcml2YXRlIGNhbnZhc1JlZjogRWxlbWVudFJlZjsgLy8gTk9URTogc2F5IGJ5ZS1ieWUgdG8gc2VydmVyLXNpZGUgcmVuZGVyaW5nIDspXG5cbiAgQENvbnRlbnRDaGlsZHJlbihTY2VuZURpcmVjdGl2ZSkgc2NlbmVDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2NlbmVEaXJlY3RpdmU+OyAvLyBUT0RPOiBNdWx0aXBsZSBzY2VuZXNcbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSkgY2FtZXJhQ29tcG9uZW50czogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+OyAvLyBUT0RPOiBNdWx0aXBsZSBjYW1lcmFzXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LmNvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLnZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5zdGFydFJlbmRlcmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZW5kZXIgcGFuZSBvbiB3aGljaCB0aGUgc2NlbmUgaXMgcmVuZGVyZWQuXG4gICAqIEN1cnJlbnRseSwgb25seSB0aGUgV2ViR0wgcmVuZGVyZXIgd2l0aCBhIGNhbnZhcyBpcyB1c2VkIGluIHRoaXNcbiAgICogaW1wbGVtZW50YXRpb24sIHNvIHRoaXMgcHJvcGVydHkgd2lsbCBhbHdheXMgYmUgYW4gRWxlbWVudFJlZiB0byB0aGVcbiAgICogdW5kZXJseWluZyA8Y2FudmFzPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbcm90YXRlU3BlZWRdPTEgW3pvb21TcGVlZF09MS4yIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyUGFuZSgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWY7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcmluZygpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuc3RhcnRSZW5kZXJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhkZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDEpO1xuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyBpZiAodGhpcy5zY2VuZUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2NlbmVDb21wb25lbnRzLmxlbmd0aCA9PSAxICYmXG4gICAgLy8gICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYW1lcmFDb21wb25lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCBzY2VuZUNvbXBvbmVudCA9IHRoaXMuc2NlbmVDb21wb25lbnRzLmZpcnN0O1xuICAgICAgY29uc3QgY2FtZXJhQ29tcG9uZW50ID0gdGhpcy5jYW1lcmFDb21wb25lbnRzLmZpcnN0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzY2VuZS5nZXRPYmplY3QoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjYW1lcmEuY2FtZXJhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lQ29tcG9uZW50LmdldE9iamVjdCgpLCBjYW1lcmFDb21wb25lbnQuY2FtZXJhKTtcbiAgICB9XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm9uUmVzaXplOiAnICsgdGhpcy5jYW52YXMuY2xpZW50V2lkdGggKyAnLCAnICsgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCkge1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZm9yRWFjaChjYW1lcmEgPT4gY2FtZXJhLnVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdCkpO1xuICB9XG5cbiAgLypcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25LZXlQcmVzczogXCIgKyBldmVudC5rZXkpO1xuICB9XG4qL1xuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9yYml0LWNvbnRyb2xzJ1xufSlcbmV4cG9ydCBjbGFzcyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RDYW1lcmEsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRDYW1lcmFzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47XG4gIEBDb250ZW50Q2hpbGRyZW4oV2ViR0xSZW5kZXJlckNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZFJlbmRlcmVyczogUXVlcnlMaXN0PFdlYkdMUmVuZGVyZXJDb21wb25lbnQ+O1xuICAvKipcbiAgICogVGhlIGVsZW1lbnQgb24gd2hvc2UgbmF0aXZlIGVsZW1lbnQgdGhlIG9yYml0IGNvbnRyb2xzIHdpbGwgbGlzdGVuIGZvciBtb3VzZSBldmVudHMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBrZXlib2FyZCBldmVudHMgYXJlIHN0aWxsIGxpc3RlbmVkIGZvciBvbiB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QsIHRoaXMgaXNcbiAgICogYSBrbm93biBpc3N1ZSBmcm9tIFRocmVlLmpzOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTAzMTVcbiAgICpcbiAgICogQGV4YW1wbGUgVGhpcyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCB0byByZXN0cmljdCB0aGUgb3JiaXQgY29udHJvbHMgKGkuZS4gdGhlXG4gICAqIGFyZWEgd2hpY2ggaXMgbGlzdGVuZWQgZm9yIG1vdXNlIG1vdmUgYW5kIHpvb20gZXZlbnRzKSB0byB0aGUgcmVuZGVyaW5nIHBhbmU6XG4gICAqIGBgYFxuICAgKiA8dGhyZWUtb3JiaXQtY29udHJvbHMgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgQElucHV0KCkgbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgcm90YXRlU3BlZWQgPSAxLjA7XG4gIEBJbnB1dCgpIHpvb21TcGVlZCA9IDEuMjtcblxuICBwcml2YXRlIGNvbnRyb2xzOiBUSFJFRS5PcmJpdENvbnRyb2xzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gSWYgdGhlIFRIUkVFLmpzIE9yYml0Q29udHJvbHMgYXJlIG5vdCBzZXQgdXAgeWV0LCB3ZSBkbyBub3QgbmVlZCB0byB1cGRhdGVcbiAgICAvLyBhbnl0aGluZyBhcyB0aGV5IHdpbGwgcGljayB0aGUgbmV3IHZhbHVlcyBmcm9tIHRoZSBASW5wdXQgcHJvcGVydGllcyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gdXBvbiBjcmVhdGlvbi5cbiAgICBpZiAoIXRoaXMuY29udHJvbHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sncm90YXRlU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd6b29tU3BlZWQnXSkge1xuICAgICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50J10pIHtcbiAgICAgIC8vIFRoZSBET00gZWxlbWVudCB0aGUgT3JiaXRDb250cm9scyBsaXN0ZW4gb24gY2Fubm90IGJlIGNoYW5nZWQgb25jZSBhblxuICAgICAgLy8gT3JiaXRDb250cm9scyBvYmplY3QgaXMgY3JlYXRlZC4gV2UgdGh1cyBuZWVkIHRvIHJlY3JlYXRlIGl0LlxuICAgICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRVcE9yYml0Q29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKFxuICAgICAgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QuY2FtZXJhLFxuICAgICAgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudCAmJiB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApO1xuICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcik7XG4gICAgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICBpZiAodGhpcy5jaGlsZENhbWVyYXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbWVyYSBpcyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hpbGRSZW5kZXJlcnMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVuZGVyZXIgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbi8qKlxuICogSGVscGVyIHBhcmVudCBjbGFzcyBmb3IgbW9kZWwgbG9hZGVyIGRpcmVjdGl2ZXMuXG4gKlxuICogQHNlZSBPYmplY3RMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgT2JqTG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIENvbGxhZGFMb2FkZXJEaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TW9kZWxMb2FkZXIgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfbW9kZWw6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gc2lnbmFsIHdoZXRoZXIgdGhlIHBhcmVudCBjbGFzcyBpbnN0YW5jZSBBYnN0cmFjdE9iamVjdDNEIGNhbGxlZCB0aGVcbiAgICogb3ZlcndyaXR0ZW4gbWV0aG9kIHtAbGluayBNb2RlbExvYWRlckRpcmVjdGl2ZSNhZnRlckluaXR9IHlldC5cbiAgICpcbiAgICogVW5sZXNzIHRoYXQgbWV0aG9kIHdhcyBjYWxsZWQsIG5vIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2Yge0BsaW5rIEFic3RyYWN0T2JqZWN0M0R9XG4gICAqIG1heSBiZSBzYWZlbHkgYWNjZXNzZWQsIGVzcGVjaWFsbHkge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QjYWRkQ2hpbGR9IGFuZFxuICAgKiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRC5yZW5kZXJlcn0uXG4gICAqL1xuICBwcml2YXRlIHBhcmVudEluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdDogVEhSRUUuT2JqZWN0M0QgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIExvYWQgdGhlIG1vZGVsIG9iamVjdC5cbiAgICpcbiAgICogU29tZSBsb2FkZXJzIChlLmcuIENvbGxhZGFMb2FkZXIpIGFsc28gcHJvdmlkZSBvdGhlciBtb2RlbCBpbmZvcm1hdGlvblxuICAgKiB1cG9uIGxvYWRpbmcgYmVzaWRlcyB0aGUgXCJyYXdcIiBtb2RlbCBvYmplY3Qvc2NlbmUuIEluIHRoZXNlIGNhc2VzXG4gICAqIGltcGxlbWVudGluZyBjaGlsZCBjbGFzc2VzIGFyZSBpbmRlZWQgc3VwcG9zZWQgdG8gcmV0dXJuIHRoZSBcInJhd1wiIG1vZGVsXG4gICAqIG9iamVjdC5cbiAgICogVGhlIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJLCBhbHRob3VnaCBjaGlsZCBjbGFzc2VzIGFyZSBmcmVlIHRvIGltcGxlbWVudFxuICAgKiBvdGhlciBtZWFucyBhcyB3ZWxsKSBmcm9tIHdoaWNoIHRoZSBtb2RlbCBzaGFsbCBiZSBsb2FkZWQgY2FuIGJlIG9idGFpbmVkIGJ5XG4gICAqIHtAbGluayBNb2RlbExvYWRlckRpcmVjdGl2ZS5tb2RlbH0uXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCk6IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+O1xuXG4gIC8qKlxuICAgKiBUaGUgbW9kZWwgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkkpLlxuICAgKiBTZXR0aW5ncyB0aGlzIHByb3BlcnR5IG9ubHkgaGlkZXMgdGhlIHByZXZpb3VzIG1vZGVsIHVwb24gc3VjY2Vzc2Z1bFxuICAgKiBsb2FkaW5nIG9mIHRoZSBuZXcgb25lLiBUaGlzIGVzcGVjaWFsbHkgbWVhbnMgdGhhdCBpZiB0aGUgbmV3IGRhdGEgc291cmNlXG4gICAqIGlzIGludmFsaWQsIHRoZSBvbGQgbW9kZWwgd2lsbCAqbm90KiBiZSByZW1vdmVkIGZyb20gdGhlIHNjZW5lLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtb2RlbChuZXdNb2RlbFVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBuZXdNb2RlbFVybDtcblxuICAgIC8vIERlbGF5IG1vZGVsIGxvYWRpbmcgdW50aWwgdGhlIHBhcmVudCBoYXMgYmVlbiBpbml0aWFsaXplZCxcbiAgICAvLyBzbyB0aGF0IHdlIGNhbiBjYWxsIGFkZENoaWxkKCkuXG4gICAgaWYgKCF0aGlzLnBhcmVudEluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkTW9kZWxPYmplY3QoKS50aGVuKG5ld01vZGVsID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QgPSBuZXdNb2RlbDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQobmV3TW9kZWwpO1xuXG4gICAgICBpZiAodGhpcy5yZW5kZXJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbW9kZWwgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkkpLlxuICAgKi9cbiAgcHVibGljIGdldCBtb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHJlbmRlcmVyKG5ld1JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSBuZXdSZW5kZXJlcjtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpIHtcbiAgICB0aGlzLnBhcmVudEluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIC8vIFRyaWdnZXIgbW9kZWwgYWNxdWlzaXRpb24gbm93IHRoYXQgdGhlIHBhcmVudCBoYXMgYmVlbiBpbml0aWFsaXplZC5cbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcmVuZGVyKCkge1xuICAgIHN1cGVyLnJlcmVuZGVyKCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJlcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5PYmplY3QzRCB7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1jb2xsYWRhLWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5Db2xsYWRhTG9hZGVyKCk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwuc2NlbmUpO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5cbi8qKlxuICogRGlyZWN0aXZlIGZvciBlbXBsb3lpbmcgVEhSRUUuT0JKTG9hZGVyIHRvIGxvYWQgW1dhdmVmcm9udCAqLm9iaiBmaWxlc11bMV0uXG4gKlxuICogWzFdOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XYXZlZnJvbnRfLm9ial9maWxlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iai1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iakxvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqTG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9CSkxvYWRlcigpO1xuICBwcml2YXRlIG10bExvYWRlciA9IG5ldyBUSFJFRS5NVExMb2FkZXIoKTtcblxuICBASW5wdXQoKVxuICBtYXRlcmlhbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRleHR1cmVQYXRoOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGl0IG5pY2VyXG4gICAgaWYgKHRoaXMubWF0ZXJpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICByZWplY3RcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZVBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubXRsTG9hZGVyLnNldFRleHR1cmVQYXRoKHRoaXMudGV4dHVyZVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubXRsTG9hZGVyLmxvYWQodGhpcy5tYXRlcmlhbCwgbWF0ZXJpYWwgPT4ge1xuICAgICAgICAgIG1hdGVyaWFsLnByZWxvYWQoKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWwpO1xuICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3JhZDJkZWcnXG59KVxuZXhwb3J0IGNsYXNzIFJhZDJEZWdQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHJhZGlhbnMgdG8gZGVncmVlc1xuICAgKiBAcGFyYW0gcmFkaWFucyBSYWRpYW5zXG4gICAqL1xuICB0cmFuc2Zvcm0ocmFkaWFuczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcmFkaWFucyAqICgxODAgLyBNYXRoLlBJKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RlZzJyYWQnXG59KVxuZXhwb3J0IGNsYXNzIERlZzJSYWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgKiBAcGFyYW0gZGVncmVlIERlZ3JlZXNcbiAgICovXG4gIHRyYW5zZm9ybShkZWdyZWVzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoZGVncmVlcyAvIDE4MCkgKiBNYXRoLlBJO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuL2Fic3RyYWN0LWNhbWVyYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdENhbWVyYSwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RDYW1lcmE8VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE+IHtcblxuICAvLyBASW5wdXQoKSBjYW1lcmFUYXJnZXQ6IFRIUkVFLk9iamVjdDNEO1xuXG4gIEBJbnB1dCgpIGZvdjogbnVtYmVyO1xuICBASW5wdXQoKSBuZWFyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZhcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHBvc2l0aW9uWDogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblk6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25aOiBudW1iZXI7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbGV0IGFzcGVjdFJhdGlvID0gdW5kZWZpbmVkOyAvLyBVcGRhdGVkIGxhdGVyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICB0aGlzLmZvdixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMubmVhcixcbiAgICAgIHRoaXMuZmFyXG4gICAgKTtcblxuICAgIC8vIFNldCBwb3NpdGlvbiBhbmQgbG9vayBhdFxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uWDtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvblk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IHRoaXMucG9zaXRpb25aO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3Q6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS51cGRhdGVBc3BlY3RSYXRpbzogJyArIGFzcGVjdCk7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gYXNwZWN0O1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWF4ZXMtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBeGVzSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBBeGVzSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLkF4ZXNIZWxwZXIge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkF4ZXNIZWxwZXIodGhpcy5zaXplKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWdyaWQtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBHcmlkSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXZpc2lvbnM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5HcmlkSGVscGVyKHRoaXMuc2l6ZSwgdGhpcy5kaXZpc2lvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb2JqZWN0LWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT2JqZWN0TG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuT2JqZWN0TG9hZGVyKCk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5tb2RlbCwgbW9kZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHJlamVjdFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcG9pbnQtbGlnaHQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBvaW50TGlnaHREaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50TGlnaHREaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlBvaW50TGlnaHQ+IHtcblxuICBASW5wdXQoKSBjb2xvcjogVEhSRUUuQ29sb3I7XG4gIEBJbnB1dCgpIGludGVuc2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXN0YW5jZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlBvaW50TGlnaHQge1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50TGlnaHQodGhpcy5jb2xvciwgdGhpcy5pbnRlbnNpdHksIHRoaXMuZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtdGVzdCcsXG4gIHRlbXBsYXRlOiBgPCEtLSA8Y2FudmFzICNjYW52YXMgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiPjwvY2FudmFzPiAtLT5cbjxjYW52YXMgI2NhbnZhcz48L2NhbnZhcz5cbmAsXG4gIHN0eWxlczogW2BjYW52YXN7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZVRlc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzUmVmOiBFbGVtZW50UmVmO1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXI7XG4gIHNjZW5lID0gbnVsbDtcbiAgY2FtZXJhID0gbnVsbDtcbiAgbWVzaCA9IG51bGw7XG4gIGNvbnRyb2xzID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAxLCAxMDAwKTtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHModGhpcy5jYW1lcmEpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZ0NhbWVyYSgpO1xuICAgIHRoaXMuY29uZmlnUmVuZGVyZXIoKTtcbiAgICB0aGlzLmNvbmZpZ0NvbnRyb2xzKCk7XG5cbiAgICB0aGlzLmNyZWF0ZU1lc2goKTtcblxuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgY29uZmlnQ2FtZXJhKCkge1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCgzMDAsIDMwMCwgMzAwKTtcbiAgfVxuXG4gIGNvbmZpZ1JlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKCdoc2woMCwgMCUsIDEwJSknKSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIC8vIHRoaXMuY2FudmFzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIH1cblxuICBjb25maWdDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmF1dG9Sb3RhdGUgPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlUGFuICA9IGZhbHNlO1xuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gIH1cblxuICBjcmVhdGVNZXNoKCkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDIwMCwgMjAwLCAyMDApO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmY3ZjUwIH0pO1xuICAgIHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG5cbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lc2gpO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZSgpKTtcbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL2NvbGxhZGEtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmpMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSYWQyRGVnUGlwZSB9IGZyb20gJy4vcGlwZXMvcmFkMmRlZy5waXBlJztcbmltcG9ydCB7IERlZzJSYWRQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWcycmFkLnBpcGUnO1xuaW1wb3J0IHsgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgfSBmcm9tICcuL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEF4ZXNIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZEhlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmplY3QtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb2ludExpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xpZ2h0L3BvaW50LWxpZ2h0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaHJlZVRlc3RDb21wb25lbnQgfSBmcm9tICcuL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQnO1xuXG4vLyBUT0RPOiBJZGVhbGx5IG1vdmUgYWxsIHRvIHRocmVlLXdyYXBwZXIgbGlicmFyeS4gQnV0IGNhbid0IG1vdmUganMvRW5hYmxlVGhyZWVFeGFtcGxlcy5qcyB0byBsaWJyYXJ5IDooXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZUxpYk1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29udGVudENoaWxkcmVuIiwiSW5wdXQiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlRIUkVFLlNjZW5lIiwiRGlyZWN0aXZlIiwiZm9yd2FyZFJlZiIsIlRIUkVFLldlYkdMUmVuZGVyZXIiLCJUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwIiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiSG9zdExpc3RlbmVyIiwiVEhSRUUuT3JiaXRDb250cm9scyIsIlRIUkVFLk9iamVjdDNEIiwiVEhSRUUuQ29sbGFkYUxvYWRlciIsIlRIUkVFLk9CSkxvYWRlciIsIlRIUkVFLk1UTExvYWRlciIsIlBpcGUiLCJUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSIsIlRIUkVFLkF4ZXNIZWxwZXIiLCJUSFJFRS5HcmlkSGVscGVyIiwiVEhSRUUuT2JqZWN0TG9hZGVyIiwiVEhSRUUuUG9pbnRMaWdodCIsIlRIUkVFLkNvbG9yIiwiVEhSRUUuQm94R2VvbWV0cnkiLCJUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCIsIlRIUkVFLk1lc2giLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7OEJBSkQ7OztJQ0FBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7U0FDcEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJ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QUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUs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