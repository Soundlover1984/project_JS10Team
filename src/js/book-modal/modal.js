import { BooksApiService } from "../api/booksApiService";

const booksApiService = new BooksApiService;

const refs = {
  bookModal: document.querySelector('.modal-for-book'),
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  backdrop: document.querySelector(".js-backdrop"),
};

    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);

    function toggleModal() {
      document.body.classList.toggle("show-modal");
      getBookDetails();
    }

  
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
        <h2 class="book-details__title>${title}</h2>
        <h3 class="book-details__author>${author}</h3>
        <p class="book-details__description">${description}</p>
        <ul class="shopping-list">
          ${renderBuyLinks(buy_links)}
        </ul>
        <button
          class="btn-book-modal"
          data-book-modal
          type="button"
          aria-label="close"
        >Add to shopping list</button>
      </div>
    </div>`;

    refs.bookModal.innerHTML = markup;
}

//функція яка повинна викликатися при натисканні на картку книги, рендерить інфо модалки
getBookDetails();

function renderBuyLinks(buyLinks) {
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
            ${iconUrl},
            ${iconUrl2x}
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

function getIconUrlForStore(storeName) {
    switch (storeName) {
      case "Amazon":
        return {
          iconUrl: "/images/modal/image-1@1x.png",
          iconUrl2x: "/images/modal/image-1@2x.png"
        };
      case "Apple Books":
        return {
          iconUrl: "/images/modal/image-2@1x.png",
          iconUrl2x: "/images/modal/image-2@2x.png"
        };
      case "Bookshop":
        return {
          iconUrl: "/images/modal/image-3@1x.png",
          iconUrl2x: "/images/modal/image-3@2x.png"
        };
    }
  
  // Повертаємо порожні значення для ігнорування інших магазинів
  return {
    iconUrl: "",
    iconUrl2x: ""
  };
}






