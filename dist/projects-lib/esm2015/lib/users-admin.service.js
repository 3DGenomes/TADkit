/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UsersAdminService {
    //   public currentUserIndex = 0;
    /**
     * @param {?} httpClient
     */
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.defaultUser = 'assets/defaults/tk-default-user.json';
    }
    //   private setUserProject(userIndex) {
    //     this.currentUserIndex = userIndex;
    //     this.currentUser = this.users[this.currentUserIndex];
    //     this.currentUser.subscribe(usr => console.log('Set current user: ', usr.fullname));
    //   }
    /**
     * @return {?}
     */
    loadDefaultUser() {
        console.log('Loading default user...');
        return this.currentUser = this.httpClient.get(this.defaultUser);
    }
    /**
     * @return {?}
     */
    getCurrentUser() {
        // this.currentUser.subscribe(usr => console.log('Returning current user: ', usr.title));
        return this.currentUser;
    }
}
UsersAdminService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
UsersAdminService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ UsersAdminService.ngInjectableDef = i0.defineInjectable({ factory: function UsersAdminService_Factory() { return new UsersAdminService(i0.inject(i1.HttpClient)); }, token: UsersAdminService, providedIn: "root" });
if (false) {
    /** @type {?} */
    UsersAdminService.prototype.defaultUser;
    /** @type {?} */
    UsersAdminService.prototype.currentUser;
    /** @type {?} */
    UsersAdminService.prototype.httpClient;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtYWRtaW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Byb2plY3RzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi91c2Vycy1hZG1pbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBUWxELE1BQU07Ozs7O0lBTUosWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLHNDQUFzQyxDQUFDO0lBQzVELENBQUM7Ozs7Ozs7OztJQVFNLGVBQWU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVNLGNBQWM7UUFDbkIseUZBQXlGO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7WUE1QkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFOUSxVQUFVOzs7OztJQVNmLHdDQUFvQjs7SUFFdEIsd0NBQXFDOztJQUd6Qix1Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlciwgVXNlcnMgfSBmcm9tICcuL21vZGVscy91c2VyLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuXG5leHBvcnQgY2xhc3MgVXNlcnNBZG1pblNlcnZpY2Uge1xuICAgIGRlZmF1bHRVc2VyOiBzdHJpbmc7XG4vLyAgIHByaXZhdGUgdXNlcnM6IFVzZXJzO1xuICBwdWJsaWMgY3VycmVudFVzZXI6IE9ic2VydmFibGU8VXNlcj47XG4vLyAgIHB1YmxpYyBjdXJyZW50VXNlckluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICB0aGlzLmRlZmF1bHRVc2VyID0gJ2Fzc2V0cy9kZWZhdWx0cy90ay1kZWZhdWx0LXVzZXIuanNvbic7XG4gIH1cblxuLy8gICBwcml2YXRlIHNldFVzZXJQcm9qZWN0KHVzZXJJbmRleCkge1xuLy8gICAgIHRoaXMuY3VycmVudFVzZXJJbmRleCA9IHVzZXJJbmRleDtcbi8vICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy51c2Vyc1t0aGlzLmN1cnJlbnRVc2VySW5kZXhdO1xuLy8gICAgIHRoaXMuY3VycmVudFVzZXIuc3Vic2NyaWJlKHVzciA9PiBjb25zb2xlLmxvZygnU2V0IGN1cnJlbnQgdXNlcjogJywgdXNyLmZ1bGxuYW1lKSk7XG4vLyAgIH1cblxuICBwdWJsaWMgbG9hZERlZmF1bHRVc2VyKCk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIGNvbnNvbGUubG9nKCdMb2FkaW5nIGRlZmF1bHQgdXNlci4uLicpO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy5odHRwQ2xpZW50LmdldDxVc2VyPih0aGlzLmRlZmF1bHRVc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50VXNlcigpOiBPYnNlcnZhYmxlPFVzZXI+ICB7XG4gICAgLy8gdGhpcy5jdXJyZW50VXNlci5zdWJzY3JpYmUodXNyID0+IGNvbnNvbGUubG9nKCdSZXR1cm5pbmcgY3VycmVudCB1c2VyOiAnLCB1c3IudGl0bGUpKTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlcjtcbiAgfVxuXG59XG4iXX0=