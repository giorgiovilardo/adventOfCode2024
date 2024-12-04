import {
  partOne,
  partOneBusinessLogic,
  partTwo,
  partTwoBusinessLogic,
} from "../src/day4";

describe("day 4", () => {
  it("should return the correct value for part 1", async () => {
    expect(await partOne()).toBe(2567);
  });

  it("should return the correct value for part 2", async () => {
    expect(await partTwo()).toBe(2029);
  });

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

  it("should return the correct value for part 1 test data", () => {
    expect(partOneBusinessLogic(testData.split("\n"))).toBe(18);
  });

  it("should return the correct value for part 2 test data", () => {
    expect(partTwoBusinessLogic(testData.split("\n"))).toBe(9);
  });
});
