const global = {
  selectedCategories: new Set(),
  selectedColors: new Set(),
  selectedCategoryIndex: {},
  selectedColorIndex: {},
};

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
  const categories = [];
  const categoriesDiv = document.getElementById('categoryFilters').children;
  for (let i = 0; i < categoriesDiv.length; i++) {
    categories.push(categoriesDiv[i].textContent);
  }
  const colors = [];
  const colorsDiv = document.getElementById('colorFilters').children;
  for (let i = 0; i < colorsDiv.length; i++) {
    colors.push(colorsDiv[i].textContent);
  }
  global.categories = categories;
  global.colors = colors;
};

const selectCategory = (e) => {
  const selectedCategory = e.target.textContent;
  // Finds index of selected category and stores in global.selectedCategoryIndex object
  Array.from(e.target.parentElement.children).forEach((element, i) => {
    if (element.textContent === e.target.textContent) {
      global.selectedCategoryIndex[selectedCategory] = i;
    }
  });
  // Adds selected category to global.selectedCategories set
  global.selectedCategories.add(selectedCategory);
  // Creates DOM element for selected category and adds to selected category section
  const newSelected = document.createElement('p');
  newSelected.textContent = selectedCategory;
  document.getElementById('selectedCategoryFilters').appendChild(newSelected);
  // Hides selected category from unselected categories
  e.target.style.display = 'none';

  //// send request to api with selected filters to receive the items that fit the filters
};
const selectColor = (e) => {
  const selectedColor = e.target.textContent;
  // Finds index of selected color and stores in global.selectedColorIndex object
  Array.from(e.target.parentElement.children).forEach((element, i) => {
    if (element.textContent === e.target.textContent) {
      global.selectedColorIndex[selectedColor] = i;
    }
  });
  // Adds selected color to global.selectedColors set
  global.selectedColors.add(selectedColor);
  // Creates DOM element for selected color and adds to selected color section
  const newSelected = document.createElement('p');
  newSelected.textContent = selectedColor;
  document.getElementById('selectedColorFilters').appendChild(newSelected);
  // Hides selected color from unselected colors
  e.target.style.display = 'none';

  //// send request to api with selected filters to receive the items that fit the filters
};

const deselectCategory = (e) => {
  const deselectedCategory = e.target.textContent;
  // Removes category from global.selectedCategories set
  global.selectedCategories.delete(deselectedCategory);
  // Unhides category in list of unselected categories
  const categoryFilters = document.getElementById('categoryFilters');
  const unhideIndex = global.selectedCategoryIndex[deselectedCategory];
  delete global.selectedCategoryIndex[deselectedCategory];
  categoryFilters.children[unhideIndex].style.display = 'block';
  // Remove DOM element from selected categories
  e.target.remove();

  //// send request to api with selected filters to receive the items that fit the filters
};

const deselectColor = (e) => {
  const deselectedColor = e.target.textContent;
  // Removes color from global.selectedColors set
  global.selectedColors.delete(deselectedColor);
  // Unhides color in list of unselected colors
  const colorFilters = document.getElementById('colorFilters');
  const unhideIndex = global.selectedColorIndex[deselectedColor];
  delete global.selectedColorIndex[deselectedColor];
  colorFilters.children[unhideIndex].style.display = 'block';
  // Remove DOM element from selected colors
  e.target.remove();

  //// send request to api with selected filters to receive the items that fit the filters
};

init();
document.querySelector('#logOutButton').addEventListener('click', logout);
document.getElementById('colorFilters').addEventListener('click', selectColor);
document
  .getElementById('selectedColorFilters')
  .addEventListener('click', deselectColor);
document
  .getElementById('categoryFilters')
  .addEventListener('click', selectCategory);
document
  .getElementById('selectedCategoryFilters')
  .addEventListener('click', deselectCategory);
