const canvas = <HTMLCanvasElement> document.getElementById("main-canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

const GAME = new Game();

function tick() {
  const keyDown = GUI.getInstance().keyDownMappings;

  let moveTopPaddle = MovePaddle.Still;
  if (keyDown.get("a")) moveTopPaddle = MovePaddle.Left;
  if (keyDown.get("d")) moveTopPaddle = MovePaddle.Right;

  let moveBottomPaddle = MovePaddle.Still;
  if (keyDown.get("ArrowLeft"))  moveBottomPaddle = MovePaddle.Left;
  if (keyDown.get("ArrowRight")) moveBottomPaddle = MovePaddle.Right;

  GAME.update(moveTopPaddle, moveBottomPaddle);
  GUI.getInstance().refresh();
}

function loop() {
  tick();
  requestAnimationFrame(loop);
}

function main() {
  console.log("Hello world!");
  GUI.getInstance(GAME).refresh();
  loop();
}

window.addEventListener("load", main);
