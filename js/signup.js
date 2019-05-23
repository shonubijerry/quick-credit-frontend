
const processResponseData = (response) => {
  switch (response.status) {
    case 201: {
      window.localStorage.setItem('authorization', response.data.token);
      window.location = 'loan.html';
      break;
    }
    case 400: {
      showMessageBox('Unsuccessful', response.error.join('<hr>'), '');
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

const submitFormdata = (formData) => {
  showPreloader();
  const url = 'http://quick-credit-shonubi.herokuapp.com/api/v1/auth/signup';

  return fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then((data) => {
      processResponseData(data);
      hidePreloader();
    })
    .catch(error => showMessageBox('Server Error', error, ''));
};


const getFormData = (event) => {
  event.preventDefault();
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const street = document.querySelector('#address').value;
  const city = document.querySelector('#city').value;
  const state = document.querySelector('#state').value;
  const address = `${street}, ${city}, ${state}`;

  const formData = {
    firstName, lastName, email, password, address,
  };

  submitFormdata(formData);
};

// check if user has already signed in
if (window.localStorage.getItem('authorization')) {
  window.location = 'dashboard.html';
}
document.querySelector('#signup-form').addEventListener('submit', getFormData);
