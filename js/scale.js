'use strict';

(function () {
  const SIZE_STEP = 25;

  const PhotoSize = {
    MIN: 25,
    MAX: 100
  };

  const preview = window.effect.preview;

  const scale = document.querySelector(`.scale`);
  const scaleControlValue = scale.querySelector(`.scale__control--value`);
  const scaleControlSmaller = scale.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = scale.querySelector(`.scale__control--bigger`);


  let sizePhoto;

  const setScaleValue = (value) => {
    scaleControlValue.defaultValue = `${value}%`;
  };

  const setPreviewScale = (value) => {
    const newScale = value / PhotoSize.MAX;
    preview.style.transform = `scale(${newScale})`;
  };

  const changeScale = (photoSize) => {
    scaleControlSmaller.disabled = false;
    scaleControlBigger.disabled = false;
    setScaleValue(photoSize);
    setPreviewScale(photoSize);
  };

  const scaleControlSmallerClickHandler = () => {
    sizePhoto = parseInt(scaleControlValue.value, 10);

    if (sizePhoto === PhotoSize.MIN) {
      scaleControlSmaller.disabled = true;
      return;
    }

    sizePhoto -= SIZE_STEP;
    changeScale(sizePhoto);
  };

  const scaleControlBiggerClickHandler = () => {
    sizePhoto = parseInt(scaleControlValue.value, 10);

    if (sizePhoto === PhotoSize.MAX) {
      scaleControlBigger.disabled = true;
      return;
    }

    sizePhoto += SIZE_STEP;
    changeScale(sizePhoto);
  };

  scaleControlSmaller.addEventListener(`click`, scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener(`click`, scaleControlBiggerClickHandler);

  window.scale = {
    changeScale,
  };
})();
