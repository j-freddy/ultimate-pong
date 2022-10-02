const canvas = <HTMLCanvasElement> document.getElementById("main-canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

// GUI data depends on canvas
// So initialise it after fetching canvas
const GUIData = getGUIData();
const GAME = new Game(canvas, true);

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

// Do not use requestAnimationFrame for projects involving moving objects
// As it syncs calls to your refresh rate
// Which depends per user
function startLoop() {
  // DO NOT change fps, it affects game speed (unfortunately)
  const fps = 120;
  setInterval(tick, 1000 / fps);
}

function main() {
  console.log("Hello world!");

  GUI.getInstance(GAME).refresh();

  window.addEventListener("keydown", e => {
    if (GAME.getStarted()) {
      return;
    }    

    if (e.key === " ") {
      GAME.setStarted();
      canvas.dispatchEvent(new Event(GameEvent.BallBefore));
      startLoop();
    }
  });
}

window.addEventListener("load", main);
