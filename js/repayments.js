/* eslint-disable import/extensions */
import Main from './main.js';
import Fetcher from './fetchers.js';

class Repayments {
/**
 * Process response data received from server
 * @param {object} response
 */

  static displayRepayments(repaymentData) {
    const contentHead = document.querySelector('#details-head');
    const contentBody = document.querySelector('#details-body');
    console.log(repaymentData);

    let repaymentBody = '';
    contentHead.innerHTML = `<p><span class="entry-title">Full Name:</span><span class="entry-value">${repaymentData.firstname} ${repaymentData.lastname}</span></span></p>
              <p><span class="entry-title">Address:</span><span class="entry-value">${repaymentData.address}</span></p>
              <p><span class="entry-title">Email:</span><span class="entry-value">${repaymentData.loanuser}</span></p>
              <p><span class="entry-title">Date Collected:</span><span class="entry-value">${repaymentData.loandate}</span></p>
              <p><span class="entry-title">Loan Amount:</span><span class="entry-value">${repaymentData.amount}</span></p>
              <p><span class="entry-title">Tenor:</span><span class="entry-value">${repaymentData.tenor}</span></p>
              <p><span class="entry-title">Balance:</span><span class="entry-value">${repaymentData.balance}</span></p>
              <p><span class="entry-title">Monthly Installment:</span><span class="entry-value">${repaymentData.monthlyinstallment}</span></p>`;
    if (repaymentData.repayments.length === 0) {
      contentBody.innerHTML = 'Repayments have not been made for this loan';
    } else {
      repaymentData.repayments.forEach((repayment) => {
        repaymentBody = `${repaymentBody}
      <p><span class="entry-title">Date:</span><span class="entry-value">${repayment.createdon}</span></p>
              <p><span class="entry-title">Amount:</span><span class="entry-value">${repayment.amount}</span></p>
              <hr>
      `;
      });
      contentBody.innerHTML = repaymentBody;
    }
  }

  /**
 * Process response data received from server
 * @param {object} response
 */

  static processRepaymentResponseData(response) {
    switch (response.status) {
      case 200: {
        Repayments.displayRepayments(response.data);
        break;
      }
      case 404: {
        Repayments.displayRepayments(response.data);
        break;
      }
      case 401: {
        Main.showMessageBox('Unsuccessful', response.error, '');
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
