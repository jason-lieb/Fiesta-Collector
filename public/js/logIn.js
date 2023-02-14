const toggle = document.querySelector('#toggle');
const password = document.querySelector('#passwordInput');
const hidden = document.querySelector('#hidden');
const x = document.querySelector('#x');

const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document
    .querySelector('#emailInput')
    .value.trim()
    .toLowerCase();
  const password = document.querySelector('#passwordInput').value.trim();

  if (email && password) {
    if (validateEmail(email)) {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        hidden.className = 'flex justify-center mb-4';
      }
    }
  }
};

document.querySelector('#button').addEventListener('click', loginFormHandler);

// on click toggles password visiblity
toggle.addEventListener('click', () => {
  const eyeType =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', eyeType);
  toggle.classList.toggle('fa-eye');
});

// removes popup on click
x.addEventListener('click', () => {
  hidden.setAttribute('class', 'hidden');
});

document.querySelector('#emailInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    loginFormHandler(e);
  }
});
document.querySelector('#passwordInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    loginFormHandler(e);
  }
});

function validateEmail(email) {
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return true;
  }
  alert('You have entered an invalid email address!');
  return false;
}
