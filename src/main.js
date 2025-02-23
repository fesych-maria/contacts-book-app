import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconError from './img/error.svg';
import iconInfo from './img/info.svg';
import { fetchImages } from './js/pixabay-api.js';

export const refs = {
  searchBtn: document.querySelector('.js-search-btn'),
  searchInput: document.querySelector('.js-search-field'),
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-btn'),
  loader: document.querySelector('.loader'),
};

export const errorObj = {
  position: 'topRight',
  message: "We're sorry, but you've reached the end of search results.",
  messageColor: '#fafafb',
  messageSize: '16px',
  backgroundColor: '#ef4040',
  iconUrl: iconError,
};

export const infoObj = {
  position: 'topRight',
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  messageColor: '#fafafb',
  messageSize: '16px',
  backgroundColor: '#09f',
  iconUrl: iconInfo,
};

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', loadMore);

const fetchParameters = {
  key: '48862080-31d0d2e2035ba3e1d36ba0d4d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

async function onSubmit(e) {
  e.preventDefault();
  showLoader();
  const inputValue = refs.searchInput.value.trim();
  if (!inputValue) {
    return;
  }
  fetchParameters.q = inputValue;
  fetchParameters.page = 1;
  refs.gallery.innerHTML = '';
  refs.form.reset();
  await fetchImages(fetchParameters);
  checkEndOfCollection();
  hideOnlyLoader();
}

async function loadMore() {
  fetchParameters.page += 1;
  showLoader();
  await fetchImages(fetchParameters);
  checkEndOfCollection();
  hideOnlyLoader();
  onScroll();
}

function hideOnlyLoader() {
  refs.loader.classList.add('visually-hidden');
}

function showLoader() {
  refs.loader.classList.remove('visually-hidden');
  refs.loadBtn.classList.add('visually-hidden');
}

function hideLoader() {
  refs.loader.classList.add('visually-hidden');
  refs.loadBtn.classList.remove('visually-hidden');
}

function checkEndOfCollection() {
  const maxPage = Math.ceil(
    fetchParameters.totalHits / fetchParameters.per_page
  );
  if (maxPage === 0) {
    refs.loadBtn.classList.add('visually-hidden');
    return;
  }
  if (fetchParameters.page >= maxPage) {
    iziToast.info(infoObj);
    refs.loadBtn.classList.add('visually-hidden');
  } else {
    refs.loadBtn.classList.remove('visually-hidden');
  }
}

function onScroll() {
  const imgLi = document.querySelector('.gallery-item');
  const height = imgLi.getBoundingClientRect().height;
  const totalHeight = height * 2;
  window.scrollBy({
    top: totalHeight,
    behavior: 'smooth',
  });
}
