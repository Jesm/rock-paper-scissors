import AppComponent, { STATUS_CHANGE, AUTOPLAY_STATUS_CHANGE } from './components/App.js';
import { randomGesture } from './gestures';
import { make } from './games';
import AutoplayService from './AutoplayService.js';

export const PLAYER = Symbol('player');
export const COMPUTER = Symbol('computer');

export const READY = Symbol('ready');
export const GESTURE_SELECTED = Symbol('gesture_selected');
export const GESTURE_CONFIRMED = Symbol('gesture_confirmed');
export const GAME_GENERATED = Symbol('game_generated');

export default class App {
  constructor(params = {}){
    this.params = Object.assign({
      pauseDuration: 2000,
      viewRoot: null
    }, params);

    this.status = null;
    this.selectedGesture = null;

    this.autoplayEnabled = false;
    this.autoplayService = new AutoplayService(this, this.params.pauseDuration / 2);

    if(this.params.viewRoot)
      this.setupView(this.params.viewRoot);

    this.start();
  }

  setupView(root){
    const fragment = document.createDocumentFragment();

    this.appComponent = new AppComponent(fragment, {
      onGestureSelection: gesture => this.setSelectedGesture(gesture),
      onGestureConfirmation: () => this.confirmGesture(),
      onAutoplayToggle: () => this.toggleAutoplay()
    });

    root.appendChild(fragment);
  }

  setStatus(status, params = {}){
    this.status = status;

    // use setTimeout with 0 delay to make callback execute only when the execution queue is free
    setTimeout(() => {
      if(this.appComponent)
        this.appComponent.update(STATUS_CHANGE, Object.assign({ type: status }, params));

      if(this.autoplayEnabled)
        this.autoplayService.statusChange(status);
    }, 0);
  }

  getStatus(){
    return this.status;
  }

  autoplayIsEnabled(){
    return this.autoplayEnabled;
  }

  start(){
    this.setStatus(READY);
    this.selectedGesture = null;
  }

  setSelectedGesture(gesture){
    if(![READY, GESTURE_SELECTED].includes(this.status))
      return;

    this.selectedGesture = gesture;
    this.setStatus(GESTURE_SELECTED, { gesture });
  }

  confirmGesture(){
    if(this.status != GESTURE_SELECTED)
      return;

    const computerGesture = randomGesture();
    this.setStatus(GESTURE_CONFIRMED, { computerGesture });

    setTimeout(() => this.makeGame(computerGesture), this.params.pauseDuration);
  }

  makeGame(computerGesture){
    if(this.status != GESTURE_CONFIRMED)
      return;

    const game = make(
      { player: PLAYER, gesture: this.selectedGesture },
      { player: COMPUTER, gesture: computerGesture }
    );

    this.setStatus(GAME_GENERATED, { game });
    setTimeout(() => this.start(), this.params.pauseDuration);
  }

  toggleAutoplay(){
    this.autoplayEnabled = !this.autoplayEnabled;

    if(this.autoplayEnabled)
      this.autoplayService.statusChange(this.status);
    else
      this.autoplayService.cancelAction();

    if(this.appComponent)
      this.appComponent.update(AUTOPLAY_STATUS_CHANGE, { status: this.autoplayEnabled });
  }
}
