'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const HEIGHT_SMALL_MAIN_PIN = 62;
  const DEBOUNCE_INTERVAL = 500; // ms

  const roomsSelect = document.querySelector(`#room_number`);
  const guestsSelect = document.querySelector(`#capacity`);
  const timeout = document.querySelector(`#timeout`);
  const timein = document.querySelector(`#timein`);
  const adForm = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinLeft = mainPin.offsetLeft;
  const mainPinTop = mainPin.offsetTop;


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
      }];
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
    },
    debounce: (cb) => {
      let lastTimeout = null;

      return (...parameters) => {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(() => {
          cb(...parameters);
        }, DEBOUNCE_INTERVAL);
      };
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

  const MinPriceOfRealty = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const price = document.querySelector(`#price`);
  const selectionOfTypeOfRealty = document.querySelector(`#type`);

  const syncTypeOfRealtyToMinPrice = (types) => {
    const minPrice = MinPriceOfRealty[types];
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

  const setSuccessMessage = () => {
    const successMessage = successTemplate.cloneNode(true);
    document.body.appendChild(successMessage);

    const setSuccessMessageOnKeydown = (evt) => {
      window.utils.isEscEvent(evt, () => {
        document.body.removeChild(successMessage);
        document.removeEventListener(`keydown`, setSuccessMessageOnKeydown);
        document.removeEventListener(`mousedown`, setSuccessMessageOnMouseDown);
      });
    };

    const setSuccessMessageOnMouseDown = (evt) => {
      window.utils.isMousedown(evt, () => {
        document.body.removeChild(successMessage);
        document.removeEventListener(`mousedown`, setSuccessMessageOnMouseDown);
        document.removeEventListener(`keydown`, setSuccessMessageOnKeydown);
      });
    };

    document.addEventListener(`keydown`, setSuccessMessageOnKeydown);
    document.addEventListener(`mousedown`, setSuccessMessageOnMouseDown);


  };

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const main = document.querySelector(`main`);


  const setErrorMessage = () => {
    const errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    const btn = document.querySelector(`.error__button`);

    window.form.removeErrorMessage = (evt) => {
      window.utils.isEscEvent(evt, () => {
        main.removeChild(errorMessage);
        document.removeEventListener(`keydown`, window.form.removeErrorMessage);
      });
    };

    document.addEventListener(`keydown`, window.form.removeErrorMessage);


    const setErrorMessageOnClick = (evt) => {
      window.utils.isMousedown(evt, () => {
        main.removeChild(errorMessage);
        btn.removeEventListener(`mousedown`, setErrorMessageOnClick);
        document.removeEventListener(`keydown`, window.form.removeErrorMessage);
      });
    };

    btn.addEventListener(`mousedown`, setErrorMessageOnClick);
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(adForm), () => {
      window.main.setInactivePage();
      window.pin.removePins();
      window.card.removeCard();
      adForm.reset();
      window.form.syncRoomsToGuests(roomsSelect.value);
      window.form.syncTimeinToTimeout(timein.value);
      syncTypeOfRealtyToMinPrice(selectionOfTypeOfRealty.value);
      setSuccessMessage();
    }, setErrorMessage);
    evt.preventDefault();
  });

  const resetBtn = document.querySelector(`.ad-form__reset`);
  resetBtn.addEventListener(`click`, () => {
    adForm.reset();
    window.form.syncTimeinToTimeout(timein.value);
    syncTypeOfRealtyToMinPrice(selectionOfTypeOfRealty.value);
    window.main.setAddress(mainPinLeft, mainPinTop, HEIGHT_SMALL_MAIN_PIN / 2);
    window.form.syncRoomsToGuests(roomsSelect.value);
    mainPin.style.left = `${mainPinLeft}px`;
    mainPin.style.top = `${mainPinTop}px`;

    const filtersOption = document.querySelectorAll(`.map__filter option`);
    filtersOption.forEach((element, index) => {
      filtersOption[index].selected = filtersOption[index].defaultSelected;
    });

    const checkboxes = document.querySelectorAll(`.map__checkbox`);
    checkboxes.forEach((element, index) => {
      checkboxes[index].checked = false;
    });
    window.utils.removePins();
    window.card.removeCard();
    window.main.setInactivePage();

  });

  const comparePrices = (filterValue, adValue) => {
    switch (filterValue) {
      case `low`: return adValue >= 0 && adValue < 10000;
      case `middle`: return adValue >= 10000 && adValue < 50000;
      case `high`: return adValue >= 50000 && adValue < 1000000;
      default: return false;
    }
  };

  const compareValues = (filterValue, adValue, key) => {
    if (Array.isArray(adValue) && Array.isArray(filterValue)) {
      return filterValue.every((value) => adValue.includes(value));
    }

    if (key === `price`) {
      return comparePrices(filterValue, adValue);
    }

    if (key === `rooms` || key === `guests`) {
      return adValue === Number(filterValue);
    }

    return adValue === filterValue;
  };

  const filterRealty = window.form.debounce(() => {

    const arrayOfSelects = Array.from(document.querySelectorAll(`.map__filter`));
    const objOfselectFilters = arrayOfSelects.reduce((currentFilters, currentSelect) => {

      if (currentSelect.value !== `any`) {
        return Object.assign({}, currentFilters, {[currentSelect.name.replace(`housing-`, ``)]: currentSelect.value});
      }

      return currentFilters;
    }, {});

    const arrayOfCheckboxes = Array.from(document.querySelectorAll(`.map__checkbox`));
    const checkboxFilters = arrayOfCheckboxes.map((checkbox) => checkbox.checked ? checkbox.id.replace(`filter-`, ``) : false).filter(Boolean);
    const filters = Object.assign({}, objOfselectFilters, checkboxFilters.length > 0 ? {features: checkboxFilters} : {});
    const keys = Object.keys(filters);
    const results = window.arrayOfAds.filter((ad) => keys.every((key) => {
      const adValue = ad.offer[key];
      const filterValue = filters[key];

      return compareValues(filterValue, adValue, key);
    })).slice(0, 5).filter(Boolean);

    window.card.removeCard();
    window.pin.addFragmentOfRenderPins(results, results.length);


  });


  const mapFilter = document.querySelector(`.map__filters-container`);
  mapFilter.addEventListener(`change`, filterRealty);
})();
