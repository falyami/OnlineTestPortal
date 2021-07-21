import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // Declare Properties, Objects, & Arrays
  users: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    // Get Data from Database 
    this.users = this.firebase.list('users');
  }

  // Method to Retreive List of Users
  getUsers(): any {
    return this.users.snapshotChanges();
  }
}