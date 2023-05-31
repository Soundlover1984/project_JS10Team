import { BooksApiService } from '../api/booksApiService';
import { createFullMarkup } from './home-collection-markup';
import { createOneBookMarkup } from './home-collection-markup';

import { colorizeCategoryTitle } from './home-collection-utils';
import { addEventListenerButtonMore } from './home-collection-utils';
import { addEventListenerBookLink } from './home-collection-utils';
import { amountOfBooks } from './home-collection-utils';
import { addEventListenerWindow } from './home-collection-utils';
import { limitBookHandler } from './home-collection-utils';
import { notifyInit } from './home-collection-utils';
import { noDataNotify } from './home-collection-utils';

//=======================================================================================
// sectionLoad() - load functions on this page ("main" function)

// getAndParseTopBooks(amountOfBooks) - fetch and render "ALL CATEGORIES" (or "Top Books")
// getAndParseCategoryBooks(categoryName, amountOfBooks) - fetch an render one category
// (amountOfBooks = 100)
//=======================================================================================

const markupContainer = document.querySelector('.home-collection');

function sectionLoad() {
  notifyInit();
  addEventListenerWindow();
  limitBookHandler();
  getAndParseTopBooks(amountOfBooks);
  // getAndParseCategoryBooks('Childrens Middle Grade Hardcover', 100); // amountOfBooks = 100
}

export async function getAndParseTopBooks(amountOfBooks) {
  try {
    const booksApiService = new BooksApiService();
    const topBooksFromBack = await booksApiService.getTopBooks();
    if (topBooksFromBack.length != 0) {
      const topBooksLimited = limitBooksInTopBooks(
        topBooksFromBack,
        amountOfBooks
      );
      renderTopBooks(topBooksLimited);
      addEventListenerBookLink();
      addEventListenerButtonMore();
    } else {
      document.querySelector('.home-collection__title').textContent = '';
      noDataNotify();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

export async function getAndParseCategoryBooks(
  categoryName,
  amountOfBooks = 100
) {
  try {
    const booksApiService = new BooksApiService();
    booksApiService.selectedCategory = categoryName;
    const booksFromBack = await booksApiService.getCategoryBooks();
    const books = limitBooksInBooks(booksFromBack, amountOfBooks);
    if (books.length != 0) {
      renderBooks(books);
    } else {
      document.querySelector('.home-collection__title').textContent = '';
      noDataNotify();
      getAndParseTopBooks(amountOfBooks);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}

function limitBooksInTopBooks(topBooks, amountOfBooks) {
  topBooks.map(category => {
    category.books = limitBooksInBooks(category.books, amountOfBooks);
  });
  return topBooks;
}

function renderTopBooks(topBooks) {
  markupContainer.innerHTML = `
          <h2 class="home-collection__title">Best Sellers Books</h2>
          <ul class="home-collection__categories-list--topBooks">
              ${createFullMarkup(topBooks)}
          </ul>
          `;
  colorizeCategoryTitle();
  addEventListenerBookLink();
}

function limitBooksInBooks(books, amountOfBooks) {
  const limitedBooks = books.slice(0, amountOfBooks);
  return limitedBooks;
}

function renderBooks(books) {
  const markup = books.map(book => createOneBookMarkup(book)).join('');
  markupContainer.innerHTML = `
      <h2 class="home-collection__title">${books[0].list_name}</h2>
      <ul class="home-collection__categories-list--oneCategory">
          ${markup}
      </ul>`;
  colorizeCategoryTitle();
}
//------------------------------------
sectionLoad();
