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

  refresh(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawPaddle(this.game.topPaddle);
    this.drawPaddle(this.game.bottomPaddle);
    this.drawBall(this.game.getBall());
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
