'use strict';

(function () {
  const main = document.querySelector(`main`);
  const picturesList = main.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`)
    .content.querySelector(`.picture`);

  const renderPicture = (photo) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.querySelector(`img`).src = photo.url;
    picture.querySelector(`.picture__likes`).textContent = photo.likes;
    picture.querySelector(`.picture__comments`).textContent = photo.comments.length;

    picture.addEventListener(`click`, (evt) => {
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

  window.galery = {
    main,
    picturesList,
    renderPictures
  };
})();
