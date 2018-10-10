import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { Widget } from '../widget-spawner/widget';
import { WidgetComponent } from '../widget-spawner/widget.component';

/**
 * Supported comment MIKE
 */
@Component({
  selector: 'workspace-widget',
  templateUrl: './widget-spawner.component.html',
  styleUrls: ['./widget-spawner.component.scss']
})

export class WidgetSpawnerComponent implements OnInit {
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
