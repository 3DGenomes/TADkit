import { Component, HostBinding } from '@angular/core';
import { TkProjectsService } from '@projects/tk-projects.service';
@Component({
  selector: 'tk-sidebar',
  templateUrl: './tk-sidebar.component.html',
  styleUrls: ['./tk-sidebar.component.scss']
})

export class TkSidebarComponent {
  @HostBinding('class') classes = 'sidebar';

  private sidemenu: any[] = [
    { title: 'Projects', route: '/projects' },
    { title: 'Workspace', route: '/workspace' },
    { title: 'Archives', route: '/archives' }
  ];

  constructor(private tkProjectsService: TkProjectsService) {}

  public setProject(projectTitle): void {
    this.tkProjectsService.setProject(projectTitle);
  }

}
