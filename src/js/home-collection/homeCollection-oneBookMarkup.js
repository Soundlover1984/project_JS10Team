const defaultBookImage = './images/icons.svg#іcon-plug';

function createOneBookMarkup(book) {
  const { _id, author, title, list_name, book_image = defaultBookImage } = book;
  return `
      <a href="/" class='category-books__link'>
        <img
          class=""
          src='${book_image}'
          alt='book image '
          data-id="${_id}"
          loading="lazy"
        />
      </a>
      <h3 class="book__title" >${title}</h3>
      <p class="book__author">${author}</p>
      `;
}

export { createOneBookMarkup };
