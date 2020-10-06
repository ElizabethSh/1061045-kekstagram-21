'use strict';

(function () {
  const isEscapeEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  window.utils = {
    isEscapeEvent
  };
})();
