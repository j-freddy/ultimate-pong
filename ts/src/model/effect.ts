enum Effect {
  BigPaddle = "BigPaddle",
  SmallPaddle = "SmallPaddle",
  BigBall = "Bigball",
  BlinkingBall = "BlinkingBall",
  SlipperyPaddle = "SlipperyPaddle",
}

interface EffectProps {
  eventName: EffectEvent,
  blockImage: HTMLImageElement,
}

const effectProperties = new Map<Effect, EffectProps>([
  [
    Effect.BigPaddle,
    {
      eventName: EffectEvent.BigPaddle,
      blockImage: img.effectBigPaddle,
    }
  ],
  [
    Effect.SmallPaddle,
    {
      eventName: EffectEvent.SmallPaddle,
      blockImage: img.effectSmallPaddle,
    }
  ],
  [
    Effect.BigBall,
    {
      eventName: EffectEvent.BigBall,
      blockImage: img.effectBigBall,
    }
  ],
  [
    Effect.BlinkingBall,
    {
      eventName: EffectEvent.BlinkingBall,
      blockImage: img.effectBlinkingBall,
    }
  ],
  [
    Effect.SlipperyPaddle,
    {
      eventName: EffectEvent.SlipperyPaddle,
      blockImage: img.effectSlipperyPaddle,
    }
  ],
]);
