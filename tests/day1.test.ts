import dayOnePartOne from "../src/day1";

describe("day 1 part 1", () => {
  it("should return the correct value", async () => {
    expect(await dayOnePartOne()).toBe(1765812);
  });
});
