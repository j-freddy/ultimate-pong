class Ball implements Circle {
  private readonly baseRadius = GUIData.blockUnit / 2;
  private readonly angleLimit = Math.PI * 0.12;
  private readonly baseSpeed = 2.4 * GUIData.scaleFactor;
  private readonly speedIncreaseFactor = 0.0008 * GUIData.scaleFactor;
  readonly blinkDuration = 833;
  private readonly invisDuration = 250;
  private radius: number;
  private speed: number;
  readonly pos: Point;
  private dir: direction;
  private lastCollision?: Surface;
  private visible: boolean;

  constructor(x: number, y: number, toPlayer: Player) {
    this.radius = this.baseRadius;
    this.pos = new Point(x, y);
    // TODO Is it worth creating a direction class and normalising it whenever
    // the direction is set?
    this.dir = toPlayer === Player.Bottom ?
      randomNumber(Math.PI * 0.75, Math.PI * 1.25) :
      randomNumber(-Math.PI * 0.25, Math.PI * 0.25);
    this.normaliseDirection();
    this.speed = this.baseSpeed;
    this.visible = true;
  }

  get x(): number {
    return this.pos.getX();
  }

  get y(): number {
    return this.pos.getY();
  }

  get r(): number {
    return this.radius;
  }

  setNormalRadius(): void {
    this.radius = this.baseRadius;
  }

  setBigRadius(): void {
    this.radius = this.baseRadius * 3;
  }

  getDir(): direction {
    return this.dir;
  }

  getVisible(): boolean {
    return this.visible;
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

  blink() {
    this.visible = false;
    setTimeout(() => this.visible = true, this.invisDuration);
  }

  update(
    topPaddle: Paddle,
    bottomPaddle: Paddle,
    eventHandler: EventTarget
  ): Player | void {
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
      this.constrainDirection();

      this.lastCollision = topPaddle;
      eventHandler.dispatchEvent(new Event(GameEvent.BallPaddleCollision));
    } else if (
      Collision.circleRectangle(this, bottomPaddle) &&
      this.lastCollision !== bottomPaddle
    ) {
      const spinAngle
        = Math.PI * bottomPaddle.spinFactor * bottomPaddle.getVel();
      this.dir += -2 * this.dir + Math.PI + spinAngle;
      this.constrainDirection();
      this.lastCollision = bottomPaddle;
      eventHandler.dispatchEvent(new Event(GameEvent.BallPaddleCollision));
    }

    // Out of bounds
    if (this.y < -this.r)                return Player.Bottom;
    if (this.y > canvas.height + this.r) return Player.Top;

    // Increase speed
    this.speed += this.speedIncreaseFactor;
  }
}
