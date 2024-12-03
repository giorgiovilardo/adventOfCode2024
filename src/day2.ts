import { readFile } from "./readFile";

async function parseDayTwo() {
  const data = await readFile("day2.txt");
  return data
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x, 10)));
}

export async function dayTwoPartOne(): Promise<number> {
  const data = await parseDayTwo();
  const chunks = data
    .map((x) => chunkNumbers(x))
    .map((x) => x.map((x) => (x[0] - x[1]) * -1));
  // const validChunks = chunks.filter((chunk) =>
  //   chunk.every((x) => x >= 1 && x <= 3 && (x >= 1 || x <= 1)),
  // );
  // const validChunks = chunks.filter((chunk) =>
  //   chunk.every((x) => (x > 0 && x < 4) || (x < 0 && x > -4)),
  // );
  // const valid2Chunks = validChunks.filter((chunk) => signSpotter(chunk));
  // return valid2Chunks.length;
  return chunks.filter((x) => isSafeChunk(x)).length;
}

export async function dayTwoPartTwo(): Promise<number> {
  const data = await parseDayTwo();
  const chunks = data.map((x) => chunkNumbers(x));
  const increments = chunks.map((x) => x.map((x) => (x[0] - x[1]) * -1));
  const zipped = data.map((val, currentIndex) => [
    val,
    increments[currentIndex],
  ]);
  const safes = zipped.filter(([_, increments]) => isSafeChunk(increments));
  const unsafes = zipped.filter(([_, increments]) => !isSafeChunk(increments));
  const savedUnsafes = unsafes.filter(([chunk, _]) => canBeSaved(chunk));
  return safes.length + savedUnsafes.length;
}

function canBeSaved(chunk: number[]): boolean {
  for (let i = 0; i < chunk.length; i++) {
    const filteredChunk = chunk.filter((_, idx) => i !== idx);
    const recalculatedIncrements = chunkNumbers(filteredChunk).map(
      (x) => (x[0] - x[1]) * -1,
    );
    if (isSafeChunk(recalculatedIncrements)) {
      return true;
    }
  }
  return false;
}

function isSafeChunk(chunk: number[]): boolean {
  if (chunk.includes(0) || chunk.includes(-0)) {
    return false;
  }
  if (chunk[0] > 0) {
    if (!chunk.every((x) => x > 0 && x < 4)) {
      return false;
    }
  }
  if (chunk[0] < 0) {
    if (!chunk.every((x) => x < 0 && x > -4)) {
      return false;
    }
  }
  return true;
}

function signSpotter(n: number[]): boolean {
  if (n[0] > 0) {
    return n.every((x) => x > 0);
  }
  return n.every((x) => x < 0);
}

const chunkNumbers = (numberlist: number[]) => {
  const chunks: number[][] = [];
  for (let i = 0; i < numberlist.length - 1; i++) {
    chunks.push([numberlist[i], numberlist[i + 1]]);
  }
  return chunks;
};
