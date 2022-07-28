import implementTunnel from "../implementTunnel";
import checkPacmanEating from "./checkPacmanEating";
import changeDirection from "./movement/changeDirection";
import makeMove from "./movement/makeMove";

export default function implementPacman(
  lastKeyPressed,
  pacman,
  boundaries,
  ctx,
  pellets,
  length,
  callbackOne = makeMove,
  callbackTwo = changeDirection,
  callbackThree = checkPacmanEating,
  callbackFour = implementTunnel
) {
  callbackOne(lastKeyPressed);
  callbackTwo(lastKeyPressed, pacman, boundaries);
  callbackThree(pellets, pacman);
  pacman.update(ctx);
  callbackFour(pacman, length);
}
