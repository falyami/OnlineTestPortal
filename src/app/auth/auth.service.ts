import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Declare Properties, Objects, & Arrays
  users: AngularFireList<any>;
  usersList: IUser[] = [];
  user: IUser = {
    username: null,
    password: null,
    fullname: null,
    type: null,
    email: null,
    mobile: null
  };

  constructor(private firebase: AngularFireDatabase, private router: Router) {
    // Fetch users from Database into users AngularFireList 
    this.users = this.firebase.list('users');
  }

  // Method to Authenticate User
  login(username: string, password: string, type: string) {
    // Retreive users
    this.users.snapshotChanges().subscribe(list => {
      this.usersList = [];
      this.usersList = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      // Find User by USername, Password, & Type
      this.user = this.usersList.find(user => (user.username == username.trim() && user.password == password.trim() && user.type == type.trim()));
      // Create Local Storages & Identify User Privileges in System
      if (this.user) {
        localStorage.setItem('state', 'true');
        localStorage.setItem('username', this.user.username);
        localStorage.setItem('fullname', this.user.fullname);
        localStorage.setItem('type', this.user.type);
        if (this.user.type === 'admin') {
          this.router.navigate(['results']);
        } else {
          this.router.navigate(['exam']);
        }
      } else {
        localStorage.setItem('state', 'false');
        localStorage.setItem('username', null);
        localStorage.setItem('fullname', null);
        localStorage.setItem('type', null);
      }
    });
  }

  // Property to Hold Login State
  get isLoggedIn(): boolean {
    const state = localStorage.getItem('state');
    if (state !== null && JSON.parse(state) === true){
      return true
    } else if (state !== null && JSON.parse(state) === false) {
      return false;
    } else {
      return null;
    }
  }

  // Method to Get User Type or Role in System
  getRole(): string {
    const type = localStorage.getItem('type');
    return type;
  }

  // Method to Get Username
  getUsername(): string {
    const username = localStorage.getItem('username');
    return username;
  }

  // Method to Get Fullname
  getFullname(): string {
    const name = localStorage.getItem('fullname');
    return name;
  }

  // Method to Clear Local Storages & Logout
  logOut() {
    localStorage.removeItem('state');
    localStorage.removeItem('username');
    localStorage.removeItem('fullname');
    localStorage.removeItem('type');
    this.router.navigate(['home']);
  }
}