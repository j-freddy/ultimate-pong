# Ultimate Pong

Play the game [here][1]!

# Instructions

- Bottom paddle: Arrow keys
- Top paddle: a & d keys

First to 5 points wins. Good luck!

### Playing against AI

- 1 player: Control bottom paddle against AI

Play against the AI via `Config > 1 Player > New Game`. Good luck!

### Advanced details

You do not need to read this to play the game. It describes advanced mechanics
if you're interested.

- Ball moves faster (linearly) as the point goes on.
- Each powerup lasts for 5 seconds. Powerups do not stack. Upon collecting a
  powerup that is already in effects, the duration resets (i.e. lasts for 5
  seconds).
- Ball bounce mechanics is analogous to light reflection. If the paddle is
  moving at the point of contact, it adds spin to the ball (i.e. offsets angle
  slightly).
- Maximum ball angle with respect to the x-axis is PI * 0.12. This prevents
  paddles from spinning the ball such that it ends up travelling parallel to the
  paddle.
- Moving right takes priority over moving left. If you press both right and left
  keys, the paddle moves right.

## Development

### Build

This project is written in TypeScript.
```sh
npm install
npm run build
```

[1]: https://ultimate-pong.jtflabs.dev/
