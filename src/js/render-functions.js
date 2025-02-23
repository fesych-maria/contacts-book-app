import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from '../main.js';

function imgTemplate(img) {
  return `<li class="gallery-item">
          <div class="img-wrapper">
          <a href="${img.largeImageURL}" class="gallery-link">
          <img src="${img.webformatURL}" alt="${img.tags}" class="gallery-img" />
          </a>
          </div>
          <ul class="img-text-list">
            <li class="img-text-item first-category">
              <p class="img-text-category">Likes</p>
              <p class="img-text-value">${img.likes}</p>
            </li>
            <li class="img-text-item second-category">
              <p class="img-text-category">Views</p>
              <p class="img-text-value">${img.views}</p>
            </li>
            <li class="img-text-item third-category">
              <p class="img-text-category">Comments</p>
              <p class="img-text-value">${img.comments}</p>
            </li>
            <li class="img-text-item">
              <p class="img-text-category">Downloads</p>
              <p class="img-text-value">${img.downloads}</p>
            </li>
          </ul>
        </li>`;
}

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function imagesTemplate(images) {
  const markup = images.map(imgTemplate).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
  return markup;
}
