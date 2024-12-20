// SPDX-License-Identifier: MIT-0
// License-Filename: LICENSE

function part_one(input: string): number {
  const text = Deno.readTextFileSync(input).split("\n");
  const rules: { [key: string]: number[] } = text.slice(0, text.indexOf(""))
    .map((rule) => ({
      [rule.split("|")[0]]: Number(rule.split("|")[1]),
    })).reduce((accumulator, current) => {
      const key = Object.keys(current)[0];
      accumulator[key] = accumulator[key]
        ? [...accumulator[key], current[key]]
        : [current[key]];
      return accumulator;
    }, {} as { [key: string]: number[] });
  const updates = text.slice(text.indexOf("") + 1).map((row) =>
    row.split(",").flatMap((element) => Number(element))
  );
  const validUpdates: number[][] = [];
  for (const update of updates) {
    const printedPages: string[] = [];
    let isValid = true;
    for (const page of update) {
      if (rules[page]) {
        for (const badPage of rules[page]) {
          if (printedPages.includes(String(badPage))) {
            isValid = false;
          }
        }
      }
      printedPages.push(String(page));
    }
    isValid && validUpdates.push(update);
  }
  let result = 0;
  validUpdates.flatMap((update) =>
    result += update[Math.round((update.length - 1) / 2)]
  );
  return result;
}

console.log(part_one("./Day05/input.txt"));

function part_two(input: string): number {
  const text = Deno.readTextFileSync(input).split("\n");
  const rules: { [key: string]: number[] } = text.slice(0, text.indexOf(""))
    .map((rule) => {
      const [before, after] = rule.split("|");
      return { [before]: Number(after) };
    })
    .reduce((accumulator, current) => {
      const key = Object.keys(current)[0];
      accumulator[key] = accumulator[key]
        ? [...accumulator[key], current[key]]
        : [current[key]];
      return accumulator;
    }, {} as { [key: string]: number[] });
  const updates = text.slice(text.indexOf("") + 1)
    .map((row) => row.split(",").map(Number));
  const invalidUpdates: number[][] = [];
  for (const update of updates) {
    const printedPages: string[] = [];
    let isValid = true;
    for (const page of update) {
      if (rules[page]) {
        for (const mustComeAfter of rules[page]) {
          if (printedPages.includes(String(mustComeAfter))) {
            isValid = false;
          }
        }
      }
      printedPages.push(String(page));
    }
    !isValid && invalidUpdates.push(update);
  }
  const fixedUpdates = invalidUpdates.map((update) => {
    const graph = new Map<number, Set<number>>();
    update.forEach((page) => graph.set(page, new Set()));
    update.forEach((page) => {
      if (rules[page]) {
        rules[page].forEach((after) => {
          if (update.includes(after)) {
            const afterSet = graph.get(after) || new Set();
            afterSet.add(page);
            graph.set(after, afterSet);
          }
        });
      }
    });
    const visited = new Set<number>();
    const temp = new Set<number>();
    const order: number[] = [];
    const visit = (page: number): void => {
      if (temp.has(page)) return;
      if (visited.has(page)) return;
      temp.add(page);
      const deps = graph.get(page) || new Set();
      deps.forEach((dep) => visit(dep));
      temp.delete(page);
      visited.add(page);
      order.push(page);
    };
    update.forEach((page) => visit(page));
    return order.reverse();
  });
  return fixedUpdates.reduce(
    (accumulator, current) =>
      accumulator + current[Math.floor((current.length - 1) / 2)],
    0,
  );
}

console.log(part_two("./Day05/input.txt"));
