import Rock from '../../resources/images/rock.png';
import Paper from '../../resources/images/paper.png';
import Scissor from '../../resources/images/scissor.png';

export const ROCK = Symbol('rock');
export const PAPER = Symbol('paper');
export const SCISSOR = Symbol('scissor');

export const gestures = [ROCK, PAPER, SCISSOR];

const beatIndex = {
  [ROCK]: [SCISSOR],
  [PAPER]: [ROCK],
  [SCISSOR]: [PAPER]
};

export const ties = (gestureA, gestureB) => gestureA == gestureB;
export const beats = (gestureA, gestureB) => beatIndex[gestureA] && beatIndex[gestureA].includes(gestureB);

const names = {
  [ROCK]: 'Rock',
  [PAPER]: 'Paper',
  [SCISSOR]: 'Scissor'
};
export const name = key => names[key];

export const randomGesture = (func = null) => {
  const index = Math.floor(Math.random() * gestures.length);
  return gestures[index];
};

const images = {
  [ROCK]: Rock,
  [PAPER]: Paper,
  [SCISSOR]: Scissor
};
export const imageSrc = gestures => images[gestures];
