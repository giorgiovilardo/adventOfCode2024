import {
  day6Pt1BizLogic,
  day6Pt2BizLogic,
  partOne,
  partTwo,
} from "../src/day6";

describe("day 6", () => {
  it("should return the correct value for part 1", async () => {
    expect(await partOne()).toBe(5101);
  });

  it("should return the correct value for part 2", async () => {
    expect(await partTwo()).toBe(1951);
  });

  const testData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

  it("should return the correct value for part 1 test data", () => {
    expect(day6Pt1BizLogic(testData.split("\n"))).toBe(41);
  });

  it("should return the correct value for part 2 test data", () => {
    expect(day6Pt2BizLogic(testData.split("\n"))).toBe(6);
  });
});
