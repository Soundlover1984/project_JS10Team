import { BooksApiService } from '../api/booksApiService';
import { createHomeCollectionMarkup } from './homeCollection-markup';

const markupContainer = document.querySelector('.home-collection');
const defaultBookImage = './images/icons.svg#іcon-plug';
// const defaultBookImage = '../../images/icons.svg#іcon-plug';
const booksApiService = new BooksApiService();

async function drawTopBooks() {
  try {
    const categories = await booksApiService.getTopBooks();

    markupContainer.innerHTML = `
        <h1 class="home-collection_title">title h1</h1>
        <h2 class="home-collection_subtitle">Best Sellers Books</h2>
        <ul class=""> 
            ${createHomeCollectionMarkup(categories)}};
        </ul>
        `;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

//=====================================
// drawCategoryBooks();
drawTopBooks();
// drawBookDetails();
//=====================================

async function drawCategoryBooks() {
  try {
    const categoryBooks = await booksApiService.getCategoryBooks();
    const categoryMarkup = categoryBooks
      .map(book => createBookMarkup(book))
      .join('');

    markupContainer.innerHTML = `
  <h2 class="home-collection__title">${categoryBooks[0].list_name}</h2>
  <h3 class="home-collection__subtitle">${categoryBooks[0].list_name}</h3> 
  <ul class="home-collection__category-list">
        ${categoryMarkup}
    </ul>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}
