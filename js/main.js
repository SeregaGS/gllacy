'use strict';
const DOMElements = {
  body: document.querySelector('.main-body'),
  header: document.querySelector('.main-header'),
  openModalButton: document.querySelector('.contacts__button'),
  modal: document.querySelector('.modal'),
  slider: document.querySelector('.slider'),
}
const HEADERS = {
  menuList: '.menu-list',
  menuSearch: '.form-search__button',
  menuLogin: '.button-login',
  menuCart: '.button-cart',
}
const CLASSNAME = {
  menuLinkActive: 'menu-list__link--active',
  menuButtonActive: 'header-button--active',
  dropdown: 'menu-list__link--dropdown',
  modalShow: 'modal--show',
  modalOverlay: '.modal__overlay',
  modalOverlayBody: 'body-overlay',
  modalClose: '.modal__button-close',
  sliderButtonPrev: '.controls__button--prev',
  sliderButtonNext: '.controls__button--next',
  sliderItem: '.slider__item',
  sliderItemActive: 'slider__item--active',
  sliderImage: '.slider__images-item',
  sliderImageActive: 'slider__images-item--active',
  sliderDot: '.slider__dot',
  sliderDotActive: 'slider__dot--active',
  input: '.input',
}

const initDropdown = () => {
  if(!DOMElements.header) return;

  /* DOM ELEMENTS */
  const headerMenu = DOMElements.header.querySelector(HEADERS.menuList);
  const headerMenuSearch = DOMElements.header.querySelector(HEADERS.menuSearch);
  const headerMenuLogin = DOMElements.header.querySelector(HEADERS.menuLogin);
  const headerMenuCart = DOMElements.header.querySelector(HEADERS.menuCart);

  /* DROPDOWN */
  const closeDropdown = () => {
    DOMElements.header.querySelectorAll('[data-open="true"]').forEach((el) => {
      el.dataset.open = "false";
      el.classList.remove(CLASSNAME.menuLinkActive, CLASSNAME.menuButtonActive);
    })
  };
  const openDropdown = (button, activeClass) => {
    const isOpen = button.dataset.open === "true";
    closeDropdown();
    if(!isOpen) {
      button.dataset.open = "true";
      button.classList.add(activeClass);
    }
  };
  const openDropdownButton = (e) => {
    const clickLink = e.target;
    e.preventDefault();
    openDropdown(clickLink, CLASSNAME.menuButtonActive);
  };
  const openDropdownButtonLink = (e) => {
    const clickLink = e.target;
    if(!clickLink.classList.contains(CLASSNAME.dropdown)) { return }
    e.preventDefault();
    openDropdown(clickLink, CLASSNAME.menuLinkActive);
  };

  /* DROPDOWN EVENT LISTENER */
  headerMenu.addEventListener('click', openDropdownButtonLink)
  headerMenuSearch.addEventListener('click', openDropdownButton);
  headerMenuLogin.addEventListener('click', openDropdownButton);
  headerMenuCart.addEventListener('click', openDropdownButton);

}
const inputSearchReset = () => {
  if(!DOMElements.header) return;

  const searchInput = DOMElements.header.querySelector('.form-search__input');
  const buttonReset = DOMElements.header.querySelector('.button-close--reset');

  searchInput.addEventListener('input', e => {
    buttonReset.style.display = 'block';
  })

  buttonReset.addEventListener('click', e => {
    searchInput.focus();
    buttonReset.style.display = 'none';
  })
}
const initModal = () => {
  if(!DOMElements.modal || !DOMElements.openModalButton) return;

  /* DOM ELEMENTS */
  const closeModalButton = DOMElements.modal.querySelector(CLASSNAME.modalClose);
  /* MODAL POPUP */
  const cleanInput = () => {
    const modalInput = DOMElements.modal.querySelectorAll(CLASSNAME.input);
    modalInput.forEach(el => {
      el.value = '';
    })
  };
  const openModal = () => {
    cleanInput();
    DOMElements.modal.classList.add(CLASSNAME.modalShow);
    DOMElements.body.classList.add(CLASSNAME.modalOverlayBody);
  };
  const closeModal =  () => {
    DOMElements.modal.classList.remove(CLASSNAME.modalShow);
    DOMElements.body.classList.remove(CLASSNAME.modalOverlayBody);
  };
  const closeModalOverlay = (e) => {
    if(e.target.closest(CLASSNAME.modalOverlay)) {
      closeModal();
    }
  };
  const closeModalKeyPress = (e) => {
    if(DOMElements.modal.classList.contains(CLASSNAME.modalShow) && e.key === 'Escape') {
      closeModal();
    }
  };
  /* MODAL POPUP EVENT LISTENER */
  DOMElements.openModalButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);
  DOMElements.modal.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalKeyPress);
}
const initSlider = () => {
  if(!DOMElements.slider) return;

  /* DOM ELEMENTS */
  const sliderPrevButton = DOMElements.slider.querySelector(CLASSNAME.sliderButtonPrev);
  const sliderNextButton = DOMElements.slider.querySelector(CLASSNAME.sliderButtonNext);
  const slides = Array.from(DOMElements.slider.querySelectorAll(CLASSNAME.sliderImage));
  const sliderDot = Array.from(DOMElements.slider.querySelectorAll(CLASSNAME.sliderDot));
  const slidesDescription = Array.from(DOMElements.slider.querySelectorAll(CLASSNAME.sliderItem));
  const slidesDots = document.querySelectorAll('.slider__dot');

  const SLIDERCOUNT = slides.length;

  let slideIndex = 0;

  /* SLIDER */
  const orderSliderElements = (index) => {
    return (index - slideIndex + SLIDERCOUNT) % SLIDERCOUNT;
  };
  const toggleClassSlider = (slides, className) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle(className, index === slideIndex);
    })
  };
  const updateSliderBackground =  () => {
    DOMElements.body.classList.forEach(className => {
      if(className.startsWith('slider-active--')) {
        DOMElements.body.classList.remove(className);
      }
    })
    DOMElements.body.classList.add(`slider-active--${slideIndex + 1}`);
  };
  const toggleClassSliderImage =  (slides, className) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle(className, index === slideIndex);
      slide.style.order = orderSliderElements(index);
    })
  };
  const updateSlider = () => {
    toggleClassSliderImage(slides, CLASSNAME.sliderImageActive)
    updateSliderBackground();
    toggleClassSlider(sliderDot, CLASSNAME.sliderDotActive);
    toggleClassSlider(slidesDescription, CLASSNAME.sliderItemActive);
  };
  const updateSliderButtons = (e) => {
    if(e.target.classList.contains('controls__button--prev')) {
      slideIndex = (slideIndex - 1 + SLIDERCOUNT) % SLIDERCOUNT;
      updateSlider();
    } else {
      slideIndex = (slideIndex + 1) % SLIDERCOUNT;
      updateSlider();
    }
  };

  /* SLIDER EVENT LISTENER */
  sliderPrevButton.addEventListener('click', updateSliderButtons);
  sliderNextButton.addEventListener('click', updateSliderButtons);
  slidesDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      slideIndex = index;
      updateSlider();
    })
  });

}

inputSearchReset();
initDropdown();
initModal();
initSlider();
