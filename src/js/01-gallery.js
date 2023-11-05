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
    const instance = basicLightbox.create(`
      <img src="${largeImageURL}" width="800" height="600">
    `);
    instance.show();

    // Додайте закриття модального вікна після натискання клавіші Escape
    const onEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        instance.close();
        window.removeEventListener('keydown', onEscapeKeyPress);
      }
    };
    
    window.addEventListener('keydown', onEscapeKeyPress);
  }
});
