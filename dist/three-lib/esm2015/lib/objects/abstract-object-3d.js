/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Input, QueryList } from '@angular/core';
/**
 * @abstract
 * @template T
 */
export class AbstractObject3D {
    /**
     * @return {?}
     */
    rerender() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.object) {
            return;
        }
        /** @type {?} */
        let mustRerender = false;
        if (['rotateX', 'rotateY', 'rotateZ'].some(propName => propName in changes)) {
            this.applyRotation();
            mustRerender = true;
        }
        if (['translateX', 'translateY', 'translateZ'].some(propName => propName in changes)) {
            this.applyTranslation();
            mustRerender = true;
        }
        if (mustRerender) {
            this.rerender();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        console.log('AbstractObject3D.ngAfterViewInit');
        this.object = this.newObject3DInstance();
        this.applyTranslation();
        this.applyRotation();
        if (this.childNodes !== undefined && this.childNodes.length > 1) {
            this.childNodes.filter(i => i !== this && i.getObject() !== undefined).forEach(i => {
                // console.log("Add child for " + this.constructor.name);
                // console.log(i);
                this.addChild(i.getObject());
            });
        }
        else {
            // console.log("No child Object3D for: " + this.constructor.name);
        }
        this.afterInit();
    }
    /**
     * @return {?}
     */
    applyRotation() {
        /** @type {?} */
        const angles = [
            this.rotateX,
            this.rotateY,
            this.rotateZ
        ].map(angle => angle || 0);
        this.object.rotation.set(this.rotateX || 0, this.rotateY || 0, this.rotateZ || 0, 'XYZ');
    }
    /**
     * @return {?}
     */
    applyTranslation() {
        this.object.position.set(this.translateX || 0, this.translateY || 0, this.translateZ || 0);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    addChild(object) {
        this.object.add(object);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    removeChild(object) {
        this.object.remove(object);
    }
    /**
     * @return {?}
     */
    getObject() {
        return this.object;
    }
}
AbstractObject3D.propDecorators = {
    childNodes: [{ type: ContentChildren, args: [AbstractObject3D, { descendants: false },] }],
    rotateX: [{ type: Input }],
    rotateY: [{ type: Input }],
    rotateZ: [{ type: Input }],
    translateX: [{ type: Input }],
    translateY: [{ type: Input }],
    translateZ: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtb2JqZWN0LTNkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvYWJzdHJhY3Qtb2JqZWN0LTNkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsZUFBZSxFQUNmLEtBQUssRUFFTCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR3ZCLE1BQU07Ozs7SUF5Qk0sUUFBUTtJQUNsQixDQUFDOzs7OztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPO1NBQ1I7O1lBRUcsWUFBWSxHQUFHLEtBQUs7UUFFeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDckI7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDOzs7O0lBRU0sZUFBZTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pGLHlEQUF5RDtnQkFDekQsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLGtFQUFrRTtTQUNuRTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRU8sYUFBYTs7Y0FDYixNQUFNLEdBQUc7WUFDYixJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPO1lBQ1osSUFBSSxDQUFDLE9BQU87U0FDYixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDakIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQ2pCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUNqQixLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7Ozs7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0QixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQ3BCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUNyQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFUyxRQUFRLENBQUMsTUFBc0I7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFUyxXQUFXLENBQUMsTUFBc0I7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7O3lCQXBHQSxlQUFlLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO3NCQUt4RCxLQUFLO3NCQUtMLEtBQUs7c0JBS0wsS0FBSzt5QkFFTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs7OztJQW5CTixzQ0FBbUg7Ozs7O0lBS25ILG1DQUF5Qjs7Ozs7SUFLekIsbUNBQXlCOzs7OztJQUt6QixtQ0FBeUI7O0lBRXpCLHNDQUE0Qjs7SUFDNUIsc0NBQTRCOztJQUM1QixzQ0FBNEI7O0lBRTVCLGtDQUFrQjs7Ozs7SUFpRmxCLGlFQUE0Qzs7Ozs7SUFFNUMsdURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0T2JqZWN0M0Q8VCBleHRlbmRzIFRIUkVFLk9iamVjdDNEPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBYnN0cmFjdE9iamVjdDNELCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KSBjaGlsZE5vZGVzOiBRdWVyeUxpc3Q8QWJzdHJhY3RPYmplY3QzRDxUSFJFRS5PYmplY3QzRD4+O1xuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBpbiBFdWxlciBhbmdsZXMgKHJhZGlhbnMpIHdpdGggb3JkZXIgWCwgWSwgWi5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZVg6IG51bWJlcjtcblxuICAvKipcbiAgICogUm90YXRpb24gaW4gRXVsZXIgYW5nbGVzIChyYWRpYW5zKSB3aXRoIG9yZGVyIFgsIFksIFouXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGVZOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIGluIEV1bGVyIGFuZ2xlcyAocmFkaWFucykgd2l0aCBvcmRlciBYLCBZLCBaLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlWjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHRyYW5zbGF0ZVg6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhbnNsYXRlWTogbnVtYmVyO1xuICBASW5wdXQoKSB0cmFuc2xhdGVaOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBvYmplY3Q6IFQ7XG5cbiAgcHJvdGVjdGVkIHJlcmVuZGVyKCkge1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMub2JqZWN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG11c3RSZXJlbmRlciA9IGZhbHNlO1xuXG4gICAgaWYgKFsncm90YXRlWCcsICdyb3RhdGVZJywgJ3JvdGF0ZVonXS5zb21lKHByb3BOYW1lID0+IHByb3BOYW1lIGluIGNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmFwcGx5Um90YXRpb24oKTtcbiAgICAgIG11c3RSZXJlbmRlciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbJ3RyYW5zbGF0ZVgnLCAndHJhbnNsYXRlWScsICd0cmFuc2xhdGVaJ10uc29tZShwcm9wTmFtZSA9PiBwcm9wTmFtZSBpbiBjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5hcHBseVRyYW5zbGF0aW9uKCk7XG4gICAgICBtdXN0UmVyZW5kZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtdXN0UmVyZW5kZXIpIHtcbiAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdBYnN0cmFjdE9iamVjdDNELm5nQWZ0ZXJWaWV3SW5pdCcpO1xuICAgIHRoaXMub2JqZWN0ID0gdGhpcy5uZXdPYmplY3QzREluc3RhbmNlKCk7XG5cbiAgICB0aGlzLmFwcGx5VHJhbnNsYXRpb24oKTtcbiAgICB0aGlzLmFwcGx5Um90YXRpb24oKTtcblxuICAgIGlmICh0aGlzLmNoaWxkTm9kZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLmZpbHRlcihpID0+IGkgIT09IHRoaXMgJiYgaS5nZXRPYmplY3QoKSAhPT0gdW5kZWZpbmVkKS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFkZCBjaGlsZCBmb3IgXCIgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChpLmdldE9iamVjdCgpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIk5vIGNoaWxkIE9iamVjdDNEIGZvcjogXCIgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgIH1cblxuICAgIHRoaXMuYWZ0ZXJJbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Um90YXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgYW5nbGVzID0gW1xuICAgICAgdGhpcy5yb3RhdGVYLFxuICAgICAgdGhpcy5yb3RhdGVZLFxuICAgICAgdGhpcy5yb3RhdGVaXG4gICAgXS5tYXAoYW5nbGUgPT4gYW5nbGUgfHwgMCk7XG5cbiAgICB0aGlzLm9iamVjdC5yb3RhdGlvbi5zZXQoXG4gICAgICB0aGlzLnJvdGF0ZVggfHwgMCxcbiAgICAgIHRoaXMucm90YXRlWSB8fCAwLFxuICAgICAgdGhpcy5yb3RhdGVaIHx8IDAsXG4gICAgICAnWFlaJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VHJhbnNsYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QucG9zaXRpb24uc2V0KFxuICAgICAgdGhpcy50cmFuc2xhdGVYIHx8IDAsXG4gICAgICB0aGlzLnRyYW5zbGF0ZVkgfHwgMCxcbiAgICAgIHRoaXMudHJhbnNsYXRlWiB8fCAwXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRDaGlsZChvYmplY3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgdGhpcy5vYmplY3QuYWRkKG9iamVjdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlQ2hpbGQob2JqZWN0OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAgIHRoaXMub2JqZWN0LnJlbW92ZShvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGdldE9iamVjdCgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5vYmplY3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhZnRlckluaXQoKTogdm9pZDtcblxufVxuIl19