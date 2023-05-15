import { BooksApiService } from '../api/booksApiService';
import { createFullMarkup } from './home-collection-markup';
import { createOneBookMarkup } from './home-collection-oneBookMarkup';

const markupContainer = document.querySelector('.home-collection');
const booksApiService = new BooksApiService();

async function drawTopBooks() {
  try {
    const categories = await booksApiService.getTopBooks();
    markupContainer.innerHTML = `
        <h1 class="home-collection__title">title h1</h1>
        <h2 class="home-collection__subtitle">Best Sellers Books</h2>
        <ul class="home-collection__categories-list--topBooks"> 
            ${createFullMarkup(categories)}
        </ul>
        `;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

//=====================================
drawCategoryBooks();
// drawTopBooks();
// drawBookDetails();
//=====================================

async function drawCategoryBooks() {
  try {
    const books = await booksApiService.getCategoryBooks();
    console.log('books:', books);
    const markup = books.map(book => createOneBookMarkup(book)).join('');

    markupContainer.innerHTML = `
      <h1 class="home-collection__title">title h1</h1>
    <h2 class="home-collection__title">${books[0].list_name}</h2>
    <h3 class="home-collection__subtitle">${books[0].list_name}</h3>
    <ul class="home-collection__categories-list--oneCategory">
          ${markup}
      </ul>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}
