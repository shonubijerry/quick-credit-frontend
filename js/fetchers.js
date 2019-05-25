/* eslint-disable import/extensions */

import Main from './main.js';
/**
 * This class handles all communications with server endpoints
 * @param {string} url
 * @param {object} formData
 * @returns {object} Json object response from server
 */
class Fetcher {
  constructor(url, method, body) {
    this.url = url;
    this.method = method;
    this.body = body;
  }

  static submitRegistrationOrLoginForm(url, formData) {
    Main.showPreloader();

    return fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => Main.showMessageBox('Server Error', error, ''));
  }

  /**
   * POST data to server endpoint as a promise and return response
   * @param {string} url
   * @param {string} method 'POST' 'PUT' 'PATCH' 'DELETE'
   * @param {object} body form data or input
   */
  static sendToAPI(url, method, body) {
    return fetch(url, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('authorization'),
      }),
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => Main.showMessageBox('Server Error', error, ''));
  }

  /**
 * POST data to server endpoint as a promise and return response
 * @param {string} url
 * @param {string} method 'GET'
 */
  static getFromAPI(url, method) {
    Main.showPreloader();
    return fetch(url, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('authorization'),
      }),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => Main.showMessageBox('Server Error', error, ''));
  }
}

export default Fetcher;
