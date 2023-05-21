import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';

// import '../side-bar/supportCreateList';
// import '../side-bar/supportSwiper';

import { createCardsMarkup } from './shopping-list-markup';

import { notifyInit } from './shoping-list-utils';
import { emptyShoppingListNotify } from './shoping-list-utils';

import {
  ViewportConst,
  emptyShoppingPage,
  cardsContainer,
  paginationTemplate,
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
  renderShoppingListCurrentPage(paginatedShoppingList, paginationParameters);
}

function clearEmptyShoppingPage() {
  emptyShoppingPage.innerHTML = '';
}

function renderShoppingListCurrentPage(
  paginatedShoppingList,
  paginationParameters
) {
  console.log('paginatedShoppingList.length:', paginatedShoppingList.length);
  // console.log('paginationParameters:', paginationParameters);
  // console.log('paginatedShoppingList:', paginatedShoppingList);

  if (paginatedShoppingList.length < 2) {
    console.log('One Page');
    const cardsMarkup = createCardsMarkup(paginatedShoppingList[0]);
    cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);
  } else {
    console.log('Some pages');

    const paginationOptions = {
      totalItems: paginatedShoppingList.length,
      itemsPerPage: paginationParameters.itemsPerPage,
      buttonsPerPage: paginationParameters.buttonsPerPage,
      page: 1,
      centerAlign: false,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: paginationTemplate,
    };

    const pagination = new Pagination(cardsContainer, paginationOptions);
    // pagination.on('afterMove', ({ createPage }) => createPage(page));

    // const cardsMarkup = createCardsMarkup(paginatedShoppingList[1]);
    // cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);
  }
}

// function createPage(page) {
//   for (let i = 1; i <= page; i += 1) {
//     if (page === i) {
//       cardsContainer.innerHTML = '';
//       renderMarkup(result[i - 1]);
//       const cardsMarkup = createCardsMarkup(paginatedShoppingList[1]);
//       cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);
//     }
//   }
// }

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
    case ViewportConst.desktop_4K:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case ViewportConst.laptop_L:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case ViewportConst.laptop:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case ViewportConst.tablet:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case ViewportConst.mobile_L:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    case ViewportConst.mobile_M:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    case ViewportConst.mobile_S:
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

  if (currentViewport >= ViewportConst.desktop_4K) {
    currentViewport = ViewportConst.desktop_4K;
  } else if (currentViewport >= ViewportConst.laptop_L) {
    currentViewport = ViewportConst.laptop_L;
  } else if (currentViewport >= ViewportConst.laptop) {
    currentViewport = ViewportConst.laptop;
  } else if (currentViewport >= ViewportConst.tablet) {
    currentViewport = ViewportConst.tablet;
  } else if (currentViewport >= ViewportConst.mobile_L) {
    currentViewport = ViewportConst.mobile_L;
  } else if (currentViewport >= ViewportConst.mobile_M) {
    currentViewport = ViewportConst.mobile_M;
  } else {
    currentViewport = ViewportConst.mobile_S;
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
