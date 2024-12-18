// Scratchpad for learning Typescript and Deno

const hasUnsafe = (row: number[]): [boolean, number] => {
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
        return [true, level];
      }
    } else {
      if (isIncreasing && isDecreasing) {
        return [true, level];
      }
    }
  }
  return [false, -1];
};

const row = [
  45,
  47,
  50,
  51,
  52,
  53,
  55,
  59,
];
let firstAttempt = hasUnsafe(row);

const saferRow1 = row.slice(0, firstAttempt[1]).concat(
  row.slice(firstAttempt[1] + 1, row.length),
);

const saferRow2 = row.slice(0, firstAttempt[1] + 1).concat(
  row.slice(firstAttempt[1] + 2, row.length),
);

console.log(hasUnsafe(saferRow1)[0] || hasUnsafe(saferRow2)[0]);
