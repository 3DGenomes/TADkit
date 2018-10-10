import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';

import { LayoutModule } from './layout/layout-cssgrid.module';
import { ProjectsLibModule } from 'projects-lib';
import { WorkspaceLibModule } from 'workspace-lib';

import { TadkitComponent } from './tadkit.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    WebStorageModule,
    LayoutModule,
    WorkspaceLibModule,
    ProjectsLibModule
  ],
  declarations: [
    TadkitComponent
  ],
  providers: [
    /* No need to specify providers if:
     * - service has the `providedIn` flag
     * - service is provider interal to module
     */
  ],
  bootstrap: [TadkitComponent]
})
export class TadkitModule { }
