import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-tadkit-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';

import { TkLayoutModule } from './layout/tk-layout.module';
import { TkProjectsModule } from '@projects/tk-projects.module';
import { TkWorkspaceModule } from '@workspace/tk-workspace.module';

import { AppTadkitComponent } from './app-tadkit.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    WebStorageModule,
    TkLayoutModule,
    TkWorkspaceModule,
    TkProjectsModule
  ],
  declarations: [
    AppTadkitComponent
  ],
  providers: [
    /* No need to specify providers if:
     * - service has the `providedIn` flag
     * - service is provider interal to module
     */
  ],
  bootstrap: [AppTadkitComponent]
})
export class AppTadkitModule { }
