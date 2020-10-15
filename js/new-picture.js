'use strict';

(function () {

  const MAX_X = 453;
  const SIZE_STEP = 25;
  const MAX_HASHTAGS_AMOUNT = 5;
  const MAX_HASHTAG_SYMBOLS_AMOUNT = 20;

  const PhotoSize = {
    MIN: 25,
    MAX: 100
  };

  const body = document.querySelector(`body`);
  const uploadInput = body.querySelector(`#upload-file`);
  const imageUpload = body.querySelector(`.img-upload__overlay`);
  const closeButton = imageUpload.querySelector(`#upload-cancel`);
  const commentField = imageUpload.querySelector(`.text__description`);
  const hashtagField = imageUpload.querySelector(`.text__hashtags`);
  const scaleControlValue = imageUpload.querySelector(`.scale__control--value`);
  const scaleControlSmaller = imageUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = imageUpload.querySelector(`.scale__control--bigger`);
  const preview = imageUpload.querySelector(`.img-upload__preview img`);
  const effectsList = imageUpload.querySelector(`.effects__list`);
  const effectItems = effectsList.querySelectorAll(`.effects__item`);
  const slider = imageUpload.querySelector(`.img-upload__effect-level`);
  const effectLevelValue = slider.querySelector(`.effect-level__value`);
  const effectLevelLine = slider.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevelLine.querySelector(`.effect-level__depth`);
  const submitButton = imageUpload.querySelector(`#upload-submit`);

  let effectValue = 100;
  let effect;
  let filter;

  hashtagField.addEventListener(`input`, (evt) => {
    // const re = /^#[\w]*$/g;
    const hashtags = evt.target.value.split(` `).map((hashtag) => hashtag.toLowerCase());

    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      hashtagField.setCustomValidity(`Максимально допустимое количество хэштегов - ${MAX_HASHTAGS_AMOUNT}`);
    } else {
      hashtagField.setCustomValidity(``);
      hashtags.forEach((hashtag, index) => {
        if (hashtag.length > MAX_HASHTAG_SYMBOLS_AMOUNT) {
          hashtagField.setCustomValidity(`Максимально допустимое количество символов в хэштеге - ${MAX_HASHTAG_SYMBOLS_AMOUNT}. Удалите лишние - ${(hashtag.length - MAX_HASHTAG_SYMBOLS_AMOUNT)} симв.`);
        } else if (hashtags.indexOf(hashtag) !== index) {
          hashtagField.setCustomValidity(`Такой хэштег уже существует, удалите повторяемый хэштег`);
        }
      });
    }
    hashtagField.reportValidity();
  });

  let sizePhoto = parseInt(scaleControlValue.value, 10);

  const changeScale = () => {
    scaleControlSmaller.disabled = false;
    scaleControlBigger.disabled = false;
    scaleControlValue.value = `${sizePhoto}%`;
    preview.style.transform = `scale(${sizePhoto / 100})`;
  };

  const scaleControlSmallerClickHandler = () => {
    if (sizePhoto === PhotoSize.MIN) {
      scaleControlSmaller.disabled = true;
      return;
    }

    sizePhoto -= SIZE_STEP;
    changeScale();
  };

  const scaleControlBiggerClickHandler = () => {
    if (sizePhoto === PhotoSize.MAX) {
      scaleControlBigger.disabled = true;
      return;
    }

    sizePhoto += SIZE_STEP;
    changeScale();
  };

  scaleControlSmaller.addEventListener(`click`, scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener(`click`, scaleControlBiggerClickHandler);

  const openUploadForm = () => {
    imageUpload.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    slider.classList.add(`hidden`);

    preview.style.filter = ``;
    effectLevelValue.defaultValue = effectValue;
    effectLevelDepth.style.width = `${effectValue}%`;
    effectLevelPin.style.left = `${MAX_X}px`;

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

    scaleControlSmaller.removeEventListener(`click`, scaleControlSmallerClickHandler);
    scaleControlBigger.removeEventListener(`click`, scaleControlBiggerClickHandler);
    effectsList.removeEventListener(`click`, effectClickHandler);
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

  const generateEffect = () => {
    let property;
    let min = 0;
    let max = 1;
    let unit = ``;
    switch (filter) {
      case `chrome`:
        property = `grayscale`;
        break;

      case `sepia`:
        property = `sepia`;
        break;

      case `marvin`:
        property = `invert`;
        unit = `%`;
        max = 100;
        break;

      case `phobos`:
        property = `blur`;
        max = 3;
        unit = `px`;
        break;

      case `heat`:
        property = `brightness`;
        min = 1;
        max = 3;
        break;
    }

    return `${property}(${effectValue / 100 * (max - min) + min}${unit})`; // убрать магич.число 100!
  };

  const effectClickHandler = (evt) => {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    effectValue = 100;
    filter = evt.target.value;

    effectLevelDepth.style.width = `${effectValue}%`;
    effectLevelPin.style.left = `${MAX_X}px`;

    if (filter === `none`) {
      slider.classList.add(`hidden`);
      preview.style.filter = ``;

    } else {
      slider.classList.remove(`hidden`);
      effect = generateEffect();
      preview.style.filter = effect;
    }
  };

  effectLevelPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX
    };

    const mouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if ((effectLevelPin.offsetLeft - shift.x >= 0) && (effectLevelPin.offsetLeft - shift.x <= MAX_X)) {
        effectLevelPin.style.left = `${effectLevelPin.offsetLeft - shift.x}px`;
      }

      effectValue = Math.round(effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth);

      effectLevelValue.defaultValue = effectValue;
      effectLevelDepth.style.width = `${effectValue}%`;

      preview.style.filter = generateEffect();
    };

    const mouseUpHandler = (evtUp) => {
      evtUp.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  });

  uploadInput.addEventListener(`change`, uploadButtonChangeHandler);
  submitButton.addEventListener(`submit`, submitClickHandler);
})();
