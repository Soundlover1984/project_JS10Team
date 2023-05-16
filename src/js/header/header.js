const theBody = document.querySelector('body');
const openNav = document.querySelector('.header-menu button');
const closeNav = document.querySelector('.close-nav button');
const HeaderNavbar = document.querySelector('.header-navbar');

function showHide() {
  HeaderNavbar.classList.toggle('show');
}

openNav.onclick = showHide;
closeNav.onclick = showHide;

const headerList = document.querySelector(".header-list");
const active = headerList.querySelector(".header-current");

for (let i = 0; i < active.length; i++) {
  active[i].addEventListener("click", function() {
    let current = document.querySelector("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
