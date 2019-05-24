/**
 * Process response data received from server
 * @param {object} response
 */

const displayRepayments = (repaymentData, loanid) => {
  const contentHead = document.querySelector('#details-head');
  const contentBody = document.querySelector('#details-body');
  const loan = window.localStorage.getItem(loanid);
  console.log(window.localStorage.getItem(loanid));
  console.log(loanid);

  contentHead.innerHTML = `<p><span class="entry-title">Full Name:</span><span class="entry-value">Abel Abaimu</span></span></p>
              <p><span class="entry-title">Address:</span><span class="entry-value">6, Felix Street, Ijegun</span></p>
              <p><span class="entry-title">Email:</span><span class="entry-value">abelabaimu34@yahoo.com</span></p>
              <p><span class="entry-title">Date Collected:</span><span class="entry-value">${loan.createdon}</span></p>
              <p><span class="entry-title">Amount Paid:</span><span class="entry-value">${loan.amount}</span></p>
              <p><span class="entry-title">Balance:</span><span class="entry-value">${loan.balance}</span></p>`;

  if (!repaymentData) {
    contentBody.innerHTML = 'No Repayments found for this loan';
  } else {
    const repaymentItem = document.createElement('div');
    repaymentData.forEach((repayment) => {
      repaymentItem.innerHTML = `
      <p><span class="entry-title">Date:</span><span class="entry-value">${repayment.createdon}</span></p>
              <p><span class="entry-title">Amount:</span><span class="entry-value">${repayment.amount}</span></p>
              <hr>
      `;
    });
    contentBody.appendChild(repaymentItem);
  }
};


/**
 * Process response data received from server
 * @param {object} response
 */

const processRepaymentResponseData = (response, loanid) => {
  switch (response.status) {
    case 200: {
      displayRepayments(response.data, loanid);
      break;
    }
    case 404: {
      displayRepayments(response.data, loanid);
      break;
    }
    case 401: {
      showMessageBox('Unsuccessful', response.error, '');
      break;
    }
    default: {
      showMessageBox('Server Error', response.error, '');
      break;
    }
  }
};

/**
 * Get input values from form, prepare it as JSON object and send to server
 * @param {string} loanid
 */

const getRepaymentData = async (loanid) => {
  console.log(loanid);
  const url = `https://quick-credit-shonubi.herokuapp.com/api/v1/loans/${loanid}/repayments`;

  const responseData = await submitUserFormdata(url);
  if (responseData) {
    hidePreloader();
    processRepaymentResponseData(responseData, loanid);
  }
};

if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}

const urlParams = new URLSearchParams(location.search);
const loanid = urlParams.get('id');
hideMessageBox();
getRepaymentData(loanid);
