import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-tadkit-routing.module';

import { ButtonModule } from 'primeng/primeng';
import { SidebarModule } from 'primeng/sidebar';

import { TkProjectsModule } from '@projects/tk-projects.module';

import { TkHeaderComponent } from './header/tk-header.component';
import { TkMenuComponent } from './menu/tk-menu.component';
import { TkSidebarComponent } from './sidebar/tk-sidebar.component';
import { TkFooterComponent } from './footer/tk-footer.component';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    SidebarModule,
    TkProjectsModule
  ],
  declarations: [
    TkHeaderComponent,
    TkMenuComponent,
    TkSidebarComponent,
    TkFooterComponent
  ],
  exports: [
    TkHeaderComponent,
    TkMenuComponent,
    TkSidebarComponent,
    TkFooterComponent
  ]
})
export class TkLayoutModule {}
