function parse(path: string) {
  return Deno.readTextFileSync(path)
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x)));
}

function getDifferences(report: number[]) {
  return Array(report.length - 1)
    .fill(0)
    .map((_, i) => report[i + 1] - report[i]);
}

function getSign(n: number) {
  return n > 0 ? 1 : -1;
}

function isSafe(report: number[]) {
  const differences = getDifferences(report);
  if (new Set(differences.map(getSign)).size > 1) return false;
  if (differences.map(Math.abs).some((change) => !change || change > 3))
    return false;
  return true;
}

function isSafeWithSafetyDampener(report: number[]) {
  if (isSafe(report)) return true;

  for (let i = 0; i <= report.length - 1; i++) {
    const newReport = [...report];
    newReport.splice(i, 1);
    if (isSafe(newReport)) return true;
  }

  return false;
}

if (import.meta.main) {
  const reports = parse("./input/input1.txt");

  // part 1
  console.log("Part 1: ", reports.filter(isSafe).length);

  // part 2
  console.log("Part 2: ", reports.filter(isSafeWithSafetyDampener).length);
}
