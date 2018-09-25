import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../routing.module';

import { ButtonModule } from 'primeng/primeng';
import { SidebarModule } from 'primeng/sidebar';

import { ProjectsModule } from '@projects/projects.module';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ButtonModule,
    SidebarModule,
    ProjectsModule
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class LayoutModule {}
