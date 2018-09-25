import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tk-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    @HostBinding('class') classes = 'menu';

    @Input() private menulist: any[] = [];

}
