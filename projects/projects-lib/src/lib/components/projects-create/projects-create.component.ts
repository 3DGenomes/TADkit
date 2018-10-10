import { Component, OnInit } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'projects-create',
  templateUrl: './projects-create.component.html'
})
export class ProjectsCreateComponent implements OnInit {

  public projectForm: FormGroup;
  public title: FormControl;
  public description: FormControl;

  constructor(private projectsService: ProjectsLibService) {}

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
