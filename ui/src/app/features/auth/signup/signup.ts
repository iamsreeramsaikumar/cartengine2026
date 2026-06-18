import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { SignupForm } from '../../../models/signup.model';
import { email, form, required, FormField, validate } from '@angular/forms/signals';
import { AuthService } from '../../../services/auth.service';
import { ToasterService } from '../../../services/toasterService';

@Component({
  selector: 'app-signup',
  imports: [FormField, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupPage {
  router = inject(Router);
  authService = inject(AuthService);
  toasterService = inject(ToasterService);
  singupModel = signal<SignupForm>({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  signupForm = form(this.singupModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email address' });
    required(path.name, { message: 'Name is required' });
    required(path.password, { message: 'Password is required' });
    required(path.confirmPassword, { message: 'Confirm Password is required' });
    validate(path.confirmPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(path.password)) {
        return { kind: 'error', message: 'Passwords do not match ' }
      }
      return null;
    })
  });

  passwordMatch = computed(() => {
    const password = this.singupModel().password;
    const confirmPassword = this.singupModel().confirmPassword;
    return password && confirmPassword && password === confirmPassword;
  })

  signup() {
    if (this.signupForm().invalid()) {
      return;
    }

    this.authService.signup(this.singupModel()).subscribe({
      next: (res: any) => {
        this.toasterService.show(res.message, 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toasterService.show(error.error.message, 'danger');
      }
    });

  }

}
