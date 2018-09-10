(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-tadkit.component.css":
/*!******************************************!*\
  !*** ./src/app/app-tadkit.component.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "*, *:before, *:after {\n\tbox-sizing: border-box;\n}\n\n/* CSSGrid Layout */\n\ntk-header { -ms-grid-row: 1; -ms-grid-column: 1; -ms-grid-column-span: 2; grid-area: header; }\n\ntk-nav { grid-area: navigation; }\n\ntk-main { -ms-grid-row: 2; -ms-grid-column: 2; grid-area: main; }\n\ntk-sidebar { -ms-grid-row: 2; -ms-grid-column: 1; grid-area: sidebar; }\n\ntk-footer { -ms-grid-row: 3; -ms-grid-column: 1; -ms-grid-column-span: 2; grid-area: footer; }\n\n@media screen and (max-width: 600px) {\ntk-header {\n\t\t-ms-grid-row: 1;\n\t\t-ms-grid-column: 1;\n\t}\ntk-main {\n\t\t-ms-grid-row: 3;\n\t\t-ms-grid-column: 1;\n\t}\ntk-sidebar {\n\t\t-ms-grid-row: 2;\n\t\t-ms-grid-column: 1;\n\t}\ntk-footer {\n\t\t-ms-grid-row: 4;\n\t\t-ms-grid-column: 1;\n\t}\n}\n\n:host {\n\tdisplay: -ms-grid;\n\tdisplay: grid;\n\t    grid-template-areas: \"header header\"\n\t                     \"sidebar main\"\n\t                     \"footer footer\";\n\t-ms-grid-columns: 0px 1fr;\n\tgrid-template-columns: 0px 1fr;\n\t-ms-grid-rows: 50px\n\t\t\t\t\t\t1fr\n\t\t\t\t\t\t14px;\n\tgrid-template-rows: 50px\n\t\t\t\t\t\t1fr\n\t\t\t\t\t\t14px;\n\t/* grid-gap: 0; */\n\tmin-height: 100vh;\n}\n\n/* Small width layout e.g. mobile  */\n\n@media screen and (max-width: 600px) {\ntk-header { -ms-grid-row: 1; -ms-grid-column: 1; -ms-grid-column-span: 2; grid-area: header; }\ntk-nav { grid-area: navigation; }\ntk-main { -ms-grid-row: 2; -ms-grid-column: 2; grid-area: main; }\ntk-sidebar { -ms-grid-row: 2; -ms-grid-column: 1; grid-area: sidebar; }\ntk-footer { -ms-grid-row: 3; -ms-grid-column: 1; -ms-grid-column-span: 2; grid-area: footer; }\n:host {\n\t\t    grid-template-areas: \"header\"\n\t\t\t\t\t\t\t \"sidebar\"\n\t\t\t\t\t\t\t \"main\"\n\t\t                     \"footer\";\n\t\t-ms-grid-columns: 100%;\n\t\tgrid-template-columns: 100%;\n\t\t-ms-grid-rows: 50px \n\t\t\t\t\t\t\t0px\n\t\t\t\t\t\t\t1fr\n\t\t\t\t\t\t\t30px;\n\t\tgrid-template-rows: 50px \n\t\t\t\t\t\t\t0px\n\t\t\t\t\t\t\t1fr\n\t\t\t\t\t\t\t30px;\n\t}\n}\n"

/***/ }),

/***/ "./src/app/app-tadkit.component.html":
/*!*******************************************!*\
  !*** ./src/app/app-tadkit.component.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tk-header></tk-header>\n<tk-sidebar></tk-sidebar>\n<tk-main></tk-main>\n<tk-footer></tk-footer>"

/***/ }),

/***/ "./src/app/app-tadkit.component.ts":
/*!*****************************************!*\
  !*** ./src/app/app-tadkit.component.ts ***!
  \*****************************************/
