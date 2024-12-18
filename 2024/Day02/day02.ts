// SPDX-License-Identifier: MIT-0
// License-Filename: LICENSE

function part_one(input: string) {
  const text = Deno.readTextFileSync(input);
  const rows: number[][] = [];
  for (const line of text.split(/\n/)) {
    rows.push(line.split(" ").map((num) => parseInt(num)));
  }
  let safe = 0;
  for (const row of rows) {
    let isIncreasing = false;
    let isDecreasing = false;
    for (let level = 0; level < row.length; level++) {
      if (level != row.length - 1) {
        isIncreasing = (row[level] - row[level + 1] < 0) ? true : isIncreasing;
        isDecreasing = (row[level] - row[level + 1] > 0) ? true : isDecreasing;
        if (
          (Math.abs(row[level] - row[level + 1]) < 1) ||
          (Math.abs(row[level] - row[level + 1]) > 3)
        ) {
          break;
        }
      } else {
        if (
          (isIncreasing && !isDecreasing) || (!isIncreasing && isDecreasing)
        ) {
          safe++;
        }
      }
    }
  }
  return safe;
}

console.log(part_one("./Day02/input.txt"));

function part_two(input: string) {
  const text = Deno.readTextFileSync(input);
  const rows: number[][] = [];
  for (const line of text.split(/\n/)) {
    rows.push(line.split(" ").map((num) => parseInt(num)));
  }
  const hasUnsafe = (row: number[]): boolean => {
    let isIncreasing = false;
    let isDecreasing = false;
    for (let level = 0; level < row.length; level++) {
      isIncreasing = (row[level] - row[level + 1] < 0) ? true : isIncreasing;
      isDecreasing = (row[level] - row[level + 1] > 0) ? true : isDecreasing;
      if (level !== row.length - 1) {
        if (
          (Math.abs(row[level] - row[level + 1]) > 3) ||
          (Math.abs(row[level] - row[level + 1]) < 1) ||
          (isIncreasing && isDecreasing)
        ) {
          return true;
        }
      } else {
        if (isIncreasing && isDecreasing) {
          return true;
        }
      }
    }
    return false;
  };
  let safe = 0;
  for (const row of rows) {
    const firstAttempt = hasUnsafe(row);
    if (firstAttempt === true) {
      let secondAttempt = false;
      for (let index = 0; index < row.length; index++) {
        secondAttempt = hasUnsafe(
            row.slice(0, index).concat(row.slice(index + 1, row.length)),
          ) === false
          ? true
          : secondAttempt;
      }
      if (secondAttempt) {
        safe++;
      }
    } else {
      safe++;
    }
  }
  return safe;
}

console.log(part_two("./Day02/input.txt"));
