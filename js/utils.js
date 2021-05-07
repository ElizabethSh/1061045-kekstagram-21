'use strict';

(function () {
  const KeyCode = {
    ESC_KEY: `Escape`,
  };

  const isEscapeEvent = (evt, action) => {
    if (evt.key === KeyCode.ESC_KEY) {
      evt.preventDefault();
      action();
    }
  };

  window.utils = {
    isEscapeEvent
  };
})();
