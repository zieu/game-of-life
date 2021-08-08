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
  // return nbs.filter((c) => c.x >= 0 && c.y >= 0);
  return nbs;
};

function Game() {
  const SIZE = 10;
  const [grid, setGrid] = useState(gridCreator(SIZE));
  const [size, setSize] = useState<string | number>(SIZE);
  // const [start, setStart] = useState(false);

  const toggleLive = (id: string, x: number, y: number) => {
    const currentCell = grid[x][y];
    const modifiedCell = { ...currentCell, alive: !currentCell.alive };
    const newGrid = grid.map((row) =>
      row.map((cell) => {
        if (cell.id === id) {
          return modifiedCell;
        } else {
          return cell;
        }
      })
    );
    setGrid(newGrid);
  };

  useEffect(() => {
    setGrid(gridCreator(parseInt(size as string)));
  }, [size]);
  console.log("iteration1111");

  // useEffect(() => {
  //   if (start) setInterval(() => iterator(), 1000);
  // });

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
          // console.log(cell.id, "is alive and live nbs are < 2: makes false");
          return { ...cell, alive: false };
        } else if (cell.alive && (aliveNbs === 2 || aliveNbs === 3)) {
          // console.log(cell, "is alive and live nbs are 2 || 3): stays true");
          return { ...cell, alive: true };
        } else if (cell.alive && aliveNbs > 3) {
          // console.log(cell.alive, "is alive and alive nbs > 3: makes false");
          return { ...cell, alive: false };
        } else if (!cell.alive && aliveNbs === 3) {
          // console.log(cell, "is dead and live nbs are 3: makes true");
          return { ...cell, alive: true };
        } else {
          // console.log(cell.alive, "is unchanged");
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
          {grid.map((row, x) => {
            return (
              <ul className="row" key={x}>
                {grid[x].map((cell, y) => (
                  <li
                    className={cell.alive ? "cell cell--alive" : "cell"}
                    key={y}
                    onClick={() => toggleLive(cell.id, x, y)}
                  >
                    {cell.id}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>
      <footer>
        <input
          className="size-input"
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          type="range"
          onChange={(e) => setSize(e.target.value)}
          value={size}
          max={21}
          min={4}
        />
        <button className="start-button" onClick={() => iterator()}>
          Start
        </button>
      </footer>
    </div>
  );
}

export default Game;
