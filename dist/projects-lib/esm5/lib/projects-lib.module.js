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
var ProjectsLibModule = /** @class */ (function () {
    function ProjectsLibModule() {
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
    return ProjectsLibModule;
}());
export { ProjectsLibModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Byb2plY3RzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9wcm9qZWN0cy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDcEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFFakc7SUFBQTtJQThCZ0MsQ0FBQzs7Z0JBOUJoQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIscUJBQXFCO3dCQUNyQixZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7d0JBQ3hCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixXQUFXO3dCQUNYLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7aUJBQ2Q7O0lBQytCLHdCQUFDO0NBQUEsQUE5QmpDLElBOEJpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZU1vZHVsZSB9IGZyb20gJ25neC1zdG9yZSc7XG5cbmltcG9ydCB7IFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJvZ3Jlc3NzcGlubmVyJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IFJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yYWRpb2J1dHRvbic7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2hlY2tib3gnO1xuaW1wb3J0IHsgQ29uZmlybURpYWxvZ01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29uZmlybWRpYWxvZyc7XG5cbmltcG9ydCB7IFByb2plY3RzQWRtaW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtYWRtaW4vcHJvamVjdHMtYWRtaW4uY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1saXN0L3Byb2plY3RzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzQnJpZWZDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtYnJpZWYvcHJvamVjdHMtYnJpZWYuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1kZXRhaWxzL3Byb2plY3RzLWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzQ3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3RzLWNyZWF0ZS9wcm9qZWN0cy1jcmVhdGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdlYlN0b3JhZ2VNb2R1bGUsXG4gICAgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICBDaGVja2JveE1vZHVsZSxcbiAgICBDb25maXJtRGlhbG9nTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFByb2plY3RzQWRtaW5Db21wb25lbnQsXG4gICAgUHJvamVjdHNMaXN0Q29tcG9uZW50LFxuICAgIFByb2plY3RzQnJpZWZDb21wb25lbnQsXG4gICAgUHJvamVjdHNEZXRhaWxzQ29tcG9uZW50LFxuICAgIFByb2plY3RzQ3JlYXRlQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQcm9qZWN0c0FkbWluQ29tcG9uZW50LFxuICAgIFByb2plY3RzTGlzdENvbXBvbmVudCxcbiAgICBQcm9qZWN0c0JyaWVmQ29tcG9uZW50LFxuICAgIFByb2plY3RzRGV0YWlsc0NvbXBvbmVudCxcbiAgICBQcm9qZWN0c0NyZWF0ZUNvbXBvbmVudCxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNMaWJNb2R1bGUge31cbiJdfQ==