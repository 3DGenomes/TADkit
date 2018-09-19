/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Input, QueryList } from '@angular/core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtb2JqZWN0LTNkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsZUFBZSxFQUNmLEtBQUssRUFFTCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7OztJQTRCWCxtQ0FBUTs7O0lBQWxCO0tBQ0M7Ozs7O0lBRU0sc0NBQVc7Ozs7Y0FBQyxPQUFzQjtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPO1NBQ1I7O1FBRUQsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsSUFBSSxPQUFPLEVBQW5CLENBQW1CLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsSUFBSSxPQUFPLEVBQW5CLENBQW1CLENBQUMsRUFBRTtZQUNwRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCOzs7OztJQUdJLDBDQUFlOzs7OztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssS0FBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxTQUFTLEVBQXpDLENBQXlDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDOzs7Z0JBRzlFLEFBRkEseURBQXlEO2dCQUN6RCxrQkFBa0I7Z0JBQ2xCLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1NBQ0o7YUFBTTs7U0FFTjtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7SUFHWCx3Q0FBYTs7Ozs7UUFDbkIsSUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPO1lBQ1osSUFBSSxDQUFDLE9BQU87U0FDYixDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssSUFBSSxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDakIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ2pCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUNqQixLQUFLLENBQ04sQ0FBQzs7Ozs7SUFHSSwyQ0FBZ0I7Ozs7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0QixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQ3BCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUNyQixDQUFDOzs7Ozs7SUFHTSxtQ0FBUTs7OztJQUFsQixVQUFtQixNQUFzQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFUyxzQ0FBVzs7OztJQUFyQixVQUFzQixNQUFzQjtRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1Qjs7OztJQUVNLG9DQUFTOzs7O1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7NkJBbkdwQixlQUFlLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFOzBCQUt4RCxLQUFLOzBCQUtMLEtBQUs7MEJBS0wsS0FBSzs2QkFFTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzs7MkJBL0JSOztTQVVzQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RPYmplY3QzRDxUIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Q+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBAQ29udGVudENoaWxkcmVuKEFic3RyYWN0T2JqZWN0M0QsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIGNoaWxkTm9kZXM6IFF1ZXJ5TGlzdDxBYnN0cmFjdE9iamVjdDNEPFRIUkVFLk9iamVjdDNEPj47XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVk6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVaOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdHJhbnNsYXRlWDogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVZOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVo6IG51bWJlcjtcblxuICBwcml2YXRlIG9iamVjdDogVDtcblxuICBwcm90ZWN0ZWQgcmVyZW5kZXIoKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5vYmplY3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbXVzdFJlcmVuZGVyID0gZmFsc2U7XG5cbiAgICBpZiAoWydyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWiddLnNvbWUocHJvcE5hbWUgPT4gcHJvcE5hbWUgaW4gY2hhbmdlcykpIHtcbiAgICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuICAgICAgbXVzdFJlcmVuZGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG11c3RSZXJlbmRlcikge1xuICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0Fic3RyYWN0T2JqZWN0M0QubmdBZnRlclZpZXdJbml0Jyk7XG4gICAgdGhpcy5vYmplY3QgPSB0aGlzLm5ld09iamVjdDNESW5zdGFuY2UoKTtcblxuICAgIHRoaXMuYXBwbHlUcmFuc2xhdGlvbigpO1xuICAgIHRoaXMuYXBwbHlSb3RhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZmlsdGVyKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmdldE9iamVjdCgpICE9PSB1bmRlZmluZWQpLmZvckVhY2goaSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkIGNoaWxkIGZvciBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKGkuZ2V0T2JqZWN0KCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gY2hpbGQgT2JqZWN0M0QgZm9yOiBcIiArIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZnRlckluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlSb3RhdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBhbmdsZXMgPSBbXG4gICAgICB0aGlzLnJvdGF0ZVgsXG4gICAgICB0aGlzLnJvdGF0ZVksXG4gICAgICB0aGlzLnJvdGF0ZVpcbiAgICBdLm1hcChhbmdsZSA9PiBhbmdsZSB8fCAwKTtcblxuICAgIHRoaXMub2JqZWN0LnJvdGF0aW9uLnNldChcbiAgICAgIHRoaXMucm90YXRlWCB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVZIHx8IDAsXG4gICAgICB0aGlzLnJvdGF0ZVogfHwgMCxcbiAgICAgICdYWVonXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlUcmFuc2xhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi5zZXQoXG4gICAgICB0aGlzLnRyYW5zbGF0ZVggfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWSB8fCAwLFxuICAgICAgdGhpcy50cmFuc2xhdGVaIHx8IDBcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZENoaWxkKG9iamVjdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICB0aGlzLm9iamVjdC5hZGQob2JqZWN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucmVtb3ZlKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFQge1xuICAgIHJldHVybiB0aGlzLm9iamVjdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFmdGVySW5pdCgpOiB2b2lkO1xuXG59XG4iXX0=