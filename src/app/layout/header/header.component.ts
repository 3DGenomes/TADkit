import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('class') classes = 'header';
  // @Input() topmenu: string[] = [];

  private topmenu: any[] = [
    { title: 'Workspace', route: '/workspace' },
    { title: 'Resize Col', route: '/resizable-col' },
    { title: 'Resize Row', route: '/resizable-row' },
    { title: 'Gridster', route: '/gridster' },
    { icon: 'user', route: '/projects' },
    { icon: 'cog', route: '/workspace-config' }
  ];

}

