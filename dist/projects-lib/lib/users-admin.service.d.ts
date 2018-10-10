import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
export declare class UsersAdminService {
    private httpClient;
    defaultUser: string;
    currentUser: Observable<User>;
    constructor(httpClient: HttpClient);
    loadDefaultUser(): Observable<User>;
    getCurrentUser(): Observable<User>;
}
