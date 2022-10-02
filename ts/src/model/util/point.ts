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

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  moveX(deltaX: number): void {
    this.x += deltaX;
  }

  moveY(deltaY: number): void {
    this.y += deltaY;
  }

  move(speed: number, direction: direction): void {
    this.x += speed * Math.sin(direction);
    this.y -= speed * Math.cos(direction);
  }

  dist(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}
