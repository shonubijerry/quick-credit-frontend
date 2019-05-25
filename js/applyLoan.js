/* eslint-disable import/extensions */
import Main from './main.js';
import Fetcher from './fetchers.js';

class ApplyLoan {
/**
 * Process response data received from server
 * @param {object} response
 */
  static processResponseData(response) {
    switch (response.status) {
      case 201: {
        Main.showMessageBox('Success', 'Loan application successful', 'loans.html');
        break;
      }
      case 400: {
        Main.showMessageBox('Unsuccessful', response.error.join('<hr>'), '#');
        break;
      }
      case 401: {
        Main.showMessageBox('Unsuccessful', response.error, '#');
        break;
      }
      case 409: {
        Main.showMessageBox('Unsuccessful', response.error, '#');
        break;
      }
      default: {
        Main.showMessageBox('Server Error', response.error, '#');
        break;
      }
    }
  }

  /**
 * Get input values from form, prepare it as JSON object and send to server
 * @param {object} event
 */

  static async getFormData(event) {
    event.preventDefault();
    Main.showPreloader();
    const formData = Main.getFormData('tenor', 'amount');

    const url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/loans';

    const responseData = await Fetcher.sendToAPI(url, 'POST', formData);
    if (responseData) {
      ApplyLoan.processResponseData(responseData);
      Main.hidePreloader();
    }
  }
}

export default ApplyLoan;

if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}

Main.hideMessageBox();
document.querySelector('#loan-form').addEventListener('submit', ApplyLoan.getFormData);
document.querySelector('#logout').addEventListener('click', Main.doLogout);
