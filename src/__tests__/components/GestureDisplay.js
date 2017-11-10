import GestureDisplay from '../../components/GestureDisplay.js';
import { SCISSOR } from '../../gestures';

describe('GestureDisplay setup', () => {
  const aux = enableSelection => {
    const parent = document.createDocumentFragment();
    const onSelection = jest.fn();
    const component = new GestureDisplay(parent, { enableSelection, onSelection });

    return { parent, onSelection, component };
  };

  test('should add a child node to parent', () => {
    const parent = document.createDocumentFragment();
    const component = new GestureDisplay(parent);
    expect(parent.children).toHaveLength(1);
  });

  test('should not call callback when selection is disabled and selection is made', () => {
    const { parent, onSelection } = aux(false);
    parent.querySelector('.gesture-display li:nth-child(3) button').click();
    expect(onSelection).not.toBeCalled();
  });

  test('should call callback when selection is enabled and selection is made', () => {
    const { parent, onSelection } = aux(true);
    parent.querySelector('.gesture-display li:nth-child(3) button').click();
    expect(onSelection).toBeCalledWith(SCISSOR);
  });
});
