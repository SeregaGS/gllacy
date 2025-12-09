const openDropdown = (menu, button, activeClass) => {
  let isOpen = button.dataset.open === "true";
  const openDropdown = menu.querySelector('[data-open="true"]');

  if(openDropdown && openDropdown !== button) {
    openDropdown.dataset.open = "false";
    openDropdown.classList.remove(activeClass);
  }
  button.classList.toggle(activeClass);
  button.dataset.open = isOpen ? "false" : "true";
}

const menu = document.querySelector('.menu-list');

menu.addEventListener('click', (e) => {
  const clickLink = e.target;
  if(!clickLink.classList.contains('menu-list__link--dropdown')) { return }
  e.preventDefault();
  openDropdown(menu, clickLink, 'menu-list__link--active');
})
const formSearch = document.querySelector('.form-search__button');

formSearch.addEventListener('click', (e) => {
  const clickLink = e.target;
  e.preventDefault();
  console.log(clickLink)
  openDropdown(formSearch, clickLink, 'header-button--active');
})

const buttonLogin = document.querySelector('.button-login');

buttonLogin.addEventListener('click', (e) => {
  const clickLink = e.target;
  e.preventDefault();
  console.log(clickLink)
  openDropdown(buttonLogin, clickLink, 'header-button--active');
})
const buttonCart = document.querySelector('.button-cart');

buttonCart.addEventListener('click', (e) => {
  const clickLink = e.target;
  e.preventDefault();
  console.log(clickLink)
  openDropdown(buttonLogin, clickLink, 'header-button--active');
})
