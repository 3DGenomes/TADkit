/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef, Input } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
import { AbstractModelLoader } from './abstract-model-loader';
/**
 * Directive for employing THREE.OBJLoader to load [Wavefront *.obj files][1].
 *
 * [1]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
 */
var ObjLoaderDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ObjLoaderDirective, _super);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
export { ObjLoaderDirective };
if (false) {
    /** @type {?} */
    ObjLoaderDirective.prototype.loader;
    /** @type {?} */
    ObjLoaderDirective.prototype.mtlLoader;
    /** @type {?} */
    ObjLoaderDirective.prototype.material;
    /** @type {?} */
    ObjLoaderDirective.prototype.texturePath;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqLWxvYWRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90aHJlZS1saWIvIiwic291cmNlcyI6WyJsaWIvb2JqZWN0cy9sb2FkZXJzL29iai1sb2FkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7O0lBV3RCLDhDQUFtQjs7O3VCQUN4QyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7MEJBQ2xCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7O0lBUXpCLDRDQUFlOzs7SUFBL0I7Ozs7O2dCQUVFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQy9CLHNCQUFPLElBQUksT0FBTyxDQUFpQixVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNqRCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLFVBQUEsS0FBSztnQ0FDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUNoQixFQUNDLFNBQVMsRUFDVCxNQUFNLENBQ1AsQ0FBQzt5QkFDSCxDQUFDLEVBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsc0JBQU8sSUFBSSxPQUFPLENBQWlCLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQ2pELElBQUksS0FBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7Z0NBQ2xDLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs2QkFDakQ7NEJBQ0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxVQUFBLFFBQVE7Z0NBQ3pDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FDbkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQSxLQUFLO29DQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUNBQ2hCLEVBQ0MsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDOzZCQUNILENBQUMsQ0FBQzt5QkFDSixDQUFDLEVBQUM7aUJBQ0o7Ozs7S0FDRjs7Z0JBMUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQyxFQUFFLENBQUM7aUJBQzlGOzs7MkJBS0UsS0FBSzs4QkFHTCxLQUFLOzs2QkFyQlI7RUFjd0MsbUJBQW1CO1NBQTlDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5pbXBvcnQgeyBBYnN0cmFjdE1vZGVsTG9hZGVyIH0gZnJvbSAnLi9hYnN0cmFjdC1tb2RlbC1sb2FkZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBmb3IgZW1wbG95aW5nIFRIUkVFLk9CSkxvYWRlciB0byBsb2FkIFtXYXZlZnJvbnQgKi5vYmogZmlsZXNdWzFdLlxuICpcbiAqIFsxXTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2F2ZWZyb250Xy5vYmpfZmlsZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1vYmotbG9hZGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPYmpMb2FkZXJEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIE9iakxvYWRlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0TW9kZWxMb2FkZXIge1xuICBwcml2YXRlIGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKTtcbiAgcHJpdmF0ZSBtdGxMb2FkZXIgPSBuZXcgVEhSRUUuTVRMTG9hZGVyKCk7XG5cbiAgQElucHV0KClcbiAgbWF0ZXJpYWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0ZXh0dXJlUGF0aDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBhc3luYyBsb2FkTW9kZWxPYmplY3QoKSB7XG4gICAgLy8gVE9ETzogbWFrZSBpdCBuaWNlclxuICAgIGlmICh0aGlzLm1hdGVyaWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgcmVqZWN0XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFRIUkVFLk9iamVjdDNEPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm10bExvYWRlci5zZXRUZXh0dXJlUGF0aCh0aGlzLnRleHR1cmVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm10bExvYWRlci5sb2FkKHRoaXMubWF0ZXJpYWwsIG1hdGVyaWFsID0+IHtcbiAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkKHRoaXMubW9kZWwsIG1vZGVsID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19