/*! exports provided: AppTadkitComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTadkitComponent", function() { return AppTadkitComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_tk_projects_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/tk-projects.service */ "./src/app/services/tk-projects.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppTadkitComponent = /** @class */ (function () {
    function AppTadkitComponent(tkProjectsService) {
        this.tkProjectsService = tkProjectsService;
    }
    AppTadkitComponent.prototype.ngOnInit = function () {
        this.tkDefaults();
    };
    AppTadkitComponent.prototype.ngOnDestroy = function () {
    };
    AppTadkitComponent.prototype.tkDefaults = function () {
        this.currentProject$ = this.tkProjectsService.getProject();
        // this.currentProject$.subscribe(prj => console.log('<app> Returning currentProject$: ', prj.title));
    };
    AppTadkitComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tadkit',
            template: __webpack_require__(/*! ./app-tadkit.component.html */ "./src/app/app-tadkit.component.html"),
            styles: [__webpack_require__(/*! ./app-tadkit.component.css */ "./src/app/app-tadkit.component.css")]
        }),
        __metadata("design:paramtypes", [_services_tk_projects_service__WEBPACK_IMPORTED_MODULE_1__["TkProjectsService"]])
    ], AppTadkitComponent);
    return AppTadkitComponent;
}());



/***/ }),

/***/ "./src/app/app-tadkit.module.ts":
/*!**************************************!*\
  !*** ./src/app/app-tadkit.module.ts ***!
  \**************************************/
/*! exports provided: AppTadkitModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTadkitModule", function() { return AppTadkitModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_tadkit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-tadkit.component */ "./src/app/app-tadkit.component.ts");
/* harmony import */ var _components_layout_tk_layout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/layout/tk-layout.module */ "./src/app/components/layout/tk-layout.module.ts");
/* harmony import */ var _components_main_tk_main_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/main/tk-main.module */ "./src/app/components/main/tk-main.module.ts");
/* harmony import */ var _services_tk_projects_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/tk-projects.service */ "./src/app/services/tk-projects.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { RouterModule } from '@angular/router';

// import { TkSharedModule } from './components/main/tk-shared.module';
// import { StorageServiceModule } from 'angular-webstorage-service';




// const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);
var AppTadkitModule = /** @class */ (function () {
    function AppTadkitModule() {
    }
    AppTadkitModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                // TkSharedModule,
                // StorageServiceModule,
                _components_layout_tk_layout_module__WEBPACK_IMPORTED_MODULE_5__["TkLayoutModule"],
                _components_main_tk_main_module__WEBPACK_IMPORTED_MODULE_6__["TkMainModule"]
                // rootRouting,
            ],
            declarations: [
                _app_tadkit_component__WEBPACK_IMPORTED_MODULE_4__["AppTadkitComponent"]
            ],
            providers: [
                _services_tk_projects_service__WEBPACK_IMPORTED_MODULE_7__["TkProjectsService"]
            ],
            bootstrap: [_app_tadkit_component__WEBPACK_IMPORTED_MODULE_4__["AppTadkitComponent"]]
        })
    ], AppTadkitModule);
    return AppTadkitModule;
}());



/***/ }),

/***/ "./src/app/components/layout/tk-footer.component.css":
/*!***********************************************************!*\
  !*** ./src/app/components/layout/tk-footer.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n    display: flex;\n    /* justify-content: space-between; */\n    /* align-items: center; */\n\tbackground: #fff;\n\tcolor: #ccc;\n\tfont-size: 0.7em;\n    padding-left: 0.6em;\n}\n"

/***/ }),

/***/ "./src/app/components/layout/tk-footer.component.html":
/*!************************************************************!*\
  !*** ./src/app/components/layout/tk-footer.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"attribution\">\n\t&copy; {{ today | date: 'yyyy' }}.\n\t<a href=\"http://3dgenomes.github.io/TADkit/\">TADkit</a> 3D Genome Browser from <a href=\"http://marciuslab.org/\">Marcius Lab</a>.\n\tCode licensed under MIT.\n</span>\n<tk-menu [menulist]=\"legalmenu\"></tk-menu>\n"

/***/ }),

