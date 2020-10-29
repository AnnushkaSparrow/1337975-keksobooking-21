'use strict';

(() => {
  const WIDTH_PIN = 50;
  const HEIGHT_PIN = 70;
  const NUMBER_OF_ADS = 8;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const listOfPins = document.querySelector(`.map__pins`);
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
    }
  };

})();
