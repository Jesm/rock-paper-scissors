import { READY, GESTURE_SELECTED } from './App.js';
import { randomGesture } from './gestures';

export default class AutoplayService {
  constructor(app, pauseDuration){
    this.app = app;
    this.pauseDuration = pauseDuration;
    this.timeoutRef = null;
  }

  statusChange(status){
    this.cancelAction(); // If there is some action scheduled, cancel it

    switch(status){
      case READY:
        const gesture = randomGesture();
        this.timeoutRef = setTimeout(() => this.app.setSelectedGesture(gesture), this.pauseDuration);
      break;
      case GESTURE_SELECTED:
        this.timeoutRef = setTimeout(() => this.app.confirmGesture(), this.pauseDuration);
      break;
    }
  }

  cancelAction(){
    clearTimeout(this.timeoutRef);
  }
}
