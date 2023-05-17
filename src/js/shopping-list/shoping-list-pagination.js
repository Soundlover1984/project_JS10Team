import '../side-bar/supportCreateList';
import createCardBook from './shoppingList';

const listBtn = document.querySelector('.sh-list__pagination');
const page = document.querySelector('.shopping-cart-is-empty');
const listWithBoks = document.querySelector('.listWithBoks');

let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
localStorage.setItem('currentPage', currentPage);

//Інфо з Локального сховища
const savedSettings = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));

//Штучні Локальні дані
// localStorage.setItem(
//   'ui-theme',
//   '[{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Ilona","age":3,"isHappy":true}, {"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true}]'
// );
// const savedSettings = JSON.parse(localStorage.getItem('ui-theme'));

//Перевірка на наявнісь книг в корзині
function controllInLocalStorage() {
  if (savedSettings) {
    removeDefaultPage();
    console.log(savedSettings);
    return;
  }
}

controllInLocalStorage();

//Якщо є книги Викликаю рендеринг картки
function renderMarkup(books) {
  const cardsMarkup = createCardBook(books);
  listWithBoks.insertAdjacentHTML('beforeend', cardsMarkup);
}

//Очищаю сторінку добавляю картки

function removeDefaultPage() {
  page.innerHTML = '';

  //Викликати функцію що створює картки//
  // renderMarkup(savedSettings);
  renderCards();

  if (savedSettings.length > 3) {
    addBtn();
  }
}

//Якщо більше ніж 3 картки добавляю кнопки

listBtn.addEventListener('click', onClick);
const pageOne = document.querySelector('.pageOne');
const pageTwo = document.querySelector('.pageTwo');
const pageThre = document.querySelector('.pageThre');

const nextPage = document.querySelector('.nextPage');
const lastPage = document.querySelector('.lastPage');

function addBtn() {
  listBtn.insertAdjacentHTML(
    'beforeend',
    `<li><button class="sh-list__pagination-btn beginning"> << </button></li>
  <li><button class="sh-list__pagination-btn page_back"> < </button></li>
  <li><button class="sh-list__pagination-btn number_of_page pageOne currentPage"> 1 </button> </li>
  <li><button class="sh-list__pagination-btn number_of_page pageTwo"> 2 </button></li>
  <li><button class="sh-list__pagination-btn number_of_page pageThre"> 3 </button></li> 
  <li><button class="sh-list__pagination-btn number_of_page btnLoadMore"> ... </button></li>
  <li> <button class="sh-list__pagination-btn nextPage"> > </button> </li>
  <li> <button class="sh-list__pagination-btn lastPage"> >> </button> </li>`
  );
}

function renderCards() {
  // Вираховуємо індекс першої та останньої картки на сторінці
  const startIndex = (currentPage - 1) * 3;
  const endIndex = startIndex + 2;

  // Рендеримо три картки, починаючи з індекса startIndex та закінчуючи індексом endIndex
  const cardsToRender = savedSettings.slice(startIndex, endIndex + 1);

  renderMarkup(cardsToRender);
  //
}

const prevButton = document.querySelector('.page_back');
prevButton.addEventListener('click', () => {
  updatePage('page_back');
  //   addCarenPageStyl();
});

const nextButton = document.querySelector('.nextPage');
nextButton.addEventListener('click', () => {
  updatePage('nextPage');
  //   addCarenPageStyl();
});

function updatePage(action) {
  if (action === 'page_back' && currentPage > 1) {
    currentPage--;
  } else if (
    action === 'nextPage' &&
    currentPage < Math.ceil(savedSettings.length / 3)
  ) {
    currentPage++;
  }

  localStorage.setItem('currentPage', currentPage);
  listWithBoks.innerHTML = '';
  renderCards();
}

