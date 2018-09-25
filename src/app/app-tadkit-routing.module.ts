import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceConfigComponent } from '@workspace/config/workspace-config.component';
import { WorkspaceComponent } from '@workspace/layouts/basic2x2/workspace.component';
import { WorkspaceResizableColComponent } from '@workspace/layouts/resizable-col/col/workspace-col.component';
import { WorkspaceResizableComponent } from '@workspace/layouts/resizable/row/workspace.component';
import { WorkspaceGridsterComponent } from '@workspace/layouts/gridster/workspace.component';
import { TkProjectsComponent } from '@projects/tk-projects.component';

const routes: Routes = [
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'workspace-config', component: WorkspaceConfigComponent },
    { path: 'workspace', component: WorkspaceComponent },
    { path: 'resizable-row', component: WorkspaceResizableComponent },
    { path: 'resizable-col', component: WorkspaceResizableColComponent },
    { path: 'gridster', component: WorkspaceGridsterComponent },
    { path: 'projects', component: TkProjectsComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
