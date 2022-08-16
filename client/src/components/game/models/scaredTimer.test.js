import ScaredTimer from "./scaredTimer";

jest.useFakeTimers();

let mockGhost;
let mockGhosts;
let scaredTimer;
let mockCycleTimer;

describe("ScaredTimer", () => {
  beforeEach(() => {
    mockGhost = {
      isScared: true,
      changeScaredState: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost, mockGhost, mockGhost];
    scaredTimer = new ScaredTimer(mockGhosts);
    mockCycleTimer = {
      resume: () => undefined,
    };
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(scaredTimer.timeout).toBeNull();
      expect(scaredTimer.ghosts).toEqual(mockGhosts);
      expect(scaredTimer.startTime).toBeNull();
      expect(scaredTimer.timeRemaining).toBeNull();
    });
  });

  describe("start", () => {
    it("sets this.timeout to a setTimeout of the ghosts changing scared state with a five second delay if they are scared", () => {
      const mockDateNow = 173620;
      jest.spyOn(global, "setTimeout");
      jest.spyOn(mockGhost, "changeScaredState");
      jest.spyOn(mockCycleTimer, "resume");
      scaredTimer.start(mockCycleTimer, mockDateNow);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
      expect(scaredTimer.timeout).not.toBeNull();
      expect(scaredTimer.startTime).toBe(mockDateNow);
      jest.runOnlyPendingTimers();
      expect(mockGhost.changeScaredState).toHaveBeenCalledTimes(4);
      expect(mockCycleTimer.resume).toHaveBeenCalledTimes(1);
    });
  });

  describe("pause", () => {
    it("calls clearTimeout and saves the time remaining in this.timeRemaining", () => {
      jest.spyOn(global, "clearTimeout");
      scaredTimer.startTime = 4860;
      const mockDateNow = 7180;
      scaredTimer.pause(mockDateNow);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(scaredTimer.timeout);
      expect(scaredTimer.timeRemaining).toBe(2680);
    });
  });

  describe("reset", () => {
    it("calls clearTimeout on this.timeout", () => {
      jest.spyOn(global, "clearTimeout");
      scaredTimer.reset();
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(scaredTimer.timeout);
    });
  });
});
