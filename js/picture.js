'use strict';

(function () {
  const MAX_COMMENT_COUNT = 5;

  const body = document.querySelector(`body`);
  const bigPicture = body.querySelector(`.big-picture`);
  const commentsList = bigPicture.querySelector(`.social__comments`);
  const commentTemplate = document.querySelector(`#comment`)
                                  .content
                                  .querySelector(`.social__comment`);
  const closeButton = bigPicture.querySelector(`.big-picture__cancel`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);


  let renderedComment;
  let openedPhoto = null;

  const openPicture = (photo) => {
    bigPicture.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    bigPicture.querySelector(`.big-picture__img img`).src = photo.url;
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;

    renderedComment = MAX_COMMENT_COUNT;
    openedPhoto = photo;
    renderCommentList(openedPhoto);

    commentsLoader.addEventListener(`click`, commentsLoaderClickHandler);
    closeButton.addEventListener(`click`, closeButtonClickHandler);
    document.addEventListener(`keydown`, escButtonPressHandler);
  };

  const renderComment = (comment) => {
    const commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector(`.social__picture`).src = comment.avatar;
    commentItem.querySelector(`.social__picture`).alt = comment.name;
    commentItem.querySelector(`.social__text`).textContent = comment.message;
    return commentItem;
  };

  const renderComments = (photo) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < Math.min(renderedComment, photo.comments.length); i++) {
      fragment.appendChild(renderComment(photo.comments[i]));
    }
    commentsList.appendChild(fragment);
  };

  const commentsLoaderClickHandler = () => {
    renderedComment += 5;
    renderCommentList(openedPhoto);
  };

  const renderCommentList = (photo) => {
    socialCommentCount.innerHTML = `<span class="comments-count">${Math.min(photo.comments.length, renderedComment)} из ${photo.comments.length} комментариев</span>`;
    commentsList.innerHTML = ``;
    renderComments(photo);

    if (photo.comments.length <= renderedComment) {
      commentsLoader.classList.add(`hidden`);
    } else {
      commentsLoader.classList.remove(`hidden`);
    }
  };

  const closePicture = () => {
    bigPicture.classList.add(`hidden`);
    body.classList.remove(`modal-open`);

    closeButton.removeEventListener(`click`, closeButtonClickHandler);
    document.removeEventListener(`keydown`, escButtonPressHandler);
    commentsLoader.removeEventListener(`click`, commentsLoaderClickHandler);
  };

  const closeButtonClickHandler = () => {
    closePicture();
  };

  const escButtonPressHandler = (evt) => {
    window.utils.isEscapeEvent(evt, closePicture);
  };

  window.picture = {
    openPicture,
  };
})();
