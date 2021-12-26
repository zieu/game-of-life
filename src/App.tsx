// topLeft      ==========  x - 1, y - 1 ///////// 0,0
// topCenter    ==========  x - 1, y - 0 ///////// 0,1
// topRight     ==========  x - 1. y + 1 ///////// 0,2
// leftCenter   ==========  x - 0, y - 1 ///////// 1,0
// rightCenter  ==========  x - 0, y + 1 ///////// 1,2
// bottomLeft   ==========  x + 1, y - 1 ///////// 2,0
// bottomCenter ==========  x + 1, y - 0 ///////// 2,1
// bottomRight  ==========  x + 1, y + 1 ///////// 2,2

import { useEffect, useState } from "react";
import { gridCreator } from "./gridCreator";
import { useInterval } from "./useInterval";
import { useControls } from "leva";
import {
  SIZE,
  SIZE_MAX,
  SIZE_MIN,
  SPEED,
  SPEED_MAX,
  SPEED_MIN,
} from "./constants";

const getNeighbors = (x: number, y: number) => {
  const nbs = [
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y - 0 },
    { x: x - 1, y: y + 1 },
    { x: x - 0, y: y - 1 },
    { x: x - 0, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y - 0 },
    { x: x + 1, y: y + 1 },
  ];
  return nbs;
};

function Game() {
  const [grid, setGrid] = useState(gridCreator(SIZE));
  const [isDrawing, setIsDrawing] = useState<boolean>(Boolean);
  const { speed, size, animation } = useControls({
    speed: {
      value: SPEED,
      min: SPEED_MIN,
      max: SPEED_MAX,
      label: "Speed (ms)",
    },
    size: {
      value: SIZE,
      min: SIZE_MIN,
      max: SIZE_MAX,
      label: "Grid size",
      step: 1,
    },
    // start: button(() => setStart(true)),
    // stop: button(() => setStart(false)),
    animation: { value: false, label: "Run animation" },
  });

  useEffect(() => {
    setGrid(gridCreator(size));
  }, [size]);

  useInterval(() => {
    if (animation) iterator();
  }, speed);

  const iterator = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => {
        const nbs = getNeighbors(cell.x, cell.y);
        let aliveNbs = 0;
        for (let i = 0; i < nbs.length; i++) {
          const x = nbs[i].x;
          const y = nbs[i].y;
          if (grid[x] && grid[x][y] && grid[x][y]?.alive) aliveNbs++;
        }
        if (cell.alive && aliveNbs < 2) {
          return { ...cell, alive: false };
        } else if (cell.alive && (aliveNbs === 2 || aliveNbs === 3)) {
          return { ...cell, alive: true };
        } else if (cell.alive && aliveNbs > 3) {
          return { ...cell, alive: false };
        } else if (!cell.alive && aliveNbs === 3) {
          return { ...cell, alive: true };
        } else {
          return cell;
        }
      })
    );

    setGrid(newGrid);
  };

  return (
    <div className="game">
      <div className="canvas">
        <div className="grid">
          {grid.map((_, x) => {
            return (
              <ul className="row" key={x}>
                {grid[x].map((cell, y) => (
                  <li
                    className="cell"
                    style={{
                      background: cell.alive ? "#007bff" : "transparent",
                    }}
                    key={y}
                    onMouseDownCapture={() => (cell.alive = !cell.alive)}
                    onMouseOver={(e: any) => {
                      if (isDrawing) {
                        cell.alive = !cell.alive;
                        if (cell.alive) {
                          e.target.style.background = "#007bff";
                        } else {
                          e.target.style.background = "transparent";
                        }
                      }
                    }}
                    onMouseDown={() => setIsDrawing(true)}
                    onMouseUp={() => setIsDrawing(false)}
                  >
                    {/* {cell.id} */}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;
