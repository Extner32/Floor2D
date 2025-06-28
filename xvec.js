class vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Add another vector
  add(v) {
    return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  // Subtract another vector
  subtract(v) {
    return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  // Multiply by a scalar
  scale(s) {
    return new vec3(this.x * s, this.y * s, this.z * s);
  }

  // Dot product
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  // Cross product
  cross(v) {
    return new vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }

  // Length (magnitude)
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  // Normalize to unit vector
  normalized() {
    const len = this.length();
    return len > 0 ? this.scale(1 / len) : new vec3(0, 0, 0);
  }

  // Convert to string for logging
  toString() {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
  }

  toRGB() {
    const r = Math.round(this.x * 255);
    const g = Math.round(this.y * 255);
    const b = Math.round(this.z * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

class vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // Add another vector
  add(v) {
    return new vec2(this.x + v.x, this.y + v.y);
  }

  // Subtract another vector
  subtract(v) {
    return new vec2(this.x - v.x, this.y - v.y);
  }

  // Multiply by a scalar
  scale(s) {
    return new vec2(this.x * s, this.y * s);
  }

  // Dot product
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  // Length (magnitude)
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  // Normalize to unit vector
  normalized() {
    const len = this.length();
    return len > 0 ? this.scale(1 / len) : new vec2(0, 0);
  }

  // Convert to string for logging
  toString() {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
}
