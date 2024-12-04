import { partOne, partOneBusinessLogic, partTwo } from "../src/day4";

describe("day 4", () => {
  it("should return the correct value for part 1", async () => {
    expect(await partOne()).toBe(2567);
  });

  it("should return the correct value for part 2", async () => {
    expect(await partTwo()).toBe(1);
  });

  it("should return the correct value for part 1 test data", () => {
    const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
    expect(partOneBusinessLogic(testData.split("\n"))).toBe(18);
  });
});
