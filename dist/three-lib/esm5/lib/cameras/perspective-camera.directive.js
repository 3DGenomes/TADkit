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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RocmVlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQzs7SUFNWSxzREFBdUM7SUFhckY7UUFBQSxpQkFHQztRQUZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUN0RCxRQUFBLGlCQUFPLFNBQUM7O0tBQ1Q7Ozs7SUFFUyw4Q0FBUzs7O0lBQW5CO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOztRQUVwRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUN2QyxJQUFJLENBQUMsR0FBRyxFQUNSLFNBQVMsRUFDVCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQzs7UUFHRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7S0FDdEM7Ozs7O0lBRU0sc0RBQWlCOzs7O2NBQUMsTUFBYztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7OztnQkExQ3hDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsMEJBQTBCLEVBQTFCLENBQTBCLENBQUMsRUFBRSxDQUFDO2lCQUNwRzs7Ozs7c0JBS0UsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7NEJBRUwsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUs7O3FDQWxCUjtFQVFnRCxjQUFjO1NBQWpELDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuL2Fic3RyYWN0LWNhbWVyYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdENhbWVyYSwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RDYW1lcmE8VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE+IHtcblxuICAvLyBASW5wdXQoKSBjYW1lcmFUYXJnZXQ6IFRIUkVFLk9iamVjdDNEO1xuXG4gIEBJbnB1dCgpIGZvdjogbnVtYmVyO1xuICBASW5wdXQoKSBuZWFyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZhcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHBvc2l0aW9uWDogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblk6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25aOiBudW1iZXI7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbGV0IGFzcGVjdFJhdGlvID0gdW5kZWZpbmVkOyAvLyBVcGRhdGVkIGxhdGVyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICB0aGlzLmZvdixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMubmVhcixcbiAgICAgIHRoaXMuZmFyXG4gICAgKTtcblxuICAgIC8vIFNldCBwb3NpdGlvbiBhbmQgbG9vayBhdFxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uWDtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvblk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IHRoaXMucG9zaXRpb25aO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3Q6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS51cGRhdGVBc3BlY3RSYXRpbzogJyArIGFzcGVjdCk7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gYXNwZWN0O1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG5cbn1cbiJdfQ==