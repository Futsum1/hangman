/----- constants -----/
const WORDS = [
  'DEVELOPER', 'ENGINEER', 'NODE', 'JAVASCRIPT',
  'CODING', 'HTML', 'GUI', 'BOOLEAN',
  'REACT', 'FUNCTION', 'COMPUTER SCIENCE',
  'SEPARATION OF CONCERNS' 
];
const MAX_WRONG = 6;
const SPRITE_WIDTH = -11.25;
/----- app's state (variables) -----/
let secretWord; //holds the randolmy selected words
let wrongLetters; //array of string
let guess;  // string that is initialized to same length as the secret
/----- cached element references -----/
const guessEl = document.getElementById('guess');
const btnEls = document.querySelectorAll('#letters > button');
const gallowsEl = document.getElementById('gallows');
const msgEl = document.getElementById('msg');
const replayEl = document.getElementById('replay');
/----- event listeners -----/
document.getElementById('letters').addEventListener('click', handleLetterClick);
replayEl.addEventListener('click',init);
/----- functions -----/
init();
function handleLetterClick(evt) {
  const letter = evt.target.textContent;
  if ( letter.length > 1 ||
        isGameOver() ||
        wrongLetters.includes(letter) ||
        guess.includes(letter)
  ) return;
  if(secretWord.includes(letter)) {
    //  letter is correct (in the secretword), place all occurances
    let newGuess = '';
    for (let i = 0; i < secretWord.length; i++) {
      newGuess += secretWord.charAt(i) == letter ?
      letter : guess.charAt(i);
    }
    guess = newGuess;
  }else {
    wrongLetters.push(letter);
  }
  console.log(guess, wrongLetters)
  render();
}
function isGameOver() {
  return secretWord === guess || wrongLetters.length === MAX_WRONG;
}
function init() {
  // Initialized all state and lastly call render()
  wrongLetters = [];
  // Get random index for secret word
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[rndIdx];
  guess = '';
  for (let char of secretWord) {
    guess += (char === ' ') ? ' ' : '_';
  }
  // guess = secretWord.replace(/[A-Z/g'_');
  render();
}
function render() {
  guessEl.textContent = guess;
  btnEls.forEach(function(btnEl) {
    const letter = btnEl.textContent;
    if (wrongLetters.includes(letter)) {
      btnEl.className = 'wrong';
    } else if (guess.includes(letter)) {
      btnEl.className = 'correct';
    } else {
      btnEl.className = '';
    }
  });
gallowsEl.style.backgroundPositionX =  `${wrongLetters.length * SPRITE_WIDTH}vmin`;
replayEl.style.visibility = isGameOver() ? 'visible' : 'hidden';
renderMessage();
}
function renderMessage() {
  if (guess === secretWord) {
    msgEl.textContent = 'Congrats you won!';
  }else if (wrongLetters.length === MAX_WRONG) {
    msgEl.textContent = 'You are hung!';
  } else {
    //game is in play
    // TODO: Render how many wrong guesses left (x of y)
    msgEl.textContent = 'Good Luck!';
  }
}