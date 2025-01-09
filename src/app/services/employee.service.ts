import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5266/api/employee'; // Backend API URL

  constructor(private http: HttpClient) {}

  // fetch all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // add a new employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // update an employee
  updateEmployee(employeeNo: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employeeNo}`, employee);
  }

  // delete an employee
  deleteEmployee(employeeNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeNo}`);
  }


  getEmployee(employeeNo: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeNo}`);
  }
}


