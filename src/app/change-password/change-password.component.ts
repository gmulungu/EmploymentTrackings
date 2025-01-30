import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {EmployeeService} from '../services/employee.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    const employeeNo = localStorage.getItem('employeeNo');
    console.log('Retrieved employeeNo on Init:', employeeNo); // Debugging
    if (!employeeNo) {
      this.errorMessage = 'No employee number found. Please log in again.';
      return;
    }
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const employeeNo = localStorage.getItem('employeeNo');

    if (!employeeNo) {
      this.errorMessage = 'Employee number is required. Please log in again.';
      console.error('Error: No employee number found in localStorage.');
      return;
    }

    this.employeeService.changePassword(employeeNo, this.newPassword).subscribe(
      () => {
        console.log('Password changed successfully');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Error changing password: ' + (error.error?.message || error.message);
        console.error('Error changing password:', error);
      }
    );
  }
}
