import debounce from 'lodash.debounce';
import '../side-bar/supportCreateList';
import '../side-bar/supportSwiper';
import { createCardBook } from './shopping-list-markup';
// import { createCardBook } from './shopping-list';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  info: {
    background: '#4F2EE8',
    notinflixIconColor: '#fff',
  },
});

const cardWithImg = document.querySelector('.shopping-cart-is-empty');
const listWithBoks = document.querySelector('.listWithBoks');

let MobilViveport = 375;
// let DestopViveport = 768;

//Інфо з Локального сховища
const savedSettings = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));

function chunkArray(myArray, chunk_size) {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

let viewportWidth = document.documentElement.clientWidth;

shoppingListPagination();

export function shoppingListPagination() {
  if (!savedSettings || savedSettings.length === 0) {
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
  } else if (savedSettings.length > 0) {
    controllOfViewport(viewportWidth);
  }
  return;
}

/// Перевірка на ширину вюпорта
function controllOfViewport(param) {
  console.log('param:', param);
  let booksSommKommer = savedSettings.length;

  if (param > MobilViveport) {
    let perPage = 3;
    let buttonsPerPage = 3;
    removeDefaultPage(booksSommKommer, perPage, buttonsPerPage);
    return;
  } else if (param <= MobilViveport) {
    let perPage = 2;
    let buttonsPerPage = 4;
    removeDefaultPage(booksSommKommer, perPage, buttonsPerPage);
    return;
  }
}

//Функція що готує сторінку до рендирингу в залежності вюпорту дає кількість кнопок
function removeDefaultPage(allBoks, itemsPerPage, visiblePages) {
  let thisBooks = savedSettings.length;
  let result = chunkArray(savedSettings, itemsPerPage);
  let allPages = result.length;

  removeImg();
  renderMarkup(result[0]);

  if (savedSettings.length > 3) {
    const container = document.getElementById('pagination');

    const options = {
      totalItems: `${allBoks}`,
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
          listWithBoks.innerHTML = '';
          renderMarkup(result[i - 1]);
        }
      }
    }
  }
}

//Функція що рендирить сторінку
function renderMarkup(books) {
  const cardsMarkup = createCardBook(books);
  listWithBoks.insertAdjacentHTML('beforeend', cardsMarkup);
}
//Функція що очищає сторінку якщо корзина пуста
function removeImg() {
  cardWithImg.innerHTML = '';
}
//----------------------------------------------------------------
function addEventListenerWindow() {
  window.addEventListener('resize', debounce(widthHandler, 250));
}

function widthHandler(event) {
  controllInLocalStorage();
}
