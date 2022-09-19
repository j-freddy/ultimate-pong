const canvas = <HTMLCanvasElement> document.getElementById("main-canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

const GAME = new Game();

function tick() {
  GAME.update();
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
