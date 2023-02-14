let buttonEl = document.querySelector('#button');
const toggle = document.querySelector('#toggle');
const password = document.querySelector('#passwordInput');
const hidden = document.querySelector('#hidden');
const hiddentwo = document.querySelector('#hiddentwo');
const x = document.querySelector('#x');
const xtwo = document.querySelector('#xtwo');

const signUpFormHandler = async (event) => {
  event.preventDefault();
  let nameInputEl = document.querySelector('#nameInput').value.trim();
  let emailInputEl = document
    .querySelector('#emailInput')
    .value.trim()
    .toLowerCase();
  let passwordInputEl = document.querySelector('#passwordInput').value.trim();

  if (nameInputEl && emailInputEl && passwordInputEl) {
    if (!validateEmail(emailInputEl)) {
      return;
    }
    console.log(passwordInputEl);
    console.log(validatePassword(passwordInputEl));
    if (!validatePassword(passwordInputEl)) {
      return;
    } else {
      try {
        const login = await fetch('/signup', {
          method: 'POST',
          body: JSON.stringify({
            name: nameInputEl,
            email: emailInputEl,
            password: passwordInputEl,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (login.ok) {
          window.location.href = '/login';
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};

buttonEl.addEventListener('click', signUpFormHandler);

x.addEventListener('click', () => {
  hidden.setAttribute('class', 'hidden');
});
xtwo.addEventListener('click', () => {
  hiddentwo.setAttribute('class', 'hidden');
});

// on click toggles password visiblity
toggle.addEventListener('click', () => {
  const eyeType =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', eyeType);
  toggle.classList.toggle('fa-eye');
});

document.querySelector('#nameInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    signUpFormHandler(e);
  }
});

document.querySelector('#emailInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    signUpFormHandler(e);
  }
});

document.querySelector('#passwordInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    signUpFormHandler(e);
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
  hidden.className = 'flex justify-center mb-4';
  return false;
}

function validatePassword(password) {
  if (password.length >= 8 && password.length <= 20) {
    return true;
  }
  hiddentwo.className = 'flex justify-center mb-4';
  return false;
}
