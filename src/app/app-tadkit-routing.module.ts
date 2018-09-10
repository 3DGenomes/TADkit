import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TkWorkspaceComponent } from '@workspace/tk-workspace.component';
import { TkProjectsComponent } from '@projects/tk-projects.component';

const routes: Routes = [
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'workspace', component: TkWorkspaceComponent },
    { path: 'projects', component: TkProjectsComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
