/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Widget } from '../widget-spawner/widget';
/**
 * Supported comment MIKE
 */
export class WidgetSpawnerComponent {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadWidget();
    }
    /**
     * @return {?}
     */
    loadWidget() {
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
        this.workspace.clear();
        /** @type {?} */
        const componentRef = this.workspace.createComponent(componentFactory);
        ((/** @type {?} */ (componentRef.instance))).dataStream = this.dataStream;
    }
}
WidgetSpawnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-widget',
                template: "<ng-template #widget></ng-template>  ",
                styles: [":host{height:100%;width:100%}"]
            }] }
];
WidgetSpawnerComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
WidgetSpawnerComponent.propDecorators = {
    widget: [{ type: Input }],
    dataStream: [{ type: Input }],
    workspace: [{ type: ViewChild, args: ['widget', { read: ViewContainerRef },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNwYXduZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vd29ya3NwYWNlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtc3Bhd25lci93aWRnZXQtc3Bhd25lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFZbEQsTUFBTTs7OztJQUtKLFlBQW9CLHdCQUFrRDtRQUFsRCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQUcsQ0FBQzs7OztJQUUxRSxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFRCxVQUFVOztjQUNGLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDOztjQUNqQixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDckUsQ0FBQyxtQkFBaUIsWUFBWSxDQUFDLFFBQVEsRUFBQSxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEUsQ0FBQzs7O1lBdEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixpREFBOEM7O2FBRS9DOzs7WUFaNkMsd0JBQXdCOzs7cUJBZW5FLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDOzs7O0lBRjdDLHdDQUF3Qjs7SUFDeEIsNENBQXlCOztJQUN6QiwyQ0FBeUQ7O0lBRTdDLDBEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0JztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG4vKipcbiAqIFN1cHBvcnRlZCBjb21tZW50IE1JS0VcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLXdpZGdldCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93aWRnZXQtc3Bhd25lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dpZGdldC1zcGF3bmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBXaWRnZXRTcGF3bmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgd2lkZ2V0OiBXaWRnZXQ7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgQFZpZXdDaGlsZCgnd2lkZ2V0Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSB3b3Jrc3BhY2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWRXaWRnZXQoKTtcbiAgfVxuXG4gIGxvYWRXaWRnZXQoKSB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMud2lkZ2V0LmNvbXBvbmVudCk7XG4gICAgdGhpcy53b3Jrc3BhY2UuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLndvcmtzcGFjZS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgKDxXaWRnZXRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhU3RyZWFtID0gdGhpcy5kYXRhU3RyZWFtO1xuICB9XG5cbn1cbiJdfQ==