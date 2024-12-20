// SPDX-License-Identifier: MIT-0
// License-Filename: LICENSE

function part_one(input: string): number {
  const text = Deno.readTextFileSync(input).split("\n");
  const matrix: string[][] = [];
  for (const row of text) {
    matrix.push(row.split(""));
  }
  const safeCheck = (
    matrix: string[][],
    candidate: string,
    row: number,
    column: number,
  ) => {
    try {
      const element = matrix[row][column];
      return candidate === element;
    } catch (_) {
      return false;
    }
  };
  let result = 0;
  for (const row in matrix) {
    for (let column = 0; column < matrix[row].length; column++) {
      const element = matrix[row][column];
      if (element === "X") {
        const numRow = Number(row);
        const numColumn = Number(column);
        const counts = [
          // horizontal left
          safeCheck(matrix, "M", numRow, numColumn - 1) &&
          safeCheck(matrix, "A", numRow, numColumn - 2) &&
          safeCheck(matrix, "S", numRow, numColumn - 3),
          // horizontal right
          safeCheck(matrix, "M", numRow, numColumn + 1) &&
          safeCheck(matrix, "A", numRow, numColumn + 2) &&
          safeCheck(matrix, "S", numRow, numColumn + 3),
          // vertical up
          safeCheck(matrix, "M", numRow - 1, numColumn) &&
          safeCheck(matrix, "A", numRow - 2, numColumn) &&
          safeCheck(matrix, "S", numRow - 3, numColumn),
          // vertical down
          safeCheck(matrix, "M", numRow + 1, numColumn) &&
          safeCheck(matrix, "A", numRow + 2, numColumn) &&
          safeCheck(matrix, "S", numRow + 3, numColumn),
          // diagonal top left
          safeCheck(matrix, "M", numRow - 1, numColumn + 1) &&
          safeCheck(matrix, "A", numRow - 2, numColumn + 2) &&
          safeCheck(matrix, "S", numRow - 3, numColumn + 3),
          // diagonal top right
          safeCheck(matrix, "M", numRow + 1, numColumn + 1) &&
          safeCheck(matrix, "A", numRow + 2, numColumn + 2) &&
          safeCheck(matrix, "S", numRow + 3, numColumn + 3),
          // diagonal bottom left
          safeCheck(matrix, "M", numRow - 1, numColumn - 1) &&
          safeCheck(matrix, "A", numRow - 2, numColumn - 2) &&
          safeCheck(matrix, "S", numRow - 3, numColumn - 3),
          // diagonal bottom right
          safeCheck(matrix, "M", numRow + 1, numColumn - 1) &&
          safeCheck(matrix, "A", numRow + 2, numColumn - 2) &&
          safeCheck(matrix, "S", numRow + 3, numColumn - 3),
        ];
        counts.forEach((isValid) => isValid ? result += 1 : result);
      }
    }
  }
  return result;
}

console.log(part_one("./Day04/input.txt"));

function part_two(input: string): number {
  const text = Deno.readTextFileSync(input).split("\n");
  const matrix: string[][] = [];
  for (const row of text) {
    matrix.push(row.split(""));
  }
  const safeCheck = (
    matrix: string[][],
    candidate: string,
    row: number,
    column: number,
  ) => {
    try {
      const element = matrix[row][column];
      return candidate === element;
    } catch (_) {
      return false;
    }
  };
  let result = 0;
  for (const row in matrix) {
    for (let column = 0; column < matrix[row].length; column++) {
      const element = matrix[row][column];
      if (element === "A") {
        const numRow = Number(row);
        const numColumn = Number(column);
        const counts: boolean[] = [
          // M   M
          //   A
          // S   S
          safeCheck(matrix, "M", numRow - 1, numColumn - 1) &&
          safeCheck(matrix, "S", numRow + 1, numColumn + 1) &&
          safeCheck(matrix, "M", numRow - 1, numColumn + 1) &&
          safeCheck(matrix, "S", numRow + 1, numColumn - 1),
          // M   S
          //   A
          // M   S
          safeCheck(matrix, "M", numRow - 1, numColumn - 1) &&
          safeCheck(matrix, "S", numRow + 1, numColumn + 1) &&
          safeCheck(matrix, "S", numRow - 1, numColumn + 1) &&
          safeCheck(matrix, "M", numRow + 1, numColumn - 1),
          // S   S
          //   A
          // M   M
          safeCheck(matrix, "S", numRow - 1, numColumn - 1) &&
          safeCheck(matrix, "M", numRow + 1, numColumn + 1) &&
          safeCheck(matrix, "S", numRow - 1, numColumn + 1) &&
          safeCheck(matrix, "M", numRow + 1, numColumn - 1),
          // S   M
          //   A
          // S   M
          safeCheck(matrix, "S", numRow - 1, numColumn - 1) &&
          safeCheck(matrix, "M", numRow + 1, numColumn + 1) &&
          safeCheck(matrix, "M", numRow - 1, numColumn + 1) &&
          safeCheck(matrix, "S", numRow + 1, numColumn - 1),
        ];
        counts.forEach((isValid) => isValid && (result += 1));
      }
    }
  }
  return result;
}

console.log(part_two("./Day04/input.txt"));
