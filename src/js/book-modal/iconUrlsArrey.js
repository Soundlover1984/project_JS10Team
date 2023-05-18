// Масив з URL-адресами іконок магазинів
export const iconUrls = [
  {
    name: 'Amazon',
    iconUrl: {
      src: new URL('../../images/modal/image-1@1x.png', import.meta.url),
      width: 62,
      height: 19,
    },
    iconUrl2x: {
      src: new URL('../../images/modal/image-1@2x.png', import.meta.url),
      width: 62,
      height: 19,
    },
  },

  {
    name: 'Apple Books',
    iconUrl: {
      src: new URL('../../images/modal/image-2@1x.png', import.meta.url),
      width: 33,
      height: 32,
    },
    iconUrl2x: {
      src: new URL('../../images/modal/image-2@2x.png', import.meta.url),
      width: 33,
      height: 32,
    },
  },

  {
    name: 'Bookshop',
    iconUrl: {
      src: new URL('../../images/modal/image3-1x.png', import.meta.url),
      width: 38,
      height: 36,
    },
    iconUrl2x: {
      src: new URL('../../images/modal/image3-2x.png', import.meta.url),
      width: 38,
      height: 36,
    },
  },
];
