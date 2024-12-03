function parse(path: string) {
  return Deno.readTextFileSync(path).split("\n");
}

function total(a: number, b: number) {
  return a + b;
}

if (import.meta.main) {
  const lines = parse("./input/input.txt");

  // part 1
  console.log(
    "Part 1: ",
    lines
      .map((line) =>
        Array.from(line.matchAll(/mul\(\d+,\d+\)/g))
          .map(([mulStr]) => Array.from(mulStr.matchAll(/\d+/g)).map((n) => +n))
          .map(([a, b]) => a * b)
          .reduce(total, 0)
      )
      .reduce(total, 0)
  );

  let enabled = true;
  console.log(
    "Part 2: ",
    lines
      .map((line) => {
        const instructions = Array.from(
          line.matchAll(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g)
        ).map(([instr]) => instr);
        const filteredInstructions = [];

        for (const instruction of instructions) {
          if (instruction === "do()") {
            enabled = true;
          } else if (instruction === "don't()") {
            enabled = false;
          } else {
            if (!enabled) continue;

            filteredInstructions.push(instruction);
          }
        }

        return filteredInstructions
          .map((mulStr) => Array.from(mulStr.matchAll(/\d+/g)).map((n) => +n))
          .map(([a, b]) => a * b)
          .reduce(total, 0);
      })
      .reduce(total, 0)
  );
}
