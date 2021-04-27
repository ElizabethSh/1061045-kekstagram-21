'use strict';

(function () {
  const FILE_TYPES = [`gif`, `png`, `jpeg`, `jpg`];

  window.addPhoto = (fileChooser, preview, previews) => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.src = reader.result;

        previews[0].style.backgroundImage = reader.result;

        previews.forEach((it) => {
          it.style.backgroundImage = `url(${reader.result})`;
        });
      });

      reader.readAsDataURL(file);
    }
  };
})();
