import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'tk-projects',
  templateUrl: './projects.component.html',
})

export class ProjectsComponent {
  @HostBinding('class') classes = 'projects';
}
