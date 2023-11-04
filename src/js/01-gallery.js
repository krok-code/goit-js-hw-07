import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
const galleryItemsHTML = galleryItems
  .map(
    (item, index) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
          data-index="${index}"
        />
      </a>
    </li>
  `
  )
  .join('');

galleryList.innerHTML = galleryItemsHTML;

galleryList.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'IMG') {
    const largeImageURL = e.target.dataset.source;
    const index = Number(e.target.dataset.index);
    const lightbox = new basicLightbox.create(`
      <img width="1400" height="900" src="${largeImageURL}">
    `);
    lightbox.show();

    // Додайте закриття модального вікна після натискання клавіші Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.close();
      }
    });
  }
});
