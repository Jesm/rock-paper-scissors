import GestureDisplay from '../../components/GestureDisplay.js';
import { SCISSOR } from '../../gestures';

const aux = enableSelection => {
  const parent = document.createDocumentFragment();
  const onSelection = jest.fn();
  const component = new GestureDisplay(parent, { enableSelection, onSelection });

  return { parent, onSelection, component };
};

describe('GestureDisplay setup', () => {
  test('should add a child node to parent', () => {
    const parent = document.createDocumentFragment();
    const component = new GestureDisplay(parent);
    expect(parent.children).toHaveLength(1);
  });

  test('should add a child node with the correct class', () => {
    const parent = document.createDocumentFragment();
    const component = new GestureDisplay(parent, { classAppend: 'foobar' });
    expect(parent.querySelectorAll('.foobar')).toHaveLength(1);
  });

  test('should add "selected" class to selected element', () => {
    const parent = document.createDocumentFragment();
    const component = new GestureDisplay(parent, { enableSelection: true });
    const button = parent.querySelector('.gesture-display li:nth-child(1) button');
    button.click();
    expect(button.className).toBe('selected');
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

describe('setSelectedGesture function', () => {
  test('should not call callback when is set to select a gesture already selected', () => {
    const { parent, component, onSelection } = aux(true);
    parent.querySelector('.gesture-display li:nth-child(3) button').click();
    component.setSelectedGesture(SCISSOR);
    expect(onSelection).toHaveBeenCalledTimes(1);
  });
});

describe('clearSelection function', () => {
  test('should clear the selection when is called with a selected item', () => {
    const { parent, component } = aux(true);

    parent.querySelector('.gesture-display li:nth-child(3) button').click();
    expect(parent.querySelectorAll('.selected')).toHaveLength(1);

    component.clearSelection();
    expect(parent.querySelectorAll('.selected')).toHaveLength(0);
  });
});
