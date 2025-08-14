import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';

export const routes: Routes = [
{
  path: 'auth',
  loadChildren:  () => 

     loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './AuthRoutes',
            remoteName: 'login_app',

    }).then(m => m.AuthRoutesModule)
  ,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
