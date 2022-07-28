import PowerUp from "./powerUp";

let powerUp;
let eatenPowerUp;

describe("PowerUp", () => {
  beforeEach(() => {
    powerUp = new PowerUp(
      {
        position: {
          x: 50,
          y: 100,
        },
      },
      20
    );
    eatenPowerUp = new PowerUp(
      {
        position: {
          x: 50,
          y: 100,
        },
      },
      20
    );
    eatenPowerUp.changeEatenState();
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(powerUp.position.x).toBe(50);
      expect(powerUp.position.y).toBe(100);
      expect(powerUp.radius).toBe(7);
      expect(powerUp.hasBeenEaten).toBe(false);
    });
  });

  describe("changeEatenState", () => {
    it("can change the power up to being eaten", () => {
      powerUp.changeEatenState();
      expect(powerUp.hasBeenEaten).toBe(true);
    });

    it("can change the power up to uneaten", () => {
      eatenPowerUp.changeEatenState();
      expect(eatenPowerUp.hasBeenEaten).toBe(false);
    });
  });

  describe("draw", () => {
    it("calls the necessary functions on ctx to draw the power up", () => {
      const mockCtx = {
        beginPath: () => undefined,
        arc: () => undefined,
        fillStyle: "",
        fill: () => undefined,
        closePath: () => undefined,
      };
      const beginPathSpy = jest.spyOn(mockCtx, "beginPath");
      const arcSpy = jest.spyOn(mockCtx, "arc");
      const fillSpy = jest.spyOn(mockCtx, "fill");
      const closePathSpy = jest.spyOn(mockCtx, "closePath");
      powerUp.draw(mockCtx);
      expect(beginPathSpy).toHaveBeenCalledTimes(1);
      expect(arcSpy).toHaveBeenCalledTimes(1);
      expect(fillSpy).toHaveBeenCalledTimes(1);
      expect(closePathSpy).toHaveBeenCalledTimes(1);
      expect(mockCtx.fillStyle).toBe("white");
    });
  });
});
