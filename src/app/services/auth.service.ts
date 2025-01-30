import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../environment';
// import {environment} from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Ensure your backend API URL is correct

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/login`, {username, password}).pipe(
      catchError((error) => {
        // Handle server-side errors
        if (error.status === 400 && error.error.message === 'Please change your password.') {
          return throwError('Please change your password');
        }
        return throwError(error);
      })
    );
  }
}

