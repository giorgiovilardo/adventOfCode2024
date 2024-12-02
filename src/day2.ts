import { readFile } from "./readFile";

async function parseDayTwo() {
  const data = await readFile("day2.txt");
  return data
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x, 10)));
}

export async function dayTwoPartOne(): Promise<number> {
  const chunkNumbers = (numberlist: number[]) => {
    const chunks: number[][] = [];
    for (let i = 0; i < numberlist.length - 1; i++) {
      chunks.push([numberlist[i], numberlist[i + 1]]);
    }
    return chunks;
  };
  const data = await parseDayTwo();
  const chunks = data
    .map((x) => chunkNumbers(x))
    .map((x) => x.map((x) => (x[0] - x[1]) * -1));
  // const validChunks = chunks.filter((chunk) =>
  //   chunk.every((x) => x >= 1 && x <= 3 && (x >= 1 || x <= 1)),
  // );
  const validChunks = chunks.filter((chunk) =>
    chunk.every((x) => (x > 0 && x < 4) || (x < 0 && x > -4)),
  );
  const valid2Chunks = validChunks.filter((chunk) => signSpotter(chunk));
  return valid2Chunks.length;
}

export async function dayTwoPartTwo(): Promise<number> {
  return 0;
}

function signSpotter(n: number[]): boolean {
  if (n[0] > 0) {
    return n.every((x) => x > 0);
  }
  return n.every((x) => x < 0);
}
