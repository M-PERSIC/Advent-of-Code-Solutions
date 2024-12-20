// SPDX-License-Identifier: MIT-0
// License-Filename: LICENSE

function part_one(input: string): number {
  const text = Deno.readTextFileSync(input);
  const rows: number[][] = [];
  for (const line of text.split(/\n/)) {
    rows.push(line.split("   ").map((num) => parseInt(num)));
  }
  const left = rows.flat().filter((_, index) => index % 2 === 0).sort();
  const right = rows.flat().filter((_, index) => index % 2 !== 0).sort();
  let distance = 0;
  for (const index in left) {
    distance += Math.abs(left[index] - right[index]);
  }
  return distance;
}

console.log(part_one("./Day01/input.txt"));

function part_two(input: string): number {
  const text = Deno.readTextFileSync(input);
  const rows: number[][] = [];
  for (const line of text.split(/\n/)) {
    rows.push(line.split("   ").map((num) => parseInt(num)));
  }
  const left = rows.flat().filter((_, index) => index % 2 === 0);
  const right = rows.flat().filter((_, index) => index % 2 !== 0);
  let similarity = 0;
  for (const index in left) {
    similarity += left[index] *
      right.filter((num) => num === left[index]).length;
  }
  return similarity;
}

console.log(part_two("./Day01/input.txt"));
