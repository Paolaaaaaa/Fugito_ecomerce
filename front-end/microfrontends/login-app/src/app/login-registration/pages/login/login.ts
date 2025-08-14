import { Component } from '@angular/core';
import { FormLogin } from "../../components/form-login/form-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone:true,
  imports: [FormLogin]
})
export class Login {



}
