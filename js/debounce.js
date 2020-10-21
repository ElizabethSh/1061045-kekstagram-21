'use strict';

(function () {
  const TIMEOUT = 500;

  let timeout;
  window.debounce = (cb) => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      cb();
    }, TIMEOUT);
  };
})();
