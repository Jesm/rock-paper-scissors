import AutoplayService from '../AutoplayService.js';
import App, { READY, GESTURE_SELECTED } from '../App.js';

describe('functions with delay', () => {
  const aux = () => {
    const setSelectedGesture = jest.fn();
    const confirmGesture = jest.fn();
    const delay = 50;
    const service = new AutoplayService({ setSelectedGesture, confirmGesture }, delay);

    return { setSelectedGesture, confirmGesture, delay, service };
  };

  describe('statusChange function', () => {
    test('should call setSelectedGesture callback after the expected delay', done => {
      const { setSelectedGesture, delay, service } = aux();

      service.statusChange(READY);
      expect(setSelectedGesture).not.toHaveBeenCalled();

      setTimeout(() => {
        expect(setSelectedGesture).toHaveBeenCalled();
        done();
      }, delay + 10);
    });

    test('should call confirmGesture callback after the expected delay', done => {
      const { confirmGesture, delay, service } = aux();

      service.statusChange(GESTURE_SELECTED);
      expect(confirmGesture).not.toHaveBeenCalled();

      setTimeout(() => {
        expect(confirmGesture).toHaveBeenCalled();
        done();
      }, delay + 10);
    });
  });

  describe('cancelAction function', () => {
    const { setSelectedGesture, delay, service } = aux();

    test('should not call function when action is canceled', done => {
      service.statusChange(READY);
      service.cancelAction();

      setTimeout(() => {
        expect(setSelectedGesture).not.toHaveBeenCalled();
        done();
      }, delay + 10);
    });
  });
});
