'use strict';

import {
  colors,
  selectors,
  levels,
  vars,
  difficulty,
  messages,
} from './constants.js';

/* ---------- DEBUG LOGGING ----------*/

const debug = 1;

function logger(message) {
  if (debug) {
    console.log(message);
  }
}

/* ---------- FUNCTIONS ----------*/

// Set initial state (0)
function setInitialState() {
  // Set counters
  selectors.score.textContent = vars.score;
  selectors.high.textContent = vars.high;
  selectors.counter.textContent = vars.counter;
  selectors.points.textContent = difficulty.value();

  // Set controls
  selectors.difficulty.style.color = colors.secondary;
  selectors.difficulty.style.cursor = 'pointer';
  selectors.difficulty.textContent = difficulty.text();

  selectors.guess.placeholder = '?';
  selectors.guess.style.background = colors.black;
  selectors.guess.value = '';

  selectors.btn.disabled = false;
  selectors.btn.textContent = 'Start';

  displayMessage(0); // Display initial message

  vars.state = 0; // Update state
}

// Set active state (1)
function setActiveState() {
  // Set counters
  selectors.counter.textContent = vars.counter;
  selectors.points.textContent = vars.points;

  // Set controls
  selectors.btn.textContent = 'Guess';

  selectors.difficulty.style.color = colors.primary;
  selectors.difficulty.style.cursor = '';

  selectors.guess.disabled = false;
  selectors.guess.placeholder = '';
  selectors.guess.maxLength = difficulty.value().toString().length;
  selectors.guess.focus();

  displayMessage(1); // Display active message

  vars.state = 1; // Update state
}

// Set end round state (2)
function setEndRoundState() {
  // Set counters
  selectors.score.textContent = vars.score;

  //Set controls
  selectors.guess.disabled = true;
  selectors.guess.style.background = colors.green;

  selectors.btn.textContent = 'Continue';

  displayMessage(6); // Display continue message

  vars.state = 2; // Update state
}

// Set end game state (3)
function setEndGameState() {
  // Set counters
  selectors.high.textContent = vars.high;

  //Set controls
  selectors.guess.disabled = true;
  selectors.guess.style.background = colors.red;

  selectors.btn.textContent = 'Retry';

  displayMessage(7); // Display continue message

  vars.state = 3; // Update state
}

// Display message
function displayMessage(type) {
  switch (type) {
    //TODO: Break out types after constructing high/low messages
    default:
      selectors.message.textContent =
        messages[type][Math.floor(Math.random() * messages[type].length)];
      break;
  }
}

// Play function
function play() {
  // Get player's guess
  const guess = Number(selectors.guess.value);

  // If guess is null
  if (!guess) {
    selectors.guess.focus();
    displayMessage(2);
  } else {
    // Check if guess is correct
    if (guess === vars.number) {
      vars.score += vars.points; // Increment score
      setEndRoundState();
    } else {
      // Decrement counter and update textcontent
      selectors.counter.textContent = vars.counter -= 1;

      // Decrement points and update textcontent
      selectors.points.textContent = vars.points -= vars.decrement;

      // Check if out of guesses
      if (vars.counter === 0) {
        // Check if new high score
        if (vars.score > vars.high) {
          vars.high = vars.score;
        }
        setEndGameState();
      } else {
        selectors.guess.focus();
        displayMessage(guess < vars.number ? 4 : 5);
      }
    }
  }
}

/* ---------- EVENT LISTENERS ----------*/

// Event listener for difficulty click: Toggle difficulty level
selectors.difficulty.addEventListener('click', () => {
  // Check if initial state
  if (vars.state === 0 || vars.state === 2) {
    // Increment level index
    vars.level = (vars.level + 1) % levels.length;

    // Update difficulty textcontent
    selectors.difficulty.textContent = difficulty.text();

    // Update points textcontent
    selectors.points.textContent = difficulty.value();
  }
});

// Event listener for button click: State dependent actions
selectors.btn.addEventListener('click', () => {
  // Check state
  switch (vars.state) {
    // Initial state
    case 0:
      // Set points based on level index
      vars.points = difficulty.value();

      // Set points decrement based on level points
      vars.decrement = vars.points / vars.counter;

      // Generate random number in level range
      vars.number = Math.floor(Math.random() * difficulty.value()) + 1;
      console.log(vars.number);

      // Set active state
      setActiveState();
      break;

    // Active state
    case 1:
      play();
      break;

    // End round state
    case 2:
      // Reset counter
      vars.counter = 10;

      // Set initial state
      setInitialState();
      break;

    // End game state
    case 3:
      // Reset counter
      vars.counter = 10;
      // Reset score
      vars.score = 0;

      // Set initial state
      setInitialState();
      break;
    default:
      break;
  }
});

// Event listener for keydown: Submit guess on 'Enter' key
selectors.guess.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    selectors.guess.blur();
    selectors.btn.click();
  }
});

// Event listenter for input onfocus: Select existing guess value
selectors.guess.addEventListener('focus', function () {
  selectors.guess.select();
});

// Event listener for input value: Correct out of range guesses
selectors.guess.addEventListener('input', function () {
  if (isNaN(selectors.guess.value) || selectors.guess.value < 1) {
    selectors.guess.value = '';
  } else if (selectors.guess.value > difficulty.value()) {
    selectors.guess.value = difficulty.value();
    displayMessage(3);
  }
});

setInitialState();

///// TO DO /////
//// setEndRoundState should allow the user to select a new difficulty
//// Should also just start the next round on 'continue' and not have to return to state(0)

//// Utilize local storage for retaining HS and resuming games
// function setLocalStorage() {
//   for (const [key, value] of Object.entries(vars)) {
//     localStorage.setItem(key, value);
//   }
// }
// function getLocalStorage() {
//   for (const [key, value] of Object.entries(localStorage)) {
//     vars[key] = value;
//   }
// }

// document.addEventListener(
//   'focusin',
//   function () {
//     console.log('focused: ', document.activeElement.className);
//   },
//   true
// );
