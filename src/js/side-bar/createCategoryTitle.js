import { BooksApiService } from '../api/booksApiService';
export { drawCategoryTitle };

const booksApiService = new BooksApiService();
const categoryTitle = document.querySelector('.home-collection__title');

async function drawCategoryTitle(categoryName) {
  try {
    await booksApiService.getCategoryBooks(categoryName);
    title = categoryName.split(' ');
    const titleLast = title.pop();
    const titleFirst = title.join(' ');
    categoryTitle.innerHTML = `${titleFirst}<span class="home-collection__title--last-word" style = "color: #4f2ee8"> ${titleLast}</span>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to draw category title');
  }
}
