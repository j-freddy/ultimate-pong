class Ball implements Circle {
  readonly r = GUIData.ball.radius;
  private readonly angleLimit = Math.PI * 0.12;
  private readonly normalSpeed = 4 * GUIData.scaleFactor;
  private readonly fastSpeed = 6 * GUIData.scaleFactor;
  private speed: number;
  readonly pos: Point;
  private dir: direction;
  private lastCollision?: Surface;

  constructor(x: number, y: number) {
    this.pos = new Point(x, y);
    this.dir = randomNumber(Math.PI * 0.75, Math.PI * 1.25);
    this.speed = this.normalSpeed;
  }

  get x(): number {
    return this.pos.getX();
  }

  get y(): number {
    return this.pos.getY();
  }

  setNormalSpeed(): void {
    this.speed = this.normalSpeed;
  }

  setFastSpeed(): void {
    this.speed = this.fastSpeed;
  }

  private normaliseDirection(): void {
    this.dir = mod(this.dir, Math.PI * 2);
  }

  private constrainDirection(): boolean {
    this.normaliseDirection();

    const NEQuadrant: direction = Math.PI / 2 - this.angleLimit;
    if (this.dir > NEQuadrant && this.dir < Math.PI / 2) {
      this.dir = NEQuadrant;
      return true;
    }

    const SEQuadrant: direction = Math.PI / 2 + this.angleLimit;
    if (this.dir > Math.PI / 2 && this.dir < SEQuadrant) {
      this.dir = SEQuadrant;
      return true;
    }

    const SWQuadrant: direction = Math.PI * 3/2 - this.angleLimit;
    if (this.dir > SWQuadrant && this.dir < Math.PI * 3/2) {
      this.dir = SWQuadrant;
      return true;
    }

    const NWQuadrant: direction = Math.PI * 3/2 + this.angleLimit;
    if (this.dir > Math.PI * 3/2 && this.dir < NWQuadrant) {
      this.dir = NWQuadrant;
      return true;
    }

    return false;
  }

  update(
    topPaddle: Paddle,
    bottomPaddle: Paddle,
    eventHandler: EventTarget
  ): boolean {
    this.pos.move(this.speed, this.dir);

    // Bounce left and right edge
    if (this.x < this.r || this.x > canvas.width - this.r) {
      this.dir -= 2 * this.dir;
      this.normaliseDirection();
      // TODO Refactor when edges are replaced with walls
      this.lastCollision = null;
    }

    // Paddle collision
    // TODO Refactor
    if (
      Collision.circleRectangle(this, topPaddle) &&
      this.lastCollision !== topPaddle
    ) {
      const spinAngle = Math.PI * topPaddle.spinFactor * topPaddle.getVel();
      this.dir += -2 * this.dir + Math.PI - spinAngle;
      console.log(this.constrainDirection());

      this.lastCollision = topPaddle;
      eventHandler.dispatchEvent(new Event(GameEvent.BallPaddleCollision));
    } else if (
      Collision.circleRectangle(this, bottomPaddle) &&
      this.lastCollision !== bottomPaddle
    ) {
      const spinAngle
        = Math.PI * bottomPaddle.spinFactor * bottomPaddle.getVel();
      this.dir += -2 * this.dir + Math.PI + spinAngle;
      console.log(this.constrainDirection());

      this.lastCollision = bottomPaddle;
      eventHandler.dispatchEvent(new Event(GameEvent.BallPaddleCollision));
    }

    // Out of bounds
    return this.y < -this.r || this.y > canvas.height + this.r;
  }
}
