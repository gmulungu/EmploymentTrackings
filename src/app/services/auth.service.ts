import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Ensure your backend API URL is correct

  constructor(private http: HttpClient, private router: Router) {
  }

  login(employeeNo: number, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/login`, {employeeNo, password}).pipe(
      catchError((error) => {
        // Handle server-side errors
        if (error.status === 400 && error.error.message === 'Please change your password.') {
          return throwError('Please change your password');
        }
        return throwError(error);
      })
    );
  }

  logout(): void {
    // Remove the employeeNo from localStorage when logging out
    localStorage.removeItem('employeeNo');

    // Optionally, also remove other session data
    // localStorage.removeItem('token'); // etc.

    // Navigate to the login page or home
    this.router.navigate(['/login']);
  }
}

