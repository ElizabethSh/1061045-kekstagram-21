'use strict';

(function () {
  const main = window.galery.main;
  const uploadInput = main.querySelector(`#upload-file`);
  const errorTemplate = document.querySelector(`#error`)
    .content.querySelector(`.error`);


  const removeErrorMessage = () => {
    const errorWindow = main.querySelector(`.error`);

    errorWindow.remove();
    document.removeEventListener(`keydown`, errorWindowEscPressHandler);
  };

  const errorWindowEscPressHandler = (evt) => {
    window.utils.isEscapeEvent(evt, removeErrorMessage);
  };

  const errorButtonClickHandler = () => {
    removeErrorMessage();
  };

  const errorWindowClickHandler = (evt) => {
    const errorWindow = main.querySelector(`.error`);

    if (evt.target === errorWindow) {
      evt.preventDefault();
      removeErrorMessage();
    }
  };

  const errorHandler = (message) => {
    const error = errorTemplate.cloneNode(true);

    error.querySelector(`.error__title`).textContent = message;
    main.appendChild(error);
    uploadInput.disabled = false;

    error.querySelector(`.error__button`).addEventListener(`click`, errorButtonClickHandler);
    error.addEventListener(`click`, errorWindowClickHandler);
    document.addEventListener(`keydown`, errorWindowEscPressHandler);
  };

  window.error = {
    uploadInput,
    errorHandler,
  };
})();
