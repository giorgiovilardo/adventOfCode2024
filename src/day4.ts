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
  const lines = await parseDay4();
  return partTwoBusinessLogic(lines);
}

export function partOneBusinessLogic(lines: string[]): number {
  const hCount = lines.map(spotXmas).reduce(sum);
  const vCount = transposeStringArray(lines).map(spotXmas).reduce(sum);
  const { ltr, rtl } = transposeStringArrayToDiagonals(lines);
  const dCountLTR = ltr.map(spotXmas).reduce(sum);
  const dCountRTL = rtl.map(spotXmas).reduce(sum);
  return hCount + vCount + dCountLTR + dCountRTL;
}

export function partTwoBusinessLogic(lines: string[]): number {
  const windows = windowInput(lines);
  const filtered = windows.filter((inner) =>
    inner.every((item) => item === "MAS" || item === "SAM"),
  );
  return filtered.length;
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

function windowInput(a: string[]): [string, string][] {
  const rows = a.length;
  const cols = a[0].length;
  const windows: [string, string][] = [];
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      const center = a[i][j];
      if (center !== "A") {
        continue;
      }
      const topLeft = a[i - 1][j - 1];
      const topRight = a[i - 1][j + 1];
      const bottomLeft = a[i + 1][j - 1];
      const bottomRight = a[i + 1][j + 1];
      const ltr = topLeft + center + bottomRight;
      const rtl = topRight + center + bottomLeft;
      windows.push([ltr, rtl]);
    }
  }
  return windows;
}
