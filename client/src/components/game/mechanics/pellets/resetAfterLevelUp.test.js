import resetAfterLevelUp from "./resetAfterLevelUp";

let mockPacman;
let mockVariables;
let mockGhost;
let mockGhosts;
let mockPellet;
let mockPellets;
let mockEatenPowerUp;
let mockEatenPowerUps;
let mockUneatenPowerUp;
let mockUneatenPowerUps;
let mockCycleTimer;

describe("resetAfterLevelUp", () => {
  beforeEach(() => {
    mockPacman = {
      reset: () => undefined,
    };
    mockVariables = {
      lastKeyPressed: "up",
    };
    mockGhost = {
      reset: () => undefined,
      resetHuntingState: () => undefined,
      resetRetreatingState: () => undefined,
    };
    mockPellet = {
      changeEatenState: () => undefined,
    };
    mockEatenPowerUp = {
      hasBeenEaten: true,
      changeEatenState: () => undefined,
    };
    mockUneatenPowerUp = {
      hasBeenEaten: false,
      changeEatenState: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost, mockGhost];
    mockPellets = [mockPellet, mockPellet];
    mockEatenPowerUps = [mockEatenPowerUp];
    mockUneatenPowerUps = [mockUneatenPowerUp];
    mockCycleTimer = {
      reset: () => undefined,
      start: () => undefined,
    };
  });

  it("calls all the necessary functions to reset the board", () => {
    jest.spyOn(mockPacman, "reset");
    jest.spyOn(mockGhost, "reset");
    jest.spyOn(mockGhost, "resetHuntingState");
    jest.spyOn(mockGhost, "resetRetreatingState");
    jest.spyOn(mockCycleTimer, "reset");
    jest.spyOn(mockCycleTimer, "start");
    jest.spyOn(mockPellet, "changeEatenState");
    jest.spyOn(mockEatenPowerUp, "changeEatenState");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer
    );
    expect(mockPacman.reset).toHaveBeenCalledTimes(1);
    expect(mockVariables.lastKeyPressed).toBe("");
    expect(mockCycleTimer.reset).toHaveBeenCalledTimes(1);
    expect(mockGhost.reset).toHaveBeenCalledTimes(3);
    expect(mockGhost.resetHuntingState).toHaveBeenCalledTimes(3);
    expect(mockGhost.resetRetreatingState).toHaveBeenCalledTimes(3);
    expect(mockCycleTimer.start).toHaveBeenCalledTimes(1);
    expect(mockPellet.changeEatenState).toHaveBeenCalledTimes(2);
    expect(mockEatenPowerUp.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("does not call changeEatenState on the power ups if they haven't been eaten", () => {
    jest.spyOn(mockUneatenPowerUp, "changeEatenState");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockUneatenPowerUps,
      mockCycleTimer
    );
    expect(mockUneatenPowerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });
});
