'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const roomsSelect = document.querySelector(`#room_number`);
  const guestsSelect = document.querySelector(`#capacity`);
  const timeout = document.querySelector(`#timeout`);
  const timein = document.querySelector(`#timein`);

  const getOptions = (value) => {
    switch (value) {
      case `1`: return [`для 1 гостя`];
      case `2`: return [`для 1 гостя`, `для 2 гостей`];
      case `3`: return [`для 1 гостя`, `для 2 гостей`, `для 3 гостей`];
      case `100`: return [`не для гостей`];
      default: return [];
    }
  };

  const getTimeout = (value) => `Выезд до ${value.substring(0, 2)}`;

  window.form = {
    syncRoomsToGuests: (roomsNumber) => {
      guestsSelect.innerHTML = ``;
      const options = getOptions(roomsNumber);

      options.forEach((option, index) => {
        const optionNode = document.createElement(`option`);
        optionNode.value = `${index + 1}`;
        optionNode.innerHTML = option;
        guestsSelect.appendChild(optionNode);
      });
      guestsSelect.value = (options.length > 0) ? `1` : null;
    },
    syncTimeinToTimeout: (fieldTimein) => {
      timeout.innerHTML = ``;
      const time = getTimeout(fieldTimein);
      const optionNodeOfTimeout = document.createElement(`option`);
      optionNodeOfTimeout.value = fieldTimein.value;
      optionNodeOfTimeout.innerHTML = time;
      timeout.appendChild(optionNodeOfTimeout);
    }
  };

  window.form.syncRoomsToGuests(roomsSelect.value);
  window.form.syncTimeinToTimeout(timein.value);

  const title = document.querySelector(`#title`);

  const validateOfNumberOfSimbols = (evt) => {
    const target = evt.target;
    if (target.value.length < MIN_TITLE_LENGTH) {
      target.setCustomValidity(`Необходимо ввести ещё ${MIN_TITLE_LENGTH - target.value.length} симв.`);
    } else if (target.value.length > MAX_TITLE_LENGTH) {
      target.setCustomValidity(`Удалите лишние ${target.value.length - MAX_TITLE_LENGTH} симв.`);
    } else {
      target.setCustomValidity(``);
    }
    target.reportValidity();
  };

  title.addEventListener(`input`, validateOfNumberOfSimbols);

  const minPriceOfRealty = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const price = document.querySelector(`#price`);
  const selectionOfTypeOfRealty = document.querySelector(`#type`);

  const syncTypeOfRealtyToMinPrice = (types) => {
    const minPrice = minPriceOfRealty[types];
    price.value = minPrice;
    price.setAttribute(`placeholder`, minPrice);
    price.setAttribute(`min`, minPrice);

  };

  syncTypeOfRealtyToMinPrice(selectionOfTypeOfRealty.value);

  selectionOfTypeOfRealty.addEventListener(`change`, () => syncTypeOfRealtyToMinPrice(selectionOfTypeOfRealty.value));

  const validatePrice = (evt) => {
    const target = evt.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity(`Обязательное поле`);
    } else {
      target.setCustomValidity(``);
    }
  };

  price.addEventListener(`invalid`, validatePrice);
})();
