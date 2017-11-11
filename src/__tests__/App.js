import App, { READY, GESTURE_SELECTED, GESTURE_CONFIRMED, GAME_GENERATED } from '../App.js';
import { ROCK } from '../gestures';

describe('setup', () => {
  const parent = document.createDocumentFragment();
  const app = new App({ viewRoot: parent });

  test('should add a child node to element passed in argument', () => {
    expect(parent.children).toHaveLength(1);
  });

  test('should change status when gesture is clicked', () => {
    parent.querySelector('.player li:nth-child(2) button').click();
    expect(app.getStatus()).toBe(GESTURE_SELECTED);
  });

  test('should change status when confirmation button is clicked', () => {
    parent.querySelector('.clickable-button').click();
    expect(app.getStatus()).toBe(GESTURE_CONFIRMED);
  });
});

describe('game status change over time', () => {
  const delay = 50;
  const app = new App({ pauseDuration: delay });

  describe('setSelectedGesture function', () => {
    test('should change status to GESTURE_SELECTED', () => {
      app.setSelectedGesture(ROCK);
      expect(app.getStatus()).toBe(GESTURE_SELECTED);
    });
  });

  describe('setSelectedGesture function', () => {
    test('should change status to GESTURE_CONFIRMED', () => {
      app.confirmGesture();
      expect(app.getStatus()).toBe(GESTURE_CONFIRMED);
    });
  });

  describe('status changes after pauses', () => {
    test('should change status to GAME_GENERATED after the delay', done => {
      expect(app.getStatus()).toBe(GESTURE_CONFIRMED);

      setTimeout(() => expect(app.getStatus()).toBe(GAME_GENERATED), delay + 10);

      setTimeout(() => {
        expect(app.getStatus()).toBe(READY);
        done();
      }, delay * 2 + 10);
    });
  });
});

describe('functions must disallow invalid state changes', () => {
  const parent = document.createDocumentFragment();
  const app = new App();

  describe('confirmGesture function', () => {
    test('should not change status to GESTURE_CONFIRMED', () => {
      app.confirmGesture();
      expect(app.getStatus()).not.toBe(GESTURE_CONFIRMED);
    });
  });

  describe('makeGame function', () => {
    test('should not change status to GAME_GENERATED', () => {
      app.setSelectedGesture(ROCK);

      app.makeGame(ROCK);
      expect(app.getStatus()).not.toBe(GAME_GENERATED);
    });
  });

  describe('setSelectedGesture function', () => {
    test('should not change status to GESTURE_SELECTED', () => {
      app.confirmGesture();

      app.setSelectedGesture(ROCK);
      expect(app.getStatus()).not.toBe(GESTURE_SELECTED);
    });
  });
});

