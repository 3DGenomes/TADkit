import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { Widget } from '@workspace/widget-spawner/tk-widget';
import { WidgetComponent } from '@workspace/widget-spawner/tk-widget.component';

/**
 * Supported comment MIKE
 */
@Component({
  selector: 'tk-widget',
  templateUrl: './tk-widget-spawner.component.html',
  styleUrls: ['./tk-widget-spawner.component.scss']
})

export class TkWidgetSpawnerComponent implements OnInit {
  @Input() widget: Widget;
  @Input() dataStream: any;
  @ViewChild('widget', {read: ViewContainerRef}) workspace;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadWidget();
  }

  loadWidget() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
    this.workspace.clear();
    const componentRef = this.workspace.createComponent(componentFactory);
    (<WidgetComponent>componentRef.instance).dataStream = this.dataStream;
  }

}
