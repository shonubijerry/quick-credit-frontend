/**
 * Process response data received from server
 * @param {object} response
 */

const processResponseData = (response) => {
  switch (response.status) {
    case 200: {
      window.localStorage.setItem('authorization', response.data.token);
      window.location = 'dashboard.html';
      break;
    }
    case 400: {
      showMessageBox('Unsuccessful', response.error.join('<hr>'), '');
      break;
    }
    case 403: {
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
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const formData = {
    email, password,
  };

  const url = 'http://quick-credit-shonubi.herokuapp.com/api/v1/auth/signin';

  const responseData = await submitRegistrationOrLoginForm(url, formData);
  if (responseData) {
    hidePreloader();
    processResponseData(responseData);
  }
};

// check if user has already signed in
if (window.localStorage.getItem('authorization')) {
  window.location = 'dashboard.html';
}
document.querySelector('#signin-form').addEventListener('submit', getFormData);
