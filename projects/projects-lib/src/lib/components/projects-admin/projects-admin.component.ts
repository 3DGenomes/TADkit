import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'projects-admin',
  templateUrl: './projects-admin.component.html',
})

export class ProjectsAdminComponent {
  @HostBinding('class') classes = 'projects';
}
