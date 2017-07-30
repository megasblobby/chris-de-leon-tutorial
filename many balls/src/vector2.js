function Vector2 (x = 0, y = 0) {
  this.x = x;
  this.y = y;

  this.magnitude = function() {
    return Math.pow(x, 2) + Math.pow(y, 2);
  }

  this.normalize = function() {
    let magnitude = this.magnitude();
    this.x /= magnitude, this.y /= magnitude;
  }

  this.normalized = function() {
    let magnitude = this.magnitude();
    return new Vector2(this.x / magnitude, this.y / magnitude);
  }
}
