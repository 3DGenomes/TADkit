import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'tk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @HostBinding('class') classes = 'footer';

  private legalmenu: any[] = [
    { title: 'Legal', link: 'https://3dgenomes.org/legal' },
    { title: 'Privacy', link: 'https://3dgenomes.org/privacy' },
    { title: 'Cookies', link: 'https://3dgenomes.org/cookies' }
  ];

  today: number = Date.now();
}
