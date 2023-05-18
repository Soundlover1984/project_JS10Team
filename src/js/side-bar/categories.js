import Notiflix from 'notiflix';
import { BooksApiService } from '../api/booksApiService';
import { drawCategoryTitle } from './createCategoryTitle';
import { drawTopBooks } from '../home-collection/home-collection';
import { createOneCategoryMarkup } from '../home-collection/home-collection-markup';

Notiflix.Notify.init({
  info: {
    background: '#4F2EE8',
    notiflixIconColor: '#fff',
  },
});

const booksApiService = new BooksApiService();
const homeSubtitle = document.querySelector('.home-collection__title');
const categoryList = document.querySelector(
  '.home-collection__categories-list--topBooks'
);
const categoriesContainer = document.querySelector('.categories__list');

async function displayCategories() {
  try {
    const categoryList = await booksApiService.getCategoryList();
    createCategoriesList(categoryList);
    getSelectCategory();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category list');
  }

  function createCategoriesList(categoryList) {
    const categoriesItem = categoryList
      .map(({ list_name }) => `<li class="categories__item">${list_name}</li>`)
      .join('');
    categoriesContainer.insertAdjacentHTML('beforeend', categoriesItem);
  }
}

displayCategories();

categoriesContainer.addEventListener('click', selectCategory);

async function selectCategory(event) {
  if (!event.target.classList.contains('categories__item')) {
    return;
  }

  const categoriesItems = document.querySelectorAll('.categories__item');
  categoriesItems.forEach(item =>
    item.classList.remove('categories-is-active')
  );
  event.target.classList.add('categories-is-active');
  const selectedCategoryName = event.target.textContent;

  booksApiService.selectedCategory = selectedCategoryName;
  console.log(selectedCategoryName);
  if (selectedCategoryName === 'All categories') {
    homeSubtitle.innerHTML = `<h2 class="home-collection__title">
    Best Sellers
    <span class="home-collection__title--last-word" style="color: #4f2ee8">Books</span>
  </h2>`;
    await drawTopBooks();
  } else {
    await getSelectCategory(selectedCategoryName);
  }
}

async function getSelectCategory(selectedCategoryName) {
  try {
    const listSelectCategoryBooks = await booksApiService.getCategoryBooks(
      selectedCategoryName
    );
    renderSelectBooks(listSelectCategoryBooks);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category list');
  }
}

async function renderSelectBooks(books) {
  await drawCategoryTitle(booksApiService.selectedCategory);
  console.log(
    'це заголовок моєї катогорії - ',
    booksApiService.selectedCategory
  );
  categoryList.innerHTML = '';
  if (books.length === 0) {
    Notiflix.Notify.info(
      'Unfortunately, nothing was found. Please try changing the parameters and performing a new search.',
      {
        width: '500px',
        position: 'center-center',
        fontSize: '20px',
        messageMaxLength: 500,
        opacity: 0.6,
        cssAnimation: true,
        cssAnimationDuration: 1000,
        cssAnimationStyle: 'zoom',
        clickToClose: true,
        showOnlyTheLastOne: true,
      }
    );
  } else {
    const oneBook = createOneCategoryMarkup(books);
    console.log('це розмітка моєї категорії - ', oneBook);
    categoryList.insertAdjacentHTML('beforeend', oneBook);
  }
}
