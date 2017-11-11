import { gestures, name } from '../gestures';
import { createElement } from '../helpers';
import '../../resources/sass/components/_gesture_display.scss';

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
    this.rootElement = createElement('ul', parent);
    this.rootElement.classList.add('gesture-display');
    if(this.params.classAppend)
      this.rootElement.classList.add(this.params.classAppend);
    this.enable(this.params.enableSelection);

    this.buttonIndex = gestures.reduce((carry, gesture) => {
      const li = createElement('li', this.rootElement);
      const button = createElement('button', li);
      button.innerText = name(gesture);
      button.addEventListener('click', ev => this.handleClick(gesture));

      carry[gesture] = button;
      return carry;
    }, {});
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
    this.buttonIndex[gesture].classList.add('selected');

    if(this.params.onSelection)
      this.params.onSelection(gesture);
  }

  clearSelection(){
    if(!this.selectedGesture)
      return;

    this.buttonIndex[this.selectedGesture].classList.remove('selected');
    this.selectedGesture = null;
  }
}
