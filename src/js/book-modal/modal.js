import { BooksApiService } from "../api/booksApiService";

const booksApiService = new BooksApiService();

const refs = {
  bookModal: document.querySelector('.modal-for-book'),
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  backdrop: document.querySelector(".js-backdrop"),
};


refs.openModalBtn.addEventListener("click", openModal);

/**
 * Отримання деталей книги
 * @param {Object} refs - Об'єкт з посиланнями на елементи DOM
 */
async function getBookDetails(refs) {
  // Код для отримання деталей книги з використанням API
  try {
    const book = await booksApiService.getBookOnId();
    renderBookDetails(book, refs);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch book details');
  }
}

/**
 * Створення розмітки книги
 * @param {Object} book - Об'єкт з даними книги
 * @returns {string} - Розмітка книги
 */
function createBookDetailsMarkup(book) {

  const {
    book_image,
    title,
    author,
    description,
    buy_links,
  } = book;

  const markup = `
    <button class="btn-close" data-modal-close type="button" aria-label="close">
      <svg class="icon" width="18" height="18">
        <use href="./images/modal/icon-x-close.svg"></use>
      </svg>
    </button>
    <div class="book-details">
      <img class="book-details__cover" src="${book_image}" alt="${title}" />
      <div class="book-details__info">
        <h2 class="book-details__title">${title}</h2>
        <h3 class="book-details__author">${author}</h3>
        <p class="book-details__description">${description}</p>
        <ul class="shopping-list">
          ${createBuyLinksMarkup(buy_links)}
        </ul>
        <button
          class="btn-book-modal"
          data-book-modal
          type="button"
          aria-label="close"
        >Add to shopping list</button>
      </div>
    </div>`;
  return markup;
}

/**
 * Створення розмітки посилань на покупку
 * @param {Array} buyLinks - Масив з посиланнями на покупку
 * @returns {string} - Розмітка посилань на покупку
 */
function createBuyLinksMarkup(buyLinks) {
  const supportedStores = ["Amazon", "Apple Books", "Bookshop"];

  const filteredLinks = buyLinks.filter(link => supportedStores.includes(link.name));

  return filteredLinks
    .map((link) => {
      const { name, url } = link;
      const { iconUrl, iconUrl2x } = getIconUrlForStore(name);
      return `<li class="shopping-list__item">
        <a class="buy-link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
        <img class="buy-link__img"
          srcset="
            ${iconUrl} 1x,
            ${iconUrl2x} 2x
          "
          src="${iconUrl}"
          alt="${name}"
          width="40"
          height="40"
        /></a>
      </li>`;
    })
    .join("");
}

/**
 * Рендерінг деталей книги
 * @param {Object} book - Об'єкт з даними книги
 * @param {Object} refs - Об'єкт з посиланнями на елементи DOM
 */
function renderBookDetails(book, refs) {
  const markup = createBookDetailsMarkup(book);
  refs.bookModal.innerHTML = markup;
}

/**
 * Отримання URL-адреси іконки магазину
 * @param {string} storeName - Назва магазину
 * @returns {Object} - Об'єкт з URL-адресами іконки магазину
 */
function getIconUrlForStore(storeName) {
  const store = iconUrls.find(item => item.name === storeName);
  if (store) {
    return {
      iconUrl: store.iconUrl,
      iconUrl2x: store.iconUrl2x,
    };
  } else {
    return {
      iconUrl: "",
      iconUrl2x: "",
    };
  }
}

// Масив з URL-адресами іконок магазинів
const iconUrls = [
    {
      name: "Amazon",
      iconUrl: require("../../images/modal/image-1@1x.png"),
      iconUrl2x: require("../../images/modal/image-1@2x.png"),
    },
    {
      name: "Apple Books",
      iconUrl: require("../../images/modal/image-2@1x.png"),
      iconUrl2x: require("../../images/modal/image-2@2x.png"),
    },
    {
      name: "Bookshop",
      iconUrl: require("../../images/modal/image-3@1x.png"),
      iconUrl2x: require("../../images/modal/image-3@2x.png"),
    },
  ];
  
/**
 * Відкриття модального вікна
 */
  function openModal() {
    getBookDetails(refs);
    document.body.classList.add("show-modal");
    refs.closeModalBtn.addEventListener("click", removeModal);
    refs.backdrop.removeEventListener("click", backdropClickHandler);
  }
  
  /**
 * Закриття модального вікна
 */
  function removeModal() {
    document.body.classList.remove("show-modal");
    refs.bookModal.innerHTML = "";
    refs.closeModalBtn.removeEventListener("click", removeModal);
    refs.backdrop.removeEventListener("click", backdropClickHandler);
    document.removeEventListener("keydown", keydownHandler);
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
    if (event.code === "Escape") {
      removeModal();
    }
  }