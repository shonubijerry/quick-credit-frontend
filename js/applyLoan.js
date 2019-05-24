/**
 * Process response data received from server
 * @param {object} response
 */

const processResponseData = (response) => {
  switch (response.status) {
    case 200: {
      showMessageBox('Success', 'Loan application successful', 'loans.html');
      break;
    }
    case 400: {
      showMessageBox('Unsuccessful', response.error.join('<hr>'), '');
      break;
    }
    case 401: {
      showMessageBox('Unsuccessful', response.error, '');
      break;
    }
    case 409: {
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

const getFormData = async (event) => {
  event.preventDefault();
  const tenor = document.querySelector('#tenor').value;
  const amount = document.querySelector('#amount').value;

  const formData = {
    tenor, amount,
  };

  const url = 'http://quick-credit-shonubi.herokuapp.com/api/v1/loans';

  const responseData = await submitUserFormdata(url, formData);
  if (responseData) {
    hidePreloader();
    processResponseData(responseData);
  }
};

if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}

hideMessageBox();
document.querySelector('#loan-form').addEventListener('submit', getFormData);
document.querySelector('#logout').addEventListener('click', doLogout);
