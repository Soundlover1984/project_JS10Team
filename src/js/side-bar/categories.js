import Notiflix from 'notiflix';
import { BooksApiService } from '../api/booksApiService';
import { getAndParseTopBooks } from '../home-collection/home-collection';
import { getAndParseCategoryBooks } from '../home-collection/home-collection';
import { Loading } from 'notiflix/build/notiflix-loading-aio'; 

Notiflix.Notify.init({
  info: {
    background: '#4F2EE8',
    notinflixIconColor: '#fff',
  },
});




const booksApiService = new BooksApiService();

const categoriesContainer = document.querySelector('.categories__list');

let name = '';
async function displayCategories() {
  try {
    Loading.hourglass({
      backgroundColor: 'rgba(0,0,0,0.4)',
      svgColor: '#4f2ee8',
    });
    const categoryList = await booksApiService.getCategoryList();
    createCategoriesList(categoryList);
    Loading.remove(1000);
  } catch (error) {
    console.error(error);
    Loading.remove(1000);
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

  if (name === 'All categories') {
    await getAndParseTopBooks();
  } else {
    await getSelectCategory(name);
  }
}

async function getSelectCategory(name) {
  try {
     Loading.hourglass({
       backgroundColor: 'rgba(0,0,0,0.4)',
       svgColor: '#4f2ee8',
     });
    const listBooks = await booksApiService.getCategoryBooks(name);
    renderSelectBooks(listBooks);
    Loading.remove(1000);
  } catch (error) {
    console.error(error);
    Loading.remove(1000);
    throw new Error('Failed to fetch category list');
  }
}

async function renderSelectBooks(books) {
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
