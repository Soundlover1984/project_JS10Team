import debounce from 'lodash.debounce';
import { createOneBookMarkup } from './home-collection-oneBookMarkup';
import { bookAmountInRow } from './home-collection';

export function createOneCategoryMarkup(books) {
  let lbooks = books.slice(0, bookAmountInRow);
  const markup = lbooks
    .map(book => {
      return `
          ${createOneBookMarkup(book)}
        `;
    })
    .join('');
  return markup;
}
