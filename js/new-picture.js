'use strict';

(function () {
  const body = document.querySelector(`body`);
  const uploadInput = body.querySelector(`#upload-file`);
  const imageUpload = body.querySelector(`.img-upload__overlay`);
  const closeButton = imageUpload.querySelector(`#upload-cancel`);
  const commentField = imageUpload.querySelector(`.text__description`);
  const hashtagField = imageUpload.querySelector(`.text__hashtags`);
  const preview = imageUpload.querySelector(`.img-upload__preview img`);
  const effectsList = imageUpload.querySelector(`.effects__list`);
  const effectItems = effectsList.querySelectorAll(`.effects__item`);
  const slider = imageUpload.querySelector(`.img-upload__effect-level`);
  const effectLevelValue = slider.querySelector(`.effect-level__value`);
  const effectLevelPin = slider.querySelector(`.effect-level__pin`);
  const effectLevelLine = slider.querySelector(`.effect-level__line`);
  const submitButton = imageUpload.querySelector(`#upload-submit`);


  const openUploadForm = () => {
    imageUpload.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    preview.className = `effects__preview--none`;
    slider.classList.add(`hidden`);

    effectsList.addEventListener(`click`, effectClickHandler);
    closeButton.addEventListener(`click`, buttonCloseClickHandler);
    document.addEventListener(`keydown`, escButtonPressHandler);
  };

  const closeUploadForm = () => {
    imageUpload.classList.add(`hidden`);
    body.classList.remove(`modal-open`);

    uploadInput.value = ``;
    effectItems.forEach((effectItem) => {
      effectItem.selected = false;
    });

    closeButton.removeEventListener(`click`, buttonCloseClickHandler);
    document.removeEventListener(`keydown`, escButtonPressHandler);
  };

  const uploadButtonChangeHandler = () => {
    openUploadForm();
  };

  const buttonCloseClickHandler = () => {
    closeUploadForm();
  };

  const escButtonPressHandler = (evt) => {
    if (commentField === document.activeElement || hashtagField === document.activeElement) {
      return;
    }
    window.utils.isEscapeEvent(evt, closeUploadForm);
  };

  const submitClickHandler = (evt) => {
    evt.preventDefault();
  };

  const addClass = (className) => {
    preview.className = ` `;
    preview.classList.add(className);
  };

  const effectClickHandler = (evt) => {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    const effectClass = `effects__preview--${evt.target.value}`;
    addClass(effectClass);
    if (effectClass === `effects__preview--none`) {
      slider.classList.add(`hidden`);
    } else {
      slider.classList.remove(`hidden`);
    }
  };

  effectLevelPin.addEventListener(`mouseup`, (evt) => {
    evt.preventDefault();
    const effectValue = Math.round(effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth);
    effectLevelValue.defaultValue = effectValue;
  });

  uploadInput.addEventListener(`change`, uploadButtonChangeHandler);
  submitButton.addEventListener(`submit`, submitClickHandler);
})();
