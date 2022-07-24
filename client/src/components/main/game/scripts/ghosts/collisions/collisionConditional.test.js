import collisionConditional from "./collisionConditional";

describe("collisionConditional", () => {
  it("returns true for a ghost and Pac-Man collision", () => {
    const mockGhost = {
      position: {
        x: 200,
        y: 200,
      },
      radius: 10,
    };
    const mockPacman = {
      position: {
        x: 200,
        y: 200,
      },
      radius: 10,
    };
    expect(collisionConditional(mockGhost, mockPacman)).toBeTruthy();
  });

  it("returns false for a ghost and Pac-Man not colliding", () => {
    const mockGhost = {
      position: {
        x: 250,
        y: 300,
      },
      radius: 10,
    };
    const mockPacman = {
      position: {
        x: 300,
        y: 500,
      },
      radius: 10,
    };
    expect(collisionConditional(mockGhost, mockPacman)).toBeFalsy();
  });
});
