import { Component, inject, signal } from '@angular/core';
import { LoginForm } from '../../../models/login.model';
import { email, form, required, FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {

  router = inject(Router);
  loginModel = signal<LoginForm>({
    email: '',
    password: ''
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email address' });
    required(path.password, { message: 'Password is required' });
  });

  login() {

    if (this.loginForm().invalid()) {
      return;
    }

    this.router.navigate(['/dashboard']);

    console.log('Login form submitted', this.loginModel());
  }
}
