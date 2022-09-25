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
  private rallyCount!: number;

  constructor(eventHandler: EventTarget) {
    this.eventHandler = eventHandler;
    this.startEventListeners();
    this.topPaddle = new Paddle(canvas.width / 2, 32);
    this.bottomPaddle = new Paddle(canvas.width / 2, canvas.height - 32);
    this.effectsResidue = new Map<EffectEvent, number>();
    this.init();
  }

  getBall(): Ball {
    return this.ball;
  }

  getEffectBlocks(): EffectBlock[] {
    return this.effectBlocks;
  }

  getPointStatus(): PointStatus {
    return this.pointStatus;
  }

  private init(): void {
    this.ball = new Ball(canvas.width / 2, canvas.height / 2);
    this.effectBlocks = [];
    this.rallyCount = 0;
    this.pointStatus = PointStatus.Before;
  }

  private prepareNewPoint(): void {
    this.init();
    this.eventHandler.dispatchEvent(new Event(GameEvent.BallBefore));
  }

  private addNewEffectBlock(): void {
    // TODO Indexing enums
    const effects = [Effect.FastBall, Effect.BigPaddle];
    const effect = effects[randomInt(0, effects.length - 1)];

    const block = new EffectBlock(
      effect,
      randomNumber(0, canvas.width),
      canvas.height / 2
    );
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
          this.eventHandler.dispatchEvent(new Event(GameEvent.BallAfter));
        }

        break;
      default:
        break;
    }
  }

  private startEventListeners(): void {
    const handler = this.eventHandler;

    handler.addEventListener(GameEvent.BallBefore, _ => {
      handler.dispatchEvent(new Event(GUIEvent.AnimateBallBefore));
      setTimeout(() => this.pointStatus = PointStatus.Playing, 1500);
    });

    handler.addEventListener(GameEvent.BallAfter, _ => {
      this.prepareNewPoint();
    });

    handler.addEventListener(GameEvent.BallPaddleCollision, _ => {
      this.rallyCount++;

      // Bit of a janky way to add effect blocks
      // Every 3rd hit from the 4th shot
      if (this.rallyCount % 3 === 1 && this.rallyCount >= 4) {
        this.addNewEffectBlock();
      }
    });

    handler.addEventListener(EffectEvent.FastBall, _ => {
      this.ball.setFastSpeed();

      this.clearResidue(EffectEvent.FastBall);
      const threadId = setTimeout(() => this.ball.setNormalSpeed(), 5000);
      this.effectsResidue.set(EffectEvent.FastBall, threadId);
    });

    handler.addEventListener(EffectEvent.BigPaddle, _ => {
      this.topPaddle.setBigWidth();
      this.bottomPaddle.setBigWidth();

      this.clearResidue(EffectEvent.BigPaddle);
      const threadId = setTimeout(() => {
        this.topPaddle.setNormalWidth();
        this.bottomPaddle.setNormalWidth();
      }, 5000);
      this.effectsResidue.set(EffectEvent.BigPaddle, threadId);
    });
  }

  private clearResidue(effectEvent: EffectEvent) {
    if (this.effectsResidue.has(effectEvent)) {
      clearInterval(this.effectsResidue.get(effectEvent));
    }
  }
}
