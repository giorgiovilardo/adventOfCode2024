import { dayTwoPartOne, dayTwoPartTwo } from "../src/day2";

describe("day 2", () => {
  it("should return the correct value for part 1", async () => {
    expect(await dayTwoPartOne()).toBe(242);
  });

  it("should return the correct value for part 2", async () => {
    expect(await dayTwoPartTwo()).toBe(1);
  });
});
