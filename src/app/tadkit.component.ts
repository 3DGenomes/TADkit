import { Component, OnInit } from '@angular/core';
import { ProjectsLibService } from 'projects-lib';

@Component({
  selector: 'tk-tadkit',
  templateUrl: './tadkit.component.html',
  styleUrls: ['./tadkit.component.scss']
})

export class TadkitComponent implements OnInit {

  constructor(private projectsService: ProjectsLibService) {}

  public ngOnInit(): void {
    this.initializeTADkit();
  }

  private initializeTADkit() {
    // Currently single user with projects.
    // Propsed to have initial user selection.
    this.projectsService.loadProjects();
  }
}
