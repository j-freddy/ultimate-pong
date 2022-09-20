function getGUIData() {
  const NUM_ROWS = 30;
  const u = Math.min(canvas.width, canvas.height) / NUM_ROWS;

  return {
    scaleFactor: u / 16,
    ball: {
      radius: u / 2,
    },
    paddle: {
      width: u * 6,
      height: u,
      bigWidth: u * 10,
    },
    effectBlock: {
      radius: u,
    }
  };
}
