/*
  North -> 0
  East -> Math.PI / 2
  South -> Math.PI
  West -> Math.PI * 3/2
*/
type direction = number;
type Surface = Paddle | null;
type threadId = number;

enum MovePaddle {
  Still = "Still",
  Left = "Left",
  Right = "Right",
}

enum PointStatus {
  Before = "Before",
  Playing = "Playing",
  After = "After",
}

// TODO Add GUIEvent for animateBallBefore, etc.
enum EffectEvent {
  FastBall = "effectFastBall",
  BigPaddle = "effectBigPaddle",
  SmallPaddle = "effectSmallPaddle",
  BlinkingBall = "effectBlinkingBall",
}

enum GameEvent {
  BallBefore = "ballBefore",
  BallAfter = "ballAfter",
  BallPaddleCollision = "ballPaddleCollision",
}

enum Player {
  Top = "topPlayer",
  Bottom = "bottomPlayer",
}

type ModelEvent = EffectEvent | GameEvent;

interface Circle {
  x: number,
  y: number,
  r: number,
  pos: Point,
}

interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  pos: Point,
}

function mod(n: number, d: number): number {
  return ((n % d) + d) % d;
}

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
  return Math.floor(randomNumber(min, max + 1));
}
