export function createFullMarkup(collection) {
  return collection
    .map(category => {
      const { books, list_name } = category;
      return `
          <li class="category">
              <p class="category__title">${list_name}</p>
              <ul class="category__books-list">
                ${createOneCategoryMarkup(books)}
              </ul>
              <button class="category__button">SEE MORE</button>
          </li>
        `;
    })
    .join('');
}

export function createOneCategoryMarkup(books) {
  const markup = books
    .map(book => {
      return `
          ${createOneBookMarkup(book)}
        `;
    })
    .join('');
  return markup;
}

export function createOneBookMarkup(book) {
  const { _id, author, title, list_name, book_image = defaultBookImage } = book;
  return `
    <li class="book">
      <a class='book__link' data-id="${_id}">
        <div class="book__frame">
          <img
            class="book__image"
            src='${book_image}'
            alt='book image'
            loading="lazy"
          />
          <div class="book__overlay">
            <p class="book__view">quick view
            </p> 
          </div>
        </div>     
        <h3 class="book__title" >${title}</h3>
        <p class="book__author">${author}</p>
      </a>
    </li>
    `;
}
