'use strict';

(function () {
  const MAX_RANDOM_PHOTO = 10;

  const Filter = {
    RANDOM: `filter-random`,
    DISCUSSED: `filter-discussed`
  };

  const filterList = window.galery.main.querySelector(`.img-filters`);
  const filters = filterList.querySelectorAll(`.img-filters__button`);
  const picturesList = window.galery.picturesList;

  const randomizePhoto = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const commentsComparator = (a, b) => b.comments.length - a.comments.length;

  const removePictures = () => {
    const pictures = picturesList.querySelectorAll(`.picture`);

    pictures.forEach((item) => item.remove());
  };

  const updateGalery = (evt, photos) => {
    filters.forEach((filter) => {
      filter.classList.remove(`img-filters__button--active`);
    });
    evt.target.classList.add(`img-filters__button--active`);
    removePictures();

    let userPhotos;
    switch (evt.target.id) {
      case Filter.RANDOM:
        userPhotos = randomizePhoto(photos.concat())
          .slice(0, MAX_RANDOM_PHOTO);
        break;

      case Filter.DISCUSSED:
        userPhotos = photos.slice().sort(commentsComparator);
        break;

      default:
        userPhotos = photos;
    }
    window.galery.renderPictures(userPhotos);
  };

  window.filter = {
    filterList,
    updateGalery
  };
})();
