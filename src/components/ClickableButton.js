import { createElement } from '../helpers';

export default class ClickableButton {
  constructor(parent, params = {}){
    this.params = Object.assign({
      enabled: true,
      onClick: null,
      label: 'Confirm'
    }, params);

    this.setup(parent);
  }

  setup(parent){
    this.button = createElement('button', parent);
    this.button.classList.add('clickable-button');
    this.button.innerText = 'Confirm';
    this.enable(this.params.enabled);
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  enable(status){
    this.params.enabled = status;
    this.button.classList[status ? 'remove' : 'add']('disable');
  }

  handleClick(){
    if(this.params.enabled && this.params.onClick)
      this.params.onClick();
  }
}
