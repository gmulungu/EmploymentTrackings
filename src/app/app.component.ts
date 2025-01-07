import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  EmployeeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-time-tracking';
}
