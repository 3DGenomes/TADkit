(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('three-full'), require('@avatsaev/three-orbitcontrols-ts'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('three-lib', ['exports', '@angular/core', 'three-full', '@avatsaev/three-orbitcontrols-ts', '@angular/common'], factory) :
    (factory((global['three-lib'] = {}),global.ng.core,global.THREE,global.threeOrbitcontrolsTs,global.ng.common));
}(this, (function (exports,i0,THREE,threeOrbitcontrolsTs,common) { 'use strict';

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
                    },] }
        ];
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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
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
    var /**
     * @abstract
     * @template T
     */ AbstractCamera = /** @class */ (function () {
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
                this.renderer.setPixelRatio(window.devicePixelRatio);
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
                    }] }
        ];
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
                this.controls = new threeOrbitcontrolsTs.OrbitControls(this.childCameras.first.camera, this.listeningControlElement && this.listeningControlElement.nativeElement);
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
                    },] }
        ];
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
                    },] }
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
            { type: i0.Pipe, args: [{
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
                    },] }
        ];
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
                    },] }
        ];
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
                    },] }
        ];
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
                    },] }
        ];
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
    // import { CameraControls } from 'camera-controls';
    var ThreeTestComponent = /** @class */ (function () {
        function ThreeTestComponent() {
            this.renderer = new THREE.WebGLRenderer;
            this.scene = null;
            this.camera = null;
            this.controls = null;
            this.mesh = null;
            this.light = null;
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
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
        ThreeTestComponent.prototype.calculateAspectRatio = /**
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
                this.scene.background = new THREE.Color(0xdddddd);
            };
        /**
         * @return {?}
         */
        ThreeTestComponent.prototype.configCamera = /**
         * @return {?}
         */
            function () {
                this.camera.aspect = this.calculateAspectRatio();
                this.camera.updateProjectionMatrix();
                this.camera.position.set(-15, 10, 15);
                this.camera.lookAt(this.scene.position);
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
                    antialias: true,
                    alpha: true
                });
                this.renderer.setPixelRatio(devicePixelRatio);
                // setClearColor for transparent background
                // i.e. scene or canvas background shows through
                this.renderer.setClearColor(0x000000, 0);
                this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
                console.log('clientWidth', this.canvas.clientWidth);
                console.log('clientHeight', this.canvas.clientHeight);
                // this.canvas.appendChild(this.renderer.domElement);
                // this.updateChildCamerasAspectRatio();
            };
        /**
         * @return {?}
         */
        ThreeTestComponent.prototype.configControls = /**
         * @return {?}
         */
            function () {
                this.controls = new threeOrbitcontrolsTs.OrbitControls(this.camera, this.canvas);
                this.controls.autoRotate = true;
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
                this.light = new THREE.PointLight(0xffffff);
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
                var geometry = new THREE.BoxGeometry(5, 5, 5);
                /** @type {?} */
                var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
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
                this.mesh.rotation.x += 0.01;
                this.mesh.rotation.y += 0.01;
                this.controls.update();
                this.renderer.render(this.scene, this.camera);
            };
        ThreeTestComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'three-test',
                        template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                        styles: ["canvas{width:100%;height:100%}"]
                    }] }
        ];
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
    // TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
    var ThreeLibModule = /** @class */ (function () {
        // TODO: Ideally move all to three-wrapper library. But can't move js/EnableThreeExamples.js to library :(
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIuc2VydmljZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9hYnN0cmFjdC1vYmplY3QtM2QudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvYWJzdHJhY3QtbW9kZWwtbG9hZGVyLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3BpcGVzL3JhZDJkZWcucGlwZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9kZWcycmFkLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvY2FtZXJhcy9wZXJzcGVjdGl2ZS1jYW1lcmEuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvb2JqZWN0LWxvYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9saWdodC9wb2ludC1saWdodC5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RPYmplY3QzRDxUIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0T2JqZWN0M0QsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIGNoaWxkTm9kZXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPj47XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVk6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVaOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdHJhbnNsYXRlWDogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVo6IG51bWJlcjtcblxuICBwcml2YXRlIG9iamVjdDogVDtcblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5vYmplY3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbXVzdFJlcmVuZGVyID0gZmFsc2U7XG5cbiAgICBpZiAoWydyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG11c3RSZXJlbmRlcikge1xuICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0T2JqZWN0M0QubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5vYmplY3QgPSB0aGlzLm5ld09iamVjdDNESW5zdGFuY2UoKTtcblxuICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZmlsdGVyKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmdldE9iamVjdCgpICE9PSB1bmRlZmluZWQpLmZvckVhY2goaSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkIGNoaWxkIGZvciBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKGkuZ2V0T2JqZWN0KCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gY2hpbGQgT2JqZWN0M0QgZm9yOiBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlSb3RhdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBhbmdsZXMgPSBbXG4gICAgICB0aGlzLnJvdGF0ZVgsXG4gICAgICB0aGlzLnJvdGF0ZVksXG4gICAgICB0aGlzLnJvdGF0ZVpcbiAgICBdLm1hcChhbmdsZSA9PiBhbmdsZSB8fCAwKTtcblxuICAgIHRoaXMub2JqZWN0LnJvdGF0aW9uLnNldChcbiAgICAgIHRoaXMucm90YXRlWCB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVZIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVogfHwgMCxcbiAgICAgICdYWVonXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlUcmFuc2xhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5zZXQoXG4gICAgICB0aGlzLnRyYW5zbGF0ZVggfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWSB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVaIHx8IDBcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZENoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5hZGQob2JqZWN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucmVtb3ZlKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFQge1xuICAgIHJldHVybiB0aGlzLm9iamVjdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFmdGVySW5pdCgpOiB2b2lkO1xuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXNjZW5lJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTY2VuZURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgU2NlbmVEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlNjZW5lPiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuU2NlbmUge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5TY2VuZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENhbWVyYTxUIGV4dGVuZHMgVEhSRUUuQ2FtZXJhPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIGNhbWVyYTogVDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0Q2FtZXJhLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKTtcblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBIb3N0TGlzdGVuZXIsXG4gIFF1ZXJ5TGlzdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtd2ViZ2wtcmVuZGVyZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdlYkdMUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBwcml2YXRlIHZpZXdJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpXG4gIHByaXZhdGUgY2FudmFzUmVmOiBFbGVtZW50UmVmOyAvLyBOT1RFOiBzYXkgYnllLWJ5ZSB0byBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgOylcblxuICBAQ29udGVudENoaWxkcmVuKFNjZW5lRGlyZWN0aXZlKSBzY2VuZUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTY2VuZURpcmVjdGl2ZT47IC8vIFRPRE86IE11bHRpcGxlIHNjZW5lc1xuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhKSBjYW1lcmFDb21wb25lbnRzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47IC8vIFRPRE86IE11bHRpcGxlIGNhbWVyYXNcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuY29uc3RydWN0b3InKTtcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0UmVuZGVyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlbmRlciBwYW5lIG9uIHdoaWNoIHRoZSBzY2VuZSBpcyByZW5kZXJlZC5cbiAgICogQ3VycmVudGx5LCBvbmx5IHRoZSBXZWJHTCByZW5kZXJlciB3aXRoIGEgY2FudmFzIGlzIHVzZWQgaW4gdGhpc1xuICAgKiBpbXBsZW1lbnRhdGlvbiwgc28gdGhpcyBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSBhbiBFbGVtZW50UmVmIHRvIHRoZVxuICAgKiB1bmRlcmx5aW5nIDxjYW52YXM+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtyb3RhdGVTcGVlZF09MSBbem9vbVNwZWVkXT0xLjIgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJQYW5lKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0UmVuZGVyaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5zdGFydFJlbmRlcmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDEpO1xuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyBpZiAodGhpcy5zY2VuZUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2NlbmVDb21wb25lbnRzLmxlbmd0aCA9PSAxICYmXG4gICAgLy8gICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYW1lcmFDb21wb25lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCBzY2VuZUNvbXBvbmVudCA9IHRoaXMuc2NlbmVDb21wb25lbnRzLmZpcnN0O1xuICAgICAgY29uc3QgY2FtZXJhQ29tcG9uZW50ID0gdGhpcy5jYW1lcmFDb21wb25lbnRzLmZpcnN0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzY2VuZS5nZXRPYmplY3QoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjYW1lcmEuY2FtZXJhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lQ29tcG9uZW50LmdldE9iamVjdCgpLCBjYW1lcmFDb21wb25lbnQuY2FtZXJhKTtcbiAgICB9XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm9uUmVzaXplOiAnICsgdGhpcy5jYW52YXMuY2xpZW50V2lkdGggKyAnLCAnICsgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCkge1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZm9yRWFjaChjYW1lcmEgPT4gY2FtZXJhLnVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdCkpO1xuICB9XG5cbiAgLypcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25LZXlQcmVzczogXCIgKyBldmVudC5rZXkpO1xuICB9XG4qL1xuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vcmJpdC1jb250cm9scydcbn0pXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkQ2FtZXJhczogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+O1xuICBAQ29udGVudENoaWxkcmVuKFdlYkdMUmVuZGVyZXJDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRSZW5kZXJlcnM6IFF1ZXJ5TGlzdDxXZWJHTFJlbmRlcmVyQ29tcG9uZW50PjtcbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IG9uIHdob3NlIG5hdGl2ZSBlbGVtZW50IHRoZSBvcmJpdCBjb250cm9scyB3aWxsIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQga2V5Ym9hcmQgZXZlbnRzIGFyZSBzdGlsbCBsaXN0ZW5lZCBmb3Igb24gdGhlIGdsb2JhbCB3aW5kb3cgb2JqZWN0LCB0aGlzIGlzXG4gICAqIGEga25vd24gaXNzdWUgZnJvbSBUaHJlZS5qczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzEwMzE1XG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RlbmluZ0NvbnRyb2xFbGVtZW50OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIHJvdGF0ZVNwZWVkID0gMS4wO1xuICBASW5wdXQoKSB6b29tU3BlZWQgPSAxLjI7XG5cbiAgLy8gcHJpdmF0ZSBjb250cm9sczogVEhSRUUuT3JiaXRDb250cm9scztcbiAgcHJpdmF0ZSBjb250cm9sczogT3JiaXRDb250cm9scztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIElmIHRoZSBUSFJFRS5qcyBPcmJpdENvbnRyb2xzIGFyZSBub3Qgc2V0IHVwIHlldCwgd2UgZG8gbm90IG5lZWQgdG8gdXBkYXRlXG4gICAgLy8gYW55dGhpbmcgYXMgdGhleSB3aWxsIHBpY2sgdGhlIG5ldyB2YWx1ZXMgZnJvbSB0aGUgQElucHV0IHByb3BlcnRpZXMgYXV0b21hdGljYWxseVxuICAgIC8vIHVwb24gY3JlYXRpb24uXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3JvdGF0ZVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snem9vbVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydsaXN0ZW5pbmdDb250cm9sRWxlbWVudCddKSB7XG4gICAgICAvLyBUaGUgRE9NIGVsZW1lbnQgdGhlIE9yYml0Q29udHJvbHMgbGlzdGVuIG9uIGNhbm5vdCBiZSBjaGFuZ2VkIG9uY2UgYW5cbiAgICAgIC8vIE9yYml0Q29udHJvbHMgb2JqZWN0IGlzIGNyZWF0ZWQuIFdlIHRodXMgbmVlZCB0byByZWNyZWF0ZSBpdC5cbiAgICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBPcmJpdENvbnRyb2xzKCkge1xuICAgIC8vIHRoaXMuY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoXG4gICAgICAgIHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0LmNhbWVyYSxcbiAgICAgIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQgJiYgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgKTtcbiAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIpO1xuICAgIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgaWYgKHRoaXMuY2hpbGRDYW1lcmFzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW1lcmEgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNoaWxkUmVuZGVyZXJzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG4vKipcbiAqIEhlbHBlciBwYXJlbnQgY2xhc3MgZm9yIG1vZGVsIGxvYWRlciBkaXJlY3RpdmVzLlxuICpcbiAqIEBzZWUgT2JqZWN0TG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIE9iakxvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1vZGVsTG9hZGVyIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX21vZGVsOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIHNpZ25hbCB3aGV0aGVyIHRoZSBwYXJlbnQgY2xhc3MgaW5zdGFuY2UgQWJzdHJhY3RPYmplY3QzRCBjYWxsZWQgdGhlXG4gICAqIG92ZXJ3cml0dGVuIG1ldGhvZCB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUjYWZ0ZXJJbml0fSB5ZXQuXG4gICAqXG4gICAqIFVubGVzcyB0aGF0IG1ldGhvZCB3YXMgY2FsbGVkLCBubyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHtAbGluayBBYnN0cmFjdE9iamVjdDNEfVxuICAgKiBtYXkgYmUgc2FmZWx5IGFjY2Vzc2VkLCBlc3BlY2lhbGx5IHtAbGluayBBYnN0cmFjdE9iamVjdDNEI2FkZENoaWxkfSBhbmRcbiAgICoge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QucmVuZGVyZXJ9LlxuICAgKi9cbiAgcHJpdmF0ZSBwYXJlbnRJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50TG9hZGVkTW9kZWxPYmplY3Q6IFRIUkVFLk9iamVjdDNEIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBtb2RlbCBvYmplY3QuXG4gICAqXG4gICAqIFNvbWUgbG9hZGVycyAoZS5nLiBDb2xsYWRhTG9hZGVyKSBhbHNvIHByb3ZpZGUgb3RoZXIgbW9kZWwgaW5mb3JtYXRpb25cbiAgICogdXBvbiBsb2FkaW5nIGJlc2lkZXMgdGhlIFwicmF3XCIgbW9kZWwgb2JqZWN0L3NjZW5lLiBJbiB0aGVzZSBjYXNlc1xuICAgKiBpbXBsZW1lbnRpbmcgY2hpbGQgY2xhc3NlcyBhcmUgaW5kZWVkIHN1cHBvc2VkIHRvIHJldHVybiB0aGUgXCJyYXdcIiBtb2RlbFxuICAgKiBvYmplY3QuXG4gICAqIFRoZSBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSwgYWx0aG91Z2ggY2hpbGQgY2xhc3NlcyBhcmUgZnJlZSB0byBpbXBsZW1lbnRcbiAgICogb3RoZXIgbWVhbnMgYXMgd2VsbCkgZnJvbSB3aGljaCB0aGUgbW9kZWwgc2hhbGwgYmUgbG9hZGVkIGNhbiBiZSBvYnRhaW5lZCBieVxuICAgKiB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUubW9kZWx9LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpOiBQcm9taXNlPFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogVGhlIG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICogU2V0dGluZ3MgdGhpcyBwcm9wZXJ0eSBvbmx5IGhpZGVzIHRoZSBwcmV2aW91cyBtb2RlbCB1cG9uIHN1Y2Nlc3NmdWxcbiAgICogbG9hZGluZyBvZiB0aGUgbmV3IG9uZS4gVGhpcyBlc3BlY2lhbGx5IG1lYW5zIHRoYXQgaWYgdGhlIG5ldyBkYXRhIHNvdXJjZVxuICAgKiBpcyBpbnZhbGlkLCB0aGUgb2xkIG1vZGVsIHdpbGwgKm5vdCogYmUgcmVtb3ZlZCBmcm9tIHRoZSBzY2VuZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbW9kZWwobmV3TW9kZWxVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3TW9kZWxVcmw7XG5cbiAgICAvLyBEZWxheSBtb2RlbCBsb2FkaW5nIHVudGlsIHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gc28gdGhhdCB3ZSBjYW4gY2FsbCBhZGRDaGlsZCgpLlxuICAgIGlmICghdGhpcy5wYXJlbnRJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZE1vZGVsT2JqZWN0KCkudGhlbihuZXdNb2RlbCA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0ID0gbmV3TW9kZWw7XG4gICAgICB0aGlzLmFkZENoaWxkKG5ld01vZGVsKTtcblxuICAgICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCByZW5kZXJlcihuZXdSZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3UmVuZGVyZXI7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyBUcmlnZ2VyIG1vZGVsIGFjcXVpc2l0aW9uIG5vdyB0aGF0IHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgICBzdXBlci5yZXJlbmRlcigpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtY29sbGFkYS1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuQ29sbGFkYUxvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsLnNjZW5lKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBmb3IgZW1wbG95aW5nIFRIUkVFLk9CSkxvYWRlciB0byBsb2FkIFtXYXZlZnJvbnQgKi5vYmogZmlsZXNdWzFdLlxuICpcbiAqIFsxXTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2F2ZWZyb250Xy5vYmpfZmlsZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmotbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmpMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iakxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKTtcbiAgcHJpdmF0ZSBtdGxMb2FkZXIgPSBuZXcgVEhSRUUuTVRMTG9hZGVyKCk7XG5cbiAgQElucHV0KClcbiAgbWF0ZXJpYWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0ZXh0dXJlUGF0aDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgLy8gVE9ETzogbWFrZSBpdCBuaWNlclxuICAgIGlmICh0aGlzLm1hdGVyaWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgcmVqZWN0XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm10bExvYWRlci5zZXRUZXh0dXJlUGF0aCh0aGlzLnRleHR1cmVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm10bExvYWRlci5sb2FkKHRoaXMubWF0ZXJpYWwsIG1hdGVyaWFsID0+IHtcbiAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdyYWQyZGVnJ1xufSlcbmV4cG9ydCBjbGFzcyBSYWQyRGVnUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXNcbiAgICogQHBhcmFtIHJhZGlhbnMgUmFkaWFuc1xuICAgKi9cbiAgdHJhbnNmb3JtKHJhZGlhbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdkZWcycmFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWcyUmFkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICogQHBhcmFtIGRlZ3JlZSBEZWdyZWVzXG4gICAqL1xuICB0cmFuc2Zvcm0oZGVncmVlczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKGRlZ3JlZXMgLyAxODApICogTWF0aC5QSTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi9hYnN0cmFjdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBlcnNwZWN0aXZlLWNhbWVyYScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RDYW1lcmEsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0Q2FtZXJhPFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhPiB7XG5cbiAgLy8gQElucHV0KCkgY2FtZXJhVGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblxuICBASW5wdXQoKSBmb3Y6IG51bWJlcjtcbiAgQElucHV0KCkgbmVhcjogbnVtYmVyO1xuICBASW5wdXQoKSBmYXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBwb3NpdGlvblg6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25ZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWjogbnVtYmVyO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIGxldCBhc3BlY3RSYXRpbyA9IHVuZGVmaW5lZDsgLy8gVXBkYXRlZCBsYXRlclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxuICAgICAgdGhpcy5mb3YsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLm5lYXIsXG4gICAgICB0aGlzLmZhclxuICAgICk7XG5cbiAgICAvLyBTZXQgcG9zaXRpb24gYW5kIGxvb2sgYXRcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvblg7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb25ZO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBvc2l0aW9uWjtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUudXBkYXRlQXNwZWN0UmF0aW86ICcgKyBhc3BlY3QpO1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IGFzcGVjdDtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1heGVzLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXhlc0hlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQXhlc0hlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5BeGVzSGVscGVyKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1ncmlkLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gR3JpZEhlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZEhlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgZGl2aXNpb25zOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuR3JpZEhlbHBlcih0aGlzLnNpemUsIHRoaXMuZGl2aXNpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iamVjdC1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iamVjdExvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBvaW50LWxpZ2h0JyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQb2ludExpZ2h0RGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5Qb2ludExpZ2h0PiB7XG5cbiAgQElucHV0KCkgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBASW5wdXQoKSBpbnRlbnNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgZGlzdGFuY2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5Qb2ludExpZ2h0IHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5Qb2ludExpZ2h0KHRoaXMuY29sb3IsIHRoaXMuaW50ZW5zaXR5LCB0aGlzLmRpc3RhbmNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG4vLyBpbXBvcnQgeyBDYW1lcmFDb250cm9scyB9IGZyb20gJ2NhbWVyYS1jb250cm9scyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXRlc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGhyZWUtdGVzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RocmVlLXRlc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlVGVzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdjYW52YXMnKSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgc2NlbmUgPSBudWxsO1xuICBjYW1lcmEgPSBudWxsO1xuICBjb250cm9scyA9IG51bGw7XG4gIG1lc2ggPSBudWxsO1xuICBsaWdodCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgMSwgMSwgMTAwMCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jb25maWdTY2VuZSgpO1xuICAgIHRoaXMuY29uZmlnQ2FtZXJhKCk7XG4gICAgdGhpcy5jb25maWdSZW5kZXJlcigpO1xuICAgIHRoaXMuY29uZmlnQ29udHJvbHMoKTtcblxuICAgIHRoaXMuY3JlYXRlTGlnaHQoKTtcbiAgICB0aGlzLmNyZWF0ZU1lc2goKTtcblxuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgY29uZmlnU2NlbmUoKSB7XG4gICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKCAweGRkZGRkZCApO1xuICB9XG5cbiAgY29uZmlnQ2FtZXJhKCkge1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KCAtMTUsIDEwLCAxNSApO1xuICAgIHRoaXMuY2FtZXJhLmxvb2tBdCggdGhpcy5zY2VuZS5wb3NpdGlvbiApO1xuICB9XG5cbiAgY29uZmlnUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBhbHBoYTogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhkZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAvLyBzZXRDbGVhckNvbG9yIGZvciB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kXG4gICAgLy8gaS5lLiBzY2VuZSBvciBjYW52YXMgYmFja2dyb3VuZCBzaG93cyB0aHJvdWdoXG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCwgMCApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICBjb25zb2xlLmxvZygnY2xpZW50V2lkdGgnLCB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NsaWVudEhlaWdodCcsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgLy8gdGhpcy5jYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAvLyB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gIH1cblxuICBjb25maWdDb250cm9scygpIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHRoaXMuY2FudmFzKTtcbiAgICB0aGlzLmNvbnRyb2xzLmF1dG9Sb3RhdGUgPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlWm9vbSA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVQYW4gID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY3JlYXRlTGlnaHQoKSB7XG4gICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KCAweGZmZmZmZiApO1xuICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KCAtMTAsIDEwLCAxMCApO1xuICAgIHRoaXMuc2NlbmUuYWRkKCB0aGlzLmxpZ2h0ICk7XG4gIH1cblxuICBjcmVhdGVNZXNoKCkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDUsIDUsIDUpO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XG4gICAgdGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lc2gpO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZSgpKTtcbiAgICB0aGlzLm1lc2gucm90YXRpb24ueCArPSAwLjAxO1xuICAgIHRoaXMubWVzaC5yb3RhdGlvbi55ICs9IDAuMDE7XG5cbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9scy9vcmJpdC1jb250cm9scy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL2NvbGxhZGEtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmpMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmotbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSYWQyRGVnUGlwZSB9IGZyb20gJy4vcGlwZXMvcmFkMmRlZy5waXBlJztcbmltcG9ydCB7IERlZzJSYWRQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWcycmFkLnBpcGUnO1xuaW1wb3J0IHsgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgfSBmcm9tICcuL2NhbWVyYXMvcGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZW5kZXJlci93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NlbmVEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEF4ZXNIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZEhlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPYmplY3RMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9vYmplY3QtbG9hZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb2ludExpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xpZ2h0L3BvaW50LWxpZ2h0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaHJlZVRlc3RDb21wb25lbnQgfSBmcm9tICcuL3RocmVlLXRlc3QvdGhyZWUtdGVzdC5jb21wb25lbnQnO1xuXG4vLyBUT0RPOiBJZGVhbGx5IG1vdmUgYWxsIHRvIHRocmVlLXdyYXBwZXIgbGlicmFyeS4gQnV0IGNhbid0IG1vdmUganMvRW5hYmxlVGhyZWVFeGFtcGxlcy5qcyB0byBsaWJyYXJ5IDooXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZUxpYk1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29udGVudENoaWxkcmVuIiwiSW5wdXQiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlRIUkVFLlNjZW5lIiwiRGlyZWN0aXZlIiwiZm9yd2FyZFJlZiIsIlRIUkVFLldlYkdMUmVuZGVyZXIiLCJUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwIiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiSG9zdExpc3RlbmVyIiwiT3JiaXRDb250cm9scyIsIlRIUkVFLk9iamVjdDNEIiwiVEhSRUUuQ29sbGFkYUxvYWRlciIsIlRIUkVFLk9CSkxvYWRlciIsIlRIUkVFLk1UTExvYWRlciIsIlBpcGUiLCJUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSIsIlRIUkVFLkF4ZXNIZWxwZXIiLCJUSFJFRS5HcmlkSGVscGVyIiwiVEhSRUUuT2JqZWN0TG9hZGVyIiwiVEhSRUUuUG9pbnRMaWdodCIsIlRIUkVFLkNvbG9yIiwiVEhSRUUuQm94R2VvbWV0cnkiLCJUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsIiwiVEhSRUUuTWVzaCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OzhCQUpEO0tBRUE7O0lDRkE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FB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QUFFLEtBQUssRUFBRSxDQUFDO3dCQUN4RCxLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxD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