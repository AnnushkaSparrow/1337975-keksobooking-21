'use strict';

(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const popupPhoto = cardTemplate.querySelector(`.popup__photo`);
  const filters = document.querySelector(`.map__filters-container`);

  const typesOfRealty = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const createRealtyFeaturesList = (ad) => {
    const featureFragment = document.createDocumentFragment();
    ad.offer.features.forEach((feature) => {
      const featureItem = document.createElement(`li`);
      featureItem.className = `popup__feature popup__feature--` + feature;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  const createRealtyPhotosList = (ad) => {
    const photosFragment = document.createDocumentFragment();
    ad.offer.photos.forEach((photo) => {
      const popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = photo;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };


  window.card = {

    renderCard: (ad) => {
      const card = cardTemplate.cloneNode(true);
      card.querySelector(`.popup__title`).textContent = ad.offer.title;
      card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
      card.querySelector(`.popup__text--price`).textContent = `${ad.offer.price}₽/ночь`;
      card.querySelector(`.popup__type`).textContent = typesOfRealty[ad.offer.type];
      card.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
      card.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
      card.querySelector(`.popup__features`).innerHTML = ``;
      card.querySelector(`.popup__features`).appendChild(createRealtyFeaturesList(ad));
      card.querySelector(`.popup__description`).textContent = ad.offer.description;
      card.querySelector(`.popup__photos`).removeChild(card.querySelector(`.popup__photo`));
      card.querySelector(`.popup__photos`).appendChild(createRealtyPhotosList(ad));
      card.querySelector(`.popup__avatar`).src = ad.author.avatar;

      const description = card.querySelector(`.popup__description`);
      if (!ad.offer.description) {
        card.removeChild(description);
      }

      const photos = card.querySelector(`.popup__photos`);
      if (card.querySelector(`.popup__photo`) === null) {
        photos.remove();
      }

      filters.before(card);
      return card;
    },

    removeCard: () => {
      const mapCard = document.querySelector(`.map__card`);
      if (mapCard) {
        mapCard.remove();
        document.removeEventListener(`keydown`, window.card.onPopupEscPress);
      }
    },

    onCloseClickPress: () => {
      const popupClose = document.querySelector(`.popup__close`);
      if (popupClose) {
        popupClose.addEventListener(`click`, () => {
          window.card.removeCard();
        });
      }
    },

    onPopupEscPress: (evt) => {
      window.utils.isEscEvent(evt, window.card.removeCard);
    }
  };
})();
