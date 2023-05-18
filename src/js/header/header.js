const burgerBtn = document.querySelector('.header__burger-btn');
const closeBtn = document.querySelector('.header__close-btn');

if(window.location.pathname === "/index.html" || window.location.pathname === "/project_js10team/index.html") {
  document.querySelector('.header-home').classList.add('header-active');
  document.querySelector('.header-shopping').classList.remove('header-active');
} else if(window.location.pathname === "/shopping-list.html" || window.location.pathname === "/project_js10team/shopping-list.html") {
  document.querySelector('.header-shopping').classList.add('header-active');
  document.querySelector('.header-home').classList.remove('header-active');
} else {
  document.querySelector('.header-home').classList.add('header-active');
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
