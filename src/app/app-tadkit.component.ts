import { Component, OnInit } from '@angular/core';
import { TkProjectsService } from '@projects/tk-projects.service';

@Component({
  selector: 'tk-app-tadkit',
  templateUrl: './app-tadkit.component.html',
  styleUrls: ['./app-tadkit.component.scss']
})

export class AppTadkitComponent implements OnInit {

  constructor(private tkProjectsService: TkProjectsService) {}

  public ngOnInit(): void {
    this.initializeTADkit();
  }

  private initializeTADkit() {
    // Currently single user with projects.
    // Propsed to have initial user selection.
    this.tkProjectsService.loadProjects();
  }
}
