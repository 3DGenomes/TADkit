import { OnInit } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { FormGroup, FormControl } from '@angular/forms';
export declare class ProjectsCreateComponent implements OnInit {
    private projectsService;
    projectForm: FormGroup;
    title: FormControl;
    description: FormControl;
    constructor(projectsService: ProjectsLibService);
    ngOnInit(): void;
    private createFormControls;
    private createForm;
    addProject(): void;
}