/***/ "./src/app/components/layout/tk-footer.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/layout/tk-footer.component.ts ***!
  \**********************************************************/
/*! exports provided: TkFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkFooterComponent", function() { return TkFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TkFooterComponent = /** @class */ (function () {
    function TkFooterComponent() {
        this.classes = 'footer';
        this.legalmenu = [
            { title: 'Legal', link: 'https://3dgenomes.org/legal' },
            { title: 'Privacy', link: 'https://3dgenomes.org/privacy' },
            { title: 'Cookies', link: 'https://3dgenomes.org/cookies' }
        ];
        this.today = Date.now();
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], TkFooterComponent.prototype, "classes", void 0);
    TkFooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'tk-footer',
            template: __webpack_require__(/*! ./tk-footer.component.html */ "./src/app/components/layout/tk-footer.component.html"),
            styles: [__webpack_require__(/*! ./tk-footer.component.css */ "./src/app/components/layout/tk-footer.component.css")],
        })
    ], TkFooterComponent);
    return TkFooterComponent;
}());



/***/ }),

/***/ "./src/app/components/layout/tk-header.component.css":
/*!***********************************************************!*\
  !*** ./src/app/components/layout/tk-header.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\tbackground: rgb(76,175,80);\n\tcolor: #fff;\n\tfont-size: 1em;\n    padding-left: 0.6em;\n}\n"

/***/ }),

/***/ "./src/app/components/layout/tk-header.component.html":
/*!************************************************************!*\
  !*** ./src/app/components/layout/tk-header.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"logo\">\n\t<a href=\"#\">\n\t<img alt=\"TADkit logo\" src=\"assets/img/tadkit-logo-invert.png\" width=\"100\" height=\"32\"> \n\t</a>\n</h1>\n<tk-menu [menulist]=\"topmenu\"></tk-menu>"

/***/ }),

/***/ "./src/app/components/layout/tk-header.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/layout/tk-header.component.ts ***!
  \**********************************************************/
/*! exports provided: TkHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkHeaderComponent", function() { return TkHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TkHeaderComponent = /** @class */ (function () {
    function TkHeaderComponent() {
        this.classes = 'header';
        this.topmenu = [
            { title: 'About', link: '#' },
            { title: 'Links', link: '#' },
            { title: 'Contact', link: '#' }
        ];
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], TkHeaderComponent.prototype, "classes", void 0);
    TkHeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'tk-header',
            template: __webpack_require__(/*! ./tk-header.component.html */ "./src/app/components/layout/tk-header.component.html"),
            styles: [__webpack_require__(/*! ./tk-header.component.css */ "./src/app/components/layout/tk-header.component.css")]
        })
    ], TkHeaderComponent);
    return TkHeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/layout/tk-layout.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/layout/tk-layout.module.ts ***!
  \*******************************************************/
/*! exports provided: TkLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkLayoutModule", function() { return TkLayoutModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/sidebar */ "./node_modules/primeng/sidebar.js");
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primeng_sidebar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tk_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tk-header.component */ "./src/app/components/layout/tk-header.component.ts");
/* harmony import */ var _tk_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tk-menu.component */ "./src/app/components/layout/tk-menu.component.ts");
/* harmony import */ var _tk_sidebar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tk-sidebar.component */ "./src/app/components/layout/tk-sidebar.component.ts");
/* harmony import */ var _tk_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tk-footer.component */ "./src/app/components/layout/tk-footer.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var TkLayoutModule = /** @class */ (function () {
    function TkLayoutModule() {
    }
    TkLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_2__["ButtonModule"],
                primeng_sidebar__WEBPACK_IMPORTED_MODULE_3__["SidebarModule"]
            ],
            declarations: [
                _tk_header_component__WEBPACK_IMPORTED_MODULE_4__["TkHeaderComponent"],
                _tk_menu_component__WEBPACK_IMPORTED_MODULE_5__["TkMenuComponent"],
                _tk_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["TkSidebarComponent"],
                _tk_footer_component__WEBPACK_IMPORTED_MODULE_7__["TkFooterComponent"]
            ],
            exports: [
                _tk_header_component__WEBPACK_IMPORTED_MODULE_4__["TkHeaderComponent"],
                _tk_menu_component__WEBPACK_IMPORTED_MODULE_5__["TkMenuComponent"],
                _tk_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["TkSidebarComponent"],
                _tk_footer_component__WEBPACK_IMPORTED_MODULE_7__["TkFooterComponent"]
            ]
        })
    ], TkLayoutModule);
    return TkLayoutModule;
}());



