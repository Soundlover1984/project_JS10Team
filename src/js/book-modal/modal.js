// Імпорт необхідних модулів
import { BooksApiService } from '../api/booksApiService';
import { renderBookDetails } from './markupService';

// Створення екземпляру BooksApiService
const booksApiService = new BooksApiService();

// Ключ для зберігання списку покупок в локальному сховищі
const SHOPPING_LIST_KEY = 'SHOPPING_LIST_KEY';

// Отримання поточних даних з локального сховища
const currentStorage =
  JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY)) || [];

// Посилання на елементи DOM
const refs = {
  bookModal: document.querySelector('.content-conteiner'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.js-backdrop'),
  btnAddBook: document.querySelector('.js-btn-modal-add-book'),
  removeCover: document.querySelector('.js-remove-book-cover'),
  removeBtn: document.querySelector('.js-btn-modal-remove-book'),
};

refs.removeCover.classList.add('is-hidden');

refs.closeModalBtn.addEventListener('click', removeModal);
refs.btnAddBook.addEventListener('click', addBookBtnClick);
refs.removeBtn.addEventListener('click', removeBookBtnClick);

/**
 * Отримання деталей про книгу
 * @returns {Promise<Object>} - Об'єкт з деталями про книгу
 * @throws {Error} - Помилка при отриманні деталей про книгу
 */
async function getBookDetails() {
  try {
    const bookData = await booksApiService.getBookOnId();
    return bookData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch book details');
  }
}

/**
 * Відкриття модального вікна з деталями про книгу
 */
async function openModal() {
  const bookData = await getBookDetails();
  if (bookData) {
    currentBookData = bookData;
    renderBookDetails(bookData);
    document.body.classList.add('show-modal');
    refs.backdrop.addEventListener('click', backdropClickHandler);
    document.addEventListener('keydown', keydownHandler);
    refs.closeModalBtn.addEventListener('click', removeModal);

    //перевірте, чи вибрано книгу
    if (currentStorage.find(book => book._id === bookData._id)) {
      refs.btnAddBook.classList.add('is-hidden');
      refs.removeCover.classList.remove('is-hidden');
    }
  }
}

// Змінна для зберігання поточних даних про книгу
let currentBookData = null;

/**
 * Обробник кліку на кнопці "Додати книгу"
 * Отримує дані про книгу та додає їх до масиву книг
 */
async function addBookBtnClick() {
  const items = JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY)) || [];
  if (
    currentBookData &&
    !items.find(book => book._id === currentBookData._id)
  ) {
    localStorage.setItem(
      SHOPPING_LIST_KEY,
      JSON.stringify(items.concat(currentBookData))
    );
    refs.btnAddBook.classList.add('is-hidden');
    refs.removeCover.classList.remove('is-hidden');
  }
}

/**
 * Обробник кліку на кнопці "Видалити книгу"
 * Видаляє поточну книгу з масиву книг
 */
function removeBookBtnClick() {
  const items = JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY)) || [];
  if (currentBookData && items.find(book => book._id === currentBookData._id)) {
    localStorage.setItem(
      SHOPPING_LIST_KEY,
      JSON.stringify(items.filter(book => book._id !== currentBookData._id))
    );
    refs.btnAddBook.classList.remove('is-hidden');
    refs.removeCover.classList.add('is-hidden');
  }
}

/**
 * Закриття модального вікна
 */
function removeModal() {
  refs.bookModal.innerHTML = '';
  document.body.classList.remove('show-modal');
  refs.closeModalBtn.removeEventListener('click', removeModal);
  refs.backdrop.removeEventListener('click', backdropClickHandler);
  document.removeEventListener('keydown', keydownHandler);
}

/**
 * Обробник кліку на підкладці (backdrop)
 * @param {Event} event - Об'єкт події
 */
function backdropClickHandler(event) {
  if (event.target === refs.backdrop) {
    removeModal();
  }
}

/**
 * Обробник натискання клавіші
 * @param {KeyboardEvent} event - Об'єкт події
 */
function keydownHandler(event) {
  if (event.code === 'Escape') {
    removeModal();
  }
}

export { refs };
export { openModal };
