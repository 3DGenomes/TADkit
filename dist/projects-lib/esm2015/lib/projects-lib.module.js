/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProjectsAdminComponent } from './components/projects-admin/projects-admin.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsBriefComponent } from './components/projects-brief/projects-brief.component';
import { ProjectsDetailsComponent } from './components/projects-details/projects-details.component';
import { ProjectsCreateComponent } from './components/projects-create/projects-create.component';
export class ProjectsLibModule {
}
ProjectsLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    WebStorageModule,
                    ProgressSpinnerModule,
                    ButtonModule,
                    RadioButtonModule,
                    CheckboxModule,
                    ConfirmDialogModule
                ],
                declarations: [
                    ProjectsAdminComponent,
                    ProjectsListComponent,
                    ProjectsBriefComponent,
                    ProjectsDetailsComponent,
                    ProjectsCreateComponent
                ],
                exports: [
                    ProjectsAdminComponent,
                    ProjectsListComponent,
                    ProjectsBriefComponent,
                    ProjectsDetailsComponent,
                    ProjectsCreateComponent,
                    FormsModule,
                    ReactiveFormsModule
                ],
                providers: []
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Byb2plY3RzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9wcm9qZWN0cy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDcEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFnQ2pHLE1BQU07OztZQTlCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIscUJBQXFCO29CQUNyQixZQUFZO29CQUNaLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxtQkFBbUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0Qix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2QixXQUFXO29CQUNYLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7YUFDZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlTW9kdWxlIH0gZnJvbSAnbmd4LXN0b3JlJztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcm9ncmVzc3NwaW5uZXInO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgUmFkaW9CdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3JhZGlvYnV0dG9uJztcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jaGVja2JveCc7XG5pbXBvcnQgeyBDb25maXJtRGlhbG9nTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb25maXJtZGlhbG9nJztcblxuaW1wb3J0IHsgUHJvamVjdHNBZG1pbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1hZG1pbi9wcm9qZWN0cy1hZG1pbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvamVjdHNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3RzLWxpc3QvcHJvamVjdHMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvamVjdHNCcmllZkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1icmllZi9wcm9qZWN0cy1icmllZi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvamVjdHNEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3RzLWRldGFpbHMvcHJvamVjdHMtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvamVjdHNDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtY3JlYXRlL3Byb2plY3RzLWNyZWF0ZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgV2ViU3RvcmFnZU1vZHVsZSxcbiAgICBQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgQnV0dG9uTW9kdWxlLFxuICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgIENoZWNrYm94TW9kdWxlLFxuICAgIENvbmZpcm1EaWFsb2dNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUHJvamVjdHNBZG1pbkNvbXBvbmVudCxcbiAgICBQcm9qZWN0c0xpc3RDb21wb25lbnQsXG4gICAgUHJvamVjdHNCcmllZkNvbXBvbmVudCxcbiAgICBQcm9qZWN0c0RldGFpbHNDb21wb25lbnQsXG4gICAgUHJvamVjdHNDcmVhdGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFByb2plY3RzQWRtaW5Db21wb25lbnQsXG4gICAgUHJvamVjdHNMaXN0Q29tcG9uZW50LFxuICAgIFByb2plY3RzQnJpZWZDb21wb25lbnQsXG4gICAgUHJvamVjdHNEZXRhaWxzQ29tcG9uZW50LFxuICAgIFByb2plY3RzQ3JlYXRlQ29tcG9uZW50LFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0xpYk1vZHVsZSB7fVxuIl19