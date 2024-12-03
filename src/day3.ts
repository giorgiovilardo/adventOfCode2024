import { readFile } from "./readFile";

const REGEX = new RegExp("mul\\((\\d+),(\\d+)\\)", "g");

async function parseDay3() {
  const data = await readFile("day3.txt");
  return data.split("\n");
}

export async function partOne(): Promise<number> {
  const data = await parseDay3();
  const nums = data.map(parseLine);
  const mults = nums.map((inner) => inner.map(multTuple));
  const sums = mults.map((inner) => inner.reduce(adder));
  return sums.reduce(adder);
}

export async function partTwo(): Promise<number> {
  return 0;
}

function parseLine(line: string): [number, number][] {
  const results: [number, number][] = [...line.matchAll(REGEX)].map((match) => [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
  ]);
  if (!results) return [];
  return results;
}

function adder(acc: number, val: number): number {
  return acc + val;
}

function multTuple([a, b]: [number, number]): number {
  return a * b;
}
