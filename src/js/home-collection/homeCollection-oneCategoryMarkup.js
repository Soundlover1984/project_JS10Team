import { createOneBookMarkup } from './homeCollection-oneBookMarkup';

function createOneCategoryMarkup(category) {
  const { books, list_name } = category;
  const markup = books
    .map(book => {
      return `
        <li class="">
            <a href="/" class='category-books__link'>
                <img
                class=""
                src='${book.book_image}'
                alt='book'
                data-id="${book._id}"
                loading="lazy"
                />
            </a>
        <h3 class="__title" >${book.title}</h3>
        <p class="__author">${book.author}</p>
        </li>
    `;
    })
    .join('');
  // console.log('markup:', markup);
  return markup;
}

function createOneBookMarkup(book) {
  const { author, title, list_name, book_image = defaultBookImage } = book;
  return `  
    <li class="book">
        <div class="book__image-frame">
            <img class="book__image" src="${book_image}" ></img>
        </div>
        <p class="book__title">${title}</p>
        <p class="book__author">${author}</p> 
    </li> 
    `;
}
export { createOneCategoryMarkup };
