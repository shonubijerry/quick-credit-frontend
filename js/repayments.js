/* eslint-disable import/extensions */
import Main from './main.js';
import Fetcher from './fetchers.js';
import Components from './components.js';

class Repayments {
/**
 * Process response data received from server
 * @param {object} response
 */

  static displayRepayments(repaymentData) {
    const contentBody = document.querySelector('#details-body');

    let repaymentBody = '';
    Components.prepareRepaymentHead(repaymentData);
    if (repaymentData.repayments.length > 0) {
      repaymentData.repayments.forEach((repayment) => {
        repaymentBody = `${repaymentBody}
      <p><span class="entry-title">Date:</span><span class="entry-value">${repayment.createdon}</span></p>
              <p><span class="entry-title">Amount Paid:</span><span class="entry-value">${repayment.amount}</span></p>
              <hr>
      `;
      });
      contentBody.innerHTML = repaymentBody;
    } else {
      contentBody.innerHTML = 'Repayments have not been made for this loan';
    }
  }

  /**
 * Process response data received from server
 * @param {object} response
 */

  static processRepaymentResponseData(response) {
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
      case 404: {
        Repayments.displayRepayments(response.data);
        break;
      }
      case 200: {
        Repayments.displayRepayments(response.data);
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
 * @param {string} loanid
 */

  static async getRepaymentData(loanid) {
    const url = `https://quick-credit-shonubi.herokuapp.com/api/v1/loans/${loanid}/repayments`;

    const responseData = await Fetcher.getFromAPI(url, 'GET');
    if (responseData) {
      Main.hidePreloader();
      Repayments.processRepaymentResponseData(responseData);
    } else {
      Main.showMessageBox('Network Error', 'Internet disconnected', '#');
      Main.hidePreloader();
    }
  }
}

if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}

const urlParams = new URLSearchParams(window.location.search);
const loanid = urlParams.get('id');
Main.hideMessageBox();
Repayments.getRepaymentData(loanid);
