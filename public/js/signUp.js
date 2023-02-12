let buttonEl = document.querySelector('#button');

buttonEl.addEventListener('click', async (event) =>{
    event.preventDefault();
    let nameInputEl = document.querySelector('#nameInput').value.trim();
    let emailInputEl = document.querySelector('#emailInput').value.trim();
    let passwordInputEl = document.querySelector('#passwordInput').value.trim();

    const login = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
            name: nameInputEl,
            email: emailInputEl,
            password :passwordInputEl
        }),
        headers: {"Content-Type": "application/json"},
    });
})