export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',

  auth: {
    login: '/auth/login',
    changePassword: '/auth/change-password',
  },

  clocking: {
    clockIn: '/clock/clock-in',
    clockOut: '/clock/clock-out',
    status: '/clock/{employeeNo}/clock-in-status',
  }
};
