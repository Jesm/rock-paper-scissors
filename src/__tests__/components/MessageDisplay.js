import MessageDisplay from '../../components/MessageDisplay.js';

describe('MessageDisplay', () => {
  const aux = () => {
    const parent = document.createDocumentFragment();
    const component = new MessageDisplay(parent);
    return { parent, component };
  };

  describe('setup', () => {
    test('should add a child node to parent', () => {
      const { parent } = aux();
      expect(parent.children).toHaveLength(1);
    });
  });

  describe('display function', () => {
    test('should update innerText from the span element', () => {
      const { parent, component } = aux();
      component.display('foobar');
      const span = parent.querySelector('.message-display > div > span');
      expect(span.innerText).toBe('foobar');
    });
  });
});
