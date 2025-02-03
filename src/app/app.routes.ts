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

//temporary adding employees routing:

//
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// // import {EmployeeFormComponent} from './components/employee-form/employee-form.component';
// import {EmployeeListComponent} from './components/employee-list/employee-list.component';
// import {EmployeeFormComponent} from './components/employee-form/employee-form.component';
//
//
// export const routes: Routes = [
//   { path: 'employees/add', component: EmployeeFormComponent },
//   { path: 'employees', component: EmployeeListComponent },
//   { path: 'employees/edit/:employeeNo', component: EmployeeFormComponent },
//   { path: '', redirectTo: '/employees', pathMatch: 'full' },
//
//
// ];
//
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }
