class Game {
  private readonly eventHandler: EventTarget;

  readonly topPaddle: Paddle;
  readonly bottomPaddle: Paddle;
  private ball!: Ball;
  private pointStatus!: PointStatus;

  constructor(eventHandler: EventTarget) {
    this.eventHandler = eventHandler;
    this.startEventListeners();
    this.topPaddle = new Paddle(canvas.width / 2, 32);
    this.bottomPaddle = new Paddle(canvas.width / 2, canvas.height - 32);
    this.prepareNewPoint();

    // TODO Delete
    setTimeout(() => {
      this.eventHandler.dispatchEvent(new Event("effectFastBall"));
    }, 2000);
  }

  getBall(): Ball {
    return this.ball;
  }

  private prepareNewPoint(): void {
    this.ball = new Ball(canvas.width / 2, canvas.height / 2);
    this.pointStatus = PointStatus.Before;
    this.eventHandler.dispatchEvent(new Event("ballBefore"));
  }

  update(moveTopPaddle: MovePaddle, moveBottomPaddle: MovePaddle): void {
    this.topPaddle.update(moveTopPaddle);
    this.bottomPaddle.update(moveBottomPaddle);

    switch (this.pointStatus) {
      case PointStatus.Playing:
        const outOfBounds = this.ball.update(this.topPaddle, this.bottomPaddle);
        if (outOfBounds) {
          this.pointStatus = PointStatus.After;
        }
        break;
      case PointStatus.After:
        this.prepareNewPoint();
        break;
    }
  }

  private startEventListeners(): void {
    this.eventHandler.addEventListener("ballBefore", e => {
      this.eventHandler.dispatchEvent(new Event("animateBallBefore"));
      setTimeout(() => this.pointStatus = PointStatus.Playing, 1000);
    });

    this.eventHandler.addEventListener("effectFastBall", _ => {
      this.ball.setFastSpeed();
      setTimeout(() => this.ball.setNormalSpeed(), 5000);
    });
  }
}
