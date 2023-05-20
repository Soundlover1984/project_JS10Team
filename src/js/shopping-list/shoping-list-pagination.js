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

const defaultEmptyListText = document.querySelector('.shopping-cart-is-empty');
const cardsContainer = document.querySelector('.listWithBoks');

let MobilViveport = 375;
// let DestopViveport = 768;

//Інфо з Локального сховища
const localStorageShoppingList = JSON.parse(
  localStorage.getItem('SHOPPING_LIST_KEY')
);

let viewportWidth = document.documentElement.clientWidth;

export function shoppingListPagination() {
  if (!localStorageShoppingList || localStorageShoppingList.length === 0) {
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
  } else if (localStorageShoppingList.length > 0) {
    controllOfViewport(viewportWidth);
  }
  return;
}

/// Перевірка на ширину вюпорта
function controllOfViewport(param) {
  console.log('param:', param);
  let shoppingListLength = localStorageShoppingList.length;

  if (param > MobilViveport) {
    itemsPerPage = 3;
    buttonsPerPage = 3;
    removeDefaultPage(shoppingListLength, itemsPerPage, buttonsPerPage);
    return;
  } else if (param <= MobilViveport) {
    itemsPerPage = 2;
    buttonsPerPage = 4;
    removeDefaultPage(shoppingListLength, itemsPerPage, buttonsPerPage);
    return;
  }
}

function removeDefaultPage(totalItems, itemsPerPage, visiblePages) {
  const defaultEmptyText = document.querySelector('.shopping-cart-is-empty');
  defaultEmptyText.innerHTML = '';

  let chunks = createChunkOfBooks(localStorageShoppingList, itemsPerPage);
  renderMarkup(chunks[0]);

  if (localStorageShoppingList.length > 3) {
    const container = document.getElementById('pagination');

    const options = {
      totalItems: `${totalItems}`,
      itemsPerPage: `${itemsPerPage}`,
      visiblePages: `${visiblePages}`,
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

    const pagination = new Pagination(container, options);
    pagination.on('afterMove', ({ page }) => createPage(page));

    function createPage(page) {
      for (let i = 1; i <= page; i += 1) {
        if (page === i) {
          cardsContainer.innerHTML = '';
          renderMarkup(result[i - 1]);
        }
      }
    }
  }
}

function createChunkOfBooks(fullList, chunk_size) {
  const arrayLength = fullList.length;
  const oneChunk = [];

  for (let i = 0; i < arrayLength; i += chunk_size) {
    oneChunk.push(fullList.slice(i, i + chunk_size));
  }
  console.log('oneChunk:', oneChunk);
  return oneChunk;
}

//Функція що рендирить сторінку
export function renderMarkup(books) {
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

shoppingListPagination();
