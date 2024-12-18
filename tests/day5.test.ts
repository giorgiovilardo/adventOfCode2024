import {
  day5Pt1BizLogic,
  day5Pt2BizLogic,
  partOne,
  partTwo,
} from "../src/day5";

describe("day 5", () => {
  it("should return the correct value for part 1", async () => {
    expect(await partOne()).toBe(5747);
  });

  it("should return the correct value for part 2", async () => {
    expect(await partTwo()).toBe(5502);
  });

  const rules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

  const orders = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  it("part 1 test data", () => {
    const result = day5Pt1BizLogic(rules.split("\n"), orders.split("\n"));
    expect(result).toBe(143);
  });

  it("part 2 test data", () => {
    const result = day5Pt2BizLogic(rules.split("\n"), orders.split("\n"));
    expect(result).toBe(123);
  });
});
