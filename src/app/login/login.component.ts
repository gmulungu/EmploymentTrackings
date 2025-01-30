import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response?.message === 'Login successful') {
          if (response.Employee && response.Employee.employeeNo) {
            localStorage.setItem('employeeNo', response.Employee.employeeNo.toString());
            console.log('Stored employeeNo:', localStorage.getItem('employeeNo'));
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error: Employee number is missing in the response.');
            this.errorMessage = 'Login successful, but employee number is missing.';
          }
        } else if (response?.message === 'Please change your password.') {
          if (response.Employee && response.Employee.employeeNo) {
            localStorage.setItem('employeeNo', response.Employee.employeeNo.toString());
            console.log('Stored employeeNo:', localStorage.getItem('employeeNo'));
          }
          this.router.navigate(['/change-password']);
        } else {
          this.errorMessage = 'Unexpected response format';
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      }
    );
  }
}
