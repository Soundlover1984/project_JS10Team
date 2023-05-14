import { createOneBookMarkup } from './homeCollection-oneBookMarkup';

function createOneCategoryMarkup(books) {
  console.log('books:', books);
  const markup = books
    .map(book => {
      return `
        <li>
          ${createOneBookMarkup(book)}
        </li>
        `;
    })
    .join('');
  return markup;
}

export { createOneCategoryMarkup };
