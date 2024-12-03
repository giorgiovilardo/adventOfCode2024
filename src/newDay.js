import { writeFile, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const args = process.argv.splice(2);
const day = args[0];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFilePath = join(__dirname, `day${day}.ts`);
const testFilePath = join(__dirname, "..", "tests", `day${day}.test.ts`);
const inputFilePath = join(__dirname, "..", "resources", `day${day}.txt`);

const codeTemplate = `import { readFile } from "./readFile";

async function parseDay${day}() {
  const data = await readFile("day${day}.txt");
  const lines = data.split("\\n");
  return;
}

export async function partOne(): Promise<number> {
  return 0;
}

export async function partTwo(): Promise<number> {
  return 0;
}`;

const testTemplate = `import { partOne, partTwo } from "../src/day${day}";

describe("day ${day}", () => {
  it("should return the correct value for part 1", async () => {
    expect(await partOne()).toBe(1);
  });

  it("should return the correct value for part 2", async () => {
    expect(await partTwo()).toBe(1);
  });
});
`;

const writeFileIfNotExists = (filePath, content) => {
  if (existsSync(filePath)) {
    console.log(`File ${filePath} already exists. Skipping...`);
  } else {
    writeFile(filePath, content, (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        process.exit(1);
      }
      console.log(`File ${filePath} has been created.`);
    });
  }
};

writeFileIfNotExists(srcFilePath, codeTemplate);
writeFileIfNotExists(testFilePath, testTemplate);
writeFileIfNotExists(inputFilePath, ``);
