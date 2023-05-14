import { createOneBookMarkup } from './home-collection-oneBookMarkup';

function createOneCategoryMarkup(books) {
  const markup = books
    .map(book => {
      return `
        <li class="book">
          ${createOneBookMarkup(book)}
        </li>
        `;
    })
    .join('');
  return markup;
}

export { createOneCategoryMarkup };
