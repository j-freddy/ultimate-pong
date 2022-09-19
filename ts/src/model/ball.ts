class Ball {
  readonly r = 8;
  private readonly speed = 2;
  private readonly pos: Point;
  private dir: direction;

  constructor() {
    this.pos = new Point(240, 240);
    this.dir = Math.PI * 0.6;
  }

  get x() {
    return this.pos.getX();
  }

  get y() {
    return this.pos.getY();
  }

  update(): boolean {
    this.pos.move(this.speed, this.dir);

    // Bounce left edge
    if (this.x < this.r) {
      this.dir += 2 * (Math.PI * 2 - this.dir);
      // Normalise direction
      this.dir = mod(this.dir, Math.PI * 2);
    }

    // Bounce right edge
    if (this.x > canvas.width - this.r) {
      this.dir -= 2 * this.dir;
      // Normalise direction
      this.dir = mod(this.dir, Math.PI * 2);
    }

    // Out of bounds
    return this.y < -this.r || this.y > canvas.height + this.r;
  }
}
