(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('ngx-store'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('primeng/api'), require('@angular/common'), require('primeng/progressspinner'), require('primeng/button'), require('primeng/radiobutton'), require('primeng/checkbox'), require('primeng/confirmdialog')) :
    typeof define === 'function' && define.amd ? define('projects-lib', ['exports', '@angular/core', '@angular/common/http', 'ngx-store', 'rxjs', 'rxjs/operators', '@angular/forms', 'primeng/api', '@angular/common', 'primeng/progressspinner', 'primeng/button', 'primeng/radiobutton', 'primeng/checkbox', 'primeng/confirmdialog'], factory) :
    (factory((global['projects-lib'] = {}),global.ng.core,global.ng.common.http,global.WebStorageModule,global.rxjs,global.rxjs.operators,global.ng.forms,global.ConfirmationService,global.ng.common,global.ProgressSpinnerModule,global.ButtonModule,global.RadioButtonModule,global.CheckboxModule,global.ConfirmDialogModule));
}(this, (function (exports,i0,i1,i2,rxjs,operators,forms,api,common,progressspinner,button,radiobutton,checkbox,confirmdialog) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var UsersAdminService = /** @class */ (function () {
        //   public currentUserIndex = 0;
        function UsersAdminService(httpClient) {
            this.httpClient = httpClient;
            this.defaultUser = 'assets/defaults/tk-default-user.json';
        }
        //   private setUserProject(userIndex) {
        //     this.currentUserIndex = userIndex;
        //     this.currentUser = this.users[this.currentUserIndex];
        //     this.currentUser.subscribe(usr => console.log('Set current user: ', usr.fullname));
        //   }
        //   private setUserProject(userIndex) {
        //     this.currentUserIndex = userIndex;
        //     this.currentUser = this.users[this.currentUserIndex];
        //     this.currentUser.subscribe(usr => console.log('Set current user: ', usr.fullname));
        //   }
        /**
         * @return {?}
         */
        UsersAdminService.prototype.loadDefaultUser =
            //   private setUserProject(userIndex) {
            //     this.currentUserIndex = userIndex;
            //     this.currentUser = this.users[this.currentUserIndex];
            //     this.currentUser.subscribe(usr => console.log('Set current user: ', usr.fullname));
            //   }
            /**
             * @return {?}
             */
            function () {
                console.log('Loading default user...');
                return this.currentUser = this.httpClient.get(this.defaultUser);
            };
        /**
         * @return {?}
         */
        UsersAdminService.prototype.getCurrentUser = /**
         * @return {?}
         */
            function () {
                // this.currentUser.subscribe(usr => console.log('Returning current user: ', usr.title));
                return this.currentUser;
            };
        UsersAdminService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] }
        ];
        UsersAdminService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ UsersAdminService.ngInjectableDef = i0.defineInjectable({ factory: function UsersAdminService_Factory() { return new UsersAdminService(i0.inject(i1.HttpClient)); }, token: UsersAdminService, providedIn: "root" });
        return UsersAdminService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsLibService = /** @class */ (function () {
        // public currentProject: Observable<Project>;
        function ProjectsLibService(httpClient, localStorageService) {
            this.httpClient = httpClient;
            this.localStorageService = localStorageService;
            this.projectsStreamUrl = 'assets/defaults/tk-default-projects.json';
            this.projectsStream = new rxjs.BehaviorSubject(null);
            this.projects = this.projectsStream.asObservable();
            this.currentProjectStream = new rxjs.BehaviorSubject(null);
            // this.currentProject = this.currentProjectStream.asObservable();
        }
        Object.defineProperty(ProjectsLibService.prototype, "currentProject", {
            // Same as above?
            get: 
            // Same as above?
            /**
             * @return {?}
             */
            function () {
                return this.currentProjectStream.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} projectsArray
         * @return {?}
         */
        ProjectsLibService.prototype.updateProjects = /**
         * @param {?} projectsArray
         * @return {?}
         */
            function (projectsArray) {
                this.projectsStream.next(projectsArray);
                this.localStorageService.set('projects', projectsArray);
                this.setProject();
            };
        /**
         * @return {?}
         */
        ProjectsLibService.prototype.loadProjects = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var projectsResource = this.localStorageService.get('projects');
                if (!projectsResource) {
                    this.httpClient.get(this.projectsStreamUrl)
                        .subscribe(function (projectsArray) {
                        _this.updateProjects(projectsArray);
                    });
                }
                else {
                    this.updateProjects(projectsResource);
                }
            };
        /**
         * @param {?=} project
         * @return {?}
         */
        ProjectsLibService.prototype.setProject = /**
         * @param {?=} project
         * @return {?}
         */
            function (project) {
                /** @type {?} */
                var theProject = null;
                if (project) {
                    theProject = this.projects
                        .pipe(operators.map(function (prjs) {
                        return prjs
                            .find(function (prj) { return prj.title === project.title; });
                    }));
                }
                else {
                    theProject = this.projects
                        .pipe(operators.take(1), operators.map(function (prjs) { return prjs[0]; }));
                }
                // console.log(theProject);
                this.currentProjectStream.next(theProject);
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsLibService.prototype.getProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                return this.currentProject;
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsLibService.prototype.addProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                /** @type {?} */
                var projectsArray = __spread(this.projectsStream.getValue(), [project]);
                this.updateProjects(projectsArray);
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsLibService.prototype.editProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                /** @type {?} */
                var projectsArray = __spread(this.projectsStream.getValue(), [project]);
                this.updateProjects(projectsArray);
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsLibService.prototype.deleteProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                /** @type {?} */
                var projectsArray = this.projectsStream.getValue().filter(function (item) { return item.title !== project.title; });
                this.updateProjects(projectsArray);
            };
        ProjectsLibService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] }
        ];
        ProjectsLibService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: i2.LocalStorageService }
            ];
        };
        /** @nocollapse */ ProjectsLibService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectsLibService_Factory() { return new ProjectsLibService(i0.inject(i1.HttpClient), i0.inject(i2.LocalStorageService)); }, token: ProjectsLibService, providedIn: "root" });
        return ProjectsLibService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    // import { Dataset } from "./project-dataset.model"
    // import { Overlay } from "./project-overlay.model"
    // import { Storyboard } from "./project-storyboard.model"
    // // import { Species } from "./project-genomics.model";
    // export class Datasets extends Array<Dataset> {}
    // export class Overlays extends Array<Overlay> {}
    // export class Storyboards extends Array<Storyboard> {}
    var  
    // import { Dataset } from "./project-dataset.model"
    // import { Overlay } from "./project-overlay.model"
    // import { Storyboard } from "./project-storyboard.model"
    // // import { Species } from "./project-genomics.model";
    // export class Datasets extends Array<Dataset> {}
    // export class Overlays extends Array<Overlay> {}
    // export class Storyboards extends Array<Storyboard> {}
    Project = /** @class */ (function () {
        // import { Dataset } from "./project-dataset.model"
        // import { Overlay } from "./project-overlay.model"
        // import { Storyboard } from "./project-storyboard.model"
        // // import { Species } from "./project-genomics.model";
        // export class Datasets extends Array<Dataset> {}
        // export class Overlays extends Array<Overlay> {}
        // export class Storyboards extends Array<Storyboard> {}
        function Project() {
        }
        return Project;
    }());
    var Projects = /** @class */ (function (_super) {
        __extends(Projects, _super);
        function Projects() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Projects;
    }(Array));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsAdminComponent = /** @class */ (function () {
        function ProjectsAdminComponent() {
            this.classes = 'projects';
        }
        ProjectsAdminComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'projects-admin',
                        template: "<h2>Projects</h2>\n  <projects-list></projects-list>\n  <projects-details></projects-details>\n  <projects-create></projects-create>\n"
                    }] }
        ];
        ProjectsAdminComponent.propDecorators = {
            classes: [{ type: i0.HostBinding, args: ['class',] }]
        };
        return ProjectsAdminComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsBriefComponent = /** @class */ (function () {
        function ProjectsBriefComponent(projectsService) {
            this.projectsService = projectsService;
        }
        /**
         * @return {?}
         */
        ProjectsBriefComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.getProject();
            };
        /**
         * @return {?}
         */
        ProjectsBriefComponent.prototype.getProject = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.projectsService.currentProject.subscribe(function (prj) { return _this.project = prj; });
            };
        ProjectsBriefComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'projects-brief',
                        template: "<section class=\"tk-list\">\n  <h3>\n    Project: \n    <ng-container *ngIf=\"(project | async) as project; else loading\">{{project.title}}</ng-container>\n  </h3>\n  <div *ngIf=\"(project | async) as project; else loading\">\n    <table>\n      <tr><td>Title</td><td>{{project.title}}</td></tr>\n      <tr><td>Description</td><td>{{project.description}}</td></tr>\n      <tr><td>State</td><td>{{project.state}}</td></tr>\n    </table>\n    <ng-template #noItems>No Items!</ng-template>\n  </div>\n  <ng-template #loading>\n    <p-progressSpinner></p-progressSpinner>\n  </ng-template> \n</section>\n<ng-template #loading>Loading ...<p-progressSpinner></p-progressSpinner></ng-template>"
                    }] }
        ];
        ProjectsBriefComponent.ctorParameters = function () {
            return [
                { type: ProjectsLibService }
            ];
        };
        return ProjectsBriefComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsCreateComponent = /** @class */ (function () {
        function ProjectsCreateComponent(projectsService) {
            this.projectsService = projectsService;
        }
        /**
         * @return {?}
         */
        ProjectsCreateComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.createFormControls();
                this.createForm();
            };
        /**
         * @return {?}
         */
        ProjectsCreateComponent.prototype.createFormControls = /**
         * @return {?}
         */
            function () {
                this.title = new forms.FormControl('');
                this.description = new forms.FormControl('');
            };
        /**
         * @return {?}
         */
        ProjectsCreateComponent.prototype.createForm = /**
         * @return {?}
         */
            function () {
                this.projectForm = new forms.FormGroup({
                    title: this.title,
                    description: this.description,
                });
            };
        /**
         * @return {?}
         */
        ProjectsCreateComponent.prototype.addProject = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var newProject = Object.assign({}, this.projectForm.value);
                this.projectsService.addProject(newProject);
            };
        ProjectsCreateComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'projects-create',
                        template: "<section class=\"tk-form\">\n  <h3>Create New Project:</h3>\n  <form novalidate [formGroup]=\"projectForm\" (ngSubmit)=\"addProject()\" class=\"ui-inputgroup\">\n    <span class=\"ui-inputgroup-addon\"><i class=\"pi pi-user\"></i></span>\n    <label>Project Title:</label>\n    <input type=\"text\" formControlName=\"title\">\n    <span class=\"ui-inputgroup-addon\"><i class=\"pi pi-user\"></i></span>\n    <label>Description:</label>\n    <input type=\"text\" formControlName=\"description\">\n    <button pButton type=\"submit\" icon=\"pi pi-check\" iconPos=\"left\" label=\"Submit\"></button>\n  </form>\n</section>"
                    }] }
        ];
        ProjectsCreateComponent.ctorParameters = function () {
            return [
                { type: ProjectsLibService }
            ];
        };
        return ProjectsCreateComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsDetailsComponent = /** @class */ (function () {
        function ProjectsDetailsComponent(projectsService) {
            this.projectsService = projectsService;
        }
        /**
         * @return {?}
         */
        ProjectsDetailsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.getProject();
            };
        /**
         * @return {?}
         */
        ProjectsDetailsComponent.prototype.getProject = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.projectsService.currentProject.subscribe(function (prj) { return _this.project = prj; });
            };
        ProjectsDetailsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'projects-details',
                        template: "<section class=\"tk-list\">\n  <h3>\n    Project: \n    <ng-container *ngIf=\"(project | async) as project; else loading\">{{project.title}}</ng-container>\n  </h3>\n  <div *ngIf=\"(project | async) as project; else loading\">\n    <table>\n      <tr><td>Title</td><td>{{project.title}}</td></tr>\n      <tr><td>Description</td><td>{{project.description}}</td></tr>\n      <tr><td>State</td><td>{{project.state}}</td></tr>\n    </table>\n    <ng-template #noItems>No Items!</ng-template>\n  </div>\n</section>\n<ng-template #loading>Loading ...<p-progressSpinner></p-progressSpinner></ng-template>"
                    }] }
        ];
        ProjectsDetailsComponent.ctorParameters = function () {
            return [
                { type: ProjectsLibService }
            ];
        };
        return ProjectsDetailsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsListComponent = /** @class */ (function () {
        // public currentCheck: string;
        function ProjectsListComponent(projectsService, confirmationService) {
            this.projectsService = projectsService;
            this.confirmationService = confirmationService;
        }
        /**
         * @return {?}
         */
        ProjectsListComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.getProjects();
            };
        /**
         * @return {?}
         */
        ProjectsListComponent.prototype.getProjects = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.projectsService.projects.subscribe(function (prjs) { return _this.projects = prjs; });
                this.projectsService.currentProject.subscribe(function (prj) {
                    _this.currentProject = prj;
                });
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsListComponent.prototype.setProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                this.projectsService.setProject(project);
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsListComponent.prototype.editProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                // Open dialog with Create form
            };
        /**
         * @param {?} project
         * @return {?}
         */
        ProjectsListComponent.prototype.deleteProject = /**
         * @param {?} project
         * @return {?}
         */
            function (project) {
                var _this = this;
                this.confirmationService.confirm({
                    message: 'Are you sure that you want to delete this project',
                    accept: function () {
                        _this.projectsService.deleteProject(project);
                    }
                });
            };
        ProjectsListComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'projects-list',
                        template: "<section class=\"tk-list\">\n  <h3>Projects List</h3>\n  <div *ngIf=\"projects else loading\">\n      <!-- <ng-container *ngIf=\"projects.length; else noItems\"> -->\n      <table>\n        <tr>\n          <th>Title</th>\n          <th>Description</th>\n          <th>Date</th>\n          <th>Select</th>\n          <th>Edit</th>\n          <th>Delete</th>\n        </tr>\n        <tr *ngFor=\"let project of projects\">\n          <td>{{project.title}}</td>\n          <td>{{project.description}}</td>\n          <td>{{project.date}}</td>\n          <!-- <td><p-radioButton (click)=\"setProject(project)\" name=\"selectProject\" value=\"{{project.title}}\" [(ngModel)]=\"currentCheck\"></p-radioButton></td> -->\n          <td><button (click)=\"setProject(project)\" pButton type=\"button\" icon=\"pi pi-check\" iconPos=\"left\" [ngClass]=\"{'ui-state-active': project.title === (currentProject | async)?.title }\"></button></td>\n          <td><button pButton type=\"button\" icon=\"pi pi-pencil\" iconPos=\"left\"></button></td>\n          <td><button (click)=\"deleteProject(project)\" pButton type=\"button\" icon=\"pi pi-trash\" iconPos=\"left\"></button></td>\n        </tr>\n      </table>\n      <!-- </ng-container>     -->\n      <ng-template #noItems>No Items!</ng-template>\n    </div>\n    <ng-template #loading>\n      <p-progressSpinner></p-progressSpinner>\n    </ng-template> \n</section>\n<p-confirmDialog header=\"Confirmation\" icon=\"pi pi-exclamation-triangle\" width=\"425\"></p-confirmDialog>\n",
                        providers: [api.ConfirmationService],
                        styles: [":host ::ng-deep th{text-align:left}"]
                    }] }
        ];
        ProjectsListComponent.ctorParameters = function () {
            return [
                { type: ProjectsLibService },
                { type: api.ConfirmationService }
            ];
        };
        return ProjectsListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProjectsLibModule = /** @class */ (function () {
        function ProjectsLibModule() {
        }
        ProjectsLibModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            i2.WebStorageModule,
                            progressspinner.ProgressSpinnerModule,
                            button.ButtonModule,
                            radiobutton.RadioButtonModule,
                            checkbox.CheckboxModule,
                            confirmdialog.ConfirmDialogModule
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
                            forms.FormsModule,
                            forms.ReactiveFormsModule
                        ],
                        providers: []
                    },] }
        ];
        return ProjectsLibModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.UsersAdminService = UsersAdminService;
    exports.ProjectsLibService = ProjectsLibService;
    exports.Project = Project;
    exports.Projects = Projects;
    exports.ProjectsAdminComponent = ProjectsAdminComponent;
    exports.ProjectsBriefComponent = ProjectsBriefComponent;
    exports.ProjectsCreateComponent = ProjectsCreateComponent;
    exports.ProjectsDetailsComponent = ProjectsDetailsComponent;
    exports.ProjectsListComponent = ProjectsListComponent;
    exports.ProjectsLibModule = ProjectsLibModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcHJvamVjdHMtbGliL2xpYi91c2Vycy1hZG1pbi5zZXJ2aWNlLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9wcm9qZWN0cy1saWIuc2VydmljZS50cyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9tb2RlbHMvcHJvamVjdC5tb2RlbC50cyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9jb21wb25lbnRzL3Byb2plY3RzLWFkbWluL3Byb2plY3RzLWFkbWluLmNvbXBvbmVudC50cyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9jb21wb25lbnRzL3Byb2plY3RzLWJyaWVmL3Byb2plY3RzLWJyaWVmLmNvbXBvbmVudC50cyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9jb21wb25lbnRzL3Byb2plY3RzLWNyZWF0ZS9wcm9qZWN0cy1jcmVhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9wcm9qZWN0cy1saWIvbGliL2NvbXBvbmVudHMvcHJvamVjdHMtZGV0YWlscy9wcm9qZWN0cy1kZXRhaWxzLmNvbXBvbmVudC50cyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9jb21wb25lbnRzL3Byb2plY3RzLWxpc3QvcHJvamVjdHMtbGlzdC5jb21wb25lbnQudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvcHJvamVjdHMtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlciwgVXNlcnMgfSBmcm9tICcuL21vZGVscy91c2VyLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuXG5leHBvcnQgY2xhc3MgVXNlcnNBZG1pblNlcnZpY2Uge1xuICAgIGRlZmF1bHRVc2VyOiBzdHJpbmc7XG4vLyAgIHByaXZhdGUgdXNlcnM6IFVzZXJzO1xuICBwdWJsaWMgY3VycmVudFVzZXI6IE9ic2VydmFibGU8VXNlcj47XG4vLyAgIHB1YmxpYyBjdXJyZW50VXNlckluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICB0aGlzLmRlZmF1bHRVc2VyID0gJ2Fzc2V0cy9kZWZhdWx0cy90ay1kZWZhdWx0LXVzZXIuanNvbic7XG4gIH1cblxuLy8gICBwcml2YXRlIHNldFVzZXJQcm9qZWN0KHVzZXJJbmRleCkge1xuLy8gICAgIHRoaXMuY3VycmVudFVzZXJJbmRleCA9IHVzZXJJbmRleDtcbi8vICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy51c2Vyc1t0aGlzLmN1cnJlbnRVc2VySW5kZXhdO1xuLy8gICAgIHRoaXMuY3VycmVudFVzZXIuc3Vic2NyaWJlKHVzciA9PiBjb25zb2xlLmxvZygnU2V0IGN1cnJlbnQgdXNlcjogJywgdXNyLmZ1bGxuYW1lKSk7XG4vLyAgIH1cblxuICBwdWJsaWMgbG9hZERlZmF1bHRVc2VyKCk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIGNvbnNvbGUubG9nKCdMb2FkaW5nIGRlZmF1bHQgdXNlci4uLicpO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy5odHRwQ2xpZW50LmdldDxVc2VyPih0aGlzLmRlZmF1bHRVc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50VXNlcigpOiBPYnNlcnZhYmxlPFVzZXI+ICB7XG4gICAgLy8gdGhpcy5jdXJyZW50VXNlci5zdWJzY3JpYmUodXNyID0+IGNvbnNvbGUubG9nKCdSZXR1cm5pbmcgY3VycmVudCB1c2VyOiAnLCB1c3IudGl0bGUpKTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlcjtcbiAgfVxuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnbmd4LXN0b3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0cyB9IGZyb20gJy4vbW9kZWxzL3Byb2plY3QubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0xpYlNlcnZpY2Uge1xuICAvLyBVc2VyIHByb2plY3RzIHN0cmVhbVxuICBwcml2YXRlIHByb2plY3RzU3RyZWFtVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJvamVjdHNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0cz47XG4gIHB1YmxpYyBwcm9qZWN0czogT2JzZXJ2YWJsZTxQcm9qZWN0cz47XG4gIC8vIEN1cnJlbnQgcHJvamVjdCBzdHJlYW1cbiAgcHJpdmF0ZSBjdXJyZW50UHJvamVjdFN0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFByb2plY3Q+O1xuICAvLyBwdWJsaWMgY3VycmVudFByb2plY3Q6IE9ic2VydmFibGU8UHJvamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHB1YmxpYyBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7XG4gICAgdGhpcy5wcm9qZWN0c1N0cmVhbVVybCA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC1wcm9qZWN0cy5qc29uJztcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0cz4obnVsbCk7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvamVjdD4obnVsbCk7XG4gICAgLy8gdGhpcy5jdXJyZW50UHJvamVjdCA9IHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvLyBTYW1lIGFzIGFib3ZlP1xuICBnZXQgY3VycmVudFByb2plY3QoKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpIHtcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtLm5leHQocHJvamVjdHNBcnJheSk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgncHJvamVjdHMnLCBwcm9qZWN0c0FycmF5KTtcbiAgICB0aGlzLnNldFByb2plY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUHJvamVjdHMoKTogdm9pZCB7XG4gICAgY29uc3QgcHJvamVjdHNSZXNvdXJjZSA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3Byb2plY3RzJyk7XG4gICAgaWYgKCFwcm9qZWN0c1Jlc291cmNlKSB7XG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0PFByb2plY3RzPih0aGlzLnByb2plY3RzU3RyZWFtVXJsKVxuICAgICAgLnN1YnNjcmliZShwcm9qZWN0c0FycmF5ID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0cyhwcm9qZWN0c0FycmF5KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzUmVzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm9qZWN0KHByb2plY3Q/KTogdm9pZCB7XG4gICAgbGV0IHRoZVByb2plY3QgPSBudWxsO1xuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICB0aGVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChwcmpzID0+IHByanNcbiAgICAgICAgICAuZmluZChwcmogPT4gcHJqLnRpdGxlID09PSBwcm9qZWN0LnRpdGxlKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcChwcmpzID0+IHByanNbMF0pXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGVQcm9qZWN0KTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0U3RyZWFtLm5leHQodGhlUHJvamVjdCk7XG4gIH1cblxuICBwdWJsaWMgIGdldFByb2plY3QocHJvamVjdCk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIGFkZFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbIC4uLnRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKSwgcHJvamVjdCBdO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZWRpdFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbIC4uLnRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKSwgcHJvamVjdCBdO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlUHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IHRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKS5maWx0ZXIoaXRlbSA9PiBpdGVtLnRpdGxlICE9PSBwcm9qZWN0LnRpdGxlKTtcbiAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogUHJvamVjdDogQ2xhc3MgZW5jYXBzdWxhdGluZyBhbGwgZGF0YSB3aXRoaW4gYSBUQURraXQgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICcuL3Byb2plY3QtbWV0YWRhdGEubW9kZWwnO1xuXG4vLyBpbXBvcnQgeyBEYXRhc2V0IH0gZnJvbSBcIi4vcHJvamVjdC1kYXRhc2V0Lm1vZGVsXCJcbi8vIGltcG9ydCB7IE92ZXJsYXkgfSBmcm9tIFwiLi9wcm9qZWN0LW92ZXJsYXkubW9kZWxcIlxuLy8gaW1wb3J0IHsgU3Rvcnlib2FyZCB9IGZyb20gXCIuL3Byb2plY3Qtc3Rvcnlib2FyZC5tb2RlbFwiXG4vLyAvLyBpbXBvcnQgeyBTcGVjaWVzIH0gZnJvbSBcIi4vcHJvamVjdC1nZW5vbWljcy5tb2RlbFwiO1xuXG4vLyBleHBvcnQgY2xhc3MgRGF0YXNldHMgZXh0ZW5kcyBBcnJheTxEYXRhc2V0PiB7fVxuLy8gZXhwb3J0IGNsYXNzIE92ZXJsYXlzIGV4dGVuZHMgQXJyYXk8T3ZlcmxheT4ge31cbi8vIGV4cG9ydCBjbGFzcyBTdG9yeWJvYXJkcyBleHRlbmRzIEFycmF5PFN0b3J5Ym9hcmQ+IHt9XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgbWV0YWRhdGE6IE1ldGFkYXRhO1xuICB1dWlkOiBzdHJpbmc7XG4gIHJlZjogc3RyaW5nOyAvLyBmb3IgZWFzeSByZWZlcmVuY2UgaW4gVUkvVVJJXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHN0YXRlOiBib29sZWFuO1xuICBjZWxsVHlwZTogc3RyaW5nO1xuICBzcGVjaWVzOiBzdHJpbmc7XG4gIGFzc2VtYmx5OiBzdHJpbmc7XG4gIC8vIGRhdGFzZXRzPzogRGF0YXNldHNbXSB8IG51bGw7XG4gIC8vIG92ZXJsYXlzPzogT3ZlcmxheXNbXSB8IG51bGw7XG4gIC8vIHN0b3J5Ym9hcmRzPzogU3Rvcnlib2FyZHNbXSB8IG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0cyBleHRlbmRzIEFycmF5PFByb2plY3Q+IHt9XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtYWRtaW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtYWRtaW4uY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIFByb2plY3RzQWRtaW5Db21wb25lbnQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICdwcm9qZWN0cyc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtYnJpZWYnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtYnJpZWYuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzQnJpZWZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5wdWJsaWMgcHJvamVjdDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2plY3RzU2VydmljZTogUHJvamVjdHNMaWJTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFByb2plY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvamVjdCgpIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHRoaXMucHJvamVjdCA9IHByaik7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm9qZWN0cy1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcm9qZWN0cy1jcmVhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtY3JlYXRlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0NyZWF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHByb2plY3RGb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyB0aXRsZTogRm9ybUNvbnRyb2w7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogRm9ybUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVGb3JtQ29udHJvbHMoKTtcbiAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRm9ybUNvbnRyb2xzKCkge1xuICAgIHRoaXMudGl0bGUgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xuICAgIHRoaXMucHJvamVjdEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvamVjdCgpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9qZWN0Rm9ybS52YWx1ZSk7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb2plY3RzLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2plY3RzLWRldGFpbHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtZGV0YWlscy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxucHVibGljIHByb2plY3Q7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRQcm9qZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFByb2plY3QoKSB7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuY3VycmVudFByb2plY3Quc3Vic2NyaWJlKHByaiA9PiB0aGlzLnByb2plY3QgPSBwcmopO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XG5cbmltcG9ydCB7IENvbmZpcm1hdGlvblNlcnZpY2UgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2plY3RzLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb2plY3RzLWxpc3QuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtDb25maXJtYXRpb25TZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdHM7XG4gIHB1YmxpYyBjdXJyZW50UHJvamVjdDtcbiAgLy8gcHVibGljIGN1cnJlbnRDaGVjazogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c0xpYlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maXJtYXRpb25TZXJ2aWNlOiBDb25maXJtYXRpb25TZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZXRQcm9qZWN0cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9qZWN0cygpOiB2b2lkIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5wcm9qZWN0cy5zdWJzY3JpYmUocHJqcyA9PiB0aGlzLnByb2plY3RzID0gcHJqcyk7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuY3VycmVudFByb2plY3Quc3Vic2NyaWJlKHByaiA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gcHJqO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljICBzZXRQcm9qZWN0KHByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5zZXRQcm9qZWN0KHByb2plY3QpO1xuICB9XG5cbiAgcHVibGljICBlZGl0UHJvamVjdChwcm9qZWN0KTogdm9pZCB7XG4gICAgLy8gT3BlbiBkaWFsb2cgd2l0aCBDcmVhdGUgZm9ybVxuICB9XG5cbiAgcHVibGljICBkZWxldGVQcm9qZWN0KHByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1hdGlvblNlcnZpY2UuY29uZmlybSh7XG4gICAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvamVjdCcsXG4gICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuZGVsZXRlUHJvamVjdChwcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VNb2R1bGUgfSBmcm9tICduZ3gtc3RvcmUnO1xuXG5pbXBvcnQgeyBQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Byb2dyZXNzc3Bpbm5lcic7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBSYWRpb0J1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmFkaW9idXR0b24nO1xuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NoZWNrYm94JztcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbmZpcm1kaWFsb2cnO1xuXG5pbXBvcnQgeyBQcm9qZWN0c0FkbWluQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3RzLWFkbWluL3Byb2plY3RzLWFkbWluLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtbGlzdC9wcm9qZWN0cy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9qZWN0c0JyaWVmQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3RzLWJyaWVmL3Byb2plY3RzLWJyaWVmLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9qZWN0c0RldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtZGV0YWlscy9wcm9qZWN0cy1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9qZWN0c0NyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1jcmVhdGUvcHJvamVjdHMtY3JlYXRlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBXZWJTdG9yYWdlTW9kdWxlLFxuICAgIFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgUmFkaW9CdXR0b25Nb2R1bGUsXG4gICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgQ29uZmlybURpYWxvZ01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQcm9qZWN0c0FkbWluQ29tcG9uZW50LFxuICAgIFByb2plY3RzTGlzdENvbXBvbmVudCxcbiAgICBQcm9qZWN0c0JyaWVmQ29tcG9uZW50LFxuICAgIFByb2plY3RzRGV0YWlsc0NvbXBvbmVudCxcbiAgICBQcm9qZWN0c0NyZWF0ZUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUHJvamVjdHNBZG1pbkNvbXBvbmVudCxcbiAgICBQcm9qZWN0c0xpc3RDb21wb25lbnQsXG4gICAgUHJvamVjdHNCcmllZkNvbXBvbmVudCxcbiAgICBQcm9qZWN0c0RldGFpbHNDb21wb25lbnQsXG4gICAgUHJvamVjdHNDcmVhdGVDb21wb25lbnQsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzTGliTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJCZWhhdmlvclN1YmplY3QiLCJtYXAiLCJ0YWtlIiwiTG9jYWxTdG9yYWdlU2VydmljZSIsInRzbGliXzEuX19leHRlbmRzIiwiQ29tcG9uZW50IiwiSG9zdEJpbmRpbmciLCJGb3JtQ29udHJvbCIsIkZvcm1Hcm91cCIsIkNvbmZpcm1hdGlvblNlcnZpY2UiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIldlYlN0b3JhZ2VNb2R1bGUiLCJQcm9ncmVzc1NwaW5uZXJNb2R1bGUiLCJCdXR0b25Nb2R1bGUiLCJSYWRpb0J1dHRvbk1vZHVsZSIsIkNoZWNrYm94TW9kdWxlIiwiQ29uZmlybURpYWxvZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztRQWVFLDJCQUFvQixVQUFzQjtZQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsc0NBQXNDLENBQUM7U0FDM0Q7Ozs7Ozs7Ozs7Ozs7O1FBUU0sMkNBQWU7Ozs7Ozs7OztZQUF0QjtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdkU7Ozs7UUFFTSwwQ0FBYzs7O1lBQXJCOztnQkFFRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDekI7O29CQTVCRkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozt3QkFOUUMsYUFBVTs7OztnQ0FEbkI7S0FLQTs7SUNMQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FB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