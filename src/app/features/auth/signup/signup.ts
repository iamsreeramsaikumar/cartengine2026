import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { SignupForm } from '../../../models/signup.model';
import { email, form, required, FormField, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupPage {
  router = inject(Router);
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

    console.log('Signup form submitted', this.singupModel());

    this.router.navigate(['/login']);
  }

}
