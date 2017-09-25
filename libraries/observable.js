"use strict";

function register(subject, observer) {
  if (this.subjects.has(subject) === false) {
    this.subjects.set(subject, new Array());
  }
  this.subjects.get(subject).push(observer);
}

function notify(subject, object = null) {
  let observers = this.subjects.get(subject);
  for (let observer of observers) {
    observer.onNotify(subject, object);
  }
}

class Observable {
  constructor() {
    this.subjects = new Map();

    this.register = register.bind(this);
    this.notify = notify.bind(this);
  }
}
