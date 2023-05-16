const theBody = document.querySelector('body');
const openNav = document.querySelector('.header-menu button');
const closeNav = document.querySelector('.close-nav button');
const HeaderNavbar = document.querySelector('.header-navbar');


if(window.location.pathname === "/index.html") {
  document.querySelector('.header-shopping').classList.remove('header-active');
  document.querySelector('.header-home').classList.add('header-active');
} else if(window.location.pathname === "/shopping-list.html") {
  document.querySelector('.header-home').classList.remove('header-active');
  document.querySelector('.header-shopping').classList.add('header-active');
}


function showHide() {
  HeaderNavbar.classList.toggle('show');
}

openNav.onclick = showHide;
closeNav.onclick = showHide;
