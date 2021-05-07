'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  let timeout;

  window.debounce = (cb) => {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      cb();
    }, DEBOUNCE_INTERVAL);
  };
})();
