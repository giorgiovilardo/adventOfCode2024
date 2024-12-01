import { greet } from "../src/hello_world";

describe("the greeter", () => {
  it("should greet names", () => {
    expect(greet("ferocio")).toBe("Hello, ferocio");
  });
});
