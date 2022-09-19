/*
  North -> 0
  East -> Math.PI / 2
  South -> Math.PI
  West -> Math.PI * 3/2
*/
type direction = number;

enum MovePaddle {
  Still = "Still",
  Left = "Left",
  Right = "Right",
}

function mod(n: number, d: number): number {
  return ((n % d) + d) % d;
}
