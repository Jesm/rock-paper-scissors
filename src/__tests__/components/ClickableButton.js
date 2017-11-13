import ClickableButton from '../../components/ClickableButton.js';

describe('ClickableButton setup', () => {
  const aux = () => {
    const parent = document.createDocumentFragment();
    const onClick = jest.fn();
    const component = new ClickableButton(parent, { onClick, classAppend: 'foobar' });

    return { parent, onClick, component };
  };

  test('should add a child node to parent', () => {
    const parent = document.createDocumentFragment();
    const component = new ClickableButton(parent);
    expect(parent.children).toHaveLength(1);
  });

  test('should add the class to the element', () => {
    const { parent } = aux();
    expect(parent.querySelectorAll('.foobar')).toHaveLength(1);
  });

  test('should call callback when button is clicked', () => {
    const { parent, onClick } = aux();
    parent.querySelector('button').click();
    expect(onClick).toBeCalled();
  });

  test('should not call callback when button is clicked and component status is false', () => {
    const { parent, onClick, component } = aux();
    component.enable(false);
    parent.querySelector('button').click();
    expect(onClick).not.toBeCalled();
  });
});

describe('setLabel function', () => {
  const parent = document.createDocumentFragment();
  const component = new ClickableButton(parent);

  test('should update the button text', () => {
    component.setLabel('foobar');
    expect(parent.querySelector('button').innerText).toBe('foobar');
  });
});
