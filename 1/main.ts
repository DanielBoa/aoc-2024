function asc(a: number, b: number): number {
  return a - b;
}

function total(a: number, b: number): number {
  return a + b;
}

function parseInput(path: string): [number[], number[]] {
  const parsed = Deno.readTextFileSync(path)
    .split("\n")
    .map((line) => line.split(/\s+/).map((n) => +n) as [number, number]);

  const col1 = parsed.map(([n]) => n);
  const col2 = parsed.map(([_, n]) => n);

  return [col1.sort(asc), col2.sort(asc)];
}

function findSimilarityScore(value: number, list: number[]): number {
  return value * list.filter((n) => n === value).length;
}

if (import.meta.main) {
  const [col1, col2] = parseInput("./input/input1.txt");

  // Part 1
  const pairs = col1.map((n, i) => [n, col2[i]]);
  const difference = pairs.map(([a, b]) => Math.abs(a - b));

  console.log("Part 1: ", difference.reduce(total, 0));

  // Part 2
  console.log(
    "Part 2: ",
    col1.map((n) => findSimilarityScore(n, col2)).reduce(total, 0)
  );
}
