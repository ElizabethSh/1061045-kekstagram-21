'use strict';

(function () {
  const MESSAGES = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  const NAMES = [`Иван`, `Владилен`, `Татьяна`, `Константин`, `Аноним`];
  const MIN_LIKES_AMOUNT = 15;
  const MAX_LIKES_AMOUNT = 200;
  const MAX_COMMENT_AMOUNT = 12;
  const MAX_PHOTO_AMOUNT = 25;
  const MAX_AVATAR_AMOUNT = 6;

  const photos = [];

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomElement = (array) => {
    return array[getRandomInteger(0, array.length - 1)];
  };

  const generateComment = () => {
    return {
      avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_AMOUNT)}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    };
  };

  const generatePhotos = (index) => {
    return {
      url: `photos/${index}.jpg`,
      description: `Описание фотографии`,
      likes: getRandomInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
      comments: new Array(getRandomInteger(0, MAX_COMMENT_AMOUNT)).fill().map(generateComment)
    };
  };

  for (let i = 1; i <= MAX_PHOTO_AMOUNT; i++) {
    photos.push(generatePhotos(i));
  }

  window.mock = {
    photos
  };
})();
