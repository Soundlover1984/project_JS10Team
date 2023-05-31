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

export const viewportMediaConst = {
  desktop_4K: 2560,
  laptop_L: 1440,
  laptop: 1024,
  tablet: 768,
  mobile_L: 425,
  mobile_M: 375,
  mobile_S: 320,
};
