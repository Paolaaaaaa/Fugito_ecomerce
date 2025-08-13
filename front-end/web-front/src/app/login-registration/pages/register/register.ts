import { Component } from '@angular/core';
import { FormRegister } from "../../components/form-register/form-register";

@Component({
  selector: 'app-register',
  imports: [FormRegister],
  templateUrl: './register.html',
  standalone:true

})
export class Register {

}
