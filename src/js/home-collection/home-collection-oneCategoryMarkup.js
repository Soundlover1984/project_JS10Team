import { createOneBookMarkup } from './home-collection-oneBookMarkup';

function createOneCategoryMarkup(books) {
  const markup = books
    .map(book => {
      return `       
          ${createOneBookMarkup(book)}      
        `;
    })
    .join('');
  return markup;
}

export { createOneCategoryMarkup };
