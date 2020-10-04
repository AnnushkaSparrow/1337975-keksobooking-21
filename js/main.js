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
const WIDTH_PIN = 40;
const HEIGHT_PIN = 40;


const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);


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

const fragment = document.createDocumentFragment();
for (let i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(getArrayOfAds(8)[i]));
}

listOfPins.appendChild(fragment);
