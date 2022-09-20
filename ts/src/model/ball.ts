class Ball {
  readonly r = 8;
  private readonly speed = 4;
  private readonly pos: Point;
  private dir: direction;

  constructor(x: number, y: number) {
    this.pos = new Point(x, y);
    this.dir = Math.PI * 1.2;
  }

  get x(): number {
    return this.pos.getX();
  }

  get y(): number {
    return this.pos.getY();
  }

  private collideWithPaddle(paddle: Paddle): boolean {
    let testPoint = new Point(this.x, this.y);

    const paddleLeft = paddle.x - paddle.width/2;
    const paddleRight = paddle.x + paddle.width/2;
    const paddleTop = paddle.y - paddle.height/2;
    const paddleBottom = paddle.y + paddle.height/2;

    if (this.x < paddleLeft)   testPoint.setX(paddleLeft);
    if (this.x > paddleRight)  testPoint.setX(paddleRight);
    if (this.y < paddleTop)    testPoint.setY(paddleTop);
    if (this.y > paddleBottom) testPoint.setY(paddleBottom);

    return testPoint.dist(this.pos) < this.r;
  }

  update(topPaddle: Paddle, bottomPaddle: Paddle): boolean {
    this.pos.move(this.speed, this.dir);

    // Bounce left and right edge
    if (this.x < this.r || this.x > canvas.width - this.r) {
      this.dir -= 2 * this.dir;
      this.dir = mod(this.dir, Math.PI * 2);
    }

    // Paddle collision
    if (
      this.collideWithPaddle(topPaddle) || this.collideWithPaddle(bottomPaddle)
    ) {
      // TODO Add spin depending on current paddle velocity
      // Paddle moving right -> Add angle
      // Padding moving left -> Subtract angle
      this.dir -= 2 * this.dir - Math.PI;
      this.dir = mod(this.dir, Math.PI * 2);
    }

    // Out of bounds
    return this.y < -this.r || this.y > canvas.height + this.r;
  }
}
