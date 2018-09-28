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
    { title: 'User Projects', icon: 'user', route: '/projects' },
    { title: 'Configuration', icon: 'cog', route: '/workspace-config' }
  ];

}

