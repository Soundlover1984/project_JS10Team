import axios from 'axios';

class BooksApiService {
  constructor() {
    this.BASE_URL = "https://books-backend.p.goit.global";
    // Для дінамічної зміної book categori
    this.selectedCategory = "Paperback Nonfiction";
    // Для дінамічної зміної book Id
    this.bookId = "643282b1e85766588626a085";
    // нижче можна додавати свої this якщо буде потреба (повідомляти тім ліда)
  }

  async getCategoryList() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/category-list`);
      const categoryList = response.data;
      console.log('Category List:', categoryList);
      return categoryList;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch category list');
    }
  }

  async getTopBooks() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/top-books`);
      const topBooks = response.data;
      console.log('Top Books:', topBooks);
      return topBooks;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch top books');
    }
  }

  async getCategoryBooks() {
    try {
      const response = await axios.get(`${this.BASE_URL}/books/category`, {
        params: {
          category: this.selectedCategory
        }
      });
      const booksCategori = response.data;
      console.log('BooksCategori:', booksCategori);
      return booksCategori;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Books Category');
    }
  }

    async getBookOnId() {
      try {
      const response = await axios.get(`${this.BASE_URL}/books/${this.bookId}`);
      const book = response.data;
      console.log('Book:', book);
      return book;
  } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch Book');
      }
    }
    }
  


// Створення екземпляру класу і виклик методів (цей код для прикладу)
const booksApiService = new BooksApiService();

booksApiService.getCategoryList();
booksApiService.getTopBooks();
booksApiService.getCategoryBooks();
booksApiService.getBookOnId();


export { BooksApiService };

// приклад підключення до свого файлу
// 
// імпортуймо до свого файлу
// import { BooksApiService } from './booksApiService';
// 
// обявлення нового класу
// const booksApiService = new BooksApiService;
// 
// функція для отримання необхібних данних
// async function getBookDetails() {
//   try {
//     const book = await booksApiService.getBookOnId(); //ось тут ставте свій шлях
//     renderBookDetails(book);
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to fetch book details');
//   }
// }
// Далі функцію рендеру