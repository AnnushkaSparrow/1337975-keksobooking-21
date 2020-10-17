'use strict';
const AVATARS = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];
const TITLES = [`Дворец счастья`, `Императорский дворец`, `Уютная квартира`, `Квартира-студия`, `Просторный дом`, `Маленький домик`, `Комфортное бунгало`, `Недорогое бунгало`];
const LOCATIONS_X = [`446`, `573`, `356`];
const LOCATIONS_Y = [`346`, `783`, `236`];
const PRICES = [2500, 6700, 1200, 4600, 3500];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = [1, 2, 3, 4];
const GUESTS = [1, 2, 3, 4, 5];
const TIMES_OF_CHECK_IN_CHECK_OUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Уютная и комфортная квартира только для вас`, `Сдам дом на долгий срок`, `Сдам бунгало молодой паре`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const COORDINATE_X_MIN = 100;
const COORDINATE_X_MAX = document.querySelector(`.map`).offsetWidth - 100;
const COORDINATE_Y_MIN = 130;
const COORDINATE_Y_MAX = 630;
const WIDTH_PIN = 50;
const HEIGHT_PIN = 70;
const WIDTH_MAIN_PIN = 62;
const HEIGHT_MAIN_PIN = 84;
const HEIGHT_SMALL_MAIN_PIN = 62;
const COORDINATE_MAIN_PIN_X = 570;
const COORDINATE_MAIN_PIN_Y = 375;
const NUMBER_OF_ADS = 8;


const map = document.querySelector(`.map`);

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElementOfArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomItemsWithoutRepeat = (arr) => {
  const copyArr = [...arr];
  const newArr = [];

  for (let i = 0; i < getRandomNumber(1, arr.length); i++) {
    const idx = getRandomNumber(0, copyArr.length - 1);
    newArr.push(copyArr[idx]);
    copyArr.splice(idx, 1);
  }
  return newArr;
};

const getAd = (img, titleInAd) =>
  ({
    author: {
      avatar: img
    },
    offer: {
      title: titleInAd,
      address: getRandomElementOfArray(LOCATIONS_X) + `,` + getRandomElementOfArray(LOCATIONS_Y),
      price: getRandomElementOfArray(PRICES),
      type: getRandomElementOfArray(TYPES),
      rooms: getRandomElementOfArray(ROOMS),
      guests: getRandomElementOfArray(GUESTS),
      checkin: getRandomElementOfArray(TIMES_OF_CHECK_IN_CHECK_OUT),
      checkout: getRandomElementOfArray(TIMES_OF_CHECK_IN_CHECK_OUT),
      features: getRandomItemsWithoutRepeat(FEATURES),
      description: getRandomElementOfArray(DESCRIPTIONS),
      photos: getRandomItemsWithoutRepeat(PHOTOS)
    },
    location: {
      x: getRandomNumber(COORDINATE_X_MIN, COORDINATE_X_MAX),
      y: getRandomNumber(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
    }
  });


const getArrayOfAds = (numberOfAds) => {
  const itemOfArray = [];
  for (let i = 0; i < numberOfAds; i++) {
    itemOfArray.push(getAd(AVATARS[i], TITLES[i]));
  }
  return itemOfArray;
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const listOfPins = document.querySelector(`.map__pins`);

const renderPin = (add) => {
  const clonePinTemplate = pinTemplate.cloneNode(true);
  clonePinTemplate.querySelector(`img`).src = add.author.avatar;
  clonePinTemplate.querySelector(`img`).alt = add.offer.title;
  clonePinTemplate.style = `left: ${add.location.x - WIDTH_PIN / 2}px; top: ${add.location.y - HEIGHT_PIN}px;`;

  return clonePinTemplate;
};

const addFragmentOfRenderPins = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < NUMBER_OF_ADS; i++) {
    fragment.appendChild(renderPin(getArrayOfAds(NUMBER_OF_ADS)[i]));
  }

  listOfPins.appendChild(fragment);
};

// -------------------------------------------------------------------------------------------------------------
const types = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalo: `Бунгало`
};

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filters = document.querySelector(`.map__filters-container`);

const popupPhoto = cardTemplate.querySelector(`.popup__photo`);

const createFeatureFragment = (add) => {
  const featureFragment = document.createDocumentFragment();
  add.offer.features.forEach((feature) => {
    const featureItem = document.createElement(`li`);
    featureItem.className = `popup__feature popup__feature--` + feature;
    featureFragment.appendChild(featureItem);
  });
  return featureFragment;
};

const createPhotosFragment = (add) => {
  const photosFragment = document.createDocumentFragment();
  add.offer.photos.forEach((photo) => {
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = photo;
    photosFragment.appendChild(popupPhotoItem);
  });
  return photosFragment;
};

const renderCard = (add) => {
  const cloneCardTemplate = cardTemplate.cloneNode(true);
  cloneCardTemplate.querySelector(`.popup__title`).textContent = add.offer.title;
  cloneCardTemplate.querySelector(`.popup__text--address`).textContent = add.offer.address;
  cloneCardTemplate.querySelector(`.popup__text--price`).textContent = `${add.offer.price}₽/ночь`;
  cloneCardTemplate.querySelector(`.popup__type`).textContent = types[add.offer.type];
  cloneCardTemplate.querySelector(`.popup__text--capacity`).textContent = `${add.offer.rooms} комнаты для ${add.offer.guests} гостей`;
  cloneCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${add.offer.checkin}, выезд до ${add.offer.checkout}`;
  cloneCardTemplate.querySelector(`.popup__features`).innerHTML = ``;
  cloneCardTemplate.querySelector(`.popup__features`).appendChild(createFeatureFragment(add));
  cloneCardTemplate.querySelector(`.popup__description`).textContent = add.offer.description;
  cloneCardTemplate.querySelector(`.popup__photos`).removeChild(cloneCardTemplate.querySelector(`.popup__photo`));
  cloneCardTemplate.querySelector(`.popup__photos`).appendChild(createPhotosFragment(add));
  cloneCardTemplate.querySelector(`.popup__avatar`).src = add.author.avatar;

  const description = cloneCardTemplate.querySelector(`.popup__description`);
  if (!add.offer.description) {
    cloneCardTemplate.removeChild(description);
  }

  const photos = cloneCardTemplate.querySelector(`.popup__photos`);
  if (cloneCardTemplate.querySelector(`.popup__photo`).getAttribute(`src`) === `undefined`) {
    photos.remove();
  }

  return cloneCardTemplate;

};

