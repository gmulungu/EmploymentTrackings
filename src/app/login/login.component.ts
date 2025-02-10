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

  // Inside LoginComponent
  login(): void {
    if (!this.employeeNo) {
      this.errorMessage = 'Employee number is required';
      return;
    }

    this.authService.login(this.employeeNo, this.password).subscribe(
      (response) => {
        console.log(response.employee.employeeNo);
        if (response?.message === 'Login successful') {

          if (response.employee.employeeNo) {

            console.log('Attempting to store employeeNo:', response.employee.employeeNo);


            console.log(response)
            localStorage.setItem('employeeNo', response.employee.employeeNo.toString());


            console.log('Stored employeeNo:', localStorage.getItem(response.employee.employeeNo));

            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error: Employee number is missing in the response.');

            if (response.status === 400) {
              this.errorMessage = 'Invalid employee number or password. Please try again.';
            } else if (response.status === 404) {
              this.errorMessage = 'Employee not found. Please check your details.';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
          }

        } else if (response?.message === 'Please change your password.') {
          console.log('Response indicating password change required:', response);
          console.log(response.employeeNo);

          if (response.employee.employeeNo) {
            console.log('Storing employeeNo for password change:', response.employee.employeeNo);
            localStorage.setItem('employeeNo', response.employee.employeeNo.toString());
          }

          this.router.navigate(['/change-password']);
        } else {
          this.errorMessage = 'Something went wrong. Please try again or contact geurschomsupport.com.';
          console.error('Unexpected response:', response);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid employee number or password';
        console.error('Login error:', error);
      }
    );
  }
}
