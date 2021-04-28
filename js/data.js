'use strict';

(function () {
  const GET_URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const errorLoadTemplate = document.querySelector(`#error-load`)
    .content.querySelector(`.error`);

  let photos;

  const filterClickHandler = (evt) => {
    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    window.debounce(() => {
      window.filter.updateGalery(evt, photos);
    });
  };

  const successHandler = (data) => {
    photos = data;
    window.galery.renderPictures(photos);
    window.filter.filterList.classList.remove(`img-filters--inactive`);
    window.filter.filterList.addEventListener(`click`, filterClickHandler);

    window.data = {
      photos
    };
  };

  const errorHandler = (message) => {
    const error = errorLoadTemplate.cloneNode(true);

    error.querySelector(`.error__title`).textContent = message;
    window.galery.main.appendChild(error);
  };

  window.backend.load(`GET`, GET_URL, successHandler, errorHandler);
})();
