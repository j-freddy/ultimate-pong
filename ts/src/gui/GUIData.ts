function getGUIData() {
  const NUM_ROWS = 30;
  const u = Math.min(canvas.width, canvas.height) / NUM_ROWS;

  return {
    scaleFactor: u / 16,
    ball: {
      radius: u / 2,
      colour: "#1c7ed6",
      arrowWidth: u * 3,
    },
    paddle: {
      width: u * 7,
      height: u,
      bigWidth: u * 10,
      colour: "#212529",
    },
    effectBlock: {
      radius: u,
    }
  };
}
