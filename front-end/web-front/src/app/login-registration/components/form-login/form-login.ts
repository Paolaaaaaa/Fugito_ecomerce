import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  imports: [],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css'
})
export class FormLogin {
  email = new FormControl('');
  password = new FormControl('');
  checkPassword = new FormControl('');


}
