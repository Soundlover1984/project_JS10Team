const headerToggleTheme = document.querySelector('.header__toggle');

headerToggleTheme.addEventListener('click', onToggleClick);

function onToggleClick(event){
  event.preventDefault();

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
