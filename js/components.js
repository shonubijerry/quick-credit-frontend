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
}

export default Components;
