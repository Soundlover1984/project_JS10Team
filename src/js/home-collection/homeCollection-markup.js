import { createOneCategoryMarkup } from './homeCollection-oneCategoryMarkup';

function createHomeCollectionMarkup(collection) {
  console.log('collection:', collection);

  return collection.map(category => {
    //   console.log('category:', category);
    // const { books, list_name } = category;
    return `
          <li class="category__item">
              <p class="category__title">${category.list_name}</p>
              <ul class="category__list">
                ${createOneCategoryMarkup(category)}
                <button class="more-js"" >SEE MORE</button>
              </ul>
          </li>
        `;
  });
}

export { createHomeCollectionMarkup };
