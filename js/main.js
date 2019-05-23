
const showMessageBox = (title = '', msg, link) => {
  const messageBoxTrigger = document.querySelector('.message-trigger');
  document.querySelector('#mb_title').innerHTML = title;
  document.querySelector('#mb_msg').innerHTML = msg;
  document.querySelector('#mb_link').href = link;
  messageBoxTrigger.click();
  const messageBox = document.querySelector('#message');
  messageBox.style.display = 'block';
};

const showConfirmBox = (title = '', msg, link) => {
  const confirmBoxTrigger = document.querySelector('.confirmation-trigger');
  document.querySelector('#confirm_title').innerHTML = title;
  document.querySelector('#confirm_msg').innerHTML = msg;
  document.querySelector('#confirm_next').setAttribute('href', link);
  confirmBoxTrigger.click();
  const messageBox = document.querySelector('#confirm');
  messageBox.style.display = 'block';
};

const hideMessageBox = () => {
  const messageBox = document.querySelector('#message');
  messageBox.style.display = 'none';
};

const hideConfirmBox = () => {
  const confirmBox = document.querySelector('#confirm');
  messageBox.style.display = 'none';
};

const filterLoan = (option) => {
  // When using real data, This will be handled by
  window.location.href = `${option.value}.html`;
};

const showPreloader = () => {
  const loader = document.querySelector('#preloader');
  loader.style.display = 'block';
};

const hidePreloader = () => {
  const loader = document.querySelector('#preloader');
  loader.style.display = 'none';
};

const doLogout = () => {
  localStorage.removeItem('authorization');
};
document.querySelector('#logout').addEventListener('submit', doLogout);
