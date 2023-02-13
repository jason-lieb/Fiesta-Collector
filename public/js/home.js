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
const itemCardEl = document.querySelector('#itemCards');

const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    hidden.classList.remove('hidden');
    // alert ('Failed to log out');
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
  newSelected.textContent = selectedFilter;
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
        // itemCard.style.display = 'none';
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
  // const categories = [];
  // if (document.getElementById('categoryFilters')) {
  //   const categoriesDiv = document.getElementById('categoryFilters').children;
  //   for (let i = 0; i < categoriesDiv.length; i++) {
  //     categories.push(categoriesDiv[i].textContent);
  //   }
  // }
  // global.categories = categories;

  // const colors = [];
  // if (document.getElementById('colorFilters')) {
  //   const colorsDiv = document.getElementById('colorFilters').children;
  //   for (let i = 0; i < colorsDiv.length; i++) {
  //     colors.push(colorsDiv[i].textContent);
  //   }
  // }
  // global.colors = colors;

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
};

const loadEdit = (e) => {
  const itemCardText = e.target.parentElement;
  itemCardText.removeChild(itemCardText.children[3]);
  const deletebtn = document.createElement('i');
  deletebtn.className = 'deleteBtn fa-solid fa-xmark absolute text-2xl text-zinc-600 ml-3 mt-3 hover:text-red-600';
  const left = document.createElement('i');
  left.className = 'leftBtn fa-solid fa-chevron-left absolute ml-[13px] mt-[65px] text-zinc-600 hover:text-orange-400';
  const right = document.createElement('i');
  right.className = 'rightBtn fa-solid fa-chevron-right absolute ml-[245px] mt-[65px] text-zinc-600 hover:text-orange-400';
  const savebtn = document.createElement('i');
  savebtn.className = 'saveBtn fa-solid fa-floppy-disk absolute ml-[240px] mt-3 text-2xl text-zinc-600 hover:text-orange-400';
  itemCardText.appendChild(left);
  itemCardText.appendChild(right);
  const card = itemCardText.parentElement;
  card.prepend(deletebtn);
  card.prepend(savebtn);
}

const quantityUp = (e) => {

}
const quantityDown = (e) => {

}
const removeCard = async (e) => {
  const card = e.target.parentElement;
  const id = card.dataset.id;
  try {
    const response = await fetch(`/api/inventory/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    card.remove();
  } catch(err) {
    console.error(err);
  }
}
const saveChoice = (e) => {

}

init();
document.querySelector('#logOutButton').addEventListener('click', logout);
x.addEventListener('click', () => {
  hidden.setAttribute('class', 'hidden');
});
itemCardEl.addEventListener('click', (e) => {
  if (e.target.className.split(' ')[0] == 'edit') {
    loadEdit(e);
  }

  switch (e.target.className.split(' ')[0]) {
    case 'edit':
      loadEdit(e);
      break;
    case 'leftBtn':
      quantityUp(e);
      break;
    case 'rightBtn':
      quantityDown(e);
      break;
    case 'deleteBtn':
      removeCard(e);
      break;
    case 'saveBtn':
      saveChoice(e);
      break;
  }
  

});

