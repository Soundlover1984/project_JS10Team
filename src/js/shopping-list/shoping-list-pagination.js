import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';

// import '../side-bar/supportCreateList';
// import '../side-bar/supportSwiper';

import { createCardsMarkup } from './shopping-list-markup';

import { notifyInit } from './shoping-list-utils';
import { emptyShopingListNotify } from './shoping-list-utils';

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
  createChunkOfBooks(shoppingList);
  calculatePages();
}

function createChunkOfBooks(shoppingList) {
  console.log('shoppingList:', shoppingList);
}

function calculatePages() {}

//----------------------------------------------------------------
notifyInit();
createShoppingList();
//----------------------------------------------------------------
// function addEventListenerWindow() {
//   window.addEventListener('resize', debounce(widthHandler, 250));
// }

// function widthHandler(event) {
//   controllInLocalStorage();
// }
