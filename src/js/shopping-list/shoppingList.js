




export default function createCardBook(book) {
  const oneBook = book
    .map(({ book_image, title, list_name, description, author, buy_links }) => {
      return `  <li class="shop-card">
            <div>
               <img class="shop-card__img" src="${book_image}" alt="${title}" width="100" height="142" /> 
            </div>
            <div class="shop-card___inform">
                <div class="shop-card__wrap-first">
                    <div class="shop-card__wrap-inform">
                        <h2 class="shop-card__name">${title}</h2>
                        <p class="shop-card__category">${list_name}</p>
                    </div>
                    <button class="shop-card__delete"  type="button">
                        <svg class="shop-card__delete-svg" width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.040 0.031c-0.103 0.012-0.451 0.047-0.773 0.078-0.763 0.075-2.021 0.326-2.824 0.563-1.815 0.536-3.73 1.524-5.309 2.741-0.763 0.588-2.287 2.143-2.883 2.942-1.723 2.311-2.735 4.791-3.122 7.645-0.115 0.847-0.132 2.932-0.031 3.733 0.267 2.123 0.748 3.711 1.673 5.532 1.549 3.018 3.946 5.416 6.876 6.923l0.089 0.041c2.382 1.211 4.598 1.742 7.265 1.742s4.883-0.531 7.265-1.742c1.593-0.81 2.684-1.608 4.019-2.945s2.135-2.426 2.945-4.019c0.925-1.821 1.407-3.414 1.673-5.532 0.099-0.785 0.083-2.835-0.027-3.671-0.39-2.943-1.487-5.591-3.288-7.929-0.588-0.763-2.143-2.287-2.942-2.883-2.301-1.716-4.829-2.749-7.618-3.115-0.632-0.083-2.584-0.152-2.987-0.104zM18.747 8.291c0.297 0.124 0.408 0.358 0.388 0.816-0.015 0.349-0.033 0.403-0.181 0.551-0.102 0.096-0.227 0.169-0.366 0.211l-0.007 0.002c-0.272 0.062-4.892 0.062-5.164 0-0.145-0.043-0.27-0.116-0.373-0.213l0.001 0c-0.148-0.148-0.166-0.201-0.181-0.551-0.020-0.452 0.089-0.69 0.376-0.814 0.258-0.112 5.238-0.114 5.506-0.002zM23.432 10.63c0.458 0.3 0.484 1.165 0.044 1.459-0.108 0.072-0.28 0.1-0.715 0.116-0.52 0.019-0.573 0.029-0.573 0.122 0 0.299-0.544 8.147-0.593 8.55-0.113 0.931-0.39 1.501-1.006 2.071-0.402 0.371-0.768 0.575-1.283 0.717-0.312 0.086-0.628 0.095-3.305 0.095-3.24 0-3.293-0.004-3.92-0.328-0.973-0.502-1.531-1.36-1.677-2.579-0.046-0.387-0.589-8.24-0.589-8.526 0-0.093-0.053-0.104-0.573-0.122-0.645-0.024-0.799-0.088-0.942-0.389-0.104-0.221-0.11-0.679-0.010-0.872 0.089-0.182 0.245-0.319 0.434-0.382l0.005-0.002c0.084-0.025 3.394-0.041 7.355-0.037 6.843 0.009 7.209 0.014 7.349 0.106zM11.52 12.347c0 0.368 0.543 8.152 0.589 8.439 0.029 0.182 0.076 0.391 0.103 0.463 0.077 0.2 0.422 0.558 0.665 0.688 0.215 0.115 0.24 0.116 3.123 0.116s2.909-0.001 3.123-0.116c0.243-0.13 0.589-0.488 0.665-0.688 0.027-0.072 0.073-0.281 0.103-0.463 0.045-0.286 0.589-8.071 0.589-8.439v-0.134h-8.96v0.134zM14.947 14.114c0.339 0.174 0.333 0.129 0.333 2.659 0 2.104-0.008 2.311-0.093 2.441-0.138 0.211-0.384 0.317-0.733 0.317s-0.579-0.1-0.725-0.315c-0.096-0.141-0.101-0.278-0.101-2.443 0-2.285 0-2.294 0.119-2.459 0.228-0.322 0.783-0.413 1.201-0.2zM18.032 14.11c0.096 0.057 0.176 0.131 0.238 0.218l0.002 0.002c0.095 0.14 0.103 0.291 0.117 2.349 0.014 2.087 0.010 2.213-0.088 2.436-0.132 0.298-0.344 0.414-0.754 0.414-0.349 0-0.595-0.106-0.733-0.317-0.084-0.129-0.095-0.349-0.11-2.332-0.018-2.301-0.003-2.477 0.218-2.684 0.231-0.217 0.774-0.261 1.111-0.088z"></path>
        
                        </svg>
                    </button>
                </div>
                <div class="shop-card__wrap-second">
                    <p class="shop-card__title">${description}
                    </p>
                </div>
                <div class="shop-card__wrap-third">
                    <p class="shop-card__author">${author}</p>
                    <ul class="market">
                      ${buy_links ? createLinksMarkup(buy_links) : ''}
                    </ul>
                </div>
            </div>
        </li>`;
    })
    .join('');
  return oneBook;
}


