import '../side-bar/supportCreateList';
import createCardBook from './shoppingList';

const listBtn = document.querySelector('.sh-list__pagination');
const page = document.querySelector('.nullInList');
const listWithBoks = document.querySelector('.listWithBoks');

let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
localStorage.setItem('currentPage', currentPage);

const savedSettings = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));

// function chunkArray(myArray, chunk_size) {
//   let index = 0;
//   const arrayLength = myArray.length;
//   const tempArray = [];

//   for (index = 0; index < arrayLength; index += chunk_size) {
//     myChunk = myArray.slice(index, index + chunk_size);
//     tempArray.push(myChunk);
//   }

//   return tempArray;
// }

// const result = chunkArray(savedSettings, 3);
// const allPages = result.length;
// console.log(result);
// console.log(allPages);
// createCardBook(savedSettings[0]);

// function renderMarkup(books) {
//   const cardsMarkup = createCardBook(books);
//   listWithBoks.insertAdjacentHTML('beforeend', cardsMarkup);
// }

function renderMarkup(books) {
  const cardsMarkup = books.map(book => createCardBook(book)).join('');
  refs.shopCard.insertAdjacentHTML('beforeend', cardsMarkup);
}

function controllInLocalStorage() {
  if (savedSettings) {
    removeDefaultPage();

    return;
  }
}

controllInLocalStorage();

function removeDefaultPage() {
  page.innerHTML = '';

  //Викликати функцію що створює картки//
  renderMarkup(savedSettings);

  if (savedSettings.length > 3) {
    addBtn();
  }
}

function addBtn() {
  listBtn.insertAdjacentHTML(
    'beforeend',
    `<li><button class="sh-list__pagination-btn beginning"> << </button></li>
  <li><button class="sh-list__pagination-btn page_back"> < </button></li>
  <li><button class="sh-list__pagination-btn nuber_of_page pageOne currentPage"> 1 </button> </li>
  <li><button class="sh-list__pagination-btn nuber_of_pagepage pageTwo"> 2 </button></li>
  <li><button class="sh-list__pagination-btn nuber_of_pagepage pageThre"> 3 </button></li> 
  <li><button class="sh-list__pagination-btn nuber_of_pagepage btnLoadMore"> ... </button></li>
  <li> <button class="sh-list__pagination-btn nextPage"> > </button> </li>
  <li> <button class="sh-list__pagination-btn lastPage"> >> </button> </li>`
  );
}

function renderMarkup(books) {
  const cardsMarkup = createCardBook(books);
  listWithBoks.insertAdjacentHTML('beforeend', cardsMarkup);
}

// const cardsMarkup =books.map(book =>  ).join('')

listBtn.addEventListener('click', onClick);
const pageOne = document.querySelector('.pageOne');
const pageTwo = document.querySelector('.pageTwo');
const nextPage = document.querySelector('.nextPage');
const lastPage = document.querySelector('.lastPage');

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
    createCardBook(result[0]);
    pageOne.classList.add('currentPage');
  } else if (btnClass[2] === 'pageOne') {
    currentPage = 1;
    localStorage.setItem('currentPage', currentPage);
    listWithBoks.innerHTML = '';
    createCardBook(result[0]);
  } else if (btnClass[2] === 'pageTwo') {
    currentPage = 2;
    localStorage.setItem('currentPage', currentPage);
    pageTwo.classList.add('currentPage');
    listWithBoks.innerHTML = '';
    createCardBook(result[1]);
  } else if (btnClass[1] === 'lastPage') {
    currentPage = allPages;
    localStorage.setItem('currentPage', currentPage);
    listWithBoks.innerHTML = '';
    createCardBook(result[result.length - 1]);
  } else if (btnClass[2] === 'btnLoadMore') {
    localStorage.setItem('currentPage', 3);
    listWithBoks.innerHTML = '';
    createCardBook(result[2]);
  }
}

// const btnLoadMore = document.querySelector('.btnLoadMore');
// btnLoadMore.addEventListener('click', onClickMore);

function onClickMore() {
  if (allPages > 3) {
    return;
  }
  pageOne.textContent = 2;
  pageTwo.textContent = 3;
}

// nextPage.addEventListener('click', updatePage('nextPage'));
// lastPage.addEventListener('click', updatePage('page_back'));

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

function renderCards() {
  // Вираховуємо індекс першої та останньої картки на сторінці
  const startIndex = (currentPage - 1) * 3;
  const endIndex = startIndex + 2;

  // Рендеримо три картки, починаючи з індекса startIndex та закінчуючи індексом endIndex
  const cardsToRender = savedSettings.slice(startIndex, endIndex + 1);

  createCardBook(cardsToRender);
  // ...
}

function addCarenPageStyl() {
  let crPg = Number(localStorage.getItem('currentPage'));

  if (crPg === 1) {
    pageOne.classList.add('currentPage');
    return;
  } else if (crPg === 2) {
    pageOne.classList.remove('currentPage');
    pageTwo.classList.add('currentPage');
    return;
  } else if (crPg === 3) {
    pageOne.classList.add('currentPage');
    pageTwo.classList.remove('currentPage');

    pageOne.textContent = 3;
    pageTwo.textContent = 4;
  }
}

// const prevButton = document.querySelector('.page_back');
// prevButton.addEventListener('click', () => {
//   updatePage('page_back');
//   //   addCarenPageStyl();
// });

// const nextButton = document.querySelector('.nextPage');
// nextButton.addEventListener('click', () => {
//   updatePage('nextPage');
//   //   addCarenPageStyl();
// });
