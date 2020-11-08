'use strict';
(() => {
  const WIDTH_MAIN_PIN = 62;
  const HEIGHT_MAIN_PIN = 84;
  const HEIGHT_SMALL_MAIN_PIN = 62;

  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const inputs = adForm.querySelectorAll(`fieldset`);
  const selects = document.querySelectorAll(`select`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const roomsSelect = document.querySelector(`#room_number`);
  const timein = document.querySelector(`#timein`);
  const MAIN_PIN_LEFT = mainPin.offsetLeft;
  const MAIN_PIN_TOP = mainPin.offsetTop;

  window.main = {
    setAddress: (x, y, height = HEIGHT_MAIN_PIN, width = WIDTH_MAIN_PIN / 2) => address.setAttribute(`value`, `${x + width}, ${y + height}`)
  };

  const setActivePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.utils.deleteAttributes(inputs, `disabled`);
    window.utils.deleteAttributes(selects, `disabled`);
    window.load(window.pin.addFragmentOfRenderPins, window.utils.errorHandler);
    mainPin.removeEventListener(`mousedown`, onMousedownPressToActivePage);
    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
    document.removeEventListener(`keydown`, window.form.removeMessage);
    mainPin.addEventListener(`mousedown`, window.pin.moveMainPin);
    window.main.setAddress(mainPin.offsetLeft, mainPin.offsetTop);
    roomsSelect.addEventListener(`change`, (evt) => {
      const value = evt.target.value;
      roomsSelect.value = value;
      window.form.syncRoomsToGuests(value);
    });
    timein.addEventListener(`change`, () => window.form.syncTimeinToTimeout(timein.value));
  };

  const onMousedownPressToActivePage = (evt) => window.utils.isMousedown(evt, setActivePage);

  const onMainPinEnterPress = (evt) => window.utils.isEnter(evt, setActivePage);

  // неактивное состояния
  window.main.inactivePage = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.utils.setUpAttributes(inputs, `disabled`, `disabled`);
    window.utils.setUpAttributes(selects, `disabled`, `disabled`);
    window.main.setAddress(MAIN_PIN_LEFT, MAIN_PIN_TOP, HEIGHT_SMALL_MAIN_PIN / 2);
    mainPin.addEventListener(`mousedown`, onMousedownPressToActivePage);
    mainPin.addEventListener(`keydown`, onMainPinEnterPress);
  };

  window.main.inactivePage();
})();
