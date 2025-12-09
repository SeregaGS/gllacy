const header = document.querySelector('.main-header');
const headerMenu = header.querySelector('.menu-list');
const headerMenuSearch = document.querySelector('.form-search__button');
const headerMenuLogin = document.querySelector('.button-login');
const headerMenuCart = document.querySelector('.button-cart');

const closeModal = () => {
  header.querySelectorAll('[data-open="true"]').forEach((el) => {
    el.dataset.open = "false";
    el.classList.remove('menu-list__link--active', 'header-button--active');
  })
}
const openDropdown = (button, activeClass) => {
  const isOpen = button.dataset.open === "true";

  closeModal();

  if(!isOpen) {
    button.dataset.open = "true";
    button.classList.add(activeClass);
  }
};


headerMenu.addEventListener('click', (e) => {
  const clickLink = e.target;
  if(!clickLink.classList.contains('menu-list__link--dropdown')) { return }
  e.preventDefault();
  openDropdown(clickLink, 'menu-list__link--active');
})
headerMenuSearch.addEventListener('click', (e) => {
  const clickLink = e.target;
  e.preventDefault();
  openDropdown(clickLink, 'header-button--active');
})
headerMenuLogin.addEventListener('click', (e) => {
  const clickLink = e.target;
  e.preventDefault();
  openDropdown(clickLink, 'header-button--active');
})
headerMenuCart.addEventListener('click', (e) => {
  const clickLink = e.target;
  e.preventDefault();
  openDropdown(clickLink, 'header-button--active');
})
