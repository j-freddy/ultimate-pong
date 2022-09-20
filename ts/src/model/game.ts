class Game {
  private readonly eventHandler: EventTarget;

  readonly topPaddle: Paddle;
  readonly bottomPaddle: Paddle;
  private ball!: Ball;
  private effectBlocks!: EffectBlock[];
  private pointStatus!: PointStatus;
  // Keeps track of the thread IDs of Timeout functions that reset effects
  // To reset the duration of an effect if ball hits an effect block while the
  // same effect is still in play
  private effectsResidue: Map<EffectEvent, number>;

  constructor(eventHandler: EventTarget) {
    this.eventHandler = eventHandler;
    this.startEventListeners();
    this.topPaddle = new Paddle(canvas.width / 2, 32);
    this.bottomPaddle = new Paddle(canvas.width / 2, canvas.height - 32);
    this.effectsResidue = new Map<EffectEvent, number>();
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
    this.eventHandler.dispatchEvent(new Event(GameEvent.BallBefore));
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
        // Update ball
        const outOfBounds = this.ball.update(
          this.topPaddle, this.bottomPaddle, this.eventHandler
        );

        // Check ball collide with effect blocks
        for (let i = this.effectBlocks.length - 1; i >= 0; i--) {
          if (Collision.circleCircle(this.ball, this.effectBlocks[i])) {
            const eventName = effectProperties
              .get(this.effectBlocks[i].effect)!.eventName;
            this.effectBlocks.splice(i, 1);
            this.eventHandler.dispatchEvent(new Event(eventName));
          }
        }
        
        // Check point ends
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
    handler.addEventListener(GameEvent.BallBefore, _ => {
      handler.dispatchEvent(new Event("animateBallBefore"));
      setTimeout(() => this.pointStatus = PointStatus.Playing, 1000);
    });

    handler.addEventListener(GameEvent.BallPaddleCollision, _ => {
      this.addNewEffectBlock();
    });

    handler.addEventListener(EffectEvent.EffectFastBall, _ => {
      this.ball.setFastSpeed();

      if (this.effectsResidue.has(EffectEvent.EffectFastBall)) {
        clearInterval(this.effectsResidue.get(EffectEvent.EffectFastBall));
      }
      const threadId = setTimeout(() => this.ball.setNormalSpeed(), 5000);
      this.effectsResidue.set(EffectEvent.EffectFastBall, threadId);
    });
  }
}
