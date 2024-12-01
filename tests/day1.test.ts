import { dayOnePartOne, dayOnePartTwo } from "../src/day1";

describe("day 1", () => {
  it("should return the correct value for part 1", async () => {
    expect(await dayOnePartOne()).toBe(1765812);
  });

  it("should return the correct value for part 2", async () => {
    expect(await dayOnePartTwo()).toBe(20520794);
  });
});
