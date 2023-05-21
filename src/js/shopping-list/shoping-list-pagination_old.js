import debounce from 'lodash.debounce';
import '../side-bar/supportCreateList';
import '../side-bar/supportSwiper';
import { createCardsMarkup } from './shopping-list-markup';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  info: {
    background: '#4F2EE8',
    notinflixIconColor: '#fff',
  },
});

let MobilViveport = 375;
// let DestopViveport = 768;

const defaultTextRef = document.querySelector('.shopping-cart-is-empty');
const cardsContainer = document.querySelector('.listWithBoks');

const shoppingList = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));

// if (shoppingList) {
// const shoppingListLength = shoppingList.length;
// }

// let viewportWidth = document.documentElement.clientWidth;

function shoppingListPagination(shoppingList) {
  const shoppingListLength = shoppingList.length;
  if (!shoppingList || shoppingListLength === 0) {
    return Notiflix.Notify.info(
      'Your shopping list is empty. Please add a book',
      {
        width: '500px',
        position: 'center-center',
        fontSize: '20px',
        messageMaxLength: 500,
        opacity: 0.6,
        cssAnimation: true,
        cssAnimationDuration: 1000,
        cssAnimationStyle: 'zoom',
        clickToClose: true,
        showOnlyTheLastOne: true,
      }
    );
  } else if (shoppingListLength > 0) {
    // controlOfViewport(viewportWidth);
    renderPage(shoppingListLength, itemsPerPage, buttonsPerPage);
  }
  return;
}

function controlOfViewport(param) {
  if (param <= MobilViveport) {
    itemsPerPage = 2;
    buttonsPerPage = 4;
  } else {
    itemsPerPage = 3;
    buttonsPerPage = 3;
  }
  renderPage(shoppingListLength, itemsPerPage, buttonsPerPage);
  return;
}

function createChunkOfBooks(fullList, chunkSize) {
  const arrayLength = fullList.length;
  const oneChunk = [];

  for (let i = 0; i < arrayLength; i += chunkSize) {
    oneChunk.push(fullList.slice(i, i + chunkSize));
  }
  return oneChunk;
}

function renderPage(totalItems, itemsPerPage, buttonsPerPage) {
  removeDefaultText();

  let chunks = createChunkOfBooks(shoppingList, itemsPerPage);
  renderMarkup(chunks[0]);

  if (shoppingListLength > 3) {
    const paginationContainer = document.querySelector('tui-pagination');

    const options = {
      totalItems: totalItems,
      itemsPerPage: itemsPerPage,
      buttonsPerPage: buttonsPerPage,
      page: 1,
      centerAlign: false,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
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
      },
    };

    const pagination = new Pagination(paginationContainer, options);
    pagination.on('afterMove', ({ createPage }) => createPage(page));
  }
}

function createPage(page) {
  for (let i = 1; i <= page; i += 1) {
    if (page === i) {
      cardsContainer.innerHTML = '';
      renderMarkup(result[i - 1]);
    }
  }
}

function removeDefaultText() {
  defaultTextRef.innerHTML = '';
}

function renderMarkup(books) {
  const cardsMarkup = createCardsMarkup(books);
  cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);
}

//----------------------------------------------------------------
function addEventListenerWindow() {
  window.addEventListener('resize', debounce(widthHandler, 250));
}

function widthHandler(event) {
  controllInLocalStorage();
}

shoppingListPagination(shoppingList);
