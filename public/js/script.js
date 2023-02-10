let buttonEl = document.querySelector('#button');

console.log(buttonEl);

buttonEl.addEventListener('click', async (event) =>{
    event.preventDefault();
    let nameInputEl = document.querySelector('#nameInput').value.trim();
    console.log(nameInputEl);
    let emailInputEl = document.querySelector('#emailInput').value.trim();
    let passwordInputEl = document.querySelector('#passwordInput').value.trim();
    // console.log(inputEl);

    const login = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            nameFromFrontEnd : nameInputEl,
            emailFromFrontEnd : emailInputEl,
            passwordFromFrontEnd :passwordInputEl
        }),
        headers: {"Content-Type": "application/json"},
    });
})