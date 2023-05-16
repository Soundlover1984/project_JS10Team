import { BooksApiService } from '../api/booksApiService';
import { createFullMarkup } from './home-collection-markup';
import { createOneBookMarkup } from './home-collection-oneBookMarkup';
// import { openModal } from './../book-modal/modal';

const markupContainer = document.querySelector('.home-collection');
const booksApiService = new BooksApiService();

async function drawTopBooks() {
  try {
    const categories = await booksApiService.getTopBooks();
    markupContainer.innerHTML = `
          <h1 class="home-collection__h1">title h1</h1>
          <h2 class="home-collection__title">Best Sellers Books</h2>
          <ul class="home-collection__categories-list--topBooks">
              ${createFullMarkup(categories)}
          </ul>
          `;
    coloriseCategoryTitle();
    addEventListenerForButton();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

async function drawCategoryBooks(categoryName) {
  try {
    booksApiService.selectedCategory = categoryName;
    const books = await booksApiService.getCategoryBooks();
    const markup = books.map(book => createOneBookMarkup(book)).join('');

    markupContainer.innerHTML = `
      <h2 class="home-collection__title">${books[0].list_name}</h2>
      <ul class="home-collection__categories-list--oneCategory">
          ${markup}
      </ul>`;
    coloriseCategoryTitle();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}

export { drawTopBooks };
export { drawCategoryBooks };

//=====================================
// drawTopBooks();
// drawCategoryBooks(categoryName);
//=====================================

function addEventListenerForButton() {
  const elem = document.querySelector(
    '.home-collection__categories-list--topBooks'
  );
  elem.addEventListener('click', buttonHandler);
}

function buttonHandler(event) {
  const elButton = event.target;
  const categoryName =
    elButton.parentNode.querySelector('.category__title').textContent;
  drawCategoryBooks(categoryName);
}

//------------------------------------------------------------
async function coloriseCategoryTitle() {
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

//============================
// const booksApiService = new BooksApiService();
async function test() {
  try {
    // booksApiService.selectedCategory = 'Audio Nonfiction';
    // getCategoryBooks('Trade Fiction Paperback');
    // console.log(await booksApiService.getCategoryList());
    // console.log(await booksApiService.getTopBooks());
    // console.log(await booksApiService.getCategoryBooks());
    // console.log(await booksApiService.getBookOnId());
  } catch (error) {
    console.error(error);
    throw new Error('Failed to draw category title');
  }
}

// test();
//========================================
drawTopBooks();
// drawCategoryBooks(categoryName);
//----------------------------------------
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
