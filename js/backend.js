'use strict';

(function () {
  const TIMEOUT = 10000;

  const load = (method, url, onSuccess, onError, body = null) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `${xhr.status} Неверный запрос`;
          break;
        case 401:
          error = `${xhr.status} Пользователь не авторизован`;
          break;
        case 404:
          error = `${xhr.status} Ничего не найдено`;
          break;

        default:
          error = `${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка загрузки данных`);
    });

    xhr.timeout = TIMEOUT;
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс. Повторите попытку`);
    });

    xhr.open(method, url);
    xhr.send(body);
  };

  window.backend = {
    load
  };

})();
