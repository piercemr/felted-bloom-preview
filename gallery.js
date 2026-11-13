const dialog = document.querySelector('.lightbox');
const title = dialog.querySelector('h2');
const image = dialog.querySelector('.lightbox-image');
const controls = dialog.querySelector('.photo-controls');
const position = dialog.querySelector('.photo-position');
let photos = [];
let current = 0;
let opener;

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  image.src = photos[current].href;
  image.alt = photos[current].querySelector('img').alt;
  position.textContent = `${current + 1} of ${photos.length}`;
}

for (const figure of document.querySelectorAll('.pieces figure')) {
  const lead = figure.querySelector('.photo-set a');
  const views = [lead, ...figure.querySelectorAll('.extra-photos a')];
  if (views.length > 1) {
    const count = document.createElement('span');
    count.className = 'photo-count';
    count.textContent = `View ${views.length} photos`;
    lead.append(count);
  }
  lead.setAttribute('aria-haspopup', 'dialog');
  lead.addEventListener('click', event => {
    event.preventDefault();
    opener = lead;
    photos = views;
    title.textContent = figure.querySelector('h3').textContent;
    controls.hidden = photos.length === 1;
    showPhoto(0);
    dialog.showModal();
  });
}

dialog.querySelector('.close-photo').addEventListener('click', () => dialog.close());
dialog.querySelector('.previous-photo').addEventListener('click', () => showPhoto(current - 1));
dialog.querySelector('.next-photo').addEventListener('click', () => showPhoto(current + 1));
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (photos.length < 2) return;
  if (event.key === 'ArrowLeft') showPhoto(current - 1);
  if (event.key === 'ArrowRight') showPhoto(current + 1);
});
dialog.addEventListener('close', () => opener.focus());
