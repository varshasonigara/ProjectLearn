import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
