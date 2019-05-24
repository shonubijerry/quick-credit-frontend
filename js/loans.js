/**
 * Process response data received from server
 * @param {object} response
 */

const displayLoans = (loanData) => {
  const table = document.querySelector('#table-body');

  if (!loanData) {
    table.innerHTML = 'No loans found';
  } else {
    const loansTable = document.querySelector('#table');
    const tableHead = document.createElement('thead');

    tableHead.innerHTML = '<tr><th>#</th><th>Amount(₦)</th><th>Tenor(Months)</th><th>Installment(₦)</th><th>Balance(₦)</th><th>Interest(₦)</th><th>Date</th><th>Status</th><th>Repaid</th></tr>';
    loansTable.appendChild(tableHead);
    const tableBody = document.createElement('tbody');
    loanData.forEach((loan) => {
      const tableRow = document.createElement('tr');
      tableRow.setAttribute('id', 'tableRow');
      tableRow.setAttribute('onclick', `window.location='repayments.html?id=${loan.id}'`);
      window.localStorage.setItem(loan.id, loan);
      tableRow.innerHTML = `
      <td data-column="#">1</td>
      <td data-column="Amount(₦)">${loan.amount}</td>
      <td data-column="Tenor(Months)">${loan.tenor}</td>
      <td data-column="Installment(₦)">${loan.paymentinstallment}</td>
      <td data-column="Balance(₦)">${loan.balance}</td>
      <td data-column="Interest(₦)">${loan.interest}</td>
      <td data-column="Date">${loan.createdon}</td>
      <td data-column="Status">${loan.status}</td>
      <td data-column="Repaid">${loan.repaid}</td>
      `;
      tableBody.appendChild(tableRow);
    });
    loansTable.appendChild(tableBody);
  }
};

/**
 * Process response data received from server
 * @param {object} response
 */

const processLoanResponseData = (response) => {
  switch (response.status) {
    case 200: {
      displayLoans(response.data);
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
 * @param {object} event
 */

const getLoansData = async (event) => {
  const url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/loans';

  const responseData = await getUserdata(url);
  if (responseData) {
    hidePreloader();
    processLoanResponseData(responseData);
  }
};

if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}

hideMessageBox();
getLoansData();
