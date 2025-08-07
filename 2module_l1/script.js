function getRandomColorClass() {
  const colorClasses = ['red', 'green', 'blue'];

  const colorClassesLength = colorClasses.length;
  const randomFloat = Math.random() * colorClassesLength;
  const randomInteger = Math.floor(randomFloat);
  const colorClass = colorClasses[randomInteger];

  return colorClass;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createRandomlyRotatedSquare() {
  const container = document.querySelector('.squaresContainer');

  const div = document.createElement('div');
  const randomColorClass = getRandomColorClass();
  const randomDegrees = getRandomArbitrary(0, 360);

  div.classList.add('square');
  div.classList.add(randomColorClass);
  div.style.transform = `rotate(${randomDegrees}deg)`;

  container.appendChild(div);
}

function rotateSquares() {
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    const squareClassList = square.classList;

    const randomDegrees = getRandomArbitrary(1, 365);
      square.style.transform = `rotate(${randomDegrees}deg)`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  for (let index = 0; index < 1000; index++) {
    createRandomlyRotatedSquare();
  }
  setInterval(rotateSquares, 2000);

});

