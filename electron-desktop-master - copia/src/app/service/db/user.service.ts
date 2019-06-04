import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRootListRef = this.db.list<User>('user-root-list');

  constructor(private db: AngularFireDatabase) { }

  addUserRoot(email: string) {
    return this.userRootListRef.push(this.getUser(email));
  }
  findByEmail(email: string) {
    return this.db.list('/user-root-list', ref => ref.orderByChild('email').equalTo(email));
  }
   private getUser(email: string): any {
    return {
      email: email
    };
  }
}
