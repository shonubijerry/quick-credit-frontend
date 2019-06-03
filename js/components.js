/* eslint-disable import/extensions */

/**
 * This class handles all communications with server endpoints
 * @param {string} url
 * @param {object} formData
 * @returns {object} Json object response from server
 */
class Components {
  static prepareLoansTable(loanData) {
    const loansTable = document.querySelector('#table');
    const tableHead = document.createElement('thead');

    tableHead.innerHTML = '<tr><th>#</th><th>User</th><th>Amount(₦)</th><th>Tenor(Months)</th><th>Installment(₦)</th><th>Balance(₦)</th><th>Interest(₦)</th><th>Date</th><th>Status</th><th>Repaid</th></tr>';
    loansTable.appendChild(tableHead);
    const tableBody = document.createElement('tbody');
    loanData.forEach((loan, index) => {
      const tableRow = document.createElement('tr');
      tableRow.setAttribute('id', 'tableRow');
      tableRow.setAttribute('onclick', `window.location='repayments.html?id=${loan.id}'`);
      window.localStorage.setItem(loan.id, loan);
      tableRow.innerHTML = `
      <td data-column="#">${index + 1}</td>
      <td data-column="User(₦)">${loan.loanuser}</td>
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

  static prepareRepaymentHead(repaymentData) {
    const contentHead = document.querySelector('#details-head');
    contentHead.innerHTML = `<p><span class="entry-title">Full Name:</span><span class="entry-value">${repaymentData.firstname} ${repaymentData.lastname}</span></span></p>
              <p><span class="entry-title">Address:</span><span class="entry-value">${repaymentData.address}</span></p>
              <p><span class="entry-title">Email:</span><span class="entry-value">${repaymentData.loanuser}</span></p>
              <p><span class="entry-title">Date Collected:</span><span class="entry-value">${repaymentData.loandate}</span></p>
              <p><span class="entry-title">Loan Amount:</span><span class="entry-value">${repaymentData.amount}</span></p>
              <p><span class="entry-title">Tenor:</span><span class="entry-value">${repaymentData.tenor}</span></p>
              <p><span class="entry-title">Balance:</span><span class="entry-value">${repaymentData.balance}</span></p>
              <p><span class="entry-title">Monthly Installment:</span><span class="entry-value">${repaymentData.monthlyinstallment}</span></p>`;
  }
}

export default Components;
