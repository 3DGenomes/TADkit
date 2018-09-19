/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from './abstract-object-3d';
var SceneDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SceneDirective, _super);
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
        { type: Directive, args: [{
                    selector: 'three-scene',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return SceneDirective; }) }]
                },] },
    ];
    /** @nocollapse */
    SceneDirective.ctorParameters = function () { return []; };
    return SceneDirective;
}(AbstractObject3D));
export { SceneDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBd0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQU1wQiwwQ0FBNkI7SUFFL0Q7UUFBQSxpQkFHQztRQUZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxQyxRQUFBLGlCQUFPLFNBQUM7O0tBQ1Q7Ozs7SUFFUyxrQ0FBUzs7O0lBQW5CO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRVMsNENBQW1COzs7SUFBN0I7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUMxQjs7Z0JBbEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsQ0FBQyxFQUFFLENBQUM7aUJBQzFGOzs7O3lCQVBEO0VBUW9DLGdCQUFnQjtTQUF2QyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1zY2VuZScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2NlbmVEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFNjZW5lRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5TY2VuZT4ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlNjZW5lIHtcbiAgICBjb25zb2xlLmxvZygnU2NlbmVEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgfVxuXG59XG4iXX0=