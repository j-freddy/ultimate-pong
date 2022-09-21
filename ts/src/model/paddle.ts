class Paddle implements Rectangle {
  readonly normalWidth = GUIData.paddle.width;
  readonly bigWidth = GUIData.paddle.bigWidth;
  readonly spinFactor = 0.012;

  // TODO Dangerous public property
  width;
  readonly height = GUIData.paddle.height;
  private readonly acc = GUIData.scaleFactor; 
  private readonly mu = 0.88;
  readonly pos: Point;
  private vel: number;

  constructor(x: number, y: number) {
    this.width = this.normalWidth;
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

  setNormalWidth(): void {
    this.width = this.normalWidth;
  }

  setBigWidth(): void {
    this.width = this.bigWidth;
  }

  update(movePaddle: MovePaddle) {
    const prevX = this.x;

    this.pos.moveX(this.vel);

    if (movePaddle === MovePaddle.Left)  this.vel -= this.acc;
    if (movePaddle === MovePaddle.Right) this.vel += this.acc;

    this.vel *= this.mu;

    // Hit edge
    const leftEdge = this.width / 2;
    const rightEdge = canvas.width - this.width / 2;

    if (this.x < leftEdge || this.x > rightEdge) {
      this.vel = 0;
      this.pos.setX(prevX);

      if (this.x < leftEdge)  this.pos.setX( leftEdge + 0.1);
      if (this.x > rightEdge) this.pos.setX(rightEdge - 0.1);
    }
  }
}
