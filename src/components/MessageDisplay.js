import { createElement } from '../helpers';

export default class MessageDisplay {
  constructor(parent){
    this.setup(parent);
  }

  setup(parent){
    this.root = createElement('section', parent);
    this.root.classList.add('message-display');

    const container = createElement('div', this.root);
    container.classList.add('container');

    this.msgField = createElement('span', container);
  }

  display(str){
    this.msgField.innerText = str;
  }
}
