
/**
 * Send data to server endpoint as a promise and await response
 * @param {string} url
 * @param {object} formData
 * @returns {object} Json object response from server
 */

const submitRegistrationOrLoginForm = (url, formData) => {

  showPreloader();

  return fetch(url, {
    mode: 'cors', 
    method: 'POST',
    headers: new Headers({
'Access-Control-Allow-Origin' : '*', 
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => showMessageBox('Server Error', error, ''));
};

const submitUserFormdata = (url, formData) => {
  showPreloader();

  return fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: new Headers({
'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'application/json',
      authorization: window.localStorage.getItem('authorization'),
    }),
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => showMessageBox('Server Error', error, ''));
};

const getUserdata = (url) => {
  showPreloader();

  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: window.localStorage.getItem('authorization'),
    }),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => showMessageBox('Server Error', error, ''));
};
