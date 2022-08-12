import implementGhosts from "./implementGhosts";

let mockGhostOne;
let mockGhostsOne;
let mockGhostTwo;
let mockGhostsTwo;
let mockObject;
let mockVariables;
let mockcheckSpeedMatchesState;
let mockImplementTunnel;
let mockUpdateCollisions;
let mockChooseMovement;
let mockCheckPacmanGhostCollision;

describe("implementGhosts", () => {
  beforeEach(() => {
    mockGhostOne = {
      update: () => undefined,
      prevCollisions: ["up", "down"],
    };
    mockGhostsOne = [mockGhostOne, mockGhostOne, mockGhostOne];
    mockGhostTwo = {
      update: () => undefined,
      prevCollisions: [],
    };
    mockGhostsTwo = [mockGhostTwo, mockGhostTwo];
    mockVariables = {};
    mockcheckSpeedMatchesState = jest.fn();
    mockImplementTunnel = jest.fn();
    mockUpdateCollisions = jest.fn();
    mockChooseMovement = jest.fn();
    mockCheckPacmanGhostCollision = jest.fn();
  });

  it("calls the necessary callback functions to implement the ghosts functionality", () => {
    jest.spyOn(mockGhostOne, "update");
    implementGhosts(
      mockGhostsOne,
      mockObject,
      mockObject,
      mockVariables,
      mockObject,
      mockObject,
      mockObject,
      mockObject,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockcheckSpeedMatchesState).toHaveBeenCalledTimes(3);
    expect(mockGhostOne.update).toHaveBeenCalledTimes(3);
    expect(mockImplementTunnel).toHaveBeenCalledTimes(3);
    expect(mockUpdateCollisions).toHaveBeenCalledTimes(3);
    expect(mockChooseMovement).toHaveBeenCalledTimes(3);
    expect(mockCheckPacmanGhostCollision).toHaveBeenCalledTimes(3);
  });

  it("does not call pickRandomDirection when the collisions array is equal to the prevCollisions array", () => {
    implementGhosts(
      mockGhostsTwo,
      mockObject,
      mockObject,
      mockVariables,
      mockObject,
      mockObject,
      mockObject,
      mockObject,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockChooseMovement).toHaveBeenCalledTimes(0);
  });
});
