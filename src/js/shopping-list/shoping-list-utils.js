import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

export function notifyInit() {
  Notiflix.Notify.init({
    info: {
      background: '#4F2EE8',
      notinflixIconColor: '#fff',
    },
  });
}

export function emptyShoppingListNotify() {
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

const emptyShoppingPage = document.querySelector('.shopping-cart-is-empty');
const cardsContainer = document.querySelector('.books__list');

const ViewportConst = {
  mobile_S: 320,
  mobile_M: 375,
  mobile_L: 425,
  tablet: 768,
  laptop: 1024,
  laptop_L: 1440,
  desktop_4K: 2560,
};

const paginationTemplate = {
  page: '<a href="#" class="tui-page-btn">{{page}}</a>',
  currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
  moveButton:
    '<a href="#" class="tui-page-btn tui-{{type}}">' +
    '<span class="tui-ico-{{type}}">{{type}}</span>' +
    '</a>',
  disabledMoveButton:
    '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
    '<span class="tui-ico-{{type}}">{{type}}</span>' +
    '</span>',
  moreButton:
    '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
    '<span class="tui-ico-ellip">...</span>' +
    '</a>',
};

export { ViewportConst, emptyShoppingPage, cardsContainer, paginationTemplate };
