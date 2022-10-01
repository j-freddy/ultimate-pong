class Paddle implements Rectangle {
  readonly normalWidth = GUIData.blockUnit * 7;
  readonly normalMu = 0.88;
  readonly spinFactor = 0.012;

  private w;
  readonly height = GUIData.blockUnit;
  private readonly acc = GUIData.scaleFactor; 
  private mu = this.normalMu;
  readonly pos: Point;
  private vel: number;

  constructor(x: number, y: number) {
    this.w = this.normalWidth;
    this.pos = new Point(x, y);
    this.vel = 0;
  }

  get x(): number {
    return this.pos.getX();
  }

  get y(): number {
    return this.pos.getY();
  }

  get width(): number {
    return this.w;
  }

  getVel(): number {
    return this.vel;
  }

  setNormalWidth(): void {
    this.w = this.normalWidth;
  }

  setBigWidth(): void {
    this.w = this.normalWidth * 1.4;
  }

  setSmallWidth(): void {
    this.w = this.normalWidth * 0.7;
  }

  setNormalMu(): void {
    this.mu = this.normalMu;
  }

  setSlippery(): void {
    this.mu = this.normalMu + (1 - this.normalMu) * 2 / 3;
  }

  update(movePaddle: MovePaddle) {
    const prevX = this.x;

    this.pos.moveX(this.vel);

    if (movePaddle === MovePaddle.Left)  this.vel -= this.acc;
    if (movePaddle === MovePaddle.Right) this.vel += this.acc;

    this.vel *= this.mu;

    // Hit edge
    const leftEdge = this.w / 2;
    const rightEdge = canvas.width - this.w / 2;

    if (this.x < leftEdge || this.x > rightEdge) {
      this.vel = 0;
      this.pos.setX(prevX);

      if (this.x < leftEdge)  this.pos.setX( leftEdge + 0.1);
      if (this.x > rightEdge) this.pos.setX(rightEdge - 0.1);
    }
  }
}
