/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { WorkspaceConfigComponent } from './config/workspace-config.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WidgetSpawnerComponent } from './widget-spawner/widget-spawner.component';
import { WorkspaceFixedComponent } from './layouts/fixed/workspace.component';
import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { WorkspaceRowsComponent } from './layouts/rows/workspace.component';
import { WorkspaceColsComponent } from './layouts/cols/workspace.component';
import { GridsterModule } from 'angular-gridster2';
import { WorkspaceGridsterComponent } from './layouts/gridster/workspace.component';
import { GenomicsLibModule } from 'genomics-lib';
import { ProjectsLibModule } from 'projects-lib';
export class WorkspaceLibModule {
}
WorkspaceLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ProgressSpinnerModule,
                    ButtonModule,
                    ConfirmDialogModule,
                    DropdownModule,
                    NgxResizableModule,
                    GridsterModule,
                    GenomicsLibModule,
                    ProjectsLibModule
                ],
                declarations: [
                    WorkspaceConfigComponent,
                    WidgetSpawnerComponent,
                    WorkspaceComponent,
                    WorkspaceFixedComponent,
                    WorkspaceRowsComponent,
                    WorkspaceColsComponent,
                    WorkspaceGridsterComponent,
                ],
                exports: [],
                providers: [],
                entryComponents: [
                    WorkspaceFixedComponent,
                    WorkspaceRowsComponent,
                    WorkspaceColsComponent,
                    WorkspaceGridsterComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly93b3Jrc3BhY2UtbGliLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVuRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFcEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQWlDakQsTUFBTTs7O1lBL0JMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLHFCQUFxQjtvQkFDckIsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO2lCQUMzQjtnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUU7b0JBQ2YsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO2lCQUMzQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcm9ncmVzc3NwaW5uZXInO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgQ29uZmlybURpYWxvZ01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29uZmlybWRpYWxvZyc7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xuXG5pbXBvcnQgeyBXb3Jrc3BhY2VDb25maWdDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZy93b3Jrc3BhY2UtY29uZmlnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VDb21wb25lbnQgfSBmcm9tICcuL3dvcmtzcGFjZS93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdpZGdldFNwYXduZXJDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldC1zcGF3bmVyL3dpZGdldC1zcGF3bmVyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL2ZpeGVkL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBOZ3hSZXNpemFibGVNb2R1bGUgfSBmcm9tICdAM2RnZW5vbWVzL25neC1yZXNpemFibGUnO1xuaW1wb3J0IHsgV29ya3NwYWNlUm93c0NvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0cy9yb3dzL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlQ29sc0NvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBHcmlkc3Rlck1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZ3JpZHN0ZXIyJztcbmltcG9ydCB7IFdvcmtzcGFjZUdyaWRzdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL2dyaWRzdGVyL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBHZW5vbWljc0xpYk1vZHVsZSB9IGZyb20gJ2dlbm9taWNzLWxpYic7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYk1vZHVsZSB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBDb25maXJtRGlhbG9nTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIE5neFJlc2l6YWJsZU1vZHVsZSxcbiAgICBHcmlkc3Rlck1vZHVsZSxcbiAgICBHZW5vbWljc0xpYk1vZHVsZSxcbiAgICBQcm9qZWN0c0xpYk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXb3Jrc3BhY2VDb25maWdDb21wb25lbnQsXG4gICAgV2lkZ2V0U3Bhd25lckNvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VDb21wb25lbnQsXG4gICAgV29ya3NwYWNlRml4ZWRDb21wb25lbnQsXG4gICAgV29ya3NwYWNlUm93c0NvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUdyaWRzdGVyQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgV29ya3NwYWNlRml4ZWRDb21wb25lbnQsXG4gICAgV29ya3NwYWNlUm93c0NvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUdyaWRzdGVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlTGliTW9kdWxlIHt9XG4iXX0=