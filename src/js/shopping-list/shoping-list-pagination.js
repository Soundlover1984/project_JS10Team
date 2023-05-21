import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';

// import '../side-bar/supportCreateList';
// import '../side-bar/supportSwiper';

import { createCardsMarkup } from './shopping-list-markup';

import { notifyInit } from './shoping-list-utils';
import { emptyShoppingListNotify } from './shoping-list-utils';
import { paginationTemplate } from './shoping-list-utils';
import {
  viewportConst,
  emptyShoppingPage,
  cardsContainer,
} from './shoping-list-utils';

let previousViewport = getCurrentViewport();

export function createShoppingList() {
  const shoppingList = getSoppingList();

  if (!shoppingList || shoppingList.length === 0) {
    emptyShoppingListNotify();
  } else {
    shoppingListPagination(shoppingList);
  }
}

function shoppingListPagination(shoppingList) {
  clearEmptyShoppingPage();
  const currentViewport = getCurrentViewport();
  const paginationParameters = calculatePaginationParameters(currentViewport);
  const paginatedShoppingList = createPaginatedShoppingList(
    shoppingList,
    paginationParameters
  );
  renderShoppingListCurrentPage(
    shoppingList.length,
    paginatedShoppingList,
    paginationParameters
  );
}

function clearEmptyShoppingPage() {
  emptyShoppingPage.innerHTML = '';
}

function renderShoppingListCurrentPage(
  totalItemsAmount,
  paginatedShoppingList,
  paginationParameters
) {
  console.log('paginatedShoppingList.length:', paginatedShoppingList.length);
  // console.log('paginationParameters:', paginationParameters);
  // console.log('paginatedShoppingList:', paginatedShoppingList);

  const paginationContainer = document.getElementById('pagination');

  const paginationOptions = {
    totalItems: totalItemsAmount,
    itemsPerPage: paginationParameters.itemsPerPage,
    visiblePages: paginationParameters.buttonsPerPage,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: paginationTemplate,
    usageStatistics: false,
  };

  const pagination = new Pagination(paginationContainer, paginationOptions);
  pagination.on('afterMove', ({ page }) =>
    renderShoppingCardsPage(paginatedShoppingList[page])
  );

  // pagination.on('afterMove', ({ page }) => console.log(page));

  renderShoppingCardsPage(paginatedShoppingList[1]);
}

function renderShoppingCardsPage(shoppingListPage) {
  const cardsMarkup = createCardsMarkup(shoppingListPage);
  emptyShoppingPage.innerHTML = '';
  cardsContainer.innerHTML = cardsMarkup;
  // cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);
}

//----------------------------------------------------------------

function getSoppingList() {
  let shoppingList = [];
  try {
    shoppingList = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to parse data from localStorage');
  }
  return shoppingList;
}

function getCurrentViewport() {
  let currentViewport = document.documentElement.clientWidth;
  return currentViewport;
}

function calculatePaginationParameters(currentViewport) {
  let itemsPerPage;
  let buttonsPerPage;

  switch (currentViewport) {
    case viewportConst.desktop_4K:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case viewportConst.laptop_L:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case viewportConst.laptop:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case viewportConst.tablet:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case viewportConst.mobile_L:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    case viewportConst.mobile_M:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    case viewportConst.mobile_S:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    default:
      itemsPerPage = 4;
      buttonsPerPage = 2;
  }

  const paginationParameters = {
    itemsPerPage: itemsPerPage,
    buttonsPerPage: buttonsPerPage,
  };
  return paginationParameters;
}

function createPaginatedShoppingList(shoppingList, paginationParameters) {
  const { itemsPerPage, buttonsPerPage } = paginationParameters;

  const paginatedShoppingList = [];
  for (let i = 0; i < shoppingList.length; i += itemsPerPage) {
    paginatedShoppingList.push(shoppingList.slice(i, i + itemsPerPage));
  }
  return paginatedShoppingList;
}
//----------------------------------------------------------------

function addEventListenerWindow() {
  window.addEventListener('resize', debounce(viewporthHandler, 250));
}

function viewporthHandler(event) {
  let currentViewport = getCurrentViewport();

  if (currentViewport >= viewportConst.desktop_4K) {
    currentViewport = viewportConst.desktop_4K;
  } else if (currentViewport >= viewportConst.laptop_L) {
    currentViewport = viewportConst.laptop_L;
  } else if (currentViewport >= viewportConst.laptop) {
    currentViewport = viewportConst.laptop;
  } else if (currentViewport >= viewportConst.tablet) {
    currentViewport = viewportConst.tablet;
  } else if (currentViewport >= viewportConst.mobile_L) {
    currentViewport = viewportConst.mobile_L;
  } else if (currentViewport >= viewportConst.mobile_M) {
    currentViewport = viewportConst.mobile_M;
  } else {
    currentViewport = viewportConst.mobile_S;
  }

  if (previousViewport != currentViewport) {
    createShoppingList();
    previousViewport = currentViewport;
  }
}

//----------------------------------------------------------------
notifyInit();
createShoppingList();
addEventListenerWindow();
//----------------------------------------------------------------
