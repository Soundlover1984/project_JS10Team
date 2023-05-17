import { BooksApiService } from '../api/booksApiService';

const booksApiService = new BooksApiService();

function sectionLoad() {
  getAndParseData();
}

async function getAndParseData() {
  try {
    const booksApiService = new BooksApiService();
    const topBooksFromBack = await booksApiService.getTopBooks();
    console.log('topBooksFromBack:', topBooksFromBack);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch top books');
  }
}

function renderData() {}
