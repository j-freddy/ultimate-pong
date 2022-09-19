class Game {
  private ball: Ball;

  constructor() {
    this.ball = new Ball();
  }

  getBall(): Ball {
    return this.ball;
  }

  update(): void {
    const outOfBounds = this.ball.update();

    if (outOfBounds) {
      this.ball = new Ball();
    }
  }
}
