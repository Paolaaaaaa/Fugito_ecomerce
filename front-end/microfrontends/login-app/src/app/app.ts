import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import Login from './login-registration/pages/login/Login';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Login],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('login-app');
}
