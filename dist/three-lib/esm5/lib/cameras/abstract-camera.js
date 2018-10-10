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
 * @abstract
 * @template T
 */
export { AbstractCamera };
if (false) {
    /** @type {?} */
    AbstractCamera.prototype.camera;
    /**
     * @abstract
     * @return {?}
     */
    AbstractCamera.prototype.afterInit = function () { };
    /**
     * @abstract
     * @param {?} aspect
     * @return {?}
     */
    AbstractCamera.prototype.updateAspectRatio = function (aspect) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY2FtZXJhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL2NhbWVyYXMvYWJzdHJhY3QtY2FtZXJhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7O0lBSUU7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVNLHdDQUFlOzs7SUFBdEI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFNSCxxQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7Ozs7Ozs7O0lBZkMsZ0NBQVU7Ozs7O0lBV1YscURBQXFDOzs7Ozs7SUFFckMsbUVBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENhbWVyYTxUIGV4dGVuZHMgVEhSRUUuQ2FtZXJhPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIGNhbWVyYTogVDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnQWJzdHJhY3RDYW1lcmEuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0Q2FtZXJhLm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWZ0ZXJJbml0KCk6IHZvaWQ7XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKTtcblxufVxuIl19