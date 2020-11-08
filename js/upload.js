'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, function () {
      onError();
    });


    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
