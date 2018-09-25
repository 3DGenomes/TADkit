import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProjectsComponent } from '@projects/projects.component';
import { ProjectsListComponent } from '@projects/components/projects-list/projects-list.component';
import { ProjectBriefComponent } from '@projects/components/project-brief/project-brief.component';
import { ProjectDetailsComponent } from '@projects/components/project-details/project-details.component';
import { ProjectCreateComponent } from '@projects/components/project-create/project-create.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    ConfirmDialogModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectBriefComponent,
    ProjectDetailsComponent,
    ProjectCreateComponent
  ],
  exports: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectBriefComponent,
    ProjectDetailsComponent,
    ProjectCreateComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ProjectsModule {}
