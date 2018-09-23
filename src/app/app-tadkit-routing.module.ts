import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TkWorkspaceComponent } from '@workspace/basic2x2/tk-workspace.component';
import { TkWorkspaceResizableColComponent } from '@workspace/resizable-col/col/tk-workspace-col.component';
import { TkWorkspaceResizableComponent } from '@workspace/resizable/row/tk-workspace.component';
import { TkWorkspaceGridsterComponent } from '@workspace/gridster/tk-workspace.component';
import { TkProjectsComponent } from '@projects/tk-projects.component';

const routes: Routes = [
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'workspace', component: TkWorkspaceComponent },
    { path: 'resizable-row', component: TkWorkspaceResizableComponent },
    { path: 'resizable-col', component: TkWorkspaceResizableColComponent },
    { path: 'gridster', component: TkWorkspaceGridsterComponent },
    { path: 'projects', component: TkProjectsComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
