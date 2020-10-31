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

  window.main = {
    setAddress: (x, y, height = HEIGHT_MAIN_PIN, width = WIDTH_MAIN_PIN / 2) => address.setAttribute(`value`, `${x + width}, ${y + height}`)
  };


  const setActivePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.utils.deleteAttributes(inputs, `disabled`);
    window.utils.deleteAttributes(selects, `disabled`);
    window.pin.addFragmentOfRenderPins();
    mainPin.removeEventListener(`mousedown`, onMainPinMousedownPress);
    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
    mainPin.addEventListener(`mousedown`, window.pin.moveMainPin);
    window.main.setAddress(mainPin.offsetLeft, mainPin.offsetTop);
    roomsSelect.addEventListener(`change`, (evt) => {
      const value = evt.target.value;
      roomsSelect.value = value;
      window.form.syncRoomsToGuests(value);
    });
    timein.addEventListener(`change`, () => window.form.syncTimeinToTimeout(timein.value));
  };

  const onMainPinMousedownPress = (evt) => window.utils.isMousedown(evt, setActivePage);

  const onMainPinEnterPress = (evt) => window.utils.isEnter(evt, setActivePage);

  // неактивное состояния
  window.utils.setUpAttributes(inputs, `disabled`, `disabled`);
  window.utils.setUpAttributes(selects, `disabled`, `disabled`);
  window.main.setAddress(mainPin.offsetLeft, mainPin.offsetTop, HEIGHT_SMALL_MAIN_PIN / 2);

  // активное состояние
  mainPin.addEventListener(`mousedown`, onMainPinMousedownPress);
  mainPin.addEventListener(`keydown`, onMainPinEnterPress);
})();
