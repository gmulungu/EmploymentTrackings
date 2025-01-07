import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [
    FormsModule
  ]
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { firstName: '', lastName: '', position: '', cellPhoneNumber: '' };
  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployees().subscribe((employees) => {
        const found = employees.find((e) => e.id === +id);
        if (found) this.employee = found;
      });
    }
  }

  submitForm(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.id!, this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
