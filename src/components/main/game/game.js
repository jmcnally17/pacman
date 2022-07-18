import React, { useEffect } from "react";
import "./game.css";
import makeBoard from "./scripts/makeBoard";

export default function Game() {
  useEffect(() => {
    makeBoard();
  }, []);

  return (
    <div>
      <h1>Let&apos;s Play!</h1>
      <div className="table">
        <div className="gameInfo">
          <div className="score" id="score"></div>
          <div className="level" id="level"></div>
          <div className="lives" id="lives"></div>
        </div>
      </div>
      <canvas id="board" className="board" width="440" height="520"></canvas>
    </div>
  );
}
