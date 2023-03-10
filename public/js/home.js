const global = {
  selectedCategories: new Set(),
  selectedColors: new Set(),
  selectedItems: new Set(),
  selectedCategoryIndex: {},
  selectedColorIndex: {},
  selectedItemIndex: {},
};

const hidden = document.querySelector('#hidden');
const x = document.querySelector('#x');

const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/login');
  } else {
    hidden.className = 'absolute flex justify-center top-1 w-full mt-5';
  }
};

const selectFilter = (e, filterType) => {
  const selectedFilter = e.target.innerText;
  // Finds index of selected category
  let index;
  Array.from(e.target.parentElement.children).forEach((element, i) => {
    if (element.textContent === selectedFilter) {
      index = i;
    }
  });
  let selectedFiltersDOM, firstFilterOfType;
  switch (filterType) {
    case 'category':
      // Stores index in global.selectedFilterIndex object
      global.selectedCategoryIndex[selectedFilter] = index;
      // Adds selected filter to global.selectedFilter set
      global.selectedCategories.add(selectedFilter);
      // Creates boolean for determining if there is already a filter of the same type
      firstFilterOfType = global.selectedCategories.size > 1 ? false : true;
      // Creates variable for selectedFilters DOM element
      selectedFiltersDOM = document.getElementById('selectedCategoryFilters');
      break;
    case 'color':
      global.selectedColorIndex[selectedFilter] = index;
      global.selectedColors.add(selectedFilter);
      firstFilterOfType = global.selectedColors.size > 1 ? false : true;
      selectedFiltersDOM = document.getElementById('selectedColorFilters');
      break;
    case 'item':
      global.selectedItemIndex[selectedFilter] = index;
      global.selectedItems.add(selectedFilter);
      firstFilterOfType = global.selectedItems.size > 1 ? false : true;
      selectedFiltersDOM = document.getElementById('selectedItemFilters');
      break;
  }
  // Creates DOM element for selected filter and adds to selected filter section
  const newSelected = document.createElement('li');
  newSelected.style.listStyleType = 'none';
  newSelected.textContent = selectedFilter;
  newSelected.className = 'text-orange-400 font-dosis';
  selectedFiltersDOM.appendChild(newSelected);
  // Hides selected category from unselected categories
  e.target.style.display = 'none';

  //// send request to api with selected filters to receive the items that fit the filters?

  if (firstFilterOfType) {
    hide(selectedFilter, filterType, true);
  } else {
    unhide(selectedFilter, filterType, true);
  }
};

const deselectFilter = (e, filterType) => {
  const deselectedFilter = e.target.innerText;
  let unhideIndex, filtersDOM, lastFilterOfType;
  switch (filterType) {
    case 'category':
      // Removes filter from global.selectedFilters set
      global.selectedCategories.delete(deselectedFilter);
      // Unhides filter in list of unselected filters
      unhideIndex = global.selectedCategoryIndex[deselectedFilter];
      delete global.selectedCategoryIndex[deselectedFilter];
      filtersDOM = document.getElementById('categoryFilters');
      // Creates boolean if there is no longer any filters of that type
      lastFilterOfType = global.selectedCategories.size === 0 ? true : false;
      break;
    case 'color':
      global.selectedColors.delete(deselectedFilter);
      unhideIndex = global.selectedColorIndex[deselectedFilter];
      delete global.selectedColorIndex[deselectedFilter];
      filtersDOM = document.getElementById('colorFilters');
      lastFilterOfType = global.selectedColors.size === 0 ? true : false;
      break;
    case 'item':
      global.selectedItems.delete(deselectedFilter);
      unhideIndex = global.selectedItemIndex[deselectedFilter];
      delete global.selectedItemIndex[deselectedFilter];
      filtersDOM = document.getElementById('itemFilters');
      lastFilterOfType = global.selectedItems.size === 0 ? true : false;
      break;
  }
  // Continue unhiding filter
  filtersDOM.children[unhideIndex].style.display = 'block';
  // Remove DOM element from selected colors
  e.target.remove();

  //// send request to api with selected filters to receive the items that fit the filters?

  if (lastFilterOfType) {
    unhide(deselectedFilter, filterType, false);
  } else {
    hide(deselectedFilter, filterType, false);
  }
};

