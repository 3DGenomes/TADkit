import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceConfigComponent } from '@workspace/config/workspace-config.component';
import { WorkspaceComponent } from '@workspace/workspace/workspace.component';
import { WorkspaceFixedComponent } from '@workspace/layouts/fixed/workspace.component';
import { WorkspaceRowsComponent } from '@workspace/layouts/rows/workspace.component';
import { WorkspaceColsComponent } from '@workspace/layouts/cols/workspace-col.component';
import { WorkspaceGridsterComponent } from '@workspace/layouts/gridster/workspace.component';
import { ProjectsComponent } from '@projects/projects.component';

const routes: Routes = [
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'workspace-config', component: WorkspaceConfigComponent },
    { path: 'workspace', component: WorkspaceComponent },
    { path: 'workspace-fixed', component: WorkspaceFixedComponent },
    { path: 'workspace-rows', component: WorkspaceRowsComponent },
    { path: 'workspace-cols', component: WorkspaceColsComponent },
    { path: 'workspace-grid', component: WorkspaceGridsterComponent },
    { path: 'projects', component: ProjectsComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
