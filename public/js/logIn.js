const toggle = document.querySelector('#toggle');
const password = document.querySelector('#passwordInput');
const hidden = document.querySelector('#hidden');
const x = document.querySelector('#x');

const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#emailInput').value.trim();
  const password = document.querySelector('#passwordInput').value.trim();

  if (email && password) {
      const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify({email, password}),
          headers: { 'Content-Type': 'application/json'},
      });
      if(response.ok) {
          document.location.replace('/');
      } else {
        hidden.removeAttribute('class', 'hidden');
      }
  }
}

document
  .querySelector('#button')
  .addEventListener('click', loginFormHandler);

  
  // on click toggles password visiblity
toggle.addEventListener('click', () => {
    const eyeType = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', eyeType);
    toggle.classList.toggle('fa-eye');
})

// removes popup on click
x.addEventListener('click', () => {
    hidden.setAttribute('class', 'hidden');
})