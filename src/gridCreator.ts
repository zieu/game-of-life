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
  if (size <= 21 && size > 4) {
    return gridGenerator(size);
  } else if (size <= 5) {
    return gridGenerator(4);
  } else {
    return gridGenerator(21);
  }
};
