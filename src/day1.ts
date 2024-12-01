import { readFile } from "./readFile";

// original
export default async function dayOnePartOne(): Promise<number> {
  try {
    const data = await readFile("day1.txt");
    const listOne: number[] = [];
    const listTwo: number[] = [];
    data.split("\n").forEach((item) => {
      const foo = item.split("   ");
      listOne.push(Number.parseInt(foo[0]));
      listTwo.push(Number.parseInt(foo[1]));
    });
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
