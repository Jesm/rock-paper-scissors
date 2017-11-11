import { ties, beats } from '../gestures';

export const make = (player1, player2) => {
  const game = {
    player1: Object.assign({}, player1),
    player2: Object.assign({}, player2),
    tied: ties(player1.gesture, player2.gesture),
    winner: null
  };

  if(game.tied)
    return game;

  game.winner = beats(player1.gesture, player2.gesture) ? player1.player : player2.player;
  return game;
};
