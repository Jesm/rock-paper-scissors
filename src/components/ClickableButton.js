import { createElement } from '../helpers';

export default class ClickableButton {
  constructor(parent, params = {}){
    this.params = Object.assign({
      status: true,
      onClick: null,
      label: 'Confirm'
    }, params);

    this.setup(parent);
  }

  setup(parent){
    this.button = createElement('button', parent);
    this.button.innerText = 'Confirm';
    this.setStatus(this.params.status);
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  setStatus(status){
    this.params.status = status;
    this.button.classList[status ? 'remove' : 'add']('disable');
  }

  handleClick(){
    if(this.params.status && this.params.onClick)
      this.params.onClick();
  }
}
