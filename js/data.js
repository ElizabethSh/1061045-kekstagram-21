'use strict';

(function () {
  const GET_URL = `https://24.javascript.htmlacademy.pro/kekstagram/data`;

  const filterList = window.filter.filterList;
  const main = window.galery.main;
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
    filterList.classList.remove(`img-filters--inactive`);
    filterList.addEventListener(`click`, filterClickHandler);

    window.data = {
      photos
    };
  };

  const errorHandler = (message) => {
    const error = errorLoadTemplate.cloneNode(true);

    error.querySelector(`.error__title`).textContent = message;
    main.appendChild(error);
  };

  window.backend.load(`GET`, GET_URL, successHandler, errorHandler);
})();
