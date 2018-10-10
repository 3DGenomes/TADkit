import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProjectsAdminComponent } from './components/projects-admin/projects-admin.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsBriefComponent } from './components/projects-brief/projects-brief.component';
import { ProjectsDetailsComponent } from './components/projects-details/projects-details.component';
import { ProjectsCreateComponent } from './components/projects-create/projects-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebStorageModule,
    ProgressSpinnerModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    ConfirmDialogModule
  ],
  declarations: [
    ProjectsAdminComponent,
    ProjectsListComponent,
    ProjectsBriefComponent,
    ProjectsDetailsComponent,
    ProjectsCreateComponent
  ],
  exports: [
    ProjectsAdminComponent,
    ProjectsListComponent,
    ProjectsBriefComponent,
    ProjectsDetailsComponent,
    ProjectsCreateComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ProjectsLibModule {}
