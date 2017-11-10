import AppComponent from './components/App.js';

const READY = Symbol('ready');
const WAITING = Symbol('waiting');

const PLAYER = Symbol('player');
const COMPUTER = Symbol('computer');

export default class App {
  constructor(root){
    this.status = READY;
    this.rootElement = root;

    this.setup();
    this.resetState();
  }

  setup(){
    const fragment = document.createDocumentFragment();

    const onGestureSubmit = this.handleGestureSubmit.bind(this);
    this.appComponent = new AppComponent(fragment, { onGestureSubmit });

    this.rootElement.appendChild(fragment);
  }

  resetState(){
    this.appComponent.resetSelection();
  }

  handleGestureSubmit(gesture){
    this.makeGame(gesture);
  }

  makeGame(gesture){
    console.log(gesture);
    this.resetState();
  }
}
