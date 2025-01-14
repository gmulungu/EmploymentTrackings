import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule,RouterModule],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        // I did this for debugging purposes
        console.log('Received employees data:', data);
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
        //Error handling for users to see
        this.errorMessage = 'An error while loading the employees.';
      }
    );
  }

  deleteEmployee(employeeNo: number | undefined): void {
    if (employeeNo && confirm('delete this employee?? Very sure?')) {
      this.employeeService.deleteEmployee(employeeNo).subscribe(() => this.loadEmployees());
    }
  }

  goToAdd(): void {
    this.router.navigate(['/employees/add']);
  }

  goToEdit(employeeNo: number | undefined): void {
    if (employeeNo !== undefined) {
      this.router.navigate([`/employees/edit/${employeeNo}`]);
    } else {
      console.error('Employee ID is undefined');
      // Error handling for the users
      this.errorMessage = 'The employee ID is missing. Please try again.';
    }
  }

}

