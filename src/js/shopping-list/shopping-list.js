// import { shoppingListPagination } from './shoping-list-pagination';
const refs = {
  btnRemove: document.querySelectorAll('.shop-card__delete'),
};

window.addEventListener('load', () => {
  const refs = {
    btnRemove: document.querySelectorAll('.shop-card__delete'),
  };

  for (let i = 0; i < refs.btnRemove.length; i++) {
    refs.btnRemove[i].addEventListener('click', onRemoveCard);
  }
});

function onRemoveCard(ev) {
  const bookShopCard = ev.target.closest('.shop-card');
  const bookId = bookShopCard.dataset.id;
  removeShopCard(bookShopCard);
  removeFromLocalStorage(bookId);
  // shoppingListPagination();
}

function removeShopCard(bookShopCard) {
  bookShopCard.classList.add('is-hidden');
  bookShopCard.remove();
}

function removeFromLocalStorage(id) {
  try {
    let shoppingList = JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY'));
    let updatedShoppingList = shoppingList.filter(item => item._id != id);
    localStorage.setItem(
      'SHOPPING_LIST_KEY',
      JSON.stringify(updatedShoppingList)
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to parse data from localStorage');
  }

  if (JSON.parse(localStorage.getItem('SHOPPING_LIST_KEY')).length == 0) {
    localStorage.removeItem('SHOPPING_LIST_KEY');
  }
}
