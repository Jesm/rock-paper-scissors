import App from '../App.js';
import { ROCK } from '../gestures';

describe('App class', () => {
  test('should add a child node to element passed in argument', () => {
    const fragment = document.createDocumentFragment();
    const app = new App(fragment);
    expect(fragment.children).toHaveLength(1);
  });

  test('should call console.log when a gesture is confirmed', () => {
    const mock = jest.fn();
    console.log = mock;

    const app = new App(document.body);
    document.querySelector('.gesture-display button').click();
    document.querySelector('div > button').click();

    expect(mock).toBeCalledWith(ROCK);
  });
});
