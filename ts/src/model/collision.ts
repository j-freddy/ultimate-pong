class Collision {
  static circleCircle(circle: Circle, other: Circle): boolean {
    return circle.pos.dist(other.pos) < circle.r + other.r;
  }

  static circleRectangle(circle: Circle, rect: Rectangle): boolean {
    let testPoint = new Point(circle.x, circle.y);

    const paddleLeft = rect.x - rect.width/2;
    const paddleRight = rect.x + rect.width/2;
    const paddleTop = rect.y - rect.height/2;
    const paddleBottom = rect.y + rect.height/2;

    if (circle.x < paddleLeft)   testPoint.setX(paddleLeft);
    if (circle.x > paddleRight)  testPoint.setX(paddleRight);
    if (circle.y < paddleTop)    testPoint.setY(paddleTop);
    if (circle.y > paddleBottom) testPoint.setY(paddleBottom);

    return testPoint.dist(circle.pos) < circle.r;
  }
}
