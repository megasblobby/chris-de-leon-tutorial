"use strict";

function register(subject, observer) {
  if (this.subjects[subject] !== undefined) {
    this.subjects[subject].observers.push(observer);
  }
  else {
    this.subjects[subject] = {observers : new Array()};
    this.subjects[subject].observers.push(observer);
  }
}

function notify(subject, object = null) {
  let observers = this.subjects[subject].observers;
  for (var i = 0; i < observers.length; i++) {
    observers[i].onNotify(subject, object);
  }
}

function Observable () {
  this.subjects = {};

  this.register = register.bind(this);
  this.notify = notify.bind(this);
}
