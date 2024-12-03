import { partOne, partTwo } from "../src/day3";

describe("day 3", () => {
  it("should return the correct value for part 1", async () => {
    expect(await partOne()).toBe(160672468);
  });

  it("should return the correct value for part 2", async () => {
    expect(await partTwo()).toBe(84893551);
  });
});
