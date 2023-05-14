import { BooksApiService } from '../api/booksApiService';
// import { createAllMarkup } from './homeCollection-all';
// import { createCategoryMarkup } from './homeCollection-category';
// import { createBookMarkup } from './homeCollection-book';

const markupContainer = document.querySelector('.home-collection');
const defaultBookImage = './images/icons.svg#іcon-plug';
// const defaultBookImage = '../../images/icons.svg#іcon-plug';
const booksApiService = new BooksApiService();

async function drawTopBooks() {
  try {
    const categories = await booksApiService.getTopBooks();
    // console.log('categories', categories);

    // categories.map(category => {
    //   console.log('category', category);
    // });

    const markup = categories.map(category => {
      const markup = `
        <li class='categories__item'>
            <p class='category__title'>${category.list_name}</p>
            <ul class='category__list'>
                ${createCategoryMarkup(category.books)}
            </ul>
            <button class="more-js" type="button">see more</button>
        </li>
      `;
      // console.log('markup:', markup);
      return markup;
    });
    // console.log('markup:', markup);
    markupContainer.innerHTML = `
        & { markup };
        `;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

function createAllMarkup(collection) {
  // const {  } = collection;
  const markup = ``;
  // console.log('markup:', markup);
  return markup;
}

function createCategoryMarkup(category) {
  // const { } = category;
  const markup = category
    .map(book => {
      return `
        <li class='category-books__item'>
            <a href="/" class='category-books__link'>
                <img
                class='category-books__img'
                src='${book.book_image}'
                alt='book'
                data-id="${book._id}"
                loading="lazy"
                />
            </a>
        <h3 class='category-books__name' >${book.title}</h3>
        <p class='category-books__author'>${book.author}</p>
        </li>
    `;
    })
    .join('');
  //   console.log('markup:', markup);
  return markup;
}

function createBookMarkup(book) {
  const { author, title, list_name, book_image = defaultBookImage } = book;
  return `  
    <li class="book">
        <div class="book__image-frame">
            <img class="book__image" src="${book_image}" ></img>
        </div>
        <p class="book__title">${title}</p>
        <p class="book__author">${author}</p> 
    </li> 
    `;
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
