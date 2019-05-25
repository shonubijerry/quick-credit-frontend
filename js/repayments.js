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

    if (repaymentData.length === 0) {
      contentHead.innerHTML = 'No Repayments';
      contentBody.innerHTML = 'Repayments has not been made for this loan';
    } else {
      const repaymentItem = document.createElement('div');
      console.log(repaymentData);
      repaymentData.forEach((repayment) => {
        contentHead.innerHTML = `<p><span class="entry-title">Full Name:</span><span class="entry-value">${repayment.firstname} ${repaymentData.lastname}</span></span></p>
              <p><span class="entry-title">Address:</span><span class="entry-value">${repayment.address}</span></p>
              <p><span class="entry-title">Email:</span><span class="entry-value">${repayment.loanuser}</span></p>
              <p><span class="entry-title">Date Collected:</span><span class="entry-value">${repayment.createdon}</span></p>
              <p><span class="entry-title">Amount Paid:</span><span class="entry-value">${repayment.amount}</span></p>
              <p><span class="entry-title">Balance:</span><span class="entry-value">${repayment.balance}</span></p>
              <p><span class="entry-title">Monthly Installment:</span><span class="entry-value">${repayment.monthlyinstallment}</span></p>`;
        repaymentItem.innerHTML = `
      <p><span class="entry-title">Date:</span><span class="entry-value">${repayment.createdon}</span></p>
              <p><span class="entry-title">Amount:</span><span class="entry-value">${repayment.paidamount}</span></p>
              <hr>
      `;
      });
      contentBody.appendChild(repaymentItem);
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
