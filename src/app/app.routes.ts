import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

