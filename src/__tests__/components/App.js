import App, { STATUS_CHANGE, AUTOPLAY_STATUS_CHANGE } from '../../components/App.js';
import { PAPER } from '../../gestures';
import { PLAYER, COMPUTER, READY, GESTURE_SELECTED, GESTURE_CONFIRMED, GAME_GENERATED } from '../../App.js';

describe('App', () => {
  const aux = () => {
    const parent = document.createDocumentFragment();
    const onGestureSelection = jest.fn();
    const onGestureConfirmation = jest.fn();
    const onAutoplayToggle = jest.fn();
    const component = new App(parent, { onGestureSelection, onGestureConfirmation, onAutoplayToggle });

    return { parent, onGestureSelection, onGestureConfirmation, onAutoplayToggle, component };
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

    test('should call callback when autoplay button is clicked', () => {
      const { parent, onAutoplayToggle } = aux();
      parent.querySelector('.buttons button:nth-child(2)').click();
      expect(onAutoplayToggle).toHaveBeenCalled();
    });
  });

  describe('update function', () => {
    const { parent, component } = aux();

    test('should display correct message according to status changes', () => {
      const messageElement = parent.querySelector('.message-display span');

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

    test('should update autoplay button text according to autoplay status', () => {
      const autoplayButton = parent.querySelector('.buttons .clickable-button:nth-child(2)');

      component.update(AUTOPLAY_STATUS_CHANGE, { status: true });
      expect(autoplayButton.innerText).toBe('Disable autoplay');

      component.update(AUTOPLAY_STATUS_CHANGE, { status: false });
      expect(autoplayButton.innerText).toBe('Enable autoplay');
    });
  });
});
