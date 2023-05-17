import debounce from 'lodash.debounce';
import { BooksApiService } from '../api/booksApiService';
import { createFullMarkup } from './home-collection-markup_old';
import { createOneBookMarkup } from './home-collection-oneBookMarkup__old';
import { openModal } from '../book-modal/modal';

export let c = 1;
const markupContainer = document.querySelector('.home-collection');
const booksApiService = new BooksApiService();

function sectionLoad() {
  // drawTopBooks();
  // drawCategoryBooks(categoryName);
  // addEventListenerForBook();
  // handleWindowResize();
  // window.addEventListener('resize', debounce(handleWindowResize, 50));
}

export async function drawTopBooks() {
  try {
    let categories = await booksApiService.getTopBooks();

    markupContainer.innerHTML = `
          <h1 class="home-collection__h1">title h1</h1>
          <h2 class="home-collection__title">Best Sellers Books</h2>
          <ul class="home-collection__categories-list--topBooks">
              ${createFullMarkup(categories)}
          </ul>
          `;
    colorizeCategoryTitle();
    addEventListenerForButton();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

export async function drawCategoryBooks(categoryName) {
  try {
    booksApiService.selectedCategory = categoryName;
    const books = await booksApiService.getCategoryBooks();
    const markup = books.map(book => createOneBookMarkup(book)).join('');

    markupContainer.innerHTML = `
      <h2 class="home-collection__title">${books[0].list_name}</h2>
      <ul class="home-collection__categories-list--oneCategory">
          ${markup}
      </ul>`;
    colorizeCategoryTitle();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}

function colorizeCategoryTitle() {
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

function addEventListenerForButton() {
  const elem = document.querySelector(
    '.home-collection__categories-list--topBooks'
  );
  elem.addEventListener('click', buttonMoreHandler);
}

function buttonMoreHandler(event) {
  const elButton = event.target;
  if (elButton.className == 'category__button') {
    const categoryName =
      elButton.parentNode.querySelector('.category__title').textContent;
    drawCategoryBooks(categoryName);
  }
}

function addEventListenerForBook() {
  const elem = document.querySelector('.home-collection');
  elem.addEventListener('click', bookDetailHandler);
}

function bookDetailHandler(event) {
  const bookEl = event.target.closest('.book__link');
  if (bookEl) {
    const bookId = bookEl.dataset.id;
    console.log('bookId:', bookId);
    openBookDetail(bookId);
  }
}

async function openBookDetail(bookId) {
  try {
    booksApiService.bookId = bookId;
    openModal();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to open book detail');
  }
}

export function handleWindowResize() {
  const currentWidth = window.innerWidth;
  console.log('currentWidth:', currentWidth);

  if (currentWidth < 768) {
    return 1;
  } else if (currentWidth >= 768 && currentWidth < 1440) {
    return 3;
  } else {
    return 5;
  }
}

sectionLoad();
//------------------------------------------------------------

//========================================
// categoryName:

// 'Advice How-To and Miscellaneous';
// 'Picture Books';
// 'Mass Market Monthly';
//  'Hardcover Fiction';
//  'Young Adult Paperback Monthly';
//  'Middle Grade Paperback Monthly';
//  'Business Books';
//  'Paperback Nonfiction';
//  'Combined Print and E-Book Fiction';
//  'Young Adult Hardcover';
//  'Audio Fiction';
//  'Trade Fiction Paperback';
//  'Combined Print and E-Book Nonfiction';
//  'Childrens Middle Grade Hardcover';
//  'Hardcover Nonfiction';
//  'Series Books';
//  'Audio Nonfiction';
//  'Graphic Books and Manga';
