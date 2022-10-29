export default class RetreatingTimer {
  constructor(ghost) {
    this.timeout = null;
    this.ghost = ghost;
    this.startTime = null;
    this.timeRemaining = null;
    this.isRunning = false;
  }

  start(dateNow = Date.now()) {
    this.startTime = dateNow;
    this.timeout = setTimeout(() => {
      this.ghost.changeRetreatingState();
      this.isRunning = false;
    }, 3000);
    this.timeRemaining = 3000;
    this.isRunning = true;
  }

  pause(dateNow = Date.now()) {
    clearTimeout(this.timeout);
    const timeElapsed = dateNow - this.startTime;
    this.timeRemaining = this.timeRemaining - timeElapsed;
    console.log(this.timeRemaining);
  }

  resume(dateNow = Date.now()) {
    this.startTime = dateNow;
    this.timeout = setTimeout(() => {
      this.ghost.changeRetreatingState();
      this.isRunning = false;
    }, this.timeRemaining);
    console.log(this.timeRemaining);
  }

  reset() {
    clearTimeout(this.timeout);
    this.isRunning = false;
  }
}