/***/ }),

/***/ "./src/app/components/layout/tk-menu.component.css":
/*!*********************************************************!*\
  !*** ./src/app/components/layout/tk-menu.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\na {\n    color: inherit;\n    text-decoration: none;\n}    \na:hover {\n    color: #ccc;\n    text-decoration: none;\n}    \nul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}    \n/* Header Menu */    \n:host-context(.header) li,\n:host-context(.footer) li {\n    float: left;\n    margin-right: 10px;\n}    \n/* Sidebar Menu */    \n:host-context(.sidebar) ul {\n    color: #444;\n}    \n:host-context(.sidebar) li {\n    margin-bottom: 10px;\n}\n"

/***/ }),

/***/ "./src/app/components/layout/tk-menu.component.html":
/*!**********************************************************!*\
  !*** ./src/app/components/layout/tk-menu.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul>\n    <li *ngFor=\"let item of menulist\">\n        <a href=\"{{item.link}}\">{{item.title}}</a>\n    </li>\n</ul>\n"

/***/ }),

/***/ "./src/app/components/layout/tk-menu.component.ts":
/*!********************************************************!*\
  !*** ./src/app/components/layout/tk-menu.component.ts ***!
  \********************************************************/
/*! exports provided: TkMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkMenuComponent", function() { return TkMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TkMenuComponent = /** @class */ (function () {
    function TkMenuComponent() {
        this.classes = 'menu';
        this.menulist = [];
        this.sidemenu = [
            { title: 'Projects', link: '#' },
            { title: 'Resources', link: '#' },
            { title: 'Archives', link: '#' }
        ];
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], TkMenuComponent.prototype, "classes", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], TkMenuComponent.prototype, "menulist", void 0);
    TkMenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'tk-menu',
            template: __webpack_require__(/*! ./tk-menu.component.html */ "./src/app/components/layout/tk-menu.component.html"),
            styles: [__webpack_require__(/*! ./tk-menu.component.css */ "./src/app/components/layout/tk-menu.component.css")]
        })
    ], TkMenuComponent);
    return TkMenuComponent;
}());



/***/ }),

/***/ "./src/app/components/layout/tk-sidebar.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/layout/tk-sidebar.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host ::ng-deep .ui-sidebar-left {\n    top: 50px;\n}\n:host ::ng-deep .ui-widget.ui-button {\n    border: 1px solid #fff;\n    color: #999;\n    background: #fff;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 3px;\n    border-bottom-left-radius: 0px;\n    border-bottom-right-radius: 3px;\n    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.3);\n}\n:host ::ng-deep  .ui-widget.ui-button:enabled:hover {\n    border: 1px solid #ccc;\n    background: #fff;\n    color: #333;\n}\n:host ::ng-deep  .ui-widget.ui-button:enabled:active {\n    border: 1px solid #fff;\n}"

/***/ }),

