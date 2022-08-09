import eatPowerUp from "./eatPowerUp";

export default function implementPowerUps(
  powerUps,
  ctx,
  pacman,
  score,
  killCount,
  ghosts,
  callback = eatPowerUp
) {
  powerUps.forEach((powerUp) => {
    if (!powerUp.hasBeenEaten) powerUp.update(ctx);
    callback(powerUp, pacman, score, killCount, ghosts);
  });
}
