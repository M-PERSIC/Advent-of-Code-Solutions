// Scratchpad for learning Typescript and Deno

const symbol: string = "*";
const range: (n: number) => number[] = (n) => [...Array(n).keys()];
for (const i of range(15)) {
  console.log(symbol.repeat(i));
}
