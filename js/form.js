'use strict';

(function () {
  const SCALE_DEFAULT_VALUE = 100;
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  const preview = window.effect.preview;
  const uploadInput = window.error.uploadInput;
  const hashtagField = window.validation.hashtagField;

  const body = document.querySelector(`body`);
  const form = body.querySelector(`.img-upload__form`);
  const imageUpload = form.querySelector(`.img-upload__overlay`);
  const closeButton = imageUpload.querySelector(`#upload-cancel`);
  const commentField = imageUpload.querySelector(`.text__description`);
  const smallPreviews = imageUpload.querySelectorAll(`.effects__preview`);
  const effectsList = imageUpload.querySelector(`.effects__list`);
  const effectItems = effectsList.querySelectorAll(`.effects__item`);

  const openUploadForm = () => {
    imageUpload.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    window.effect.hideSlider();

    window.addPhoto(uploadInput, preview, smallPreviews);

    window.effect.setDefaultEffect();

    effectsList.addEventListener(`click`, window.effect.effectClickHandler);
    closeButton.addEventListener(`click`, buttonCloseClickHandler);
    document.addEventListener(`keydown`, escButtonPressHandler);
  };

  const closeUploadForm = () => {
    imageUpload.classList.add(`hidden`);
    body.classList.remove(`modal-open`);

    window.scale.changeScale(SCALE_DEFAULT_VALUE);
    form.reset();

    effectItems.forEach((effectItem) => {
      effectItem.selected = false;
    });

    effectsList.removeEventListener(`click`, window.effect.effectClickHandler);
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
    window.backend.load(`POST`, URL, window.success.successHandler, window.error.errorHandler, new FormData(form));
    uploadInput.disabled = true;
    closeUploadForm();
  };

  uploadInput.addEventListener(`change`, uploadButtonChangeHandler);
  form.addEventListener(`submit`, submitClickHandler);
})();
