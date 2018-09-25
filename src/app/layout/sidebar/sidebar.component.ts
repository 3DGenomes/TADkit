import { Component, HostBinding } from '@angular/core';
import { ProjectsService } from '@projects/projects.service';

@Component({
  selector: 'tk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  @HostBinding('class') classes = 'sidebar';

  private sidemenu: any[] = [
    { title: 'Projects', route: '/projects' },
    { title: 'Workspace', route: '/workspace' },
    { title: 'Archives', route: '/archives' }
  ];

  constructor(private projectsService: ProjectsService) {}

  public setProject(projectTitle): void {
    this.projectsService.setProject(projectTitle);
  }

}
