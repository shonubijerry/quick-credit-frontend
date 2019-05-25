/* eslint-disable import/extensions */
import Main from './main.js';
import Fetcher from './fetchers.js';
import Components from './components.js';

/**
 * Process response data received from server
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
      case 200: {
        Loans.displayLoans(response.data);
        break;
      }
      case 401: {
        Loans.displayLoans(response.data);
        break;
      }
      default: {
        Main.showMessageBox('Server Error', response.error, '');
        break;
      }
    }
  }

  /**
 * Get input values from form, prepare it as JSON object and send to server
 */

  static async getLoansData() {
    const url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/loans';

    const responseData = await Fetcher.getFromAPI(url, 'GET');
    if (responseData) {
      Loans.processLoanResponseData(responseData);
      Main.hidePreloader();
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
Loans.getLoansData();
