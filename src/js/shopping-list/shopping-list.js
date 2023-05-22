import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';
import { createCardsMarkup } from './shopping-list-markup';
import { notifyInit } from './shoping-list-const';
import { emptyShoppingListNotify } from './shoping-list-const';
import { viewportConst } from './shoping-list-const';

// import '../side-bar/supportCreateList';
// import '../side-bar/supportSwiper';

//----------------------------------------------------------------

const emptyShoppingPage = document.querySelector('.shopping-cart-is-empty');
const cardsContainer = document.querySelector('.books__list');
const paginationBarContainer = document.getElementById('pagination');

let previousViewport = getCurrentViewport();

function load() {
  notifyInit();
  drawShoppingCardsList();
  addEventListenerWindow();
}

export function drawShoppingCardsList() {
  const shoppingList = getSoppingList();

  if (!shoppingList || shoppingList.length === 0) {
    // emptyShoppingPage.classList.add('js-hidden');
    emptyShoppingPage.innerHTML = '';
    emptyShoppingListNotify();
  } else {
    // emptyShoppingPage.classList.add('js-hidden');
    emptyShoppingPage.innerHTML = '';
    shoppingListPagination(shoppingList);
  }
}

function shoppingListPagination(shoppingList) {
  const currentViewport = getCurrentViewport();
  const paginationParameters = calculatePaginationParameters(currentViewport);
  const paginatedShoppingList = createPaginatedShoppingList(
    shoppingList,
    paginationParameters.itemsPerPage
  );

  const paginationBarTemplate = {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  };

  const paginationOptions = {
    totalItems: shoppingList.length,
    itemsPerPage: paginationParameters.itemsPerPage,
    visiblePages: paginationParameters.buttonsPerPage,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: paginationBarTemplate,
    usageStatistics: false,
  };

  if (shoppingList.length <= paginationParameters.itemsPerPage) {
    paginationBarContainer.classList.add('js-hidden');
  } else {
    paginationBarContainer.classList.remove('js-hidden');
  }

  const pagination = new Pagination(paginationBarContainer, paginationOptions);
  pagination.on('afterMove', ({ page }) => {
    drawShoppingCardsPage(paginatedShoppingList[page - 1]);
  });

  let firstLoadPage = pagination.getCurrentPage();
  drawShoppingCardsPage(paginatedShoppingList[firstLoadPage - 1]);

  addEventListenerToRemove();
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

function createPaginatedShoppingList(shoppingList, itemsPerPage) {
  const paginatedShoppingList = [];
  for (let i = 0; i < shoppingList.length; i += itemsPerPage) {
    paginatedShoppingList.push(shoppingList.slice(i, i + itemsPerPage));
  }
  return paginatedShoppingList;
}

function drawShoppingCardsPage(shoppingListPage) {
  const cardsMarkup = createCardsMarkup(shoppingListPage);
  cardsContainer.innerHTML = cardsMarkup;
}

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
    drawShoppingCardsList();
    previousViewport = currentViewport;
  }
}
//----------------------------------------------------------------

async function onRemoveCard(ev) {
  if (ev.target.closest('.shop-card__delete')) {
    const bookShopCard = ev.target.closest('.shop-card');
    const bookId = bookShopCard.dataset.id;
    removeShopCard(bookShopCard);
    removeFromLocalStorage(bookId);
    drawShoppingCardsList();
  }
}

function removeShopCard(bookShopCard) {
  bookShopCard.classList.add('is-hidden');
  bookShopCard.remove();
}

function removeFromLocalStorage(id) {
  try {
    let shoppingList = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));
    let updatedShoppingList = shoppingList.filter(item => item._id != id);
    localStorage.setItem(
      'SHOPPING_LIST_KEY',
      JSON.stringify(updatedShoppingList)
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to parse data from localStorage');
  }

  if (JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY')).length == 0) {
    localStorage.removeItem('SHOPPING_LIST_KEY');
  }
}

function addEventListenerToRemove() {
  const btnRemove = document.querySelector('.books__list');
  btnRemove.addEventListener('click', onRemoveCard);
}

//----------------------------------------------------------------
load();
