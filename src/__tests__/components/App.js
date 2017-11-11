import App, { STATUS_CHANGE } from '../../components/App.js';
import { PAPER } from '../../gestures';
import { PLAYER, COMPUTER, READY, GESTURE_SELECTED, GESTURE_CONFIRMED, GAME_GENERATED } from '../../App.js';

describe('App', () => {
  const aux = () => {
    const parent = document.createDocumentFragment();
    const onGestureSelection = jest.fn();
    const onGestureConfirmation = jest.fn();
    const component = new App(parent, { onGestureSelection, onGestureConfirmation });

    return { parent, onGestureSelection, onGestureConfirmation, component };
  };

  describe('setup', () => {
    test('should add a child node to parent', () => {
      const parent = document.createDocumentFragment();
      const component = new App(parent);
      expect(parent.children).toHaveLength(1);
    });

    test('should call callback when seletion is made', () => {
      const { parent, onGestureSelection } = aux();
      parent.querySelector('.player li:nth-child(2) button').click();
      expect(onGestureSelection).toHaveBeenCalledWith(PAPER);
    });

    test('should call callback when seletion is confirmed', () => {
      const { parent, onGestureConfirmation } = aux();
      parent.querySelector('.player li:nth-child(2) button').click();
      parent.querySelector('.clickable-button').click();
      expect(onGestureConfirmation).toHaveBeenCalled();
    });
  });

  describe('update function', () => {
    const { parent, component } = aux();
    const messageElement = parent.querySelector('.message-display span');

    test('should display correct message according to status changes', () => {
      component.update(STATUS_CHANGE, { type: READY });
      expect(messageElement.innerText).toBe('Choose your gesture from the options below!');

      component.update(STATUS_CHANGE, { type: GESTURE_SELECTED, gesture: PAPER });
      expect(messageElement.innerText).toBe('You chose Paper! Confirm to continue...');

      component.update(STATUS_CHANGE, { type: GESTURE_CONFIRMED, computerGesture: PAPER });
      expect(messageElement.innerText).toBe('Computer chose Paper!');

      component.update(STATUS_CHANGE, { type: GAME_GENERATED, game: { tied: true, winner: null }});
      expect(messageElement.innerText).toBe('The game tied!');

      component.update(STATUS_CHANGE, { type: GAME_GENERATED, game: { tied: false, winner: PLAYER }});
      expect(messageElement.innerText).toBe('You won!');

      component.update(STATUS_CHANGE, { type: GAME_GENERATED, game: { tied: false, winner: COMPUTER }});
      expect(messageElement.innerText).toBe('The computer won!');
    });
  });
});
