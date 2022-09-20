class Paddle {
  readonly width = GUIData.paddle.width;
  readonly height = GUIData.paddle.height;
  private readonly acc = GUIData.scaleFactor; 
  private readonly mu = 0.9;
  private readonly pos: Point;
  private vel: number;

  constructor(x: number, y: number) {
    // Center
    this.pos = new Point(x, y);
    this.vel = 0;
  }

  get x(): number {
    return this.pos.getX();
  }

  get y(): number {
    return this.pos.getY();
  }

  getVel(): number {
    return this.vel;
  }

  update(movePaddle: MovePaddle) {
    const prevX = this.x;

    this.pos.moveX(this.vel);

    if (movePaddle === MovePaddle.Left)  this.vel -= this.acc;
    if (movePaddle === MovePaddle.Right) this.vel += this.acc;

    this.vel *= this.mu;

    // Hit edge
    if (this.x < this.width / 2 || this.x > canvas.width - this.width / 2) {
      this.vel = 0;
      this.pos.setX(prevX);
    }
  }
}
