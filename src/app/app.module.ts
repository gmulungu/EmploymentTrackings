import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Required for API calls
import { RouterModule } from '@angular/router';  // Required for routing

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    HeaderComponent,
    EmployeeListComponent,
    SidebarComponent,
    EmployeeFormComponent,
    // Add routing
  ],
  providers: [],

})
export class AppModule { }
