const hidden = document.querySelector('#hidden')
const x = document.querySelector('#x')

const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        hidden.classList.remove('hidden');
        // alert ('Failed to log out');
    }
};

document.querySelector('#logOutButton').addEventListener('click', logout);

x.addEventListener('click', () => {
    hidden.setAttribute('class', 'hidden');
})