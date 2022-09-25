const canvas = <HTMLCanvasElement> document.getElementById("main-canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

const GUIData = getGUIData();

let gameStarted = false;
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

  console.log("Hello world!");
  console.log(`Bugs:\n${bugs}`);

  GUI.getInstance(GAME).refresh(true);

  window.addEventListener("keydown", e => {
    if (gameStarted) {
      return;
    }    

    if (e.key === " ") {
      gameStarted = true;
      canvas.dispatchEvent(new Event(GameEvent.BallBefore));
      loop();
    }
  });
}

window.addEventListener("load", main);
