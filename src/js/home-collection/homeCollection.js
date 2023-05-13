import { BooksApiService } from '../api/booksApiService';

const booksApiService = new BooksApiService();

async function getCategoryBooks() {
  try {
    const categoryBooks = await booksApiService.getCategoryBooks();
    renderCategory(categoryBooks);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category books');
  }
}

async function getTopBooks() {
  try {
    const topBooks = await booksApiService.getTopBooks();
    renderTopBooks(topBooks);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

async function getBookDetails() {
  try {
    const book = await booksApiService.getBookOnId();
    renderBookDetails(book);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch book details');
  }
}

function renderCategory(categoryBooks) {
  console.log('categoryBooks', categoryBooks);
}

function renderTopBooks(topBooks) {
  console.log('topBooks', topBooks);
}

function renderBookDetails(book) {
  console.log('book', book);
}

getCategoryBooks();
getTopBooks();
getBookDetails();
