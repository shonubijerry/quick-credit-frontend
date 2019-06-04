/* eslint-disable import/extensions */

import Main from './main.js';
import Fetcher from './fetchers.js';

/**
 * This class handles sign up process by calling other necessary methods
 */
class Signin {
/**
 * Process response data received from server
 * @param {object} response
 */

  static processResponseData(response) {
    switch (response.status) {
      case 200: {
        if (response.data.isadmin) {
          window.localStorage.setItem('authorization', response.data.token);
          window.location = './admin/dashboard.html';
        }
        window.location = 'dashboard.html';
        break;
      }
      case 400: {
        Main.showMessageBox('Unsuccessful', response.error.join('<hr>'), '#');
        break;
      }
      case 403: {
        Main.showMessageBox('Unsuccessful', response.error, '#');
        break;
      }
      default: {
        Main.showMessageBox('Server Error', response.error, '#');
        break;
      }
    }
  }

  /**
 * Get input values from form, prepare it as JSON object and send to server
 * @param {object} event
 */

  static async getFormData(event) {
    event.preventDefault();
    const formData = Main.getFormData('email', 'password');

    const url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/auth/signin';

    const responseData = await Fetcher.submitRegistrationOrLoginForm(url, formData);
    if (responseData) {
      Signin.processResponseData(responseData);
      Main.hidePreloader();
    } else {
      Main.showMessageBox('Network Error', 'Internet disconnected', '#');
      Main.hidePreloader();
    }
  }
}

export default Signin;

Main.hideMessageBox();
document.querySelector('#signin-form').addEventListener('submit', Signin.getFormData);
