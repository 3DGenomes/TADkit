import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import { Widget } from '@workspace/widget-spawner/tk-widget';

import * as genomicsWidgets from 'genomics-lib';

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
        // Default Widgets
        this.addWidgets(
          'GenomicsSpatialComponent',
          'GenomicsMatrixComponent',
          'GenomicsInfoComponent',
          'GenomicsTracksComponent'
        );
      }
      // }
  }

  public addWidgets(...widgetNamesArray: string[]): void {
    const widgetsArray = [ ...this.widgetsStream.getValue() ];
    widgetNamesArray.forEach(widgetName => {
      const widgetComponent = genomicsWidgets[widgetName];
          // if (!widgetName) {}; // USE DEFAULT???
      const newWidget = new Widget(widgetComponent, null);
      widgetsArray.push(newWidget);
    });
    this.updateWidgets(widgetsArray);
  }

  public removeWidget(widgetName: string): void {
    this.widgets.subscribe(wdgt => console.log(wdgt));
    // const widgetsArray = this.widgetsStream.getValue().filter(item => item.data.title !== widgetName);
    // this.updateWidgets(widgetsArray);
  }

}
