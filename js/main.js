'use strict';
const AVATARS = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];
const TITLES = [`Дворец счастья`, `Императорский дворец`, `Уютная квартира`, `Квартира-студия`, `Просторный дом`, `Маленький домик`, `Комфортное бунгало`, `Недорогое бунгало`];
const LOCATION_X = [`446`, `573`, `356`];
const LOCATION_Y = [`346`, `783`, `236`];
const PRICES = [2500, 6700, 1200, 4600, 3500];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = [1, 2, 3, 4];
const GUESTS = [1, 2, 3, 4, 5];
const CHECK_IN = [`12:00`, `13:00`,`14:00`];
const CHECK_OUT = [`12:00`, `13:00`,`14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Уютная и комфортная квартира только для вас`, `Сдам дом на долгий срок`, `Сдам бунгало молодой паре`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const COORDINATE_X_MIN = 100;
const COORDINATE_X_MAX = document.querySelector(`.map`).offsetWidth-100;
const COORDINATE_Y_MIN = 130;
const COORDINATE_Y_MAX = 630;


const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const getRandomElementOfArray = (arr) => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return item;
};

const getRandomItemsWithoutRepeat = (arr) => {
  const copyArr = arr.slice();
  let newArr = [];

  for(let i = 0; i < getRandomNumber(1, arr.length); i++) {
    let idx = Math.floor(Math.random() * copyArr.length);
    newArr.push(copyArr[idx]);
    copyArr.splice(idx, 1);
  };
  return newArr;
};

const getAd = (img, titleInAd, locationX, locationY, priceInAd, typeInAd, roomsInAd, guestsInAd, checkinInAd, checkoutInAd, featuresInAd, descriptionInAd, photosInAd, coordinateXMin, coordinateXMax, coordinateYMin, coordinateYMax) => {
  const AdDescription = {
    author: {
      avatar: img
    },
    offer: {
      title: titleInAd,
      address: getRandomElementOfArray(locationX) + `,` + getRandomElementOfArray(locationY),
      price: getRandomElementOfArray(priceInAd),
      type: getRandomElementOfArray(typeInAd),
      rooms: getRandomElementOfArray(roomsInAd),
      guests: getRandomElementOfArray(guestsInAd),
      checkin: getRandomElementOfArray(checkinInAd),
      checkout: getRandomElementOfArray(checkoutInAd),
      features: getRandomItemsWithoutRepeat(featuresInAd),
      description: getRandomElementOfArray(descriptionInAd),
      photos: getRandomItemsWithoutRepeat(photosInAd)
    },
    location: {
      x: getRandomNumber(coordinateXMin, coordinateXMax),
      y: getRandomNumber(coordinateYMin, coordinateYMax)
    }
  };
return AdDescription;
};

const getArrayOfAds = (index) => {
   let itemOfArray = [];
  for(let i=0; i<index; i++) {
   itemOfArray[i] = getAd(AVATARS[i], TITLES[i], LOCATION_X, LOCATION_Y, PRICES, TYPES, ROOMS, GUESTS, CHECK_IN, CHECK_OUT, FEATURES, DESCRIPTIONS, PHOTOS, COORDINATE_X_MIN, COORDINATE_X_MAX, COORDINATE_Y_MIN, COORDINATE_Y_MAX);
  }
  return itemOfArray;
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const listOfPins = document.querySelector(`.map__pins`);

const renderPin = (add) => {
  const clonePinTemplate = pinTemplate.cloneNode(true);
  clonePinTemplate.querySelector(`img`).src = add.author.avatar;
  clonePinTemplate.querySelector(`img`).alt = add.offer.title;
  clonePinTemplate.style = `left: ${add.location.x - 20}px; top: ${add.location.y - 40}px;`;

  return clonePinTemplate;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(getArrayOfAds(8)[i]));
}

listOfPins.appendChild(fragment);





