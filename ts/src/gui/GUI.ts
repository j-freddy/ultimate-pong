class GUI {
  private static instance: GUI;
  private game: Game;
  private keyDown = new Map<string, boolean>();

  private constructor(game: Game) {
    this.game = game;
    this.startObservables();
  }

  static getInstance(game?: Game): GUI {
    if (!GUI.instance) {
      if (game) {
        GUI.instance = new GUI(game);
      } else {
        throw new Error("Instance does not exist and game is unspecified.");
      }
    }

    return GUI.instance;
  }

  get keyDownMappings(): Map<string, boolean> {
    return this.keyDown;
  }

  drawPaddle(paddle: Paddle): void {
    ctx.fillRect(
      paddle.x - paddle.width / 2,
      paddle.y - paddle.height / 2,
      paddle.width,
      paddle.height
    );
  }

  drawBall(ball: Ball): void {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  drawEffectBlocks(): void {
    for (const effectBlock of this.game.getEffectBlocks()) {
      // TODO This is slow
      // Consider having a Map: Effect -> Image
      let image: HTMLImageElement;

      switch (effectBlock.effect) {
        case Effect.FastBall:
          image = img.effectFastBall;
          break;
        case Effect.BigPaddle:
          image = img.effectBigPaddle;
          break;
        case Effect.SmallPaddle:
          image = img.effectSmallPaddle;
          break;
        case Effect.BlinkingBall:
          image = img.effectBlinkingBall;
          break;
      }

      const d = effectBlock.r * 2;
      ctx.drawImage(image, effectBlock.x - d/2, effectBlock.y - d/2, d, d);
    }
  }

  drawBackground(): void {
    ctx.drawImage(img.background, 0, 0, canvas.width, canvas.height);
  }

  drawForeground(): void {
    ctx.drawImage(img.foreground, 0, 0, canvas.width, canvas.height);
  }

  refresh(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawBackground();
    this.drawPaddle(this.game.topPaddle);
    this.drawPaddle(this.game.bottomPaddle);
    this.drawEffectBlocks();
    this.drawBall(this.game.getBall());
    this.drawForeground();
  }

  private startObservables(): void {
    console.log("Observables started.");

    window.addEventListener("keydown", e => {
      this.keyDown.set(e.key, true);
    });

    window.addEventListener("keyup", e => {
      this.keyDown.set(e.key, false);
    });

    canvas.addEventListener("animateBallBefore", _ => {
      console.log("Event captured: animateBallBefore");
    });
  }
}
