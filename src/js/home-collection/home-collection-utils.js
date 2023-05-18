import debounce from 'lodash.debounce';
import { BooksApiService } from '../api/booksApiService';
import { getAndParseCategoryBooks } from './home-collection';
import { getAndParseTopBooks } from './home-collection';
import { openModal } from '../book-modal/modal';

export let amountOfBooks = 5;
let amountOfBooksOld = amountOfBooks;

const booksApiService = new BooksApiService();

export function colorizeCategoryTitle() {
  try {
    const categoryTitleRef = document.querySelector('.home-collection__title');
    const categoryTitle = categoryTitleRef.textContent;

    const title = categoryTitle.split(' ');
    const titleLastWord = title.pop();
    const titleFirst = title.join(' ');

    categoryTitleRef.innerHTML = `${titleFirst}<span class="home-collection__title--last-word"> ${titleLastWord}</span>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to draw category title');
  }
}

//------------------------------------------

export function addEventListenerButtonMore() {
  const elem = document.querySelector(
    '.home-collection__categories-list--topBooks'
  );
  elem.addEventListener('click', buttonMoreHandler);
}

export function buttonMoreHandler(event) {
  const elButton = event.target;
  if (elButton.className == 'category__button') {
    const categoryName =
      elButton.parentNode.querySelector('.category__title').textContent;
    getAndParseCategoryBooks(categoryName);
  }
}

//------------------------------------------

export function addEventListenerBookLink() {
  const elem = document.querySelector('.home-collection');
  elem.addEventListener('click', bookDetailHandler);
}

function bookDetailHandler(event) {
  const bookEl = event.target.closest('.book__link');
  if (bookEl) {
    const bookId = bookEl.dataset.id;
    openBookDetail(bookId);
  }
}

async function openBookDetail(bookId) {
  try {
    openModal(bookId);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to open book detail');
  }
}

//------------------------------------------
export function addEventListenerWindow() {
  window.addEventListener('resize', debounce(limitBookHandler, 250));
}

export function limitBookHandler() {
  amountOfBooksOld = amountOfBooks;
  const currentWidth = window.innerWidth;
  amountOfBooks = getBookAmount(currentWidth);
  try {
    if (
      amountOfBooksOld != amountOfBooks &&
      document.querySelector('.home-collection__title').textContent ===
        'Best Sellers Books'
    ) {
      getAndParseTopBooks(amountOfBooks);
    }
  } catch (err) {}
}

function getBookAmount(currentWidth) {
  if (currentWidth < 768) {
    return 1;
  } else if (currentWidth >= 768 && currentWidth < 1440) {
    return 3;
  } else {
    return 5;
  }
}
