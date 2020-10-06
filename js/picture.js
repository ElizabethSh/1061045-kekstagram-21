'use strict';

(function () {
  const body = document.querySelector(`body`);
  const bigPicture = body.querySelector(`.big-picture`);
  const commentsList = bigPicture.querySelector(`.social__comments`);
  const commentTemplate = document.querySelector(`#comment`)
                                  .content
                                  .querySelector(`.social__comment`);
  const closeButton = bigPicture.querySelector(`.big-picture__cancel`);

  const openPicture = (photo) => {
    bigPicture.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    bigPicture.querySelector(`.big-picture__img img`).src = photo.url;
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;

    renderComments(photo);

    closeButton.addEventListener(`click`, closeButtonClickHandler);
    document.addEventListener(`keydown`, escButtonPressHandler);
  };

  const renderComment = (comment) => {
    const commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector(`.social__picture`).src = comment.avatar;
    commentItem.querySelector(`.social__text`).textContent = comment.message;
    return commentItem;
  };

  const renderComments = (photo) => {
    const fragment = document.createDocumentFragment();

    commentsList.innerHTML = ``;
    photo.comments.forEach((comment) => {
      fragment.appendChild(renderComment(comment));
    });

    commentsList.appendChild(fragment);
  };


  const closePicture = () => {
    bigPicture.classList.add(`hidden`);
    body.classList.remove(`modal-open`);

    closeButton.removeEventListener(`click`, closeButtonClickHandler);
    document.removeEventListener(`keydown`, escButtonPressHandler);
  };

  const closeButtonClickHandler = () => {
    closePicture();
  };

  const escButtonPressHandler = (evt) => {
    window.utils.isEscapeEvent(evt, closePicture);
  };

  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);

  window.picture = {
    openPicture
  };
})();
