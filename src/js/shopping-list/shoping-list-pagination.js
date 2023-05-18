import '../side-bar/supportCreateList';
import createCardBook from './shoppingList';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';

const cardWithImg = document.querySelector('.shopping-cart-is-empty');
const listWithBoks = document.querySelector('.listWithBoks');

//Інфо з Локального сховища
const savedSettings = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));

function chunkArray(myArray, chunk_size) {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

let allBoks = savedSettings.length;
let viewportWidth = document.documentElement.clientWidth;

function controllInLocalStorage() {
  console.log('viewportWidth', viewportWidth);
  if (savedSettings) {
    controllOfViewport(viewportWidth);
    return;
  }
  return Notiflix.Notify.info('Your shopping list is empty. Please add a book');
}

/// Перевірка на ширину вюпорта

function controllOfViewport(param) {
  let MobilViveport = 375;
  let DesctopViveport = 768;

  if (param < MobilViveport) {
    let perPage = 4;
    let buttonsPerPage = 2;

    removeDefaultPage(allBoks, perPage, buttonsPerPage);

    console.log('its mobil');
  } else if (param > DesctopViveport) {
    let perPage = 3;
    let buttonsPerPage = 3;

    removeDefaultPage(allBoks, perPage, buttonsPerPage);

    console.log('its desctop');
  }
}

function removeDefaultPage(allBoks, itemsPerPage, visiblePages) {
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
      if (page === 1) {
        listWithBoks.innerHTML = '';
        renderMarkup(result[0]);
      } else if (page === 2) {
        listWithBoks.innerHTML = '';
        renderMarkup(result[1]);
      } else if (page === 3) {
        listWithBoks.innerHTML = '';
        renderMarkup(result[2]);
      } else if (page === 4) {
        listWithBoks.innerHTML = '';
        renderMarkup(result[3]);
      }
    }
  }
}

function renderMarkup(books) {
  console.log('books', books);
  const cardsMarkup = createCardBook(books);
  listWithBoks.insertAdjacentHTML('beforeend', cardsMarkup);
}

function removeImg() {
  cardWithImg.innerHTML = '';
}

controllInLocalStorage();
