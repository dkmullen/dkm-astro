function toggleMenu() {
  let classList = document.getElementById('menu').classList;
  if (classList.contains('show')) {
    classList.remove('show');
  } else {
    classList.add('show');
  }
}

function pressButton() {
  document.querySelector('#submit-button').classList.add('pressed');
}
function releaseButton() {
  document.querySelector('#submit-button').classList.remove('pressed');
}

// Reserve this var so we can set and cancel it below
let animation;

function doProgressBar() {
  let progressBar = document.querySelector('#progress-bar');
  progressBar.style.opacity = 1;
  let j = 0;
  animation = setInterval(() => {
    if (j === progressBar.children.length) {
      for (let i of progressBar.children) {
        i.classList.remove('highlighted');
      }
      j = 0;
    } else {
      progressBar.children[j].classList.add('highlighted');
      j++;
    }
  }, 500);
}

function stopProgressBar() {
  clearInterval(animation);
  document.querySelector('#progress-bar').style.opacity = 0;
}

document
  .querySelector('#hamburger-button')
  .addEventListener('click', toggleMenu);

function submitMessage() {
  let name = document.querySelector('#name').value;
  let email = document.querySelector('#email').value;
  let message = document.querySelector('#message').value;
  let errorMsg = document.querySelector('.error-sending-message').classList;
  errorMsg.remove('show');
  errorMsg.add('hide');
  doProgressBar();
  fetch('https://sdfh3459a9.execute-api.us-east-2.amazonaws.com/dev', {
    method: 'POST',
    headers: {
      'x-api-key': 'i0k0ucR4tW1wmajvQb4XX5GleesDI4Jk2y9l97zd',
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.info('Success:', data);
      stopProgressBar();
      let msg = document.querySelector('#message-received').classList;
      document.querySelector('#contact-form').reset();
      msg.remove('hide');
      msg.add('show');
      setTimeout(() => {
        msg.remove('show');
        msg.add('hide');
      }, 7000);
    })
    .catch((error) => {
      console.error('Error:', error);
      errorMsg.remove('hide');
      errorMsg.add('show');
      stopProgressBar();
    });
}

let uName = document.querySelector('#name');
let email = document.querySelector('#email');
let message = document.querySelector('#message');
let submitButton = document.querySelector('#submit-button');
let contactForm = document.querySelector('#contact-form');

if (uName) {
  uName.addEventListener('input', doValidate);
}
if (email) {
  email.addEventListener('input', doValidate);
}
if (message) {
  message.addEventListener('input', doValidate);
}
if (submitButton) {
  submitButton.addEventListener('mousedown', pressButton);
  submitButton.addEventListener('mouseup', releaseButton);
  // submitButton.addEventListener('click', submitMessage);
}
if (contactForm) {
  contactForm.addEventListener('submit', submitMessage);
}

function doValidate() {
  let submitButton = document.querySelector('#submit-button');
  let name = document.querySelector('#name').value;
  let email = document.querySelector('#email').value;
  let message = document.querySelector('#message').value;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailPattern.test(email) && name && message) {
    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
  }
  let errMsg = document.querySelector('#email-error-message').classList;
  if (email && !emailPattern.test(email)) {
    errMsg.add('show');
    errMsg.remove('hide');
  } else {
    errMsg.remove('show');
    errMsg.add('hide');
  }
}
