const burgerBtn = document.querySelector('.header__burger-btn');
const closeBtn = document.querySelector('.header__close-btn');
const headerHomeText = document.querySelector('.header-home');
const headerShopListText = document.querySelector('.header-shopping');
const iconShopDarkTheme = document.querySelector('.icon-dark-theme');

if(window.location.pathname === "/index.html" || window.location.pathname === "/project_js10team/index.html") {
  headerHomeText.classList.add('header-active');
  headerShopListText.classList.remove('header-active');

  if (headerHomeText.classList.contains('header-active')) {
    headerHomeText.style.color = 'black';
  }
} else if(window.location.pathname === "/shopping-list.html" || window.location.pathname === "/project_js10team/shopping-list.html") {
  headerShopListText.classList.add('header-active');
  headerHomeText.classList.remove('header-active');


  if (headerShopListText.classList.contains('header-active')) {
    headerShopListText.style.color = 'black';
    iconShopDarkTheme.classList.add('shop__iconSvg-dark');
  }

} else {
  headerHomeText.classList.add('header-active');
}

burgerBtn.addEventListener('click', onClickBurder);

function onClickBurder(){
  closeBtn.style.display = "inline";
  burgerBtn.style.display = "none";
}


closeBtn.addEventListener('click', onClickClose);

function onClickClose(){
  closeBtn.style.display = "none";
  burgerBtn.style.display = "inline";
}