function getPngUrlForStore(storeName) {
  const store = pngUrls.find(item => item.name === storeName);
  if (store) {
    return {
      pngUrlx: store.pngUrlx,
      pngUrl2x: store.pngUrl2x,
    };
  } else {
    return {
      pngUrlx: '',
      pngUrl2x: '',
    };
  }
}

function createLinksMarkup(buyLinks) {
  const supportedStores = ["Amazon", "Apple Books", "Bookshop"];

  const filteredLinks = buyLinks.filter(link => supportedStores.includes(link.name));

  return filteredLinks
    .map((link) => {
      const { name, url } = link;
      const { pngUrlx, pngUrl2x } = getPngUrlForStore(name);
      return `
                <li class="market__marketplace"><a href="">${url}
                            <img srcset="${pngUrlx} 1x, ${pngUrl2x} 2x" 
                            src="${pngUrlx}" alt="${name}" width="32"
                                class="market__png" />
                        </a></li>
                        <li class="market__marketplace"><a href="">${url}
                            <img srcset="${pngUrlx} 1x, ${pngUrl2x} 2x"
                             src="${pngUrlx}"
                                alt="${name}" width="16" class="market__png" />
                        </a></li>
                        <li class="market__marketplace"><a href="">${url}
                            <img srcset="${pngUrlx} 1x, ${pngUrl2x} 2x" 
                            src="${pngUrlx}"
                                alt="${name}" width="16" class="market__png" />`;
    })
    .join("");
}

const pngUrls = [
  {
    name: 'Amazon',
    
    pngUrlx: require('../../images/modal/image-1@1x.png'),
    pngUrl2x: require('../../images/modal/image-1@2x.png'),
  },
  {
    name: 'Apple Books',
   
    pngUrlx: require('../../images/modal/image-2@1x.png'),
    pngUrl2x: require('../../images/modal/image-2@2x.png'),
  },
  {
    name: 'Bookshop',
    
    pngUrlx: require('../../images/modal/image3-1x.png'),
    pngUrl2x: require('../../images/modal/image3-2x.png'),
  },
];

const btnRemove = document.querySelector(".shop-card__delete");

btnRemove.addEventListener("click", onRemoveCard);

function onRemoveCard(ev) {
    if (ev.target.dataset.action !== 'delete') {
    return;
    }

    const closetNode = ev.target.closest('.shop-card');
    const bookRemoveId = closetNode.dataset.id;

    bookRemoveId.classList.add('is-hidden');
    bookRemoveId.remove();
    localStorage.removeItem(SHOPPING_LIST_KEY);
    return;
}