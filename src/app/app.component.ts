import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) { }

  // Method to Logout
  logOut(): void {
    // Call logOut() Method to Logout System
    this.authService.logOut();
  };
}
