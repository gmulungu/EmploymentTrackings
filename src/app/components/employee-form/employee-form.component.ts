import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
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
    username: '',
    isDisabled: true,
    PlainPassword: '',
    isFirstLogin: true,
    managerId: null,

  };

  isEditMode = false;
  errorMessage: string | null = null;
  employees: Employee[] = []; // To hold list of employees for manager selection
  // managers: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetching list of employees for the manager dropdown
    this.employeeService.getEmployees().subscribe(
      (allEmployees) => {
        this.employees = allEmployees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.errorMessage = 'An error occurred while fetching employees for manager selection.';
      }
    );



    // Fetch the employee details if in edit mode
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

  validateForm(): boolean {
    if (!this.employee.firstName.trim()) {
      this.errorMessage = 'First name is required.';
      return false;
    }

    if (!this.employee.lastName.trim()) {
      this.errorMessage = 'Last name is required.';
      return false;
    }

    if (!this.employee.position.trim()) {
      this.errorMessage = 'Position is required.';
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.employee.cellPhoneNumber)) {
      this.errorMessage = 'Cell phone number must be a 10-digit number.';
      return false;
    }

    if (!this.employee.username.trim()) {
      this.errorMessage = 'Username is required.';
      return false;
    }

    return true;
  }

  submitForm(): void {
    // Reset error message
    this.errorMessage = null;

    let payload: Employee;

    // Handle PlainPassword logic
    if (this.isEditMode) {
      // Exclude PlainPassword for update
      const { PlainPassword, ...updatedEmployee } = this.employee;
      payload = updatedEmployee as Employee;
    } else {
      if (!this.employee.PlainPassword) {
        this.employee.PlainPassword = this.generateRandomPassword();
      }
      payload = this.employee;
    }

    // Determine whether to call the update or create service
    const serviceCall = this.isEditMode
      ? this.employeeService.updateEmployee(this.employee.employeeNo, payload)
      : this.employeeService.addEmployee(this.employee as Employee);

    serviceCall.subscribe(
      () => {
        console.log(`${this.isEditMode ? 'Employee updated' : 'Employee created'} successfully`);
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} employee:`, error);

        this.errorMessage = `Failed to ${this.isEditMode ? 'update' : 'create'} employee. Please try again later.`;

        if (error?.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    );
  }

  generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
