/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
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
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    UsersAdminService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ UsersAdminService.ngInjectableDef = i0.defineInjectable({ factory: function UsersAdminService_Factory() { return new UsersAdminService(i0.inject(i1.HttpClient)); }, token: UsersAdminService, providedIn: "root" });
    return UsersAdminService;
}());
export { UsersAdminService };
if (false) {
    /** @type {?} */
    UsersAdminService.prototype.defaultUser;
    /** @type {?} */
    UsersAdminService.prototype.currentUser;
    /** @type {?} */
    UsersAdminService.prototype.httpClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtYWRtaW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Byb2plY3RzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi91c2Vycy1hZG1pbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSWxEO0lBUUEsaUNBQWlDO0lBRS9CLDJCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsc0NBQXNDLENBQUM7SUFDNUQsQ0FBQztJQUVILHdDQUF3QztJQUN4Qyx5Q0FBeUM7SUFDekMsNERBQTREO0lBQzVELDBGQUEwRjtJQUMxRixNQUFNOzs7Ozs7Ozs7SUFFRywyQ0FBZTs7Ozs7Ozs7O0lBQXRCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVNLDBDQUFjOzs7SUFBckI7UUFDRSx5RkFBeUY7UUFDekYsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7O2dCQTVCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Z0JBTlEsVUFBVTs7OzRCQURuQjtDQW1DQyxBQTlCRCxJQThCQztTQTFCWSxpQkFBaUI7OztJQUMxQix3Q0FBb0I7O0lBRXRCLHdDQUFxQzs7SUFHekIsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXIsIFVzZXJzIH0gZnJvbSAnLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJzQWRtaW5TZXJ2aWNlIHtcbiAgICBkZWZhdWx0VXNlcjogc3RyaW5nO1xuLy8gICBwcml2YXRlIHVzZXJzOiBVc2VycztcbiAgcHVibGljIGN1cnJlbnRVc2VyOiBPYnNlcnZhYmxlPFVzZXI+O1xuLy8gICBwdWJsaWMgY3VycmVudFVzZXJJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy5kZWZhdWx0VXNlciA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC11c2VyLmpzb24nO1xuICB9XG5cbi8vICAgcHJpdmF0ZSBzZXRVc2VyUHJvamVjdCh1c2VySW5kZXgpIHtcbi8vICAgICB0aGlzLmN1cnJlbnRVc2VySW5kZXggPSB1c2VySW5kZXg7XG4vLyAgICAgdGhpcy5jdXJyZW50VXNlciA9IHRoaXMudXNlcnNbdGhpcy5jdXJyZW50VXNlckluZGV4XTtcbi8vICAgICB0aGlzLmN1cnJlbnRVc2VyLnN1YnNjcmliZSh1c3IgPT4gY29uc29sZS5sb2coJ1NldCBjdXJyZW50IHVzZXI6ICcsIHVzci5mdWxsbmFtZSkpO1xuLy8gICB9XG5cbiAgcHVibGljIGxvYWREZWZhdWx0VXNlcigpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICBjb25zb2xlLmxvZygnTG9hZGluZyBkZWZhdWx0IHVzZXIuLi4nKTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlciA9IHRoaXMuaHR0cENsaWVudC5nZXQ8VXNlcj4odGhpcy5kZWZhdWx0VXNlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudFVzZXIoKTogT2JzZXJ2YWJsZTxVc2VyPiAge1xuICAgIC8vIHRoaXMuY3VycmVudFVzZXIuc3Vic2NyaWJlKHVzciA9PiBjb25zb2xlLmxvZygnUmV0dXJuaW5nIGN1cnJlbnQgdXNlcjogJywgdXNyLnRpdGxlKSk7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXI7XG4gIH1cblxufVxuIl19