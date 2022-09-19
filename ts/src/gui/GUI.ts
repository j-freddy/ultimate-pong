class GUI {
  private static instance: GUI;
  private game: Game;

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

  refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw ball
    const ball = this.game.getBall();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill(); 
  }

  private startObservables() {
    console.log("Observables started.");
  }
}
