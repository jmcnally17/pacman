import Boundary from "../../models/boundary";

export default function makeTunnelBoundaries(boundaries) {
  const tunnelBoundaryOne = new Boundary({
    position: {
      x: -20,
      y: 260,
    },
  });
  const tunnelBoundaryTwo = new Boundary({
    position: {
      x: -10,
      y: 300,
    },
  });
  const tunnelBoundaryThree = new Boundary({
    position: {
      x: 560,
      y: 260,
    },
  });
  const tunnelBoundaryFour = new Boundary({
    position: {
      x: 560,
      y: 300,
    },
  });
  boundaries.push(
    tunnelBoundaryOne,
    tunnelBoundaryTwo,
    tunnelBoundaryThree,
    tunnelBoundaryFour
  );
}
