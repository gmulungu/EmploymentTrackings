import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  employeeNo: number | null = null; // Store employee number

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve employee number from local storage
    const storedEmployeeNo = localStorage.getItem('employeeNo');
    console.log('Retrieved employeeNo from localStorage:', storedEmployeeNo);

    if (storedEmployeeNo) {
      this.employeeNo = parseInt(storedEmployeeNo, 10);
      console.log('EmployeeNo after parsing:', this.employeeNo);


      this.employeeService.getEmployee(this.employeeNo).subscribe(
        (employee) => {
          console.log('Employee data:', employee);
        },
        (error) => {
          console.error('Error fetching employee:', error);
        }
      );
    } else {
      this.errorMessage = 'Employee number is missing. Please log in again.';
      console.log(this.errorMessage);
    }
  }

  changePassword(): void {
    if (!this.employeeNo) {
      this.errorMessage = 'Employee number is missing.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    }

    this.employeeService.changePassword(this.employeeNo, this.newPassword).subscribe(
      () => {
        alert('Password changed successfully!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Failed to change password.';
        console.error('Change password error:', error);
      }
    );
  }
}