const hide = (filter, filterType, shouldMatchToShow) => {
  // Cycle through all item cards
  Array.from(document.getElementById('itemCards').children).forEach(
    (itemCard) => {
      // Return if item card is already hidden
      if (itemCard.style.display === 'none') return;
      // Return if item card is of selected filter type
      if ((itemCard.dataset[filterType] === filter) === shouldMatchToShow) {
        return;
      } else {
        // Determines if another filter of the same type matches
        let filters;
        switch (filterType) {
          case 'category':
            filters = global.selectedCategories;
            break;
          case 'color':
            filters = global.selectedColors;
            break;
          case 'item':
            filters = global.selectedItems;
            break;
        }
        let filterMatch = false;
        filters.forEach((selectedFilter) => {
          if (itemCard.dataset[filterType] === selectedFilter)
            filterMatch = true;
        });
        // Hide item if filter matches
        if (!filterMatch) itemCard.style.display = 'none';
      }
    }
  );
};

const unhide = (filter, filterType, shouldMatchToShow) => {
  Array.from(document.getElementById('itemCards').children).forEach(
    (itemCard) => {
      if (itemCard.style.display !== 'none') return;
      if ((itemCard.dataset[filterType] !== filter) === shouldMatchToShow) {
        // Return if item card is not of deselected filter
        return;
      } else {
        let match1 = false;
        let match2 = false;
        switch (filterType) {
          case 'category':
            if (global.selectedColors.size === 0) match1 = true;
            if (global.selectedItems.size === 0) match2 = true;
            global.selectedColors.forEach((filter) => {
              if (itemCard.dataset['color'] === filter) match1 = true;
            });
            global.selectedItems.forEach((filter) => {
              if (itemCard.dataset['item'] === filter) match2 = true;
            });
            break;
          case 'color':
            if (global.selectedCategories.size === 0) match1 = true;
            if (global.selectedItems.size === 0) match2 = true;
            global.selectedCategories.forEach((filter) => {
              if (itemCard.dataset['category'] === filter) match1 = true;
            });
            global.selectedItems.forEach((filter) => {
              if (itemCard.dataset['item'] === filter) match2 = true;
            });
            break;
          case 'item':
            if (global.selectedCategories.size === 0) match1 = true;
            if (global.selectedColors.size === 0) match2 = true;
            global.selectedCategories.forEach((filter) => {
              if (itemCard.dataset['category'] === filter) match1 = true;
            });
            global.selectedColors.forEach((filter) => {
              if (itemCard.dataset['color'] === filter) match2 = true;
            });
            break;
        }
        // Show item if filter matches
        if (match1 && match2) itemCard.style.display = 'block';
      }
    }
  );
};

const init = () => {
  if (document.getElementById('colorFilters')) {
    document
      .getElementById('colorFilters')
      .addEventListener('click', (e) => selectFilter(e, 'color'));
    document
      .getElementById('selectedColorFilters')
      .addEventListener('click', (e) => deselectFilter(e, 'color'));
  }

  if (document.getElementById('categoryFilters')) {
    document
      .getElementById('categoryFilters')
      .addEventListener('click', (e) => selectFilter(e, 'category'));
    document
      .getElementById('selectedCategoryFilters')
      .addEventListener('click', (e) => deselectFilter(e, 'category'));
  }

  if (document.getElementById('itemFilters')) {
    document
      .getElementById('itemFilters')
      .addEventListener('click', (e) => selectFilter(e, 'item'));
    document
      .getElementById('selectedItemFilters')
      .addEventListener('click', (e) => deselectFilter(e, 'item'));
  }
  if (document.querySelector('#itemCards')) {
    const itemCardEl = document.querySelector('#itemCards');
    itemCardEl.addEventListener('click', btnRouter);
  }
  if (document.querySelector('#addItem')) {
    document.querySelector('#addItem').addEventListener('click', addItem);
  }

  if (document.querySelector('#filters')) {
    document.querySelector('#filters').addEventListener('click', accordion);
  }
};

