import App from '../../components/App.js';
import { PAPER } from '../../gestures';

describe('App setup', () => {
  const aux = () => {
    const parent = document.createDocumentFragment();
    const onGestureSubmit = jest.fn();
    const component = new App(parent, { onGestureSubmit });

    return { parent, onGestureSubmit, component };
  };

  test('should add a child node to parent', () => {
    const parent = document.createDocumentFragment();
    const component = new App(parent);
    expect(parent.children).toHaveLength(1);
  });

  test('should call callback when seletion is made and confirmed', () => {
    const { parent, onGestureSubmit } = aux();
    parent.querySelector('.gesture-display li:nth-child(2) button').click();
    parent.querySelector('div > button').click();
    expect(onGestureSubmit).toBeCalledWith(PAPER);
  });

  test('should not call callback when seletion was not made', () => {
    const { parent, onGestureSubmit } = aux();
    parent.querySelector('div > button').click();
    expect(onGestureSubmit).not.toBeCalled();
  });
});
