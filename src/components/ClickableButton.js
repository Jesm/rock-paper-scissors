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
    this.button.innerText = this.params.label;
    this.enable(this.params.enabled);

    if(this.params.onClick)
      this.button.addEventListener('click', this.params.onClick);
  }

  enable(status){
    this.params.enabled = status;
    this.button.disabled = !status;
  }
}
