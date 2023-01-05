'use strict';

// Define colors object
const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  red: 'var(--color-red)',
  green: 'var(--color-green)',
  black: 'var(--color-black)',
  darkest: 'var(--color-darkest)',
  darker: 'var(--color-darker)',
  dark: 'var(--color-dark)',
  mid: 'var(--color-mid)',
  light: 'var(--color-light)',
  lighter: 'var(--color-lighter)',
  lightest: 'var(--color-lightest)',
  white: 'var(--color-white)',
  gDark: 'var(--gradient-dark)',
  gLight: 'var(--gradient-light)',
};

// Define selectors object
const selectors = {
  score: document.querySelector('.score'),
  high: document.querySelector('.highscore'),
  difficulty: document.querySelector('.difficulty'),
  counter: document.querySelector('.counter'),
  points: document.querySelector('.points'),
  message: document.querySelector('.message'),
  guess: document.querySelector('.guess'),
  btn: document.querySelector('.btn'),
};

// Difficulty levels - should all be evenly divisible by Counter (default 10)
const levels = [
  ['Novice', 20],
  ['Easy', 50],
  ['Hard', 100],
  ['Advanced', 500],
  ['Expert', 1000],
  ['Insane', 5000],
  ['Just why', 10000],
];

// Define default values
const vars = {
  score: 0,
  high: 0,
  counter: 10,
  points: 0,
  level: 0,
};

const difficulty = {
  name: function () {
    return levels[vars.level][0];
  },
  value: function () {
    return levels[vars.level][1];
  },
  text: function () {
    return `${levels[vars.level][0]} (1 - ${levels[vars.level][1]})`;
  },
};

// Define messages object
const messages = {
  // Initial state messages
  0: [
    `Welcome! Select a difficulty level to begin.`,
    // `Click 'Start' to begin!`,
    // `You sure you're ready for this?`,
    // `On your mark, get set...`,
    // `Reluctantly crouched at the starting line...`,
    // `Well, what are you waiting for?`,
    // `Let's get ready to rumble!`,
  ],
  // Active state messages
  1: [
    `Start guessing!`,
    `Here we go!`,
    `No turning back now!`,
    `I'm thinking of a number...`,
    `You can do this!  Probably.  Maybe.`,
    `I have confidence in you!`,
    `Good luck, have fun!`,
    `Go for the high score!`,
  ],
  // Guess is null messages
  2: [
    `Try entering a number, maybe?`,
    `Uh... <null> is not a number?`,
    `You understand the game concept, right?`,
    `Here's a hint... it's a numbers game.`,
    `404: Number Not Found.`,
  ],
  // Guess is out of range messages
  3: [
    `Fixed that for you...`,
    `Overshooting a bit?`,
    `Woah, there, bud. Stay in the range.`,
    `Let's keep this honest, m'kay?`,
  ],
  // Guess is too low messages
  4: [
    `My sources say low.`,
    `How low can you go?  How low can you go?`,
    `Congra... oh, my bad.  Too low.`,
    `Might wanna raise your expectations just a bit.`,
    `Higher...`,
  ],
  // Guess is too high messages
  5: [
    `Aim high in life... but maybe lower for your next guess.`,
    `So close!  I'm kidding.  Too high.`,
    `Lower...`,
    `No, no.  Too high.  Toooo high.`,
    `Might wanna lower your expectations just a bit.`,
  ],
  // End round messages
  6: [
    `You get the dub!`,
    `GG, you gamer, you!`,
    `Nicely done!`,
    `Hey, you did it!  Not bad!`,
    `Ding! Ding! Ding! You win!`,
    `Winner, winner, chicken dinner!`,
    `Eh.  Not too bad for a human.`,
    `Conglaturation!!!`,
    `Nice! Maybe try something harder this time?`,
    // `You're the hero of Hyrule!`,
  ],
  // End game messages
  7: [
    `If at first you don't succeed...`,
    // `Well, that was brutal.`,
    // `You win some, you lose some.`,
    // `Not a numbers person, I see.`,
    `Don't worry. Nobody's watching...`,
    `Ooof.  Maybe next time?`,
    `Don't wish it were easier, wish you were better.`,
    `Requiescat in pace.`,
    // `You have died of dysentery.`,
    `Mission failed.`,
    // `Frostmourne hungers.`,
    `Get Rekt!`,
    // `No need to rage quit.`,
    // `Wasted.`,
    // `You lose!`,
  ],

  //   1: 'Make a guess in the range shown.', //no number
  //   2: 'Correct! You earned one point.',
  //   3: 'Incorrect. Better luck next time.',
  //   4: 'You ran out of guesses. Game over.',
  //   5: 'Congratulations! You have set a new high score.',
  //   6: `You're number was out of range`,
};

export { colors, selectors, levels, vars, difficulty, messages };
