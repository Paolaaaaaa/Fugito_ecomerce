import { Component } from '@angular/core';
import { FormLogin } from "../../components/form-login/form-login";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './Login.html',
  standalone:true,
  imports: [FormLogin, CommonModule]
})
export default class Login {



}
