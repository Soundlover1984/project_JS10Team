import { createOneCategoryMarkup } from './home-collection-oneCategoryMarkup';

function createFullMarkup(collection) {
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
  4;
}

export { createFullMarkup };
