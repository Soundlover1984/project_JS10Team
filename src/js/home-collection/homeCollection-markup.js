import { createOneCategoryMarkup } from './homeCollection-oneCategoryMarkup';

function createHomeCollectionMarkup(collection) {
  // console.log('collection:', collection);

  return collection
    .map(category => {
      const { books, list_name } = category;

      return `
          <li class="category">
              <p class="category__title">${list_name}</p>
              <ul class="category__books-list">
                ${createOneCategoryMarkup(books)}
                <button class="category__button more-js">SEE MORE</button>
              </ul>
          </li>
        `;
    })
    .join('');
  4;
}

export { createHomeCollectionMarkup };
