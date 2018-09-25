import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '@projects/projects.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'tk-project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit {

  private projectForm: FormGroup;
  public title: FormControl;
  public description: FormControl;

  constructor(private projectsService: ProjectsService) {}

  public ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls() {
    this.title = new FormControl('');
    this.description = new FormControl('');
  }

  private createForm() {
    this.projectForm = new FormGroup({
      title: this.title,
      description: this.description,
    });
  }

  public addProject(): void {
    const newProject = Object.assign({}, this.projectForm.value);
    this.projectsService.addProject(newProject);
  }
}
