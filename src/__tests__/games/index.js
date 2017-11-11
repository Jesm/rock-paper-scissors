import * as games from '../../games/index.js';
import { ROCK, PAPER, SCISSOR } from '../../gestures';

describe('make function', () => {
  const player1 = Symbol('player1');
  const player2 = Symbol('player2');
  const aux = (gesture1, gesture2) => games.make(
      { player: player1, gesture: gesture1 },
      { player: player2, gesture: gesture2 }
  );

  test('should return item with tied game', () => {
    expect(aux(ROCK, ROCK)).toMatchObject({ tied: true, winner: null });
    expect(aux(SCISSOR, SCISSOR)).toMatchObject({ tied: true, winner: null });
  });

  test('should return item with correct winner', () => {
    expect(aux(ROCK, PAPER)).toMatchObject({ tied: false, winner: player2 });
    expect(aux(SCISSOR, PAPER)).toMatchObject({ tied: false, winner: player1 });
  });
});
