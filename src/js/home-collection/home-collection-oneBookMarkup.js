// const defaultBookImage = './images/icons.svg#іcon-plug';
// const defaultBookImage = './../../images/animal_01.png';
const defaultBookImage = '../../images/animal_01.png';

function createOneBookMarkup(book) {
  const { _id, author, title, list_name, book_image = defaultBookImage } = book;
  return `
    <li class="book">
      <a href="/" class='book__link'>
        <div class="book__frame">
          <img
            class="book__image"
            src='${defaultBookImage}'
            alt='book image '
            data-id="${_id}"
            loading="lazy"
        />
        </div>
      </a>
      <h3 class="book__title" >${title}</h3>
      <p class="book__author">${author}</p>
    </li>
    `;
}

export { createOneBookMarkup };
