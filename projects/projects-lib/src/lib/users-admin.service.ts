import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Users } from './models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UsersAdminService {
    defaultUser: string;
//   private users: Users;
  public currentUser: Observable<User>;
//   public currentUserIndex = 0;

  constructor(private httpClient: HttpClient) {
    this.defaultUser = 'assets/defaults/tk-default-user.json';
  }

//   private setUserProject(userIndex) {
//     this.currentUserIndex = userIndex;
//     this.currentUser = this.users[this.currentUserIndex];
//     this.currentUser.subscribe(usr => console.log('Set current user: ', usr.fullname));
//   }

  public loadDefaultUser(): Observable<User> {
    console.log('Loading default user...');
    return this.currentUser = this.httpClient.get<User>(this.defaultUser);
  }

  public getCurrentUser(): Observable<User>  {
    // this.currentUser.subscribe(usr => console.log('Returning current user: ', usr.title));
    return this.currentUser;
  }

}
