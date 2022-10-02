// AI Prototype 1

class AINaive implements AI {
  private readonly game: Game;
  private readonly paddle: Paddle;

  constructor(game: Game, paddle: Paddle) {
    this.game = game;
    this.paddle = paddle;
  }

  choosePaddleMovement(): MovePaddle {
    const ball = this.game.getBall();
    
    if (ball.x < this.paddle.x) return MovePaddle.Left;
    if (ball.x > this.paddle.x) return MovePaddle.Right;
    return MovePaddle.Still;
  }
}
