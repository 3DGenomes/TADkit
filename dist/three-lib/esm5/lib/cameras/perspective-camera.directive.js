/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractCamera } from './abstract-camera';
import * as THREE from 'three-full';
var PerspectiveCameraDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PerspectiveCameraDirective, _super);
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
export { PerspectiveCameraDirective };
if (false) {
    /** @type {?} */
    PerspectiveCameraDirective.prototype.fov;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.near;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.far;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.positionX;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.positionY;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.positionZ;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RocmVlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUVwQztJQUlnRCxzREFBdUM7SUFhckY7UUFBQSxpQkFHQztRQUZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUN0RCxRQUFBLGlCQUFPLFNBQUM7O0lBQ1YsQ0FBQzs7OztJQUVTLDhDQUFTOzs7SUFBbkI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDcEQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQ3ZDLElBQUksQ0FBQyxHQUFHLEVBQ1IsU0FBUyxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVNLHNEQUFpQjs7OztJQUF4QixVQUF5QixNQUFjO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN2QyxDQUFDOztnQkEzQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBMEIsRUFBMUIsQ0FBMEIsQ0FBQyxFQUFFLENBQUM7aUJBQ3BHOzs7O3NCQUtFLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUVMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQWdDUixpQ0FBQztDQUFBLEFBOUNELENBSWdELGNBQWMsR0EwQzdEO1NBMUNZLDBCQUEwQjs7O0lBSXJDLHlDQUFxQjs7SUFDckIsMENBQXNCOztJQUN0Qix5Q0FBcUI7O0lBRXJCLCtDQUEyQjs7SUFDM0IsK0NBQTJCOztJQUMzQiwrQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q2FtZXJhIH0gZnJvbSAnLi9hYnN0cmFjdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBlcnNwZWN0aXZlLWNhbWVyYScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RDYW1lcmEsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0Q2FtZXJhPFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhPiB7XG5cbiAgLy8gQElucHV0KCkgY2FtZXJhVGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblxuICBASW5wdXQoKSBmb3Y6IG51bWJlcjtcbiAgQElucHV0KCkgbmVhcjogbnVtYmVyO1xuICBASW5wdXQoKSBmYXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBwb3NpdGlvblg6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25ZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWjogbnVtYmVyO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICAgIC8vIGxldCBhc3BlY3RSYXRpbyA9IHVuZGVmaW5lZDsgLy8gVXBkYXRlZCBsYXRlclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxuICAgICAgdGhpcy5mb3YsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLm5lYXIsXG4gICAgICB0aGlzLmZhclxuICAgICk7XG5cbiAgICAvLyBTZXQgcG9zaXRpb24gYW5kIGxvb2sgYXRcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvblg7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb25ZO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBvc2l0aW9uWjtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNwZWN0UmF0aW8oYXNwZWN0OiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUudXBkYXRlQXNwZWN0UmF0aW86ICcgKyBhc3BlY3QpO1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IGFzcGVjdDtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cblxuXG59XG4iXX0=