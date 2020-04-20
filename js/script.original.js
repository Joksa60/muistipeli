const cardsArray = [{
    'name': 'shell',
    'img': 'img2/auto1.png',
  },
  {
    'name': 'star',
    'img': 'img2/auto2.png',
  },
  {
    'name': 'bobomb',
    'img': 'img2/auto3.png',
  },
  {
    'name': 'mario',
    'img': 'img2/auto4.png',
  },
  {
    'name': 'luigi',
    'img': 'img2/auto5.png',
  },
  {
    'name': 'peach',
    'img': 'img2/auto6.png',
  },
  {
    'name': '1up',
    'img': 'img2/auto7.png',
  },
  {
    'name': 'mushroom',
    'img': 'img2/auto8.png',
  },
  {
    'name': 'thwomp',
    'img': 'img2/auto9.png',
  },
  {
    'name': 'bulletbill',
    'img': 'img2/auto10.png',
  },
  {
    'name': 'coin',
    'img': 'img2/auto11.png',
  },
  {
    'name': 'goomba',
    'img': 'img2/auto12.png',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
