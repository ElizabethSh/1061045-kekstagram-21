'use strict';

(function () {
  const pictureTemplate = document.querySelector(`#picture`)
                                .content
                                .querySelector(`.picture`);
  const picturesList = document.querySelector(`.pictures`);

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

    window.mock.photos.forEach((photo) => {
      fragment.appendChild(renderPicture(photo));
    });

    picturesList.appendChild(fragment);
  };

  renderPictures();
})();
