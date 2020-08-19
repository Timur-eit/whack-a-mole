const startTheGame = document.getElementById('start-button');
const moles = document.querySelectorAll('.mole');

let scores = document.querySelector('.scores');
let moleId = null;
let timerForStart = null;

startTheGame.addEventListener('click', start);

function getRandomMole() {
  let randomMoleIndex = Math.floor(Math.random() * moles.length);
  if (randomMoleIndex !== moleId) {
    moleId = randomMoleIndex;
    return randomMoleIndex;
  } else {
    return getRandomMole();
  }
}

function getRandomDelay(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function plusOne() {
  scores.textContent = +scores.textContent + 1;
}

function moleUp(mole) {
  moles[mole].classList.add('mole_over-ground');
}

function moleDown() {
  moles.forEach(mole => mole.classList.remove('mole_over-ground'));
}

function getMovedTheMole() {
  const mole = getRandomMole();
  const delayForGetMoved = getRandomDelay(400, 1000);  
  moleDown();
  moleUp(mole);
  
  timerForStart = setTimeout(getMovedTheMole, delayForGetMoved);
}

moles.forEach(mole => mole.addEventListener('click', plusOne));

function start() {
  scores.textContent = 0;
  getMovedTheMole();
  setTimeout(() => {
    moleDown();
    clearTimeout(timerForStart)
  }, 10e3);
}