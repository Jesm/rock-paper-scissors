import { PLAYER, READY, GESTURE_SELECTED, GESTURE_CONFIRMED, GAME_GENERATED } from '../App.js';
import { name } from '../gestures';
import { createElement } from '../helpers';
import GestureDisplay from './GestureDisplay.js';
import MessageDisplay from './MessageDisplay.js';
import ClickableButton from './ClickableButton.js';

export const STATUS_CHANGE = Symbol('status_change');
export const AUTOPLAY_STATUS_CHANGE = Symbol('autoplay_status_change');

export default class App {
  constructor(parent, params = {}){
    this.params = Object.assign({
      onGestureSelection: null,
      onGestureConfirmation: null,
      onAutoplayToggle: null
    }, params);

    this.setup(parent);
  }

  setup(parent){
    const root = createElement('div', parent);
    root.classList.add('app');

    this.computerSelectionComponent = new GestureDisplay(root, { classAppend: 'computer' });
    this.msgDisplay = new MessageDisplay(root);

    this.selectionComponent = new GestureDisplay(root, {
      classAppend: 'player',
      enableSelection: true,
      onSelection: this.params.onGestureSelection
    });

    const container = createElement('section', root);
    container.className = 'container buttons';

    this.confirmButton = new ClickableButton(container, { onClick: this.params.onGestureConfirmation, label: 'Confirm' });
    this.autoplayButton = new ClickableButton(container, { onClick: this.params.onAutoplayToggle, classAppend: 'autoplay' });
    this.setAutoplayButtonText(false);
  }

  update(type, data){
    switch(type){
      case STATUS_CHANGE:
        this.updateFromStatusChange(data);
      break;
      case AUTOPLAY_STATUS_CHANGE:
        this.setAutoplayButtonText(data.status);
      break;
    }
  }

  updateFromStatusChange(data){
    switch(data.type){
      case READY:
        this.computerSelectionComponent.clearSelection();
        this.selectionComponent.clearSelection();

        this.selectionComponent.enable(true);
        this.confirmButton.enable(false);

        this.setMessage('Choose your gesture from the options below!');
      break;
      case GESTURE_SELECTED:
        const { gesture } = data;
        this.confirmButton.enable(true);
        this.selectionComponent.setSelectedGesture(gesture);
        this.setMessage(`You chose ${name(gesture)}! Confirm to continue...`);
      break;
      case GESTURE_CONFIRMED:
        this.confirmButton.enable(false);
        this.selectionComponent.enable(false);

        const { computerGesture } = data;
        this.computerSelectionComponent.setSelectedGesture(computerGesture);
        this.setMessage(`Computer chose ${name(computerGesture)}!`);
      break;
      case GAME_GENERATED:
        const { game } = data;

        let msg;
        if(game.tied)
          msg = 'The game tied!';
        else if(game.winner == PLAYER)
          msg = 'You won!';
        else
          msg = 'The computer won!';

        this.setMessage(msg);
      break;
    }
  }

  setAutoplayButtonText(status){
    this.autoplayButton.setLabel(`${status ? 'Disable' : 'Enable'} autoplay`);
  }

  setMessage(str){
    this.msgDisplay.display(str);
  }
}
