class Game {
  readonly topPaddle: Paddle;
  readonly bottomPaddle: Paddle;
  private ball: Ball;

  constructor() {
    this.ball = new Ball(canvas.width / 2, canvas.height / 2);
    this.topPaddle = new Paddle(canvas.width / 2, 32);
    this.bottomPaddle = new Paddle(canvas.width / 2, canvas.height - 32);
  }

  getBall(): Ball {
    return this.ball;
  }

  update(moveTopPaddle: MovePaddle, moveBottomPaddle: MovePaddle): void {
    this.topPaddle.update(moveTopPaddle);
    this.bottomPaddle.update(moveBottomPaddle);
    
    const outOfBounds = this.ball.update(this.topPaddle, this.bottomPaddle);

    if (outOfBounds) {
      this.ball = new Ball(canvas.width / 2, canvas.height / 2);
    }
  }
}
