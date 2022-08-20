import ghostAttack from "./ghostAttack";

let mockNoLivesPacman;
let mockPacman;
let mockVariables;
let mockGhosts;
let mockPellets;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockGhostAudioObjects;
let mockCtx;
let mockBoundaries;
let mockRunDeathAnimation;
let mockEndGame;
let mockResetAfterDeath;

describe("ghostAttack", () => {
  beforeEach(() => {
    mockNoLivesPacman = {
      lives: 0,
    };
    mockPacman = {
      lives: 2,
    };
    mockVariables = {
      animationid: 275639,
    };
    mockGhosts = "ghosts";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockGhostAudioObjects = "mockGhostAudioObjects";
    mockCtx = "ctx";
    mockBoundaries = "boundaries";
    mockRunDeathAnimation = jest.fn();
    mockEndGame = jest.fn();
    mockResetAfterDeath = jest.fn();
  });

  it("calls cancelAnimationFrame to stop the game", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    ghostAttack(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockGhostAudioObjects,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(
      mockVariables.animationId
    );
  });

  it("calls runDeathAnimation", () => {
    ghostAttack(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockGhostAudioObjects,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockRunDeathAnimation).toHaveBeenCalledTimes(1);
    expect(mockRunDeathAnimation).toHaveBeenCalledWith(
      mockVariables,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockPacman
    );
  });

  it("calls endGame when Pac-Man has no lives left", () => {
    const mockPacman = {
      lives: 0,
    };
    ghostAttack(
      mockNoLivesPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockGhostAudioObjects,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockEndGame).toHaveBeenCalledTimes(1);
    expect(mockEndGame).toHaveBeenCalledWith(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockGhostAudioObjects
    );
  });

  it("decreases Pac-Man's lives by 1 when he has lives left", () => {
    ghostAttack(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockGhostAudioObjects,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockPacman.lives).toBe(1);
  });

  it("calls resetAfterDeath when Pac-Man has lives left", () => {
    ghostAttack(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockGhostAudioObjects,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockResetAfterDeath).toHaveBeenCalledTimes(1);
    expect(mockResetAfterDeath).toHaveBeenCalledWith(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer
    );
  });
});
