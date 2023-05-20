import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';

// import '../side-bar/supportCreateList';
// import '../side-bar/supportSwiper';

import { createCardsMarkup } from './shopping-list-markup';

import { notifyInit } from './shoping-list-utils';
import { emptyShopingListNotify } from './shoping-list-utils';
import { addEventListenerWindow } from './shoping-list-utils';
import { calculatePaginationParameters } from './shoping-list-utils';

const defaultTextRef = document.querySelector('.shopping-cart-is-empty');
const cardsContainer = document.querySelector('.books__list');

export function createShoppingList() {
  const shoppingList = getSoppingList();

  if (!shoppingList || shoppingList.length === 0) {
    emptyShopingListNotify();
  } else {
    shoppingListPagination(shoppingList);
  }
}

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

function shoppingListPagination(shoppingList) {
  const paginationParameters = calculatePaginationParameters();
  const listOfPages = createListOfPages(shoppingList, paginationParameters);
  console.log('paginationParameters:', paginationParameters);
  console.log('listOfPages:', listOfPages);
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
