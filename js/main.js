class Main {
  /**
 * Show message box when triggered
 * @param {string} title
 * @param {string} msg
 * @param {string} link
 */
  static showMessageBox(title = '', msg, link) {
    const messageBoxTrigger = document.querySelector('.message-trigger');
    document.querySelector('#mb_title').innerHTML = title;
    document.querySelector('#mb_msg').innerHTML = msg;
    document.querySelector('#mb_link').href = link;
    messageBoxTrigger.click();
    const messageBox = document.querySelector('#message');
    messageBox.style.display = 'block';
  }

  /**
 * Show confirmation box when triggered
 * @param {string} title
 * @param {string} msg
 * @param {string} link
 */
  static showConfirmBox(title = '', msg, link) {
    const confirmBoxTrigger = document.querySelector('.confirmation-trigger');
    document.querySelector('#confirm_title').innerHTML = title;
    document.querySelector('#confirm_msg').innerHTML = msg;
    document.querySelector('#confirm_next').setAttribute('href', link);
    confirmBoxTrigger.click();
    const messageBox = document.querySelector('#confirm');
    messageBox.style.display = 'block';
  }

  /**
   * Hides message box when called
   */
  static hideMessageBox() {
    const messageBox = document.querySelector('#message');
    messageBox.style.display = 'none';
  }

  /**
 * Hides confirm box when called
 */
  static hideConfirmBox() {
    const confirmBox = document.querySelector('#confirm');
    confirmBox.style.display = 'none';
  }

  /**
   * loan filter selector
   * @param {string} option
   */
  static filterLoan(option) {
  // When using real data, This will be handled by
    window.location.href = `${option.value}.html`;
  }

  /**
 * show preloader when called
 */
  static showPreloader() {
    const loader = document.querySelector('#preloader');
    loader.style.display = 'block';
  }

  /**
 * Hides preloader when called
 */
  static hidePreloader() {
    const loader = document.querySelector('#preloader');
    loader.style.display = 'none';
  }

  /**
 * sEnds user session by  signing out
 */
  static doLogout() {
    localStorage.removeItem('authorization');
    window.location = 'signin.html';
  }

  /**
   * This method auto generate data from form inputs
   * @param  {...any} formItems input data from forms that will be collected for submision
   */
  static getFormData(...formItems) {
    const formData = {};
    formItems.forEach((item) => {
      formData[item] = document.querySelector(`#${item}`).value;
    });
    return formData;
  }

  /**
   *  check if user has already logged in
   */
  static checkLoggedin(redirect) {
    if (window.localStorage.getItem('authorization')) {
      window.location = redirect;
    }
  }
}

export default Main;
