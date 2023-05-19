const headerToggleTheme = document.querySelector('.header__toggle');
const headerLogo = document.querySelector('.header__logo');

headerToggleTheme.addEventListener('click', onToggleClick);


setLogo()

function setLogo() {
  if (localStorage.getItem('theme') === 'dark-theme') {
    headerLogo.innerHTML = headerLogo.innerHTML.replace('svg#icon-logo', 'svg#icon-logo--dark');
  }
  else {
    headerLogo.innerHTML = headerLogo.innerHTML.replace('svg#icon-logo--dark', 'svg#icon-logo');
  }
}

function onToggleClick(event){
  event.preventDefault();

  if (headerLogo.innerHTML.includes('svg#icon-logo--dark')){
    headerLogo.innerHTML = headerLogo.innerHTML.replace('svg#icon-logo--dark', 'svg#icon-logo');
  }
  else {
    headerLogo.innerHTML = headerLogo.innerHTML.replace('svg#icon-logo', 'svg#icon-logo--dark');
  }

  if (localStorage.getItem('theme') === 'dark-theme') {
    localStorage.removeItem('theme');
    headerToggleTheme.classList.remove('header__toggle-on');
  }
  else {
    localStorage.setItem('theme', 'dark-theme');
    headerToggleTheme.classList.add('header__toggle-on');
  }
  addDarkThemeToHTML();
}


function addDarkThemeToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark-theme') {
      document.querySelector('html').classList.add('dark-theme');
    }
    else {
      document.querySelector('html').classList.remove('dark-theme');
    }
  } catch (err) { }
}

addDarkThemeToHTML();
