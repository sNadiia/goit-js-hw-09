refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStop.disabled = true;
let timerId = null;

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    addBackGroundColor();
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function addBackGroundColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