//розділяємо картки по сторінках
function chunkArray(myArray, chunk_size) {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

const result = chunkArray(savedSettings, 3);
const allPages = result.length;
console.log(result);
console.log(allPages);

//задаю дефолтне значення сторінкам

function onClick(evt) {
  const btnClass = evt.target.classList;

  pageOne.classList.remove('currentPage');

  if (btnClass[1] === 'beginning') {
    pageOne.textContent = 1;
    pageTwo.textContent = 2;
    currentPage = 1;
    localStorage.setItem('currentPage', currentPage);
    listWithBoks.innerHTML = '';

    pageTwo.classList.remove('currentPage');
    pageThre.classList.remove('currentPage');
    pageOne.classList.add('currentPage');
    // result[0] можливо вказати для рендиру
    renderCards(result[0]);
  } else if (btnClass[2] === 'pageOne') {
    listWithBoks.innerHTML = '';
    currentPage = 1;
    localStorage.setItem('currentPage', currentPage);
    pageOne.classList.add('currentPage');
    pageThre.classList.remove('currentPage');
    pageTwo.classList.remove('currentPage');
    renderCards(result[0]);
  } else if (btnClass[2] === 'pageTwo') {
    listWithBoks.innerHTML = '';
    currentPage = 2;
    localStorage.setItem('currentPage', currentPage);
    pageOne.classList.remove('currentPage');
    pageThre.classList.remove('currentPage');
    pageTwo.classList.add('currentPage');
    renderCards(result[1]);
  } else if (btnClass[2] === 'pageThre') {
    listWithBoks.innerHTML = '';
    currentPage = 3;
    localStorage.setItem('currentPage', currentPage);
    pageOne.classList.remove('currentPage');
    pageTwo.classList.remove('currentPage');
    pageThre.classList.add('currentPage');
    renderCards(result[2]);
  } else if (btnClass[1] === 'lastPage') {
    listWithBoks.innerHTML = '';
    currentPage = allPages;
    localStorage.setItem('currentPage', currentPage);
    pageOne.classList.remove('currentPage');
    pageTwo.classList.remove('currentPage');
    pageThre.classList.add('currentPage');
    renderCards(result[result.length - 1]);
  } else if (btnClass[2] === 'btnLoadMore') {
    localStorage.setItem('currentPage', 3);
    listWithBoks.innerHTML = '';
    pageTwo.classList.remove('currentPage');
    pageOne.classList.add('currentPage');
    renderCards(result[2]);
  }
}

const btnLoadMore = document.querySelector('.btnLoadMore');
btnLoadMore.addEventListener('click', onClickMore);

function onClickMore() {
  if (allPages > 3) {
    return;
  }
  pageOne.textContent = 3;
  pageTwo.textContent = 4;
}

//////////////////////////////////

// function addCarenPageStyl() {
//   let crPg = Number(localStorage.getItem('currentPage'));

//   for (let i = 1; i <= allPages; i += 1) {

//     if (currentPage === i) {

//     }

//   }

//   if (crPg === 1) {
//     pageOne.classList.add('currentPage');
//     return;
//   } else if (crPg === 2) {
//     pageOne.classList.remove('currentPage');
//     pageTwo.classList.add('currentPage');
//     return;
//   } else if (crPg === 3) {
//     pageOne.classList.add('currentPage');
//     pageTwo.classList.remove('currentPage');

//     pageOne.textContent = 3;
//     pageTwo.textContent = 4;
//   }
// }

// const btnLoadMore = document.querySelector('.btnLoadMore');
// btnLoadMore.addEventListener('click', onClickMore);

// function onClickMore() {
//   if (allPages > 3) {
//     return;
//   }
//   pageOne.textContent = 2;
//   pageTwo.textContent = 3;
// }

// nextPage.addEventListener('click', updatePage('nextPage'));
// lastPage.addEventListener('click', updatePage('page_back'));

// function addCarenPageStyl() {
//   let crPg = Number(localStorage.getItem('currentPage'));

//   if (crPg === 1) {
//     pageOne.classList.add('currentPage');
//     return;
//   } else if (crPg === 2) {
//     pageOne.classList.remove('currentPage');
//     pageTwo.classList.add('currentPage');
//     return;
//   } else if (crPg === 3) {
//     pageOne.classList.add('currentPage');
//     pageTwo.classList.remove('currentPage');

//     pageOne.textContent = 3;
//     pageTwo.textContent = 4;
//   }
// }
