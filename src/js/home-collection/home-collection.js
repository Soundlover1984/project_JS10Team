import { BooksApiService } from '../api/booksApiService';
import { createFullMarkup } from './home-collection-markup';
import { createOneBookMarkup } from './home-collection-oneBookMarkup';
import { openModal } from './../book-modal/modal';

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
    // addEventListenerForBook();
    addEventListenerForButton();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

async function drawCategoryBooks(categoryName) {
  try {
    const books = await booksApiService.getCategoryBooks(categoryName);
    console.log('books:', books);
    const markup = books.map(book => createOneBookMarkup(book)).join('');

    markupContainer.innerHTML = `
      <h2 class="home-collection__title">${books[0].list_name}</h2>
      <ul class="home-collection__categories-list--oneCategory">
          ${markup}
      </ul>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}

export { drawTopBooks };

//=====================================
drawTopBooks();
// drawCategoryBooks('Combined Print and E-Book Nonfiction');
// getCategory('Young Adult Paperback Monthly');
//=====================================

function addEventListenerForButton() {
  const elemRef = document.querySelectorAll('.category');
  elemRef.forEach(elem => {
    elem.addEventListener('click', buttonHandler);
  });
}

function buttonHandler(event) {
  const elButton = event.target;
  const categoryName =
    elButton.parentNode.querySelector('.category__title').textContent;

  console.log(categoryName);
  drawCategoryBooks(categoryName);
}

//------------------------------------------------------------
async function drawCategoryTitle(categoryName) {
  try {
    const books = await booksApiService.getCategoryBooks(categoryName);
    title = categoryName.split(' ');
    const titleLast = title.pop();
    const titleFirst = title.join(' ');
    categoryTitle.innerHTML = `${titleFirst}<span class="title_last-word" style = "color: #4f2ee8"> ${titleLast}</span>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to draw category title');
  }
}

//============================
// const booksApiService = new BooksApiService();
async function test() {
  try {
    // console.log(await booksApiService.getCategoryList());
    // console.log(await booksApiService.getTopBooks());
    // console.log(await booksApiService.getCategoryBooks('Business Books'));
    // console.log(await booksApiService.getBookOnId('643282b2e85766588626a0de'));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to draw category title');
  }
}

test();
