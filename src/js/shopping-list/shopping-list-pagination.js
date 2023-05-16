import '../side-bar/supportCreateList';

const listBtn = document.querySelector('.sh-list__pagination');
const page = document.querySelector('.nullInList');
const listWithBoks = document.querySelector('.listWithBoks');

let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
localStorage.setItem('currentPage', currentPage);

localStorage.setItem(
  'ui-theme',
  '[{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Ilona","age":3,"isHappy":true}, {"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true},{"name":"Mango","age":3,"isHappy":true}]'
);
const local = localStorage.getItem('ui-theme');
const savedSettings = JSON.parse(localStorage.getItem('ui-theme'));

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
  createBoksCard(result[0]);

  if (savedSettings.length > 3) {
    addBtn();
  }
}

function createBoksCard(arr) {
  const card = arr
    .map(
      ({ name, age, isHappy }) =>
        `<li>
  <div class="cards">
  <h2>${name}</h2>
  <p>${age}</p>
  <p>Щаслива?${isHappy}</p>
        </div>
  </li>`
    )
    .join('');
  return listWithBoks.insertAdjacentHTML('beforeend', card);
}

function addBtn() {
  listBtn.insertAdjacentHTML(
    'beforeend',
    `<li><button class="sh-list__pagination-btn beginning"> << </button></li>
  <li><button class="sh-list__pagination-btn page_back"> < </button></li>
  <li><button class="sh-list__pagination-btn nuber_of_page pageOne currentPage"> 1 </button> </li>
  <li><button class="sh-list__pagination-btn nuber_of_pagepage pageTwo"> 2 </button></li>
  <!-- <li><button class="sh-list__pagination-btn nuber_of_pagepage pageThre"> 3 </button></li> -->
  <li><button class="sh-list__pagination-btn nuber_of_pagepage btnLoadMore"> ... </button></li>
  <li> <button class="sh-list__pagination-btn nextPage"> > </button> </li>
  <li> <button class="sh-list__pagination-btn lastPage"> >> </button> </li>`
  );
}

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
    createBoksCard(result[0]);
    pageOne.classList.add('currentPage');
  } else if (btnClass[2] === 'pageOne') {
    currentPage = 1;
    localStorage.setItem('currentPage', currentPage);
    listWithBoks.innerHTML = '';
    createBoksCard(result[0]);
  } else if (btnClass[2] === 'pageTwo') {
    currentPage = 2;
    localStorage.setItem('currentPage', currentPage);
    pageTwo.classList.add('currentPage');
    listWithBoks.innerHTML = '';
    createBoksCard(result[1]);
  } else if (btnClass[1] === 'lastPage') {
    currentPage = allPages;
    localStorage.setItem('currentPage', currentPage);
    listWithBoks.innerHTML = '';
    createBoksCard(result[result.length - 1]);
  } else if (btnClass[2] === 'btnLoadMore') {
    localStorage.setItem('currentPage', 3);
    listWithBoks.innerHTML = '';
    createBoksCard(result[2]);
  }
}

const btnLoadMore = document.querySelector('.btnLoadMore');
btnLoadMore.addEventListener('click', onClickMore);

function onClickMore() {
  if (allPages > 3) {
    return;
  }
  pageOne.textContent = 2;
  pageTwo.textContent = 3;
}

nextPage.addEventListener('click', updatePage('nextPage'));
lastPage.addEventListener('click', updatePage('page_back'));

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

  createBoksCard(cardsToRender);
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

// function addCarentPage(allPages) {
//   for (let i = 1; i <= allPages; i += 1) {
//     localStorage.setItem('currentPage', [i]);
//   }
// }

const prevButton = document.querySelector('.page_back');
prevButton.addEventListener('click', () => {
  updatePage('page_back');
  addCarenPageStyl();
});

const nextButton = document.querySelector('.nextPage');
nextButton.addEventListener('click', () => {
  updatePage('nextPage');
  addCarenPageStyl();
});
