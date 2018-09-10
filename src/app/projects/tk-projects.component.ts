import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'tk-projects',
  templateUrl: './tk-projects.component.html',
})

export class TkProjectsComponent {
  @HostBinding('class') classes = 'projects';
}
