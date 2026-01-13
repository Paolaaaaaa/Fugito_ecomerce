import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../service/auth-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.form.html',
  styleUrl: './register.form.css',
  standalone:true
})
export class RegisterForm {

  loading = false;
  errorMessage: string | null = null;
  error = false;
  // Use a real RegExp so Validators.pattern evaluates correctly.
  REGEX_STR_PASS = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  formRegistration= new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.REGEX_STR_PASS)],
    }),
    role: new FormControl('Client', { nonNullable: true })

  });

  constructor(private api:AuthApiService, private auth:AuthService, private router: Router ){}

  submit(){
    if(this.formRegistration.invalid) return; 

    this.loading = true;
    this.errorMessage = null;

    this.api.register(this.formRegistration.getRawValue()).subscribe({
      next: (res)=>{
        this.auth.setToken(res.token);
        this.loading = false;
        this.router.navigateByUrl('/app/products');
      },
      error:(err) =>{
        this.loading = false;
        if( err.status===400 || err.status === 401){
          this.errorMessage = 'Invalid email or password';
        }else{
          this.errorMessage = 'Unexpected error. Please try again later.';
        }
      }
    })

  }

}
