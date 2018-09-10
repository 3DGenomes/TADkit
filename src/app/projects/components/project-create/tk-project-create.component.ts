import { Component, OnInit } from '@angular/core';
import { TkProjectsService } from '@projects/tk-projects.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'tk-project-create',
  templateUrl: './tk-project-create.component.html'
})
export class TkProjectCreateComponent implements OnInit {

  private projectForm: FormGroup;
  public title: FormControl;
  public description: FormControl;

  constructor(private tkProjectsService: TkProjectsService) {}

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
    this.tkProjectsService.addProject(newProject);
  }
}