/***/ "./src/app/components/layout/tk-sidebar.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/layout/tk-sidebar.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p-sidebar [(visible)]=\"display\" [baseZIndex]=\"10000\" styleClass=\"tadkit-sidebar\" >\n    <!--nav tk-menu [menulist]=\"sidemenu\"></nav-->\n    <section>\n        <h3 *ngIf=\"currentProject$ | async as project else loading\">\n            Current Project: {{project.title}}\n            <ng-template #loading>Loading ...</ng-template>\n        </h3>\n            <a href=\"#\"><img class=\"fa fa-edit\" /></a>\n        <div class=\"ui-g\">\n            <div class=\"ui-g-6\">Col1</div>\n            <div class=\"ui-g-6\">Col2</div>\n        </div>\n        <div class=\"ui-g\">\n            <div class=\"ui-g-6\">Col3</div>\n            <div class=\"ui-g-6\">Col4</div>\n        </div>\n        <ul>\n            <li>Link to Section</li>\n            <li>Link to Area</li>\n            <li>Link to View</li>\n        </ul>\n    </section>\n    <button pButton type=\"button\" (click)=\"display = false\" label=\"Save\" class=\"ui-button-success\"></button>\n    <button pButton type=\"button\" (click)=\"display = false\" label=\"Cancel\" class=\"ui-button-secondary\"></button>\n</p-sidebar>\n<button type=\"text\" (click)=\"display = true\" pButton icon=\"fa-angle-double-right\"></button>"

/***/ }),

/***/ "./src/app/components/layout/tk-sidebar.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/layout/tk-sidebar.component.ts ***!
  \***********************************************************/
/*! exports provided: TkSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkSidebarComponent", function() { return TkSidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_tk_projects_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/tk-projects.service */ "./src/app/services/tk-projects.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TkSidebarComponent = /** @class */ (function () {
    function TkSidebarComponent(tkProjectsService) {
        this.tkProjectsService = tkProjectsService;
        this.classes = 'sidebar';
        this.sidemenu = [
            { title: 'Projects', link: '#' },
            { title: 'Resources', link: '#' },
            { title: 'Archives', link: '#' }
        ];
    }
    TkSidebarComponent.prototype.ngOnInit = function () {
        this.getProject();
    };
    TkSidebarComponent.prototype.ngOnDestroy = function () {
    };
    TkSidebarComponent.prototype.getProject = function () {
        console.log('<Sidebar> Getting current project...');
        this.currentProject$ = this.tkProjectsService.getCurrentProject();
        this.currentProject$.subscribe(function (prj) { return console.log('<sidebar> Returning currentProject$: ', prj.title); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], TkSidebarComponent.prototype, "classes", void 0);
    TkSidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'tk-sidebar',
            template: __webpack_require__(/*! ./tk-sidebar.component.html */ "./src/app/components/layout/tk-sidebar.component.html"),
            styles: [__webpack_require__(/*! ./tk-sidebar.component.css */ "./src/app/components/layout/tk-sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_tk_projects_service__WEBPACK_IMPORTED_MODULE_1__["TkProjectsService"]])
    ], TkSidebarComponent);
    return TkSidebarComponent;
}());



/***/ }),

/***/ "./src/app/components/main/tk-main.component.html":
/*!********************************************************!*\
  !*** ./src/app/components/main/tk-main.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>Main Content</h2>\n<table>\n    <tr *ngIf=\"!currentProject$\">\n        <td>No Current Project</td>\n    </tr>\n    <tr *ngIf=\"currentProject$ | async as project else loading\">\n        <td>Project: {{project.title}}</td>\n    </tr>\n    <ng-template #loading><tr>Loading ...</tr></ng-template> \n    <!-- If currentProject$ is an Array: -->\n    <!-- <tr *ngFor='let project of currentProject$ | async'>\n        <td>{{ project.title }}</td>\n    </tr> -->\n</table>  \n<p-button label=\"Click\"></p-button>\n"

/***/ }),

/***/ "./src/app/components/main/tk-main.component.ts":
/*!******************************************************!*\
  !*** ./src/app/components/main/tk-main.component.ts ***!
  \******************************************************/
