class Game {
  private readonly eventHandler: EventTarget;

  readonly topPaddle: Paddle;
  readonly bottomPaddle: Paddle;
  private ball!: Ball;
  private effectBlocks!: EffectBlock[];
  private pointStatus!: PointStatus;

  constructor(eventHandler: EventTarget) {
    this.eventHandler = eventHandler;
    this.startEventListeners();
    this.topPaddle = new Paddle(canvas.width / 2, 32);
    this.bottomPaddle = new Paddle(canvas.width / 2, canvas.height - 32);
    this.prepareNewPoint();
  }

  getBall(): Ball {
    return this.ball;
  }

  getEffectBlocks(): EffectBlock[] {
    return this.effectBlocks;
  }

  private prepareNewPoint(): void {
    this.ball = new Ball(canvas.width / 2, canvas.height / 2);
    this.effectBlocks = [];
    this.pointStatus = PointStatus.Before;
    this.eventHandler.dispatchEvent(new Event("ballBefore"));
  }

  private addNewEffectBlock(): void {
    const block = new EffectBlock(Effect.FastBall, randomNumber(0, canvas.width), canvas.height / 2)
    this.effectBlocks.push(block);
  }

  update(moveTopPaddle: MovePaddle, moveBottomPaddle: MovePaddle): void {
    this.topPaddle.update(moveTopPaddle);
    this.bottomPaddle.update(moveBottomPaddle);

    switch (this.pointStatus) {
      case PointStatus.Playing:
        const outOfBounds = this.ball.update(
          this.topPaddle, this.bottomPaddle, this.eventHandler
        );
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
    const handler = this.eventHandler;

    // TODO Refactor to use enums
    handler.addEventListener("ballBefore", _ => {
      handler.dispatchEvent(new Event("animateBallBefore"));
      setTimeout(() => this.pointStatus = PointStatus.Playing, 1000);
    });

    handler.addEventListener("ballPaddleCollision", _ => {
      this.addNewEffectBlock();
    });

    handler.addEventListener("effectFastBall", _ => {
      this.ball.setFastSpeed();
      setTimeout(() => this.ball.setNormalSpeed(), 5000);
    });
  }
}
