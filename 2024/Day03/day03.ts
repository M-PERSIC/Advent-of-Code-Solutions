// SPDX-License-Identifier: MIT-0
// License-Filename: LICENSE

function part_one(input: string): number {
  const text = Deno.readTextFileSync(input);
  const rows: string[] = [];
  for (const line of text.split(/\n/)) {
    rows.push(line);
  }
  const globalPattern = /mul\((\d+),(\d+)\)/g;
  const extractPattern = /mul\((\d+),(\d+)\)/;
  let result = 0;
  for (const row of rows) {
    const matches = Array.from(
      row.matchAll(globalPattern),
      (match) => match[0],
    );
    matches.map((match) => {
      const parts = extractPattern.exec(match);
      if (parts) {
        const multiplier = parseInt(parts[1]);
        const multiplicand = parseInt(parts[2]);
        result += multiplier * multiplicand;
      }
    });
  }
  return result;
}

console.log(part_one("./Day03/input.txt"));

function part_two(input: string): number {
  let program: string = Deno.readTextFileSync(input);
  const doPattern = /do\(\)/g;
  const dontPattern = /don['']t\(\)/g;
  let result = 0;
  program = program.replaceAll(dontPattern, "飝");
  program = program.replaceAll(doPattern, "䗪");
  let isEnabled = true;
  let start = 0;
  const globalPattern = /mul\((\d+),(\d+)\)/g;
  const extractPattern = /mul\((\d+),(\d+)\)/;
  for (let index = 0; index < program.length; index++) {
    if (
      (program[index] == "飝" && isEnabled) ||
      (index == program.length - 1 && isEnabled)
    ) {
      const enabledInstructions = (index == program.length)
        ? program.slice(start, index)
        : program.slice(start, index + 1);
      const matches = Array.from(
        enabledInstructions.matchAll(globalPattern),
        (match) => match[0],
      );
      matches.map((match) => {
        const parts = extractPattern.exec(match);
        if (parts) {
          const multiplier = parseInt(parts[1]);
          const multiplicand = parseInt(parts[2]);
          result += multiplier * multiplicand;
        }
      });
      isEnabled = false;
      start = index + 1;
    } else if (program[index] == "䗪" && !isEnabled) {
      isEnabled = true;
      start = index + 1;
    }
  }
  return result;
}

console.log(part_two("./Day03/input.txt"));
