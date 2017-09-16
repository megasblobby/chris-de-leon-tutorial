"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;

class Engine {
  constructor(width = 800, height = 600) {
    this.WIDTH = width;
    this.HEIGHT = height;

    this.time = new Date().getTime();
    this.oldTime = this.time;
    this.deltaTime = 0;

    this._initCanvas();


    this.inputManager = new InputManager(this.canvas);
    this._setCallbacks(this.canvas, this.inputManager)
  }

  _initCanvas() {
    let canvas = document.createElement("canvas");
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext("2d");
  }

  _setCallbacks(canvas, inputManager) {
    canvas.addEventListener("mousemove", inputManager.getMousePosition);
    canvas.addEventListener("mousedown", inputManager.onMouseDown);
    canvas.addEventListener("mouseup", inputManager.onMouseUp);

    addEventListener("keydown", inputManager.keyPressed);
    addEventListener("keyup", inputManager.keyReleased);
  }

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
