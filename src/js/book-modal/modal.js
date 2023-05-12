import { BooksApiService } from "../api/booksApiService";

const booksApiService = new BooksApiService;

const refs = {
  bookModal: document.querySelector('.book-modal'),
};

async function getBookDetails() {
  try {
    const book = await booksApiService.getBookOnId();
renderBookDetails(book);
  } catch(error) {
    console.error(error);
    throw new Error('Failed to fetch book details');
  }
};

function renderBookDetails(book) {
  const {
    book_image,
    title,
    author,
    description,
  } = book

  const markup = `
  <div class="book-details">
      <img class="book-cover" src="${book_image}" alt="${title}" />
      <div class="info">
        <h2>${title}</h2>
        <h3>${author}</h3>
        <p class="book-info">${description}</p>
        <ul class="">
          <li class=""></li>
          <li class=""></li>
          <li class=""></li>
        </ul>
        <button
          class="btn-close"
          data-modal-close
          type="button"
          aria-label="close"
        ></button>
      </div>
    </div>`;

    refs.bookModal.innerHTML = markup;
}

//функція яка повинна викликатися при натисканні на картку книги, рендерить інфо модалки
// getBookDetails();
