import { bootstrapApplication } from "@angular/platform-browser";
import Login from "../login-registration/pages/login/Login";

export async function mountLogin(element:HTMLElement){
      console.log('mountLogin llamado en remoto'); // para verificar

    element.innerHTML = '';

        const loginElement = document.createElement('app-login');
    element.appendChild(loginElement);

        
    await bootstrapApplication(Login);


}