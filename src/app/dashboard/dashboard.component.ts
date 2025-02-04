import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NgIf],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeeNo: number = 0;
  isClockedIn: boolean = false;
  errorMessage: string | null = null;
  currentDate: string = '';
  currentTime: string = '';
  currentDay: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.employeeNo = parseInt(localStorage.getItem('employeeNo') || '0', 10);


    if (this.employeeNo === 0) {
      this.router.navigate(['/login']);
      return;
    }





    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }


  clockIn(): void {
    if (this.isClockedIn) {
      this.errorMessage = 'You are already clocked in.';
      return;
    }

    this.employeeService.clockIn(this.employeeNo).subscribe(
      (response) => {
        this.isClockedIn = true;
        console.log('Clocked in successfully');
      },
      (error) => {
        console.error('Error clocking in:', error);


        if (error.status === 400) {
          this.errorMessage = 'Invalid request. Please try again later.';
        } else if (error.status === 404) {
          this.errorMessage = 'Employee not found. Please check your employee number.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Error clocking in. Please try again later.';
        }
      }
    );
  }


  clockOut(): void {
    if (!this.isClockedIn) {
      this.errorMessage = 'You are not clocked in.';
      return;
    }

    this.employeeService.clockOut(this.employeeNo).subscribe(
      (response) => {
        this.isClockedIn = false;
        console.log('Clocked out successfully');
      },
      (error) => {
        console.error('Error clocking out:', error);


        if (error.status === 400) {
          this.errorMessage = 'Invalid request. Please try again later.';
        } else if (error.status === 404) {
          this.errorMessage = 'Employee not found. Please check your employee number.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Error clocking out. Please try again later.';
        }
      }
    );
  }


  updateDateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
    this.currentDay = now.toLocaleString('en-us', { weekday: 'long' });
  }
}
