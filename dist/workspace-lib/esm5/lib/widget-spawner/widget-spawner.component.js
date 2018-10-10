/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Widget } from '../widget-spawner/widget';
/**
 * Supported comment MIKE
 */
var WidgetSpawnerComponent = /** @class */ (function () {
    function WidgetSpawnerComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    WidgetSpawnerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadWidget();
    };
    /**
     * @return {?}
     */
    WidgetSpawnerComponent.prototype.loadWidget = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
        this.workspace.clear();
        /** @type {?} */
        var componentRef = this.workspace.createComponent(componentFactory);
        ((/** @type {?} */ (componentRef.instance))).dataStream = this.dataStream;
    };
    WidgetSpawnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-widget',
                    template: "<ng-template #widget></ng-template>  ",
                    styles: [":host{height:100%;width:100%}"]
                }] }
    ];
    WidgetSpawnerComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    WidgetSpawnerComponent.propDecorators = {
        widget: [{ type: Input }],
        dataStream: [{ type: Input }],
        workspace: [{ type: ViewChild, args: ['widget', { read: ViewContainerRef },] }]
    };
    return WidgetSpawnerComponent;
}());
export { WidgetSpawnerComponent };
if (false) {
    /** @type {?} */
    WidgetSpawnerComponent.prototype.widget;
    /** @type {?} */
    WidgetSpawnerComponent.prototype.dataStream;
    /** @type {?} */
    WidgetSpawnerComponent.prototype.workspace;
    /** @type {?} */
    WidgetSpawnerComponent.prototype.componentFactoryResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNwYXduZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vd29ya3NwYWNlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtc3Bhd25lci93aWRnZXQtc3Bhd25lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFNbEQ7SUFXRSxnQ0FBb0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFBRyxDQUFDOzs7O0lBRTFFLHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsMkNBQVU7OztJQUFWOztZQUNRLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDOztZQUNqQixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDckUsQ0FBQyxtQkFBaUIsWUFBWSxDQUFDLFFBQVEsRUFBQSxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEUsQ0FBQzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixpREFBOEM7O2lCQUUvQzs7O2dCQVo2Qyx3QkFBd0I7Ozt5QkFlbkUsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7O0lBZS9DLDZCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FsQlksc0JBQXNCOzs7SUFDakMsd0NBQXdCOztJQUN4Qiw0Q0FBeUI7O0lBQ3pCLDJDQUF5RDs7SUFFN0MsMERBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi93aWRnZXQtc3Bhd25lci93aWRnZXQnO1xuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogU3VwcG9ydGVkIGNvbW1lbnQgTUlLRVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2Utd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dpZGdldC1zcGF3bmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2lkZ2V0LXNwYXduZXIuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdpZGdldFNwYXduZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB3aWRnZXQ6IFdpZGdldDtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBAVmlld0NoaWxkKCd3aWRnZXQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHdvcmtzcGFjZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZFdpZGdldCgpO1xuICB9XG5cbiAgbG9hZFdpZGdldCgpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy53aWRnZXQuY29tcG9uZW50KTtcbiAgICB0aGlzLndvcmtzcGFjZS5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMud29ya3NwYWNlLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAoPFdpZGdldENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTdHJlYW07XG4gIH1cblxufVxuIl19