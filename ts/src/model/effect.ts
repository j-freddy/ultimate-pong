enum Effect {
  FastBall = "FastBall",
  BigPaddle = "BigPaddle",
  SmallPaddle = "SmallPaddle",
  BlinkingBall = "BlinkingBall",
}

interface EffectProps {
  eventName: EffectEvent,
  // TODO Move this out of the model
  // blockImage: HTMLImageElement,
}

const effectProperties = new Map<Effect, EffectProps>([
  [
    Effect.FastBall,
    {
      eventName: EffectEvent.EffectFastBall,
    }
  ],
]);
