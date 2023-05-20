import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { createShoppingList } from './shoping-list-pagination';

export function notifyInit() {
  Notiflix.Notify.init({
    info: {
      background: '#4F2EE8',
      notinflixIconColor: '#fff',
    },
  });
}

export function emptyShopingListNotify() {
  Notiflix.Notify.info('Your shopping list is empty. Please add a book', {
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
  });
}

let currentViewport = document.documentElement.clientWidth;
let previousViewport = currentViewport;

const Viewport = {
  mobile_S: 320,
  mobile_M: 375,
  mobile_L: 425,
  tablet: 768,
  laptop: 1024,
  laptop_L: 1440,
  desktop_4K: 2560,
};

export function addEventListenerWindow() {
  window.addEventListener('resize', debounce(viewporthHandler, 250));
}

export function viewporthHandler(event) {
  currentViewport = document.documentElement.clientWidth;

  if (currentViewport >= Viewport.desktop_4K) {
    currentViewport = Viewport.desktop_4K;
  } else if (currentViewport >= Viewport.laptop_L) {
    currentViewport = Viewport.laptop_L;
  } else if (currentViewport >= Viewport.laptop) {
    currentViewport = Viewport.laptop;
  } else if (currentViewport >= Viewport.tablet) {
    currentViewport = Viewport.tablet;
  } else if (currentViewport >= Viewport.mobile_L) {
    currentViewport = Viewport.mobile_L;
  } else if (currentViewport >= Viewport.mobile_M) {
    currentViewport = Viewport.mobile_M;
  } else {
    currentViewport = Viewport.mobile_S;
  }

  if (previousViewport != currentViewport) {
    createShoppingList();
    previousViewport = currentViewport;
  }
}

export function calculatePaginationParameters() {
  let itemsPerPage;
  let buttonsPerPage;

  switch (currentViewport) {
    case Viewport.desktop_4K:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case Viewport.laptop_L:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case Viewport.laptop:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case Viewport.tablet:
      itemsPerPage = 3;
      buttonsPerPage = 3;
      break;
    case Viewport.mobile_L:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    case Viewport.mobile_M:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    case Viewport.mobile_S:
      itemsPerPage = 4;
      buttonsPerPage = 2;
      break;
    default:
      itemsPerPage = 4;
      buttonsPerPage = 2;
  }

  const paginationParameters = {
    itemsPerPage: itemsPerPage,
    buttonsPerPage: buttonsPerPage,
  };
  return paginationParameters;
}
