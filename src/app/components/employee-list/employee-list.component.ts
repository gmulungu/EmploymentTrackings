import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {

        //this is to see the data i get when loaded from the employees
        console.log('Received employees data:', data);
        this.employees = data;
      },
      (error) => {
        // Log for possible errors that might come up
        console.error('Error fetching employees:', error);
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
    if (employeeNo) {
      this.router.navigate([`/employees/edit/${employeeNo}`]);
    }
  }
}
