import { gestures, name, imageSrc } from '../gestures';
import { createElement } from '../helpers';

export default class GestureDisplay {
  constructor(parent, params = {}){
    this.params = Object.assign({
      enableSelection: false,
      onSelection: null,
      classAppend: null
    }, params);

    this.selectedGesture = null;

    this.setup(parent);
  }

  setup(parent){
    this.rootElement = createElement('section', parent);
    this.rootElement.classList.add('gesture-display');
    if(this.params.classAppend)
      this.rootElement.classList.add(this.params.classAppend);
    this.enable(this.params.enableSelection);

    const container = createElement('div', this.rootElement);
    container.classList.add('container');
    const ul = createElement('ul', container);

    this.buttonIndex = gestures.reduce((carry, gesture) => {
      const li = createElement('li', ul);
      carry[gesture] = this.createGestureButton(li, gesture);
      return carry;
    }, {});
  }

  createGestureButton(parent, gesture){
    const gestureName = name(gesture);

    const button = createElement('button', parent);
    button.classList.add('gesture');
    button.title = gestureName;
    button.addEventListener('click', ev => this.handleClick(gesture));

    const img = createElement('img', button);
    img.alt = gestureName;
    img.src = imageSrc(gesture);

    return button;
  }

  enable(status){
    this.params.enabled = status;
    this.rootElement.classList[status ? 'add' : 'remove']('selectable');
  }

  handleClick(gesture){
    if(this.params.enabled)
      this.setSelectedGesture(gesture);
  }

  setSelectedGesture(gesture){
    if(this.selectedGesture == gesture)
      return;

    this.clearSelection();

    this.selectedGesture = gesture;

    this.rootElement.classList.add('gesture-selected');
    this.buttonIndex[gesture].classList.add('selected');

    if(this.params.onSelection)
      this.params.onSelection(gesture);
  }

  clearSelection(){
    if(!this.selectedGesture)
      return;

    this.rootElement.classList.remove('gesture-selected');
    this.buttonIndex[this.selectedGesture].classList.remove('selected');

    this.selectedGesture = null;
  }
}
