class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  move(speed: number, direction: direction): void {
    this.x += speed * Math.sin(direction);
    this.y -= speed * Math.cos(direction);
  }
}
