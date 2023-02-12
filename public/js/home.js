const global = {};

const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

const init = () => {
  const categories = document.getElementById('categoryFilters');
  const colors = document.querySelector('#colorFilters');
  console.log(categories);
  console.log(colors);
};

init();
document.querySelector('#logOutButton').addEventListener('click', logout);
