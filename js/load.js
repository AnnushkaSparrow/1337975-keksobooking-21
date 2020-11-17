'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const statusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;

  window.load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;


    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
