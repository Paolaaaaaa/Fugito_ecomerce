import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from '../service/auth-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.form.html',
  styleUrl: './login.form.css',
  standalone: true
})
export class LoginForm {
  loading = false;
  errorMessage: string | null = null;
  error= false;

  formLogin = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private api: AuthApiService, private auth: AuthService, private router: Router) {

  }
  submit() {
    if (this.formLogin.invalid) return;
    this.loading = true;
    this.errorMessage = null;

    this.api.login(this.formLogin.getRawValue()).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.loading = false;
        this.router.navigateByUrl('/app/products');
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 400 || error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'Unexpected error. Please try again later.';
        }
      },
    });
  }
}
