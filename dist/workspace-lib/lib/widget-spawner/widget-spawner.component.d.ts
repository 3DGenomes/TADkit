import { OnInit, ComponentFactoryResolver } from '@angular/core';
import { Widget } from '../widget-spawner/widget';
/**
 * Supported comment MIKE
 */
export declare class WidgetSpawnerComponent implements OnInit {
    private componentFactoryResolver;
    widget: Widget;
    dataStream: any;
    workspace: any;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    loadWidget(): void;
}
