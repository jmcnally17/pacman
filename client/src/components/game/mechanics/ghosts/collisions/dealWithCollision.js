import runDeathAnimation from "./pacmanDeathAnimation/runDeathAnimation";

export default function dealWithCollision(
  ghost,
  pacman,
  variables,
  ghosts,
  pellets,
  powerUps,
  cycleTimer,
  scaredTimer,
  ghostAudioObjects,
  ctx,
  boundaries,
  callback = runDeathAnimation
) {
  if (!ghost.isScared && !ghost.isRetreating) {
    callback(
      variables,
      ctx,
      boundaries,
      pellets,
      powerUps,
      pacman,
      ghosts,
      cycleTimer,
      scaredTimer,
      ghostAudioObjects
    );
  } else if (ghost.isScared) {
    variables.score += 200 * Math.pow(2, variables.killCount);
    variables.killCount++;
    ghost.changeRetreatingState();
    ghost.retreatingTimer.start();
    ghost.changeScaredState();
  }
}
