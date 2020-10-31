'use strict';

(() => {
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
  const COORDINATE_X_MIN = 0;
  const COORDINATE_X_MAX = document.querySelector(`.map`).offsetWidth;
  const COORDINATE_Y_MIN = 130;
  const COORDINATE_Y_MAX = 630;


  const getAd = (img, titleInAd) =>
    ({
      author: {
        avatar: img
      },
      offer: {
        title: titleInAd,
        address: window.utils.getRandomElementOfArray(LOCATIONS_X) + `,` + window.utils.getRandomElementOfArray(LOCATIONS_Y),
        price: window.utils.getRandomElementOfArray(PRICES),
        type: window.utils.getRandomElementOfArray(TYPES),
        rooms: window.utils.getRandomElementOfArray(ROOMS),
        guests: window.utils.getRandomElementOfArray(GUESTS),
        checkin: window.utils.getRandomElementOfArray(TIMES_OF_CHECK_IN_CHECK_OUT),
        checkout: window.utils.getRandomElementOfArray(TIMES_OF_CHECK_IN_CHECK_OUT),
        features: window.utils.getRandomItemsWithoutRepeat(FEATURES),
        description: window.utils.getRandomElementOfArray(DESCRIPTIONS),
        photos: window.utils.getRandomItemsWithoutRepeat(PHOTOS)
      },
      location: {
        x: window.utils.getRandomNumber(COORDINATE_X_MIN, COORDINATE_X_MAX),
        y: window.utils.getRandomNumber(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
      }
    });


  window.data = {
    getArrayOfAds: (numberOfAds) => {
      const itemOfArray = [];
      for (let i = 0; i < numberOfAds; i++) {
        itemOfArray.push(getAd(AVATARS[i], TITLES[i]));
      }
      return itemOfArray;
    }
  };
})();
