import { readFile } from "./readFile";
import { sum } from "./utils.js";

async function parseDay5() {
  const data = await readFile("day5.txt");
  const lines = data.split("\n");
  const rules = [];
  const orders = [];
  for (const line of lines) {
    if (line.includes("|")) {
      rules.push(line);
    }
    if (line.includes(",")) {
      orders.push(line);
    }
  }
  return [rules, orders];
}

export async function partOne(): Promise<number> {
  const [rules, orders] = await parseDay5();
  return day5Pt1BizLogic(rules, orders);
}

export async function partTwo(): Promise<number> {
  const data = await parseDay5();
  return 0;
}

export function day5Pt1BizLogic(rules: string[], orders: string[]) {
  const parsedRules = parseRules(rules);
  const parsedOrders = orders.map((order) => order.split(","));
  const validOrders = parsedOrders.filter((x) => isOrderValid(x, parsedRules));
  const middles = validOrders.map(
    (inner) => inner[Math.floor(inner.length / 2)],
  );
  const result = middles.map((x) => parseInt(x)).reduce(sum);
  return result;
}

function parseRules(rules: string[]) {
  const parsedRules: Map<string, Set<string>> = new Map();
  for (const rule of rules) {
    const [before, after] = rule.split("|");
    const set = parsedRules.get(before);
    if (set instanceof Set) {
      parsedRules.set(before, set.add(after));
    } else {
      const newSet = new Set<string>();
      newSet.add(before);
      newSet.add(after);
      parsedRules.set(before, newSet);
    }
  }
  return parsedRules;
}

function isOrderValid(parsedOrder: string[], rules: Map<string, Set<string>>) {
  for (let i = 0; i < parsedOrder.length - 1; i++) {
    const rule = rules.get(parsedOrder[i]);
    if (rule instanceof Set) {
      const toExamine = parsedOrder.slice(i + 1, parsedOrder.length);
      for (const page of toExamine) {
        if (!rule.has(page)) {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return true;
}
