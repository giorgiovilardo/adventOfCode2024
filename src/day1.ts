import { readFile } from "./readFile";

async function parseDayOne() {
  const data = await readFile("day1.txt");
  const temp: [number, number][] = data.split("\n").map((line) => {
    const [first, second] = line.split("   ").map((x) => parseInt(x, 10));
    return [first, second];
  });

  return temp.reduce(
    (
      [listOne, listTwo]: [number[], number[]],
      [first, second]: [number, number],
    ) => {
      listOne.push(first);
      listTwo.push(second);
      return [listOne, listTwo];
    },
    [[], []] as [number[], number[]],
  );
}

// original
export async function dayOnePartOne(): Promise<number> {
  try {
    const [listOne, listTwo] = await parseDayOne();
    listOne.sort();
    listTwo.sort();
    const difference: number[] = [];
    listOne.forEach((item, index) => {
      difference.push(Math.abs(item - listTwo[index]));
    });
    return difference.reduce((acc, val) => acc + val, 0);
  } catch {
    return 0;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function dayOnePartOneGpt(): Promise<number> {
  try {
    // Read and split the data by lines
    const data = await readFile("day1.txt");

    // Parse the data into two separate lists of numbers using map
    const [listOne, listTwo] = data
      .split("\n")
      .map((line) => {
        const [first, second] = line.trim().split(/\s+/); // Split by any whitespace (including multiple spaces)
        return [parseInt(first, 10), parseInt(second, 10)];
      })
      .reduce<[number[], number[]]>(
        ([listOne, listTwo], [first, second]) => {
          listOne.push(first);
          listTwo.push(second);
          return [listOne, listTwo];
        },
        [[], []],
      );

    // Sort both lists
    listOne.sort((a, b) => a - b);
    listTwo.sort((a, b) => a - b);

    // Calculate the difference
    const difference = listOne.map((item, index) =>
      Math.abs(item - listTwo[index]),
    );

    // Return the sum of the differences
    return difference.reduce((acc, val) => acc + val, 0);
  } catch (error) {
    console.error("Error processing the file:", error);
    return 0;
  }
}

export async function dayOnePartTwo(): Promise<number> {
  try {
    const [listOne, listTwo] = await parseDayOne();

    const frequencies = new FrequencyCounter(listTwo);

    return listOne.reduce((acc, val) => {
      const score = frequencies.get(val) || 0;
      return val * score + acc;
    }, 0);
  } catch {
    return 0;
  }
}

class FrequencyCounter {
  private frequencyMap: Map<number, number>;

  constructor(numbers: number[]) {
    this.frequencyMap = new Map();

    numbers.forEach((num) => {
      const currentFreq = this.frequencyMap.get(num) || 0;
      this.frequencyMap.set(num, currentFreq + 1);
    });
  }

  get(value: number): number {
    return this.frequencyMap.get(value) || 0;
  }
}
