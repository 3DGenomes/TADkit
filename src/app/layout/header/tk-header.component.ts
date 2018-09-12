import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'tk-header',
  templateUrl: './tk-header.component.html',
  styleUrls: ['./tk-header.component.scss']
})
export class TkHeaderComponent {
  @HostBinding('class') classes = 'header';

  private topmenu: any[] = [
    { title: 'Workspace', route: '/workspace' },
    { title: 'Resizable', route: '/resizable' },
    { title: 'Resizably', route: '/resizably' },
    { title: 'Gridster', route: '/gridster' },
    { title: 'Projects', route: '/projects' },
    { title: 'User', link: '#' }
  ];

}

