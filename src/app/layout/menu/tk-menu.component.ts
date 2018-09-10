import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tk-menu',
  templateUrl: './tk-menu.component.html',
  styleUrls: ['./tk-menu.component.scss']
})
export class TkMenuComponent {
    @HostBinding('class') classes = 'menu';

    @Input() private menulist: any[] = [];

}