const addFragmentOfRenderCards = () => {
  const fragmentOfCards = document.createDocumentFragment();
  for (let i = 0; i < NUMBER_OF_ADS; i++) {
    fragmentOfCards.appendChild(renderCard(getArrayOfAds(NUMBER_OF_ADS)[i]));
  }
  filters.before(fragmentOfCards);
};

// -------------------------------------------------------------------------------------------
const adForm = document.querySelector(`.ad-form`);
const inputs = adForm.querySelectorAll(`fieldset`);
const selects = document.querySelectorAll(`select`);
const mainPin = document.querySelector(`.map__pin--main`);
const address = document.querySelector(`#address`);
const roomsSelect = document.querySelector(`#room_number`);
const guestsSelect = document.querySelector(`#capacity`);


const getOptions = (value) => {
  switch (value) {
    case `1`: return [`для 1 гостя`];
    case `2`: return [`для 1 гостя`, `для 2 гостей`];
    case `3`: return [`для 1 гостя`, `для 2 гостей`, `для 3 гостей`];
    case `100`: return [`не для гостей`];
    default: return [];
  }
};


const syncRoomsToGuests = (roomsNumber) => {
  guestsSelect.innerHTML = ``;
  const options = getOptions(roomsNumber);

  options.forEach((option, index) => {
    const optionNode = document.createElement(`option`);
    optionNode.value = `${index + 1}`;
    optionNode.innerHTML = option;
    guestsSelect.appendChild(optionNode);
  });
  guestsSelect.value = (options.length > 0) ? `1` : null;
};

syncRoomsToGuests(roomsSelect.value);


const setUpAttributes = (arrOfTags, attribute, valueOfAttribute) => {
  arrOfTags.forEach((e, index) => {
    arrOfTags[index].setAttribute(attribute, valueOfAttribute);
  });
};

const deleteAttributes = (arr, attribute) => {
  arr.forEach((e, index) => {
    arr[index].removeAttribute(attribute);
  });
};

const setAddress = (x, y, height = HEIGHT_MAIN_PIN, width = WIDTH_MAIN_PIN / 2) => address.setAttribute(`value`, `${x + width}, ${y + height}`);


const setActivePage = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  deleteAttributes(inputs, `disabled`);
  deleteAttributes(selects, `disabled`);
  addFragmentOfRenderPins();
  mainPin.removeEventListener(`mousedown`, onMainPinMousedownPress);
  mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  addFragmentOfRenderCards();
  setAddress(COORDINATE_MAIN_PIN_X, COORDINATE_MAIN_PIN_Y);
  roomsSelect.addEventListener(`change`, (evt) => {
    const value = evt.target.value;
    roomsSelect.value = value;
    syncRoomsToGuests(value);
  });


};

const onMainPinMousedownPress = (evt) => evt.button === 0 && setActivePage();

const onMainPinEnterPress = (evt) => evt.key === `Enter` && setActivePage();

// неактивное состояния
setUpAttributes(inputs, `disabled`, `disabled`);
setUpAttributes(selects, `disabled`, `disabled`);
setAddress(COORDINATE_MAIN_PIN_X, COORDINATE_MAIN_PIN_Y, HEIGHT_SMALL_MAIN_PIN / 2);

// активное состояние
mainPin.addEventListener(`mousedown`, onMainPinMousedownPress);
mainPin.addEventListener(`keydown`, onMainPinEnterPress);
