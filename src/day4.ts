import { readFile } from "./readFile";
import {
  sum,
  transposeStringArray,
  transposeStringArrayToDiagonals,
} from "./utils.js";

async function parseDay4() {
  const data = await readFile("day4.txt");
  return data.split("\n");
}

export async function partOne(): Promise<number> {
  const lines = await parseDay4();
  return partOneBusinessLogic(lines);
}

export async function partTwo(): Promise<number> {
  return 0;
}

export function partOneBusinessLogic(lines: string[]): number {
  const hCount = lines.map(spotXmas).reduce(sum);
  const vCount = transposeStringArray(lines).map(spotXmas).reduce(sum);
  const { ltr, rtl } = transposeStringArrayToDiagonals(lines);
  const dCountLTR = ltr.map(spotXmas).reduce(sum);
  const dCountRTL = rtl.map(spotXmas).reduce(sum);
  return hCount + vCount + dCountLTR + dCountRTL;
}

function spotXmas(line: string) {
  const PATTERN = new RegExp("XMAS", "g");
  const BACKWARD_PATTERN = new RegExp("SAMX", "g");
  const frontResults = line.match(PATTERN);
  const backResults = line.match(BACKWARD_PATTERN);
  return (
    (frontResults === null ? 0 : frontResults.length) +
    (backResults === null ? 0 : backResults.length)
  );
}
