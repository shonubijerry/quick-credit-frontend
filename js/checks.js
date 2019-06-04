const thisURL = document.location.href;
if (thisURL.indexOf('signin') !== -1 || thisURL.indexOf('signup') !== -1) {
  if (window.localStorage.getItem('authorization')) {
    window.location = 'dashboard.html';
  }
} else if (!window.localStorage.getItem('authorization')) {
  window.location = 'signin.html';
}
