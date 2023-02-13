let buttonEl = document.querySelector('#button');
const toggle = document.querySelector('#toggle');

const signUpFormHandler = async (event) => {
  event.preventDefault();
  let nameInputEl = document.querySelector('#nameInput').value.trim();
  let emailInputEl = document
    .querySelector('#emailInput')
    .value.trim()
    .toLowerCase();
  let passwordInputEl = document.querySelector('#passwordInput').value.trim();

  if (nameInputEl && emailInputEl && passwordInputEl) {
    const login = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: nameInputEl,
        email: emailInputEl,
        password: passwordInputEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

buttonEl.addEventListener('click', signUpFormHandler);

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
