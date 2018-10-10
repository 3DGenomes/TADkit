(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('three-full'), require('@avatsaev/three-orbitcontrols-ts'), require('three'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('three-lib', ['exports', '@angular/core', 'three-full', '@avatsaev/three-orbitcontrols-ts', 'three', '@angular/common'], factory) :
    (factory((global['three-lib'] = {}),global.ng.core,global.THREE,global.OrbitControls,global.THREE,global.ng.common));
}(this, (function (exports,i0,THREE,threeOrbitcontrolsTs,THREE$1,common) { 'use strict';

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
        function ThreeTestComponent(elem) {
            this.elem = elem;
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.controls = null;
            this.mesh = null;
            this.light = null;
            this.count = 1;
            this.scene = new THREE$1.Scene();
            this.camera = new THREE$1.PerspectiveCamera(45, 1, 1, 1000);
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
                this.scene.background = new THREE$1.Color(0xdddddd);
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
                this.renderer = new THREE$1.WebGLRenderer({
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
                this.controls = new threeOrbitcontrolsTs.OrbitControls(this.camera, this.canvas);
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
                this.light = new THREE$1.PointLight(0xffffff);
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
                var geometry = new THREE$1.BoxGeometry(5, 5, 5);
                /** @type {?} */
                var material = new THREE$1.MeshLambertMaterial({ color: 0xff0000 });
                this.mesh = new THREE$1.Mesh(geometry, material);
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
            { type: i0.Component, args: [{
                        selector: 'three-test',
                        template: "<!-- <canvas #canvas (window:resize)=\"onResize($event)\"></canvas> -->\n<canvas #canvas></canvas>\n",
                        styles: ["canvas{width:100%;height:100%}"]
                    }] }
        ];
        ThreeTestComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        ThreeTestComponent.propDecorators = {
            canvasRef: [{ type: i0.ViewChild, args: ['canvas',] }],
            onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIuc2VydmljZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9hYnN0cmFjdC1vYmplY3QtM2QudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvYWJzdHJhY3QtbW9kZWwtbG9hZGVyLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3BpcGVzL3JhZDJkZWcucGlwZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9kZWcycmFkLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvY2FtZXJhcy9wZXJzcGVjdGl2ZS1jYW1lcmEuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvb2JqZWN0LWxvYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9saWdodC9wb2ludC1saWdodC5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBPbkNoYW5nZXMsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE9iamVjdDNEPFQgZXh0ZW5kcyBUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWJzdHJhY3RPYmplY3QzRCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgY2hpbGROb2RlczogUXVlcnlMaXN0PEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+PjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVYOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVo6IG51bWJlcjtcblxuICBASW5wdXQoKSB0cmFuc2xhdGVYOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVk6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWjogbnVtYmVyO1xuXG4gIHByaXZhdGUgb2JqZWN0OiBUO1xuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLm9iamVjdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtdXN0UmVyZW5kZXIgPSBmYWxzZTtcblxuICAgIGlmIChbJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoWyd0cmFuc2xhdGVYJywgJ3RyYW5zbGF0ZVknLCAndHJhbnNsYXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobXVzdFJlcmVuZGVyKSB7XG4gICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RPYmplY3QzRC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLm9iamVjdCA9IHRoaXMubmV3T2JqZWN0M0RJbnN0YW5jZSgpO1xuXG4gICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgdGhpcy5hcHBseVJvdGF0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5jaGlsZE5vZGVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5maWx0ZXIoaSA9PiBpICE9PSB0aGlzICYmIGkuZ2V0T2JqZWN0KCkgIT09IHVuZGVmaW5lZCkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJBZGQgY2hpbGQgZm9yIFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaS5nZXRPYmplY3QoKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJObyBjaGlsZCBPYmplY3QzRCBmb3I6IFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmFmdGVySW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVJvdGF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuZ2xlcyA9IFtcbiAgICAgIHRoaXMucm90YXRlWCxcbiAgICAgIHRoaXMucm90YXRlWSxcbiAgICAgIHRoaXMucm90YXRlWlxuICAgIF0ubWFwKGFuZ2xlID0+IGFuZ2xlIHx8IDApO1xuXG4gICAgdGhpcy5vYmplY3Qucm90YXRpb24uc2V0KFxuICAgICAgdGhpcy5yb3RhdGVYIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWiB8fCAwLFxuICAgICAgJ1hZWidcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRyYW5zbGF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLnNldChcbiAgICAgIHRoaXMudHJhbnNsYXRlWCB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVZIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVogfHwgMFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LmFkZChvYmplY3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZUNoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5yZW1vdmUob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMub2JqZWN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IG5ld09iamVjdDNESW5zdGFuY2UoKTogVDtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtc2NlbmUnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNjZW5lRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBTY2VuZURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuU2NlbmU+IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5TY2VuZSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlNjZW5lKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENhbWVyYTxUIGV4dGVuZHMgVEhSRUUuQ2FtZXJhPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIGNhbWVyYTogVDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0Q2FtZXJhLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKTtcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQ29udGVudENoaWxkcmVuLCBIb3N0TGlzdGVuZXIsXG4gIFF1ZXJ5TGlzdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEFmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBTY2VuZURpcmVjdGl2ZSB9IGZyb20gJy4uL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RocmVlLXdlYmdsLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdjYW52YXMnKVxuICBwcml2YXRlIGNhbnZhc1JlZjogRWxlbWVudFJlZjsgLy8gTk9URTogc2F5IGJ5ZS1ieWUgdG8gc2VydmVyLXNpZGUgcmVuZGVyaW5nIDspXG5cbiAgQENvbnRlbnRDaGlsZHJlbihTY2VuZURpcmVjdGl2ZSkgc2NlbmVDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2NlbmVEaXJlY3RpdmU+OyAvLyBUT0RPOiBNdWx0aXBsZSBzY2VuZXNcbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSkgY2FtZXJhQ29tcG9uZW50czogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+OyAvLyBUT0RPOiBNdWx0aXBsZSBjYW1lcmFzXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50LmNvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5uZ0FmdGVyVmlld0luaXQnKTtcbiAgICB0aGlzLnZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5zdGFydFJlbmRlcmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZW5kZXIgcGFuZSBvbiB3aGljaCB0aGUgc2NlbmUgaXMgcmVuZGVyZWQuXG4gICAqIEN1cnJlbnRseSwgb25seSB0aGUgV2ViR0wgcmVuZGVyZXIgd2l0aCBhIGNhbnZhcyBpcyB1c2VkIGluIHRoaXNcbiAgICogaW1wbGVtZW50YXRpb24sIHNvIHRoaXMgcHJvcGVydHkgd2lsbCBhbHdheXMgYmUgYW4gRWxlbWVudFJlZiB0byB0aGVcbiAgICogdW5kZXJseWluZyA8Y2FudmFzPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbcm90YXRlU3BlZWRdPTEgW3pvb21TcGVlZF09MS4yIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyUGFuZSgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWY7XG4gIH1cblxuICBwcml2YXRlIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcmluZygpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuc3RhcnRSZW5kZXJpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4ZmZmZmZmLCAxKTtcbiAgICB0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XG5cbiAgICB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgLy8gaWYgKHRoaXMuc2NlbmVDb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJiB0aGlzLnNjZW5lQ29tcG9uZW50cy5sZW5ndGggPT0gMSAmJlxuICAgIC8vICAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuY2FtZXJhQ29tcG9uZW50cy5sZW5ndGggPT0gMSkge1xuICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgY29uc3Qgc2NlbmVDb21wb25lbnQgPSB0aGlzLnNjZW5lQ29tcG9uZW50cy5maXJzdDtcbiAgICAgIGNvbnN0IGNhbWVyYUNvbXBvbmVudCA9IHRoaXMuY2FtZXJhQ29tcG9uZW50cy5maXJzdDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVuZGVyXCIpO1xuICAgICAgLy8gY29uc29sZS5sb2coc2NlbmUuZ2V0T2JqZWN0KCkpO1xuICAgICAgLy8gY29uc29sZS5sb2coY2FtZXJhLmNhbWVyYSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZUNvbXBvbmVudC5nZXRPYmplY3QoKSwgY2FtZXJhQ29tcG9uZW50LmNhbWVyYSk7XG4gICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5vblJlc2l6ZTogJyArIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoICsgJywgJyArIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpIHtcbiAgICBjb25zdCBhc3BlY3QgPSB0aGlzLmNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5jYW1lcmFDb21wb25lbnRzLmZvckVhY2goY2FtZXJhID0+IGNhbWVyYS51cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3QpKTtcbiAgfVxuXG4gIC8qXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXByZXNzJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uS2V5UHJlc3M6IFwiICsgZXZlbnQua2V5KTtcbiAgfVxuKi9cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsXG4gICBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnQGF2YXRzYWV2L3RocmVlLW9yYml0Y29udHJvbHMtdHMnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb3JiaXQtY29udHJvbHMnXG59KVxuZXhwb3J0IGNsYXNzIE9yYml0Q29udHJvbHNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdENhbWVyYSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjaGlsZENhbWVyYXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdENhbWVyYTxUSFJFRS5DYW1lcmE+PjtcbiAgQENvbnRlbnRDaGlsZHJlbihXZWJHTFJlbmRlcmVyQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkUmVuZGVyZXJzOiBRdWVyeUxpc3Q8V2ViR0xSZW5kZXJlckNvbXBvbmVudD47XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCBvbiB3aG9zZSBuYXRpdmUgZWxlbWVudCB0aGUgb3JiaXQgY29udHJvbHMgd2lsbCBsaXN0ZW4gZm9yIG1vdXNlIGV2ZW50cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IGtleWJvYXJkIGV2ZW50cyBhcmUgc3RpbGwgbGlzdGVuZWQgZm9yIG9uIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdCwgdGhpcyBpc1xuICAgKiBhIGtub3duIGlzc3VlIGZyb20gVGhyZWUuanM6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xMDMxNVxuICAgKlxuICAgKiBAZXhhbXBsZSBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHRoZSBvcmJpdCBjb250cm9scyAoaS5lLiB0aGVcbiAgICogYXJlYSB3aGljaCBpcyBsaXN0ZW5lZCBmb3IgbW91c2UgbW92ZSBhbmQgem9vbSBldmVudHMpIHRvIHRoZSByZW5kZXJpbmcgcGFuZTpcbiAgICogYGBgXG4gICAqIDx0aHJlZS1vcmJpdC1jb250cm9scyBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICAgKiAgIDx0aHJlZS1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgKiAgICAgLi4uXG4gICAqICAgPC90aHJlZS1yZW5kZXJlcj5cbiAgICogPC90aHJlZS1vcmJpdC1jb250cm9scz5cbiAgICogYGBgXG4gICAqL1xuICBASW5wdXQoKSBsaXN0ZW5pbmdDb250cm9sRWxlbWVudDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSByb3RhdGVTcGVlZCA9IDEuMDtcbiAgQElucHV0KCkgem9vbVNwZWVkID0gMS4yO1xuXG4gIC8vIHByaXZhdGUgY29udHJvbHM6IFRIUkVFLk9yYml0Q29udHJvbHM7XG4gIHByaXZhdGUgY29udHJvbHM6IE9yYml0Q29udHJvbHM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBJZiB0aGUgVEhSRUUuanMgT3JiaXRDb250cm9scyBhcmUgbm90IHNldCB1cCB5ZXQsIHdlIGRvIG5vdCBuZWVkIHRvIHVwZGF0ZVxuICAgIC8vIGFueXRoaW5nIGFzIHRoZXkgd2lsbCBwaWNrIHRoZSBuZXcgdmFsdWVzIGZyb20gdGhlIEBJbnB1dCBwcm9wZXJ0aWVzIGF1dG9tYXRpY2FsbHlcbiAgICAvLyB1cG9uIGNyZWF0aW9uLlxuICAgIGlmICghdGhpcy5jb250cm9scykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydyb3RhdGVTcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3pvb21TcGVlZCddKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbGlzdGVuaW5nQ29udHJvbEVsZW1lbnQnXSkge1xuICAgICAgLy8gVGhlIERPTSBlbGVtZW50IHRoZSBPcmJpdENvbnRyb2xzIGxpc3RlbiBvbiBjYW5ub3QgYmUgY2hhbmdlZCBvbmNlIGFuXG4gICAgICAvLyBPcmJpdENvbnRyb2xzIG9iamVjdCBpcyBjcmVhdGVkLiBXZSB0aHVzIG5lZWQgdG8gcmVjcmVhdGUgaXQuXG4gICAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9scy5kaXNwb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFVwT3JiaXRDb250cm9scygpIHtcbiAgICAvLyB0aGlzLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoXG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKFxuICAgICAgICB0aGlzLmNoaWxkQ2FtZXJhcy5maXJzdC5jYW1lcmEsXG4gICAgICB0aGlzLmxpc3RlbmluZ0NvbnRyb2xFbGVtZW50ICYmIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICk7XG4gICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IHRoaXMucm90YXRlU3BlZWQ7XG4gICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB0aGlzLnpvb21TcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKTtcbiAgICB0aGlzLmNoaWxkUmVuZGVyZXJzLmZpcnN0LnJlbmRlcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdPcmJpdENvbnRyb2xzRGlyZWN0aXZlLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIGlmICh0aGlzLmNoaWxkQ2FtZXJhcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FtZXJhIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGlsZFJlbmRlcmVycyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlciBpcyBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFVwT3JiaXRDb250cm9scygpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuLyoqXG4gKiBIZWxwZXIgcGFyZW50IGNsYXNzIGZvciBtb2RlbCBsb2FkZXIgZGlyZWN0aXZlcy5cbiAqXG4gKiBAc2VlIE9iamVjdExvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBPYmpMb2FkZXJEaXJlY3RpdmVcbiAqIEBzZWUgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNb2RlbExvYWRlciBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9tb2RlbDogc3RyaW5nO1xuICBwcml2YXRlIF9yZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogRmxhZyB0byBzaWduYWwgd2hldGhlciB0aGUgcGFyZW50IGNsYXNzIGluc3RhbmNlIEFic3RyYWN0T2JqZWN0M0QgY2FsbGVkIHRoZVxuICAgKiBvdmVyd3JpdHRlbiBtZXRob2Qge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlI2FmdGVySW5pdH0geWV0LlxuICAgKlxuICAgKiBVbmxlc3MgdGhhdCBtZXRob2Qgd2FzIGNhbGxlZCwgbm8gbWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRH1cbiAgICogbWF5IGJlIHNhZmVseSBhY2Nlc3NlZCwgZXNwZWNpYWxseSB7QGxpbmsgQWJzdHJhY3RPYmplY3QzRCNhZGRDaGlsZH0gYW5kXG4gICAqIHtAbGluayBBYnN0cmFjdE9iamVjdDNELnJlbmRlcmVyfS5cbiAgICovXG4gIHByaXZhdGUgcGFyZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgY3VycmVudExvYWRlZE1vZGVsT2JqZWN0OiBUSFJFRS5PYmplY3QzRCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogTG9hZCB0aGUgbW9kZWwgb2JqZWN0LlxuICAgKlxuICAgKiBTb21lIGxvYWRlcnMgKGUuZy4gQ29sbGFkYUxvYWRlcikgYWxzbyBwcm92aWRlIG90aGVyIG1vZGVsIGluZm9ybWF0aW9uXG4gICAqIHVwb24gbG9hZGluZyBiZXNpZGVzIHRoZSBcInJhd1wiIG1vZGVsIG9iamVjdC9zY2VuZS4gSW4gdGhlc2UgY2FzZXNcbiAgICogaW1wbGVtZW50aW5nIGNoaWxkIGNsYXNzZXMgYXJlIGluZGVlZCBzdXBwb3NlZCB0byByZXR1cm4gdGhlIFwicmF3XCIgbW9kZWxcbiAgICogb2JqZWN0LlxuICAgKiBUaGUgZGF0YSBzb3VyY2UgKHVzdWFsbHkgYSBVUkksIGFsdGhvdWdoIGNoaWxkIGNsYXNzZXMgYXJlIGZyZWUgdG8gaW1wbGVtZW50XG4gICAqIG90aGVyIG1lYW5zIGFzIHdlbGwpIGZyb20gd2hpY2ggdGhlIG1vZGVsIHNoYWxsIGJlIGxvYWRlZCBjYW4gYmUgb2J0YWluZWQgYnlcbiAgICoge0BsaW5rIE1vZGVsTG9hZGVyRGlyZWN0aXZlLm1vZGVsfS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKTogUHJvbWlzZTxUSFJFRS5PYmplY3QzRD47XG5cbiAgLyoqXG4gICAqIFRoZSBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqIFNldHRpbmdzIHRoaXMgcHJvcGVydHkgb25seSBoaWRlcyB0aGUgcHJldmlvdXMgbW9kZWwgdXBvbiBzdWNjZXNzZnVsXG4gICAqIGxvYWRpbmcgb2YgdGhlIG5ldyBvbmUuIFRoaXMgZXNwZWNpYWxseSBtZWFucyB0aGF0IGlmIHRoZSBuZXcgZGF0YSBzb3VyY2VcbiAgICogaXMgaW52YWxpZCwgdGhlIG9sZCBtb2RlbCB3aWxsICpub3QqIGJlIHJlbW92ZWQgZnJvbSB0aGUgc2NlbmUuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1vZGVsKG5ld01vZGVsVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG5ld01vZGVsVXJsO1xuXG4gICAgLy8gRGVsYXkgbW9kZWwgbG9hZGluZyB1bnRpbCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLFxuICAgIC8vIHNvIHRoYXQgd2UgY2FuIGNhbGwgYWRkQ2hpbGQoKS5cbiAgICBpZiAoIXRoaXMucGFyZW50SW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRNb2RlbE9iamVjdCgpLnRoZW4obmV3TW9kZWwgPT4ge1xuICAgICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCA9IG5ld01vZGVsO1xuICAgICAgdGhpcy5hZGRDaGlsZChuZXdNb2RlbCk7XG5cbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBtb2RlbCBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcmVuZGVyZXIobmV3UmVuZGVyZXI6IFdlYkdMUmVuZGVyZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IG5ld1JlbmRlcmVyO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIGdldCByZW5kZXJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCkge1xuICAgIHRoaXMucGFyZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgLy8gVHJpZ2dlciBtb2RlbCBhY3F1aXNpdGlvbiBub3cgdGhhdCB0aGUgcGFyZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLlxuICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gICAgc3VwZXIucmVyZW5kZXIoKTtcblxuICAgIGlmICh0aGlzLnJlbmRlcmVyKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWNvbGxhZGEtbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLkNvbGxhZGFMb2FkZXIoKTtcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbC5zY2VuZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgZm9yIGVtcGxveWluZyBUSFJFRS5PQkpMb2FkZXIgdG8gbG9hZCBbV2F2ZWZyb250ICoub2JqIGZpbGVzXVsxXS5cbiAqXG4gKiBbMV06IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dhdmVmcm9udF8ub2JqX2ZpbGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtb2JqLWxvYWRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT2JqTG9hZGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBPYmpMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuT0JKTG9hZGVyKCk7XG4gIHByaXZhdGUgbXRsTG9hZGVyID0gbmV3IFRIUkVFLk1UTExvYWRlcigpO1xuXG4gIEBJbnB1dCgpXG4gIG1hdGVyaWFsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdGV4dHVyZVBhdGg6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIC8vIFRPRE86IG1ha2UgaXQgbmljZXJcbiAgICBpZiAodGhpcy5tYXRlcmlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8VEhSRUUuT2JqZWN0M0Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgIH0sXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHJlamVjdFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50ZXh0dXJlUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5tdGxMb2FkZXIuc2V0VGV4dHVyZVBhdGgodGhpcy50ZXh0dXJlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tdGxMb2FkZXIubG9hZCh0aGlzLm1hdGVyaWFsLCBtYXRlcmlhbCA9PiB7XG4gICAgICAgICAgbWF0ZXJpYWwucHJlbG9hZCgpO1xuICAgICAgICAgIHRoaXMubG9hZGVyLnNldE1hdGVyaWFscyhtYXRlcmlhbCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAncmFkMmRlZydcbn0pXG5leHBvcnQgY2xhc3MgUmFkMkRlZ1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAvKipcbiAgICogQ29udmVydHMgcmFkaWFucyB0byBkZWdyZWVzXG4gICAqIEBwYXJhbSByYWRpYW5zIFJhZGlhbnNcbiAgICovXG4gIHRyYW5zZm9ybShyYWRpYW5zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiByYWRpYW5zICogKDE4MCAvIE1hdGguUEkpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZGVnMnJhZCdcbn0pXG5leHBvcnQgY2xhc3MgRGVnMlJhZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAvKipcbiAgICogQ29udmVydHMgZGVncmVlcyB0byByYWRpYW5zXG4gICAqIEBwYXJhbSBkZWdyZWUgRGVncmVlc1xuICAgKi9cbiAgdHJhbnNmb3JtKGRlZ3JlZXM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIChkZWdyZWVzIC8gMTgwKSAqIE1hdGguUEk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4vYWJzdHJhY3QtY2FtZXJhJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1wZXJzcGVjdGl2ZS1jYW1lcmEnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0Q2FtZXJhLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdENhbWVyYTxUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYT4ge1xuXG4gIC8vIEBJbnB1dCgpIGNhbWVyYVRhcmdldDogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgQElucHV0KCkgZm92OiBudW1iZXI7XG4gIEBJbnB1dCgpIG5lYXI6IG51bWJlcjtcbiAgQElucHV0KCkgZmFyOiBudW1iZXI7XG5cbiAgQElucHV0KCkgcG9zaXRpb25YOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWTogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblo6IG51bWJlcjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBsZXQgYXNwZWN0UmF0aW8gPSB1bmRlZmluZWQ7IC8vIFVwZGF0ZWQgbGF0ZXJcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgIHRoaXMuZm92LFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5uZWFyLFxuICAgICAgdGhpcy5mYXJcbiAgICApO1xuXG4gICAgLy8gU2V0IHBvc2l0aW9uIGFuZCBsb29rIGF0XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueCA9IHRoaXMucG9zaXRpb25YO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uWTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gdGhpcy5wb3NpdGlvblo7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLnVwZGF0ZUFzcGVjdFJhdGlvOiAnICsgYXNwZWN0KTtcbiAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSBhc3BlY3Q7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtYXhlcy1oZWxwZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF4ZXNIZWxwZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIEF4ZXNIZWxwZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLkF4ZXNIZWxwZXI+IHtcblxuICBASW5wdXQoKSBzaXplOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuQXhlc0hlbHBlcih0aGlzLnNpemUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtZ3JpZC1oZWxwZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEdyaWRIZWxwZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRIZWxwZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLkF4ZXNIZWxwZXI+IHtcblxuICBASW5wdXQoKSBzaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIGRpdmlzaW9uczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLkF4ZXNIZWxwZXIge1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkdyaWRIZWxwZXIodGhpcy5zaXplLCB0aGlzLmRpdmlzaW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdHcmlkSGVscGVyRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuaW1wb3J0IHsgQWJzdHJhY3RNb2RlbExvYWRlciB9IGZyb20gJy4vYWJzdHJhY3QtbW9kZWwtbG9hZGVyJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmplY3QtbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmplY3RMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iamVjdExvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PYmplY3RMb2FkZXIoKTtcblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZE1vZGVsT2JqZWN0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5sb2FkZXIubG9hZCh0aGlzLm1vZGVsLCBtb2RlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1wb2ludC1saWdodCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUG9pbnRMaWdodERpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRMaWdodERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuUG9pbnRMaWdodD4ge1xuXG4gIEBJbnB1dCgpIGNvbG9yOiBUSFJFRS5Db2xvcjtcbiAgQElucHV0KCkgaW50ZW5zaXR5OiBudW1iZXI7XG4gIEBJbnB1dCgpIGRpc3RhbmNlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuUG9pbnRMaWdodCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuUG9pbnRMaWdodCh0aGlzLmNvbG9yLCB0aGlzLmludGVuc2l0eSwgdGhpcy5kaXN0YW5jZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ0BhdmF0c2Fldi90aHJlZS1vcmJpdGNvbnRyb2xzLXRzJztcbi8vIGltcG9ydCB7IENhbWVyYUNvbnRyb2xzIH0gZnJvbSAnY2FtZXJhLWNvbnRyb2xzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtdGVzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90aHJlZS10ZXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGhyZWUtdGVzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVUZXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpIGNhbnZhc1JlZjogRWxlbWVudFJlZjtcblxuICBzY2VuZSA9IG51bGw7XG4gIGNhbWVyYSA9IG51bGw7XG4gIHJlbmRlcmVyID0gbnVsbDtcbiAgY29udHJvbHMgPSBudWxsO1xuICBtZXNoID0gbnVsbDtcbiAgbGlnaHQgPSBudWxsO1xuICBjb3VudCA9IDE7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KXtcbiAgIHRoaXMucmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsIDEsIDEsIDEwMDApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY29uZmlnU2NlbmUoKTtcbiAgICB0aGlzLmNvbmZpZ0NhbWVyYSgpO1xuICAgIHRoaXMuY29uZmlnUmVuZGVyZXIoKTtcbiAgICB0aGlzLmNvbmZpZ0NvbnRyb2xzKCk7XG5cbiAgICB0aGlzLmNyZWF0ZUxpZ2h0KCk7XG4gICAgdGhpcy5jcmVhdGVNZXNoKCk7XG5cbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIGNvbmZpZ1NjZW5lKCkge1xuICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvciggMHhkZGRkZGQgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICAvLyBjb25zb2xlLmxvZygnY2FudmFzLmNsaWVudFdpZHRoOiAnLCB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4vLyAgICBjb25zb2xlLmxvZygnY2FudmFzLmNsaWVudEhlaWdodDogJywgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIHVwZGF0ZUNhbWVyYSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLmNhbGN1bGF0ZUFzcGVjdFJhdGlvKCk7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cbiAgY29uZmlnQ2FtZXJhKCkge1xuICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KCAtMTUsIDEwLCAxNSApO1xuICAgIHRoaXMuY2FtZXJhLmxvb2tBdCggdGhpcy5zY2VuZS5wb3NpdGlvbiApO1xuICB9XG5cbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShmb3JjZSk6IHZvaWQge1xuICAgIC8vIFNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjk4ODQ0ODUvdGhyZWVqcy1jYW52YXMtc2l6ZS1iYXNlZC1vbi1jb250YWluZXJcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoZm9yY2UgfHwgdGhpcy5jYW52YXMud2lkdGggIT09IHdpZHRoIHx8IHRoaXMuY2FudmFzLmhlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAvLyB5b3UgbXVzdCBwYXNzIGZhbHNlIGhlcmUgb3IgdGhyZWUuanMgc2FkbHkgZmlnaHRzIHRoZSBicm93c2VyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCwgZmFsc2UpO1xuICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuICB9XG5cbiAgY29uZmlnUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBhbHBoYTogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbygxKTtcbiAgICAgLy8gVXNpbmcgc2V0UGl4ZWxSYXRpbyhkZXZpY2VQaXhlbFJhdGlvKSBmb3IgSEQtRFBJIGNhbiBjYXVzZSBleGNlc3NpdmUgcmVuZGVyaW5nLlxuICAgICAvLyBTZWU6IGh0dHBzOi8vd2ViZ2xmdW5kYW1lbnRhbHMub3JnL3dlYmdsL2xlc3NvbnMvd2ViZ2wtcmVzaXppbmctdGhlLWNhbnZhcy5odG1sXG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCwgMCApO1xuLyogICAgY29uc3Qgd2lkZ2V0UGFkZGluZyA9IDQ7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy53aWR0aCcsIHRoaXMuY2FudmFzLndpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLmNsaWVudFdpZHRoJywgdGhpcy5jYW52YXMuY2xpZW50V2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMub2Zmc2V0V2lkdGgnLCB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5zY3JvbGxXaWR0aCcsIHRoaXMuY2FudmFzLnNjcm9sbFdpZHRoKTtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKCdlbGVtIGNvbXB1dGVkJywgc3R5bGUud2lkdGgpO1xuICAgIC8vIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdCcsIHJlY3QpO1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zb2xlLmxvZygnZWxlbSByZWN0JywgcmVjdC53aWR0aCk7XG5cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC0gKHdpZGdldFBhZGRpbmcgKiAyKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7IC8vIHJlc2l6YWJsZSBsYXlvdXQgXCJjb2xcIiBmbGV4IGFkanVzdHMgaGVpZ2h0IHRvIGZpdFxuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiovXG4gICAgdGhpcy5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKHRydWUpO1xuICAgIC8vIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgfVxuXG4gIGNvbmZpZ0NvbnRyb2xzKCkge1xuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgdGhpcy5jYW52YXMpO1xuICAgIHRoaXMuY29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlWm9vbSA9IHRydWU7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVQYW4gID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY3JlYXRlTGlnaHQoKSB7XG4gICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KCAweGZmZmZmZiApO1xuICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KCAtMTAsIDEwLCAxMCApO1xuICAgIHRoaXMuc2NlbmUuYWRkKCB0aGlzLmxpZ2h0ICk7XG4gIH1cblxuICBjcmVhdGVNZXNoKCkge1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDUsIDUsIDUpO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XG4gICAgdGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lc2gpO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZSgpKTtcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueCArPSAwLjAxO1xuICAgIC8vIHRoaXMubWVzaC5yb3RhdGlvbi55ICs9IDAuMDE7XG4gICAgLy8gaWYgKHRoaXMuY291bnQgPCA2KSB7XG4gICAgLy8gY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdC53aWR0aCk7XG4gICAgLy8gdGhpcy5jb3VudCsrO1xuICAgIC8vIH1cbiAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvY29sbGFkYS1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9iakxvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJhZDJEZWdQaXBlIH0gZnJvbSAnLi9waXBlcy9yYWQyZGVnLnBpcGUnO1xuaW1wb3J0IHsgRGVnMlJhZFBpcGUgfSBmcm9tICcuL3BpcGVzL2RlZzJyYWQucGlwZSc7XG5pbXBvcnQgeyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSB9IGZyb20gJy4vY2FtZXJhcy9wZXJzcGVjdGl2ZS1jYW1lcmEuZGlyZWN0aXZlJztcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3JlbmRlcmVyL3dlYmdsLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY2VuZURpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQXhlc0hlbHBlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9oZWxwZXJzL2F4ZXMtaGVscGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHcmlkSGVscGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2hlbHBlcnMvZ3JpZC1oZWxwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9iamVjdExvYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9sb2FkZXJzL29iamVjdC1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvaW50TGlnaHREaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRocmVlVGVzdENvbXBvbmVudCB9IGZyb20gJy4vdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudCc7XG5cbi8vIFRPRE86IElkZWFsbHkgbW92ZSBhbGwgdG8gdGhyZWUtd3JhcHBlciBsaWJyYXJ5LiBCdXQgY2FuJ3QgbW92ZSBqcy9FbmFibGVUaHJlZUV4YW1wbGVzLmpzIHRvIGxpYnJhcnkgOihcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBPcmJpdENvbnRyb2xzRGlyZWN0aXZlLFxuICAgIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUsXG4gICAgT2JqTG9hZGVyRGlyZWN0aXZlLFxuICAgIFJhZDJEZWdQaXBlLFxuICAgIERlZzJSYWRQaXBlLFxuICAgIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLFxuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnQsXG4gICAgU2NlbmVEaXJlY3RpdmUsXG4gICAgQXhlc0hlbHBlckRpcmVjdGl2ZSxcbiAgICBHcmlkSGVscGVyRGlyZWN0aXZlLFxuICAgIE9iamVjdExvYWRlckRpcmVjdGl2ZSxcbiAgICBQb2ludExpZ2h0RGlyZWN0aXZlLFxuICAgIFRocmVlVGVzdENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSxcbiAgICBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlLFxuICAgIE9iakxvYWRlckRpcmVjdGl2ZSxcbiAgICBSYWQyRGVnUGlwZSxcbiAgICBEZWcyUmFkUGlwZSxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSxcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFNjZW5lRGlyZWN0aXZlLFxuICAgIEF4ZXNIZWxwZXJEaXJlY3RpdmUsXG4gICAgR3JpZEhlbHBlckRpcmVjdGl2ZSxcbiAgICBPYmplY3RMb2FkZXJEaXJlY3RpdmUsXG4gICAgUG9pbnRMaWdodERpcmVjdGl2ZSxcbiAgICBUaHJlZVRlc3RDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRocmVlTGliTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb250ZW50Q2hpbGRyZW4iLCJJbnB1dCIsInRzbGliXzEuX19leHRlbmRzIiwiVEhSRUUuU2NlbmUiLCJEaXJlY3RpdmUiLCJmb3J3YXJkUmVmIiwiVEhSRUUuV2ViR0xSZW5kZXJlciIsIlRIUkVFLlBDRlNvZnRTaGFkb3dNYXAiLCJDb21wb25lbnQiLCJWaWV3Q2hpbGQiLCJIb3N0TGlzdGVuZXIiLCJPcmJpdENvbnRyb2xzIiwiVEhSRUUuT2JqZWN0M0QiLCJUSFJFRS5Db2xsYWRhTG9hZGVyIiwiVEhSRUUuT0JKTG9hZGVyIiwiVEhSRUUuTVRMTG9hZGVyIiwiUGlwZSIsIlRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhIiwiVEhSRUUuQXhlc0hlbHBlciIsIlRIUkVFLkdyaWRIZWxwZXIiLCJUSFJFRS5PYmplY3RMb2FkZXIiLCJUSFJFRS5Qb2ludExpZ2h0IiwiVEhSRUUuQ29sb3IiLCJUSFJFRS5Cb3hHZW9tZXRyeSIsIlRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwiLCJUSFJFRS5NZXNoIiwiRWxlbWVudFJlZiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OzhCQUpEO0tBRUE7O0lDRkE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxH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QUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVB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