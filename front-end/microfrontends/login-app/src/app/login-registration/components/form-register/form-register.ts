import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.html',
  standalone: true
})
export class FormRegister {

    email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(6), 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)

  ]);
  Password_check = new FormControl('',)


  constructor(private authservice:AuthService, private router:Router){}

  submit():void{
    if(this.password.value !== this.Password_check.value){
      console.error('Passwords do not match');
      return;
    }

    const userData ={
      email: this.email.value || '',
      password: this.password.value || '',
      role:"CLIENT"
    }

    this.authservice.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }


}
