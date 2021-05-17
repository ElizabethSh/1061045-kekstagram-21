'use strict';

(function () {
  const TIMEOUT = 10000;

  const Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    RESPONSE_ERROR: 502,
    SERVICE_UNAVIALABLE: 503,
  };

  const load = (method, url, onSuccess, onError, body = null) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          error = `${xhr.status} Неверный запрос`;
          break;
        case Code.FORBIDDEN:
          error = `${xhr.status} Пользователь не авторизован`;
          break;
        case Code.NOT_FOUND:
          error = `${xhr.status} Ничего не найдено`;
          break;
        case Code.SERVER_ERROR:
          error = `${xhr.status} Ошибка сервера`;
          break;
        case Code.RESPONSE_ERROR:
          error = `${xhr.status} Неверный ответ сервера`;
          break;
        case Code.SERVICE_UNAVIALABLE:
          error = `${xhr.status} Сервер временно недоступен`;
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
