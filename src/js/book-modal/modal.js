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
    buy_links,

  } = book

  const markup = `
  <div class="book-details">
      <img class="book-cover" src="${book_image}" alt="${title}" />
      <div class="info">
        <h2>${title}</h2>
        <h3>${author}</h3>
        <p class="book-info">${description}</p>
        <ul class="">
          ${renderBuyLinks(buy_links)}
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
getBookDetails();

function renderBuyLinks(buyLinks) {
  return buyLinks
  .map((link) => {
    const {name, url } = link;
    const iconUrl = getIconUrlForStore();
    return `<li class="buy-link">
    <a href="${url}" target="_blank" rel="noopener noreferrer nofollow"><img
      srcset="
        ${iconUrl},
        ${iconUrl2x}
      "
      src="${iconUrl}"
      alt="${name}"
      width="370"
      height="294"
    /></a>
  </li>`
  })
  .join("");
}

function getIconUrlForStore(storeName) {
  switch(storeName) {
    case "Amazon":
      return "./src/images/modal/image-1@1x.png";
      case "Apple Books":
      return "./src/images/modal/image-2@1x.png";
      case "Bookshop":
        return "./src/images/modal/image-3@1x.png"
       default:
        return "";
  }
}