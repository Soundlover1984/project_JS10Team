const headerToggleTheme = document.querySelector('.header__toggle');
const headerLogo = document.querySelector('.header__logo');
const headerHomeText = document.querySelector('.header-home');
const headerShopListText = document.querySelector('.header-shopping');
const iconShopDarkTheme = document.querySelector('.icon-dark-theme');

headerToggleTheme.addEventListener('click', onToggleClick);

setLogo();

function setLogo() {
  if (localStorage.getItem('theme') === 'dark-theme') {
    headerLogo.innerHTML = headerLogo.innerHTML.replace(
      'svg#icon-logo',
      'svg#icon-logo--dark'
    );
  } else {
    headerLogo.innerHTML = headerLogo.innerHTML.replace(
      'svg#icon-logo--dark',
      'svg#icon-logo'
    );
  }
}

function onToggleClick(event) {
  event.preventDefault();

  if (headerLogo.innerHTML.includes('svg#icon-logo--dark')) {
    headerLogo.innerHTML = headerLogo.innerHTML.replace(
      'svg#icon-logo--dark',
      'svg#icon-logo'
    );
  } else {
    headerLogo.innerHTML = headerLogo.innerHTML.replace(
      'svg#icon-logo',
      'svg#icon-logo--dark'
    );
  }

  if (localStorage.getItem('theme') === 'dark-theme') {
    localStorage.removeItem('theme');
    headerToggleTheme.classList.remove('header__toggle-on');
  } else {
    if (headerHomeText.classList.contains('header-active')) {
      headerHomeText.style.color = 'black';
    }
    if (headerShopListText.classList.contains('header-active')) {
      headerShopListText.style.color = 'black';
      iconShopDarkTheme.classList.add('shop__iconSvg-dark');
    }
    localStorage.setItem('theme', 'dark-theme');
    headerToggleTheme.classList.add('header__toggle-on');
  }
  addDarkThemeToHTML();
}

function addDarkThemeToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark-theme') {
      document.querySelector('html').classList.add('dark-theme');
    } else {
      document.querySelector('html').classList.remove('dark-theme');
    }
  } catch (err) {}
}

addDarkThemeToHTML();
