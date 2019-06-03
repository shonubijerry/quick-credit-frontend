/* eslint-disable import/extensions */
import Main from './main.js';
import Fetcher from './fetchers.js';
import Components from './components.js';

/**
 * Display response data received from server
 * @param {object} response
 */
class Loans {
  static displayLoans(loanData) {
    const table = document.querySelector('#table');
    const pagination = document.querySelector('#pagination');

    if (!loanData) {
      table.innerHTML = '<h3>You are yet to apply for a loan</h3>';
      pagination.style.display = 'none';
    } else {
      Components.prepareLoansTable(loanData);
    }
  }

  /**
 * Process response data received from server
 * @param {object} response
 */

  static processLoanResponseData(response) {
    switch (response.status) {
      case 419: {
        Main.showMessageBox('Session Timeout', response.error, 'signin.html');
        localStorage.removeItem('authorization');
        break;
      }
      case 401: {
        Main.showMessageBox('Not Authorized', response.error, 'signin.html');
        break;
      }
      case 200: {
        Loans.displayLoans(response.data);
        break;
      }
      default: {
        Main.showMessageBox('Server Error', response.error, '#');
        break;
      }
    }
  }

  /**
  * Fetch loans from API
  * @param {string} filter API endpoint to use based on type of loan requested
  */
  static async getLoansData(filter) {
    let url = '';
    switch (filter) {
      case 'current': {
        url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/loans?status=approved&repaid=false';
        break;
      }
      case 'repaid': {
        url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/loans?status=approved&repaid=true';
        break;
      }
      default: {
        url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/loans';
      }
    }

    const responseData = await Fetcher.getFromAPI(url, 'GET');
    if (responseData) {
      Loans.processLoanResponseData(responseData);
      Main.hidePreloader();
    } else {
      Main.showMessageBox('Network Error', 'Internet disconnected', '#');
      Main.hidePreloader();
      const pagination = document.querySelector('#pagination');
      pagination.style.display = 'none';
    }
  }
}

export default Loans;

if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}

document.querySelector('#logout').addEventListener('click', Main.doLogout);
Main.hideMessageBox();
Main.showPreloader();
Loans.getLoansData('all');
