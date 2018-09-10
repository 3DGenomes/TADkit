import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import { Widget } from '@workspace/widget-spawner/tk-widget';

import { TkGenomicsInfoComponent } from '@workspace/components/genomics-info/tk-genomics-info.component';
import { TkGenomicsMatrixComponent } from '@workspace/components/genomics-matrix/tk-genomics-matrix.component';
import { TkGenomicsTracksComponent } from '@workspace/components/genomics-tracks/tk-genomics-tracks.component';
import { TkGenomicsSpatialComponent } from '@workspace/components/genomics-spatial/tk-genomics-spatial.component';

@Injectable({
  providedIn: 'root',
})

export class TkWorkspaceService {
  private widgetsStreamUrl: string;
  private widgetsStream: BehaviorSubject<Widget[]>;
  public widgets: Observable<Widget[]>;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
    this.widgetsStreamUrl = 'assets/defaults/tk-default-workspace.json';
    this.widgetsStream = new BehaviorSubject<Widget[]>([]);
    this.widgets = this.widgetsStream.asObservable();
  }

  private updateWidgets(widgetsArray) {
    this.widgetsStream.next(widgetsArray);
    // this.localStorageService.set('workspace', widgetsArray);
  }

  public loadWidgets(): void {
    // const widgetsStored = this.localStorageService.get('workspace');
    // if (!widgetsStored) {
    //   this.httpClient.get<Widget[]>(this.widgetsStreamUrl)
    //   .subscribe(widgetArray => {
    //     this.updateWidgets(widgetArray);
    //   });
    // } else {
      let widgets = [];
      const data = {title: 'title', state: false};
      this.widgets.subscribe(wdgt => widgets = wdgt);
      if (!Array.isArray(widgets) || !widgets.length) {
        this.addWidget('spatial', {title: 'Dummy A', state: false});
        this.addWidget('matrix', {title: 'Dummy B', state: true});
        this.addWidget('info', {title: 'Dummy C', state: false});
        this.addWidget('tracks', {title: 'Dummy D', state: true});
      }
      // }
  }

  private buildWidget(widgetName: string, data: any): any {
    const classes = {
      info: TkGenomicsInfoComponent,
      matrix: TkGenomicsMatrixComponent,
      spatial: TkGenomicsSpatialComponent,
      tracks: TkGenomicsTracksComponent
  };
    const widgetComponent = classes[widgetName];
    let widget = null;
      widget = new Widget(widgetComponent, data);
    return widget;
  }

  public addWidget(widgetName: string, data: any): void {
    // const validNames = []; // fetch from ???
    // const namesValid = true;
    const widgetsToAdd = [];

    // if (!widgetName) {
    //   widgetNamesArray = ['genomics-info', 'genomics-matrix', 'genomics-tracks', 'genomics-spatial'];
    // }
    // if (!namesValid) {} // is valid ==> how?

    // widgetNamesArray.forEach(widgetName => {
      // console.log(data);
      const newWidget = this.buildWidget(widgetName, data);
      // widgetsToAdd.push(newWidget);
    // });
    // console.log(widgetsToAdd);
    const widgetsArray = [ ...this.widgetsStream.getValue(), newWidget ];
    this.updateWidgets(widgetsArray);
  }

  public addWidgets(widgetToAdd: any): void {
    const widgetsArray = [ ...this.widgetsStream.getValue(), widgetToAdd ];
    this.updateWidgets(widgetsArray);
  }

  public removeWidget(widgetName: string): void {
    // const widgetsArray = this.widgetsStream.getValue().filter(item => item.data.name !== widgetName);
    // this.updateWidgets(widgetsArray);
  }

}
