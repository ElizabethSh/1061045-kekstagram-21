'use strict';

(function () {
  const GET_URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const MAX_RANDOM_PHOTO = 10;

  const Filter = {
    RANDOM: `filter-random`,
    DISCUSSED: `filter-discussed`
  };

  const main = document.querySelector(`main`);
  const pictureTemplate = document.querySelector(`#picture`)
    .content.querySelector(`.picture`);
  const picturesList = main.querySelector(`.pictures`);
  const filterList = main.querySelector(`.img-filters`);
  const filters = filterList.querySelectorAll(`.img-filters__button`);

  const errorLoadTemplate = document.querySelector(`#error-load`)
    .content.querySelector(`.error`);

  let photos;

  const renderPicture = (photo) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.querySelector(`img`).src = photo.url;
    picture.querySelector(`.picture__likes`).textContent = photo.likes;
    picture.querySelector(`.picture__comments`).textContent = photo.comments.length;

    picture.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      window.picture.openPicture(photo);
    });

    return picture;
  };

  const renderPictures = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      fragment.appendChild(renderPicture(item));
    });

    picturesList.appendChild(fragment);
  };

  const commentsComparator = (a, b) => b.comments.length - a.comments.length;

  const randomizePhoto = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const removePictures = () => {
    const pictures = picturesList.querySelectorAll(`.picture`);
    pictures.forEach((item) => item.remove());
  };

  const updateGalery = (evt) => {
    filters.forEach((filter) => filter.classList.remove(`img-filters__button--active`));
    evt.target.classList.add(`img-filters__button--active`);

    removePictures();

    let userPhotos;
    switch (evt.target.id) {
      case Filter.RANDOM:
        userPhotos = randomizePhoto(photos.slice()).slice(0, MAX_RANDOM_PHOTO);
        break;

      case Filter.DISCUSSED:
        userPhotos = photos.slice().sort(commentsComparator);
        break;

      default:
        userPhotos = photos;
    }

    renderPictures(userPhotos);
  };

  const filterClickHandler = (evt) => {
    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    window.debounce(() => {
      updateGalery(evt);
    });
  };

  const successHandler = (data) => {
    photos = data;
    renderPictures(photos);
    filterList.classList.remove(`img-filters--inactive`);
    filterList.addEventListener(`click`, filterClickHandler);
  };

  const errorHandler = (message) => {
    const error = errorLoadTemplate.cloneNode(true);

    error.querySelector(`.error__title`).textContent = message;
    main.appendChild(error);
  };

  window.backend.load(`GET`, GET_URL, successHandler, errorHandler);

  window.galery = {
    main
  };
})();
