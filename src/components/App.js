import { createElement } from '../helpers';
import GestureDisplay from './GestureDisplay.js';
import ClickableButton from './ClickableButton.js';

export default class App {
  constructor(parent, params = {}){
    this.params = Object.assign({
      onGestureSubmit: null
    }, params);

    this.selectedGesture = null;

    this.setup(parent);
  }

  setup(parent){
    const root = createElement('div', parent);

    const onSelection = this.handleSelection.bind(this);
    this.selectionComponent = new GestureDisplay(root, { enableSelection: true, onSelection });

    const onClick = this.handleConfirmation.bind(this);
    this.confirmButton = new ClickableButton(root, { onClick });
  }

  handleSelection(gesture){
    this.selectedGesture = gesture;
  }

  handleConfirmation(){
    if(this.selectedGesture && this.params.onGestureSubmit)
      this.params.onGestureSubmit(this.selectedGesture);
  }

  resetSelection(){
    this.selectionComponent.setSelectedGesture(null);
  }
}
