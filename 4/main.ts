type Grid = string[][];

function parse(path: string) {
  return Deno.readTextFileSync(path)
    .split("\n")
    .map((line) => line.split(""));
}

function copyGrid(grid: Grid) {
  return grid.slice().map((row) => row.slice());
}

function getSouthEastDiagonalLines(grid: Grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const diagonalLinesCount = cols + rows - 1;
  const lines = [];

  for (let i = 1; i <= diagonalLinesCount; i++) {
    let x: number = 0;
    let y: number = rows - i;

    if (i > rows) {
      // starting from top edge
      x = rows - (cols - (i - rows));
      y = 0;
    }

    let line = "";
    let currentCharacter: string;

    while ((currentCharacter = grid[y]?.[x])) {
      line += currentCharacter;
      y += 1;
      x += 1;
    }

    lines.push(line);
  }

  return lines;
}

function flipOnY(grid: Grid) {
  const flipped = copyGrid(grid);
  return flipped.map((line) => line.reverse());
}

function getDiagonalLines(grid: Grid) {
  const seLines = getSouthEastDiagonalLines(grid);
  const gridFlippedHoriz = flipOnY(grid);
  const swLines = getSouthEastDiagonalLines(gridFlippedHoriz);
  return [...seLines, ...swLines];
}

function getAllLines(grid: Grid) {
  const cols = grid[0].length;
  const horiz = grid.map((row) => row.join(""));
  const vert = Array(cols)
    .fill([])
    .map((_, x) => grid.map((_, y) => grid[y][x]).join(""));

  return [...horiz, ...vert, ...getDiagonalLines(grid)];
}

function countXmas(line: string) {
  return Array.from(line.matchAll(/XMAS/g)).length;
}

function countXmasForwardAndBack(line: string) {
  return countXmas(line) + countXmas(line.split("").reverse().join(""));
}

function total(a: number, b: number) {
  return a + b;
}

function part1(grid: Grid) {
  return getAllLines(grid).map(countXmasForwardAndBack).reduce(total, 0);
}

function part2(grid: Grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let found = 0;

  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      if (grid[y][x] !== "A") continue;
      if (
        /MS|SM/.test(grid[y - 1][x - 1] + grid[y + 1][x + 1]) &&
        /MS|SM/.test(grid[y - 1][x + 1] + grid[y + 1][x - 1])
      ) {
        found += 1;
      }
    }
  }

  return found;
}

if (import.meta.main) {
  const input = parse("./input/input.txt");

  console.log("Part 1: ", part1(input));
  console.log("Part 2: ", part2(input));
}
