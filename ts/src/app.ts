const canvas = <HTMLCanvasElement> document.getElementById("main-canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

const GUIData = getGUIData();

const GAME = new Game(canvas);

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
  let bugs = "";
  bugs += "Spin can make angle overflow and ball pass through paddle\n";
  bugs += "Increasing paddle size can make paddle stuck on left/right edge\n";

  console.log("Hello world!");
  console.log(`Bugs:\n${bugs}`);

  GUI.getInstance(GAME).refresh();
  loop();
}

window.addEventListener("load", main);
