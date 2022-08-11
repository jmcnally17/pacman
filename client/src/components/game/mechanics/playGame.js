import makeBoundaries from "./boundaries/makeBoundaries";
import makePellets from "./pellets/makePellets";
import makePowerUps from "./powerUps/makePowerUps";
import makeGhosts from "./ghosts/makeGhosts";
import makePacman from "./pacman/makePacman";
import CycleTimer from "../models/cycleTimer";
import implementBoundaries from "./boundaries/implementBoundaries";
import implementPellets from "./pellets/implementPellets";
import implementPowerUps from "./powerUps/implementPowerUps";
import implementGhosts from "./ghosts/implementGhosts";
import implementPacman from "./pacman/implementPacman";
import displayScore from "./displayScore";
import displayLives from "./displayLives";
import displayLevel from "./displayLevel";

const length = 32;
const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2", "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "-", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "-", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", "o", "|", " ", " ", "|", ".", "|", " ", " ", " ", "|", ".", "|", "|", ".", "|", " ", " ", " ", "|", ".", "|", " ", " ", "|", "o", "|"],
  ["|", ".", "4", "-", "-", "3", ".", "4", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "3", ".", "4", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "2", ".", "1", "-", "-", "-", "-", "-", "-", "2", ".", "1", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "-", "3", ".", "|", "|", ".", "4", "-", "-", "2", "1", "-", "-", "3", ".", "|", "|", ".", "4", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "2", ".", "|", "4", "-", "-", "2", " ", "|", "|", " ", "1", "-", "-", "3", "|", ".", "1", "-", "-", "-", "-", "3"],
  [" ", " ", " ", " ", " ", "|", ".", "|", "1", "-", "-", "3", " ", "4", "3", " ", "4", "-", "-", "2", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "1", "-", "-", "-", "-", "-", "-", "2", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  ["-", "-", "-", "-", "-", "3", ".", "4", "3", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", "4", "3", ".", "4", "-", "-", "-", "-", "-"],
  [" ", " ", " ", " ", " ", " ", ".", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", ".", " ", " ", " ", " ", " ", " "],
  ["-", "-", "-", "-", "-", "2", ".", "1", "2", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", "1", "2", ".", "1", "-", "-", "-", "-", "-"],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "4", "-", "-", "-", "-", "-", "-", "3", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "1", "-", "-", "-", "-", "-", "-", "2", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  ["1", "-", "-", "-", "-", "3", ".", "4", "3", " ", "4", "-", "-", "2", "1", "-", "-", "3", " ", "4", "3", ".", "4", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "-", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "-", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "2", "|", ".", "4", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "3", ".", "|", "1", "-", "3", ".", "|"],
  ["|", "o", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", " ", " ", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", "o", "|"],
  ["4", "-", "2", ".", "|", "|", ".", "1", "2", ".", "1", "-", "-", "-", "-", "-", "-", "2", ".", "1", "2", ".", "|", "|", ".", "1", "-", "3"],
  ["1", "-", "3", ".", "4", "3", ".", "|", "|", ".", "4", "-", "-", "2", "1", "-", "-", "3", ".", "|", "|", ".", "4", "3", ".", "4", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "-", "-", "3", "4", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "3", "4", "-", "-", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "-", "-", "-", "-", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "-", "-", "-", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

const boundaries = makeBoundaries(map, length);
const pellets = makePellets(map, length);
const powerUps = makePowerUps(map, length);
const ghosts = makeGhosts(length);
const pacman = makePacman(length);
const cycleTimer = new CycleTimer();

const score = {
  points: 0,
};
const lastKeyPressed = {
  key: "",
};
const level = {
  number: 1,
};
const player = {
  name: "",
}
const reactRoot = {
  mainEl: null,
}
const killCount = {
  number: 0,
}

let start = true;

export default function playGame(name, mainEl) {
  if (start === true) {
    player.name = name;
    reactRoot.mainEl = mainEl;
    cycleTimer.start(ghosts);
    start = false;
  }
  let animationId = requestAnimationFrame(playGame);
  const board = document.querySelector("#board");
  const ctx = board.getContext("2d");
  ctx.clearRect(0, 0, 896, 992);

  implementBoundaries(boundaries, ctx, pacman);
  implementPellets(pellets, ctx, pacman, score, lastKeyPressed, ghosts, powerUps, level, cycleTimer);
  implementPowerUps(powerUps, ctx, pacman, score, killCount, ghosts);
  implementGhosts(ghosts, boundaries, ctx, length, pacman, score, animationId, lastKeyPressed, player.name, reactRoot.mainEl, pellets, powerUps, level, killCount, ghosts[0], cycleTimer);
  implementPacman(lastKeyPressed, pacman, boundaries, ctx, pellets, length);
  displayScore(score);
  displayLives(pacman);
  displayLevel(level);
};
