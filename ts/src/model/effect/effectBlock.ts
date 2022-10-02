class EffectBlock implements Circle {
  readonly r = GUIData.effectBlock.radius;
  readonly effect: Effect;
  readonly pos: Point;

  constructor(effect: Effect, x: number, y: number) {
    this.effect = effect;
    // Center
    this.pos = new Point(x, y);
  }

  get x(): number {
    return this.pos.getX();
  }

  get y(): number {
    return this.pos.getY();
  }
}
