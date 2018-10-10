/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Input, QueryList } from '@angular/core';
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
        else {
            // console.log("No child Object3D for: " + this.constructor.name);
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
export { AbstractObject3D };
if (false) {
    /** @type {?} */
    AbstractObject3D.prototype.childNodes;
    /**
     * Rotation in Euler angles (radians) with order X, Y, Z.
     * @type {?}
     */
    AbstractObject3D.prototype.rotateX;
    /**
     * Rotation in Euler angles (radians) with order X, Y, Z.
     * @type {?}
     */
    AbstractObject3D.prototype.rotateY;
    /**
     * Rotation in Euler angles (radians) with order X, Y, Z.
     * @type {?}
     */
    AbstractObject3D.prototype.rotateZ;
    /** @type {?} */
    AbstractObject3D.prototype.translateX;
    /** @type {?} */
    AbstractObject3D.prototype.translateY;
    /** @type {?} */
    AbstractObject3D.prototype.translateZ;
    /** @type {?} */
    AbstractObject3D.prototype.object;
    /**
     * @abstract
     * @return {?}
     */
    AbstractObject3D.prototype.newObject3DInstance = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractObject3D.prototype.afterInit = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtb2JqZWN0LTNkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLGVBQWUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFHM0c7SUFBQTtJQTRHQSxDQUFDOzs7O0lBbkZXLG1DQUFROzs7SUFBbEI7SUFDQSxDQUFDOzs7OztJQUVNLHNDQUFXOzs7O0lBQWxCLFVBQW1CLE9BQXNCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjs7WUFFRyxZQUFZLEdBQUcsS0FBSztRQUV4QixJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLElBQUksT0FBTyxFQUFuQixDQUFtQixDQUFDLEVBQUU7WUFDM0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLElBQUksT0FBTyxFQUFuQixDQUFtQixDQUFDLEVBQUU7WUFDcEYsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUVELElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtJQUNILENBQUM7Ozs7SUFFTSwwQ0FBZTs7O0lBQXRCO1FBQUEsaUJBa0JDO1FBakJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxLQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQzlFLHlEQUF5RDtnQkFDekQsa0JBQWtCO2dCQUNsQixLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLGtFQUFrRTtTQUNuRTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRU8sd0NBQWE7OztJQUFyQjs7WUFDUSxNQUFNLEdBQUc7WUFDYixJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPO1lBQ1osSUFBSSxDQUFDLE9BQU87U0FDYixDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssSUFBSSxDQUFDLEVBQVYsQ0FBVSxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDdEIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ2pCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUNqQixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDakIsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDOzs7O0lBRU8sMkNBQWdCOzs7SUFBeEI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3RCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUNwQixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQ3JCLENBQUM7SUFDSixDQUFDOzs7OztJQUVTLG1DQUFROzs7O0lBQWxCLFVBQW1CLE1BQXNCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRVMsc0NBQVc7Ozs7SUFBckIsVUFBc0IsTUFBc0I7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVNLG9DQUFTOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7NkJBcEdBLGVBQWUsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7MEJBS3hELEtBQUs7MEJBS0wsS0FBSzswQkFLTCxLQUFLOzZCQUVMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOztJQXVGUix1QkFBQztDQUFBLEFBNUdELElBNEdDO1NBNUdxQixnQkFBZ0I7OztJQUVwQyxzQ0FBbUg7Ozs7O0lBS25ILG1DQUF5Qjs7Ozs7SUFLekIsbUNBQXlCOzs7OztJQUt6QixtQ0FBeUI7O0lBRXpCLHNDQUE0Qjs7SUFDNUIsc0NBQTRCOztJQUM1QixzQ0FBNEI7O0lBRTVCLGtDQUFrQjs7Ozs7SUFpRmxCLGlFQUE0Qzs7Ozs7SUFFNUMsdURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgT25DaGFuZ2VzLCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RPYmplY3QzRDxUIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0T2JqZWN0M0QsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIGNoaWxkTm9kZXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPj47XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVk6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVaOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdHJhbnNsYXRlWDogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVo6IG51bWJlcjtcblxuICBwcml2YXRlIG9iamVjdDogVDtcblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5vYmplY3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbXVzdFJlcmVuZGVyID0gZmFsc2U7XG5cbiAgICBpZiAoWydyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG11c3RSZXJlbmRlcikge1xuICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0T2JqZWN0M0QubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5vYmplY3QgPSB0aGlzLm5ld09iamVjdDNESW5zdGFuY2UoKTtcblxuICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZmlsdGVyKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmdldE9iamVjdCgpICE9PSB1bmRlZmluZWQpLmZvckVhY2goaSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkIGNoaWxkIGZvciBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKGkuZ2V0T2JqZWN0KCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gY2hpbGQgT2JqZWN0M0QgZm9yOiBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlSb3RhdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBhbmdsZXMgPSBbXG4gICAgICB0aGlzLnJvdGF0ZVgsXG4gICAgICB0aGlzLnJvdGF0ZVksXG4gICAgICB0aGlzLnJvdGF0ZVpcbiAgICBdLm1hcChhbmdsZSA9PiBhbmdsZSB8fCAwKTtcblxuICAgIHRoaXMub2JqZWN0LnJvdGF0aW9uLnNldChcbiAgICAgIHRoaXMucm90YXRlWCB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVZIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVogfHwgMCxcbiAgICAgICdYWVonXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlUcmFuc2xhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5zZXQoXG4gICAgICB0aGlzLnRyYW5zbGF0ZVggfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWSB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVaIHx8IDBcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZENoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5hZGQob2JqZWN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucmVtb3ZlKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFQge1xuICAgIHJldHVybiB0aGlzLm9iamVjdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFmdGVySW5pdCgpOiB2b2lkO1xuXG59XG4iXX0=