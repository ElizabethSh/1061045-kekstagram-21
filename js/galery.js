'use strict';

(function () {
  const GET_URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const main = document.querySelector(`main`);
  const pictureTemplate = document.querySelector(`#picture`)
                                  .content
                                  .querySelector(`.picture`);
  const picturesList = main.querySelector(`.pictures`);

  const errorLoadTemplate = document.querySelector(`#error-load`)
                                    .content
                                    .querySelector(`.error`);

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

  const renderPictures = () => {
    const fragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      fragment.appendChild(renderPicture(photo));
    });

    picturesList.appendChild(fragment);
  };

  const successHandler = (data) => {
    photos = data;
    renderPictures();
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
