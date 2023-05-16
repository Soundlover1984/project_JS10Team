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
// drawTopBooks();
// drawCategoryBooks('Audio Fiction');
getCategory('Young Adult Paperback Monthly');
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
  getCategory(categoryName);
}

async function getCategory(categoryName) {
  try {
    const listSelectCategories = await booksApiService.getCategoryList();
    console.log('listSelectCategories:', listSelectCategories);
    booksApiService.selectedCategory = categoryName;
    const listSelectCategoryBooks = await booksApiService.getCategoryBooks();
    console.log(listSelectCategoryBooks);
    // renderSelectBooks(listSelectCategoryBooks);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category list');
  }
}

async function renderSelectBooks(books) {
  await drawCategoryTitle(booksApiService.selectedCategory);

  categoryList.innerHTML = '';

  if (books.length === 0) {
    Notiflix.Notify.info(
      'Unfortunately, nothing was found. Please try changing the parameters and performing a new search.',
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
  } else {
    const oneBook = createOneCategoryMarkup(books);
    categoryList.insertAdjacentHTML('beforeend', oneBook);
  }
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

async function getTopBooksAndSetBookId() {
  try {
    const topBooks = await booksApiService.getTopBooks();
    if (topBooks.length > 0) {
      const bookId = topBooks[0]._id;
      booksApiService.setBookId(bookId); // Передача значення bookId до BooksApiService
    }
  } catch (error) {
    console.error(error);
  }
}

booksApiService.getBookOnId(id) {

};