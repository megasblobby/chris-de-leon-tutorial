"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;

class Engine {
  constructor() {
    this.time = new Date().getTime();
    this.oldTime = this.time;
    this.deltaTime = 0;

    //this.inputManager =  new InputManager();
  }

  /*init : function() {
    this.time = new Date().getTime();
  	this.oldTime = this.time;
    this.inputManager = new InputManager();
  },*/

  update (deltaTime) {}

  render (deltaTime) {}

  _computeDeltaTime () {
    this.time = new Date().getTime();
  	this.deltaTime = (this.time - this.oldTime) * MILLISECONDS_TO_SECONDS;
  	this.oldTime = this.time;
  }

  loop () {
    this._computeDeltaTime();

    this.update(this.deltaTime);
    this.render(this.deltaTime);

    requestAnimationFrame(this.loop.bind(this));
  }

  onNotify (subject, object) {}
}
