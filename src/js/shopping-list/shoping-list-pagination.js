import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';

// import '../side-bar/supportCreateList';
// import '../side-bar/supportSwiper';

import { createCardsMarkup } from './shopping-list-markup';

import { notifyInit } from './shoping-list-utils';
import { emptyShopingListNotify } from './shoping-list-utils';

const Viewport = {
  mobile_S: 320,
  mobile_M: 375,
  mobile_L: 425,
  tablet: 768,
  laptop: 1024,
  laptop_L: 1440,
  desktop_4K: 2560,
};

let currentViewport = document.documentElement.clientWidth;
let previousViewport = currentViewport;

const defaultTextRef = document.querySelector('.shopping-cart-is-empty');
const cardsContainer = document.querySelector('.books__list');

function createShoppingList() {
  let shoppingList = [];

  try {
    shoppingList = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to parse data from localStorage');
  }

  if (!shoppingList || shoppingList.length === 0) {
    emptyShopingListNotify();
  } else {
    shoppingListPagination(shoppingList);
  }
}

function shoppingListPagination(shoppingList) {
  const paginationParameters = calculatePaginationParameters();
  const listOfPages = createListOfPages(shoppingList, paginationParameters);
  console.log('listOfPages:', listOfPages);
}

function calculatePaginationParameters() {
  console.log('change');

  let itemsPerPage;
  let buttonsPerPage;

  switch (currentViewport) {
    case Viewport.laptop_L:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case Viewport.tablet:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case Viewport.mobile_M:
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
  console.log('paginationParameters:', paginationParameters);
  return paginationParameters;
}

function createListOfPages(shoppingList, paginationParameters) {
  const { itemsPerPage, buttonsPerPage } = paginationParameters;

  const listOfPages = [];
  for (let i = 0; i < shoppingList.length; i += itemsPerPage) {
    listOfPages.push(shoppingList.slice(i, i + itemsPerPage));
  }
  return listOfPages;
}

//----------------------------------------------------------------
notifyInit();
createShoppingList();
addEventListenerWindow();
//----------------------------------------------------------------
function addEventListenerWindow() {
  window.addEventListener('resize', debounce(viewporthHandler, 250));
}

function viewporthHandler(event) {
  currentViewport = document.documentElement.clientWidth;

  if (currentViewport >= Viewport.laptop_L) {
    currentViewport = Viewport.laptop_L;
  } else if (currentViewport >= Viewport.tablet) {
    currentViewport = Viewport.tablet;
  } else {
    currentViewport = Viewport.mobile_M;
  }

  if (previousViewport != currentViewport) {
    createShoppingList();
    previousViewport = currentViewport;
  }
}
