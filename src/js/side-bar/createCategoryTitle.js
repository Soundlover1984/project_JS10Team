import { BooksApiService } from '../api/booksApiService';
export { drawCategoryTitle };

const booksApiService = new BooksApiService();
const categoryTitle = document.querySelector('.home-collection__title');

async function drawCategoryTitle(name) {
  try {
    booksApiService.selectedCategory = name;
    await booksApiService.getCategoryBooks(name);
    const title = name.split(' ');
    const titleLast = title.pop();
    const titleFirst = title.join(' ');
    categoryTitle.innerHTML = `${titleFirst}<span class="home-collection__title--last-word" style = "color: #4f2ee8"> ${titleLast}</span>`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to draw category title');
  }
}
