'use strict';

(function () {
  const pictureTemplate = document.querySelector(`#picture`)
                                .content
                                .querySelector(`.picture`);
  const picturesList = document.querySelector(`.pictures`);

  const renderPictures = (photo) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.querySelector(`img`).src = photo.url;
    picture.querySelector(`.picture__likes`).textContent = photo.likes;
    picture.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return picture;
  };

  const fragment = document.createDocumentFragment();

  window.mock.photos.forEach((photo) => {
    fragment.appendChild(renderPictures(photo));
  });

  picturesList.appendChild(fragment);
})();
