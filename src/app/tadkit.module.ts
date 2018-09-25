import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';

import { LayoutModule } from './layout/layout-cssgrid.module';
import { ProjectsModule } from '@projects/projects.module';
import { WorkspaceModule } from '@workspace/workspace.module';

import { TadkitComponent } from './tadkit.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    WebStorageModule,
    LayoutModule,
    WorkspaceModule,
    ProjectsModule
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
