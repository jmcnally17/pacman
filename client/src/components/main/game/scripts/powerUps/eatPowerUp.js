import scareGhost from "./scareGhost";

export default function eatPowerUp(powerUp, pacman, score, ghosts) {
  if (
    powerUp.position.x === pacman.position.x &&
    powerUp.position.y === pacman.position.y &&
    !powerUp.hasBeenEaten
  ) {
    powerUp.changeEatenState();
    score.points += 50;
    ghosts.forEach((ghost) => {
      if (!ghost.isScared) scareGhost(ghost);
    });
  }
}
