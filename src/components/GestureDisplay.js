import { gestures, name } from '../gestures';
import { createElement } from '../helpers';
import '../../resources/sass/components/_gesture_display.scss';

export default class GestureDisplay {
  constructor(parent, params = {}){
    this.params = Object.assign({
      enableSelection: false,
      onSelection: null
    }, params);

    this.selectedGesture = null;

    this.setup(parent);
  }

  setup(parent){
    this.rootElement = createElement('ul', parent);
    this.rootElement.classList.add('gesture-display');
    this.enableSelection(this.params.enableSelection);

    this.buttonIndex = gestures.reduce((carry, gesture) => {
      const li = createElement('li', this.rootElement);
      const button = createElement('button', li);
      button.innerText = name(gesture);
      button.addEventListener('click', ev => this.handleClick(gesture));

      carry[gesture] = button;
      return carry;
    }, {});
  }

  enableSelection(status){
    this.params.enableSelection = status;
    this.rootElement.classList[status ? 'add' : 'remove']('selectable');
  }

  handleClick(gesture){
    if(this.params.enableSelection)
      this.setSelectedGesture(gesture);
  }

  setSelectedGesture(gesture){
    if(this.selectedGesture == gesture)
      return;

    if(this.selectedGesture)
      this.buttonIndex[this.selectedGesture].classList.remove('selected');

    this.selectedGesture = gesture;
    if(this.buttonIndex[gesture])
      this.buttonIndex[gesture].classList.add('selected');

    if(gesture && this.params.onSelection)
      this.params.onSelection(gesture);
  }
}
