import Notiflix from 'notiflix';

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