const loadEdit = (e) => {
  const itemCard = e.target.parentElement;
  itemCard.removeChild(itemCard.children[2]);
  const deletebtn = document.createElement('i');
  deletebtn.className =
    'deleteBtn fa-solid fa-xmark absolute text-2xl text-zinc-600 top-2 left-2 hover:text-red-600';
  const left = document.createElement('i');
  left.className =
    'leftBtn fa-solid fa-chevron-left absolute bottom-4 left-4 text-white hover:text-orange-400';
  const right = document.createElement('i');
  right.className =
    'rightBtn fa-solid fa-chevron-right absolute bottom-4 right-4 text-white hover:text-orange-400';
  const savebtn = document.createElement('i');
  savebtn.className =
    'saveBtn fa-solid fa-floppy-disk absolute top-2 right-2 text-2xl text-zinc-600 hover:text-orange-400';
  itemCard.appendChild(left);
  itemCard.appendChild(right);
  itemCard.prepend(deletebtn);
  itemCard.prepend(savebtn);
};

const quantityUp = (e) => {
  const card = e.target.parentElement;
  const quantityEl = card.children[3].children[2];
  quantityEl.textContent = `Quantity: ${++card.dataset.qty}`;
};

const quantityDown = (e) => {
  const card = e.target.parentElement;
  const quantityEl = card.children[3].children[2];
  if (card.dataset.qty > 1) {
    quantityEl.textContent = `Quantity: ${--card.dataset.qty}`;
  }
};

const removeCard = async (e) => {
  const card = e.target.parentElement;
  const id = card.dataset.id;
  try {
    const response = await fetch(`/api/inventory/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    card.remove();
  } catch (err) {
    console.error(err);
  }
};

const saveChoice = async (e) => {
  const card = e.target.parentElement;
  card.removeChild(card.children[0]);
  card.removeChild(card.children[0]);
  card.removeChild(card.children[2]);
  card.removeChild(card.children[2]);

  const edit = document.createElement('i');
  edit.className =
    'edit fa-solid fa-pen-to-square text-white absolute right-2 bottom-2 hover:text-orange-400';
  card.appendChild(edit);

  const id = card.dataset.id;
  const qty = card.dataset.qty;
  try {
    const response = await fetch(`/api/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: qty,
      }),
    });
  } catch (err) {
    console.error(err);
  }
};

const redirectToItemPage = (e) => {
  const card = e.target.parentElement;
  document.location.replace(`/browse/${card.dataset.id}`);
};

const addItem = async (e) => {
  e.preventDefault();
  const color = document.querySelector('select').value;
  if (color === 'Select one') return;
  const qty = document.querySelector('input').value;
  const id = window.location.pathname.split('/')[2];
  try {
    const response = await fetch(`/browse/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        color,
        qty,
      }),
    });
    if (response.ok) {
      window.location.href = '/';
    }
  } catch (err) {
    console.error(err);
  }
};

const accordion = (e) => {
  if (e.target.className.split(' ')[0] === 'fa-angle-down') {
    e.target.parentElement.children[2].className = 'accordion hidden';
    switch (e.target.parentElement.children[1].textContent) {
      case 'Categories':
        e.target.className =
          'fa-angle-up fa-solid absolute top-1.5 left-44 lg:left-24';
        break;
      case 'Colors':
        e.target.className =
          'fa-angle-up fa-solid absolute top-1.5 left-40 lg:left-14';
        break;
      case 'Items':
        e.target.className =
          'fa-angle-up fa-solid absolute top-1.5 left-40 lg:left-12';
        break;
    }
  } else if (e.target.className.split(' ')[0] === 'fa-angle-up') {
    e.target.parentElement.children[2].className = 'accordion';
    switch (e.target.parentElement.children[1].textContent) {
      case 'Categories':
        e.target.className =
          'fa-angle-down fa-solid absolute top-1.5 left-44 lg:left-24';
        break;
      case 'Colors':
        e.target.className =
          'fa-angle-down fa-solid absolute top-1.5 left-40 lg:left-14';
        break;
      case 'Items':
        e.target.className =
          'fa-angle-down fa-solid absolute top-1.5 left-40 lg:left-12';
        break;
    }
  }
};

const btnRouter = (e) => {
  switch (e.target.className.split(' ')[0]) {
    case 'edit':
      loadEdit(e);
      break;
    case 'leftBtn':
      quantityDown(e);
      break;
    case 'rightBtn':
      quantityUp(e);
      break;
    case 'deleteBtn':
      removeCard(e);
      break;
    case 'saveBtn':
      saveChoice(e);
      break;
    case 'addItem':
      redirectToItemPage(e);
      break;
  }
};

init();
document.querySelector('#logOutButton').addEventListener('click', logout);

x.addEventListener('click', () => {
  hidden.setAttribute('class', 'hidden');
});
