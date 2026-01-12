import { Component } from '@angular/core';
import { LoginForm } from '../../features/auth/login.form/login.form';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [LoginForm, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  null:any;

}

