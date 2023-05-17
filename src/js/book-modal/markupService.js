import { getIconUrlForStore } from './iconUrlForStore';
import { refs } from './modal';

/**
 * Рендеринг деталей про книгу
 * @param {Object} bookData - Об'єкт з деталями про книгу
 */
export function renderBookDetails(bookData) {
  const markup = createBookDetailsMarkup(bookData);
  refs.bookModal.innerHTML = markup;
}

/**
 * Створення розмітки книги
 * @param {Object} book - Об'єкт з даними книги
 * @returns {string} - Розмітка книги
 */
function createBookDetailsMarkup(bookData) {
  const { book_image, title, author, description, buy_links } = bookData;

  const markup = `
    <div class="book-details">
      <img class="book-details__cover" src="${book_image}" alt="${title}" />
      <div class="book-details__info">
        <h2 class="book-details__title">${title}</h2>
        <h3 class="book-details__author">${author}</h3>
        <p class="book-details__description">${description}</p>
        <ul class="modal-shopping-list">
          ${buy_links ? createBuyLinksMarkup(buy_links) : ''}
        </ul>
      </div>
    </div>`;
  return markup;
}

/**
        Створення розмітки посилань на покупку
        @param {Array} buyLinks - Масив з посиланнями на покупку
        @returns {string} - Розмітка посилань на покупку
        */
function createBuyLinksMarkup(buyLinks) {
  const supportedStores = ['Amazon', 'Apple Books', 'Bookshop'];

  const filteredLinks = buyLinks.filter(link =>
    supportedStores.includes(link.name)
  );

  return filteredLinks
    .map(link => {
      const { name, url } = link;
      const { iconUrl, iconUrl2x, width, height } = getIconUrlForStore(name);
      return `<li class="modal-shopping-list__item">
                        <a class="buy-link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
                          <img class="buy-link__img"
                            srcset="${iconUrl} 1x, ${iconUrl2x} 2x"
                            src="${iconUrl}"
                            alt="${name}"
                            width="${width}"
                            height="${height}"
                          />
                        </a>
                      </li>`;
    })
    .join('');
}
