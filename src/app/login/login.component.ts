import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  employeeNo: number | null = null;
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (!this.employeeNo) {
      this.errorMessage = 'Employee number is required';
      return;
    }

    this.authService.login(this.employeeNo, this.password).subscribe(
      (response) => {
        if (response?.message === 'Login successful') {
          if (response.employee && response.employee.employeeNo) {
            localStorage.setItem('employeeNo', response.employee.employeeNo.toString());
            console.log('Stored employeeNo:', localStorage.getItem('employeeNo'));
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error: Employee number is missing in the response.');
            this.errorMessage = 'Error: employee number is missing.';
          }
        } else if (response?.message === 'Please change your password.') {

          this.router.navigate(['/change-password']);
        } else {
          this.errorMessage = 'There was an issue with your login.';
        }
      },
      (error) => {
        if (error.status === 400) {
          // Handle bad request, possibly invalid credentials
          this.errorMessage = 'Invalid employee number or password. Please try again.';
        } else if (error.status === 401) {
          // Unauthorized error
          this.errorMessage = 'Unauthorized: Incorrect employee number or password.';
        } else if (error.status === 404) {
          // Not Found
          this.errorMessage = 'Server not found. Please try again later.';
        } else if (error.status === 500) {
          // Internal Server Error
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          // Handle other unexpcted errors
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }

        console.error('Login error:', error);
      }
    );
  }
}