/*! exports provided: TkMainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkMainComponent", function() { return TkMainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_tk_projects_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/tk-projects.service */ "./src/app/services/tk-projects.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TkMainComponent = /** @class */ (function () {
    function TkMainComponent(tkProjectsService) {
        this.tkProjectsService = tkProjectsService;
        this.classes = 'main';
    }
    TkMainComponent.prototype.ngOnInit = function () {
        this.getProject();
    };
    TkMainComponent.prototype.ngOnDestroy = function () {
    };
    TkMainComponent.prototype.getProject = function () {
        // console.log('<Main> Getting current project...');
        this.currentProject$ = this.tkProjectsService.getCurrentProject();
        // this.currentProject$.subscribe(prj => console.log('<main> Returning currentProject$: ', prj.title));
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], TkMainComponent.prototype, "classes", void 0);
    TkMainComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'tk-main',
            template: __webpack_require__(/*! ./tk-main.component.html */ "./src/app/components/main/tk-main.component.html")
        }),
        __metadata("design:paramtypes", [_services_tk_projects_service__WEBPACK_IMPORTED_MODULE_1__["TkProjectsService"]])
    ], TkMainComponent);
    return TkMainComponent;
}());



/***/ }),

/***/ "./src/app/components/main/tk-main.module.ts":
/*!***************************************************!*\
  !*** ./src/app/components/main/tk-main.module.ts ***!
  \***************************************************/
/*! exports provided: TkMainModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkMainModule", function() { return TkMainModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/button */ "./node_modules/primeng/button.js");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primeng_button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tk_main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tk-main.component */ "./src/app/components/main/tk-main.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { RouterModule } from '@angular/router';
// import { TkPrimeModule } from './tk-prime.module';


// const homeRouting: ModuleWithProviders = RouterModule.forChild([
//   {
//     path: '',
//     component: TkMainComponent
//   }
// ]);
var TkMainModule = /** @class */ (function () {
    function TkMainModule() {
    }
    TkMainModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                primeng_button__WEBPACK_IMPORTED_MODULE_2__["ButtonModule"],
            ],
            declarations: [
                _tk_main_component__WEBPACK_IMPORTED_MODULE_3__["TkMainComponent"]
            ],
            exports: [
                _tk_main_component__WEBPACK_IMPORTED_MODULE_3__["TkMainComponent"]
            ],
            providers: []
        })
    ], TkMainModule);
    return TkMainModule;
}());



/***/ }),

/***/ "./src/app/services/tk-projects.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/tk-projects.service.ts ***!
  \*************************************************/
/*! exports provided: TkProjectsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TkProjectsService", function() { return TkProjectsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TkProjectsService = /** @class */ (function () {
    function TkProjectsService(httpClient) {
        this.httpClient = httpClient;
        this.currentProjectIndex = 0;
        // private extUrl = 'http://rest.ensemblgenomes.org/info/ping?content-type=application/json';
        this.defaultProject = 'assets/defaults/tk-defaults-project.json';
    }
    // private setCurrentProject(projectIndex) {
    //   this.currentProjectIndex = projectIndex;
    //   this.currentProject = this.projects$[this.currentProjectIndex];
    //   console.log('Current project: ', this.currentProject.title);
    // }
    TkProjectsService.prototype.getProject = function () {
        console.log('Loading default projects...');
        return this.httpClient.get(this.defaultProject);
    };
    TkProjectsService.prototype.loadDefaultProject = function () {
        console.log('Loading default projects...');
        this.currentProject$ = this.httpClient.get(this.defaultProject);
        return this.currentProject$;
    };
    TkProjectsService.prototype.getCurrentProject = function () {
        this.loadDefaultProject();
        // this.currentProject$.subscribe(prj => console.log('Returning currentProject$: ', prj.title));
        return this.currentProject$;
    };
    TkProjectsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TkProjectsService);
    return TkProjectsService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_tadkit_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app-tadkit.module */ "./src/app/app-tadkit.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_tadkit_module__WEBPACK_IMPORTED_MODULE_2__["AppTadkitModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Mike/GitHub/TADkit-a2/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map