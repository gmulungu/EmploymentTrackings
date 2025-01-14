import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [FormsModule,CommonModule,RouterModule],
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    employeeNo: 0,
    firstName: '',
    lastName: '',
    position: '',
    cellPhoneNumber: '',
    isManager: false,
    passwordHash: '',
    username:'',
    isDisabled: true,

  };

  isEditMode = false;
  errorMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if for example I pass EmployeeNo in the route
    const employeeNo = this.route.snapshot.params['employeeNo'];

    if (!employeeNo) {
      this.errorMessage = 'Employee ID is missing. Redirecting to the employee list...';

      return;
    }

    if (employeeNo) {
      this.isEditMode = true;

      this.employeeService.getEmployee(employeeNo).subscribe(
        (found) => {
          if (found) {
            this.employee = found;
          } else {
            this.errorMessage = 'Employee not found.';
          }
        },
        (error) => {
          console.error('Error fetching employee:', error);
          this.errorMessage = 'An error occurred while fetching employee data.';
        }
      );
    }
  }


  submitForm(): void {
    // Reset the error message before attempting the submission
    this.errorMessage = null;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.employeeNo, this.employee).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);

          // Error handling
          this.errorMessage = 'Failed to update employee. Please try again later.';

          if (error?.error?.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    } else {
      const { employeeNo, ...newEmployee } = this.employee;
      this.employeeService.addEmployee(newEmployee as Employee).subscribe(
        () => {
          console.log('Employee created successfully');
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error creating employee:', error);

          // Error handling
          this.errorMessage = 'Failed to create employee. Please try again later.';

          if (error?.error?.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    }
  }


  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
