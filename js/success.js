'use strict';

(function () {
  const successTemplate = document.querySelector(`#success`)
    .content.querySelector(`.success`);


  const closeSuccessMessage = () => {
    window.galery.main.querySelector(`.success`).remove();

    document.removeEventListener(`keydown`, successWindowEscPressHandler);
  };

  const successWindowEscPressHandler = (evt) => {
    window.utils.isEscapeEvent(evt, closeSuccessMessage);
  };

  const successWindowClickHandler = (evt) => {
    const successWindow = window.galery.main.querySelector(`.success`);

    if (evt.target === successWindow) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  const successCloseButtonClickHandler = () => {
    closeSuccessMessage();
  };

  const successHandler = () => {
    const success = successTemplate.cloneNode(true);

    window.galery.main.append(success);
    window.error.uploadInput.disabled = false;

    success.querySelector(`.success__button`)
      .addEventListener(`click`, successCloseButtonClickHandler);
    success.addEventListener(`click`, successWindowClickHandler);
    document.addEventListener(`keydown`, successWindowEscPressHandler);
  };

  window.success = {
    successHandler
  };
})();
