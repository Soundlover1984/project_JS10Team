import { BooksApiService } from '../api/booksApiService';

const booksApiService = new BooksApiService();
let amountOfBooks = 3;

function sectionLoad() {
  // getAndParseTopBooks(amountOfBooks);
  getAndParseCategoryBooks('Childrens Middle Grade Hardcover', amountOfBooks);
}

async function getAndParseTopBooks(amountOfBooks) {
  try {
    const booksApiService = new BooksApiService();
    const topBooksFromBack = await booksApiService.getTopBooks();
    const topBooksLimited = limitBooksInTopBooks(
      topBooksFromBack,
      amountOfBooks
    );
    renderTopBooks(topBooksLimited);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

export async function getAndParseCategoryBooks(categoryName, amountOfBooks) {
  try {
    const booksApiService = new BooksApiService();
    booksApiService.selectedCategory = categoryName;
    const booksFromBack = await booksApiService.getCategoryBooks();
    const books = limitBooksInBooks(booksFromBack, amountOfBooks);
    renderBooks(books);
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

function limitBooksInBooks(books, amountOfBooks) {
  const limitedBooks = books.slice(0, amountOfBooks);
  return limitedBooks;
}

function renderTopBooks(topBooks) {
  const outputData = topBooks.map(topBookCategories =>
    console.log('topBookCategories:', topBookCategories)
  );
  return outputData;
}

function renderBooks(books) {
  const outputData = books.map(book => {
    console.log('book:', book);
  });
  return outputData;
}
//------------------------------------
sectionLoad();
