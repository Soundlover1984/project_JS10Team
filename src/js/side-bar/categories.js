import Notiflix from 'notiflix';
import { BooksApiService } from '../api/booksApiService';
// import { drawCategoryTitle } from './createCategoryTitle';
import { getAndParseTopBooks } from '../home-collection/home-collection';
import { getAndParseCategoryBooks } from '../home-collection/home-collection';
Notiflix.Notify.init({
  info: {
    background: '#4F2EE8',
    notinflixIconColor: '#fff',
  },
});

const booksApiService = new BooksApiService();
// const homeSubtitle = document.querySelector('.home-collection__title');
// const categoryList = document.querySelector(
//   '.home-collection__categories-list--topBooks'
// );
const categoriesContainer = document.querySelector('.categories__list');

let name = '';
async function displayCategories() {
  try {
    const categoryList = await booksApiService.getCategoryList();
    createCategoriesList(categoryList);
    // getSelectCategory();
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

categoriesContainer.addEventListener('click', clickOnCategories);

async function clickOnCategories(event) {
  if (!event.target.classList.contains('categories__item')) {
    return;
  }

  const categoriesItems = document.querySelectorAll('.categories__item');
  categoriesItems.forEach(item =>
    item.classList.remove('categories-is-active')
  );
  event.target.classList.add('categories-is-active');
  name = event.target.textContent;

  booksApiService.selectedCategory = name;
  console.log(name);
  if (name === 'All categories') {
    //   homeSubtitle.innerHTML = `<h2 class="home-collection__title">
    //   Best Sellers
    //   <span class="home-collection__title--last-word" style="color: #4f2ee8">Books</span>
    // </h2>`;
    await getAndParseTopBooks(name);
  } else {
    await getSelectCategory(name);
  }
}

async function getSelectCategory(name) {
  try {
    const listBooks = await booksApiService.getCategoryBooks(name);
    console.log('hvkfbwjhfjhabdvlhbawedhvjwae', listBooks);
    renderSelectBooks(listBooks);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch category list');
  }
}

async function renderSelectBooks(books) {
  // console.log(books);
  // await drawCategoryTitle(name);
  // console.log(
  //   'це заголовок моєї катогорії - ',
  //   booksApiService.selectedCategory
  // );
  // categoryList.innerHTML = '';
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
    getAndParseCategoryBooks(name);
  }
}
