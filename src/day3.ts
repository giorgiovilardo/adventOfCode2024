import { readFile } from "./readFile";

const REGEX = new RegExp("mul\\((\\d+),(\\d+)\\)", "g");
const PT_2_REGEX = new RegExp(
  "mul\\((\\d+),(\\d+)\\)|do\\(\\)|don't\\(\\)",
  "g",
);

async function parseDay3() {
  const data = await readFile("day3.txt");
  return data.split("\n");
}

export async function partOne(): Promise<number> {
  const data = await parseDay3();
  const nums = data.map(parseLine);
  const mults = nums.map((inner) => inner.map(multTuple));
  const sums = mults.map((inner) => inner.reduce(adder));
  return sums.reduce(adder);
}

export async function partTwo(): Promise<number> {
  const data = await parseDay3();
  const results = data.flatMap(parseLinePartTwo);
  const filteredCommands = results.reduce(mulFilterer, {
    commands: [],
    includeNext: true,
  });
  const mults = filteredCommands.commands.map(multMulCommand);
  return mults.reduce(adder);
}

function parseLine(line: string): [number, number][] {
  const results: [number, number][] = [...line.matchAll(REGEX)].map((match) => [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
  ]);
  if (!results) return [];
  return results;
}

type Command =
  | { type: "Mul"; a: number; b: number }
  | { type: "Start" }
  | { type: "Stop" };

function parseLinePartTwo(line: string): Command[] {
  const results = [...line.matchAll(PT_2_REGEX)];
  if (!results) return [];
  return results.map(commandParser);
}

function commandParser(match: RegExpExecArray): Command {
  if (match[0] === "don't()") {
    return { type: "Stop" };
  }
  if (match[0] === "do()") {
    return { type: "Start" };
  }
  if (match[0].includes("mul")) {
    return { type: "Mul", a: parseInt(match[1]), b: parseInt(match[2]) };
  }

  throw new Error(`Invalid command: ${match[0]}`);
}

function adder(acc: number, val: number): number {
  return acc + val;
}

function multTuple([a, b]: [number, number]): number {
  return a * b;
}

type FiltererAccumulator = { commands: Command[]; includeNext: boolean };

function mulFilterer(
  acc: FiltererAccumulator,
  val: Command,
): FiltererAccumulator {
  if (val.type === "Start") {
    return { commands: acc.commands, includeNext: true };
  }

  if (val.type === "Stop") {
    return { commands: acc.commands, includeNext: false };
  }
  if (!acc.includeNext) {
    return acc;
  }
  const newCommands = [...acc.commands, val];
  return {
    commands: newCommands,
    includeNext: acc.includeNext,
  };
}

function multMulCommand(command: Command) {
  if (command.type === "Start" || command.type === "Stop") {
    throw new Error(`unsupported operation`);
  }
  return command.a * command.b;
}
