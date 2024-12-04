import { transposeArray, transposeStringArrayToDiagonals } from "../src/utils";

test("transposeArray", () => {
  const input = [
    [1, 2],
    [3, 4],
  ];
  const expected = [
    [1, 3],
    [2, 4],
  ];
  expect(transposeArray(input)).toEqual(expected);
});

test("transposeStringArrayToDiagonals", () => {
  const input = ["123", "456", "789"];
  const expectedLTR = ["7", "48", "159", "26", "3"];
  const expectedRTL = ["1", "24", "357", "68", "9"];
  const { ltr, rtl } = transposeStringArrayToDiagonals(input);
  expect(ltr).toEqual(expectedLTR);
  expect(rtl).toEqual(expectedRTL);
});
