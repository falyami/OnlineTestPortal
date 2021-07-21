import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // Declare Properties
  form: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, public authService: AuthService) {
    // Create Form Group
    this.form = this.formBuilder.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        type: [null, [Validators.required]]
      }
    );
  }

  ngOnInit(): void { }

  // Method to Validate Form & Authenticate User
  onSubmit() {
    // Assign Values to Variables
    this.submitted = true;
    // Validate Form Entires
    if (this.form.invalid) {
      return;
    }
    // Call login() Method to Check User Authentication
    this.authService.login(this.form.get('username').value, this.form.get('password').value, this.form.get('type').value);
  }
}