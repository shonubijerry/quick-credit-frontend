/* eslint-disable import/extensions */

import Main from './main.js';
import Fetcher from './fetchers.js';

/**
 * This class handles sign up process by calling other necessary methods
 */

class Signup {
  /**
   * Process response data to geterate feedback for user or take other actions
   * @param {object} response
   */
  static processResponseData(response) {
    switch (response.status) {
      case 201: {
        window.localStorage.setItem('authorization', response.data.token);
        window.location = 'dashboard.html';
        break;
      }
      case 400: {
        Main.showMessageBox('Unsuccessful', response.error.join('<hr>'), '#');
        break;
      }
      case 409: {
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
   * Prepare form input data and send to the server
   * @param {object} event
   */
  static async processFormData(event) {
    event.preventDefault();
    Main.showPreloader();

    const data = Main.getFormData('firstName', 'lastName', 'email', 'password', 'address', 'city', 'state');
    data.address = `${data.address}, ${data.city}, ${data.state}`;
    console.log(data);

    const url = 'https://quick-credit-shonubi.herokuapp.com/api/v1/auth/signup';

    const responseData = await Fetcher.sendToAPI(url, 'POST', data);
    if (responseData) {
      Signup.processResponseData(responseData);
      Main.hidePreloader();
    } else {
      Main.showMessageBox('Network Error', 'Internet disconnected', '#');
      Main.hidePreloader();
    }
  }
}

Main.hideMessageBox();
Main.checkLoggedin('dashboard.html');
document.querySelector('#signup-form').addEventListener('submit', Signup.processFormData);

export default Signup;
