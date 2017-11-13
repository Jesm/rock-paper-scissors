import { createElement } from '../helpers';

export default class ClickableButton {
  constructor(parent, params = {}){
    this.params = Object.assign({
      enabled: true,
      onClick: null,
      label: '',
      classAppend: null
    }, params);

    this.setup(parent);
  }

  setup(parent){
    this.button = createElement('button', parent);
    this.button.classList.add('clickable-button');
    if(this.params.classAppend)
      this.button.classList.add(this.params.classAppend);

    this.enable(this.params.enabled);
    this.setLabel(this.params.label);

    if(this.params.onClick)
      this.button.addEventListener('click', this.params.onClick);
  }

  enable(status){
    this.params.enabled = status;
    this.button.disabled = !status;
  }

  setLabel(str){
    this.button.innerText = str;
  }
}
