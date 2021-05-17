'use strict';

(function () {
  const MAX_X = 453;
  const MAX_PERCENT = 100;

  const Effects = {
    CHROME: `chrome`,
    SEPIA: `sepia`,
    MARVIN: `marvin`,
    PHOBOS: `phobos`,
    HEAT: `heat`,
  };

  const main = window.galery.main;
  const preview = main.querySelector(`.img-upload__preview img`);
  const slider = main.querySelector(`.img-upload__effect-level`);
  const effectLevelValue = slider.querySelector(`.effect-level__value`);
  const effectLevelLine = slider.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevelLine.querySelector(`.effect-level__depth`);

  let effectValue = 100;
  let effect;
  let filter;

  const showSlider = () => {
    slider.classList.remove(`hidden`);
  };

  const hideSlider = () => {
    slider.classList.add(`hidden`);
  };

  const setDefaultEffect = () => {
    preview.style.filter = ``;
    effectLevelValue.defaultValue = effectValue;
    effectLevelDepth.style.width = `${effectValue}%`;
    effectLevelPin.style.left = `${MAX_X}px`;
  };

  const generateEffect = () => {
    let property;
    let min = 0;
    let max = 1;
    let unit = ``;

    switch (filter) {
      case Effects.CHROME:
        property = `grayscale`;
        break;

      case Effects.SEPIA:
        property = `sepia`;
        break;

      case Effects.MARVIN:
        property = `invert`;
        unit = `%`;
        max = 100;
        break;

      case Effects.PHOBOS:
        property = `blur`;
        max = 3;
        unit = `px`;
        break;

      case Effects.HEAT:
        property = `brightness`;
        min = 1;
        max = 3;
        break;
    }

    return `${property}(${effectValue / MAX_PERCENT * (max - min) + min}${unit})`;
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
      hideSlider();
      preview.style.filter = ``;

    } else {
      showSlider();
      effect = generateEffect();
      preview.style.filter = effect;
    }
  };


  const effectLevelPinMouseDownHandler = (evt) => {
    evt.preventDefault();

    let startCoords = evt.clientX;

    const effectLevelPinMouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = startCoords - moveEvt.clientX;
      const pinXCoord = effectLevelPin.offsetLeft - shift;

      startCoords = moveEvt.clientX;

      if ((pinXCoord >= 0) && (pinXCoord <= MAX_X)) {
        effectLevelPin.style.left = `${pinXCoord}px`;
      }

      effectValue = Math.round(effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth);

      effectLevelValue.defaultValue = effectValue;
      effectLevelDepth.style.width = `${effectValue}%`;

      preview.style.filter = generateEffect();
    };

    const effectLevelPinMouseUpHandler = (evtUp) => {
      evtUp.preventDefault();

      document.removeEventListener(`mousemove`, effectLevelPinMouseMoveHandler);
      document.removeEventListener(`mouseup`, effectLevelPinMouseUpHandler);
    };

    document.addEventListener(`mousemove`, effectLevelPinMouseMoveHandler);
    document.addEventListener(`mouseup`, effectLevelPinMouseUpHandler);
  };

  effectLevelPin.addEventListener(`mousedown`, effectLevelPinMouseDownHandler);


  window.effect = {
    preview,
    effectClickHandler,
    showSlider,
    hideSlider,
    setDefaultEffect
  };
})();
