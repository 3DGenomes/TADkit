import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TkProjectsComponent } from '@projects/tk-projects.component';
import { TkProjectsListComponent } from '@projects/components/projects-list/tk-projects-list.component';
import { TkProjectBriefComponent } from '@projects/components/project-brief/tk-project-brief.component';
import { TkProjectDetailsComponent } from '@projects/components/project-details/tk-project-details.component';
import { TkProjectCreateComponent } from '@projects/components/project-create/tk-project-create.component';


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
    TkProjectsComponent,
    TkProjectsListComponent,
    TkProjectBriefComponent,
    TkProjectDetailsComponent,
    TkProjectCreateComponent
  ],
  exports: [
    TkProjectsComponent,
    TkProjectsListComponent,
    TkProjectBriefComponent,
    TkProjectDetailsComponent,
    TkProjectCreateComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class TkProjectsModule {}
