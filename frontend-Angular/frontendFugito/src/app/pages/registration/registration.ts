import { Component } from '@angular/core';
import { RegisterForm } from "../../features/auth/register.form/register.form";

@Component({
  selector: 'app-registration',
  imports: [RegisterForm],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

}
