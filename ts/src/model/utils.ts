/*
  North -> 0
  East -> Math.PI / 2
  South -> Math.PI
  West -> Math.PI * 3/2
*/
type direction = number;

type Surface = Paddle | null;

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

function mod(n: number, d: number): number {
  return ((n % d) + d) % d;
}

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
