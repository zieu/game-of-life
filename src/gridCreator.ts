import { SIZE_MAX, SIZE_MIN } from "./constants";

const gridGenerator = (size: number) => {
  const grid = [];
  for (let x = 0; x < size; x++) {
    const row = [];
    for (let y = 0; y < size; y++) {
      const cell = {
        id: `${x}/${y}`,
        x,
        y,
        alive: false,
      };
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
};

export const gridCreator = (size: number) => {
  if (size <= SIZE_MAX && size > SIZE_MIN) {
    return gridGenerator(size);
  } else if (size <= 5) {
    return gridGenerator(SIZE_MIN);
  } else {
    return gridGenerator(SIZE_MAX);
  }
};
