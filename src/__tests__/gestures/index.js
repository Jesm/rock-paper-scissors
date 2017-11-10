import * as gestures from '../../gestures/index.js';

describe('function ties', () => {
  test('should return true when the same gestures are used', () => {
    for(const gesture of gestures.gestures)
      expect(gestures.ties(gesture, gesture)).toBe(true);
  });

  test('should return false when different gestures are used', () => {
    expect(gestures.ties(gestures.ROCK, gestures.PAPER)).toBe(false);
    expect(gestures.ties(gestures.PAPER, gestures.SCISSOR)).toBe(false);
    expect(gestures.ties(gestures.ROCK, gestures.SCISSOR)).toBe(false);
  });
});

describe('function beats', () => {
  test('should return true when the gesture beats another', () => {
    expect(gestures.beats(gestures.ROCK, gestures.SCISSOR)).toBe(true);
    expect(gestures.beats(gestures.SCISSOR, gestures.PAPER)).toBe(true);
    expect(gestures.beats(gestures.PAPER, gestures.ROCK)).toBe(true);
  });

  test('should return false when the gesture does not beat another', () => {
    expect(gestures.beats(gestures.ROCK, gestures.ROCK)).toBe(false);
    expect(gestures.beats(gestures.PAPER, gestures.SCISSOR)).toBe(false);
    expect(gestures.beats(gestures.ROCK, gestures.PAPER)).toBe(false);
    expect(gestures.beats(gestures.SCISSOR, gestures.ROCK)).toBe(false);
  });
});
