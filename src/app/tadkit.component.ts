import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '@projects/projects.service';

@Component({
  selector: 'tk-tadkit',
  templateUrl: './tadkit.component.html',
  styleUrls: ['./tadkit.component.scss']
})

export class TadkitComponent implements OnInit {

  constructor(private projectsService: ProjectsService) {}

  public ngOnInit(): void {
    this.initializeTADkit();
  }

  private initializeTADkit() {
    // Currently single user with projects.
    // Propsed to have initial user selection.
    this.projectsService.loadProjects();
  }
}
