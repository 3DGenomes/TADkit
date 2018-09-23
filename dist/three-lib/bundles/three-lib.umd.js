(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('three-full'), require('@avatsaev/three-orbitcontrols-ts'), require('three'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('three-lib', ['exports', '@angular/core', 'three-full', '@avatsaev/three-orbitcontrols-ts', 'three', '@angular/common'], factory) :
    (factory((global['three-lib'] = {}),global.ng.core,global.THREE,global.threeOrbitcontrolsTs,global.THREE$1,global.ng.common));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIuc2VydmljZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9hYnN0cmFjdC1vYmplY3QtM2QudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEudHMiLCJuZzovL3RocmVlLWxpYi9saWIvcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly90aHJlZS1saWIvbGliL2NvbnRyb2xzL29yYml0LWNvbnRyb2xzLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvYWJzdHJhY3QtbW9kZWwtbG9hZGVyLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL3BpcGVzL3JhZDJkZWcucGlwZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9waXBlcy9kZWcycmFkLnBpcGUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvY2FtZXJhcy9wZXJzcGVjdGl2ZS1jYW1lcmEuZGlyZWN0aXZlLnRzIiwibmc6Ly90aHJlZS1saWIvbGliL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9oZWxwZXJzL2dyaWQtaGVscGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi9vYmplY3RzL2xvYWRlcnMvb2JqZWN0LWxvYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvb2JqZWN0cy9saWdodC9wb2ludC1saWdodC5kaXJlY3RpdmUudHMiLCJuZzovL3RocmVlLWxpYi9saWIvdGhyZWUtdGVzdC90aHJlZS10ZXN0LmNvbXBvbmVudC50cyIsIm5nOi8vdGhyZWUtbGliL2xpYi90aHJlZS1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RPYmplY3QzRDxUIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0T2JqZWN0M0QsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIGNoaWxkTm9kZXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPj47XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVk6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVaOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdHJhbnNsYXRlWDogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVo6IG51bWJlcjtcblxuICBwcml2YXRlIG9iamVjdDogVDtcblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5vYmplY3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbXVzdFJlcmVuZGVyID0gZmFsc2U7XG5cbiAgICBpZiAoWydyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG11c3RSZXJlbmRlcikge1xuICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0T2JqZWN0M0QubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5vYmplY3QgPSB0aGlzLm5ld09iamVjdDNESW5zdGFuY2UoKTtcblxuICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZmlsdGVyKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmdldE9iamVjdCgpICE9PSB1bmRlZmluZWQpLmZvckVhY2goaSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkIGNoaWxkIGZvciBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKGkuZ2V0T2JqZWN0KCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gY2hpbGQgT2JqZWN0M0QgZm9yOiBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlSb3RhdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBhbmdsZXMgPSBbXG4gICAgICB0aGlzLnJvdGF0ZVgsXG4gICAgICB0aGlzLnJvdGF0ZVksXG4gICAgICB0aGlzLnJvdGF0ZVpcbiAgICBdLm1hcChhbmdsZSA9PiBhbmdsZSB8fCAwKTtcblxuICAgIHRoaXMub2JqZWN0LnJvdGF0aW9uLnNldChcbiAgICAgIHRoaXMucm90YXRlWCB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVZIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVogfHwgMCxcbiAgICAgICdYWVonXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlUcmFuc2xhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5zZXQoXG4gICAgICB0aGlzLnRyYW5zbGF0ZVggfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWSB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVaIHx8IDBcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZENoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5hZGQob2JqZWN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucmVtb3ZlKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFQge1xuICAgIHJldHVybiB0aGlzLm9iamVjdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFmdGVySW5pdCgpOiB2b2lkO1xuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXNjZW5lJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTY2VuZURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgU2NlbmVEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlNjZW5lPiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuU2NlbmUge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5TY2VuZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIElucHV0LCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENhbWVyYTxUIGV4dGVuZHMgVEhSRUUuQ2FtZXJhPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIGNhbWVyYTogVDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0Q2FtZXJhLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKTtcblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBIb3N0TGlzdGVuZXIsXG4gIFF1ZXJ5TGlzdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vb2JqZWN0cy9zY2VuZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuLi9jYW1lcmFzL2Fic3RyYWN0LWNhbWVyYSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhyZWUtd2ViZ2wtcmVuZGVyZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93ZWJnbC1yZW5kZXJlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdlYkdMUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBwcml2YXRlIHZpZXdJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpXG4gIHByaXZhdGUgY2FudmFzUmVmOiBFbGVtZW50UmVmOyAvLyBOT1RFOiBzYXkgYnllLWJ5ZSB0byBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgOylcblxuICBAQ29udGVudENoaWxkcmVuKFNjZW5lRGlyZWN0aXZlKSBzY2VuZUNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTY2VuZURpcmVjdGl2ZT47IC8vIFRPRE86IE11bHRpcGxlIHNjZW5lc1xuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhKSBjYW1lcmFDb21wb25lbnRzOiBRdWVyeUxpc3Q8QWJzdHJhY3RDYW1lcmE8VEhSRUUuQ2FtZXJhPj47IC8vIFRPRE86IE11bHRpcGxlIGNhbWVyYXNcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyZXJDb21wb25lbnQuY29uc3RydWN0b3InKTtcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0UmVuZGVyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlbmRlciBwYW5lIG9uIHdoaWNoIHRoZSBzY2VuZSBpcyByZW5kZXJlZC5cbiAgICogQ3VycmVudGx5LCBvbmx5IHRoZSBXZWJHTCByZW5kZXJlciB3aXRoIGEgY2FudmFzIGlzIHVzZWQgaW4gdGhpc1xuICAgKiBpbXBsZW1lbnRhdGlvbiwgc28gdGhpcyBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSBhbiBFbGVtZW50UmVmIHRvIHRoZVxuICAgKiB1bmRlcmx5aW5nIDxjYW52YXM+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtyb3RhdGVTcGVlZF09MSBbem9vbVNwZWVkXT0xLjIgW2xpc3RlbmluZ0NvbnRyb2xFbGVtZW50XT1tYWluUmVuZGVyZXIucmVuZGVyUGFuZT5cbiAgICogICA8dGhyZWUtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICogICAgIC4uLlxuICAgKiAgIDwvdGhyZWUtcmVuZGVyZXI+XG4gICAqIDwvdGhyZWUtb3JiaXQtY29udHJvbHM+XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJQYW5lKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1JlZjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0UmVuZGVyaW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZW5kZXJlckNvbXBvbmVudC5zdGFydFJlbmRlcmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXMuY2xpZW50V2lkdGgsIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHhmZmZmZmYsIDEpO1xuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyBpZiAodGhpcy5zY2VuZUNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2NlbmVDb21wb25lbnRzLmxlbmd0aCA9PSAxICYmXG4gICAgLy8gICAgIHRoaXMuY2FtZXJhQ29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiYgdGhpcy5jYW1lcmFDb21wb25lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCBzY2VuZUNvbXBvbmVudCA9IHRoaXMuc2NlbmVDb21wb25lbnRzLmZpcnN0O1xuICAgICAgY29uc3QgY2FtZXJhQ29tcG9uZW50ID0gdGhpcy5jYW1lcmFDb21wb25lbnRzLmZpcnN0O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzY2VuZS5nZXRPYmplY3QoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjYW1lcmEuY2FtZXJhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lQ29tcG9uZW50LmdldE9iamVjdCgpLCBjYW1lcmFDb21wb25lbnQuY2FtZXJhKTtcbiAgICB9XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlcmVyQ29tcG9uZW50Lm9uUmVzaXplOiAnICsgdGhpcy5jYW52YXMuY2xpZW50V2lkdGggKyAnLCAnICsgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcblxuICAgIHRoaXMudXBkYXRlQ2hpbGRDYW1lcmFzQXNwZWN0UmF0aW8oKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNoaWxkQ2FtZXJhc0FzcGVjdFJhdGlvKCkge1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYUNvbXBvbmVudHMuZm9yRWFjaChjYW1lcmEgPT4gY2FtZXJhLnVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdCkpO1xuICB9XG5cbiAgLypcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25LZXlQcmVzczogXCIgKyBldmVudC5rZXkpO1xuICB9XG4qL1xuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICdAYXZhdHNhZXYvdGhyZWUtb3JiaXRjb250cm9scy10cyc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhcy9hYnN0cmFjdC1jYW1lcmEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vcmJpdC1jb250cm9scydcbn0pXG5leHBvcnQgY2xhc3MgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0Q2FtZXJhLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNoaWxkQ2FtZXJhczogUXVlcnlMaXN0PEFic3RyYWN0Q2FtZXJhPFRIUkVFLkNhbWVyYT4+O1xuICBAQ29udGVudENoaWxkcmVuKFdlYkdMUmVuZGVyZXJDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY2hpbGRSZW5kZXJlcnM6IFF1ZXJ5TGlzdDxXZWJHTFJlbmRlcmVyQ29tcG9uZW50PjtcbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IG9uIHdob3NlIG5hdGl2ZSBlbGVtZW50IHRoZSBvcmJpdCBjb250cm9scyB3aWxsIGxpc3RlbiBmb3IgbW91c2UgZXZlbnRzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQga2V5Ym9hcmQgZXZlbnRzIGFyZSBzdGlsbCBsaXN0ZW5lZCBmb3Igb24gdGhlIGdsb2JhbCB3aW5kb3cgb2JqZWN0LCB0aGlzIGlzXG4gICAqIGEga25vd24gaXNzdWUgZnJvbSBUaHJlZS5qczogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzEwMzE1XG4gICAqXG4gICAqIEBleGFtcGxlIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gcmVzdHJpY3QgdGhlIG9yYml0IGNvbnRyb2xzIChpLmUuIHRoZVxuICAgKiBhcmVhIHdoaWNoIGlzIGxpc3RlbmVkIGZvciBtb3VzZSBtb3ZlIGFuZCB6b29tIGV2ZW50cykgdG8gdGhlIHJlbmRlcmluZyBwYW5lOlxuICAgKiBgYGBcbiAgICogPHRocmVlLW9yYml0LWNvbnRyb2xzIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gICAqICAgPHRocmVlLXJlbmRlcmVyICNtYWluUmVuZGVyZXI+XG4gICAqICAgICAuLi5cbiAgICogICA8L3RocmVlLXJlbmRlcmVyPlxuICAgKiA8L3RocmVlLW9yYml0LWNvbnRyb2xzPlxuICAgKiBgYGBcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RlbmluZ0NvbnRyb2xFbGVtZW50OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIHJvdGF0ZVNwZWVkID0gMS4wO1xuICBASW5wdXQoKSB6b29tU3BlZWQgPSAxLjI7XG5cbiAgLy8gcHJpdmF0ZSBjb250cm9sczogVEhSRUUuT3JiaXRDb250cm9scztcbiAgcHJpdmF0ZSBjb250cm9sczogT3JiaXRDb250cm9scztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnT3JiaXRDb250cm9sc0RpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIElmIHRoZSBUSFJFRS5qcyBPcmJpdENvbnRyb2xzIGFyZSBub3Qgc2V0IHVwIHlldCwgd2UgZG8gbm90IG5lZWQgdG8gdXBkYXRlXG4gICAgLy8gYW55dGhpbmcgYXMgdGhleSB3aWxsIHBpY2sgdGhlIG5ldyB2YWx1ZXMgZnJvbSB0aGUgQElucHV0IHByb3BlcnRpZXMgYXV0b21hdGljYWxseVxuICAgIC8vIHVwb24gY3JlYXRpb24uXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3JvdGF0ZVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMucm90YXRlU3BlZWQgPSB0aGlzLnJvdGF0ZVNwZWVkO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snem9vbVNwZWVkJ10pIHtcbiAgICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gdGhpcy56b29tU3BlZWQ7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydsaXN0ZW5pbmdDb250cm9sRWxlbWVudCddKSB7XG4gICAgICAvLyBUaGUgRE9NIGVsZW1lbnQgdGhlIE9yYml0Q29udHJvbHMgbGlzdGVuIG9uIGNhbm5vdCBiZSBjaGFuZ2VkIG9uY2UgYW5cbiAgICAgIC8vIE9yYml0Q29udHJvbHMgb2JqZWN0IGlzIGNyZWF0ZWQuIFdlIHRodXMgbmVlZCB0byByZWNyZWF0ZSBpdC5cbiAgICAgIHRoaXMuY29udHJvbHMuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5zZXRVcE9yYml0Q29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBPcmJpdENvbnRyb2xzKCkge1xuICAgIC8vIHRoaXMuY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoXG4gICAgICAgIHRoaXMuY2hpbGRDYW1lcmFzLmZpcnN0LmNhbWVyYSxcbiAgICAgIHRoaXMubGlzdGVuaW5nQ29udHJvbEVsZW1lbnQgJiYgdGhpcy5saXN0ZW5pbmdDb250cm9sRWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgKTtcbiAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gdGhpcy5yb3RhdGVTcGVlZDtcbiAgICB0aGlzLmNvbnRyb2xzLnpvb21TcGVlZCA9IHRoaXMuem9vbVNwZWVkO1xuICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdC5yZW5kZXIpO1xuICAgIHRoaXMuY2hpbGRSZW5kZXJlcnMuZmlyc3QucmVuZGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ09yYml0Q29udHJvbHNEaXJlY3RpdmUubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgaWYgKHRoaXMuY2hpbGRDYW1lcmFzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZENhbWVyYXMuZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW1lcmEgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNoaWxkUmVuZGVyZXJzID09PSB1bmRlZmluZWQgfHwgdGhpcy5jaGlsZFJlbmRlcmVycy5maXJzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyIGlzIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VXBPcmJpdENvbnRyb2xzKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG4vKipcbiAqIEhlbHBlciBwYXJlbnQgY2xhc3MgZm9yIG1vZGVsIGxvYWRlciBkaXJlY3RpdmVzLlxuICpcbiAqIEBzZWUgT2JqZWN0TG9hZGVyRGlyZWN0aXZlXG4gKiBAc2VlIE9iakxvYWRlckRpcmVjdGl2ZVxuICogQHNlZSBDb2xsYWRhTG9hZGVyRGlyZWN0aXZlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE1vZGVsTG9hZGVyIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX21vZGVsOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBXZWJHTFJlbmRlcmVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIHNpZ25hbCB3aGV0aGVyIHRoZSBwYXJlbnQgY2xhc3MgaW5zdGFuY2UgQWJzdHJhY3RPYmplY3QzRCBjYWxsZWQgdGhlXG4gICAqIG92ZXJ3cml0dGVuIG1ldGhvZCB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUjYWZ0ZXJJbml0fSB5ZXQuXG4gICAqXG4gICAqIFVubGVzcyB0aGF0IG1ldGhvZCB3YXMgY2FsbGVkLCBubyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHtAbGluayBBYnN0cmFjdE9iamVjdDNEfVxuICAgKiBtYXkgYmUgc2FmZWx5IGFjY2Vzc2VkLCBlc3BlY2lhbGx5IHtAbGluayBBYnN0cmFjdE9iamVjdDNEI2FkZENoaWxkfSBhbmRcbiAgICoge0BsaW5rIEFic3RyYWN0T2JqZWN0M0QucmVuZGVyZXJ9LlxuICAgKi9cbiAgcHJpdmF0ZSBwYXJlbnRJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50TG9hZGVkTW9kZWxPYmplY3Q6IFRIUkVFLk9iamVjdDNEIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBtb2RlbCBvYmplY3QuXG4gICAqXG4gICAqIFNvbWUgbG9hZGVycyAoZS5nLiBDb2xsYWRhTG9hZGVyKSBhbHNvIHByb3ZpZGUgb3RoZXIgbW9kZWwgaW5mb3JtYXRpb25cbiAgICogdXBvbiBsb2FkaW5nIGJlc2lkZXMgdGhlIFwicmF3XCIgbW9kZWwgb2JqZWN0L3NjZW5lLiBJbiB0aGVzZSBjYXNlc1xuICAgKiBpbXBsZW1lbnRpbmcgY2hpbGQgY2xhc3NlcyBhcmUgaW5kZWVkIHN1cHBvc2VkIHRvIHJldHVybiB0aGUgXCJyYXdcIiBtb2RlbFxuICAgKiBvYmplY3QuXG4gICAqIFRoZSBkYXRhIHNvdXJjZSAodXN1YWxseSBhIFVSSSwgYWx0aG91Z2ggY2hpbGQgY2xhc3NlcyBhcmUgZnJlZSB0byBpbXBsZW1lbnRcbiAgICogb3RoZXIgbWVhbnMgYXMgd2VsbCkgZnJvbSB3aGljaCB0aGUgbW9kZWwgc2hhbGwgYmUgbG9hZGVkIGNhbiBiZSBvYnRhaW5lZCBieVxuICAgKiB7QGxpbmsgTW9kZWxMb2FkZXJEaXJlY3RpdmUubW9kZWx9LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jIGxvYWRNb2RlbE9iamVjdCgpOiBQcm9taXNlPFRIUkVFLk9iamVjdDNEPjtcblxuICAvKipcbiAgICogVGhlIG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICogU2V0dGluZ3MgdGhpcyBwcm9wZXJ0eSBvbmx5IGhpZGVzIHRoZSBwcmV2aW91cyBtb2RlbCB1cG9uIHN1Y2Nlc3NmdWxcbiAgICogbG9hZGluZyBvZiB0aGUgbmV3IG9uZS4gVGhpcyBlc3BlY2lhbGx5IG1lYW5zIHRoYXQgaWYgdGhlIG5ldyBkYXRhIHNvdXJjZVxuICAgKiBpcyBpbnZhbGlkLCB0aGUgb2xkIG1vZGVsIHdpbGwgKm5vdCogYmUgcmVtb3ZlZCBmcm9tIHRoZSBzY2VuZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbW9kZWwobmV3TW9kZWxVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX21vZGVsID0gbmV3TW9kZWxVcmw7XG5cbiAgICAvLyBEZWxheSBtb2RlbCBsb2FkaW5nIHVudGlsIHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQsXG4gICAgLy8gc28gdGhhdCB3ZSBjYW4gY2FsbCBhZGRDaGlsZCgpLlxuICAgIGlmICghdGhpcy5wYXJlbnRJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZE1vZGVsT2JqZWN0KCkudGhlbihuZXdNb2RlbCA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRMb2FkZWRNb2RlbE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvYWRlZE1vZGVsT2JqZWN0ID0gbmV3TW9kZWw7XG4gICAgICB0aGlzLmFkZENoaWxkKG5ld01vZGVsKTtcblxuICAgICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG1vZGVsIGRhdGEgc291cmNlICh1c3VhbGx5IGEgVVJJKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCByZW5kZXJlcihuZXdSZW5kZXJlcjogV2ViR0xSZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3UmVuZGVyZXI7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyBUcmlnZ2VyIG1vZGVsIGFjcXVpc2l0aW9uIG5vdyB0aGF0IHRoZSBwYXJlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50TG9hZGVkTW9kZWxPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXJlbmRlcigpIHtcbiAgICBzdXBlci5yZXJlbmRlcigpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0TW9kZWxMb2FkZXIgfSBmcm9tICcuL2Fic3RyYWN0LW1vZGVsLWxvYWRlcic7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtY29sbGFkYS1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE1vZGVsTG9hZGVyIHtcbiAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgVEhSRUUuQ29sbGFkYUxvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsLnNjZW5lKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBmb3IgZW1wbG95aW5nIFRIUkVFLk9CSkxvYWRlciB0byBsb2FkIFtXYXZlZnJvbnQgKi5vYmogZmlsZXNdWzFdLlxuICpcbiAqIFsxXTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2F2ZWZyb250Xy5vYmpfZmlsZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmotbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmpMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iakxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKTtcbiAgcHJpdmF0ZSBtdGxMb2FkZXIgPSBuZXcgVEhSRUUuTVRMTG9hZGVyKCk7XG5cbiAgQElucHV0KClcbiAgbWF0ZXJpYWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0ZXh0dXJlUGF0aDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgLy8gVE9ETzogbWFrZSBpdCBuaWNlclxuICAgIGlmICh0aGlzLm1hdGVyaWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgcmVqZWN0XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm10bExvYWRlci5zZXRUZXh0dXJlUGF0aCh0aGlzLnRleHR1cmVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm10bExvYWRlci5sb2FkKHRoaXMubWF0ZXJpYWwsIG1hdGVyaWFsID0+IHtcbiAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdyYWQyZGVnJ1xufSlcbmV4cG9ydCBjbGFzcyBSYWQyRGVnUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXNcbiAgICogQHBhcmFtIHJhZGlhbnMgUmFkaWFuc1xuICAgKi9cbiAgdHJhbnNmb3JtKHJhZGlhbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdkZWcycmFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWcyUmFkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICogQHBhcmFtIGRlZ3JlZSBEZWdyZWVzXG4gICAqL1xuICB0cmFuc2Zvcm0oZGVncmVlczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKGRlZ3JlZXMgLyAxODApICogTWF0aC5QSTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi9hYnN0cmFjdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBlcnNwZWN0aXZlLWNhbWVyYScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RDYW1lcmEsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0Q2FtZXJhPFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhPiB7XG5cbiAgLy8gQElucHV0KCkgY2FtZXJhVGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblxuICBASW5wdXQoKSBmb3Y6IG51bWJlcjtcbiAgQElucHV0KCkgbmVhcjogbnVtYmVyO1xuICBASW5wdXQoKSBmYXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBwb3NpdGlvblg6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25ZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWjogbnVtYmVyO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIGxldCBhc3BlY3RSYXRpbyA9IHVuZGVmaW5lZDsgLy8gVXBkYXRlZCBsYXRlclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxuICAgICAgdGhpcy5mb3YsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLm5lYXIsXG4gICAgICB0aGlzLmZhclxuICAgICk7XG5cbiAgICAvLyBTZXQgcG9zaXRpb24gYW5kIGxvb2sgYXRcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvblg7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb25ZO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBvc2l0aW9uWjtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUudXBkYXRlQXNwZWN0UmF0aW86ICcgKyBhc3BlY3QpO1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IGFzcGVjdDtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1heGVzLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXhlc0hlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgQXhlc0hlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5BeGVzSGVscGVyIHtcbiAgICBjb25zb2xlLmxvZygnQXhlc0hlbHBlckRpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5BeGVzSGVscGVyKHRoaXMuc2l6ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIG5vbmVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1ncmlkLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gR3JpZEhlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZEhlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgZGl2aXNpb25zOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuR3JpZEhlbHBlcih0aGlzLnNpemUsIHRoaXMuZGl2aXNpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLW9iamVjdC1sb2FkZXInLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9iamVjdExvYWRlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RNb2RlbExvYWRlciB7XG4gIHByaXZhdGUgbG9hZGVyID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICByZWplY3RcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBvaW50LWxpZ2h0JyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQb2ludExpZ2h0RGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5Qb2ludExpZ2h0PiB7XG5cbiAgQElucHV0KCkgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBASW5wdXQoKSBpbnRlbnNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgZGlzdGFuY2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5Qb2ludExpZ2h0IHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5Qb2ludExpZ2h0KHRoaXMuY29sb3IsIHRoaXMuaW50ZW5zaXR5LCB0aGlzLmRpc3RhbmNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAnQGF2YXRzYWV2L3RocmVlLW9yYml0Y29udHJvbHMtdHMnO1xuLy8gaW1wb3J0IHsgQ2FtZXJhQ29udHJvbHMgfSBmcm9tICdjYW1lcmEtY29udHJvbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aHJlZS10ZXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RocmVlLXRlc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aHJlZS10ZXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaHJlZVRlc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzUmVmOiBFbGVtZW50UmVmO1xuXG4gIHNjZW5lID0gbnVsbDtcbiAgY2FtZXJhID0gbnVsbDtcbiAgcmVuZGVyZXIgPSBudWxsO1xuICBjb250cm9scyA9IG51bGw7XG4gIG1lc2ggPSBudWxsO1xuICBsaWdodCA9IG51bGw7XG4gIGNvdW50ID0gMTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQpe1xuICAgdGhpcy5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgMSwgMSwgMTAwMCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jb25maWdTY2VuZSgpO1xuICAgIHRoaXMuY29uZmlnQ2FtZXJhKCk7XG4gICAgdGhpcy5jb25maWdSZW5kZXJlcigpO1xuICAgIHRoaXMuY29uZmlnQ29udHJvbHMoKTtcblxuICAgIHRoaXMuY3JlYXRlTGlnaHQoKTtcbiAgICB0aGlzLmNyZWF0ZU1lc2goKTtcblxuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cbiAgY29uZmlnU2NlbmUoKSB7XG4gICAgdGhpcy5zY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKCAweGRkZGRkZCApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgIC8vIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50V2lkdGg6ICcsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoKTtcbi8vICAgIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50SGVpZ2h0OiAnLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgdXBkYXRlQ2FtZXJhKCk6IHZvaWQge1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMuY2FsY3VsYXRlQXNwZWN0UmF0aW8oKTtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBjb25maWdDYW1lcmEoKSB7XG4gICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5zZXQoIC0xNSwgMTAsIDE1ICk7XG4gICAgdGhpcy5jYW1lcmEubG9va0F0KCB0aGlzLnNjZW5lLnBvc2l0aW9uICk7XG4gIH1cblxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGZvcmNlKTogdm9pZCB7XG4gICAgLy8gU2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTg4NDQ4NS90aHJlZWpzLWNhbnZhcy1zaXplLWJhc2VkLW9uLWNvbnRhaW5lclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIGlmIChmb3JjZSB8fCB0aGlzLmNhbnZhcy53aWR0aCAhPT0gd2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgIC8vIHlvdSBtdXN0IHBhc3MgZmFsc2UgaGVyZSBvciB0aHJlZS5qcyBzYWRseSBmaWdodHMgdGhlIGJyb3dzZXJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0LCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG4gIH1cblxuICBjb25maWdSZW5kZXJlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIGFscGhhOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKDEpO1xuICAgICAvLyBVc2luZyBzZXRQaXhlbFJhdGlvKGRldmljZVBpeGVsUmF0aW8pIGZvciBIRC1EUEkgY2FuIGNhdXNlIGV4Y2Vzc2l2ZSByZW5kZXJpbmcuXG4gICAgIC8vIFNlZTogaHR0cHM6Ly93ZWJnbGZ1bmRhbWVudGFscy5vcmcvd2ViZ2wvbGVzc29ucy93ZWJnbC1yZXNpemluZy10aGUtY2FudmFzLmh0bWxcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwLCAwICk7XG4vKiAgICBjb25zdCB3aWRnZXRQYWRkaW5nID0gNDtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLndpZHRoJywgdGhpcy5jYW52YXMud2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMuY2xpZW50V2lkdGgnLCB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCk7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcy5vZmZzZXRXaWR0aCcsIHRoaXMuY2FudmFzLm9mZnNldFdpZHRoKTtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzLnNjcm9sbFdpZHRoJywgdGhpcy5jYW52YXMuc2Nyb2xsV2lkdGgpO1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgY29uc29sZS5sb2coJ2VsZW0gY29tcHV0ZWQnLCBzdHlsZS53aWR0aCk7XG4gICAgLy8gY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdCk7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnNvbGUubG9nKCdlbGVtIHJlY3QnLCByZWN0LndpZHRoKTtcblxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggLSAod2lkZ2V0UGFkZGluZyAqIDIpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDsgLy8gcmVzaXphYmxlIGxheW91dCBcImNvbFwiIGZsZXggYWRqdXN0cyBoZWlnaHQgdG8gZml0XG4gICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuKi9cbiAgICB0aGlzLnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUodHJ1ZSk7XG4gICAgLy8gdGhpcy51cGRhdGVDaGlsZENhbWVyYXNBc3BlY3RSYXRpbygpO1xuICB9XG5cbiAgY29uZmlnQ29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLmNhbnZhcyk7XG4gICAgdGhpcy5jb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVab29tID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVBhbiAgPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gIH1cblxuICBjcmVhdGVMaWdodCgpIHtcbiAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoIDB4ZmZmZmZmICk7XG4gICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoIC0xMCwgMTAsIDEwICk7XG4gICAgdGhpcy5zY2VuZS5hZGQoIHRoaXMubGlnaHQgKTtcbiAgfVxuXG4gIGNyZWF0ZU1lc2goKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNSwgNSwgNSk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KTtcbiAgICB0aGlzLm1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlKCkpO1xuICAgIC8vIHRoaXMubWVzaC5yb3RhdGlvbi54ICs9IDAuMDE7XG4gICAgLy8gdGhpcy5tZXNoLnJvdGF0aW9uLnkgKz0gMC4wMTtcbiAgICAvLyBpZiAodGhpcy5jb3VudCA8IDYpIHtcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlY3QnLCByZWN0LndpZHRoKTtcbiAgICAvLyB0aGlzLmNvdW50Kys7XG4gICAgLy8gfVxuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3JiaXRDb250cm9sc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbHMvb3JiaXQtY29udHJvbHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbGxhZGFMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvbG9hZGVycy9jb2xsYWRhLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT2JqTG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvb2JqLWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmFkMkRlZ1BpcGUgfSBmcm9tICcuL3BpcGVzL3JhZDJkZWcucGlwZSc7XG5pbXBvcnQgeyBEZWcyUmFkUGlwZSB9IGZyb20gJy4vcGlwZXMvZGVnMnJhZC5waXBlJztcbmltcG9ydCB7IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIH0gZnJvbSAnLi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2ViR0xSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vcmVuZGVyZXIvd2ViZ2wtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNjZW5lRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL3NjZW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBeGVzSGVscGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2hlbHBlcnMvYXhlcy1oZWxwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdyaWRIZWxwZXJEaXJlY3RpdmUgfSBmcm9tICcuL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT2JqZWN0TG9hZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9vYmplY3RzL2xvYWRlcnMvb2JqZWN0LWxvYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9pbnRMaWdodERpcmVjdGl2ZSB9IGZyb20gJy4vb2JqZWN0cy9saWdodC9wb2ludC1saWdodC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGhyZWVUZXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aHJlZS10ZXN0L3RocmVlLXRlc3QuY29tcG9uZW50JztcblxuLy8gVE9ETzogSWRlYWxseSBtb3ZlIGFsbCB0byB0aHJlZS13cmFwcGVyIGxpYnJhcnkuIEJ1dCBjYW4ndCBtb3ZlIGpzL0VuYWJsZVRocmVlRXhhbXBsZXMuanMgdG8gbGlicmFyeSA6KFxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE9yYml0Q29udHJvbHNEaXJlY3RpdmUsXG4gICAgQ29sbGFkYUxvYWRlckRpcmVjdGl2ZSxcbiAgICBPYmpMb2FkZXJEaXJlY3RpdmUsXG4gICAgUmFkMkRlZ1BpcGUsXG4gICAgRGVnMlJhZFBpcGUsXG4gICAgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUsXG4gICAgV2ViR0xSZW5kZXJlckNvbXBvbmVudCxcbiAgICBTY2VuZURpcmVjdGl2ZSxcbiAgICBBeGVzSGVscGVyRGlyZWN0aXZlLFxuICAgIEdyaWRIZWxwZXJEaXJlY3RpdmUsXG4gICAgT2JqZWN0TG9hZGVyRGlyZWN0aXZlLFxuICAgIFBvaW50TGlnaHREaXJlY3RpdmUsXG4gICAgVGhyZWVUZXN0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBPcmJpdENvbnRyb2xzRGlyZWN0aXZlLFxuICAgIENvbGxhZGFMb2FkZXJEaXJlY3RpdmUsXG4gICAgT2JqTG9hZGVyRGlyZWN0aXZlLFxuICAgIFJhZDJEZWdQaXBlLFxuICAgIERlZzJSYWRQaXBlLFxuICAgIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLFxuICAgIFdlYkdMUmVuZGVyZXJDb21wb25lbnQsXG4gICAgU2NlbmVEaXJlY3RpdmUsXG4gICAgQXhlc0hlbHBlckRpcmVjdGl2ZSxcbiAgICBHcmlkSGVscGVyRGlyZWN0aXZlLFxuICAgIE9iamVjdExvYWRlckRpcmVjdGl2ZSxcbiAgICBQb2ludExpZ2h0RGlyZWN0aXZlLFxuICAgIFRocmVlVGVzdENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBXZWJHTFJlbmRlcmVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGhyZWVMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbnRlbnRDaGlsZHJlbiIsIklucHV0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJUSFJFRS5TY2VuZSIsIkRpcmVjdGl2ZSIsImZvcndhcmRSZWYiLCJUSFJFRS5XZWJHTFJlbmRlcmVyIiwiVEhSRUUuUENGU29mdFNoYWRvd01hcCIsIkNvbXBvbmVudCIsIlZpZXdDaGlsZCIsIkhvc3RMaXN0ZW5lciIsIk9yYml0Q29udHJvbHMiLCJUSFJFRS5PYmplY3QzRCIsIlRIUkVFLkNvbGxhZGFMb2FkZXIiLCJUSFJFRS5PQkpMb2FkZXIiLCJUSFJFRS5NVExMb2FkZXIiLCJQaXBlIiwiVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEiLCJUSFJFRS5BeGVzSGVscGVyIiwiVEhSRUUuR3JpZEhlbHBlciIsIlRIUkVFLk9iamVjdExvYWRlciIsIlRIUkVFLlBvaW50TGlnaHQiLCJUSFJFRS5Db2xvciIsIlRIUkVFLkJveEdlb21ldHJ5IiwiVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCIsIlRIUkVFLk1lc2giLCJFbGVtZW50UmVmIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7OEJBSkQ7S0FFQTs7SUNGQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFB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NEJBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNy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