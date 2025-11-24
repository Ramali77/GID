const cols = 20;
const gaps = 19;
const minColWidth = 10;
let gapWidth;

function calcGap() {
  const windowWidth = window.innerWidth;
  const totalEmptyWidth = windowWidth - cols * minColWidth;
  gapWidth = totalEmptyWidth / gaps;

  updateContainer(gapWidth);
}

function updateContainer(gap) {
  const container = document.querySelector('section');
  container.style.gap = `${gap}px`;
}

function initSlider() {
  const slider = document.querySelector('input');
  slider.max = gapWidth;
  slider.value = gapWidth;

  slider.addEventListener('input', () => {
    updateContainer(slider.value);
  });
}

window.addEventListener('resize', () => {
  calcGap();
  initSlider();
});

document.addEventListener('DOMContentLoaded', () => {
  calcGap();
  initSlider();
});
