import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceConfigComponent } from 'workspace-lib';
import { WorkspaceComponent } from 'workspace-lib';
import { ProjectsAdminComponent } from 'projects-lib';

const routes: Routes = [
    { path: '', redirectTo: '/workspace', pathMatch: 'full' },
    { path: 'workspace', component: WorkspaceComponent },
    { path: 'workspace-config', component: WorkspaceConfigComponent },
    { path: 'projects', component: ProjectsAdminComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
