import * as helpers from '../../helpers/index.js';

describe('createElement helper', () => {
  test('should return an div element without parent element', () => {
    const element = helpers.createElement('div');
    expect(element.constructor).toEqual(HTMLDivElement);
    expect(element.parentNode).toBeNull();
  });

  test('should return an element with the informed parent node', () => {
    const parent = document.createDocumentFragment();
    const element = helpers.createElement('section', parent);
    expect(element.parentNode).toEqual(parent);
  });
});
