import { Component, inject, signal } from '@angular/core';
import { LoginForm } from '../../../models/login.model';
import { email, form, required, FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToasterService } from '../../../services/toasterService';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {

  router = inject(Router);
  authService = inject(AuthService);
  toasterService = inject(ToasterService)
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

    this.authService.login(this.loginModel()).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.toasterService.show(res.message, 'success');
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.toasterService.show(error.error.message, 'danger');
      }
    })


    console.log('Login form submitted', this.loginModel());
  }
}
