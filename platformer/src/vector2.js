"use strict";

function Vector2 (x = 0, y = 0) {
  this.x = x;
  this.y = y;
};

Vector2.prototype.clone = function () {
  return new Vector2(this.x, this.y);
};

Vector2.prototype.negate = function () {
  this.x *= -1;
  this.y *= -1;
};

Vector2.prototype.lengthSquared = function () {
  return Math.pow(this.x, 2) + Math.pow(this.y, 2);
};

Vector2.prototype.length = function () {
  return Math.sqrt(this.lengthSquared());
};

Vector2.prototype.normalize = function () {
  let length = this.length();
  this.x /= length, this.y /= length;
};

Vector2.prototype.normalized = function() {
  let length = this.length();
  return new Vector2(this.x / length, this.y / length);
};

Vector2.prototype.add = function(vector2) {
  return new Vector2(this.x + vector2.x, this.y + vector2.y);
};

Vector2.prototype.subtract = function(vector2) {
  return new Vector2(this.x - vector2.x, this.y - vector2.y);
};

Vector2.prototype.increment = function(vector2) {
  this.x += vector2.x;
  this.y += vector2.y;
};

Vector2.prototype.decrement = function(vector2) {
  this.x -= vector2.x;
  this.y -= vector2.y;
};

Vector2.prototype.scale = function(scalar) {
  this.x *= scalar;
  this.y *= scalar;
};

Vector2.prototype.dot = function(vector2) {
  return this.x * vector2.x + this.y + vector2.y;
};

Vector2.prototype.toString = function() {
  console.log("[x: " + this.x + ", y: " + this.y + "]");
  console.log("length: " + this.length());
};

Vector2.distance = function(vectorA, vectorB) {
  return vectorA.subtract(vectorB).length();
}
