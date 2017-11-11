import { createElement } from '../helpers';

export default class MessageDisplay {
  constructor(parent){
    this.setup(parent);
  }

  setup(parent){
    this.root = createElement('section', parent);
    this.root.classList.add('message-display');
    this.msgField = createElement('span', this.root);
  }

  display(str){
    this.msgField.innerText = str;
  }
}
