import axios from 'axios';

class BooksApiService {
  constructor() {
    this.BASE_URL = 'https://books-backend.p.goit.global';
    // Для дінамічної зміної book categori
    this._selectedCategory = '';
    // Для дінамічної зміної book Id
    this._bookId = '';
  }

  /**
   * Отримання списку категорій
   * @returns {Array} - Масив з категоріями
   */
  async getCategoryList() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/category-list`);
      const categoryList = response.data;
      return categoryList;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch category list');
    }
  }

  /**
   * Отримання списку популярних книг
   * @returns {Array} - Масив з популярними книгами
   */
  async getTopBooks() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/top-books`);
      const topBooks = response.data;
      return topBooks;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch top books');
    }
  }

  /**
   * Отримання списку книг за обраною категорією
   * @returns {Array} - Масив з книгами в обраній категорії
   */
  async getCategoryBooks() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/category`, {
        params: {
          category: this.selectedCategory,
        },
      });
      const booksCategori = response.data;
      return booksCategori;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Books Category');
    }
  }

  /**
   * Отримання даних про книгу за її ідентифікатором
   * @returns {Object} - Об'єкт з даними книги
   */
  async getBookOnId() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/${this.bookId}`);
      const book = response.data;
      // console.log('Book:', book);
      return book;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Book');
    }
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  /**
   * @param {any} categoryName
   */
  set selectedCategory(categoryName) {
    this._selectedCategory = categoryName;
  }

  get bookId() {
    return this._bookId;
  }

  /**
   * @param {any} bookId
   */
  set bookId(bookId) {
    this._bookId = bookId;
  }
}

export { BooksApiService };
