'use strict';

(function () {
  const MAX_HASHTAGS_AMOUNT = 5;
  const MAX_HASHTAG_SYMBOLS_AMOUNT = 20;
  const RE = /(?:\s|^)#[A-Za-zА-Яа-я0-9]+(?:\s|$)/;

  const hashtagField = document.querySelector(`.text__hashtags`);

  const getHashtags = (string) => {
    return string.split(` `)
      .filter((item) => item !== ``)
      .map((item) => item.toLowerCase());
  };

  const createErrorsList = (error, errors) => {
    errors.push(error);
    return errors;
  };

  const removeDublicate = (array) => {
    return Array.from(new Set(array));
  };

  const validateHashtags = () => {
    const hashtags = getHashtags(hashtagField.value);
    let errors = [];

    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      hashtagField.setCustomValidity(`Максимально допустимое количество хэштегов - ${MAX_HASHTAGS_AMOUNT}`);
    } else {
      hashtagField.setCustomValidity(``);
      hashtags.forEach((hashtag, index) => {
        if (hashtag.length > MAX_HASHTAG_SYMBOLS_AMOUNT) {
          createErrorsList(`Максимально допустимое количество символов в хэштеге - ${MAX_HASHTAG_SYMBOLS_AMOUNT}. Удалите лишние - ${(hashtag.length - MAX_HASHTAG_SYMBOLS_AMOUNT)} симв.`, errors);
        } else if (hashtags.indexOf(hashtag) !== index) {
          createErrorsList(`Такой хэштег уже существует, удалите повторяемый хэштег.`, errors);
        } else if (!hashtag.startsWith(`#`)) {
          createErrorsList(`Хэштег должен начинаться с символа #.`, errors);
        } else if (!RE.test(hashtag)) {
          createErrorsList(`Хэштег должен содержать только буквы и цифры.`, errors);
        }
        hashtagField.setCustomValidity(removeDublicate(errors).join(` `));
      });
    }
  };

  hashtagField.addEventListener(`input`, validateHashtags);

  window.validation = {
    hashtagField,
  };
})();
