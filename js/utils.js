'use strict';
(() => {
  window.utils = {
    getRandomNumber: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

    getRandomElementOfArray: (arr) => arr[Math.floor(Math.random() * arr.length)],

    getRandomItemsWithoutRepeat: (arr) => {
      const copyArr = [...arr];
      const newArr = [];
      for (let i = 0; i < window.utils.getRandomNumber(1, arr.length); i++) {
        const idx = window.utils.getRandomNumber(0, copyArr.length - 1);
        newArr.push(copyArr[idx]);
        copyArr.splice(idx, 1);
      }
      return newArr;
    },

    isEscEvent: (evt, cb) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        cb();
      }
    },

    isMousedown: (evt, cb) => evt.button === 0 && cb(),

    isEnter: (evt, cb) => evt.key === `Enter` && cb(),

    setUpAttributes: (arrOfTags, attribute, valueOfAttribute) => {
      arrOfTags.forEach((e, index) => {
        arrOfTags[index].setAttribute(attribute, valueOfAttribute);
      });
    },

    deleteAttributes: (arr, attribute) => {
      arr.forEach((e, index) => {
        arr[index].removeAttribute(attribute);
      });
    },
    errorHandler: (errorMessage) => {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    },
    removeActiveStyle: () => {
      const activePin = document.querySelector(`.map__pin--active`);
      if (activePin) {
        activePin.classList.remove(`map__pin--active`);
      }
    },
    removePins: () => {
      const pins = document.querySelectorAll(`.map__pin`);
      pins.forEach((item) => {
        if (item.matches(`.map__pin`) && !item.matches(`.map__pin--main`)) {
          item.remove();
        }
      });
    }
  };
})();
