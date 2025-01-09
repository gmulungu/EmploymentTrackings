import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [FormsModule],
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
  };

  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Assuming you pass EmployeeNo in the route
    const employeeNo = this.route.snapshot.params['employeeNo'];
    if (employeeNo) {
      this.isEditMode = true;

      this.employeeService.getEmployee(employeeNo).subscribe(
        (found) => {
          if (found) {
            this.employee = found;  // Populate the form with the employee data
          }
        },
        (error) => {
          console.error('Error fetching employee:', error);
        }
      );
    }
  }


  submitForm(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.employeeNo, this.employee).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
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
