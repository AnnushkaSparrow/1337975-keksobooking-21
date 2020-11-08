'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const roomsSelect = document.querySelector(`#room_number`);
  const guestsSelect = document.querySelector(`#capacity`);
  const timeout = document.querySelector(`#timeout`);
  const timein = document.querySelector(`#timein`);
  const adForm = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_LEFT = mainPin.offsetLeft;
  const MAIN_PIN_TOP = mainPin.offsetTop;
  const HEIGHT_SMALL_MAIN_PIN = 62;



  const getOptions = (value) => {
    switch (value) {
      case `1`: return [{
        label: `для 1 гостя`,
        value: 1
      }];
      case `2`: return [{
        label: `для 1 гостя`,
        value: 1
      }, {
        label: `для 2 гостей`,
        value: 2
      } ];
      case `3`: return [{
        label: `для 1 гостя`,
        value: 1
      }, {
        label: `для 2 гостей`,
        value: 2
      },
      {
        label: `для 3 гостей`,
        value: 3
      }];
      case `100`: return [{
        label: `не для гостей`,
        value: 0
      }];
      default: return [];
    }
  };

  const getTimeout = (value) => `Выезд до ${value.substring(0, 2)}`;

  window.form = {
    syncRoomsToGuests: (roomsNumber) => {
      guestsSelect.innerHTML = ``;
      const options = getOptions(roomsNumber);

      options.forEach((option) => {
        const optionNode = document.createElement(`option`);
        optionNode.value = option.value;
        optionNode.innerHTML = option.label;
        guestsSelect.appendChild(optionNode);
      });
      guestsSelect.value = (options.length > 0) ? options[0].value : null;
    },
    syncTimeinToTimeout: (fieldTimein) => {
      timeout.innerHTML = ``;
      const time = getTimeout(fieldTimein);
      const optionNodeOfTimeout = document.createElement(`option`);
      optionNodeOfTimeout.value = fieldTimein.value;
      optionNodeOfTimeout.setAttribute(`value`, `${fieldTimein}`);
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

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const setSuccessMassage = () => {
    const successMessage = successTemplate.cloneNode(true);
    document.body.appendChild(successMessage);

    const setSuccessMessageOnKeydown = (evt) => {
      window.utils.isEscEvent(evt, () => {
        document.body.removeChild(successMessage);
        document.removeEventListener(`keydown`, setSuccessMessageOnKeydown);
        document.removeEventListener(`mousedown`, setSuccessMassageOnMouseDown);
      });
    };

    const setSuccessMassageOnMouseDown = (evt) => {
      window.utils.isMousedown(evt, () => {
        document.body.removeChild(successMessage);
        document.removeEventListener(`mousedown`, setSuccessMassageOnMouseDown);
        document.removeEventListener(`keydown`, setSuccessMessageOnKeydown);
    });
    };

    document.addEventListener(`keydown`, setSuccessMessageOnKeydown);
    document.addEventListener(`mousedown`, setSuccessMassageOnMouseDown);


  };

  const errorTemplate =  document.querySelector(`#error`).content.querySelector(`.error`);
  const main = document.querySelector(`main`);


  const setErrorMassage = () => {
    const errorMassage = errorTemplate.cloneNode(true);
    main.appendChild(errorMassage);
    const btn = document.querySelector(`.error__button`);

    window.form.removeErrorMessage = (evt) => {
     window.utils.isEscEvent(evt, () => {
       main.removeChild(errorMassage);
       document.removeEventListener(`keydown`, window.form.removeErrorMessage);
      });
    };

    document.addEventListener(`keydown`, window.form.removeErrorMessage);

     btn.addEventListener(`mousedown`, function setErrorMassageOnClick (evt) {
      window.utils.isMousedown(evt, () => {
       main.removeChild(errorMassage);
       btn.removeEventListener(`mousedown`, setErrorMassageOnClick);
       document.removeEventListener(`keydown`, window.form.removeErrorMessage);
      });
    });
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(adForm), () => {
      window.main.inactivePage();
      window.pin.removePins();
      window.card.removeCard();
      adForm.reset();
      window.form.syncRoomsToGuests(roomsSelect.value);
      window.form.syncTimeinToTimeout(timein.value);
      syncTypeOfRealtyToMinPrice(selectionOfTypeOfRealty.value);
      setSuccessMassage();
    }, setErrorMassage);
    evt.preventDefault();
  });

    const resetBtn = document.querySelector(`.ad-form__reset`);
    resetBtn.addEventListener(`click`, () => {
      adForm.reset();
      window.form.syncTimeinToTimeout(timein.value);
      syncTypeOfRealtyToMinPrice(selectionOfTypeOfRealty.value);
      window.main.setAddress(MAIN_PIN_LEFT, MAIN_PIN_TOP, HEIGHT_SMALL_MAIN_PIN / 2);
      window.form.syncRoomsToGuests(roomsSelect.value);
      mainPin.style.left = `${MAIN_PIN_LEFT}px`;
      mainPin.style.top = `${MAIN_PIN_TOP}px`;
    })
})();
