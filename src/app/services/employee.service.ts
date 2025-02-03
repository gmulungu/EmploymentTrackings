import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // fetch all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee`);
  }

  // add a new employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee`, employee);
  }

  // update an employee
  updateEmployee(employeeNo: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/${employeeNo}`, employee);
  }

  // delete an employee
  deleteEmployee(employeeNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/${employeeNo}`);
  }

  getEmployee(employeeNo: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/${employeeNo}`);
  }

  clockIn(employeeNo: number) {
    return this.http.post(`${environment.apiUrl}/employee/${employeeNo}/clock-in`, {});
  }

  clockOut(employeeNo: number) {
    return this.http.post(`${environment.apiUrl}/employee/${employeeNo}/clock-out`, {});
  }

  getClockInStatus(employeeNo: number) {
    return this.http.get<{ isClockedIn: boolean }>(`${environment.apiUrl}/employee/${employeeNo}/clock-in-status`);
  }


  changePassword(employeeNo: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/${employeeNo}/change-password`, { newPassword });
  }




}


