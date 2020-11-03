'use strict';

(() => {
  const WIDTH_PIN = 50;
  const HEIGHT_PIN = 70;
  const NUMBER_OF_ADS = 8;
  const WIDTH_MAIN_PIN = 62;
  const HEIGHT_MAIN_PIN = 84;
  const MAP_COORDINATE_Y_MIN = 130;
  const MAP_COORDINATE_Y_MAX = 630;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const listOfPins = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const arrayOfAds = window.data.getArrayOfAds(NUMBER_OF_ADS);
  const renderPin = (ad, index) => {
    const pin = pinTemplate.cloneNode(true);
    pin.querySelector(`img`).src = ad.author.avatar;
    pin.querySelector(`img`).alt = ad.offer.title;
    pin.style = `left: ${ad.location.x - WIDTH_PIN / 2}px; top: ${ad.location.y - HEIGHT_PIN}px;`;

    pin.addEventListener(`click`, () => {
      window.card.removeCard();
      window.card.renderCard(arrayOfAds[index]);
      window.card.onCloseClickPress();
      document.addEventListener(`keydown`, window.card.onPopupEscPress);
    }
    );
    return pin;
  };

  window.pin = {
    addFragmentOfRenderPins: () => {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < NUMBER_OF_ADS; i++) {
        fragment.appendChild(renderPin(arrayOfAds[i], i));
      }

      listOfPins.appendChild(fragment);
    },
    moveMainPin: (evt) => {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const coordsOfMainPinX = (mainPin.offsetLeft - shift.x) + WIDTH_MAIN_PIN / 2;
        const coordsOfMainPinY = (mainPin.offsetTop - shift.y) + HEIGHT_MAIN_PIN;

        if ((coordsOfMainPinX >= 0 && coordsOfMainPinX < document.querySelector(`.map`).offsetWidth) && (coordsOfMainPinY > MAP_COORDINATE_Y_MIN && coordsOfMainPinY < MAP_COORDINATE_Y_MAX)) {

          mainPin.style.left = `${mainPin.offsetLeft - shift.x}px`;
          mainPin.style.top = `${mainPin.offsetTop - shift.y}px`;
          window.main.setAddress(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y);
        }
      };

      const onMouseUp = () => {
        window.main.setAddress(mainPin.offsetLeft, mainPin.offsetTop);
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };

})();
