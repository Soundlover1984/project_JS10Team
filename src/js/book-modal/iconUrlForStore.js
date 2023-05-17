import { iconUrls } from './iconUrlsArrey';

/**
        
        Отримання URL-адреси іконки магазину
        @param {string} storeName - Назва магазину
        @returns {Object} - Об'єкт з URL-адресами іконки магазину
        */
export function getIconUrlForStore(storeName) {
  const store = iconUrls.find(item => item.name === storeName);
  if (store) {
    return {
      iconUrl: store.iconUrl.src.href,
      iconUrl2x: store.iconUrl2x.src.href,
      width: store.iconUrl.width,
      height: store.iconUrl.height,
    };
  } else {
    return {
      iconUrl: '',
      iconUrl2x: '',
      width: 0,
      height: 0,
    };
  }
}
